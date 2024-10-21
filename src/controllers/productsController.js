const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel");


// Obtener todos los products
const getAllProducts = async (req, res) => {
   try {
      const products = await Product.find();
      res.render("products", { layout: "layouts/main", products });
   } catch (error) {
      console.error("Error while fetching products:", error);
      res.status(500).send("There was an error while fetching products");
   }
};

// Crear un new product
const createProduct = async (req, res) => {
   const { description, price = 0, category, inStock = false, isPromotion = false, isNewArrival = false} = req.body;

   const imagePath = req.file? req.file.filename : '';

   // Validar que los datos sean válidos
   if (!description || isNaN(parseFloat(price)) || !category) {
      return res.status(400).send("Mandatory fields are missing and the price must be a number");
   }

   try {
      const newProduct = new Product({
         description,
         price: parseFloat(price),
         category,
         inStock,
         isPromotion,
         isNewArrival,
         image: imagePath,
      });
      await newProduct.save();
      res.status(303).redirect("/products");
   } catch (error) {
      console.error("Error while creating product:", error);
      res.status(500).send("There was an error while creating the product");
   }
};

// Editar un product
const editProduct = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      if (!product) {
         return res.status(404).send("Product not found");
      }
      res.render("editProduct", { layout: "layouts/main", product });
   } catch (error) {
      console.error("Error while getting product:", error);
      res.status(500).send("There was an error while getting the product");
   }
};

// Actualizar product
const updateProduct = async (req, res) => {
   const { description, price = 0, category, inStock = false, isPromotion = false, isNewArrival = false} = req.body;
   const imagePath = req.file? req.file.filename : '';

     // Convert string values to Boolean
     const parsedInStock = inStock === 'on';
     const parsedIsPromotion = isPromotion === 'on';
     const parsedIsNewArrival = isNewArrival === 'on';

   /* Validar que los datos sean válidos*/
   if (!description || isNaN(parseFloat(price)) || !category) {
      return res.status(400).send("Update: Mandatory fields are missing and the price must be a number");
   }

   // Obtener y limpiar el ID product
   const productId = req.params.id.trim() //Eliminar espacios 

   // Validar que el ID sea valido
   if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send("Invalid product ID");
   }
   try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, {
         description,
         price: parseFloat(price),
         category,
         inStock: parsedInStock,
         isPromotion: parsedIsPromotion,
         isNewArrival: parsedIsNewArrival,
         image: imagePath,
      }, { new: true });

      if (!updatedProduct) {
         return res.status(404).send("Product not found");
      }
      res.status(303).redirect("/products");
   } catch (error) {
      console.error("Error while updating product:", error);
      res.status(500).send("There was an error while updating the product");
   }
};

// Eliminar un product
const deleteProduct = async (req, res) => {
   try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
         return res.status(404).send("Product not found");
      }
      res.status(303).redirect("/products");
   } catch (error) {
      console.error("Error while deleting product:", error);
      res.status(500).send("There was an error while deleting the product");
   }
};

module.exports = {
   getAllProducts,
   createProduct,
   editProduct,
   updateProduct,
   deleteProduct,
};