const assert = require('chai').assert;
const timeStamp = require('../src/lib/time.js').timeStamp;

let DateConstructor;

describe('timeStamp',()=>{
  beforeEach(()=>{
    DateConstructor=class {
      constructor() {}
      toDateString(){
        return `Fri Jan 19 2018`;
      }
      toLocaleTimeString(){
        return `10:10:13 AM`;
      }
    }
  });

  it('should give the current date and time',()=>{
    let expected = 'Fri Jan 19 2018 10:10:13 AM';
    assert.equal(timeStamp(DateConstructor),expected);
  });

});
