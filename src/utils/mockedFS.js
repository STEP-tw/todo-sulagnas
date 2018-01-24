class MockedFs {
  constructor(fileContentPairs) {
    this.files = {};
    fileContentPairs.forEach(pair=>this.files[pair.name] = pair.content)
  }
  addValidFile(fileContentPair){
    let file = fileContentPair;
    this.files[file.path] = file.content;
  }
  existsSync(filePath){
    return Object.keys(this.files).includes(filePath);
  }
  writeFileSync(filePath,content){
    this.files[filePath] = (typeof content == 'string')? content : JSON.stringify(content);
  }
  readFileSync(filePath){
    if(this.existsSync(filePath)) {
      return this.files[filePath];
    }else{
      throw Error(`ENOENT: no such file or directory, open '${filePath}'`)
    }
  }
  appendFileSync(filePath,contentToAppend){
    if(this.existsSync(filePath)) {
      this.files[filePath] += contentToAppend;
    }else{
      throw Error(`ENOENT: no such file or directory, open '${filePath}'`)
    }
  }
}

module.exports = MockedFs;
