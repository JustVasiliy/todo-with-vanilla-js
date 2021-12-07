let btnCreate = document.getElementById('btnCreate');
let btnDelete = document.querySelectorAll(".delete");
let btnChange = document.querySelectorAll('.change');
let inputCreateName = document.getElementById('createName');
let listItems = document.getElementById('listItems');



//Массив тудушек. Установил по дефолту одну. 
//Объект тудушки состоит из её имени и выполнена ли она.
let itemsArray = [{name:'first item', checked: false}];

//Первый рендер массива (объектов, установленных по дефолту + можно подключить localstorage)
let item = document.createElement('li');
itemsArray.forEach(elem=>{
    item.innerHTML = `<p>${elem.name}</p>
    <div class="buttonGroup"> 
    <button class='change'>Change</button>
    <button class='delete'>Delete</button></div>`
    listItems.appendChild(item);
})



//Кнопка создания тудушек
btnCreate.onclick = function(){
    let isCheked = false;
    for(let i = itemsArray.length -1; i > -1; i--){
        if(itemsArray[i].name === inputCreateName.value){
            alert('У вас уже есть такой пункт, смотрите внимательно.');
            isCheked = true;
            break;
            
        }
    }
    if(isCheked === false){
        itemsArray.push({name:inputCreateName.value, checked: false});
    
        let newItems = document.createElement('li');
        itemsArray.forEach(elem=>{
            
            newItems.innerHTML = `<p>${elem.name}</p>
            <div class="buttonGroup"> 
            <button class='change'>Change</button>
            <button class='delete'>Delete</button></div>`
            listItems.appendChild(newItems);
        });
    }
    
            
    //Отчистка поля ввода
    inputCreateName.value = ''
    
    
}


//Далее описаны функции, которые отрабатывают при разных вариантах нажатия на тудушку.
//А именно: кнопка удаления, кнопка изменения названия и отметка checked(при клике на фон тудушки)
//Важно! Клик на текст не производит никакого действия 
listItems.onclick = function(event){
    
    //Если нажатие происходит по полю тудушки
    if(event.target.tagName === 'LI'){
        let li = document.querySelectorAll('li');
        let myArray = Array.from(li);
        let filtArr = myArray.filter(item => {
            if(item === event.target){
                return true;
            }
        });
        
        
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
            if(elem.checked === false){
                newItems.innerHTML = `<p>${elem.name}</p>
                <div class="buttonGroup"> 
                <button class='change'>Change</button>
                <button class='delete'>Delete</button></div>`
                
                
            }else if(elem.checked === true){
                newItems.innerHTML = `<p style='text-decoration:line-through'>${elem.name}</p>
                <div class="buttonGroup"> 
                <button class='change'>Change</button>
                <button class='delete'>Delete</button></div>`
                
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
            if(itemsArray[i].name === filtArrBtn[0].parentElement.parentElement.firstChild.innerText){
                itemsArray.splice(i,1);
                
                
            }
                
        }


        listItems.innerHTML = '';
        
        itemsArray.forEach(elem=>{
            let newItems = document.createElement('li');
            if(elem.checked === false){
                newItems.innerHTML = `<p>${elem.name}</p>
                <div class="buttonGroup"> 
                <button class='change'>Change</button>
                <button class='delete'>Delete</button></div>`
                
                
            }else if(elem.checked === true){
                newItems.innerHTML = `<p style='text-decoration:line-through'>${elem.name}</p>
                <div class="buttonGroup"> 
                <button class='change'>Change</button>
                <button class='delete'>Delete</button></div>`
                
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
        
        for(let i =0; i<itemsArray.length; i++){
            if(itemsArray[i].name === filtArrBtnChange[0].parentElement.parentElement.firstChild.innerText){
                itemsArray[i].name = prompt('Введите измененное название', "Новое название")
                
                
            }
                
        }


        listItems.innerHTML = '';
        
        itemsArray.forEach(elem=>{
            let newItems = document.createElement('li');
            if(elem.checked === false){
                newItems.innerHTML = `<p>${elem.name}</p>
                <div class="buttonGroup"> 
                <button class='change'>Change</button>
                <button class='delete'>Delete</button></div>`
                
                
            }else if(elem.checked === true){
                newItems.innerHTML = `<p style='text-decoration:line-through'>${elem.name}</p>
                <div class="buttonGroup"> 
                <button class='change'>Change</button>
                <button class='delete'>Delete</button></div>`
                
            }
            
            listItems.appendChild(newItems);
            
        });
        

    }
    
    
}











