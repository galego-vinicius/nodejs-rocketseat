import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// CommonJS => require
// ESModules => import/export
// Aplicações HTTP => APIs

//request -> criar um usuario (nome, email, senha)
//response -> devolver a resposta pra quem está chamando o nosso servidor.

// - Criar usuarios
// - Listar usuarios
// - Edição de eusuarios
// - Remoção de usuarios

// - HTTP 
//     - Método HTTP 
//     - URL


// GET, POST, PUT, PATCH, DELETE

// GET --> Buscar um recurso do back-end
// POST --> Criar um recurso no back-end
// PUT --> Atualizar um recurso no back-end
//PATCH --> Atualizar um recurso única (específica) de uma informação no back-end
//DELETE --> Deletar um recurso do back-end

// GET /users --> Buscando usuários no back-end
// POST /users --> Criar um usuario no back-end

// Stateful != Stateless

// JSON -> JavaScript Object Notation

// Cabeçalhos (Requisiçao/resposta) --> Metadados

//HTTP Status Code

// Query Paremeters: quando precisar ter uma ulr que ela é statefull (utilizada para filtros, paginação, não-obrigatorios)
//      http://localhost:3333/users?userId=1

// Route Parameters: identificação de recursos
//      GET http://localhost:3333/users/1 --> colocar usuario no ID 1
//      REMOVE GET http://localhost:3333/users/1 --apagar usuario do ID 1

// Request Body: Envio de Informações de um formulario (ex: insomnia) --> através do método HTTPs
//      POST http://localhost:3333/users


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        // console.log(extractQueryParams(routeParams.groups.query))

        const {query, ...params} = routeParams.groups
        req.params = params
        req.query = query ? extractQueryParams(query): {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()

})

server.listen(3333)
//quer que o nosso servidor http ouça a porta 3333 aqui do localhost da nossa maquina. E ai toda vez que acessarmos esse endereço, ele vai cair nessa função aqui dentro, que vai lidar com as chamadas http


