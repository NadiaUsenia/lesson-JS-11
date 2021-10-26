function closeModal() {
  // modalWindow.style.display = 'none';
  const modalWindow = document.querySelector('.modal-wrapper');
  modalWindow.remove();
}


class User {
  constructor({id, name, email, adress, phone}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.adress = adress;
    this.phone = phone;
  }

  edit({name = this.name, email = this.email, adress = this.adress, phone = this.phone}) {
    this.name = name;
    this.email = email;
    this.adress = adress;
    this.phone = phone;
}

  get() {
    return {
      id: this.id,
      name: this.name, 
      email: this.email,
      adress: this.adress, 
      phone: this.phone, 
  }
  }
}

class Contacts {
  constructor(nameOfContacts) {
    this.usersList = [];
  }

  createUser(name, email, adress, phone) {
    const id = this.usersList.length;
    const user = new User({id, name, email, adress, phone});
    this.usersList.push(user);
}
 editUser({id, name, email, adress, phone}) {
     
     this.usersList[id].edit({name, email, adress, phone});
 }
 removeUser(id) {
     delete this.usersList[id];
 }
}



class ContactsApp extends Contacts {
    constructor() {
      super();
  }

    get storage() {
      return this.localStora;
  }

    set storage(newUsersList) {
      this.usersList = newUsersList
  }

  //создаем кнопки удаления

  createEditDeleteBtn(id) {

    const openModal = () => {
      document.body.insertAdjacentHTML('beforeend', `
      <div class="modal-wrapper">
        <div class="modal-box">
          <span class="close">x</span>
          <h1>Редактировать контакт</h1>
        </div>
      </div>
      `)
    
    const contentBox = document.querySelector('.modal-box');
    const nameInput = document.createElement('input');
    const emailInput = document.createElement('textarea');
    const adressInput = document.createElement('textarea');
    const phoneInput = document.createElement('textarea');
    const save = document.createElement('button');
    save.innerText = 'Save';

   save.addEventListener('click', () => {
       this.editUser({id: id, name: nameInput.value, email: emailInput.value, adress: adressInput.value, phone: phoneInput.value});
       closeModal();
       this.draw();
   })

   contentBox.appendChild(nameInput);
   contentBox.appendChild(emailInput);
   contentBox.appendChild(adressInput);
   contentBox.appendChild(phoneInput);
   contentBox.appendChild(save);
    
    
    const close = document.querySelector('.close');
    close.addEventListener('click', closeModal);
  }

    // this.editUser({id});
    // this.removeUser(id);
    const nodeElement = document.createElement('div');
        const btnEdit = document.createElement('button');
        const btnRemove = document.createElement('button');
        
        btnEdit.innerText = 'Редактировать';
        btnRemove.innerText = 'Удалить'; 
        
    
      btnRemove.addEventListener('click', () => {
      this.removeUser(id);
      this.draw();
    })

      btnEdit.addEventListener('click', openModal);
    nodeElement.appendChild(btnEdit);
    nodeElement.appendChild(btnRemove);
    
    return nodeElement;

  }

  draw() {
    const oldUser = document.getElementById('userData');
    if (oldUser) {
        oldUser.remove();
    }
    const userData = document.createElement('ul');
    userData.id = 'userData';
    this.usersList.map((user) => {
        const li = document.createElement('li');
        const nameNode = document.createElement('h2');
        nameNode.innerText = user.name;
        const emailNode = document.createElement('p');
        emailNode.innerText = user.email;
        const adressNode = document.createElement('p');
        adressNode.innerText = user.adress;
        const phoneNode = document.createElement('p');
        phoneNode.innerText = user.phone;
        
        li.appendChild(nameNode);
        li.appendChild(emailNode);
        li.appendChild(adressNode);
        li.appendChild(phoneNode);
        userData.appendChild(li);
        const btns = this.createEditDeleteBtn(user.id)
        li.appendChild(btns);
        // this.draw();
    });
    document.body.appendChild(userData);
}

