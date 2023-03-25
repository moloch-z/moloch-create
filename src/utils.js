const fs = require("fs");
const { red, green, bold, yellow } = require('kolorist')
const prettier = require("prettier/standalone");
const parser = require("prettier/parser-babel");


function Log(text) {
  console.log(text)
}
Log.success = function (text) {
  console.log(`  ${bold(green(text))}`)
}
Log.warn = function (text) {
  console.log(`  ${bold(yellow(text))}`)
}
Log.error = function (text) {
  console.log(`  ${bold(red(text))}`)
}


function writeFile(filepath, data, fileType = "json") {

  fs.writeFile(
    filepath,
    prettier.format(typeof data === 'string' ? data : JSON.stringify(data), {
      parser: fileType,
      plugins: [parser],
    }),
    (err) => {
      if (err) {
        Log(err);
        Log.error("---------------------- Write err --------------------");
      } else {
        Log.success("---------------------- Write success --------------------");
      }
    }
  );
}

module.exports = {
  Log,
  writeFile
}