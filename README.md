# NDLA GraphQL server

## Getting started
```bash
yarn install
yarn start
```

Open [http://localhost:4000/graphiql](http://localhost:4000/graphiql)

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
