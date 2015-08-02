/**
 * Created by mushu_000 on 31.07.2015.
 */

Autoloader.include('classes/AbstractBaseClass.class.js');
/**
 *
 * @constructor
 */
function BindingInterface() {
    this.TYPE_IMPLEMENTATION = 1;
    this.TYPE_ALIAS = 2;
    this.TYPE_FACTORY = 4;
    this.TYPE_FACTORY_ALIAS = 8;
    this.MASK_TYPE = 16;
}

BindingInterface.prototype = Object.create(AbstractBaseClass.prototype);
BindingInterface.prototype.constructor = BindingInterface;

BindingInterface.prototype.toString = function () {
    throw new OutOfBoundsException('not implemented');
}
BindingInterface.prototype.getTypeName = function () {
    throw new OutOfBoundsException('not implemented');
}
BindingInterface.prototype.getScope = function () {
    throw new OutOfBoundsException('not implemented');
}
BindingInterface.prototype.getOptions = function () {
    throw new OutOfBoundsException('not implemented');
}
