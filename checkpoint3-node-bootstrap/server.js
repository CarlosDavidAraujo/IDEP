<<<<<<< HEAD
//consta configurações iniciais 
const app = require("./config");
//consta as rotas
const vagaRoute = require("./routes/vaga-route");
const userRoute = require("./routes/user-route");
const adminRoute = require("./routes/admin-route");
const { changeButton } = require("./middlewares/autenticacao");

app.use(changeButton);
app.use('/', vagaRoute, adminRoute);
=======
//importa configurações iniciais 
import app from "./config.js"
//importa as rotas
import vagaRoute from "./routes/vaga-route.js";
import userRoute from "./routes/user-route.js"
import { changeButton } from "./middlewares/autenticacao.js";

app.use(changeButton);
app.use('/', vagaRoute);
>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e
app.use('/user', userRoute);


