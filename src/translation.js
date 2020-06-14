/**
 * Class that is used for passing data between database and route.
 * @class Translation
 */
class Translation {
    key = null
    locale = null
    translation = null

    constructor(key, locale, translation) {
        this.key = key;
        this.locale = locale;
        this.translation = translation;
    }
}

module.exports = Translation