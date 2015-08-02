/**
 * Created by mushu_000 on 31.07.2015.
 */

function BindingAbstract() {
    this.typeName = null;
    this.scope = null;
    this.options = null;
}

BindingAbstract.prototype = Object.create(BindingInterface.prototype);
BindingAbstract.prototype.constructor = BindingAbstract;

/**
 *
 * @returns {string}
 */
BindingAbstract.prototype.toString = function () {
    return this.typeName;
}

/**
 *
 * @returns {string}
 */
BindingAbstract.prototype.getTypeName = function () {
    return this.toString();
}

/**
 *
 * @returns {null}
 */
BindingAbstract.prototype.getOptions = function () {
    return this.options;
}

/**
 *
 * @returns {boolean}
 */
BindingAbstract.prototype.isFactoryBinding = function () {
    return (this.options & this.TYPE_FACTORY) != 0;
}

/**
 *
 * @returns {boolean}
 */
BindingAbstract.prototype.isFactoryAliasBinding = function () {
    return (this.options & this.TYPE_FACTORY_ALIAS) != 0;
}

/**
 *
 * @returns {boolean}
 */
BindingAbstract.prototype.isImplementationBinding = function () {
    return (this.options & this.TYPE_IMPLEMENTATION) != 0;
}

/**
 *
 * @returns {boolean}
 */
BindingAbstract.prototype.isAliasBinding = function () {
    return (this.options & thisTYPE_ALIAS) != 0;
}

/**
 *
 * @returns {number}
 */
BindingAbstract.prototype.getType = function () {
    return this.options & this.MASK_TYPE;
}

/**
 *
 * @returns {null}
 */
BindingAbstract.prototype.getScope = function () {
    return this.scope;
}