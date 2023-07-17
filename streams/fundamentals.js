// Netflix & Spotify

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000
// POST /upload import.csv

// 10mb/s --> 1024 * 8 / 10, que seria 819,2 segundos --> vai pra 13 minutos e 40 mais ou menos.

// 13min --> Inserções no banco de dados

// 10mb/s --> 10.000 linhas

// Readble Streams / Writeble Streams

// Streams -> process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'


class OneToHundredStream extends Readable {

    index = 1

    _read(){
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1
        
        callback(null, Buffer.from(String (transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString())*10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())