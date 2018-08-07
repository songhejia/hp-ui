const fs = require('fs-extra');
const path = require('path');
const Components = require('./get-components')()
const uppercamelize = require('uppercamelcase')
const tips = '// This file is auto gererated by build/build-entry.js';
const version = process.env.VERSION || require('../package.json').version;

function buildHPUIEntry() {
  const uninstallComponents = [
    'Lazyload',
    'Waterfall'
  ];

  const importList = Components.map(name => `import ${uppercamelize(name)} from './${name}';`);
  const exportList = Components.map(name => `${uppercamelize(name)}`);
  const intallList = exportList.filter(name => !~uninstallComponents.indexOf(uppercamelize(name)));
  const content = `${tips}
${importList.join('\n')}
const version = '${version}';
--import 'font-awesome/css/font-awesome.min.css'
import './base.scss'
const components = [
  ${intallList.join(',\n  ')}
];
const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component);
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  install,
  version,
  ${exportList.join(',\n  ')}
};
export default {
  install,
  version
};
`;

  fs.writeFileSync(path.join(__dirname, '../packages/index.js'), content);
}
function buildDemoEntry() {
  const dir = path.join(__dirname, '../packages');
  const demos = fs.readdirSync(dir)
    .filter(name => fs.existsSync(path.join(dir, `${name}/demo/index.vue`)))
    .map(name => `'${name}': () => wrapper(import('../../packages/${name}/demo'), '${name}')`);

  const content = `${tips}
import { wrapper } from './demo-common';

export default {
  ${demos.join(',\n  ')}
};
`;
  fs.writeFileSync(path.join(dir, '../docs/src/demo-entry.js'), content);
}

buildHPUIEntry()
// buildDemoEntry()