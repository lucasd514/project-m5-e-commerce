"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  handleBrands,
  handleProducts,
  handleProductCategoriesID,
  handleSpecificBrand,
  handleCategories,
  handleSpecificProduct,
  handlePurchase,
  handleBodyLocation,
} = require("./handlers/handler");

const {
  createUser,
  authenticateAdmin,
} = require("./handlers/handleAuthentication");

const PORT = 4000;

const app = express();

app
.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
})

.use(morgan("tiny"))
.use(express.static("./server/assets"))
.use(bodyParser.json())
.use(express.urlencoded({ extended: false }))
.use("/", express.static(__dirname + "/"))

.post('/purchase', handlePurchase)
.post('/users', createUser)
.post('/admin', authenticateAdmin)

.get("/brands", handleBrands)
.get("/products", handleProducts)
.get("/products/product/:id", handleSpecificProduct)
.get("/products/categories", handleCategories)

.get("/products/categories/:id", handleProductCategoriesID) //all products in a given cat go here
.get("/brands/:brand", handleSpecificBrand)
.get("/bodylocation", handleBodyLocation)
.listen(PORT, () => console.info(`Listening on port ${PORT}`));
