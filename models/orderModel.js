const db = require('../database/dbConfig');

async function getItemByUserID(id){
    console.log(id.userDataPacket.id)
    try {
        return await db('users')
            .select('itemInfo','pid')
            .join('items', {'users.uid': 'items.uid'})
            .where({'users.uid':id.userDataPacket.id});

    }catch(err){
        console.error("getItemByUserID failed in items", err);
        return null;
    }
}

async function insertItem(item) {
    //TODO start your code right here
    try {
        await db('items')
            .insert(item);
        return {process: "success"};
    } catch (err) {
        console.error("Insert failed in items", err);
        return {process: "fail"};
    }

}

async function deleteItem(item) {
    try {
        await db('items')
            .del(item)
            .where({pid: item.pid});
        return {process:"success"};
    }catch(err){
        console.error("item delete failed", err);
        return {process:"fail"};
    }
}

async function changeItem(item) {
    try {
        await db('items')
            .update(item)
            .where({pid: item.pid});
        return {process:"success"};
    }catch(err){
        console.error("item change failed", err);
        return {process:"fail"};
    }
}


module.exports={insertItem, getItemByUserID, deleteItem, changeItem};