// Pi-Robot Web interface.
// Logger service module
//
// Author Denis Kudia
// Date: 28 Feb 2020
//
var _ = require('underscore')

function Logger(level){
    if (_.isString(level))
        this.level = level;
    else
        this.level = "debug";
};

Logger.prototype.llog = function llog(msg) {
    console.log(msg);
}

var log_levels = {
    "debug" : "DEBUG",
    "info"  : "INFO ",
    "nesessary" : "NECSR",
    "warning" : "WARN",
    "error" : "ERROR"
};

module.exports.Logger = Logger;