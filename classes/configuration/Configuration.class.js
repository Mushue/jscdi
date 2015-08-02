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

/**
 *
 * @param key
 * @param defaults
 * @returns []
 */
Configuration.prototype.getArray = function (key, defaults) {
    defaults = typeof defaults !== 'undefined' ? defaults : [];
    key = Object.toLowerCase(key);

    if (this.isArray(data)) {
        for (var i in data) {
            if (data[i].hasOwnProperty(key)) {
                return [data[i][key]];
            }
        }
    }
    return defaults;
}

/**
 *
 * @param key
 * @returns number
 */
Configuration.prototype.getCount = function (key) {
    key = key.toLowerCase();

    if (this.isArray(data)) {
        for (var i in data) {
            if (data[i].hasOwnProperty(key)) {
                return 1;
            }
        }
    }
    return 0;
}

/**
 *
 * @param key
 * @param defaults
 * @returns {*}
 */
Configuration.prototype.getConfig = function (key, defaults) {
    defaults = typeof defaults !== 'undefined' ? defaults : null;
    if (defaults !== null && !(defaults instanceof Configuration)) {
        throw new InvalidArgumentException('Not a Configuration instance');
        return;
    }

    var resolved = {resolved: false};
    var value = this.getByKey(key, resolved);

    if (resolved.resolved) {
        return new Configuration(value);
    }

    return (defaults === null) ? new Configuration() : defaults;
}

/**
 *
 * @param container
 * @returns {*}
 */
Configuration.prototype.mergeWith = function (container) {
    container = typeof container !== 'undefined' ? container : null;
    if (container === null || !(container instanceof Configuration)) {
        throw new InvalidArgumentException('Not a Configuration instance');
        return;
    }
    return this.mergeWithConfiguration(container);
}

/**
 * @TODO not implemented yet
 * @param container
 * @param keyStack
 */
Configuration.prototype.mergeWithConfiguration = function (container, keyStack) {
    container = typeof container !== 'undefined' ? container : null;
    keyStack = typeof keyStack !== 'undefined' ? keyStack : [];

    if (container === null || !(container instanceof Configuration)) {
        throw new InvalidArgumentException('Not a Configuration instance');
        return;
    }

    var self = this;
    var result = [];
    if (this.isArray(container.data)) {
        for (var i in container.data) {
            container.data[i].forEach(function (k, v) {
                if (!self.data[i].hasOwnProperty(k)) {
                    result[k] = v;
                    return;
                }
                if (self.isArray(self.data[i][key]) && self.isArray(v)) {
                    var fk1 = Object.keys(self.data[i][key]);
                    var fk2 = key(v);
                    // @TODO not implemented yet
                }
            })
        }
    }
}