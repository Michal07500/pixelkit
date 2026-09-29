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
    bpm = 86 if style == "calm" else 112
    beat = 60 / bpm
    bar = 4 * beat
    n = int(duration * SR) + SR
    L = np.zeros(n)
    R = np.zeros(n)
    prog = PROGRESSIONS[style]
    t_bar = np.arange(int(bar * SR)) / SR

    bars = int(np.ceil(duration / bar)) + 1
    for b in range(bars):
        chord = prog[b % len(prog)]
        start = int(b * bar * SR)
        seg = slice(start, min(start + len(t_bar), n))
        m = seg.stop - seg.start
        if m <= 0:
            break
        tt = t_bar[:m]

        # Pad: detuned soft saws, lowpassed, wide stereo
        pad_l = np.zeros(m)
        pad_r = np.zeros(m)
        for note in chord:
            f = midi_hz(note)
            for det, side in ((-0.12, "l"), (0.12, "r")):
                ph = 2 * np.pi * f * (1 + det / 100) * tt
                wave = np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.12 * np.sin(3 * ph)
                if side == "l":
                    pad_l += wave
                else:
                    pad_r += wave
        env = adsr(m, 0.6, 0.9)
        L[seg] += pad_l * env * 0.035
        R[seg] += pad_r * env * 0.035

        # Bass on beats 1 and 3
        root = chord[0] - 12
        for k in (0, 2):
            s0 = start + int(k * beat * SR)
            ln = int(beat * 1.8 * SR)
            if s0 >= n:
                continue
            ln = min(ln, n - s0)
            tb = np.arange(ln) / SR
            wave = np.sin(2 * np.pi * midi_hz(root) * tb) * np.exp(-tb * 2.2) * adsr(ln, 0.01, 0.1)
            L[s0:s0 + ln] += wave * 0.16
            R[s0:s0 + ln] += wave * 0.16

        # Pluck arpeggio in 8th notes, ping-pong panned
        arp = sorted(chord)[1:] + [chord[0] + 12]
        for k in range(8):
            s0 = start + int(k * beat / 2 * SR)
            ln = int(0.5 * SR)
            if s0 >= n:
                continue
            ln = min(ln, n - s0)
            tp = np.arange(ln) / SR
            f = midi_hz(arp[k % len(arp)] + 12)
            wave = (np.sin(2 * np.pi * f * tp) + 0.25 * np.sin(4 * np.pi * f * tp)) * np.exp(-tp * 9)
            pan = 0.35 if k % 2 == 0 else 0.65
            L[s0:s0 + ln] += wave * 0.05 * (1 - pan) * 2
            R[s0:s0 + ln] += wave * 0.05 * pan * 2

        if style == "hype":
            for k in range(4):
                # Kick
                s0 = start + int(k * beat * SR)
                ln = min(int(0.28 * SR), n - s0)
                if ln > 0:
                    tk = np.arange(ln) / SR
                    freq = 45 + 75 * np.exp(-tk * 28)
                    kick = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-tk * 11)
                    L[s0:s0 + ln] += kick * 0.22
                    R[s0:s0 + ln] += kick * 0.22
                # Hat on the off-beat
                s1 = start + int((k + 0.5) * beat * SR)
                ln = min(int(0.05 * SR), n - s1)
                if ln > 0:
                    th = np.arange(ln) / SR
                    hat = np.diff(rng.standard_normal(ln + 1)) * np.exp(-th * 90)
                    L[s1:s1 + ln] += hat * 0.02
                    R[s1:s1 + ln] += hat * 0.025

    return L[: int(duration * SR)], R[: int(duration * SR)]


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
    duck = 1 - 0.6 * smooth(env, 3)
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

    # Per-frame mouth envelope
    frames = int(np.ceil(duration * fps))
    per = SR / fps
    mouth = [float(np.mean(env[int(i * per): int((i + 1) * per)])) if int(i * per) < n else 0.0 for i in range(frames)]
    json.dump([round(v, 3) for v in mouth], open(spec["envelope_out"], "w"))


if __name__ == "__main__":
    main()
