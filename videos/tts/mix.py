"""Audio mix for an episode: narration + generated music bed + sound effects.

Usage: python mix.py <timeline.json>

timeline.json:
{
  "duration": 95.2, "fps": 30,
  "clips":  [{"file": "a.wav", "start": 1.2}, ...],          # narration
  "events": [{"t": 3.1, "kind": "whoosh"}, ...],             # whoosh | tick | pop | impact | riser
  "music":  {"style": "calm" | "hype", "gain_db": -20},
  "out": "mix.wav", "envelope_out": "env.json"
}

Writes a 48 kHz stereo WAV and a per-frame narration loudness envelope (0..1) that drives the
mascot's mouth. The music is synthesized here (no samples), so it is royalty-free.
"""

import json
import sys

import numpy as np
import soundfile as sf

SR = 48000
rng = np.random.default_rng(7)


def midi_hz(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def resample(x, sr_in):
    if sr_in == SR:
        return x
    t_out = np.arange(int(len(x) * SR / sr_in)) / SR
    return np.interp(t_out, np.arange(len(x)) / sr_in, x)


def one_pole_lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y


def smooth(x, cutoff):
    """Fast zero-ish-phase smoothing via FFT lowpass (for long signals)."""
    n = len(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    X = np.fft.rfft(x)
    X *= 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, n)


def adsr(n, a, r):
    env = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    na, nr = min(na, n), min(nr, n)
    env[:na] = np.linspace(0, 1, na)
    if nr:
        env[-nr:] *= np.linspace(1, 0, nr)
    return env


# ---------------------------------------------------------------- music

PROGRESSIONS = {
    # Am9 – Fmaj7 – C(add9) – G6   (warm, hopeful)
    "calm": [[57, 60, 64, 67, 71], [53, 57, 60, 64], [48, 55, 62, 64], [55, 59, 62, 64]],
    # Em – C – G – D  (driving)
    "hype": [[52, 55, 59, 64], [48, 52, 55, 60], [55, 59, 62, 67], [50, 54, 57, 62]],
}


def music_bed(duration, style):
    if style == "phonk":
        return phonk_bed(duration)
    hype = style == "hype"
    bpm = 124 if hype else 86
    beat = 60 / bpm
    bar = 4 * beat
    n = int(duration * SR) + SR
    mel_l, mel_r = np.zeros(n), np.zeros(n)     # pads, bass, arps (sidechained in hype)
    drums = np.zeros(n)
    prog = PROGRESSIONS[style]
    t_bar = np.arange(int(bar * SR)) / SR
    intro_bars = 1 if hype else 0               # hype: one bar of build before the drop

    def add(buf, s0, wave, gain):
        if s0 >= n:
            return
        ln = min(len(wave), n - s0)
        buf[s0:s0 + ln] += wave[:ln] * gain

    bars = int(np.ceil(duration / bar)) + 1
    for b in range(bars):
        chord = prog[b % len(prog)]
        start = int(b * bar * SR)
        m = min(len(t_bar), n - start)
        if m <= 0:
            break
        tt = t_bar[:m]

        # Pad: detuned soft saws, wide stereo
        pad_l, pad_r = np.zeros(m), np.zeros(m)
        for note in chord:
            f = midi_hz(note)
            for det, side in ((-0.12, "l"), (0.12, "r")):
                ph = 2 * np.pi * f * (1 + det / 100) * tt
                wave = np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.12 * np.sin(3 * ph)
                (pad_l if side == "l" else pad_r)[:] += wave
        env = adsr(m, 0.6 if not hype else 0.15, 0.9 if not hype else 0.3)
        mel_l[start:start + m] += pad_l * env * (0.035 if not hype else 0.03)
        mel_r[start:start + m] += pad_r * env * (0.035 if not hype else 0.03)

        in_drop = b >= intro_bars
        root = chord[0] - 12
        if hype and in_drop:
            # Driving 8th-note bass
            for k in range(8):
                ln = int(beat / 2 * 0.9 * SR)
                tb = np.arange(ln) / SR
                f = midi_hz(root - (12 if k % 2 == 0 else 0))
                wave = (np.sin(2 * np.pi * f * tb) + 0.3 * np.sin(4 * np.pi * f * tb)) * adsr(ln, 0.005, 0.05)
                w2 = wave
                add(mel_l, start + int(k * beat / 2 * SR), w2, 0.2)
                add(mel_r, start + int(k * beat / 2 * SR), w2, 0.2)
        elif not hype:
            for k in (0, 2):
                ln = int(beat * 1.8 * SR)
                tb = np.arange(ln) / SR
                wave = np.sin(2 * np.pi * midi_hz(root) * tb) * np.exp(-tb * 2.2) * adsr(ln, 0.01, 0.1)
                add(mel_l, start + int(k * beat * SR), wave, 0.16)
                add(mel_r, start + int(k * beat * SR), wave, 0.16)

        # Pluck arpeggio (16ths in hype, 8ths in calm), ping-pong panned
        arp = sorted(chord)[1:] + [chord[0] + 12]
        steps, div = (16, 4) if hype else (8, 2)
        for k in range(steps):
            ln = int(0.4 * SR)
            tp = np.arange(ln) / SR
            f = midi_hz(arp[k % len(arp)] + 12)
            wave = (np.sin(2 * np.pi * f * tp) + 0.25 * np.sin(4 * np.pi * f * tp)) * np.exp(-tp * (14 if hype else 9))
            pan = 0.35 if k % 2 == 0 else 0.65
            g = 0.045 if hype else 0.05
            add(mel_l, start + int(k * beat / div * SR), wave, g * (1 - pan) * 2)
            add(mel_r, start + int(k * beat / div * SR), wave, g * pan * 2)

        if hype and in_drop:
            for k in range(4):
                # Four-on-the-floor kick
                ln = int(0.3 * SR)
                tk = np.arange(ln) / SR
                freq = 42 + 90 * np.exp(-tk * 30)
                kick = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-tk * 9)
                kick += np.sin(2 * np.pi * 3000 * tk) * np.exp(-tk * 400) * 0.3   # click
                add(drums, start + int(k * beat * SR), kick, 0.42)
                # Clap on 2 and 4
                if k in (1, 3):
                    ln = int(0.2 * SR)
                    tc = np.arange(ln) / SR
                    noise = rng.standard_normal(ln)
                    band = np.diff(np.concatenate([[0], smooth(noise, 2500)]))
                    env = np.exp(-tc * 28) + 0.6 * np.exp(-np.maximum(tc - 0.012, 0) * 30) * (tc > 0.012)
                    add(drums, start + int(k * beat * SR), band * env * 6, 0.09)
                # Hats: open-ish on the off-beat, closed 16ths
                for j, g in ((0.5, 0.05), (0.25, 0.018), (0.75, 0.018)):
                    ln = int((0.09 if j == 0.5 else 0.035) * SR)
                    th = np.arange(ln) / SR
                    hat = np.diff(rng.standard_normal(ln + 1)) * np.exp(-th * (45 if j == 0.5 else 110))
                    add(drums, start + int((k + j) * beat * SR), hat, g)

    L = mel_l[: int(duration * SR)]
    R = mel_r[: int(duration * SR)]
    D = drums[: int(duration * SR)]
    if hype:
        # Sidechain pump: melodic parts duck after every kick
        t_all = np.arange(len(L)) / SR
        pump = 1 - 0.55 * np.exp(-np.mod(t_all, beat) * 9)
        pump[: int(intro_bars * bar * SR)] = 1
        L, R = L * pump, R * pump
        # Filter-sweep the intro bar so the drop hits harder
        ib = int(intro_bars * bar * SR)
        if ib:
            sweep = np.linspace(0.25, 1, ib) ** 2
            L[:ib] *= sweep
            R[:ib] *= sweep
    return L + D, R + D


