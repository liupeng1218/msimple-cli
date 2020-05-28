import symbol from 'log-symbols'
import chalk from 'chalk'
import ora from 'ora'

const nodeUtil = require('util')

const exec = nodeUtil.promisify(require('child_process').exec)


let loadCmd = async (cmd, text) => {
  let laoding = ora()
  laoding.start(`${text}:命令执行中...`)
  await exec(cmd)
  laoding.succeed(`${text}:命令执行完成`)
}

let init = async () => {
  try {
    await loadCmd(`git init`, 'git初始化')
    await loadCmd(`npm install`,'安装依赖')
  } catch (err) {
    console.log(symbol.error, chalk.red('初始化失败'))
    console.log(symbol.error, chalk.red(err))
    process.exit(1)
  }
}

export default init
