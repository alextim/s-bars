/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const PATTERN = /\.ua.json$|\.ua.md$|\.ua.yaml$/;
const REPLACE = 'uk';

let dirCount = 0;
const listDir = (dir, fileList = []) => {
  dirCount++;
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = listDir(path.join(dir, file), fileList);
    } else if (PATTERN.test(file)) {
      const parts = file.split('.');
      const name = parts[0];
      const ext = parts[parts.length - 1];
      const newFileName = `${name}.${REPLACE}.${ext}`;
      const src = path.join(dir, file);
      const newSrc = path.join(dir, newFileName);
      fileList.push({
        oldSrc: src,
        newSrc,
      });
    }
  });

  return fileList;
};

const startTime = new Date();
console.log(`Pattern: ${PATTERN.toString()}`);
console.log(`Replace: ${REPLACE}`);

const foundFiles = listDir('content');
foundFiles.forEach((f) => {
  fs.renameSync(f.oldSrc, f.newSrc);
});
const finishTime = new Date();
console.log(`\nExecution time: ${finishTime - startTime} ms`);
console.log(`Folders scanned: ${dirCount}`);
if (foundFiles.length) {
  console.log(`Files renamed: ${foundFiles.length}`);
} else {
  console.log('No matched files');
}
