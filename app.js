const heading = document.querySelector('.title');
const checkbox = document.querySelector('#hide input');

checkbox.addEventListener('change', function() {
    if(checkbox.checked){
        heading.style.display = 'none';
        ul.style.display = 'none';
    } else {
        heading.style.display = 'block';
        ul.style.display = 'initial';
    }
});


const inputText = document.querySelector('#add-book input');
const link = document.querySelector('.button');
const ul = document.querySelector('ul');
const checkBox = document.querySelector('#hide input');
const inputSearch = document.querySelector('#search-books input');

const spanDelete = `<span class="delete">delete</span>`;

link.addEventListener('click', function(e){
    const li = document.createElement('li');

    const spanName = document.createElement('span');
    spanName.className = 'name';
    spanName.textContent = inputText.value;

    li.appendChild(spanName);
    li.innerHTML += spanDelete;

    ul.appendChild(li);

    storeTolocalStorage(inputText.value);

    inputText.value = '';
    e.preventDefault();
});


ul.addEventListener('click', function(e) {
    if(e.target.className === 'delete') {
        e.target.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.children[0].textContent);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
       } else {
        tasks = localStorage.getItem('tasks').split(',');
       }
    
       for(let item of tasks) {
        const li = document.createElement('li');

       const spanName = document.createElement('span');
       spanName.className = 'name';
       spanName.textContent = item;
   
       li.appendChild(spanName);
       li.innerHTML += spanDelete;
   
       ul.appendChild(li);
       }
});


inputSearch.addEventListener('keyup', function(e) {
    for(let book of ul.children) {
        if(book.firstElementChild.textContent.includes(inputSearch.value)) {
            book.style.display= 'block';
        } else {
            book.style.display = 'none';
        }
    }
});



function storeTolocalStorage(task) {
   let tasks;
   if(localStorage.getItem('tasks') === null) {
    tasks = [];
   } else {
    tasks = localStorage.getItem('tasks').split(',');
   }

   tasks.push(task);

   localStorage.setItem('tasks', tasks);
}


function removeFromLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
     tasks = [];
    } else {
     tasks = localStorage.getItem('tasks').split(',');
    }
    
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i] === task) {
            tasks.splice(i,1);
        }
    }

    localStorage.setItem('tasks', tasks);
}