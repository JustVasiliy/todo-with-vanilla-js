
let btnDelete = document.querySelectorAll(".delete");
let btnChange = document.querySelectorAll('.change');



let countId = 0;

//Создание html
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





//Массив тудушек. Установил по дефолту одну. 
//Объект тудушки состоит из её имени и выполнена ли она.
const itemsArray = [{name:'first item', checked: false, deleted: false, id: countId}];

//Первый рендер массива (объектов, установленных по дефолту + можно подключить localstorage)

itemsArray.forEach(elem=>{
    const item = document.createElement('li');

item.style.position = 'relative';
    item.setAttribute('id', elem.id);
    
    const buttonCheck = document.createElement('input');
    buttonCheck.type = 'checkbox';
    // buttonCheck.innerText = 'Check';
    buttonCheck.classList.add('check');


    const p = document.createElement('p');
    p.innerText =`${elem.name}`
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
    
    item.appendChild(p);
    item.appendChild(buttonCheck)
    item.appendChild(buttonGroup);
    countId++;
    
    listItems.appendChild(item);
})



//Кнопка создания тудушек
btnCreate.onclick = function(){
    
    if( inputCreateName.value.trim() !== ""){
        itemsArray.push({name:inputCreateName.value, checked: false, deleted: false, id: countId++});
        listItems.innerHTML =''
       
        itemsArray.forEach(elem=>{
            const buttonCheck = document.createElement('input');
            buttonCheck.type = 'checkbox';
            buttonCheck.classList.add('check');
        
            const newItems = document.createElement('li');
            newItems.style.position = 'relative';
            newItems.setAttribute('id', elem.id);
            const p = document.createElement('p');
            p.innerText =`${elem.name}`
            const buttonGroup = document.createElement('div');
            buttonGroup.classList.add('buttonGroup');
            const buttonChange = document.createElement('button');
            buttonChange.classList.add('change');
            buttonChange.innerText = 'Change';
            const buttonDelete = document.createElement('button');
            buttonDelete.classList.add('delete');
            buttonDelete.innerText = 'Delete';
              //Удален ли елемент
              deleteItem(newItems, elem.deleted);
            buttonGroup.appendChild(buttonChange);
            buttonGroup.appendChild(buttonDelete);
            newItems.appendChild(p);
            newItems.appendChild(buttonCheck)
            newItems.appendChild(buttonGroup)
            listItems.appendChild(newItems);
        });
    }
    
            
    //Отчистка поля ввода
    inputCreateName.value = ''
    
    
}


