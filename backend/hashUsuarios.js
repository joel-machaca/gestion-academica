const fs = require("fs");
const bcrypt = require("bcrypt");

let db = JSON.parse(fs.readFileSync("db.json", "utf8"));

db.usuarios = db.usuarios.map(u => {
  const hash = bcrypt.hashSync(u.password, 10);
  return { ...u, password: hash };
});

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
