const assert = require('chai').assert;
const DummyFs = require('../src/utils/dummyFs.js');

describe('dummyFs',()=>{
  beforeEach('create a dummy fs',()=>{
    fs = new DummyFs([{'name':'./dummyFile.txt','content':''}]);
  });
  describe('exist or not',()=>{
    it('should return true when asked for an existing file',()=>{
      assert.isOk(fs.existsSync('./dummyFile.txt'));
    });
    it('should return false when asked for the non existed file',()=>{
      assert.isNotOk(fs.existsSync('./badFile.js'));
    });
  });
  describe('storing and retriving',()=>{
    it('should return the file content',()=>{
      fs.writeFileSync('./dummyFile.txt','this is dummy file');
      let expected = 'this is dummy file';
      assert.equal(fs.readFileSync('./dummyFile.txt'),expected);
    })
  });
});
