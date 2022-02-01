//consta configurações iniciais 
const app = require("./config");
//consta as rotas
const vagaRoute = require("./routes/vaga-route");
const userRoute = require("./routes/user-route");
const adminRoute = require("./routes/admin-route");
const { changeButton, requireAdmin, adminLogoutButton} = require("./middlewares/autenticacao");

app.use(changeButton, adminLogoutButton);
app.use('/user', userRoute);
app.use('/', vagaRoute, requireAdmin, adminRoute);



