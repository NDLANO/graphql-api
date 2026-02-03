# NDLA GraphQL server

## Requirements

- Node.JS 20.13
- yarn v4
- Docker (optional)

## Getting started

What's in the box?

- Apollo
- Express
- GraphQL

### Dependencies

All dependencies are defined in `package.json` and are managed with npm/yarn. To
initially install all dependencies and when the list dependency has changed,
run `yarn install`.

```
$ yarn install
```

### Start development server

Start apollo server with hot reloading middleware listening on port 4000.

```
$ yarn start
```

Open [http://localhost:4000/graphql-api/graphql](http://localhost:4000/graphql-api/graphql)

Paste this on the left side

```graphql
{
  subject(id: "urn:subject:1") {
    name
    topics {
      name
      meta {
        metaDescription
      }
      subtopics {
        name
      }
    }
  }
}
```

### Unit tests

Test framework: Vitest.

```
$ yarn test
```

### Code style

_tl;dr_: Use oxfmt and eslint!

Format code with oxfmt to get uniform codestyle:

```
$ yarn format
```

Lint code with [eslint](http://eslint.org/) using `yarn`:

```
$ yarn lint
```

Rules are configured in [.eslintrc.js](./.eslintrc.js)
