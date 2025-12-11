const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const servidor = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const SOLO_PROPIETARIO = 600;
const SOLO_AUTENTICADOS = 640;
const SOLO_ADMINS = 660; // para admins

// Middlewares base
servidor.use(cors());
servidor.use(middlewares);
servidor.use(jsonServer.bodyParser);

// Logging peticiones y /login
servidor.use((req, res, next) => {
  console.log("Headers recibidos:", req.headers);
  if (req.path === "/login") {
    console.log("Body recibido en /login:", req.body);
  }
  next();
});

// Reglas del auth
const reglas = auth.rewriter({
  usuarios: SOLO_ADMINS,
  cursos: SOLO_ADMINS, // <-- permite a admins crear/editar cursos
  matriculas: SOLO_ADMINS,
  contenidoCursos: SOLO_AUTENTICADOS,
  asistencias: SOLO_AUTENTICADOS,
  horarios: SOLO_AUTENTICADOS,
  tareas: SOLO_AUTENTICADOS
});
servidor.use(reglas);

// Vincular DB
servidor.db = router.db;

// Middleware de auth
servidor.use(auth);

// Router
servidor.use(router);

// Iniciar servidor
servidor.listen(3000, () => {
  console.log("🚀 Servidor listo en http://localhost:3000");
});