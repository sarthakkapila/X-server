import { startApolloServer } from "./app";

startApolloServer().then(app => {
  app.listen({ port: 8000 }, () =>
    console.log(`🚀 Server ready at http://localhost:8000`)
  );
});