const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes')
const { setupWebSocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://gustavorichard:gustavorichard@cluster0-pwxqg.mongodb.net/week10?retryWrites=true&w=majority',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);






// request é o que o frontend está passando pro meu backend
// métodos http GET (buscar alguma informação), POST (criar alguma informação), PUT (editar alguma informação), DELETE

// Tipos de parâmetros:
// Query Params: maioria das vezes utilizados nos GET / request.query (filtros, ordenação, paginação)
// Route Params: request.params (Identificar um recurso na alteração ou na remoção)
// Body: Geralmente usado no PUT/POST para passar informação para serem salvas. request.body

// MongoDB pouco relacionamentos