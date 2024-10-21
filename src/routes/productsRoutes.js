const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
  };

const upload = multer({ storage: storage,
  fileFilter: fileFilter
 })

// Ruta para mostrar todos los products
router.get("/", productsController.getAllProducts);
// Ruta para mostrar el formulario
router.get("/create", (req, res) => {
  res.render("form", { layout: "layouts/main" });
});

//Ruta para crear un nuevo product
router.post("/create", upload.single('image'), productsController.createProduct);

// Ruta para mostrar el formulario de edicion
router.get("/edit/:id", productsController.editProduct);


//Ruta para manejar la actualización de un product
router.post("/edit/:id", upload.single('image'), productsController.updateProduct);

//Ruta para eliminar product
router.get("/delete/:id", productsController.deleteProduct)


module.exports = router;