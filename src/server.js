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

const server = http.createServer(async (req, res) => {
    const { method, url } = req

// __________________________________________________________________________________________________
    // Leitura de Streams --> Ler todo o corpo da requisição
    
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

//____________________________________________________________________________________________________
// Transforma o corpo em um objeto JavaScript (um tipo primitivo do JS)

    try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }


    if (method == 'GET' && url == '/users'){
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

//_________________________________________________________________________
// Dados que serão utilizados na criação do usuario

    if (method == 'POST' && url == '/users'){
        const { name, email } = req.body


        users.push({
            id: 1,
            name,
            email,
        })

        return res.writeHead(201).end()
    }


    return res.writeHead(404).end()
})

server.listen(3333)
//quer que o nosso servidor http ouça a porta 3333 aqui do localhost da nossa maquina. E ai toda vez que acessarmos esse endereço, ele vai cair nessa função aqui dentro, que vai lidar com as chamadas http


