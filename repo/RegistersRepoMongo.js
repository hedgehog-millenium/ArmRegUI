const mongojs = require('mongojs')
const { MongoClient } = require('mongodb');
const config = require('../config')

// const db = mongojs(config.db.path, config.db.collections)

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

function SearchRegister(criteria) {
    return new Promise(async (resolve, reject) => {
        try {
            const docs = await collection.find(
                { $text: { $search: criteria } },
                { score: { $meta: 'textScore' } }
            ).sort({ score: { $meta: 'textScore' } }).limit(1000).toArray();
            resolve(docs);
        } catch (err) {
            reject(err);
        }
    });
}


function SearchByAddress(searchAddress) {
    const schReg = createSearchRegex(searchAddress);
    return new Promise(async (resolve, reject) => {
        try {
            const docs = await collection.find({ address: schReg }).limit(500).toArray();
            resolve(docs);
        } catch (err) {
            reject(err);
        }
    });
}

function SearchByFieldValue(field, value) {
    const toRegexStyle = RegExp.escape(value);
    const schReg = new RegExp(toRegexStyle.split(' ').filter(Boolean).join('.*'), 'i');

    return new Promise(async (resolve, reject) => {
        const query = {};
        query[field] = schReg;

        try {
            const docs = await collection.find(query).limit(1000).toArray();
            resolve(docs);
        } catch (err) {
            reject(err);
        }
    });
}
RegExp.escape = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

function createSearchRegex(text) {
    var toRegexStyle = RegExp.escape(text)
    var schReg = new RegExp(toRegexStyle.split(' ').filter(Boolean).join('\\s*'), 'i');
    return schReg
}

module.exports = {
    SearchRegister: SearchRegister,
    SearchByAddress: SearchByAddress,
    SearchByFieldValue: SearchByFieldValue
}