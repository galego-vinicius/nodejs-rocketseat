export async function json(req, res){
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

    res.setHeader('Content-type', 'application/json')
}