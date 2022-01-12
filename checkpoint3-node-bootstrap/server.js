//consta configurações iniciais 
const app = require("./config");
//consta as rotas
const vagaRoute = require("./routes/vaga-route");
const userRoute = require("./routes/user-route");
const adminRoute = require("./routes/admin-route");
const { changeButton } = require("./middlewares/autenticacao");

app.use(changeButton);
app.use('/', vagaRoute, adminRoute);
app.use('/user', userRoute);


