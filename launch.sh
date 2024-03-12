# HOW TO RUN: ./launch.sh
# USE [Q]+[ENTER] TO STOP HOSTING AND BUILD
# ⚠️ [CTRL]+[C] WILL NOT BUILD THE PROJECT ⚠️

echo "[LAUNCHER] Launching from: root/launch.sh"
echo "[LAUNCHER] Compiling TypeScript..."
tsc src/main.ts --outDir src/build/
echo "[LAUNCHER] Running Vite..."
echo "[LAUNCHER] Use [Q]+[ENTER] to quit safely and allow vite to build the project!"
npx vite
echo "[LAUNCHER] Building Project..."
npx vite build --emptyOutDir
echo "[LAUNCHER] Exiting..."