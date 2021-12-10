
// Эти переменные я винес наружу т.к. онклики их не видели, если создавать их внутри класса (стр.225 и 237) 
let btnDelete = document.querySelectorAll(".delete");
let btnChange = document.querySelectorAll('.change');
const listItems = document.createElement('ul');
const btnCreate = document.createElement('button');
const inputCreateName = document.createElement('input');





//class for create todo-object
class Todo {
    constructor(name, checked = false, deleted = false, id = store.counter()) {
        this.name = name;
        this.checked = checked;
        this.deleted = deleted;
        this.id = id;

    }
}


//class for render
class Render {
    constructor(array) {

        this.array = array;

    }
    firstRender() {
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
    }
    render() {




        if (this.array.arrayItems[0] !== undefined) {
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
                if (element.checked === true) {

                    buttonCheck.setAttribute('checked', 'true');
                    p.classList.add('pCheck')


                }

            });
        }
        console.log(this.array.arrayItems)
    }
    renderBtnSave(filtArrBtnChange, arrayItems) {
        //Создание кнопки save
        const save = document.createElement('button');
        save.classList.add('saveBtn');

        save.innerText = 'save';

        filtArrBtnChange[0].classList.add('parentPosition')
        filtArrBtnChange[0].appendChild(save);
        for (let i = 0; i < arrayItems.length; i++) {
            if (arrayItems[i].id === +filtArrBtnChange[0].parentElement.parentElement.getAttribute('id')) {


                const inputChange = document.createElement('input');
                inputChange.type = 'text';
                inputChange.classList.add('inputChange');

                inputChange.setAttribute('maxlength', '50')
                inputChange.value = `${arrayItems[i].name}`;

                filtArrBtnChange[0].parentElement.parentElement.appendChild(inputChange);
                let testArray = arrayItems;
                //функция кнопки save 
                save.onclick = function () {

                    if (inputChange.value.trim() !== '') {

                        testArray[i].name = inputChange.value.trim();

                        inputChange.classList.add('deleted');

                        listItems.innerHTML = '';

                        testArray.forEach(elem => {
                            const newItems = document.createElement('li');

                            new Render(store).render();

                        });
                    }


                }


            }

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
    check(event) {

        let filtArr = [event.target.parentElement]

        for (let i = 0; i < this.arrayItems.length; i++) {

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
       
        let filtArrBtn = [event.target]
        for (let i = 0; i < this.arrayItems.length; i++) {
            if (this.arrayItems[i].id === +filtArrBtn[0].parentElement.parentElement.getAttribute('id')) {
                // itemsArray.splice(i,1);
                this.arrayItems[i].deleted = true;

            }

        }
    }
    change(event) {
        
       
        let filtArrBtnChange = [event.target]
        return filtArrBtnChange;
       

    }
    counter(){
        this.countId++
       
        return this.countId;
    }
}



let store = new Store()

new Render(store).firstRender();



btnCreate.onclick = function () {
    if (inputCreateName.value.trim() !== "") {

        store.create(new Todo(inputCreateName.value));

        new Render(store).render();
    }

    inputCreateName.value = ''
}

//listeners
listItems.onclick = function (event) {
    if (event.target.className === 'check') {
        store.check(event);
        new Render(store).render();



    } else if (event.target.className === 'delete') {
        store.delete(event);
        new Render(store).render();

    }
    else if (event.target.className === 'change') {
       
        store.change(event);
        new Render(store).renderBtnSave(store.change(event), store.arrayItems)

    }
}