PHONK_BPM = 130


def phonk_bed(duration):
    """Drift-phonk style beat: TR-808 cowbell riff, distorted gliding 808, kick, clap, hat rolls."""
    beat = 60 / PHONK_BPM
    bar = 4 * beat
    s16 = beat / 4
    n = int(duration * SR) + SR
    L, R = np.zeros(n), np.zeros(n)
    intro = bar                                  # one bar of cowbell only, then the drop

    def put(buf, t0, wave, gain):
        s0 = int(t0 * SR)
        if s0 >= n or s0 < 0:
            return
        ln = min(len(wave), n - s0)
        buf[s0:s0 + ln] += wave[:ln] * gain

    def cowbell(semi, length=0.32):
        ln = int(length * SR)
        t = np.arange(ln) / SR
        r = 2 ** (semi / 12)
        sq = np.sign(np.sin(2 * np.pi * 540 * r * t)) + np.sign(np.sin(2 * np.pi * 800 * r * t))
        band = smooth(sq, 2600) - smooth(sq, 500)
        env = np.exp(-t * 11) * 0.8 + np.exp(-t * 60) * 0.4
        return band * env

    def eight_o_eight(freq_from, freq_to, length):
        ln = int(length * SR)
        t = np.arange(ln) / SR
        glide = freq_to + (freq_from - freq_to) * np.exp(-t * 18)
        x = np.sin(2 * np.pi * np.cumsum(glide) / SR) * np.exp(-t * 1.6)
        x *= np.minimum(1, t / 0.004)
        return np.tanh(x * 3.2) * 0.8

    def kick():
        ln = int(0.25 * SR)
        t = np.arange(ln) / SR
        return np.sin(2 * np.pi * np.cumsum(48 + 110 * np.exp(-t * 35)) / SR) * np.exp(-t * 14)

    def clap():
        ln = int(0.35 * SR)
        t = np.arange(ln) / SR
        noise = rng.standard_normal(ln)
        band = smooth(noise, 3200) - smooth(noise, 900)
        env = np.zeros(ln)
        for off in (0, 0.011, 0.022):
            m = t >= off
            env[m] += np.exp(-(t[m] - off) * (70 if off < 0.02 else 16))
        return band * env * 2.2

    def hat(open_=False):
        ln = int((0.12 if open_ else 0.03) * SR)
        t = np.arange(ln) / SR
        return np.diff(rng.standard_normal(ln + 1)) * np.exp(-t * (30 if open_ else 140))

    # Cowbell riff (16 sixteenths per bar), two-bar phrase in E minor
    riff = [
        [0, None, 0, None, 3, None, 0, None, 7, None, 5, None, 3, None, 0, None],
        [0, None, 0, None, 3, None, 5, None, 7, None, 10, None, 7, None, 5, 3],
    ]
    bass = [(0, 0), (1.5, 0), (2.5, 3), (3.25, -2)]     # (beat, semitone) per bar
    E1 = 41.2
    bars = int(np.ceil(duration / bar)) + 1
    for b in range(bars):
        t_bar = b * bar
        drop = t_bar >= intro
        for k, semi in enumerate(riff[b % 2]):
            if semi is None:
                continue
            w = cowbell(semi)
            put(L, t_bar + k * s16, w, 0.16)
            put(R, t_bar + k * s16, w, 0.12)
            put(R, t_bar + k * s16 + beat / 2, w, 0.06)   # ping-pong echo
            put(L, t_bar + k * s16 + beat, w, 0.03)
        if not drop:
            continue
        for beat_pos, semi in bass:
            f = E1 * 2 ** (semi / 12)
            w = eight_o_eight(f * 2, f, beat * 1.6)
            put(L, t_bar + beat_pos * beat, w, 0.42)
            put(R, t_bar + beat_pos * beat, w, 0.42)
            kk = kick()
            put(L, t_bar + beat_pos * beat, kk, 0.35)
            put(R, t_bar + beat_pos * beat, kk, 0.35)
        for beat_pos in (1, 3):
            c = clap()
            put(L, t_bar + beat_pos * beat, c, 0.13)
            put(R, t_bar + beat_pos * beat, c, 0.13)
        roll = b % 2 == 1
        for k in range(16):
            if roll and k >= 12:
                for j in range(2):                       # 32nd-note roll at the end of the phrase
                    put(L, t_bar + (k + j / 2) * s16, hat(), 0.03)
                    put(R, t_bar + (k + j / 2) * s16, hat(), 0.035)
            elif k % 2 == 0:
                put(L, t_bar + k * s16, hat(open_=(k % 8 == 4)), 0.035)
                put(R, t_bar + k * s16, hat(open_=(k % 8 == 4)), 0.04)

    m = int(duration * SR)
    return L[:m], R[:m]


