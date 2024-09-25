const { MongoClient } = require('mongodb');
const config = require('../config')

const queryLimit = 1000;
let db;
let collection;

// Connect to MongoDB
async function connectToMongo() {
    const client = new MongoClient(config.db.path);
    try {
        await client.connect();
        console.log('Database is connected and ready');
        db = client.db();  // Use the default database in the URI or specify
        collection = db.collection(config.db.collections[0]);  // Access the first collection
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

// Call the connection function to connect at startup
connectToMongo();

const SearchRegistryAsync = (criteria) => {
    return collection.find(
        { $text: { $search: criteria } },
        { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } }).limit(queryLimit).toArray();
}


const SearchByAddressAsync = (searchAddress) => {
    const schReg = createSearchRegex(searchAddress);
    return collection.find({ address: schReg }).limit(queryLimit).toArray();
}

const SearchByFieldValueAsync = (field, value) => {
    const toRegexStyle = RegExp.escape(value);
    const schReg = new RegExp(toRegexStyle.split(' ').filter(Boolean).join('.*'), 'i');

    const query = {};
    query[field] = schReg;

    return collection.find(query).limit(queryLimit).toArray();

}
RegExp.escape = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

function createSearchRegex(text) {
    var toRegexStyle = RegExp.escape(text)
    var schReg = new RegExp(toRegexStyle.split(' ').filter(Boolean).join('\\s*'), 'i');
    return schReg
}

module.exports = { SearchRegistryAsync, SearchByAddressAsync, SearchByFieldValueAsync }