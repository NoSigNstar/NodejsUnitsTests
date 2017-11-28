const lodash = require('lodash');
const items = require('../Database/dummyItems');
const lists = require('../Database/dummyLists');

/**
 * Fetch Databases to find the list using the uuid
 * @param {*The uniq uuid of the list} uuid 
 * @param {*Use it to modify the list element} callback 
 */
const getList = (uuid, callback) => {
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

        lists[i]._buildItems();
        result = lists[i];
        break;
    }

    return result;
}

/**
 * Dummy deletion, true if deleted, false otherwise
 * @param {*The uuid of the list} uuid 
 */
const deleteList = (uuid) => {
    const list = getList(uuid);
    if (!list) { return false; }

    delete list; // FAKE DELETION

    return true;
}

Object.prototype._buildItems = function(callback) {
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


module.exports = { getList, deleteList };