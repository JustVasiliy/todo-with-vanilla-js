
let countId = 0;

let btnDelete = document.querySelectorAll(".delete");
let btnChange = document.querySelectorAll('.change');

const root = document.getElementById('root');
const section = document.createElement('section');
const h1 = document.createElement('h1');
h1.innerText = 'Todo List';
const listItems = document.createElement('ul');
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
        listItems.innerHTML = '';
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
    delete() {

    }
    change() {

    }
}



let store = new Store(new FormCreateTodo('first'))


btnCreate.onclick = function () {

    store.saveItem(new FormCreateTodo(inputCreateName.value));

    new TodoList(store).render();
}

//listeners
listItems.onclick = function (event) {
    if (event.target.className === 'check') {
        store.check(event);
        new TodoList(store).render();
        console.log(store)


    } else if (event.target.className === 'delete') {


    }
    else if (event.target.className === 'change') {

    }
}



