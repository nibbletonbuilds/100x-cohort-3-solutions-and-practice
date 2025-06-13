const express = require('express')

const app = express()

function sumTill (n) {
    return (n*(n + 1))/2
}

app.get ('/', (req, res) => {
    const n = 1000
    res.status(200).send ("sum till " + String (n) + " = " + String (sumTill(n)))
})

app.listen (3000, '0.0.0.0', () => {
    console.log('listening on port 3000')
})