# ---------------------------------------------------------------- sound effects

def sfx(kind):
    if kind == "whoosh":
        ln = int(0.55 * SR)
        noise = rng.standard_normal(ln)
        t = np.arange(ln) / SR
        cut = 300 + 3500 * np.sin(np.pi * t / t[-1]) ** 2
        a = np.exp(-2 * np.pi * cut / SR)
        y = np.empty(ln)
        acc = 0.0
        for i in range(ln):
            acc = (1 - a[i]) * noise[i] + a[i] * acc
            y[i] = acc
        env = np.sin(np.pi * t / t[-1]) ** 1.5
        return y * env * 0.5
    if kind == "boom":
        ln = int(1.3 * SR)
        t = np.arange(ln) / SR
        x = np.sin(2 * np.pi * np.cumsum(38 + 70 * np.exp(-t * 6)) / SR) * np.exp(-t * 2.4)
        return np.tanh(x * 2.5) * 0.75
    if kind == "swoosh":
        ln = int(0.22 * SR)
        noise = rng.standard_normal(ln)
        t = np.arange(ln) / SR
        band = smooth(noise, 5000) - smooth(noise, 900)
        return band * np.sin(np.pi * t / t[-1]) ** 2 * 0.9
    if kind == "click":
        ln = int(0.05 * SR)
        t = np.arange(ln) / SR
        return (np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 120) + np.diff(rng.standard_normal(ln + 1)) * np.exp(-t * 200) * 0.3) * 0.25
    if kind == "ding":
        ln = int(0.5 * SR)
        t = np.arange(ln) / SR
        a = np.sin(2 * np.pi * 1318.5 * t) * np.exp(-t * 9)
        b = np.zeros(ln)
        o = int(0.09 * SR)
        b[o:] = np.sin(2 * np.pi * 1975.5 * t[: ln - o]) * np.exp(-t[: ln - o] * 7)
        return (a + b) * 0.16
    if kind == "tick":
        ln = int(0.07 * SR)
        t = np.arange(ln) / SR
        return np.sin(2 * np.pi * 1760 * t) * np.exp(-t * 70) * 0.18
    if kind == "pop":
        ln = int(0.12 * SR)
        t = np.arange(ln) / SR
        f = 520 + 600 * t / t[-1]
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 32) * 0.22
    if kind == "impact":
        ln = int(1.2 * SR)
        t = np.arange(ln) / SR
        boom = np.sin(2 * np.pi * np.cumsum(40 + 60 * np.exp(-t * 9)) / SR) * np.exp(-t * 3.2)
        crack = rng.standard_normal(ln) * np.exp(-t * 40) * 0.25
        return (boom * 0.55 + crack) * 0.8
    if kind == "riser":
        ln = int(1.0 * SR)
        t = np.arange(ln) / SR
        f = 200 + 1400 * (t / t[-1]) ** 2
        tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.08
        noise = smooth(rng.standard_normal(ln), 2500) * 0.25
        return (tone + noise) * (t / t[-1]) ** 2
    raise ValueError(kind)


