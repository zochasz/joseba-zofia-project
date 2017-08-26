/*jshint esversion: 6 */
const mongoose = require('mongoose');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const User = require('../models/user');
const Event = require('../models/event');
const ProductType = require('../models/product-types');

mongoose.connect("mongodb://localhost/tomatoop-dev");
var salt = bcrypt.genSaltSync(bcryptSalt);
const password = "ironhack";
var encryptedPass = bcrypt.hashSync(password, salt);

// const productTypes = [
//   {
//     key        : "fruit",
//     name      : "Fruit and Vegetables",
//     image600  : "huerto600.jpg",
//     image1200 : "huerto1200.jpg"
//   },
//   {
//     key        : "eggs",
//     name      : "Eggs",
//     image600  : "eggs600.jpg",
//     image1200 : "eggs1200.jpg"
//   },
//   {
//     key        : "milk",
//     name      : "Milk and Cheese",
//     image600  : "cheese600.jpg",
//     image1200 : "cheese1200.jpg"
//   },
//   {
//     key        : "bread",
//     name      : "Bread, Cereals and Bakery",
//     image600  : "bread600.jpg",
//     image1200 : "bread1200.jpg"
//   },
//   {
//     key        : "oil",
//     name      : "Oil and Vinegar",
//     image600  : "oliveOil600.jpg",
//     image1200 : "oliveOil1200.jpg"
//   },
//   {
//     key        : "beer",
//     name      : "Beer, Vine and Spirits",
//     image600  : "vine600.jpg",
//     image1200 : "vine1200.jpg"
//   },
//   {
//     key        : "meat",
//     name      : "Meat",
//     image600  : "meat600.jpg",
//     image1200 : "meat1200.jpg"
//   },
//   {
//     key        : "coldMeat",
//     name      : "Cold Meat",
//     image600  : "jam600.jpg",
//     image1200 : "jam1200.jpg"
//   },
//   {
//     key        : "jams",
//     name      : "Jams and Honey",
//     image600  : "honey600.jpg",
//     image1200 : "honey1200.jpg"
//   },
//   {
//     key        : "appetizers",
//     name      : "Appetizers",
//     image600  : "apetizer600.jpg",
//     image1200 : "apetizer1200.jpg"
//   },
//   {
//     key        : "tinned",
//     name      : "Tinned Food",
//     image600  : "anchoas600.jpg",
//     image1200 : "anchoas1200.jpg"
//   }
// ];

// const producers = [
//   {
//     username: 'Verduras Lopez',
//     password: encryptedPass,
//     name: 'Juan Lopez',
//     email: 'juan@lopez.com',
//     isProducer: true,
//     address: {
//       street: 'Torrelaguna',
//       streetNo: '75',
//       zipCode: '28027',
//       city: 'Madrid',
//       country: 'Spain',
//       latitude: 40.44583910000001,
//       longitude: -3.6557812
//     },
//     description: 'Verduras ecologicas, frescas y de temporada.',
//     url: 'www.verduras_lopez.com',
//     phoneNo: '666 44 55 66',
//     products: [ "59a07e69110ca7d2c8f8895a" ]
//   },
//   {
//     username: 'Granja La Colina',
//     password: encryptedPass,
//     name: 'Pepita Perez',
//     email: 'pepita@perez.com',
//     isProducer: true,
//     address: {
//       street: 'Amparo',
//       streetNo: '59',
//       zipCode: '28012',
//       city: 'Madrid',
//       country: 'Spain',
//       latitude: 40.4088421,
//       longitude: -3.7023373
//     },
//     description: 'Huevos de gallinas criadas en libertad.',
//     url: 'www.granjalacolina.com',
//     phoneNo: '666 11 22 33',
//     products: [ "59a07e69110ca7d2c8f8895b" ]
//   },
//   {
//     username: 'Colmena Romero',
//     password: encryptedPass,
//     name: 'Andres Gonzalez',
//     email: 'andres@gonzalez.com',
//     isProducer: true,
//     address: {
//       street: 'Orense',
//       streetNo: 5,
//       zipCode: '28020',
//       city: 'Madrid',
//       country: 'Spain',
//       latitude: 40.4474153,
//       longitude: -3.6956848
//     },
//     description: 'Miel de romero.',
//     url: 'www.colmena-romero.com',
//     phoneNo: '666 32 43 54',
//     products: [ "59a07e69110ca7d2c8f88962" ]
//   }
// ];
const events = [
    {
    _creator      : "59a07f21811937d2df8e8734",
    title         : 'Venta de Miel de Romero',
    description   : 'Oferta: tarro de 05L - 3euros, si te llevas 2 - 5euros',
    address       : {
                    street: 'Torrelaguna',
                    streetNo: '75',
                    zipCode: '28027',
                    city: 'Madrid',
                    country: 'Spain',
                    latitude: 40.44583910000001,
                    longitude: -3.6557812
                  },
    datetime      : new Date("2017-09-05T12:30:00.000"),
    products      : [ "59a07e69110ca7d2c8f88962" ]
    },
    {
    _creator      : "59a07f21811937d2df8e8733",
    title         : 'Venta de Huevos de la Colina',
    description   : '6 huevos blancos XL - 3,5euros, 6 huevos morenos XL - 3,2euros',
    address       : {
                    street: 'Amparo',
                    streetNo: '59',
                    zipCode: '28012',
                    city: 'Madrid',
                    country: 'Spain',
                    latitude: 40.4088421,
                    longitude: -3.7023373
                  },
    datetime      : new Date("2017-09-07T11:30:00.000"),
    products      : [ "59a07e69110ca7d2c8f8895b" ]
    },
    {
    _creator      : "59a07f21811937d2df8e8732",
    title         : 'Vendo verdirita fresca, fresca de mi huerta',
    description   : 'Tengo tomates rambo, acelga fresca, zanahorias riquisimas, puerros, cebollas, calabacines y ajos',
    address       : {
                    street: 'Orense',
                    streetNo: '5',
                    zipCode: '28020',
                    city: 'Madrid',
                    country: 'Spain',
                    latitude: 40.4474153,
                    longitude: -3.6956848
                  },
    datetime      : new Date("2017-09-08T20:30:00.000"),
    products      : [ "59a07e69110ca7d2c8f8895a" ]
  }];

// ProductType.create(productTypes, (err, docs)=>{
//   if (err) { throw err };
//     docs.forEach( (productType) => {
//       console.log(productType.name)
//     })
//     mongoose.connection.close();
// });

// User.create(producers, (err, user) => {
//   if (err) {
//     throw err;
//   }
//   console.log(user);
//   mongoose.connection.close();
// });

Event.create(events, (err, docs)=>{
  if (err) { throw err };
    docs.forEach( (event) => {
      console.log(event.title)
    })
    mongoose.connection.close();
});
