import graphqlHTTP from "express-graphql";
import { schema } from "./data/schema.js";
import cors from "cors";

import express from "express";
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("GraphQL demo");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(8080, () => {
  console.log("Running server on port 8080...");
});
