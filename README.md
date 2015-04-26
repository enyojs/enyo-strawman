## QA/Samples Repository

This application is intended to be used for testing purposes. It contains samples related to the various [EnyoJS](http://enyojs.com) [libraries](https://github.com/enyojs). Please follow the directions below to build and run the tests.

This application expects that you have the [enyo-dev](https://github.com/enyojs/enyo-dev) module installed.

> At this time, it is not released as an npm package thus you must clone it locally on the system, execute `npm install -g` for the eqivalent.

Ensure all of the dependent libraries are installed by executing `egen init`. The `egen` executable is an alias to `enyo-gen` from the [enyo-dev](https://github.com/enyojs/enyo-dev) module. By default, this will install all of the required dependencies from their respective git repositories (will be slow on most connections, so be patient). If you already have a local copy of all of the libraries it will be faster with the `egen init --link-all-libs` flag.

**Note: `--link-all-libs` can only be used if you have also executed `bower link` from within each of those repositories. You can also only link specific libraries if you do not have them all: `egen init --link-libs=enyo,moonstone`.**

Once the dependent libraries are installed, the application can be built by simply executing `epack` from the project root. Unless otherwise specified, it will produce the packaged output in `./dist`. You can serve this directly from a web server or copy it to a root. Or, instead of using `epack` you can execute `eserve` which will build and automatically serve the output for you (default port is 8000). The `epack` and `eserve` executables are aliases to `enyo-pack` and `enyo-serve`, respectively, that come from the [enyo-dev](https://github.com/enyojs/enyo-dev) module.

## Copyright and License Information

Unless otherwise specified, all content, including all source code files and
documentation files in this repository are:

Copyright (c) 2012-2014 LG Electronics

Unless otherwise specified or set forth in the NOTICE file, all content,
including all source code files and documentation files in this repository are:
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this content except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.