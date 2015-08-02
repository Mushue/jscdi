/**
 * Created by mushu_000 on 01.08.2015.
 */

function ContextParamNotFoundException(message) {
    this.message = message;
}

ContextParamNotFoundException.prototype = Object.create(Error.prototype);