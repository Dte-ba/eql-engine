/*!
 * EQL Engine
 *
 * Copyright(c) 2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)
 * GPL Plublic License v3
 */

(function() {
  
  var root = this;

  var eql = {}

  // Export the EQL object for Node.js
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = eql;
    }
    exports.eql = eql;
  } else {
    root.eql = eql;
  }

  // AMD registration
  if (typeof define === 'function' && define.amd) {
    define('eql-engine', [], function() {
      return eql;
    });
  }

}).call(this);