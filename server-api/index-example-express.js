import express from "express";

const app = express();
const port = 8800;

// A method of middleware
/* Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.*/ 
// app.use(express.json());

// *** Application-level middleware
/* 
    bind (vincule) o Application-level middleware (middleware de nível de middleware) para uma instancia do object App usando app.use() e app.METHOD(), onde WHERE é o método HTTP da solicitação que a função middleware trata (como GET, PUT e POST) em letras minúsculas.
*/
// This ex. mostra uma function middleware sem caminho. Ou seja, a função é executada toda vez que o app recebe uma solicitação
// Ex. 1
// app.use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     next();
// })

// Ex. 2
app.use('/user/:id', (req, res, next) => {
    console.log('Request type: ', req.method, req.params);
    next();
});

// Mostra uma route e sua function manipuladora (sistema de middleware). A função lida com solicitaçōes GET para o caminho /user/:id
// Ex. 3
// app.use('/user/:id', (req, res, next) => {
//     res.send('USER');
// });

/* 
Carregamento de uma serie de functions middleware em um ponto de montagem, com um caminho de montagem. Ele ilustra uma subpilha de middleware que imprime informaçōes de solicitação para qualquer tipo de solicitação HTTP no caminho /user/:id 
*/
// Ex. 4
// app.use('/user/:d', (req, res, next) => {
//     console.log('Request URl: ', req.originalUrl);
//     next();
// }, (req, res, next) => {
//     console.log('Request Type: ', req.method);
//     next();
// });

/* 
Os manipuladores de rota permitem definir várias rotas para um caminho. O exemplo abaixo define duas rotas para solicitações GET para o caminho /user/:id. A segunda rota não causará problemas, mas nunca será chamada porque a primeira rota encerra o ciclo de solicitação-resposta. 
*/
// Ex. 5
// app.get('/user/:id', (req, res, next) => {
//     console.log('ID: ', req.params.id);
//     next();
// }, (req, res, next) => {
//     res.send('User Info');
// });

// // handler for the /user/:id path, which prints the user ID
// app.get('/user/:id', (req, res, next) => {
//     res.send(req.params.id);
// });

/* 
Para ignorar o restante das functions de middleware de uma pilha de rotas de middleware, chame next('route') para passar o controle para a proxima rota. Nota: next('route') funcionará apenas com funçōes de middleware que foram carregadas usando as funçōes app.METHOD() ou router.METHOD() 
*/
// Ex. 6
// app.get('/user/:id', (req, res, next) => {
//     // if the user ID is 0, skip to the next route
//     if(req.params.id === '0') next('route')
//     // otherwise pass the control to the next middleware function in this stack
//     else next();
// }, (req, res, next) => {
//     // send a regular response
//     res.send('regular');
// });

// // handler for the /user/:ud Path2D, which sends a special response
// app.get('/user/:id', (req, res, next) => {
//     res.send('special');
// });

/* 
Middleware declarado em um array para reusabilidade:
Este exemplo mostra um array com uma sub-pilha de middlewares que manipula as solicitações GET para o /user/:id 
*/
// Ex. 7
// function logOriginalUrl(req, res, next) {
//     console.log('Request URL: ', req.originalUrl);
//     next();
// }

// function logMethod(req, res, next) {
//     console.log('Request Type: ', req.method);
// }

// const logStuff = [logOriginalUrl, logMethod];

// app.get('/user/:id', logStuff, (req, res, next) => {
//     res.send('User Info');
// });

// *** Router-level middleware
/* 
Funciona da mesma forma que o Application-level middleware, exceto que está vinculado a uma instāncia de express.Router()

Carregue o middleware nível de rota usando as funções router.use() e router.METHOD()

O exemplo abaixo replica o sistema mostrado acima usando o middleware nivel-roteador
*/
// const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
// router.use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     next();
// });

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
// router.use('/user/:id', (req, res, next) => {
//     console.log('Request URL: ', req.originalUrl);
//     next();
// }, (req, res, next) => {
//     console.log('Request Type: ', req.method);
//     next();
// });

// a middleware sub-stack that handles GET requests to the /user/:id path
// router.get('/user/:id', (req, res, next) => {
//     // if the user ID is 0, skip to the next router
//     if(req.params.id === '0') next('route')
//     // otherwise pass control to the next middleware function in this stack
//     else next();
// }, (req, res, next) => {
//     // render a regular page
//     res.render('regular');
// });

// handler for the /user/:id path, which renders a special page
// router.get('/user/:id', (req, res, next) => {
//     console.log(req.params.id);
//     res.render('special');
// })

// // mount the router on the app
// app.use('/', router);

/* 
To skip the rest of the router’s middleware functions, call next('router') to pass control back out of the router instance. 
*/

// predicate the router with a check and bail out when needed 
// router.use((req, res, next) => {
//     if(!req.headers['x-auth']) return next('router');
//     next();
// });

// router.get('/user/:id', (req, res) => {
//     res.send('Hello, user!');
// });

// app.use('/admin', router, (req, res) => {
//     res.sendStatus(401);
// });

// *** Error-handling middleware
// sempre pega 4 argumentos, forneça 4 args para identicá-lo como uma função de middleware de tratamento de erros. Mesmo que não seja necessário usar o próximo objeto, especifique-o para manter a assinatura. Caso contrário, o próximo objeto será interpretado como middleware regular e não conseguirá tratar erros.

/* 
Define o middleware tratamento-de-erros da mesma forma que as outras funções, exceto pelos 4 AbortSignal. 
*/
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// *** Built-int middleware
// Ver na documentação


// *** Third-party middleware
/* 
Use o middleware de terceiros para adicionar funcionalidade para apps Express 

Ver documentação
*/

app.listen(port, () => {
    console.log('Example listen on port: ' + port);
});