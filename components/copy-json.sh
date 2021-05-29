cd ./dist/collection/i18n;

for f in *.json; do
  [[ -f "$f" ]] || continue
  dir="${f%.*.*.*}"
  cp "$f" "../components/$dir/$f"
done