Daplie is Taking Back the Internet!
--------------

[![](https://daplie.github.com/igg/images/ad-developer-rpi-white-890x275.jpg?v2)](https://daplie.com/preorder/)

Stop serving the empire and join the rebel alliance!

* [Invest in Daplie on Wefunder](https://daplie.com/invest/)
* [Pre-order Cloud](https://daplie.com/preorder/), The World's First Home Server for Everyone

## semver-utils

Some utils that aren't provided by the mainstream `semver` module.

### Usage

```bash
npm install --save semver-utils
```

```javascript
'use strict';

var semverUtils = require('semver-utils')
  , version = require('./package.json').version
  , semver = semverUtils.parse(version)
  ;
  
console.log(semver);
```

## API

  * `semverUtils.parse(semverString)`
  * `semverUtils.stringify(semverObject)`
  * `semverUtils.parseRange(rangeString)`
  * `semverUtils.stringifyRange(rangeArray)`

### semverUtils.parse(semverString)

Turns a string such as `1.0.6-1+build-623` into the object

    {
      semver:   '1.0.6-1+build-623'
    , version:  '1.0.6'
    , major:    '1'
    , minor:    '0'
    , patch:    '6'
    , release:  '1'
    , build:    'build-623'
    }

returns `null` on **error**

### semverUtils.stringify(semverObject)

Creates a string such as `1.0.6-1+build-623` from the object

    {
      major:    '1'
    , minor:    '0'
    , patch:    '6'
    , release:  '1'
    , build:    'build-623'
    }

### semverUtils.parseRange(rangeString)

A solution to <https://github.com/isaacs/node-semver/issues/10>

Parses a range string into an array of semver objects

`>= 1.1.7 < 2.0.0 || 1.1.3` becomes

    [
        {
            "semver": ">= v1.1.7"
          , "operator": ">="
          , "major": 1
          , "minor": 1
          , "patch": 7
        }
      , {
            "semver": "< v2.0.0"
          , "operator": "<"
          , "major": 2
          , "minor": 0
          , "patch": 0
        }
      , {
            "operator": "||"
        }
      , {
            "semver": "v1.1.3"
          , "operator": "="
          , "major": 1
          , "minor": 1
          , "patch": 3
        }

    ]

### semverUtils.stringifyRange(rangeArray)

Creates a range string such as `>= 1.1.7 < 2.0.0 || 1.1.3`
from an array of semver objects (and operators) such as

    [
        {
            "semver": ">= v1.1.7"
          , "operator": ">="
          , "major": 1
          , "minor": 1
          , "patch": 7
        }
      , {
            "semver": "< v2.0.0"
          , "operator": "<"
          , "major": 2
          , "minor": 0
          , "patch": 0
        }
      , {
            "operator": "||"
        }
      , {
            "semver": "v1.1.3"
          , "operator": "="
          , "major": 1
          , "minor": 1
          , "patch": 3
        }

    ]

## Obsolete Work

  * https://github.com/mojombo/semver/issues/32
  * https://gist.github.com/coolaj86/3012865
  * https://github.com/isaacs/node-semver/issues/10
  * https://github.com/mojombo/semver.org/issues/59
