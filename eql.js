/*!
 * EQL Engine
 *
 * Copyright(c) 2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)
 * GPL Plublic License v3
 */

(function() {
  
  var root = this;

  var eql = {
    version: "0.0.5"
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
    
    res.where = _where(q);
    
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
  function _where(query) {
    //var res = [];
    var blockpatt = /(\&\&|\|\|)/ig;
    var blocks = query.split(blockpatt);
  
    var where = {};
    var b;
    var pred = where;

    while(b = blocks.shift()){
      
      if (b === '||' || b === '&&') {
        if (b === '&&'){
          pred = pred.and = {}
        } else {
          pred = pred.or = {}
        }
      } else {
        pred.predicate = _predicate(b);
      }
    }

    //console.log(where);
    return where;
  }

  function _predicate(query) {
    var res = {};

    var patt = /([\wáàãâäéèêëíìîïóòõôöúùûüñ]+)(!\:|\:|%)([\-,\.\s\wáàãâäéèêëíìîïóòõôöúùûüñ]+)/ig;

    var matches = __getMatches(patt, query);

    var m = matches[0];

    var key = m[1];
    var operator = m[2];
    var value = m[3];

    return { 
      key: key,
      operator: _operatorType(operator),
      value: value.trim()
    };

  }

  function __getMatches(patt, str) {
    var res = [];

    while(match = patt.exec(str)) {
      res.push(match);
    }

    return res;
  }

  function _operatorType(operator){
    switch( operator ){
      case '!:': return '!='
      case '%': return 'contains'
      case ':':
      default: return '='
    }
  }

}).call(this);