//Далее описаны функции, которые отрабатывают при разных вариантах нажатия на тудушку.
//А именно: кнопка удаления, кнопка изменения названия и отметка checked(при клике на checkbox)
//Важно! Клик на текст не производит никакого действия 
listItems.onclick = function(event){
    
    //Если нажатие происходит по полю тудушки
    if(event.target.className === 'check'){
        let li = document.querySelectorAll('li');
        let myArray = Array.from(li);
        let filtArr = myArray.filter(item => {
            if(item === event.target.parentElement){
                return true;
            }
        });
        
        console.log(filtArr);
        for(let i =0; i<itemsArray.length; i++){
            if(itemsArray[i].name === filtArr[0].children[0].innerText){
                if(itemsArray[i].checked === false){
                    itemsArray[i].checked = true;
                }else if(itemsArray[i].checked === true){
                    itemsArray[i].checked = false;
                }
                
                
            }
                
            }
            //Перерендер
            listItems.innerHTML = '';
            
            itemsArray.forEach(elem=>{
                let newItems = document.createElement('li');
                newItems.style.position = 'relative';
                newItems.setAttribute('id', elem.id);
                deleteItem(newItems, elem.deleted);
                if(elem.checked === false){
                    const buttonCheck = document.createElement('input');
                    buttonCheck.type = 'checkbox';
                    buttonCheck.classList.add('check');
                                
                    const p = document.createElement('p');
                    p.innerText =`${elem.name}`
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
                    
                    
                }else if(elem.checked === true){
                    const buttonCheck = document.createElement('input');
                    buttonCheck.type = 'checkbox';
                    buttonCheck.classList.add('check');
                    buttonCheck.setAttribute('checked', 'true')   

                    const p = document.createElement('p');
                    p.innerText =`${elem.name}`;
                    p.style.textDecoration = 'line-through'
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
                    
                }
                
                listItems.appendChild(newItems);
                
            });
            console.log(itemsArray); 
        
    }


    //Если нажатие на кнопку Delete
    else if(event.target.className === 'delete'){
        btnDelete= document.querySelectorAll(".delete");
        let myButtonArr = Array.from(btnDelete);
        let filtArrBtn = myButtonArr.filter(item => {
            if(item === event.target){
                return true;
            }
        });
        
        for(let i =0; i<itemsArray.length; i++){
            if(itemsArray[i].id === +filtArrBtn[0].parentElement.parentElement.getAttribute('id')){
                // itemsArray.splice(i,1);
                itemsArray[i].deleted = true;
                
            }
                
        }
       
        listItems.innerHTML = '';
       
                
        itemsArray.forEach(elem=>{
            const newItems = document.createElement('li');
            //Удалён ли елемент
            deleteItem(newItems, elem.deleted);
            if(elem.checked === false){
                const buttonCheck = document.createElement('input');
                buttonCheck.type = 'checkbox';
                buttonCheck.classList.add('check');
            
                newItems.style.position = 'relative';
                newItems.setAttribute('id', elem.id);               
                const p = document.createElement('p');
                p.innerText =`${elem.name}`
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
                
                
            }else if(elem.checked === true){
                const buttonCheck = document.createElement('input');
                buttonCheck.type = 'checkbox';
                buttonCheck.classList.add('check');
                buttonCheck.setAttribute('checked', 'true')   
            
                newItems.style.position = 'relative';
                newItems.setAttribute('id', elem.id);          
                const p = document.createElement('p');
                p.innerText =`${elem.name}`;
                p.style.textDecoration = 'line-through'
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
                
                
            }
            
            listItems.appendChild(newItems);
            
        });
        




    }
    //если нажатие на кнопку Change
    else if(event.target.className === 'change'){
        btnChange= document.querySelectorAll(".change");
        let myButtonArrChange = Array.from(btnChange);
        let filtArrBtnChange = myButtonArrChange.filter(item => {
            if(item === event.target){
                return true;
            }
        });
        //Создание кнопки save
        const save = document.createElement('button');
        save.style.position = 'absolute';
        save.style.top = '0';
        save.style.left = '0';
        save.style.width = '100%';
        save.innerText = 'save';
        
        filtArrBtnChange[0].style.position = 'relative';
        filtArrBtnChange[0].appendChild(save);
        


        for(let i =0; i<itemsArray.length; i++){
            if(itemsArray[i].name === filtArrBtnChange[0].parentElement.parentElement.firstChild.innerText){
               
                
                const inputChange = document.createElement('input');
                inputChange.type = 'text';
                inputChange.style.position = 'absolute';
                inputChange.style.width = '80%'
                inputChange.style.height = '100%';
                inputChange.style.backgroundColor = 'rgba(179, 218, 205, 1)';
                
                inputChange.value = `${itemsArray[i].name}`;

                filtArrBtnChange[0].parentElement.parentElement.appendChild(inputChange);

                //функция кнопки save (выполныет то же, что и по нажатию клавиши enter)
                save.onclick = function(){
                    itemsArray[i].name = inputChange.value;
                               
                                inputChange.style.display = 'none';
        
        
                                    listItems.innerHTML = '';
                                
                                    itemsArray.forEach(elem=>{
                                    const newItems = document.createElement('li');
                                    newItems.style.position = 'relative';
                                    newItems.setAttribute('id', elem.id);
                                    deleteItem(newItems, elem.deleted);
                                    if(elem.checked === false){
                                        const buttonCheck = document.createElement('input');
                                        buttonCheck.type = 'checkbox';
                                        buttonCheck.classList.add('check');
                                                          
                                    const p = document.createElement('p');
                                    p.innerText =`${elem.name}`
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

                                        
                                    }else if(elem.checked === true){
                                        const buttonCheck = document.createElement('input');
                                        buttonCheck.type = 'checkbox';
                                        buttonCheck.classList.add('check');
                                         buttonCheck.setAttribute('checked', 'true')                   
                                    
                                        const p = document.createElement('p');
                                        p.innerText =`${elem.name}`;
                                        p.style.textDecoration = 'line-through'
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
                                        
                                    }
                                    
                                    listItems.appendChild(newItems);
                                    
                                });
                }
               
            }
                
        }


        
        

    }
    
    
}
//Функция удаления элемента
function deleteItem(item, isDeleted){
    if(isDeleted === true){
        item.classList.add('deleted');
        console.log(itemsArray)
    }
    
}









