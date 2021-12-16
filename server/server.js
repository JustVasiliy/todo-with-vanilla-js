const http = require('http');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://VasiliyBuriy:forWorkVB2001@cluster0.6qwii.mongodb.net/todo-items?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const TodoList = new Schema({
name : String,
checked: Boolean,
deleted: Boolean,
editing:Boolean,
id: Number
});
const Model = mongoose.model;
const Item = Model('todo-items',TodoList);
const Todo = new Item({name : 'test', checked: false, deleted:false, editing:false, id:1 });
Todo.save((err,result)=>{
    if(err) console.log(err)
    console.log(result);
});
http.createServer((req, res)=>{
    console.log("It's alive");
    res.end("Go")
}).listen(3000);