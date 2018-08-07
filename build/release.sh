git add .

git commit -am "[release] auto-commit"

npm version patch

npm run build:lib

npm publish

echo finish

read -p "Please input a string: " str