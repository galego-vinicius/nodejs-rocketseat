import http from 'http'

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

const users = []

const server = http.createServer((request, response) => {
    const { method, url } = request

    if (method == 'GET' && url == '/users'){
        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    
    if (method == 'POST' && url == '/users'){
        users.push({
            id: 1,
            name: 'Vinicius Félix',
            email: 'vinicius@example.com',
        })

        return response.writeHead(201).end()
    }


    return response.writeHead(404).end()
})

server.listen(3333)
//quer que o nosso servidor http ouça a porta 3333 aqui do localhost da nossa maquina. E ai toda vez que acessarmos esse endereço, ele vai cair nessa função aqui dentro, que vai lidar com as chamadas http


