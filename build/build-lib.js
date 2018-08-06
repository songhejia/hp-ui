/**
 * Build npm lib
 */
const shell = require('shelljs');
const signale = require('signale');
const { Signale } = signale;
const tasks = [
  'build:file',
  'build:components',
  // 'build:hpui'
];

tasks.forEach(task => {
  signale.start(task);

  const interactive = new Signale({ interactive: true });
  interactive.pending(task);
  const cmd = `npm run ${task} --silent`;
  console.log('执行命令：', cmd)
  shell.exec(cmd);
  interactive.success(task);
});