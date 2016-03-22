#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let path = require('path')
let argv = require('yargs').argv
//let dir = argv.dir || __dirname


function* rm() {
  var dirnames = process.argv[2]

  var current_dir = __dirname
  if(dirnames) {
    var dirs = dirnames.split('/')

    for(var i = 0; i < dirs.length; i++) {
      var dirname = dirs[i]
      if( dirname == '.' || dirname == '') {
        continue
      }
      var path = current_dir + '/'+ dirname
      var statValue = yield fs.stat(path)
      if(statValue.isFile()) {
        yield fs.unlink(path)
        process.stdout.write('Delete file ' + path + '\n' )
      } else {
        yield deleteAllFiles(path)
          // yield fs.unlink(path)
        process.stdout.write('Delete dir ' + path + '\n' )
      }
    }
  }
}

function* deleteAllFiles(dirname) {
  //read files in current directory
  var files = yield fs.readdir(dirname)
  if(files) {
    for(var f = 0; f < files.length; f++) {
        var path = dirname + '/' + files[f]
        var statValue = yield fs.stat(path)
        if(statValue.isDirectory()) {
          yield deleteAllFiles( path)
            // yield fs.unlink(path)
          process.stdout.write('Delete dir ' + path + '\n' )
        } else if(statValue.isFile()) {
          // yield fs.unlink(files[i])
          process.stdout.write('Delete file ' + path + '\n' )
        }

      }

  }
}

module.exports = rm
