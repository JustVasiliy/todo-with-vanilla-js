
// Эти переменные я винес наружу т.к. онклики их не видели, если создавать их внутри класса (стр.225 и 237) 
let btnDelete = document.querySelectorAll(".delete");
let btnChange = document.querySelectorAll('.change');
const listItems = document.createElement('ul');
const btnCreate = document.createElement('button');
const inputCreateName = document.createElement('input');


let saveBtn = document.createElement('button');
let inputChange = document.createElement('input');

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

class RenderMainForm {
    constructor() {

    }
    render() {
        const root = document.getElementById('root');
        const section = document.createElement('section');
        const h1 = document.createElement('h1');
        h1.innerText = 'Todo List';

        listItems.id = 'ul'
        const divCreateNewItem = document.createElement('div');
        divCreateNewItem.classList.add('createNewItem');

        inputCreateName.type = 'text';
        inputCreateName.ariaPlaceholder = 'todo'

        btnCreate.innerText = 'Create';

        root.appendChild(section);
        section.appendChild(h1);
        section.appendChild(listItems);
        section.appendChild(divCreateNewItem);
        divCreateNewItem.appendChild(inputCreateName);
        divCreateNewItem.appendChild(btnCreate);

        saveBtn.classList.add('saveBtn');


        saveBtn.innerText = 'save';
    }
}
// class for render
class Render {
    constructor(array) {

        this.array = array;

    }

    render() {




        if (this.array.arrayItems[0] !== undefined) {
            const nodeUl = document.getElementById('ul');
            while (nodeUl.firstChild) nodeUl.removeChild(nodeUl.firstChild);


            this.array.arrayItems.forEach(element => {
                saveBtn = document.createElement('button');
                inputChange = document.createElement('input');
                const newItems = document.createElement('li');
                newItems.classList.add('parentPosition')
                newItems.setAttribute('id', element.id);
                if (element.deleted === true) {
                    newItems.classList.add('deleted');
                }
                const buttonCheck = document.createElement('input');
                buttonCheck.type = 'checkbox';
                buttonCheck.classList.add('check');

                const p = document.createElement('p');
                p.innerText = `${element.name}`
                const buttonGroup = document.createElement('div');
                buttonGroup.classList.add('buttonGroup');
                const buttonChange = document.createElement('button');
                buttonChange.classList.add('change');
                buttonChange.innerText = 'Change';
                const buttonDelete = document.createElement('button');
                buttonDelete.classList.add('delete');
                buttonDelete.innerText = 'Delete';

                // saveBtn
                saveBtn.classList.add('saveBtn');
                saveBtn.innerText = 'save';
                saveBtn.style.display = 'none'
                buttonGroup.classList.add('parentPosition');
                buttonGroup.appendChild(saveBtn);

                // end saveBtn

                //inputChange
                
                inputChange.type = 'text';
                inputChange.classList.add('inputChange');

                inputChange.setAttribute('maxlength', '50');
                inputChange.style.display = 'none';
                newItems.appendChild(inputChange);
                //end inputChange

                buttonGroup.appendChild(buttonChange);
                buttonGroup.appendChild(buttonDelete);
                newItems.appendChild(p);
                newItems.appendChild(buttonCheck);
                newItems.appendChild(buttonGroup);
                listItems.appendChild(newItems);
                if (element.checked === true) {

                    buttonCheck.setAttribute('checked', 'true');
                    p.classList.add('pCheck')


                }
                if (element.editing === true) {
                    inputChange.value = element.name;
                    saveBtn.style.display = 'block';

                    inputChange.style.display = 'block';


                    
                }
            });
        }

    }





}


//class for save items in array and logic
class Store {
    constructor() {
        this.arrayItems = [];
        this.countId = -1;
    }
    create(item) {
        this.arrayItems = [...this.arrayItems, item];

        return this.arrayItems;
    }
    check(id) {



        for (let i = 0; i < this.arrayItems.length; i++) {

            if (this.arrayItems[i].id === +id) {
                if (this.arrayItems[i].checked === false) {
                    this.arrayItems[i].checked = true;
                } else if (this.arrayItems[i].checked === true) {
                    this.arrayItems[i].checked = false;
                }


            }

        }
    }
    delete(id) {


        for (let i = 0; i < this.arrayItems.length; i++) {
            if (this.arrayItems[i].id === +id) {

                // itemsArray.splice(i,1);
                this.arrayItems[i].deleted = true;

            }

        }
    }
    change(id) {
        for (let i = 0; i < this.arrayItems.length; i++) {
            if (this.arrayItems[i].id === +id) {
                this.arrayItems[i].editing = true;
            }
        }



    }
    editing(id,chengedName){
        for (let i = 0; i < this.arrayItems.length; i++) {
            if (this.arrayItems[i].id === +id) {
                this.arrayItems[i].editing = false;
                if(chengedName !== undefined){
                    this.arrayItems[i].name = chengedName
                }
                
            }
        }
    }
    counter() {
        this.countId++

        return this.countId;
    }
}


const renderMainForm = new RenderMainForm();
let store = new Store()
let reRender = new Render(store)


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

class EventEmitter {
    constructor() {
        this.event = {};
    }
    on(eventName, callback) {
        if (this.event[eventName]) {
            this.event[eventName].push(callback)
        } else {
            this.event[eventName] = [callback]
        }
    }
    emit(eventName, ...rest) {
        if (this.event[eventName]) {
            this.event[eventName].forEach(callback => {
                callback.apply(rest)
            })
        }
    }
}
const emitter = new EventEmitter();
emitter.on('todosChanged', () => reRender.render());

emitter.on('mainChange', ()=> renderMainForm.render() )

emitter.emit('mainChange')












