#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk')
const qrcode = require('qrcode')
const {exec} = require('child_process');
const { exit, stderr } = require('process');
const os = require('os')
const path = require('path')

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .option('t', {
    type: 'string',
    describe:"需要转换的文本"
  })
  .option('p', {
    type: 'boolean',
    default: true,
    description:'生成后是否需要打开预览'
  })
  .option('d', {
    type: 'string',
    description: "指定保存图片的路径，默认为打开终端的目录",
    default:'.'
  })
  .option('name', {
    type: 'string',
    alias:"n",
    description: '生成的二维码的名称，默认为时间戳',
    default:''
  })
  .example('-t "xxxxxx"','生成二维码并预览')
  .help('h')
  .alias('h', 'help')
  .alias('t', 'text')
  .alias('p', 'preview')
  .alias('d', 'destination')
  .alias('h', 'help')
  .default('d', '.')
  .demandOption(['t'], 't必须填写')
  .epilog('copyright lyn')
  .argv;

const pwd = process.pwd

const text = argv.text
const preview = argv.preview
const name = argv.name.trim() == 0 ? new Date().getTime() + '.png' : name + '.png'
const destination = path.resolve(__dirname,name)

if (text.trim() == '') {
  console.log(chalk.red('文本不能为空'))
  exit(-1)
}
console.log(chalk.green('正在生成二维码，生成后会自动打开预览！'))
qrcode.toFile(destination, text, (err) => {
  if (err) {
    return
  }
  console.log(chalk.green('成功生成二维码：' + destination))
  if (preview) {
    const type = os.type
    if (type == 'Linux') {
      
    } else if (type == 'Darwin') {
      exec('open ' + destination, (err, stdio, stderr) => {
        if (err) {
          console.log(chalk.red('打开图片失败' + err))
          return
        }
        console.log(stdio)
        console.log(stderr)
      })
    } else if (type == 'Windows_NT') {
      exec('start ' + destination, (err, stdio, stderr) => {
        if (err) {
          console.log(chalk.red('打开图片失败' + err))
          return
        }
        console.log(stdio)
        console.log(stderr)
      })
    }
  }
})