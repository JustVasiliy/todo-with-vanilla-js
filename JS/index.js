
import {btnCreate} from './RenderMainForm.js';
import {inputCreateName} from './RenderMainForm.js';
import {listItems} from './RenderMainForm.js';





import {EventEmitter} from './EventEmitter.js';
import {Render} from './Render.js';
import {RenderMainForm} from './RenderMainForm.js';
import {Store} from './Store.js';

const renderMainForm = new RenderMainForm();
let store = new Store()
let reRender = new Render(store)
const emitter = new EventEmitter();
emitter.on('todosChanged', () => reRender.render());

emitter.on('mainChange', ()=> renderMainForm.render() )

emitter.emit('mainChange')
//class for create todo-object
class Todo {
    constructor(name, checked = false, deleted = false, id = store.counter(), editing = false) {
        this.name = name;
        this.checked = checked;
        this.deleted = deleted;
        this.id = id;
        this.editing = editing;
    }
}


btnCreate.addEventListener('click', ()=>{
   
    if (inputCreateName.value.trim() !== "") {

        store.create(new Todo(inputCreateName.value));
        emitter.emit('todosChanged')
       
        

    }

    inputCreateName.value = ''
}) 
inputCreateName.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        if (inputCreateName.value.trim() !== "") {

            store.create(new Todo(inputCreateName.value));
            emitter.emit('todosChanged')

        }

        inputCreateName.value = ''
    } else if (event.keyCode === 27) {
        
    }
});


//listeners
listItems.addEventListener('click', (event) => {
    if (event.target.className === 'check') {
        let id = event.target.parentElement.getAttribute('id');
        store.check(id);
        emitter.emit('todosChanged')



    } else if (event.target.className === 'delete') {
        let id = event.target.parentElement.parentElement.getAttribute('id')

        store.delete(id);
        emitter.emit('todosChanged')

    }
    else if (event.target.className === 'change') {
        let id = event.target.parentElement.parentElement.getAttribute('id')
        const inputChange = event.target.parentElement.parentElement.children[0];
        
        store.change(id);

        emitter.emit('todosChanged')
       


    }else if(event.target.className === 'saveBtn'){
        let id = event.target.parentElement.parentElement.getAttribute('id');
        const inputChange = event.target.parentElement.parentElement.children[0]
        let newName = inputChange.value;
        if(newName.trim() !== ''){
            store.editing(id, newName)
        }
        
        
        emitter.emit('todosChanged')
        
        
    }
})

listItems.addEventListener('keydown', (event)=>{
    let id = event.target.parentElement.getAttribute('id');
       
    if(event.keyCode === 13){
        
        const inputChange = event.target
        let newName = inputChange.value;
        if(newName.trim() !== ''){
            store.editing(id, newName)
        }
        emitter.emit('todosChanged')


    }else if(event.keyCode === 27){
        let newName = undefined
        store.editing(id, newName)
        emitter.emit('todosChanged')
    }
})