const http = require("http")
const { parse } = require("url")
const studentHandler = require("./lib/studentsHandler")

const hostname = "127.0.0.1"
const port = 3500

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const url = parse(req.url, true)
    console.log(url)
    switch (url.pathname) {
        case "/":

            res.end("Hey, this is the home address! Cool things under /students!");
            break;
        case "/students":
            studentHandler(req, res)
            break;
        default:
            res.statusCose = 404
            res.end("Not found")
    }
})

server.listen(port, hostname, () => {
    console.log("Hey Strivers, the server is running!")
})