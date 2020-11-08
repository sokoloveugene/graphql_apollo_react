const express = require("express");
const schema = require("../server/schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { graphqlHTTP } = require("express-graphql");

const PORT = 3005;

mongoose.connect(
  "mongodb+srv://dcimua:pass123@test.8ssg2.mongodb.net/tested?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

// using this line we allow backend to give data to front
// warn use cors before root query to graphql. Order is important
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// in case we dont have this server will not response,
// because front on port 3000 and backend on 3005

const dbConnection = mongoose.connection;

dbConnection.on("error", (err) => console.warn(`Connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to db"));

app.listen(PORT, (err) => {
  err ? console.warn(err) : console.log(`Server started on port ${PORT}`);
});
