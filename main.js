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


// async function main() {
//   const unzipped = await IOhandler.unzip(zipFilePath, pathUnzipped);
//   // console.log(unzipped);
//   return unzipped

//   // console.log(read_dir)
//   // const Image_processed = await read_dir.forEach(image => { 
//   //   IOhandler.grayScale(String(image), pathProcessed) 
//   // })
//   // console.log(Image_processed)
// }

// async function read_directory() {
//   const read_dir = await IOhandler.readDir(pathUnzipped)
//   return read_dir
// }
