/**
 * Created by mushu_000 on 02.08.2015.
 */


function Reflection(object) {
    if (!this.isObject(object) && !this.isFunction(object)) {
        throw new InvalidArgumentException('Not a object');
    }
    this.reflectionObject = object;
}

Reflection.prototype = Object.create(AbstractBaseClass.prototype);
Reflection.prototype.constructor = Reflection;

/**
 *
 * @returns {Array}
 */
Reflection.prototype.getProperties = function () {
    var properties = [];
    var objectProperties = Object.getOwnPropertyNames(this.reflectionObject);
    var self = this;
    objectProperties.forEach(function (property) {
        if (!self.isFunction(self.reflectionObject[property])) {
            properties[property.toLowerCase()] = self.reflectionObject[property];
        }
    });
    return properties;
}

/**
 *
 * @returns {Array}
 */
Reflection.prototype.getMethods = function () {
    var methods = [];
    var objectMethods = Object.getOwnPropertyNames(this.reflectionObject.__proto__);
    var self = this;
    objectMethods.forEach(function (method) {
        if (self.isFunction(self.reflectionObject[method])) {
            switch (method.toLowerCase()) {
                default:
                    methods[method.toLowerCase()] = self.reflectionObject[method];
            }
        }
    });
    return methods;
}

/**
 *
 * @returns {String}
 */
Reflection.prototype.getArguments = function () {
    var str = this.reflectionObject['constructor'].toString();
    var len = str.indexOf("(");
    return str.substr(len + 1, str.indexOf(")") - len - 1).replace(/ /g, "").split(',')
}

Reflection.prototype.getArgumentsBy = function (obj) {
    var str = obj.toString();
    var len = str.indexOf("(");
    return str.substr(len + 1, str.indexOf(")") - len - 1).replace(/ /g, "").split(',')
}

/**
 *
 * @returns {String}
 */
Reflection.prototype.getShortName = function () {
    if (this.isObject(this.reflectionObject)) {
        return this.reflectionObject['constructor'].name;
    } else if (this.isFunction(this.reflectionObject)) {
        return this.reflectionObject.name;
    }
    throw new InvalidArgumentException("Expecting object or function");
}

/**
 *
 * @returns {boolean}
 */
Reflection.prototype.isInterface = function () {
    return !this.isNullOrUndefined(this.reflectionObject.implement);
}

/**
 *
 * @returns {*}
 */
Reflection.prototype.getImplementation = function () {
    return this.reflectionObject.implement.name;
}




