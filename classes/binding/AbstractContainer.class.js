/**
 * Created by mushu_000 on 01.08.2015.
 */

function AbstractContainer(parameters, initializers) {
    this.scopes = [];
    this.proxies = [];
    this.underConstruction = [];
    this.setterCache = undefined;
    this.proxyTypes = [];

    this.parameters = this.isArray(parameters) ? parameters : [];
    this.initializers = this.isArray(initializers) ? initializers : [];

    this.config = new Configuration();
    this.proxyGenerator = new ScopedProxyGenerator();

}

AbstractContainer.prototype = Object.create(AbstractBaseClass.prototype);
AbstractContainer.prototype.constructor = AbstractContainer;

/**
 *
 * @param objectClass
 * @returns {AbstractContainer}
 */
AbstractContainer.prototype.proxy = function (objectClass) {
    var ref = new Reflection(objectClass);
    var code = this.proxyGenerator.generateProxyCode(ref);
    this.proxies[ref.getShortName() + '__scoped'] = code;
    return this;
}

/**
 *
 * @param binding
 * @param target
 * @returns {*}
 */
AbstractContainer.prototype.getProxy = function (binding, target) {
    if (!this.isObject(binding)) {
        throw new InvalidArgumentException('Not a object');
    }
    var ref = new Reflection(binding);
    if (!this.isNullOrUndefined(this.proxies[ref.getShortName() + '__scoped'])) {
        eval(this.proxies[ref.getShortName() + '__scoped']);
        var newObjectClass = eval(ref.getShortName() + '__scoped');
        return new newObjectClass(new Binding('myType'), 2, 3);
    }
    return null;
}



