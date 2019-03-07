# cytoscape-effective-area

## Description

Invoke fit/center with an effective area without changing the canvas size. ([demo](https://lambdalisue.github.io/cytoscape-effective-area))

## Dependencies

 * Cytoscape.js ^3.2.0


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-effective-area`,
 * via unpkg: `https://unpkg.com/cytoscape-effective-area/dist/index.js`

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import effectiveArea from 'cytoscape-effective-area';

cytoscape.use( effectiveArea );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let effectiveArea = require('cytoscape-effective-area');

cytoscape.use( effectiveArea ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-effective-area'], function( cytoscape, effectiveArea ){
  effectiveArea( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.


## API

```js
const ea = cy.effectiveArea(() => {
  return {
    x: 100,
    y: 200,
    width: 400,
    height: 500,
  };
});

// Change effective area getter function
ea.enable(() => {
  return {
    x: 500,
    y: 100,
    width: 100,
    height: 50,
  };
})

// Disable
ea.disable()

// Re-enable
ea.enable(() => {
  return {
    x: 100,
    y: 200,
    width: 400,
    height: 500,
  };
})
```

## Build targets

* `npm run build` : Build `./src/**` into `dist/index.js`
* `npm run lint` : Run eslint on the source

## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build`
1. Commit the build : `git commit -am "Build for release"`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Push to origin: `git push && git push --tags`
1. Publish to npm: `npm publish .`
