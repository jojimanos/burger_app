import { useState } from 'react';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { app, database } from '../../firebaseConfig';

const fs = require('fs');
const shortId = require('shortid')

// users in JSON file for simplicity, store in a db for production applications
let users = require('data/users.json');

const dbInstance = collection(database, "users")
    //let users = getUsers() 

export const usersRepo = {
    //getAll: () => users,
    //getById: id => users.find(x => x.id.toString() === id.toString()),
    //find: x => users.find(x),
    //create,
    //update,
    //delete: _delete

    getUsers: getUsers,
    getAll: () => users,
    getById: id => users.find(x => x.id.toString() === id.toString()),
    find: x => users.find(x),
    update,
    delete: _delete,
    addUser: addUser
};

function getUsers() {
    //const [usersArray, setUsersArray] = useState([]);
    getDocs(dbInstance)
            .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
                //console.log(data)
                //});
            
            
            //let users = []
            //console.log(usersArray)
            //return users = usersArray
    };

function addUser(user) {
    // generate new user id
    user.id = shortId.generate()

    // set date created and updated
    user.dateCreated = new Date().toISOString()
    user.dateUpdated = new Date().toISOString()

    addDoc(dbInstance, { user: user });

    console.log(user)
}

function update(id, params) {
    const user = users.find(x => x.id.toString() === id.toString());

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted user and save
    users = users.filter(x => x.id.toString() !== id.toString());
    saveData();

}

// private helper functions

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}