  init() {

    const divContacts = document.createElement('div');
    divContacts.classList.add('contacts');

    const form = document.createElement('form');
    form.classList.add("form_add");

    const inputName = document.createElement('input');
    inputName.placeholder = 'Ваше имя..';
    inputName.type = 'text';
    inputName.setAttribute('name', 'name');
    const inputEmail = document.createElement('input');
    inputEmail.placeholder = 'Ваш email..';
    inputEmail.setAttribute('name', 'email');
    const inputAdress = document.createElement('input');
    inputAdress.placeholder = 'Ваш адрес..';
    inputAdress.setAttribute('name', 'adress');
    const inputPhone = document.createElement('input');
    inputPhone.placeholder = 'Ваш телефон..';
    inputPhone.setAttribute('name', 'phone');
    const addBtn = document.createElement('button');
    addBtn.innerText = 'Отправить';
    addBtn.classList.add('add');
    form.appendChild(inputName);
    form.appendChild(inputEmail);
    form.appendChild(inputAdress);
    form.appendChild(inputPhone);
    form.appendChild(addBtn);
    divContacts.appendChild(form);
   
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = event.currentTarget[0].value;
      event.currentTarget[0].value = '';
      const email = event.currentTarget[1].value;
      event.currentTarget[1].value = '';
      const adress = event.currentTarget[2].value;
      event.currentTarget[2].value = '';
      const phone = event.currentTarget[3].value;
      event.currentTarget[3].value = '';
      this.createUser(name, email, adress, phone);
      console.log(name, email, adress, phone);
      this.draw();
    } )

    document.body.appendChild(divContacts);
   
  } 
}

const user = new User('Alex', 'alex@mail.ru', 'Minsk', '+375 29 999 99 99');
const contactsApp = new ContactsApp();
contactsApp.init();

// contactsApp.createUser({name: 'Nadia',})
// contactsApp.storage =['Juli'];
// console.log(contactsApp.usersList);
//contactsList.createUser('Alex', 'alex@mail.ru', 'Minsk', '+375 29 999 99 99');
//contactsList.createUser('Bob', 'bob@mail.ru', 'Minsk', '+375 29 999 45 ');
//contactsList.createUser('Make', 'make@mail.ru', 'Minsk', '+375 29 999 99 56');
//contactsList.editUser(0, 'Liza');
//contactsList.removeUser(1);
//contactsList.createUser('Nik', 'nik@mail.ru', 'Minsk', '+375 29 999 99 22');

let contactsAddData = [];

const contactsAddUpdate = function() {
let localcontactsAddData = localStorage.getItem('contactsAddData');
if (localcontactsAddData.length > 0) contactsAddData = JSON.parse(localcontactsAddData);

let contactsAddList = document.querySelector('.contacts_list ul');
contactsAddList.innerHTML = '';
contactsAddData.forEch(function(contactsAdd, id) {
  let elemContact = document.createElement('li');
  elemContact.innerHTML = `
  <div class="id">${id + 1}</div>
  <div class="name">${contactsAdd.name}</div>
  <div class="email">${contactsAdd.email}</div>
  <div class="adress">${contactsAdd.adress}</div>
  <div class="phone">${contactsAdd.phone}</div>

  `;
  contactsAddList.appendChild(elemContact);
});

};

const contactsAdd = function() {
  let formAdd = this.closest('.form_add'),
  inputNameAdd = formAdd.querySelector('input[name="name"]').value,
  inputEmailAdd = formAdd.querySelector('input[name="email"]').value,
  inputAdressAdd = formAdd.querySelector('input[name="adress"]').value,
  inputPhoneAdd = formAdd.querySelector('input[name="phone"]').value;
  
  
  let contactsAdd = {
    name: inputNameAdd,
    email: inputEmailAdd,
    adress: inputAdressAdd,
    phone: inputPhoneAdd
  };

  contactsAddData.push(contactsAdd);
  localStorage.setItem('contactsAddData', JSON.stringify(contactsAddData));
  contactsAddUpdate(); 

};


    
let buttonAdd = document.querySelector('.add');
if (buttonAdd) buttonAdd.addEventListener('click', contactsAdd);