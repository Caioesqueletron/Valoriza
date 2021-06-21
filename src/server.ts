import express, { request } from "express";

const app = express();

app.get('/test', (request,response) => {
    return response.json("Ola NLW")
})
app.post("/test-post",(request,response) => {
    return response.json("Ola NLW-post")
})

app.listen(3000, () => {
  console.log("Server is running ");
});
