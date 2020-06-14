const Translation = require("../translation");
const Database = require("../database");
const connectionString = require("../connectionString.json");

const express = require("express");
const router = express.Router();
const translationDB = new Database(connectionString.connectionString);

/**
 * Path to this route.
 */
const path = "/";

/** 
 * Create
 * Use this when inserting new values into the api.
 */
router.post(path, (req, res) => {
    try {
        let {
            key,
            locale,
            translation
        } = req.body;
        translationDB.insertTranslation(new Translation(key, locale, translation))
            .then((rows) => {
                res.sendStatus(200);
            })
            .catch(err => {
                throw err;
            });
    } catch (err) {
        res.sendStatus(400);
    }
});

/**
 * Update
 * Use this to update the value based on the key
 */
router.put(path, (req, res) => {
    try {
        let {
            key,
            locale,
            translation
        } = req.body;
        translationDB.updateTranslation(new Translation(key, locale, translation))
            .then((rows) => {
                res.sendStatus(200);
            })
            .catch(err => {
                throw err
            });
    } catch (err) {
        res.sendStatus(400);
    }
});


/**
 * Read
 * Use this to get the value from the api
 */
router.get(path, (req, res) => {
    try {
        let {
            key,
            locale
        } = req.body;
        translationDB.readTranslation(new Translation(key, locale))
            .then(rows => {
                if (rows)
                    res.json(rows);
                else
                    res.sendStatus(404);
            })
            .catch(err => {
                throw err
            });
    } catch (err) {
        res.sendStatus(400);
    }
});

/** 
 * Delete
 * Use this to remove values with key
 */
router.delete(path, (req, res) => {
    try {
        let {
            key,
            locale
        } = req.body;
        translationDB.deleteTranslation(new Translation(key, locale))
            .then(rows => {
                res.json(rows);
            })
            .catch(err => {
                throw err
            });
    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
});

/**
 * Get all locales that are in the database.
 */
router.get(`${path}locales`, (req, res) => {
    try {
        let {
            key,
            locale
        } = req.body;
        translationDB.GetLocales(new Translation(key, locale))
            .then(rows => {
                res.json(rows);
            })
            .catch(err => {
                throw err
            });
    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
});

module.exports = router;