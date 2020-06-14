const {
    Pool
} = require("pg");


/**
 * Database client for the translation database.
 * @class TranslationDatabase
 */
class TranslationDatabase {
    pool = null;
    constructor(connectionString) {
        this.pool = new Pool({
            connectionString: connectionString
        });

        // Connect to the database.
        this.pool.connect()
            .then(client => {
                console.log(`Connected to database on ${client.host}:${client.port}`);
            })
            .catch(err => {
                throw err;
            });
    }
    /**
     * Inserts translation to the database.
     * @param {*} translation
     * @returns Promise<Result>
     * @memberof TranslationDatabase
     */
    insertTranslation(translation) {
        return this.pool.query("INSERT INTO translation.translation VALUES ($1, $2, $3);", [translation.key, translation.locale, translation.translation])
            .then(res => {
                return res.rows;
            })
            .catch(err => {
                throw err;
            });
    }


    /**
     * Update translation in the database.
     * @param {*} translation
     * @returns Promise<Result>
     * @memberof TranslationDatabase
     */
    updateTranslation(translation) {
        return this.pool.query("UPDATE translation.translation SET locale=$2, translation=$3 WHERE key=$1;", [translation.key, translation.locale, translation.translation])
            .then(res => {
                return res.rows;
            })
            .catch(err => {
                throw err;
            });
    }

    /**
     * Delete translation from the database.
     * @param {*} translation
     * @returns Promise<Result>
     * @memberof TranslationDatabase
     */
    deleteTranslation(translation) {
        return this.pool.query("DELETE FROM translation.translation WHERE key=$1;", [translation.key])
            .then(res => {
                return res.rows;
            })
            .catch(err => {
                throw err;
            });
    }


    /**
     * Read translation from the database.
     * @param {*} translation
     * @returns Promise<Result>
     * @memberof TranslationDatabase
     */
    readTranslation(translation) {
        return this.pool.query('SELECT * FROM translation.translation WHERE key=$1 AND locale=$2;', [translation.key, translation.locale])
            .then(res => {
                if (res.rows.length > 0)
                    return res.rows[0];
                else
                    return false;
            })
            .catch(err => {
                throw err;
            });
    }

    /**
     * Read all translations from the database.
     * @returns Promise<Result>
     * @memberof TranslationDatabase
     */
    readAllTranslations() {
        return this.pool.query('SELECT * FROM translation.translation;', [translation.key, translation.locale])
            .then(res => {
                return res.rows;
            })
            .catch(err => {
                throw err;
            });
    }


    /**
     *
     * Returns all available locales found in the database
     * @returns Promise<Results>
     * @memberof TranslationDatabase
     */
    getLocales() {
        return this.pool.query('SELECT DISTINCT locale FROM translation.translation')
            .then(res => {
                return res.rows;
            })
            .catch(err => {
                throw err;
            });
    }
}


module.exports = TranslationDatabase;