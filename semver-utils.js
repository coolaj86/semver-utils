(function () {
  "use strict";

  var reSemver = /^((\d+)\.(\d+)\.(\d+))(?:-([\dA-Za-z\-]+(?:\.[\dA-Za-z\-]+)*))?(?:\+([\dA-Za-z\-]+(?:\.[\dA-Za-z\-]+)*))?$/
    , reSemverRange = /\s*((\|\||\-)|(([<>~]?=?)\s*(v)?([0-9]+)(\.(x|[0-9]+))?(\.(x|[0-9]+))?(([\-+])([a-zA-Z0-9\.]+))?))\s*/g
    ;

  function parseSemver(version) {
    // semver, major, minor, patch
    // https://github.com/mojombo/semver/issues/32
    // https://github.com/isaacs/node-semver/issues/10
    // optional v
    var m = reSemver.exec(version) || []
      , ver = {
            semver: m[0]
          , version: m[1]
          , major: m[2]
          , minor: m[3]
          , patch: m[4]
          , release: m[5]
          , build: m[6]
        }
      ;
 
    if (0 === m.length) {
      ver = null;
    }
 
    return ver;
  }

  function stringifySemver(obj) {
    var str = '';
    str += obj.major || '0';
    str += '.';
    str += obj.minor || '0';
    str += '.';
    str += obj.patch || '0';
    if (obj.release) {
      str += '-' + obj.release;
    }
    if (obj.build) {
      str += '+' + obj.build;
    }
  }

  function parseSemverRange(str) {
    var m
      , arr = []
      , obj
      ;
 
    function prune(key) {
      if ('undefined' === typeof obj[key]) {
        delete obj[key];
      }
    }
 
    while (true) {
      m = reSemverRange.exec(str);
      if (!m) {
        break;
      }
      obj = {
          semver: m[3]
        , operator: m[4] || m[2]
        , major: m[6]
        , minor: m[8]
        , patch: m[10]
      };
      if ('+' === m[12]) {
        obj.build = m[13];
      }
      if ('-' === m[12]) {
        obj.release = m[13];
      }
      Object.keys(obj).forEach(prune);
      arr.push(obj);
      //console.log(m);
    }
 
    return arr;
  }

  module.exports.parse = parseSemver;
  module.exports.stringify = stringifySemver;
  module.exports.parseRange = parseSemverRange;
}());
