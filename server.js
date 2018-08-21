const express = require('express')
const app = express()

app.use(express.static(__dirname + '/build/default'));

app.get('*', function(req, res){
    res.sendFile("index.html", {root: '.'});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))