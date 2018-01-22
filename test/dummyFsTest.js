const assert = require('chai').assert;
const DummyFs = require('../src/utils/dummyFS.js');

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
  describe('readFileSync',()=>{
    it('should throw an error while reading a file which is not existed',()=>{
      assert.throws(()=>{
        fs.readFileSync('badFile');
      });
    })
  })
  describe('appendFileSync',()=>{
    beforeEach('create a dummy fs',()=>{
      fs = new DummyFs([{'name':'./dummyFile.txt','content':'this is previous content.'}]);
    });
    it('should append the content to the given file if the file exists',()=>{
      let expected = "this is previous content.this is new content";
      fs.appendFileSync('./dummyFile.txt','this is new content');
      assert.equal(fs.readFileSync('./dummyFile.txt'),expected);
    });
    it('should throw an error while appending to a file which is not existed',()=>{
      assert.throws(()=>{
      fs.appendFileSync('badFile','jbasjkdfnd');
    });
    })
  });
  describe('addValidFile',()=>{
    it('should add a file in the memory',()=>{
      fs.addValidFile({name:'./anotherDummyFile.txt',content:''});
      assert.isOk('./anotherDummyFile.txt');
    })
  })
});
