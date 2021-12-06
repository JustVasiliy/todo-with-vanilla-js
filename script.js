let btnCreate = document.getElementById('btnCreate');
let btnDelete = document.querySelectorAll(".delete");
let btnChange = document.querySelectorAll('.change');
let inputCreateName = document.getElementById('createName');
let listItems = document.getElementById('listItems');




let itemsArray = [{name:'first item', checked: false}];


let item = document.createElement('li');
itemsArray.forEach(elem=>{
    item.innerHTML = `<p>${elem.name}</p>
    <div class="buttonGroup"> 
    <button class='change'>Change</button>
    <button class='delete'>Delete</button></div>`
    listItems.appendChild(item);
})




btnCreate.onclick = function(){
    
    itemsArray.push({name:inputCreateName.value, checked: false});

    let newItems = document.createElement('li');
    itemsArray.forEach(elem=>{
        
        newItems.innerHTML = `<p>${elem.name}</p>
        <div class="buttonGroup"> 
        <button class='change'>Change</button>
        <button class='delete'>Delete</button></div>`
        listItems.appendChild(newItems);
    });
    inputCreateName.value = ''
    
    
}



listItems.onclick = function(event){
    // console.log(event);
    
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











