git add .

git commit -am "[release] Auto-commit"

npm version patch

npm run build:lib

npm publish

echo 'finish'

fi

echo ""