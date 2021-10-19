


class User {
  constructor(id, name, email, adress, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.adress = adress;
    this.phone = phone;
  }

  edit(name = this.name, email = this.email, adress = this.adress, phone = this.phone) {
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
    const user = new User(id, name, email, adress, phone);
    this.usersList.push(user);
}
 editUser(id, name, email, adress, phone) {
     
     this.usersList[id].edit(name, email, adress, phone);
 }
 removeUser(id) {
     delete this.usersList[id];
 }
}

class ContactsApp extends Contacts {
    constructor() {
      super();
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
        // this.draw();
    });
    document.body.appendChild(userData);
}

  init() {

    const divContacts = document.createElement('div');
    divContacts.classList.add('contacts');

    const form = document.createElement('form');

    const inputName = document.createElement('input');
    inputName.placeholder = 'Ваше имя..';
    inputName.type = 'text';
    const inputEmail = document.createElement('input');
    inputEmail.placeholder = 'Ваш email..';
    const inputAdress = document.createElement('input');
    inputAdress.placeholder = 'Ваш адрес..';
    const inputPhone = document.createElement('input');
    inputPhone.placeholder = 'Ваш телефон..';
    const addBtn = document.createElement('button');
    addBtn.innerText = 'Отправить';
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
//contactsList.createUser('Alex', 'alex@mail.ru', 'Minsk', '+375 29 999 99 99');
//contactsList.createUser('Bob', 'bob@mail.ru', 'Minsk', '+375 29 999 45 ');
//contactsList.createUser('Make', 'make@mail.ru', 'Minsk', '+375 29 999 99 56');
//contactsList.editUser(0, 'Liza');
//contactsList.removeUser(1);
//contactsList.createUser('Nik', 'nik@mail.ru', 'Minsk', '+375 29 999 99 22');
    
    
