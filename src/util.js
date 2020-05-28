import fs from 'fs'
import inquirer from 'inquirer'
import symbol from 'log-symbols' // 打印日志图表
import chalk from 'chalk' // 修改输入日志颜色
import downloadGit from 'download-git-repo' // git 下载

// 检查目录是否存在

let notExistFold = async (name) => {
  return new Promise((resolve) => {
    if (fs.existsSync(name)) {
      console.log(symbol.error, chalk.red('项目目录已经存在，请更换名字重新创建'))
    } else {
      resolve()
    }
  })
}

// 询问用户

let promptList = [
  {
    type: 'list',
    name: 'frame',
    message: 'please choose this project template',
    choices: ['vue', 'gulp'],
  },
  {
    type: 'input',
    name: 'description',
    message: 'please enter this project description: ',
  },
  {
    type: 'input',
    name: 'author',
    message: 'please enter the author name: ',
  },
]

let prompt = () => {
  return new Promise((resolve) => {
    inquirer.prompt(promptList).then((answer) => {
      resolve(answer)
    })
  })
}

// 项目模板下载

let downloadTemplate = async (ProjectName, url) => {
  return new Promise((resolve, reject) => {
    downloadGit(url, ProjectName, { clone: true }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 更新配置文件

let updateJsonFile = (fileName, obj) => {
  return new Promise((resolve) => {
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString()
      let json = JSON.parse(data)
      Object.keys(obj).forEach((key) => {
        json[key] = obj[key]
      })
      fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8')
      resolve()
    }
  })
}

export { notExistFold, prompt, downloadTemplate, updateJsonFile }
