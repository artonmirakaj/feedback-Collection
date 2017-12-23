const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

// env for port to use or use 5000
const PORT = process.env.PORT || 5000;
// listen on port 5000
app.listen(PORT);