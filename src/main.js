import program from 'commander'

import create from './create'
import init from './init'
import dev from './dev'

/* 处理命令行 */

let actionMap = {
  // 创建项目
  create: {
    description: '创建一个新项目',
    usages: ['mssimple-cli create ProjectName', 'ms-cli create ProjectName', 'mc create ProjectName'],
    akuas: 'c',
  },
  // 项目初始化
  init: {
    description: '项目初始化',
    usages: ['mssimple-cli init', 'ms-cli init', 'mc init'],
    akuas: 'i',
  },
  // 运行项目
  // dev: {
  //   description: '项目本地启动',
  //   usages: ['mssimple-cli dev', 'ms-cli dev', 'mc dev'],
  //   options: [
  //     {
  //       flags: '-p --port <port>',
  //       description: '端口',
  //       defaultValue: '3000',
  //     },
  //   ],
  //   akuas: 'd',
  // },
}

// 添加 create init dev 命令

Object.keys(actionMap).forEach((action) => {
  // 挂载 option 参数
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach((index) => {
      let option = actionMap[action].options[index]
      program.option(option.flags, option.description, option.defaultValue)
    })
  }
  // 挂载 command 命令
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case 'create':
          create(...process.argv.slice(3))
          break
        case 'init':
          init()
          break
        // case 'dev':
        //   dev(program.port)
        //   break
        default:
          break
      }
    })
})

// 项目版本

program.version(require('../package.json').version, '-v --version').parse(process.argv)

// 帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
