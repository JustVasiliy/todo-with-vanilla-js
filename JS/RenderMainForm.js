export let listItems = document.createElement('ul');
export let btnCreate = document.createElement('button');
export let inputCreateName = document.createElement('input');

export class RenderMainForm {
    constructor() {

    }
    render() {
        let root = document.getElementById('root');
        let section = document.createElement('section');
        let h1 = document.createElement('h1');
        h1.innerText = 'Todo List';

        listItems.id = 'ul'
        let divCreateNewItem = document.createElement('div');
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
}