const http = require('http')
const url = require('url')
const { host, port } = require('./config')

module.exports = start
function start(route, handle) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname
    console.log('Request for ' + pathname + ' received.')
    route(handle, pathname, res, req)
  }

  http.createServer(onRequest).listen(port, host, () => {
    console.log(`Server has started and listening on ${host}:${port}`)
  })
}
