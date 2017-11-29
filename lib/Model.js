const lodash = require('lodash');
const items = require('../Database/dummyItems');
const lists = require('../Database/dummyLists');

/**
 * Fetch Databases to find the list using the uuid
 * @param {*The uniq uuid of the list} uuid 
 * @param {*Use it to modify the list element} callback 
 * @param {*Loads items data by default} bucket
 */
const getList = (uuid, callback, bucket = true) => {
    if (!uuid) { return null; }
    let result = null;

    for (let i = 0; i < lists.length; i++) {
        if (lists[i].uuid != uuid) { continue; }

        if (callback && typeof callback === 'function') {
            const preProcess = callback(lists[i]);

            if (preProcess && lodash.isPlainObject(preProcess)) {
                result = preProcess;
                break;
            }
        }

        if (bucket) { lists[i]._buildItems(); }

        result = lists[i];
        break;
    }

    return result;
}

const getItem = (uuid) => {
    if (!uuid) { return null; };
    let item = null;

    for (let i = 0; i < items.length; i++) {
        if (items[i]._id !== uuid) { continue; };
        
        item = items[i];
        break;
    }

    return item;
}

/**
 * Dummy deletion, true if deleted, false otherwise
 * @param {*The uuid of the list} uuid 
 */
const deleteList = (uuid) => {
    const list = getList(uuid);
    if (!list) { return false; }

    delete list; // FAKE DELETION

    return true;
}

const addItemToList = (uuid, itemName) => {
    const list = getList(uuid, undefined, false);
    if (!list) return null;

    list.items.push(itemName);
    return list;
}

Object.prototype._buildItems = function (callback) {
    if (!this.items || !lodash.isArray(this.items)) { return false; }

    const result = [];

    for (let i = 0; i < items.length; i++) {
        if (this.items.indexOf(items[i].quantity) == -1) { continue; } // # TODO: dont use quantities dumbass ... [cf ids items]

        if (callback && typeof callback === 'function') {
            callback(items[i]);
        }
        result.push(items[i]);
    }

    this.items = result;
}

Object.prototype.save = function () {
    return true; // just dummy saving ! 
}


module.exports = { getList, deleteList, addItemToList, getItem };