/**
 * Created by pgorbachev on 31.07.15.
 */

Autoloader.include('exceptions/InvalidArgumentException.class.js');
Autoloader.include('exceptions/OutOfBoundsException.class.js');
Autoloader.include('classes/AbstractBaseClass.class.js');

/**
 *
 * @param data
 * @constructor
 */
function Configuration(data) {
    if (!this.isUndefined(data)) {
        if (this.isArray(data)) {
            this.data = data;
        } else if (data instanceof Configuration) {
            this.data = data.data;
        } else {
            throw new InvalidArgumentException('Unsupported config data.')
        }
    }
}
/**
 *
 * @type {AbstractBaseClass}
 */
Configuration.prototype = Object.create(AbstractBaseClass.prototype);
/**
 *
 * @type {Configuration}
 */
Configuration.prototype.constructor = Configuration;

/**
 *
 * @param indent
 * @returns {string}
 */
Configuration.prototype.toString = function (indent) {
    indent = typeof indent !== 'undefined' ? indent : 0;

    var buffer = '';
    var self = this;
    this.data.forEach(function (k, value) {
        var keys = Object.keys(k);
        var repeated = new Array(indent).join('  ');
        buffer = buffer + repeated + keys + ':';
        if (self.isArray(value)) {
            var tmp = new Configuration(value);
            buffer = buffer + "\n".tmp.toString(indent + 1);
        }
        else if (self.isBoolean(value)) {
            buffer = buffer + ' ' + (value ? 'true' : 'false') + "\n";
        }
        else if (self.isString(value)) {
            buffer = buffer + ' ' + value + "\n";
        }
        else {
            buffer = buffer + ' ' + value + "\n";
        }
    });
    return buffer;
};

/**
 *
 * @param key
 * @returns {boolean}
 */
Configuration.prototype.has = function (key) {
    return this.data.hasOwnProperty(key.toLowerCase());
};

Configuration.prototype.getByKey = function (key, objectResolved) {
    var data = this.data;
    var keys = key.toLowerCase().split('.');

    if (this.isArray(data)) {
        for (var keyPart in keys) {
            for (var i in data) {
                if (data[i].hasOwnProperty(keys[keyPart])) {
                    dataValue = data[i][keys[keyPart]];
                } else {
                    objectResolved.resolved = false;
                    return;
                }
            }
        }
    } else {
        objectResolved.resolved = false;
        return;
    }

    objectResolved.resolved = true;
    return dataValue;
};

/**
 *
 * @param key
 * @returns {*}
 */
Configuration.prototype.get = function (key) {
    var resolved = {resolved: false};
    var value = this.getByKey(key, resolved);

    if (resolved.resolved) {
        return value;
    }

    throw new OutOfBoundsException('Configuration setting not found: "' + key + '"');
};

/**
 *
 * @param key
 * @returns {boolean}
 */
Configuration.prototype.getBoolean = function (key) {

    var resolved = {resolved: false};
    var value = this.getByKey(key, resolved);

    if (resolved.resolved) {
        return value ? true : false;
    }

    throw new OutOfBoundsException('Configuration setting not found: "' + key + '"');
};

/**
 *
 * @param key
 * @returns {Number}
 */
Configuration.prototype.getInteger = function (key) {

    var resolved = {resolved: false};
    var value = this.getByKey(key, resolved);

    if (resolved.resolved) {
        return parseInt(value);
    }

    throw new OutOfBoundsException('Configuration setting not found: "' + key + '"');
};

/**
 *
 * @param key
 * @returns {Number}
 */
Configuration.prototype.getFloat = function (key) {

    var resolved = {resolved: false};
    var value = this.getByKey(key, resolved);

    if (resolved.resolved) {
        return parseFloat(value);
    }

    throw new OutOfBoundsException('Configuration setting not found: "' + key + '"');
};

/**
 *
 * @param key
 * @returns {string}
 */
Configuration.prototype.getString = function (key) {

    var resolved = {resolved: false};
    var value = this.getByKey(key, resolved);

    if (resolved.resolved) {
        return String(value).toString();
    }

    throw new OutOfBoundsException('Configuration setting not found: "' + key + '"');
};