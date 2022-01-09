//importa configurações iniciais 
import app from "./config.js"
//importa as rotas
import vagaRoute from "./routes/vaga-route.js";
import userRoute from "./routes/user-route.js"
import { changeButton } from "./middlewares/autenticacao.js";

app.use(changeButton);
app.use('/', vagaRoute);
app.use('/user', userRoute);


