# Gestión Académica - README

## Resumen

Sistema de gestión académica con frontend en Angular 21 y backend JSON Server con autenticación JWT. El proyecto incluye gestión de usuarios, cursos, matrículas, asistencias y tareas con control de acceso basado en roles (admin, profesor, estudiante). [1](#0-0) [2](#0-1) 

## Prerrequisitos

- Node.js 18.x o superior
- npm (incluido con Node.js)

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/joel-machaca/gestion-academica
cd gestion-academica
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend
```bash
cd ../code-hub
npm install
```

## Configuración y Ejecución

### Backend (JSON Server)

El backend utiliza JSON Server con middleware de autenticación para proporcionar una API RESTful. [3](#0-2) 

1. **Iniciar el servidor backend:**
   ```bash
   cd backend
   node server.js
   ```
   
2. El servidor se iniciará en `http://localhost:3000` [4](#0-3) 

3. **Base de datos:** El archivo `db.json` contiene los datos iniciales incluyendo usuarios, cursos, matrículas, etc. [5](#0-4) 

4. **Hash de contraseñas:** Si agregas nuevos usuarios, ejecuta:
   ```bash
   node hashUsuarios.js
   ```
   Este script hashea las contraseñas usando bcrypt. [6](#0-5) 

### Frontend (Angular)

El frontend es una aplicación Angular 21 con TypeScript, Tailwind CSS y componentes reactivos. [7](#0-6) 

1. **Iniciar el servidor de desarrollo:**
   ```bash
   cd code-hub
   ng serve
   ```

2. La aplicación estará disponible en `http://localhost:4200` [8](#0-7) 

3. **Configuración de entorno:** La API URL está configurada en `environment.ts` [9](#0-8) 

## Usuarios por Defecto

El sistema incluye usuarios preconfigurados en `db.json`: [5](#0-4) 

### Admin (roleId: 1)
- Email: `admin@idat.com`
- Email: `admin2@idat.com`

### Profesores (roleId: 2)
- Email: `profe1@idat.com`
- Email: `profe2@idat.com`
- Email: `profe3@idat.com`

### Estudiantes (roleId: 3)
- Email: `estu1@idat.com`
- Email: `estu2@idat.com`
- Email: `estu3@idat.com`
- Email: `estu4@idat.com`
- Email: `estu5@idat.com`

*Nota: Todas las contraseñas están hasheadas en la base de datos.*

## Estructura del Proyecto

```
gestion-academica/
├── backend/
│   ├── server.js          # Servidor JSON Server con auth
│   ├── db.json           # Base de datos mock
│   ├── hashUsuarios.js   # Utilidad para hashear contraseñas
│   └── package.json      # Dependencias del backend
├── code-hub/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/    # Módulos: admin, docente, estudiante
│   │   │   ├── core/     # Servicios, modelos, guards
│   │   │   └── auth/     # Autenticación
│   │   └── environments/
│   ├── angular.json      # Configuración de Angular CLI
│   ├── package.json      # Dependencias del frontend
│   └── tailwind.config.js # Configuración de Tailwind CSS
└── README.md
```

## Comandos Útiles

### Backend
```bash
cd backend
node server.js              # Iniciar servidor
node hashUsuarios.js        # Hashear contraseñas
```

### Frontend
```bash
cd code-hub
ng serve                    # Servidor de desarrollo
ng build                    # Build de producción
ng test                     # Ejecutar tests unitarios
ng build --watch --configuration development  # Build continuo
```

## Flujo de Autenticación

1. El usuario inicia sesión en `/login`
2. El backend valida credenciales y retorna JWT token
3. El frontend almacena el token en localStorage
4. Las rutas están protegidas por `roleGuard` según el roleId del usuario [10](#0-9) 

## Tecnologías

### Frontend
- Angular 21.0.3 con TypeScript 5.9.2 [7](#0-6) 
- Tailwind CSS 4.1.17 para estilos
- SweetAlert2 para alertas
- Chart.js para visualizaciones
- Lucide Angular para iconos

### Backend
- JSON Server 1.0.0-beta.3
- json-server-auth 2.1.0 para autenticación JWT
- bcrypt para hashear contraseñas
- CORS para permitir peticiones cross-origin

## Notas

- El servidor backend recarga automáticamente los datos al modificar `db.json`
- El frontend tiene hot reload al modificar archivos fuente
- Las contraseñas nuevas deben ser hasheadas con `hashUsuarios.js`
- La configuración de producción requiere actualizar `apiUrl` en `environment.prod.ts`

Wiki pages you might want to explore:
- [Technology Stack (joel-machaca/gestion-academica)](/wiki/joel-machaca/gestion-academica#1.2)
- [Getting Started (joel-machaca/gestion-academica)](/wiki/joel-machaca/gestion-academica#2)
- [Database Schema (joel-machaca/gestion-academica)](/wiki/joel-machaca/gestion-academica#3.1)

### Citations

**File:** code-hub/package.json (L24-39)
```json
  "dependencies": {
    "@angular/common": "^21.0.3",
    "@angular/compiler": "^21.0.3",
    "@angular/core": "^21.0.3",
    "@angular/forms": "^21.0.3",
    "@angular/platform-browser": "^21.0.3",
    "@angular/router": "^21.0.3",
    "chart.js": "^4.5.1",
    "json-server": "^1.0.0-beta.3",
    "json-server-auth": "^2.1.0",
    "jwt-decode": "^4.0.0",
    "lucide-angular": "^0.555.0",
    "rxjs": "~7.8.0",
    "sweetalert2": "^11.26.3",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
```

**File:** backend/server.js (L1-51)
```javascript
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
```

**File:** backend/db.json (L31-90)
```json
      "estado": "activo",
      "imagen": "./profiles/profile-2.svg",
      "id": 2
    },
    {
      "email": "profe2@idat.com",
      "password": "$2a$10$dqQWnIfbZ3hMhLHPKoYGduhv0.sAcGN0fT6grUcKVzBPRij60vp3i",
      "nombre": "María Torres",
      "roleId": 2,
      "estado": "activo",
      "imagen": "./profiles/profile-1.svg",
      "id": 3
    },
    {
      "email": "profe3@idat.com",
      "password": "$2a$10$fKUnCq6qxS19S91xmRrJJ./tuFe1qj7zak5cNq/QsQwoPmrmEfz/a",
      "nombre": "Juan Ríos",
      "roleId": 2,
      "estado": "activo",
      "imagen": "./profiles/profile-2.svg",
      "id": 4
    },
    {
      "email": "estu1@idat.com",
      "password": "$2a$10$koB05440ZFH.DePfPqsj6OZiJVXfGUy03BUrrK8DDEpawiZCEfLH6",
      "nombre": "Pedro López",
      "roleId": 3,
      "estado": "activo",
      "imagen": "./profiles/profile-1.svg",
      "id": 5
    },
    {
      "email": "estu2@idat.com",
      "password": "$2a$10$h9ovmk.HlmklIyTFQMDXX.8oqlqGIL2Yzm.0H19AGMInYscRmvR1S",
      "nombre": "Lucía Ramírez",
      "roleId": 3,
      "estado": "activo",
      "imagen": "./profiles/profile-3.svg",
      "id": 6
    },
    {
      "email": "estu3@idat.com",
      "password": "$2a$10$H6Jjo6/Z0ucRvx/KqnDiO.HbejMMIbLm/tyzpZNkP69YEPX3a42Ze",
      "nombre": "Carlos Núñez",
      "roleId": 3,
      "estado": "activo",
      "imagen": "./profiles/profile-2.svg",
      "id": 7
    },
    {
      "email": "estu4@idat.com",
      "password": "$2a$10$ZblNr/kwGuvPbqZffVqwH.8YJudRiazPhoQ/xZjGcBz1Z96lCV9dO",
      "nombre": "Andrea Silva",
      "roleId": 3,
      "estado": "activo",
      "imagen": "./profiles/profile-2.svg",
      "id": 8
    },
    {
      "email": "estu5@idat.com",
```

**File:** backend/hashUsuarios.js (L1-12)
```javascript
const fs = require("fs");
const bcrypt = require("bcrypt");

let db = JSON.parse(fs.readFileSync("db.json", "utf8"));

db.usuarios = db.usuarios.map(u => {
  const hash = bcrypt.hashSync(u.password, 10);
  return { ...u, password: hash };
});

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

```

**File:** code-hub/README.md (L7-13)
```markdown
To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
```

**File:** code-hub/src/app/app.routes.ts (L10-27)
```typescript
    {
        path:"admin",
        loadChildren:()=> import('./pages/admin/admin.routes').then(m=>m.ADMIN_ROUTES),
        canActivate:[roleGuard],
        data:{roles:[1]}
    },
    {
        path:"docente",
        loadChildren:()=> import('./pages/docente/docente.routes').then(m=>m.DOCENTE_ROUTES),
        canActivate:[roleGuard],
        data:{roles:[2]}
    },
    {
        path:"estudiante",
        loadChildren:()=> import('./pages/estudiante/estudiante.routes').then(m=>m.ESTUDIANTE_ROUTES),
        canActivate:[roleGuard],
        data:{roles:[3]}
    },
```
