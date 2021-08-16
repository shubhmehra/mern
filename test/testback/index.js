const express = require("express")
const app = express()

const port = 8000;

app.get('/', (request, response) => {
    return response.send("Hello there");
});
app.get('/login', (request, response) => {
    return response.send("Hello you are in login route");
});
app.get('/signup', (request, response) => {
    return response.send("Hello you are in signup route");
});

app.listen(port, () => {
    console.log("Server is up and running...");
});
