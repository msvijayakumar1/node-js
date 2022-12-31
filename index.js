const fs =require("fs")
const http = require("http")

let startserver=()=>{
    const server = http.createServer((req,res)=>{
        
      if(req.url==="/createfiles" && req.method==="GET")
      {
          let date = new Date();
          let time = date.toTimeString();

          fs.writeFile(`./Timefiles/${date.toDateString().split(" ").join("-")+"--"+date.getTime()}.txt`
          ,time,(err)=>{
              if(err)
              {
                  return console.log(err);
              }
              res.end(`${date.toDateString().split(" ").join("-")+"--"+date.getTime()}.txt is created`);
          })
      }

      if(req.url==="/getfiles"&&req.method==="GET")
      {
        
      
          fs.readdir("./Timefiles", async(err,files)=>{
              if(err)
              {
                  return console.log(err);
              }
              res.end(files.toString())

              
          })
         
      }
 
    })
    
    server.listen(3002,()=>{console.log("server started");});
}



if(!fs.existsSync("Timefiles"))
{
   fs.mkdir("Timefiles",(err)=>{
       console.log("created");
       if(err)
       {
           console.log(err);
       }
       startserver();
   })
}
else
{
    startserver();
}