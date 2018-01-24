let assert = require('chai').assert;
const TodoApp=require('../src/models/todoApp.js');
let MockedFs = require('../src/utils/mockedFS.js');

describe('Todo App',()=>{
  beforeEach(()=>{
    fs = new MockedFs([{name:'./todos.json',content:`[
      {
        "userName": "sulagna",
        "todos": [
          {
            "title": "ujifjdiof",
            "description": "jgbfhjcgvdhjfuy",
            "todoItems": []
          }
        ]
      }
    ]`}])
    todoApp = new TodoApp('./todos.json',fs);
  });
  describe('addUser',()=>{
    it('should create user with no todos when didnt give any initial todos',()=>{
      let user = todoApp.addUser('sulagna');
      assert.equal(user.getUserName(),"sulagna");
      assert.deepEqual(user.getAllTodos(),[]);
    });
    it('should create user with some todos when todos are given',()=>{
      let initialTodos = [
        {
          title:'shopping',
          description:"have to buy things",
          todoItems:[
            {item:'buy clothes',done:false},
            {item:'buy mobile',done:false}
          ]}
      ];
      let user = todoApp.addUser('sulagna',initialTodos);
      assert.deepEqual(initialTodos,user.getAllTodos())
    });
  });
  
  describe('getUser',()=>{
    it('should get the user',()=>{
      todoApp.addUser('sulagna');
      let user=todoApp.getUser('sulagna');
      assert.equal(user.userName,'sulagna');
    })
  })
  describe('loadUsers',()=>{
    it('should load the previous details of user',()=>{
      let expected = {
          userName: "sulagna",
          todos: [
            {
              title: "ujifjdiof",
              description : "jgbfhjcgvdhjfuy",
              todoItems : []
            }
          ]
        };
      todoApp.loadUsers('./todos.json');
      let actual = todoApp.getUser('sulagna').getDetails();
      assert.deepEqual(actual,expected);
    })
  })
})
