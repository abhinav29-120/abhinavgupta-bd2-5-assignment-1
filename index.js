const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');
app.use(cors());

//Endpoint 1: Get the products sorted by popularity
let products = [
  { id: 1, name: "Xiaomi iPhone 12", brand: "Xiaomi", price: 60000, ram: 6, rom: 256, rating: 4.5, os: "Android", camera: 108, },
  { id: 2, name: "Oppo Mi 10", brand: "Xiaomi", price: 30000, ram: 6, rom: 512, rating: 4, os: "iOS", camera: 64, },
  { id: 3, name: "Samsung Mi 10", brand: "Oppo", price: 20000, ram: 4, rom: 256, rating: 4, os: "Android", camera: 24, },
  { id: 4, name: "Apple Find X2", brand: "Samsung", price: 60000, ram: 8, rom: 512, rating: 4.5, os: "iOS", camera: 48, },
  { id: 5, name: "Oppo Mi 11", brand: "Xiaomi", price: 30000, ram: 12, rom: 128, rating: 4, os: "iOS", camera: 24, },
  { id: 6, name: "OnePlus Find X3", brand: "Apple", price: 30000, ram: 12, rom: 64, rating: 4, os: "Android", camera: 64, },
  { id: 7, name: "Apple Pixel 5", brand: "Apple", price: 70000, ram: 4, rom: 512, rating: 4.5, os: "iOS", camera: 24, },
  { id: 8, name: "Google Mi 10", brand: "Oppo", price: 30000, ram: 8, rom: 64, rating: 5, os: "iOS", camera: 108, },
  { id: 9, name: "Oppo Mi 11", brand: "Samsung", price: 30000, ram: 4, rom: 64, rating: 4, os: "Android", camera: 24, },
  { id: 10, name: "Xiaomi Mi 10", brand: "Oppo", price: 60000, ram: 16, rom: 512, rating: 4.5, os: "Android", camera: 12, },
  { id: 11, name: "OnePlus Pixel 5", brand: "Apple", price: 60000, ram: 12, rom: 64, rating: 5, os: "Android", camera: 12, },
  { id: 12, name: "Xiaomi OnePlus 8", brand: "Xiaomi", price: 70000, ram: 8, rom: 64, rating: 4.5, os: "Android", camera: 48, },
  { id: 13, name: "Xiaomi Pixel 6", brand: "Oppo", price: 30000, ram: 4, rom: 64, rating: 5, os: "Android", camera: 108, },
  { id: 14, name: "Samsung Find X2", brand: "Oppo", price: 40000, ram: 12, rom: 512, rating: 4.7, os: "Android", camera: 48, },
  { id: 15, name: "Google OnePlus 8", brand: "Apple", price: 20000, ram: 16, rom: 64, rating: 5, os: "iOS", camera: 24, },
  { id: 16, name: "OnePlus iPhone 12", brand: "OnePlus", price: 20000, ram: 6, rom: 128, rating: 4.5, os: "iOS", camera: 64, },
  { id: 17, name: "Google Mi 11", brand: "Oppo", price: 70000, ram: 6, rom: 64, rating: 4, os: "Android", camera: 64, },
  { id: 18, name: "Google OnePlus 9", brand: "Apple", price: 20000, ram: 4, rom: 64, rating: 5, os: "Android", camera: 64, },
  { id: 19, name: "Oppo Galaxy S22", brand: "Samsung", price: 20000, ram: 16, rom: 256, rating: 4.7, os: "Android", camera: 12, },
  {id: 20,name: "Apple Pixel 5",brand: "Oppo",price: 40000,ram: 8,rom: 128,rating: 4.7,os: "Android",camera: 108,},
];

//   app.get("/products",(req,res)=>{
//     res.json(products);
//   });
function sortedProducts1(ele1,ele2){
  return ele2.rating-ele1.rating;
};
app.get("/products/sort/popularity",(req,res)=>{
  let arrCp=products.slice();
  let sortedProducts=arrCp.sort(sortedProducts1);
  res.json({ products: sortedProducts });
  // res.json(arrCp.sort(sortedProducts));
});

//endpoint 2: Get the products sorted by “high-to-low” price
function sortedProductsByPrice(ele1,ele2){
  return ele2.price-ele1.price;
};
app.get("/products/sort/price-high-to-low",(req,res)=>{
  let arrCp=products.slice();
  let sortedProducts=arrCp.sort(sortedProductsByPrice);
  res.json({ products: sortedProducts });
  // res.json(arrCp.sort(sortedProductsByPrice));
});

//Endpoint 4: Filter the products based on the “RAM” option
function filterByRam(prObj,rval){
  return prObj.ram===rval;
};
app.get("/products/filter/ram",(req,res)=>{
  let ramVal=parseFloat(req.query.ram);
  // console.log(typeof(ramVal));
  let sortedProducts=products.filter((el)=>filterByRam(el,ramVal));
  res.json({ products: sortedProducts });
  // res.json(products.filter((el)=>filterByRam(el,ramVal)));
});

//Endpoint 5: Filter the products based on the “ROM” option.
function filterByRom(prObj,rval){
  return prObj.rom===rval;
};
app.get("/products/filter/rom",(req,res)=>{
  let rval=parseFloat(req.query.rom);
  // res.json(products.filter((el)=>filterByRom(el,rval)));
  let sortedProducts=products.filter((el)=>filterByRom(el,rval));
  res.json({ products: sortedProducts });
});

//Endpoint 6: Filter the products based on the “Brand” option
function filterByBrand(prObj,pname){
  return (prObj.brand).toLowerCase()===pname;
};
app.get("/products/filter/brand",(req,res)=>{
  let pn=req.query.brand;
  // res.json(products.filter((el)=>filterByBrand(el,pn)));
  let sortedProducts=products.filter((el)=>filterByBrand(el,pn));
  res.json({ products: sortedProducts });
});

//Endpoint 7: Filter the products based on the “OS” option.
function filterByOs(prObj,oname){
  // return (prObj.os).toLowerCase()===oname;
  return prObj.os===oname;
};
app.get("/products/filter/os",(req,res)=>{
  let oname=req.query.os;
  // res.json(products.filter((el)=>filterByOs(el,oname)));
  let sortedProducts=products.filter((el)=>filterByOs(el,oname));
  res.json({ products: sortedProducts });
});

//Endpoint 8: Filter the products based on the “Price” option.
function filterByPrice(prObj,pr){
  return prObj.price===pr;
};
app.get("/products/filter/price",(req,res)=>{
  let pr=parseFloat(req.query.price);
  // res.json(products.filter((el)=>filterByPrice(el,pr)));
  let sortedProducts=products.filter((el)=>filterByPrice(el,pr));
  res.json({ products: sortedProducts });
});

//Endpoint 9: Send original array of products
app.get("/products",(req,res)=>{
  let sortedProducts=products;
  res.json({ products: sortedProducts });
  // res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
