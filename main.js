//? elementi catturati

let cardWrapper = document.querySelector('#cardWrapper');

let showContactsBtn = document.querySelector('#showContactsBtn');

let addContactBtn = document.querySelector('#addContactBtn');

let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');

let deleteContactBtn = document.querySelector('#deleteContactBtn');

let searchContactBtn = document.querySelector('#searchContactBtn');



//? altre variabili

let check = false;



//? oggetto

let rubrica = {

    'contacts' : [

        {'id': 1, 'name' : 'Marco', 'number' : '340294432'},
        {'id': 2, 'name' : 'Angelo', 'number' : '340294432'},
        {'id': 3, 'name' : 'Loris', 'number' : '340294432'},

    ],


    //? funzioni

    'showContacts' : function(arr){

        // svuoto il wrapper ogni volta: prima di inserire le card (if), oppure per nasconderle (else)

        cardWrapper.innerHTML = '';

        if(check == false){

            // se il check e' false vuol dire che il bottone non e' ancora stato cliccato

            arr.forEach((contact)  => {

                let card = document.createElement('div');

                card.classList.add('col-12', 'col-md-6', 'mb-3', 'mx-3');

                card.innerHTML = `

                <div class="card-custom">

                <p class="lead m-0">${contact.name}</p>
                <p class="lead m-0">${contact.number}</p>
                <p class="lead m-0">
                <i class="fa-solid fa-trash icon-custom" id="${contact.id}"></i>
                </p>

                </div>

                `;

                cardWrapper.appendChild(card);


            })

            // catturo le icone cestino
            let deleteIcons = document.querySelectorAll('.icon-custom');

            deleteIcons.forEach((icon) => {

                icon.addEventListener('click', () => {

                    // al click su ciascuna icona, catturo l'id dell'icona (che le e' stato dato dinamicamente) e lo passo come parametro alla funzione deleteContact()

                    let contactId = icon.id;
                    this.deleteContact(contactId);

                })

            })


            // setto check = true, cosi' se clicchiamo di nuovo il bottone entra nell'else
            check = true;
            showContactsBtn.innerHTML = 'Nascondi rubrica';

        }else{

            showContactsBtn.innerHTML = 'Mostra rubrica';
            check = false;

        }

    },


    'addContact' : function(contactName, contactNumber){


        let newId;


        if (nameInput.value !== '' && numberInput.value !== ''){

            // se i campi non sono vuoti:

            // setto check = false perche' se aggiungo un nuovo contatto voglio che venga mostrato nella lista contatti aggiornata
            check = false;

            // assegno dinamicamente un id al nuovo contatto

            if(this.contacts.length > 0 ){

                newId = this.contacts[this.contacts.length - 1].id + 1;

            }else{

            // se la lista contatti e' vuota, il nuovo id sara' 1
                newId = 1;
            }


            // creo il nuovo contatto come elemento dell'array contacts

            this.contacts.push({'id' : newId, 'name' : contactName, 'number' : contactNumber});

            // mostro la lista contatti aggiornata

            this.showContacts(this.contacts);

            // svuoto i campi

            nameInput.value = '';
            numberInput.value = '';

        }else{

            alert('Riempire i campi');

        }


    },


    'deleteContact' : function(deletedId){

        // preso in entrata un ID, cerco l'indice del contatto che ha lo stesso id

        let index = this.contacts.findIndex((contact) => contact.id == deletedId);

        // do index come parametro allo splice per rimuovere un elemento a partire da quell'indice

        this.contacts.splice(index, 1);


        check = false;

        this.showContacts(this.contacts);

        nameInput.value = '';

    },


    'searchContact' : function(search){

        let filtered = this.contacts.filter((contact) => contact.name.toLowerCase() == search.toLowerCase());

        check = false;

        this.showContacts(filtered);

    }


};



//? eventi


showContactsBtn.addEventListener('click', () => {

    rubrica.showContacts(rubrica.contacts);

});


addContactBtn.addEventListener('click', () => {

    rubrica.addContact(nameInput.value, numberInput.value);

});


deleteContactBtn.addEventListener('click', () => {

    // trovo il contatto con lo stesso nome (find prendera' il primo contatto che trova con lo stesso nome)

    let filtered = rubrica.contacts.find((contact) => contact.name.toLowerCase() == nameInput.value.toLowerCase());

    if(filtered){

        // se il contatto esiste, e quindi filtered != undefined, trova l'id del contatto e lo passa come parametro a deleteContact()

        let id = filtered.id;

        rubrica.deleteContact(id);

    }else{

        alert('Il contatto non esiste');

    }


});


searchContactBtn.addEventListener('click', () => {

    rubrica.searchContact(nameInput.value);

})