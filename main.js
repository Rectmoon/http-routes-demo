const fs = require('fs')
const path = require('path')

const start = require('./server')
const { routes } = require('./config')

function route(handle, pathname, res, req) {
  console.log('当前请求路径为: ' + pathname)
  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, req)
  } else {
    const content = fs.readFileSync('./views/404.html')
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.write(content)
    res.end()
  }
}

function deal(fileName, res) {
  const content = fs.readFileSync(path.join(__dirname, `./views/${fileName}.html`))
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(content)
  res.end()
}

const handle = routes.reduce((acc, next) => {
  acc[next.path] = res => deal(next.name, res)
  return acc
}, {})

start(route, handle)
