"""Narration: turns text lines into WAV files with the Kokoro neural voice.

Usage: python tts.py <jobs.json> <out_dir>

jobs.json: [{"id": "m03_s01_b00", "text": "...", "voice": "af_heart", "speed": 1.0}, ...]
Writes <out_dir>/<hash>.wav for each job (cached by text+voice+speed) and prints a JSON
map {id: {"file": ..., "duration": seconds}} to stdout.

Model files (not in git) are read from $KOKORO_DIR (default: ./models next to this file):
  kokoro-v1.0.int8.onnx, voices-v1.0.bin  (see download-models.sh)
"""

import hashlib
import json
import os
import sys
from pathlib import Path

import soundfile as sf

HERE = Path(__file__).resolve().parent
MODELS = Path(os.environ.get("KOKORO_DIR", HERE / "models"))


def main() -> None:
    jobs = json.loads(Path(sys.argv[1]).read_text())
    out_dir = Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    result = {}
    todo = []
    for job in jobs:
        key = f"{job['voice']}|{job.get('speed', 1.0)}|{job['text']}"
        name = hashlib.sha1(key.encode()).hexdigest()[:16] + ".wav"
        path = out_dir / name
        result[job["id"]] = {"file": str(path)}
        if not path.exists():
            todo.append((job, path))

    if todo:
        from kokoro_onnx import Kokoro

        kokoro = Kokoro(str(MODELS / "kokoro-v1.0.int8.onnx"), str(MODELS / "voices-v1.0.bin"))
        for i, (job, path) in enumerate(todo, 1):
            samples, rate = kokoro.create(job["text"], voice=job["voice"], speed=job.get("speed", 1.0), lang="en-us")
            sf.write(path, samples, rate)
            print(f"  voice {i}/{len(todo)}", file=sys.stderr, flush=True)

    for job in jobs:
        info = sf.info(result[job["id"]]["file"])
        result[job["id"]]["duration"] = info.frames / info.samplerate

    json.dump(result, sys.stdout)


if __name__ == "__main__":
    main()
