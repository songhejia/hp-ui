git add .

git commit -am "[release] Auto-commit"

REM npm version patch

npm run build:lib

npm publish

echo finish

PAUSE