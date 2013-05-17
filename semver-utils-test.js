(function () {
  var semverutils = require('./semver-utils')
    ;

  function testParseRange() {
    console.info('testParseRange');
    var good =
        [ 'v1.0.0'
        , '< v2.0.0'
        , '~v2.0.0'
        , '~1.0.0'
        , '~1.0.0 || >= 1.1.7 < 2.0.0+build.1848'
        , '~1.0.0 || >= 1.1.7 < 2.0.0+build.1848 || v1.1.3'
        , '~1.0.0 || >= 1.1.7 < 2.0.0+build.1848 || v1.1.3 || 2.0.1-alpha.1227'
        , '~1.0.0 || >= 1.1.7 < 2.0.0+build.1848 || v1.1.3 || 2.0.1-alpha.1227 || 1.0.0 - 1.0.x'
        , '~1.0.0 || >= 1.1.7 < 2.0.0+build.1848 || v1.1.3 || 2.0.1-alpha.1227 || 1.0.0 - 1.0.x || 1.*'
        ]
      ;

    good.every(function (range) {
      var result = semverutils.parseRange(range)
        ;
   
      if (!result || 0 === result.length) {
        throw new Error("didn't parse something that should be parseable: " + range);
      }
   
      return true;
    });

    console.log(good[good.length - 1]);
    console.log(semverutils.stringifyRange(semverutils.parseRange(good[good.length - 1])));
  }

  function testParse() {
    console.info('testParse');
    var good
      , bad
      ;
   
    good = [
        "1.0.8"
      , "1.23.7"
      , "2.0.0-alpha.123.abc"
      , "2.0.0-alpha.123.abc+build.acebfde1284"
      , "1.0.0-alpha"
      , "1.0.0-alpha.1"
      , "1.0.0-0.3.7"
      , "1.0.0-x.7.z.92"
      , "1.0.0-alpha"
      , "1.0.0-alpha.1"
      , "1.0.0-beta.2"
      , "1.0.0-beta.11"
      , "1.0.0-rc.1"
      , "1.0.0-rc.1+build.1"
      , "1.0.0-rc.1+build.1-b"
      , "1.0.0"
      , "1.0.0+0.3.7"
      , "1.3.7+build"
      , "1.3.7+build.2.b8f12d7"
      , "1.3.7+build.11.e0f985a"
      , "1.3.7+build.11.e0f9-85a"
      , "1.0.0+build-acbe"
      , "2.0.0+build.acebfde1284-alpha.123.abc"
    ];
   
    bad = [
      //  "v1.0.0" now allows optional 'v'
      , "a.b.c"
      , "1"
      , "1.0.0b"
      , "1.0"
      , "1.0.0+b[\\]^_`uild" // [,\,],^,_,` are between A-z, but not A-Za-z
      , "1.0.0+build-acbe." // trailing period
      , "1.0.0+build.!@#$%"
    ];
   
    good.every(function (version) {
      var result = semverutils.parse(version)
        ;
   
      if (!result) {
        throw new Error("didn't parse something that should be parseable: " + version);
      }
   
      return true;
    });
   
    bad.every(function (version) {
      var result = semverutils.parse(version)
        ;
   
      if (result) {
        throw new Error("parsed something that should not be parseable: " + version);
      }
   
      return true;
    });
   
    console.log(semverutils.parse("a.b.c")); // null
    console.log(semverutils.parse("1.0.3"));
    /*
    {
        semver: 1.0.3
      , major: 1
      , minor: 0
      , patch: 3
    }
    */
   
    console.log(semverutils.parse("1.0.3-rc.1+build.aef312"));
    /*
    {
        semver: v1.0.3-rc.1+build.aef312
      , major: 1
      , minor: 0
      , patch: 3
      , build: build.aef312
      , release: rc.1
    }
    */
   
    console.log(semverutils.parse("1.0.0-rc.1-1"));
    console.log(semverutils.parse("1.0.0-rc.1+build.1-b"));
    console.log(semverutils.parse("1.0.0-rc.1-1+build.1-b"));
    console.log(semverutils.parse("2.0.0+build.acebfde1284-alpha.123.abc"));
  }

  testParse();
  testParseRange(); 
}());
