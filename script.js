const addNote = document.getElementById('add');
const updateLstorage = ()=>{
    const textarea = document.querySelectorAll('textarea');
    const notes = [];
    textarea.forEach((note)=>{
        return notes.push(note.value);
    })
    localStorage.setItem('ansh',JSON.stringify(notes));
}


const addNewNote = (text = '') =>{
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
        <div class="operation">
        <button class="edit fas fa-edit"></button>
        <button class="delete fas fa-trash-alt"></button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}" ></textarea>
     `;

    note.insertAdjacentHTML('afterbegin',htmlData);
    
    const deleteBtn = note.querySelector('.delete');
    const editBtn = note.querySelector('.edit');
    const mainDiv = note.querySelector('.main');
    const usertext = note.querySelector('textarea');

    //delete the note from html
    deleteBtn.addEventListener('click',()=> {
        note.remove();
         updateLstorage();
    });

    // toggle between viewing and editing data 
    editBtn.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        usertext.classList.toggle('hidden');
    });

    usertext.addEventListener('change',(e)=>{
        const value = e.target.value;
        mainDiv.innerHTML = value;
        updateLstorage();
    })

    usertext.value = text;
    mainDiv.innerHTML = text;

    
    document.body.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem('ansh'));
if(notes){ notes.forEach((note)=>addNewNote(note)) };

addNote.addEventListener('click',() => addNewNote());