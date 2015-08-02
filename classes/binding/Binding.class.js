/**
 * Created by mushu_000 on 31.07.2015.
 */

function Binding(typeName) {

    this.to = undefined;
    this.markers = undefined;
    this.resolvers = undefined;
    this.initializers = undefined;
    this.decorators = [];

    this.typeName = typeName;
    this.options = this.TYPE_IMPLEMENTATION;

}

Binding.prototype = Object.create(BindingAbstract.prototype);
Binding.prototype.constructor = Binding;

/**
 *
 * @returns {string}
 */
Binding.prototype.getTarget = function () {
    if (this.isNull(this.to) && this.options | this.TYPE_IMPLEMENTATION) {
        return this.typeName;
    }

    return this.to;
}

/**
 *
 * @param marker
 * @returns {*}
 */
Binding.prototype.getMarkers = function (marker) {
    marker = !this.isUndefined(marker) ? marker : null;
    if (!this.isNullOrUndefined(marker) && !this.isNullOrUndefined(this.markers)) {
        var result = [];

        for (var check in this.markers) {
            if (check instanceof marker) {
                result.push(check);
            }
        }

        return result;
    }

    return this.markers;
}

/**
 *
 * @param target
 * @param methodName
 * @returns {*}
 */
Binding.prototype.setTo = function (target, methodName) {
    methodName
    !this.isUndefined(methodName) ? methodName : null;

    if (this.isString(target)) {
        if (this.isNull(methodName)) {
            this.options = (this.options | this.MASK_TYPE) ^ this.MASK_TYPE | this.TYPE_IMPLEMENTATION;
            this.to = (target === this.typeName) ? null : target;
        }
        else {
            this.options = (this.options | this.MASK_TYPE) ^ this.MASK_TYPE | this.TYPE_FACTORY_ALIAS;
            this.to = [target, methodName];
        }
    }
    else if (this.isFunction(target)) {
        if (this.isNull(methodName)) {
            throw new InvalidArgumentException('Must not specify a method name when binding a factory closure');
        }

        this.options = (this.options | this.MASK_TYPE) ^ this.MASK_TYPE | this.TYPE_FACTORY;
        this.to = target;
    }
    else {
        var input = this.isObject(target) ? Object.getPrototypeOf(target) : '"' + (typeof target) + '"';

        throw new InvalidArgumentException('Expecting string or callback, given "' + input + '"');
    }

    return this;
}

/**
 *
 * @param typeName
 * @returns {Binding}
 */
Binding.prototype.toAlias = function (typeName) {
    this.options = this.TYPE_ALIAS;
    this.to = typeName;

    return this;
}

/**
 *
 * @param scope
 * @returns {Binding}
 */
Binding.prototype.scoped = function (scope) {
    if (!(scope instanceof Marker)) {
        var input = this.isObject(scope) ? Object.getPrototypeOf(scope) : '"' + (typeof scope) + '"';
        throw new InvalidArgumentException('Expecting Marker class, given "' + input + '"');
        return;
    }
    if (scope instanceof Dependent) {
        this.scope = null;
    }
    else {
        this.scope = Object.getPrototypeOf(scope);
    }

    return this;
}

/**
 *
 * @param marker
 * @returns {Binding}
 */
Binding.prototype.marked = function (marker) {
    this.markers.push(marker);
    return this;
}

/**
 *
 * @param marker
 * @returns {boolean}
 */
Binding.prototype.isMarked = function (marker) {

    if (this.isEmpty(this.markers)) {
        return false;
    }

    if (marker instanceof Marker) {
        for (var check in this.markers) {
            if (marker.isInstance(check)) {
                return true;
            }
        }
    }
    else {
        for (var check in this.markers) {
            if (check instanceof marker) {
                return true;
            }
        }
    }

    return false;
}

/**
 *
 * @param marker
 * @returns {marker}
 */
Binding.prototype.getMarker = function (marker) {
    if (!this.isNull(this.markers)) {
        for (var check in this.markers) {
            {
                if (check instanceof marker) {
                    return check;
                }
            }
        }
    }
    throw new OutOfBoundsException('Binding ' + this.typeName + ' is not marked with ' + marker);
}

/**
 *
 * @param name
 * @param resolver
 * @returns {Binding}
 */
Binding.prototype.resolve = function (name, resolver) {
    this.resolvers[name] = resolver;

    return this;
}

/**
 *
 * @returns {*}
 */
Binding.prototype.getResolvers = function () {
    return this.resolvers;
}

/**
 *
 * @param initializer
 * @returns {Binding}
 */
Binding.prototype.initialize = function (initializer) {
    if (!this.isFunction(initializer)) {
        throw new InvalidArgumentException('Expecting function argument');
        return;
    }
    this.initializers.push(initializer);

    return this;
}

/**
 *
 * @param decorator
 * @param priority
 * @returns {Binding}
 */
Binding.prototype.decorate = function (decorator, priority) {
    priority = !this.isUndefined(priority) ? priority : 0;
    if (!this.isFunction(decorator)) {
        throw new InvalidArgumentException('Expecting function argument');
        return;
    }
    this.decorators.insert(decorator, priority);

    return this;
}

/**
 *
 * @returns {*}
 */
Binding.prototype.getInitializers = function () {
    initializers = this.initializers;

    for (var decorator in this.decorators) {
        initializers.push(decorator);
    }

    return initializers;
}