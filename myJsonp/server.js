const http = require('http')
const url = require('url')

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'})
    
    const {url} = request
    let callback = url.split('=').slice(-1) //回调函数的名字

    const data = {
        name1: 'djp',
        name2: 'tl'
    }
    console.log('script query:', callback)
    let result = `${callback}(${JSON.stringify(data)})`
    console.log(`result type is ${typeof result}`)
    
    if (new Date().getSeconds() % 2 === 0) {
        response.end(result)
    }
    response.end(`test=10000`) // 
}).listen('7777', () => {
    console.log(`server running on: http://127.0.0.1:7777`)
})