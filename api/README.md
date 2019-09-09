# Bookcase API

> API developed with [AdonisJS](https://adonisjs.com/).
> Documentation created with [API Blueprint](https://apiblueprint.org/) and [Aglio](https://github.com/danielgtaylor/aglio).

## Getting Started

```bash
# install dependencies
yarn
```

Copy .env.example and rename to .env

```bash
# run migrations
adonis migration:run

# start the dev server
adonis serve --dev
```

## Testing the API

```bash
# run command
adonis test
```

## Generating/Viewing the documentation

Aglio is an API Blueprint renderer with theme support that outputs static HTML.

To generate the documentation:

```
aglio -i server.apib -o api.html
```

Or to view the documentation running in a live preview server on http://localhost:3000/:

```
aglio -i server.apib -s
```

_NOTE: insomnia schema is provided (see insomnia_schema.json file)_
