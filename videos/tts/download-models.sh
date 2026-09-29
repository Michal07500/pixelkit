#!/usr/bin/env bash
# Downloads the Kokoro voice model used for narration (~120 MB) into videos/tts/models/.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p models
BASE=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
for f in kokoro-v1.0.int8.onnx voices-v1.0.bin; do
  [ -f "models/$f" ] || curl -L --fail -o "models/$f" "$BASE/$f"
done
echo "Kokoro models ready in videos/tts/models/"
