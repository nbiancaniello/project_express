const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const hbs = require("hbs");
const productsRouter = require('./routes/productsRoutes');

//Cargar variables de entorno 
dotenv.config();

//Conectar a la base de datos MongoDB
connectDB();

//Configurar Handlebars 
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "../public")));

// Middleware para definir rutas relacionadas con los products
app.use("/products", productsRouter);

app.get("/", (req, res) => {
   res.render("index", {
      layout: "layouts/main",
      title: "Home",
      message: "Welcome to the Store",
   })
})

app.use((req, res, next) => {
   res.status(404).render("error404", { title: "page not found" });
})

//Iniciar el servidor 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
})