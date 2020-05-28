import symbol from 'log-symbols' // 打印日志图表
import chalk from 'chalk' // 修改输入日志颜色
import ora from 'ora' // 显示下载进度

import { notExistFold, prompt, downloadTemplate, updateJsonFile } from './util'

let create = async (ProjectName) => {
  if (ProjectName === undefined) {
    console.log(symbol.error, chalk.red('请输入项目名称！'))
  } else {
    // 当前目录不存在同名项目继续创建
    notExistFold(ProjectName).then(() => {
      // 交互询问
      prompt().then((answer) => {
        console.log(answer)
        // 根据用户配置信息下载模板&更新模板
        let loading = ora('模板下载中...')
        loading.start('模板下载中...')

        let URL = ''
        switch (answer.frame) {
          case 'vue':
            URL = 'direct:https://github.com/liupeng1218/vue-template.git'
            break
          default:
            break
        }

        downloadTemplate(ProjectName, URL)
          .then(() => {
            loading.succeed('模板下载完成...')
            // 根据用户输入更新配置文件
            const fileName = `${ProjectName}/package.json`
            answer.name = ProjectName
            updateJsonFile(fileName, answer).then(() => {
              console.log(symbol.success, chalk.green('配置文件更新完成。'))
            })
          })
          .catch((err) => {
            loading.fail('模板下载失败：' + err)
          })
      })
    })
  }
}

export default create
