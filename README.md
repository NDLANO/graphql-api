# NDLA GraphQL server

## Getting started

```bash
yarn install
yarn start
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
