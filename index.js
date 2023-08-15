const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile  = fs.readFileSync("home.html", "utf-8");
const replaceVal = (cass, orgVal) =>{
    let newcase = cass.replace("{%cases%}", orgVal.cases);
    newcase = newcase.replace("{%deaths%}", orgVal.deaths);
    newcase = newcase.replace("{%location%}",orgVal.country);
    return newcase;
};
const server = http.createServer((req, res) =>{
    if(req.url == "/"){
        requests(
            "https://corona.lmao.ninja/v2/countries/india"
        )
        .on("data", (chunk) => {
            const objdata = JSON.parse(chunk);
            const array = [objdata];
            const realTimeData = array.map((val)=>{
                // console.log(val.cases);
                const x = replaceVal(homeFile, val);
                res.write(x);
            });
            //console.log(array[0].cases);
        })
        .on("error", (err) => {
            if(err) return console.log("Connection closed due to error", err);

            res.end(); 
        });
    }
});
server.listen(8000, "127.0.0.1");