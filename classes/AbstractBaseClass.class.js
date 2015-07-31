/**
 * Created by pgorbachev on 31.07.15.
 */

/**
 *
 * @param context
 * @constructor
 */
function AbstractBaseClass(context) {
    this.context = context;
}
/**
 *
 * @param context
 * @returns {AbstractBaseClass}
 */
AbstractBaseClass.prototype.setContext = function (context) {
    this.context = context;
    return this;
};
/**
 *
 * @param str
 * @returns {boolean}
 */
AbstractBaseClass.prototype.isString = function (str) {
    return typeof str === 'string';
};
/**
 *
 * @param number
 * @returns {boolean}
 */
AbstractBaseClass.prototype.isNumber = function (number) {
    return typeof number === 'number';
};
/**
 *
 * @param obj
 * @returns {boolean}
 */
AbstractBaseClass.prototype.isObject = function (obj) {
    return typeof obj === 'object';
};
/**
 *
 * @param bool
 * @returns {boolean}
 */
AbstractBaseClass.prototype.isBoolean = function (bool) {
    return typeof bool === 'boolean';
};
/**
 *
 * @param arr
 * @returns {boolean}
 */
AbstractBaseClass.prototype.isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
};
/**
 *
 * @param arr
 * @returns {boolean}
 */
AbstractBaseClass.prototype.isFunction = function (arr) {
    return typeof arr === 'function';
};

/**
 *
 * @param str
 * @returns {boolean}
 */
AbstractBaseClass.prototype.isUndefined = function (str) {
    return typeof str == 'undefined';
};
/**
 *
 * @param obj
 * @returns {boolean}
 */
AbstractBaseClass.prototype.isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
};
/**
 *
 * @param myArguments
 * @returns {Array}
 */
AbstractBaseClass.prototype.makeArgsArray = function (myArguments) {
    var args = [];
    for (var arg in myArguments) {
        if (!myArguments.hasOwnProperty(arg)) {
            continue;
        }

        if (this.isArray(myArguments[arg])) {
            args = args.concat(myArguments[arg]);
        } else {
            args.push(myArguments[arg]);
        }
    }

    return args;
};