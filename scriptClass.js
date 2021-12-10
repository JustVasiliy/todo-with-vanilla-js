
let countId = 0;

let btnDelete = document.querySelectorAll(".delete");
let btnChange = document.querySelectorAll('.change');

const root = document.getElementById('root');
const section = document.createElement('section');
const h1 = document.createElement('h1');
h1.innerText = 'Todo List';
const listItems = document.createElement('ul');
listItems.id = 'ul'
const divCreateNewItem = document.createElement('div');
divCreateNewItem.classList.add('createNewItem');
const inputCreateName = document.createElement('input');
inputCreateName.type = 'text';
inputCreateName.ariaPlaceholder = 'todo'
const btnCreate = document.createElement('button');
btnCreate.innerText = 'Create';

root.appendChild(section);
section.appendChild(h1);
section.appendChild(listItems);
section.appendChild(divCreateNewItem);
divCreateNewItem.appendChild(inputCreateName);
divCreateNewItem.appendChild(btnCreate);

console.log(listItems)

//class for create todo-object
class FormCreateTodo {
    constructor(name, checked = false, deleted = false, id = countId++) {
        this.name = name;
        this.checked = checked;
        this.deleted = deleted;
        this.id = id;

    }
}


//class for render
class TodoList {
    constructor(array) {
        this.array = array;
    }
    render() {
        const nodeUl = document.getElementById('ul');
        while (nodeUl.firstChild) nodeUl.removeChild(nodeUl.firstChild);
        
        
        this.array.arrayItems.forEach(element => {
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


            buttonGroup.appendChild(buttonChange);
            buttonGroup.appendChild(buttonDelete);
            newItems.appendChild(p);
            newItems.appendChild(buttonCheck);
            newItems.appendChild(buttonGroup);
            listItems.appendChild(newItems);
            if (element.checked === false) {

                console.log(false)


            } else if (element.checked === true) {

                buttonCheck.setAttribute('checked', 'true');
                p.classList.add('pCheck')


            }

        });
    }




}


//class for save items in array and logic
class Store {
    constructor(itemDef) {
        this.arrayItems = [itemDef];

    }
    saveItem(item) {
        this.arrayItems = [...this.arrayItems, item];
        console.log(this.arrayItems)
        return this.arrayItems;
    }
    check(event) {

        let li = document.querySelectorAll('li');
        let myArray = Array.from(li);
        let filtArr = myArray.filter(item => {
            if (item === event.target.parentElement) {
                return true;
            }
        });


        for (let i = 0; i < this.arrayItems.length; i++) {
            console.log(this.arrayItems[i].id)
            if (this.arrayItems[i].id === +filtArr[0].getAttribute('id')) {
                if (this.arrayItems[i].checked === false) {
                    this.arrayItems[i].checked = true;
                } else if (this.arrayItems[i].checked === true) {
                    this.arrayItems[i].checked = false;
                }


            }

        }
    }
    delete(event) {
        btnDelete= document.querySelectorAll(".delete");
        let myButtonArr = Array.from(btnDelete);
        let filtArrBtn = myButtonArr.filter(item => {
            if(item === event.target){
                return true;
            }
        });
        
        for(let i =0; i<this.arrayItems.length; i++){
            if(this.arrayItems[i].id === +filtArrBtn[0].parentElement.parentElement.getAttribute('id')){
                // itemsArray.splice(i,1);
                this.arrayItems[i].deleted = true;
                
            }
                
        }
    }
    change(event) {
        btnChange= document.querySelectorAll(".change");
        let myButtonArrChange = Array.from(btnChange);
        let filtArrBtnChange = myButtonArrChange.filter(item => {
            if(item === event.target){
                return true;
            }
        });
        //Создание кнопки save
        const save = document.createElement('button');
        save.classList.add('saveBtn')
        
        save.innerText = 'save';
        
        filtArrBtnChange[0].classList.add('parentPosition')
        filtArrBtnChange[0].appendChild(save);
        for(let i =0; i<this.arrayItems.length; i++){
            if(this.arrayItems[i].id === +filtArrBtnChange[0].parentElement.parentElement.getAttribute('id')){
               
                
                const inputChange = document.createElement('input');
                inputChange.type = 'text';
                inputChange.classList.add('inputChange');
                
                inputChange.setAttribute('maxlength', '50')
                inputChange.value = `${this.arrayItems[i].name}`;

                filtArrBtnChange[0].parentElement.parentElement.appendChild(inputChange);
                let testArray = this.arrayItems;
                //функция кнопки save 
                save.onclick = function(){
                    console.log(testArray)
                    if(inputChange.value.trim() !== ''){
                       
                        testArray[i].name = inputChange.value.trim();
                         
                        inputChange.classList.add('deleted');
            
                        listItems.innerHTML = '';
                                    
                        testArray.forEach(elem=>{
                        const newItems = document.createElement('li');
                       
                        new TodoList(store).render();
                                        
                        });
                    }
                    
                    
                }
                
               
            }
                
        }
    }
}



let store = new Store(new FormCreateTodo('first'))
new TodoList(store).render();

btnCreate.onclick = function () {
    if(inputCreateName.value.trim() !== ""){
        store.saveItem(new FormCreateTodo(inputCreateName.value));

        new TodoList(store).render();
    }

    inputCreateName.value = ''
}

//listeners
listItems.onclick = function (event) {
    if (event.target.className === 'check') {
        store.check(event);
        new TodoList(store).render();
      


    } else if (event.target.className === 'delete') {
        store.delete(event);
        new TodoList(store).render();
       
    }
    else if (event.target.className === 'change') {
        store.change(event);
        
        console.log(store)
    }
}



