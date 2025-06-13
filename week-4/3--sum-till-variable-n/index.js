const express = require ('express')

const app = express()

function sumTill (n) {
    let r = 0;
    for (let i = 1; i <= n; ++i)
    {
        r += i;
    }
    return r;
}

app.get ('/', (req, res) => {

    let n = 0;
    if ('n' in req.query)
    {
        n = req.query.n;
    }
    
    res
        .status(200)
        .send ("SumTill (" + String (n) + ") = " + String(sumTill (n)));

});

app.listen(3000, () => {
    console.log ('listening at @ 3000')
})