import express from 'express';

const app = express();

function middleware(req, res, next) {
  next();
}

app.use(middleware);

const SERVER_PORT = process.env.PORT || 8080;

app.get('/api/v1', (req, res) => {
    return res.send({
        error: false,
        message: 'Bienvenido a la api de alquiler de coches Tenerife',
        written_by: 'Joel Munuera Marrero/Manuel Alejandro Gamez Diaz',
        published_on: 'https://rentacartf.es'
    });
});

const server = app.listen(SERVER_PORT, () => {
  console.log(`Servidor arrancado en el puerto ${SERVER_PORT}`);
});

function runServer() {
    console.log('Iniciando servidor...');
  }
  
  function stopServer() {
    console.log('Deteniendo servidor...');
  }  

export { server, runServer, stopServer };
