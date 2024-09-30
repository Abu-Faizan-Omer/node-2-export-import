const http=require("http")
const route=require("./route")
const myserver=http.createServer(route.handler)
myserver.listen(4000)