/**
 * Created by mushu_000 on 02.08.2015.
 */

function ScopedProxyGenerator() {
}

ScopedProxyGenerator.prototype = Object.create(AbstractBaseClass.prototype);
ScopedProxyGenerator.prototype.constructor = ScopedProxyGenerator;

ScopedProxyGenerator.prototype.generateProxyCode = function (reflection) {
    if (!this.isObject(reflection)) {
        throw new InvalidArgumentException('Expecting reflection class');
    }

    var methods = this.collectProxyMethods(reflection);
    var scopeClass = reflection.getShortName() + '__scoped';
    var code = '';

    code = code + 'function ' + scopeClass + '(binding, scope, target){ this.binding = binding; this.scope = scope; this.target = target; }' + "\n";
    if (reflection.isInterface()) {
        code = code + scopeClass + '.prototype = Object.create(' + reflection.getImplementation() + '.prototype);' + "\n";
        code = code + scopeClass + '.prototype.constructor = ' + reflection.getShortName() + ';' + "\n";
    }
    var self = this;
    for (var m in methods) {
        var args = reflection.getArgumentsBy(methods[m]);
        if (args != "") {
            code = code + scopeClass + '.prototype.' + m + ' = function(' + args + ') { ' + "\n";
            code = code + "\t" + 'if(this.target[this].offsetExists(this)) {' + "\n";
            code = code + "\t\t" + 'this.scope.activateInstance(this);' + "\n";
            code = code + "\t\t" + 'return this.target[this].' + m + '.apply(this,arguments);' + "\n";
            code = code + "\t" + "}" + "\n";
            code = code + "}" + "\n";
        }
    }
    return code;
}

/**
 *
 * @param reflection
 * @returns {Array}
 */
ScopedProxyGenerator.prototype.collectProxyMethods = function (reflection) {
    if (!this.isObject(reflection)) {
        throw new InvalidArgumentException('Expecting reflection class');
    }
    return reflection.getMethods();
}

/**
 *
 * @param reflection
 * @returns {Array}
 */
ScopedProxyGenerator.prototype.collectRemovedFieldNames = function (reflection) {
    if (!this.isObject(reflection)) {
        throw new InvalidArgumentException('Expecting reflection class');
    }

    return reflection.getProperties();
}
