import { useState } from 'react';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { app, database } from '../../firebaseConfig';

const fs = require('fs');
const shortId = require('shortid')

// users in JSON file for simplicity, store in a db for production applications
let users = require('data/users.json');

// Read users from database, authentication required

//const dbInstance = collection(database, "users") 
//
//const getUsers = () => {
//    let usersArray = [];
//    getDocs(dbInstance)
//        .then((data) => {
//            (data.docs.map((item) => {
//                console.log(usersArray);
//                usersArray.push({ ...item.data() })
//            })
//            );
//        })
//    console.log(usersArray)
//    return usersArray
//}

export const usersRepo = {
    getAll: () => users,
    getById: id => users.find(x => x.id.toString() === id.toString()),
    find: x => users.find(x),
    create,
    update,
    delete: _delete

    //getAll: getUsers,
    //getById: id => getUsers().find(x => x.id.toString() === id.toString()),
    //find: x => getUsers().find(x),
    //update,
    //delete: _delete,
    //addUser: addUser
};

function create(user) {
    // generate new user id
    user.id = shortId.generate()

    // set date created and updated
    user.dateCreated = new Date().toISOString()
    user.dateUpdated = new Date().toISOString()

    //addDoc(dbInstance, { user: user }); //add user in database

    // add and save user
    users.push(user);
    saveData();

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