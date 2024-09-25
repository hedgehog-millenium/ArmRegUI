const express = require('express');
const router = express.Router();
const repo = require('../repo/RegistersRepoMongo')
const converter = require('../modules/usa-arm-converter')
const languageDetector = require('../modules/language-detector')

router.get('/', function (req, res, next) {
    const text = req.query.text
    const convertedText = converter.convertToArm(text)
    res.send(convertedText)
});

router.post('/', async (req, res, next) => {
    let searchText = req.body.searchText.toLowerCase();
    searchText = ImproveSearchText(searchText)

    try {
        const docs = await repo.SearchRegistryAsync(searchText)
        res.send(CreateReturnObject(searchText, docs));
    } catch (err) {
        console.log(err)
        res.status(503).send({ message: 'Please check Database connection !' });
    }

})

router.post('/searchByAddress', async (req, res, next) => {
    const search_address = req.body.address.toLowerCase();

    try {
        const docs = await repo.SearchByAddressAsync(search_address)
        res.send(CreateReturnObject(search_address, docs));
    } catch (err) {
        console.log(err)
        res.status(503).send({ message: 'Please check Database connection !' });
    }
});

router.post('/searchByFieldValue', async (req, res, next) => {
    const fld_name = req.body.field
    let schText = req.body.searchText.toLowerCase();
    schText = ImproveSearchText(schText)

    try {
        const docs = await repo.SearchByFieldValueAsync(fld_name, schText);
        res.send(CreateReturnObject(schText, docs));
    } catch (err) {
        console.log(err)
        res.status(503).send({ message: 'Please check Database connection !' });
    }

});

function CreateReturnObject(schText, items) {
    return { searchText: schText, registries: items }
}

function ImproveSearchText(text) {
    if (languageDetector.IsTextInEnglish(text))
        return converter.convertToArm(text)
    else
        return text
}

module.exports = router;


