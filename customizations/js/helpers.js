const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const passwordgenerator = require('generate-password')
const replace = require('node-replace')

function readFile(pathToFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(data.toString())
    })
  })
}

function writeFile(pathToFile, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathToFile, data, err => {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}

function streamCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(command, args, {
      stdio: 'inherit',
      ...options,
    })

    cmd.on('close', code => {
      if (code !== 0) {
        reject(`${command} ${args.join(' ')} exited with exit code ${code}`)
        return
      }

      resolve()
    })
  })
}

function isInstalledAsDropIn() {
  return new Promise((resolve) => {
    fs.access(path.join(__dirname, '..', '..', 'htdocs'), null, err => {
      if (err) {
        resolve(false)
        return
      }

      resolve(true)
    })
  })
}

function rename(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, err => {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}

async function runInVagrant(command) {
  return await streamCommand('vagrant', `ssh -- -q -t ${command}`.split(' '))
}

function password() {
  return passwordgenerator.generate({ length: 32, numbers: true, excludeSimilarChars: true })
}

module.exports = {
  readFile,
  writeFile,
  streamCommand,
  isInstalledAsDropIn,
  rename,
  replace,
  runInVagrant,
  password,
}
