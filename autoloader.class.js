/**
 * Created by pgorbachev on 31.07.15.
 */

/**
 * Autoloader
 * @type {{assets: {}, include: Function, _script_loaded: Function}}
 */
var Autoloader = {
    assets: {},
    include: function (asset_name, callback) {
        if (typeof callback != 'function')
            callback = function () {
                return false;
            };

        if (typeof this.assets[asset_name] != 'undefined')
            return callback();


        var html_doc = document.getElementsByTagName('head')[0];
        var st = document.createElement('script');
        st.setAttribute('language', 'javascript');
        st.setAttribute('type', 'text/javascript');
        st.setAttribute('src', asset_name);
        st.onload = function () {
            Autoloader._script_loaded(asset_name, callback);
        };
        html_doc.appendChild(st);
    },
    _script_loaded: function (asset_name, callback) {
        this.assets[asset_name] = true;
        callback();
    }
};

if (!Object.create) {

    Object.create = function (proto) {
        function F() {
        }

        F.prototype = proto;
        return new F;
    };

}
