var shell = require('shelljs');

// shell.cd('../')
shell.echo(shell.pwd())
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

shell.echo('start 提交代码')
shell.exec('git add .')
if (shell.exec('git commit -m "[release] Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed');
  shell.exit(1);
}
shell.echo('end 提交代码')


shell.echo('start 版本自增')
shell.exec('git version patch')
shell.echo('start 版本自增')


shell.echo('start  编译代码')

shell.exec('npm run build:lib')
shell.echo('start 编译代码')


shell.echo('start  发布npm')
shell.exec('npm publish')
shell.echo('start 发布npm')