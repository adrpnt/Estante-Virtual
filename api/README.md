# Bookcase API

> API developed with [AdonisJS](https://adonisjs.com/).
> Documentation created with [API Blueprint](https://apiblueprint.org/) and [Aglio](https://github.com/danielgtaylor/aglio).

### How to use

Install the dependencies and start the server:

```
yarn
adonis serve --dev
```

### Generate/View the documentation

Aglio is an API Blueprint renderer with theme support that outputs static HTML.
To generate the documentation:

```
aglio -i server.apib -o api.html
```

Or to view the documentation running in a live preview server on http://localhost:3000/:

```
aglio -i server.apib -s
```
