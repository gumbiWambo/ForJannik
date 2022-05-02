const fs = require('fs');
const path = require('path');
const concat = require('concat');

const targetFolder = '../component';
const sourceFolder = './dist/web-components/';
const typeScriptFolder = './out-tsc/sdk-messages/types';
const componentName = 'dialog';

const clearFolder = (folder) => {
  if (fs.existsSync(folder)) {
    fs.readdirSync(folder).forEach(file => {
      const target = path.join(folder, file);
      if (fs.lstatSync(target).isDirectory()) {
        clearFolder(target);
      } else {
        fs.unlinkSync(target);
      }
    });
    fs.rmdirSync(folder);
  }
};

const concatJsFiles = async () => {
  const jsFiles = fs.readdirSync(sourceFolder, {encoding: 'utf8'}).filter(x => x.endsWith('.js')).map(x => sourceFolder + '/' + x);
  await concat(jsFiles, path.join(targetFolder, 'dist', componentName + '.js'));
};

const copyDTSFiles = (source, target) => {
  if (fs.existsSync(source)) {
    fs.readdirSync(source).forEach(file => {
      const sourceFile = path.join(source, file);
      const lstat = fs.lstatSync(sourceFile);
      const targetPath = path.join(target, file);
      if(lstat.isFile()) {
        fs.copyFileSync(sourceFile, targetPath);
      } else if (lstat.isDirectory()) {
        fs.mkdirSync(targetPath);
        copyDTSFiles(sourceFile, targetPath);
      }
    });
  }
};

clearFolder(targetFolder);
fs.mkdirSync(path.join(process.cwd(), targetFolder, 'dist'), {recursive: true});
concatJsFiles();
