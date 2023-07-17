// Buffer -> Representação de dados na memoria que o node utiliza 
// Maneira mais otimizada da gente escrever e ler da memoria, principalmente utilizada pelas streams do node

const buf = Buffer.from('ok')

console.log(buf)
console.log(buf.toJSON())