#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let path = require('path')
let argv = require('yargs').argv
//let dir = argv.dir || __dirname


function* mkdir() {
  let dirArgument = process.argv[2]
  let currentDir = __dirname
  if (dirArgument) {
    
    let subDirs = dirArgument.split('/')
    for (var i = 0; i < subDirs.length; i++) {
      let dirName = subDirs[i]
      if( subDirs[i] == '.') {
        continue
      }  // if
      //read files in current directory
      let files = yield fs.readdir(currentDir)
      let alreadyExists = false;
      if (files) {
        for(var f = 0; f < files.length; f++) {
          if(files[f] == dirName) {
            process.stdout.write(dirName + ' dir already exists\n' )
            alreadyExists = true
          } // if
        }  // for
      }  // if
      if (alreadyExists == false) {
        yield fs.mkdir(currentDir + '/' +  dirName)
        process.stdout.write('Created dir ' + currentDir + '/' + dirName + '\n')
      }  // if alreadyExists
      currentDir = currentDir + '/' + dirName
    } // for
   }  // if dirArgument
} // mkdir

module.exports = mkdir