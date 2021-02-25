const { reject, resolve } = require('bluebird')
const fs = require('fs')
const path = require('path')

// 找到目录中最大的文件，下面是同步核心代码
/* const dir = fs.readdirSync(__dirname)
dir.forEach(file => {
  const stats = fs.statSync(path.join(__dirname, file))
  if (stats.isFile()) {
    console.log(`file-----${file} ${stats.size}`)
  }
}) */
function findlargest1(dir) {
  fs.readdir(dir, (err, files) => {
    const container = []
    const length = files.length

    files.forEach((file, index) => {
      fs.stat(path.join(dir, file), (err, stat) => {
        container.push(stat)
        
        if (length - 1 === index) { //遍历完最后一个了
       
          const lastFile = container
            .filter((stat) => stat.isFile())
            .reduce((prev, next) => {
              if (prev.size > next.size) return prev
              return next
            })

          console.log(`last file: ${lastFile.size}`)

          console.log(`最大的文件是：
            ${files[container.indexOf(lastFile)]}，大小为: ${lastFile.size}`)
        }
      })
    })

  })
}

// findlargest1(__dirname)

// 使用 Promise 重写
function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) { reject(err) } else { resolve(files) }
    })
  })
}

// 异步读取文件信息
function readStat(dir, filename) {
  return new Promise((resolve, reject) => {
    fs.stat(path.join(dir, filename), (err, stat) => {
      if (err) reject(err)
      resolve(stat)
    })
  })
}

function findlargest2() {
  readDir(__dirname)
  .then((files) => {
    console.log(`files: ${files}`)
   
    // 收集所有异步
    const promises = files.map(file => readStat(__dirname, file))

    // 一定要 return
    return Promise.all(promises).then((stats) => ({ files, stats }))
    // return 1
  })
  .then(data => {
    console.log(`stat size: ${ data }`)

    // 找到最大 size
    // stats.forEach(stat => console.log(`stat: ${stat.size}`))
   
    const largest = data.stats
      .filter((stat) => stat.isFile())
      .reduce((prev, next) => {
        return prev.size > next.size ? prev : next
      })

    console.log(`largest is : 
      ${data.files[data.stats.indexOf(largest)]} 
      --- ${ largest.size }`)
  })
  .catch(err => console.log(`err: ${err}`))

}
// findlargest2()

// 第三种 使用 async await

function readDir1(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) { reject(err) } else { resolve(files) }
    })
  })
}

function readStat1(dir, filename) {
  return new Promise((resolve, reject) => {
    fs.stat(path.join(dir, filename), (err, stat) => {
      if (err) reject(err)
      resolve(stat)
    })
  })
}

async function findlargest3(dir) {
  const files = await readDir1(dir)
  console.log(`files: ${files}`)
  // files.forEach(file => console.log(`file: ${file}`))
  console.log(11111111111)
  const promises = files.map(file => readStat1(dir, file))
  const stats = await Promise.all(promises)

  stats.forEach((stat, index) => console.log(`${files[index]}: ${stat.size}`))

}

findlargest3(__dirname);

// ...........
(async () => {
  const s = await readDir1(__dirname)
  console.log('ssssss', s)
})()