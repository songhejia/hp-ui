var shell = require('shelljs');

// shell.cd('../')
shell.echo(shell.pwd())
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

shell.echo('start 提交代码')
if (shell.exec('git add .').code !== 0) {
  shell.echo('Error: Git add failed');
  shell.exit(1);
}
if (shell.exec('git commit -m "[release] Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed');
  shell.exit(1);
}
shell.echo('end 提交代码')


shell.echo('start 版本自增')
if (shell.exec('npm version patch').code !== 0) {
  shell.echo('Error: npm version failed');
  shell.exit(1);
}
shell.echo('end 版本自增')


shell.echo('start  编译代码')

if (shell.exec('npm run build:lib').code !== 0) {
  shell.echo('Error: npm run build:lib failed');
  shell.exit(1);
}
shell.echo('end 编译代码')


shell.echo('start  发布npm')
if (shell.exec('npm publish').code !== 0) {
  shell.echo('Error: npm publish failed');
  shell.exit(1);
}

shell.echo('end 发布npm')