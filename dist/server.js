"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./graphql/schemas/schema");
const resolvers_1 = require("./graphql/resolvers/resolvers");
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const bookRoute_1 = __importDefault(require("./modules/books/routes/bookRoute"));
const teachersRoutes_1 = __importDefault(require("./modules/teachers/routes/teachersRoutes"));
const authRoute_1 = __importDefault(require("./modules/auth/routes/authRoute"));
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
// Initialization of express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
// Connect DB
(0, db_1.default)();
app.get('/api/v1/', (req, res) => {
    res.send('Library Management System is running!');
});
// Book API
app.use('/api/v1/books', bookRoute_1.default);
app.use('/api/v1/auth', authRoute_1.default);
app.use('/api/v1/teachers', teachersRoutes_1.default);
// Apollo Server (GraphQL)
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: ({ req }) => ({ req }) // Optional: for future auth
});
app.use(errorHandler_1.errorHandler);
// Start Server
const PORT = process.env.PORT || 4000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        server.applyMiddleware({ app: app }); // Type assertion to resolve compatibility issue
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`REST API: http://localhost:${PORT}/api/books`);
            console.log(`GraphQL: http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}
startServer();
