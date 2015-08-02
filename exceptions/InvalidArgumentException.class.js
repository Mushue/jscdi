/**
 * Created by pgorbachev on 31.07.15.
 */

function InvalidArgumentException(message) {
    this.message = message;
}
InvalidArgumentException.prototype = Object.create(Error.prototype);