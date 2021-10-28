# CRACO Change Public Directory Plugin

This plugin allows you to change the `public` directory path on your create-react-app project.

It replaces the following CRA configuration settings with your new path:

- `paths.appPublic`
- `paths.appHtml`

It also does a shallow search and replace on `webpackConfig.plugins[*].options` for strings that match the old public path.

## Usage Example

Install CRACO following the instructions on their documentation: <https://www.npmjs.com/package/@craco/craco#installation>

Install the plugin using:

```bash
npm install -D craco-change-public-directory
```

Create a `craco.config.js` containing at the least the following:

```js
const path = require('path');
const changePublicDirectory = require('craco-change-public-directory');

const newPublicPath = path.resolve('your-new-public-directory');

module.exports = {
  plugins: [
    {
      plugin: changePublicDirectory,
      options: {
        newPath: newPublicPath,
      },
    },
  ],
};
```
