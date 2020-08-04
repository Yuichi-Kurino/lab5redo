const bcrypt = require('bcrypt');
const db = require('../database/dbConfig');


async function insertUser(user) {
    //TODO start your code right here
    try {

        await db('users')
            .insert({email:user.email, password: bcrypt.hashSync(user.password,0)});
        return {process:"success"};
    }catch(err){
        console.error("Insert failed in users", err);
        return {process:"fail"};
    }
}

async function getUserByID(id){
    try {

        return await db('users')
            .select('*')
            .where('uid',id);

    }catch(err){
        console.error("getUserByID failed in users", err);
        return {process:"fail"};
    }
}

async function getUserByEmail(email){
    try {
        return await db('users')
            .select('*')
            .where('email',email);

    }catch(err){
        console.error("getUserByEmail failed in users", err);
        return {process:"fail"};
    }
}

async function getUserByID(id){
    try {
        return await db('users')
            .select('*')
            .where('id',id);

    }catch(err){
        console.error("getUserByEmail failed in users", err);
        return {process:"fail"};
    }
}

module.exports={insertUser,getUserByEmail,getUserByID};

// async function insertUser(userJSON);
// async funcion getUserByID(id);
// async function getUserByEmail(email);
