"use strict";

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";

  res.render("show", {
    greet1: message1,
    greet2: message2
  });
});

app.get("/hello2", (req, res) => {
  res.render("show", {
    greet1: "Hello world",
    greet2: "Bon jour"
  });
});


app.get("/icon", (req, res) => {
  res.render("icon", {
    filename: "./public/Apple_logo_black.svg",
    alt: "Apple Logo"
  });
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = "";

  if (num === 1) {
    luck = "大吉";
  } else if (num === 2) {
    luck = "中吉";
  }

  res.send("今日の運勢は" + luck + "です");
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = "";

  if (num === 1) {
    luck = "大吉";
  } else if (num === 2) {
    luck = "中吉";
  }

  res.render("omikuji2", {
    result: luck
  });
});

app.get("/janken", (req, res) => {
  const hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);

  console.log({ hand, win, total });

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = "";
  let judgement = "";

  if (num === 1) {
    cpu = "グー";
  } else if (num === 2) {
    cpu = "チョキ";
  } else {
    cpu = "パー";
  }

  judgement = "勝ち";
  win += 1;
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render("janken", display);
});

let station = [
  { id: 1, code: "JE01", name: "東京駅" },
  { id: 2, code: "JE07", name: "舞浜駅" },
  { id: 3, code: "JE12", name: "新習志野駅" },
  { id: 4, code: "JE13", name: "幕張豊砂駅" },
  { id: 5, code: "JE14", name: "海浜幕張駅" },
  { id: 6, code: "JE15", name: "検見川浜駅" }
];

let station2 = [
  {
    id: 1,
    code: "JE01",
    name: "東京駅",
    change: "総武本線，中央線，etc",
    passengers: 403831,
    distance: 0
  },
  {
    id: 2,
    code: "JE02",
    name: "八丁堀駅",
    change: "日比谷線",
    passengers: 31071,
    distance: 1.2
  },
  {
    id: 3,
    code: "JE05",
    name: "新木場駅",
    change: "有楽町線，りんかい線",
    passengers: 67206,
    distance: 7.4
  },
  {
    id: 4,
    code: "JE07",
    name: "舞浜駅",
    change: "舞浜リゾートライン",
    passengers: 76156,
    distance: 12.7
  },
  {
    id: 5,
    code: "JE12",
    name: "新習志野駅",
    change: "",
    passengers: 11655,
    distance: 28.3
  },
  {
    id: 6,
    code: "JE17",
    name: "千葉みなと駅",
    change: "千葉都市モノレール",
    passengers: 16602,
    distance: 39.0
  },
  {
    id: 7,
    code: "JE18",
    name: "蘇我駅",
    change: "内房線，外房線",
    passengers: 31328,
    distance: 43.0
  }
];

app.get("/keiyo2", (req, res) => {
  res.render("keiyo2", {
    data: station2
  });
});

app.get("/keiyo2/create", (req, res) => {
  res.redirect("/public/keiyo2_new.html");
});

app.get("/keiyo2/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[number];

  res.render("keiyo2_edit", {
    id: number,
    data: detail
  });
});

app.post("/keiyo2/update/:number", (req, res) => {
  const number = req.params.number;

  station2[number].code = req.body.code;
  station2[number].name = req.body.name;
  station2[number].change = req.body.change;
  station2[number].passengers = req.body.passengers;
  station2[number].distance = req.body.distance;

  console.log(station2);
  res.redirect("/keiyo2");
});

app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});


app.get("/keiyo2/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[number];

  res.render("keiyo2_detail", {
    id: number,
    data: detail
  });
});


app.post("/keiyo2", (req, res) => {
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;

  station2.push({
    id: id,
    code: code,
    name: name,
    change: change,
    passengers: passengers,
    distance: distance
  });

  console.log(station2);
  res.render("keiyo2", {
    data: station2
  });
});

app.get("/keiyo", (req, res) => {
  res.render("db1", {
    data: station
  });
});

app.get("/keiyo_add", (req, res) => {
  const newStation = {
    id: Number(req.query.id),
    code: req.query.code,
    name: req.query.name
  };

  station.push(newStation);

  res.render("db1", {
    data: station
  });
});

let cafeMenu = [
  { id: 1, name: "カフェラテ", price: 500 },
  { id: 2, name: "抹茶ラテ", price: 550 },
  { id: 3, name: "チーズケーキ", price: 600 }
];

app.get("/cafe", (req, res) => {
  res.render("cafe", {
    data: cafeMenu
  });
});

app.get("/cafe_add", (req, res) => {
  const newMenu = {
    id: Number(req.query.id),
    name: req.query.name,
    price: Number(req.query.price)
  };

  cafeMenu.push(newMenu);

  res.render("cafe", {
    data: cafeMenu
  });
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});