"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
(0, app_1.startApolloServer)().then(app => {
    app.listen({ port: 8000 }, () => console.log(`🚀 Server ready at http://localhost:8000`));
});
