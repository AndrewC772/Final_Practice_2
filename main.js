/*
 * Project:
 * File Name: main.js
 * Description:
 *A
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;


IOhandler.unzip(zipFilePath, pathUnzipped)
.then((msg) => console.log(msg))
.then((data) => IOhandler.readDir(pathUnzipped))
.then((data) => data.forEach(image => { 
  console.log(data)
  IOhandler.grayScale(String(image), pathProcessed) 
}))
.catch((err) => console.log(err))
