const fs = require('fs')
const path = require('path')
const config = require('config')
const breakResponse = require('./helpers').breakResponse


const subscribeForLog = (stm, name) => {
  stm.on("close", _ => console.log(`${name} - close`) )
  stm.on("data", _ => console.log(`${name} - data`) )
  stm.on("end", _ => console.log(`${name} - end`) )
  stm.on("finish", _ => console.log(`${name} - finish`) )

  stm.on("readable", _ => console.log(`${name} - readable`) )
  stm.on("drain", _ => console.log(`${name} - drain`) )
  stm.on("error", _ => console.log(`${name} - error`) )
  stm.on("pipe", _ => console.log(`${name} - pipe`) )
  stm.on("unpipe", _ => console.log(`${name} - unpipe`) )
}

module.exports = (request, response, pathName, console = null) => {
    const baseName = path.basename(pathName)

    const writeStm = new fs.createWriteStream(pathName, {flags: 'wx'}) //do not overwrite existing file
    let bytesSent = 0
    subscribeForLog(request, 'REQ')
    subscribeForLog(writeStm, 'WR')

    writeStm.on('error', (err) => {
        console && console.log(`Write error happened: ${err.message}`)
        if (err.code === 'EEXIST') 
            breakResponse(response, 409, `File ${baseName} already exists`)
        else if (err.code === "ENOENT")
            breakResponse(response, 404, `File ${baseName} not found`)
        else {            
            breakResponse(response, 500, `Write error happened: ${err.message}`)                    
            removeFile()
        }
    })
    .on('close', () => { //finish - надо close, а не finish, так как finish для файла - это очистка буфера
        console && console.log(`File uploaded: ${path.basename(pathName)}`)
        response.end(`File ${path.basename(pathName)} uploaded`) //reply to the client, that we successfully finished
    })
    
    request.on('close', () => { //client connection was broken
        console && console.log('Client disconncted')
        writeStm.destroy()
        removeFile()
    })
    .on('error', (err) => { //maybe not needed as NodeJs handles TCP errors inside and closes the stream
        console && console.log(`Network error happened: ${err.message}`)
        breakResponse(response, 500, `Network error happened: ${err.message}`)
        writeStm.destroy()
        removeFile()
    })
    .pipe(writeStm)
}
