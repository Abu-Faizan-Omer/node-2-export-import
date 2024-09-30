const fs=require("fs")
 const requestHandler=(req,res) => {
    const url=req.url
    const method=req.method
    if(url==="/")
        {
            res.write("<html>")
            res.write("<head><title>Enter message </title></head>")
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
            res.write("</html>")
            return res.end()
        }
        if(url==="/message" && method==="POST")
        {
            fs.writeFileSync("message.txt","Dummy")
            const body=[]
            req.on('data',(chunk)=>{
                console.log(chunk)
                body.push(chunk)
            })
            req.on('end',()=>{
                const parsedbody=Buffer.concat(body).toString()
                const message=parsedbody.split("=")[1]
                fs.writeFileSync("message.txt",message)
            })
            res.statusCode=302
            res.setHeader("Location","/")
            return res.end()
        }
        res.setHeader('Content-Type','text/html')
        res.write("<html>")
        res.write("<head><title>My first node server withy res</title></head>")
        res.write("<body><h1>Welcome to my first Node Js project</h1></body>")
        res.write("</html>")
        res.end()
 }
//module.exports=requestHandler
module.exports.handler=requestHandler