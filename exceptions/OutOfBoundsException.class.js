/**
 * Created by pgorbachev on 31.07.15.
 */

function OutOfBoundsException(message) {
    this.message = message;
}
OutOfBoundsException.prototype = Object.create(Error.prototype);