# ---------------------------------------------------------------- mix

def main():
    spec = json.load(open(sys.argv[1]))
    duration = spec["duration"]
    fps = spec["fps"]
    n = int(duration * SR)

    voice = np.zeros(n)
    for clip in spec["clips"]:
        x, sr = sf.read(clip["file"], dtype="float64")
        if x.ndim > 1:
            x = x.mean(axis=1)
        x = resample(x, sr)
        s0 = int(clip["start"] * SR)
        ln = min(len(x), n - s0)
        if ln > 0:
            voice[s0:s0 + ln] += x[:ln]

    # Gentle voice polish: normalize, light compression
    peak = np.max(np.abs(voice)) or 1
    voice = voice / peak * 0.9
    voice = np.tanh(voice * 1.6) / np.tanh(1.6)

    # Voice envelope for ducking and the mascot
    env = np.abs(voice)
    env = smooth(env, 12)
    env = np.clip(env / (np.percentile(env[env > 0.01], 95) if np.any(env > 0.01) else 1), 0, 1)

    ml, mr = music_bed(duration, spec["music"].get("style", "calm"))
    music_gain = 10 ** (spec["music"].get("gain_db", -20) / 20) * 4
    duck = 1 - spec["music"].get("duck", 0.6) * smooth(env, 3)
    fade = np.ones(n)
    fi, fo = int(1.0 * SR), int(2.5 * SR)
    fade[:fi] = np.linspace(0, 1, fi)
    fade[-fo:] = np.linspace(1, 0, fo)
    ml = ml * music_gain * duck * fade
    mr = mr * music_gain * duck * fade

    fx = np.zeros(n)
    for ev in spec["events"]:
        s = sfx(ev["kind"]) * ev.get("gain", 1.0)
        s0 = int(ev["t"] * SR)
        ln = min(len(s), n - s0)
        if ln > 0 and s0 >= 0:
            fx[s0:s0 + ln] += s[:ln]

    left = voice * 0.95 + ml + fx * 0.8
    right = voice * 0.95 + mr + fx * 0.8
    stereo = np.stack([left, right], axis=1)
    stereo = np.tanh(stereo * 1.1) / np.tanh(1.1)
    stereo *= 0.95 / (np.max(np.abs(stereo)) or 1)
    sf.write(spec["out"], stereo.astype(np.float32), SR, subtype="PCM_16")

    # Voice + SFX only, for adding licensed trending audio inside Instagram/TikTok
    if spec.get("out_nomusic"):
        dry = np.stack([voice * 0.95 + fx * 0.8] * 2, axis=1)
        dry = np.tanh(dry * 1.1) / np.tanh(1.1)
        dry *= 0.95 / (np.max(np.abs(dry)) or 1)
        sf.write(spec["out_nomusic"], dry.astype(np.float32), SR, subtype="PCM_16")

    # Per-frame mouth envelope
    frames = int(np.ceil(duration * fps))
    per = SR / fps
    mouth = [float(np.mean(env[int(i * per): int((i + 1) * per)])) if int(i * per) < n else 0.0 for i in range(frames)]
    json.dump([round(v, 3) for v in mouth], open(spec["envelope_out"], "w"))


if __name__ == "__main__":
    main()
