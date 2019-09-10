const { parse } = require('url')
const fs = require("fs")

const parseBodyData = (req, callback) => {
    let data = '';
    req.on("data", chunk => {
        data += chunk
    })

    req.on("end", () => {
        callback(data)
    })
}

const studentHandler = {
    "GET": (req, res) => {
        console.log("GET")
        const buffer = fs.readFileSync("students.json"); //read the file as buffer
        const file = buffer.toString(); //read the buffer
        var url = parse(req.url);

        if (url.query) {
            var id = url.query.replace("id=", '');
            var students = JSON.parse(file);
            console.log(students)
            var student = students.find(x => x.ID == id);
            res.writeHead(200, {
                "Content-Type": "application/json"
            }) //set header and HTTP STATUS
            res.end(JSON.stringify(student))
        }
        else {
            res.writeHead(200, {
                "Content-Type": "application/json"
            }) //set header and HTTP STATUS
            res.end(file) //write the students and close connection
        }
    },
    "POST": (req, res) => {
        parseBodyData(req, (body) => {
            var student = JSON.parse(body);

            const buffer = fs.readFileSync("students.json"); //read the file as buffer
            const file = buffer.toString(); //read the buffer
            var students = JSON.parse(file);
            students.push(student);
            fs.writeFileSync("students.json", JSON.stringify(students))

            res.writeHead(200, {
                "Content-Type": "application/json"
            })
            res.end(JSON.stringify(students))
        });
    }
}


module.exports = (req, res) => {
    var method = studentHandler[req.method];
    if (method)
        method(req, res)
    else
        console.log("invalid method")
}