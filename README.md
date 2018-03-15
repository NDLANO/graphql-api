```bash
yarn install
yarn start
```

Open [http://localhost:4000/graphiql](http://localhost:4000/graphiql)

Paste this on the left side

```graphql
query {
  books {
    title
    author
  }
}
```
