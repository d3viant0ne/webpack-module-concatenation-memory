17gb peak when lazy
25+ gb peak when not lazy (busted my memory limit)

# Webpack ModuleConcatenationPlugin memory usage

This repo shows how memory usage increases relative to number of modules in a single bundle when
when using `ModuleConcatenationPlugin`.

The app in `src`, after transpilation using `ngc`, contains 4216 `.js` files.
These files import other app files and also a few libraries.
The total number of webpack modules is 4339.

To build the app run these commands:
```
npm install
npm run ngc
npm run webpack
```

This will result in peak memory usage of about 17GB.

Commenting out `new webpack.optimize.ModuleConcatenationPlugin(),` in `webpack.config.js` results in
peak 1.8GB memory usage.

Note: `npm run ngc` is necessary because it also generates some files in `node_modules/` that are
imported by the app.

## Lazy loaded chunks

The app has a 12 lazy loaded chunks by default. 
These can be imported into the main chunk by editing `src/app/app-routing.module.js` (after `npm run ngc`),
commenting out the `System.import:` calls:

```
// Lazy loaded chunks.
System.import('./cg/cg.module.ngfactory.js');
System.import('./mod1/mod1.module.ngfactory.js');
// ...
```

And uncommenting the plain `import` statements:

```
// Load them into the main chunk instead.
import './cg/cg.module.ngfactory.js';
import './mod1/mod1.module.ngfactory.js';
// ...
```

Removing the lazy chunks results in using at least 25GB peak memory (all the available on my system).