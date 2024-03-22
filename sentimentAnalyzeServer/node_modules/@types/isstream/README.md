# Installation
> `npm install --save @types/isstream`

# Summary
This package contains type definitions for isstream (https://github.com/rvagg/isstream).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/isstream.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/isstream/index.d.ts)
````ts
declare function isStream(obj: any): boolean;
declare namespace isStream {
    function isReadable(obj: any): boolean;
    function isWritable(obj: any): boolean;
    function isDuplex(obj: any): boolean;
}

export = isStream;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 03:09:37 GMT
 * Dependencies: none

# Credits
These definitions were written by [Matthew Peveler](https://github.com/MasterOdin).
