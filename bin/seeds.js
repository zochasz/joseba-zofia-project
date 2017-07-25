/*jshint esversion: 6 */
const mongoose = require('mongoose');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const User = require('../models/user');
const Event = require('../models/event');
const TYPES = require('../models/product-types')

mongoose.connect("mongodb://localhost/tomatoop-dev");
var salt = bcrypt.genSaltSync(bcryptSalt);
const password = "ironhack";
var encryptedPass = bcrypt.hashSync(password, salt);

// const producers = [
//   {
//     // _id: "00000000001",
//     username: 'Verduras Lopez',
//     password: encryptedPass,
//     name: 'Juan Lopez',
//     email: 'juan@lopez.com',
//     isProducer: true,
//     address: {
//       street: 'calle Pizarra',
//       streetNo: 7,
//       zipCode: '28123',
//       city: 'Toledo',
//       country: 'España'
//     },
//     description: 'Verduras ecologicas, frescas y de temporada.',
//     url: 'www.verduras_lopez.com',
//     phoneNo: '666 44 55 66',
//     products: [ "Fruit & Vegetables" ],
//   },
//   {
//     // _id: "00000000002",
//     username: 'Granja La Colina',
//     password: encryptedPass,
//     name: 'Pepita Perez',
//     email: 'pepita@perez.com',
//     isProducer: true,
//     address: {
//       street: 'calle Fosforo',
//       streetNo: 4,
//       zipCode: '28345',
//       city: 'Avila',
//       country: 'España'
//     },
//     description: 'Huevos de gallinas criadas en libertad.',
//     url: 'www.granjalacolina.com',
//     phoneNo: '666 11 22 33',
//     products: [ "Eggs" ]
//   },
//   {
//     // _id: "00000000003",
//     username: 'Colmena Romero',
//     password: encryptedPass,
//     name: 'Andres Gonzalez',
//     email: 'andres@gonzalez.com',
//     isProducer: true,
//     address: {
//       street: 'calle Hierro',
//       streetNo: 3,
//       zipCode: '28853',
//       city: 'Hoyo de Manzanares',
//       country: 'España'
//     },
//     description: 'Miel de romero.',
//     url: 'www.colmena-romero.com',
//     phoneNo: '666 32 43 54',
//     products: [ "Jams & Honey" ],
//   }
// ];
const events = [
    {
    _creator      : "59736abd27e4f744f8eb4670",
    title         : 'Venta de Miel de Romero',
    description   : 'Oferta: tarro de 05L - 3euros, si te llevas 2 - 5euros',
    address       : {
                    street: 'Puerta del Sol',
                    zipCode: '28001',
                    city: 'Madrid',
                    country: 'España'
                    },
    products      : [ "Jams & Honey" ]
    },
    {
    _creator      : "59736abd27e4f744f8eb4671",
    title         : 'Venta de Huevos de la Colina',
    description   : '6 huevos blancos XL - 3,5euros, 6 huevos morenos XL - 3,2euros',
    address       : {
                    street: 'Puerta de Alcala',
                    zipCode: '28002',
                    city: 'Madrid',
                    country: 'España'
                    },
    products      : [ "Eggs" ]
    },
    {
    _creator      : "59736abd27e4f744f8eb4672",
    title         : 'Vendo verdirita fresca, fresca de mi huerta',
    description   : 'Tengo tomates rambo, acelga fresca, zanahorias riquisimas, puerros, cebollas, calabacines y ajos',
    address       : {
                    street: 'Plaza de la Paja',
                    zipCode: '28005',
                    city: 'Madrid',
                    country: 'España'
                    },
    products      : [ "Fruit & Vegetables" ]
  }];


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
