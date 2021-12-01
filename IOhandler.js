/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {"./myfile"} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
      fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))
      .on('finish', function(err) {
        resolve("Extraction operation complete")
      });
  })
};



/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, "utf8", (err, data) => {
        if (err) {
            reject(err)
        } else {
            new_list = []
            data.forEach((image) => {
              // image = `${dir}/${image}` 
              image = path.join(`${dir}`, `${image}`)
              if (image.includes('.png') == true) {
                new_list.push(image)
              }
            })
            resolve(new_list)
        } 
    });
  });
};



/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(pathOut) == false) {
      fs.mkdir(pathOut, (err) => {
        if (err) {
          reject(err)
        } else {
          console.log(`${pathOut} Folder made`)
        }
      })
    }
    fs.createReadStream(pathIn)
    .pipe(
      new PNG()
    )
    .on('error', function(err) {
      console.log(err)
    })
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;
          // invert color
          // this.data[idx] = 255 - this.data[idx];
          // this.data[idx + 1] = 255 - this.data[idx + 1];
          // this.data[idx + 2] = 255 - this.data[idx + 2];
          //tests
          //(this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3
          // (this.data[idx] * 0.3) + (this.data[idx + 1] * 0.59) + (this.data[idx + 2] * 0.11) 
          gray_avg = (this.data[idx] * 0.3) + (this.data[idx + 1] * 0.59) + (this.data[idx + 2] * 0.11)
          this.data[idx] = gray_avg;
          this.data[idx + 1] = gray_avg ;
          this.data[idx + 2] = gray_avg ;
          // and reduce opacity
          // this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }
      new_filename = path.basename(pathIn)
      new_path = path.join(`${pathOut}`, `${new_filename}`)
      console.log(new_path)
      this.pack().pipe(fs.createWriteStream(new_path));
      resolve("Grayscaling complete")
    });
  })
};


module.exports = {
  unzip,
  readDir,
  grayScale,
};
