## QA/Samples Repository

This application is intended to be used for testing purposes. It contains samples related to the
various [EnyoJS](http://enyojs.com) [libraries](https://github.com/enyojs). Please follow the
directions below to build and run the tests.

### Build

#### enyo-dev Tooling

This application requires the [enyo-dev](https://github.com/enyojs/enyo-dev) tools installed in
order to build and run. Once installed, the `enyo` command will be available to initialize and build
Enyo projects.

* [Installation](https://github.com/enyojs/enyo-dev#setup-install)
* [Configuration](https://github.com/enyojs/enyo-dev#environment-configuration)
* [Usage](https://github.com/enyojs/enyo-dev#commands)

#### Initialization

Before enyo-strawman can be built, all of the dependent libraries must be installed either by
cloning or linking them into the project. The simplest way is running `npm run bundle init`. 
Alternatively, running `gulp init` or `enyo init` will also clone each required library from
git at the specified branch or tag into the `lib` folder.

If you have multiple Enyo projects and want to share copies of the libraries, you can `enyo link`
them into strawman. More details available in the
[enyo-dev documentation](https://github.com/enyojs/enyo-dev#commands-link).

#### Bundling

While a normal Enyo application can be built using `enyo pack`, enyo-strawman has a more complex
build process using `gulp` to enable more custom builds for engineering and QA teams.

If you have `gulp` installed globally, you can run `gulp` in the root directory to initiate a build.
If not, you can start a build using the `bundle` npm task.

```bash
# run a normal build using gulp
gulp
# run a normal build using npm
npm run bundle

# run a custom build (only enyo and onyx samples) using gulp
gulp -s enyo,onyx
# run a custom build (only enyo and onyx samples) using npm
npm run bundle -- -s enyo,onyx
```

Once built, the application can be launched from `./dist/index.html` using your browser of choice.

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
