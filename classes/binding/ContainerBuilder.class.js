/**
 * Created by mushu_000 on 01.08.2015.
 */

/**
 *
 * @param ContainerInitializerLoader initializers
 * @constructor
 */
function ContainerBuilder(initializers) {

    //if (this.isUndefined(initializers)) {
    //    initializers = new ContainerInitializerLoader();
    //} else if (!this.isNull(initializers) && !(initializers instanceof ContainerInitializerLoader)) {
    //    throw new InvalidArgumentException('Not a ContainerInitializerLoader argument')
    //}

    this.initializers = initializers;
    this.parameters = [];
    this.bindings = [];
    this.proxyTypes = undefined;
    this.initializers = undefined;

}

ContainerBuilder.prototype = Object.create(AbstractBaseClass.prototype);
ContainerBuilder.prototype.constructor = ContainerBuilder;

/**
 *
 * @returns {array}
 */
ContainerBuilder.prototype.getInitializers = function () {
    return this.initializers.toArray();
}

/**
 *
 * @param name
 * @returns {boolean}
 */
ContainerBuilder.prototype.hasParameter = function (name) {
    return this.arrayKeyExists(name, this.parameters);
}

/**
 *
 * @param name
 * @returns {*}
 * @throws ContextParamNotFoundException
 */
ContainerBuilder.prototype.getParameter = function (name) {
    if (this.arrayKeyExists(name, this.parameters)) {
        return this.parameters[name];
    }

    throw new ContextParamNotFoundException('Container parameter "' + name + '" was not found');
}

/**
 *
 * @returns {*}
 */
ContainerBuilder.prototype.getParameters = function () {
    return this.parameters;
}

/**
 *
 * @param name
 * @param value
 * @returns {ContainerBuilder}
 */
ContainerBuilder.prototype.setParameter = function (name, value) {
    this.parameters[name] = value;
    return this;
}

/**
 *
 * @param name
 * @returns {ContainerBuilder}
 */
ContainerBuilder.prototype.removeParameter = function (name) {
    delete this.parameters[name];
    return this;
}

/**
 *
 * @param typeName
 * @returns {boolean}
 */
ContainerBuilder.prototype.isBound = function (typeName) {
    return !this.isUndefined(this.bindings[typeName]);
}

/**
 *
 * @param typeName
 * @returns {Binding}
 */
ContainerBuilder.prototype.bind = function (typeName) {
    if (!this.isUndefined(this.proxyTypes)) {
        this.proxyTypes = NULL;
    }

    key = typeName.toLowerCase();

    if (!this.isUndefined(this.bindings[key])) {
        return this.bindings[key];
    }

    return this.bindings[key] = new Binding(typeName);
}

/**
 *
 * @returns {*}
 */
ContainerBuilder.prototype.getBindings = function () {
    return this.bindings;
}

/**
 *
 * @param typeName
 * @returns {boolean}
 */
ContainerBuilder.prototype.isScopedProxyRequired = function (typeName) {
    return this.arrayKeyExists(typeName.toLowerCase(), this.getProxyBindings());
}

/**
 *
 * @returns {undefined|*|Array}
 */
ContainerBuilder.prototype.getProxyBindings = function () {
    if (this.isNullOrUndefined(this.proxyTypes)) {
        this.proxyTypes = [];

        for (var binding in this.bindings) {
            scope = binding.getScope();

            if (this.isNullOrUndefined(scope)) {
                continue;
            }
            var TypeName = binding.getTypeName();
            this.proxyTypes[TypeName.toLowerCase()] = binding;
        }
    }

    return this.proxyTypes;
}

/**
 *
 * @returns {Container}
 */
ContainerBuilder.prototype.build = function () {
    return new Container(this.parameters, this.initializers.toArray(), this.bindings);
}