const fs = require('fs-extra');
const path = require('path');
const axios = require('axios')
const _ = require('lodash')

const content_url = 'http://api.open.zhaopin.com/dict/dictAdminService/listAllItems?access_token=c4215a32bbf74a2aa410db8473a58f4dV8k5'
/**
 * 加载远程数据
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
function loadRemoteData(url, params) {
  return new Promise(function (resolve, reject) {
    axios.get(url, {
      params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 输出内容到local目录
 *
 * @param {*} id
 * @param {*} name
 */
function outputFile(id, name) {
  loadRemoteData(content_url, { dictId: id }).then(result => {
    const outputData = []
    const data = result.data
    _.each(data, item => {
      outputData.push([item.strKey, item.value, item.parentStrKey, item.order])
    })
    console.log('output', id, name, outputData)

    const outputPath = path.join(__dirname, '../local/') + name + '.json'
    fs.removeSync(outputPath)
    fs.outputFileSync(outputPath, JSON.stringify(outputData))
  })
}

const url_dict = 'http://api.open.zhaopin.com/dict/dictAdminService/listAllDicts?access_token=c4215a32bbf74a2aa410db8473a58f4dV8k5'
loadRemoteData(url_dict).then(result => {
  const data = result.data
  _.each(data, item => {
    outputFile(item.id, item.name)
  })
})

