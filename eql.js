/*!
 * EQL Engine
 *
 * Copyright(c) 2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)
 * GPL Plublic License v3
 */

(function() {
  
  var root = this;

  var eql = {
    version: "0.0.2"
  }

  // Export the EQL object for Node.js
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = eql;
    }
    exports.eql = eql;
    eql.version = require("./package.json").version
  } else {
    root.eql = eql;
  }

  // parse query
  eql.parse = function(query) {
    var res = {};

    return res;
  };

  // AMD registration
  if (typeof define === 'function' && define.amd) {
    define('eql-engine', [], function() {
      return eql;
    });
  }

}).call(this);