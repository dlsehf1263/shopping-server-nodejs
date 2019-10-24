const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
    return res.send("asasd");
});

app.get("/item/all", (req, res) =>{
    let datas = fs.readFileSync("shoppingData.json");
    jsonDatas = JSON.parse(datas);
    console.log(jsonDatas);
    let result = jsonDatas;
    return res.json(result);
});

app.get("/item/:id", (req, res) =>{
    let id = req.params.id;
    let datas = fs.readFileSync("shoppingData.json");
    jsonDatas = JSON.parse(datas);
    console.log(jsonDatas);
    let result = jsonDatas.find((e) => e.id == id);
    return res.json(result);
});
app.get("/test/:id", (req, res) =>{
    let id = req.params.id;
    let datas = fs.readFileSync("shoppingData.json");
    let jsonDatas = JSON.parse(datas);
    let result = jsonDatas.find((e) => e.id == id);
    console.log(result);
    return res.send(result);
});

app.post("/buy/item/:id", (req, res) =>{
    let id = req.params.id;
    let datas = fs.readFileSync("shoppingData.json");
    jsonDatas = JSON.parse(datas);
    let result = jsonDatas.find((e) => e.id == id);
    if(result.ea == 0){
        return res.sendStatus(404);
    }
    result.ea -= 1;
    console.log(result);
    jsonDatas[id] = result;
    fs.writeFileSync("shoppingData.json", JSON.stringify(jsonDatas),'utf-8');
    return res.sendStatus(200);
    
});

app.listen(3000, (err)=>{
    console.log("connect 3000");
});