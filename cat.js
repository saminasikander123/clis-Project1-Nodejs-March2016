#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise

function* cat() {
    // Use 'yield' in here
    // Your implementation here
    let filename = process.argv[2] ? process.argv[2] : __filename
    let data = yield fs.readFile(filename)
    process.stdout.write('Contents of ' + filename + '\n\n')
    process.stdout.write(data + '<EOF>\n')
    // console.log(yield fs.readFile(__filename, console.log))
}

module.exports = cat