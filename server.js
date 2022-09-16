import http from "http";
import SocketIO from "socket.io"
import express from "express";



const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
//public폴더를 유저에게 공개해주는 코드
app.use("/public", express.static(__dirname + "/public"));
//홈페이지로 이동시 사용될 템플릿을 런데해주는 코드
app.get("/", (_, res) => res.render("home"));
//url에 어떤 것을 치던지 위의 코드의 url로 돌아감
app.get("/*", (_, res) => res.redirect("/"))

//http와 ws서버 둘 다 연결시켜줌, 그러나 꼭 이렇게 해 줄 필요없이 필요한건 하나만 연결시켜주어도 된다.
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);