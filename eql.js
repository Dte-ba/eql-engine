/*!
 * EQL Engine
 *
 * Copyright(c) 2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)
 * GPL Plublic License v3
 */

(function() {
  
  var root = this;

  var eql = {
    version: "0.0.4"
  };

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

  var cmds = [ "select" ];

  // parse query
  eql.parse = function(query) {
    
    if (typeof query !== "string") {
      throw new Error("The query must be an string");
    }

    var res = {};

    // parse the command
    var cmdpatt = new RegExp("^\\s*(" + cmds.join('|') + ")", "ig");
    
    var cmdm = cmdpatt.exec(query);

    if (cmdm == null) { return res; }

    res.command = cmdm[0];
    // parse the args
    var q = query.substring(res.command.length);
    
    res.filters = __filters(q);
    
    return res;
  };

  // AMD registration
  if (typeof define === 'function' && define.amd) {
    define('eql-engine', [], function() {
      return eql;
    });
  }

  return eql;

  //
  // private functions
  function __filters(query) {
    var res = [];
    var keypatt = /[a-zA-Z]+\:/ig;
    var keymatches = __getMatches(keypatt, query);

    for (var i = 0; i < keymatches.length; i++) {
      var m = keymatches[i];
      var key = m[0].substring(0, m[0].length-1);

      var obj = { key: key};

      var rest = query.substring(m.index);

      // has next match
      var value;
      if ((i+1) < keymatches.length) {
        var nm = keymatches[i+1];
        value = nm.input.substring(0, nm.index);
      } else {
        value = rest;
      }

      // set cleaned value
      obj.value = value.replace(/(\s*[a-zA-Z]+\:|\s+$)/g, '');
      
      res.push(obj);
    };

    return res;
  }

  function __getMatches(patt, str) {
    var res = [];

    while(match = patt.exec(str)) {
      res.push(match);
    }

    return res;
  }

}).call(this);