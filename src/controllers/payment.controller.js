import mercadopage from "mercadopago";
import dotenv from 'dotenv';
import { config } from 'dotenv';
import {getConnection} from './../database/database.js'

var orden='';

export const createOrder = async (req, res) => {
  console.log("REQ", req.body);
  orden = req.body.orden;
  dotenv.config();
  config();
console.log("ENTORNO",process.env.ACCESS_TOKEN);
  mercadopage.configure({

    access_token: process.env.ACCESS_TOKEN
  });

  for (let i = 0; i < req.body.cart.length; i++) {
    req.body.cart[i].unit_price = req.body.cart[i].price;
    req.body.cart[i].title = req.body.cart[i].productName;
    req.body.cart[i].currency_id = "ARS";



  }


  for (let i = 0; i < req.body.cart.length; i++) {
    delete req.body.cart[i].price;
    delete req.body.cart[i].productName;
    delete req.body.cart[i].description;
    delete req.body.cart[i].descrp;
    delete req.body.cart[i].img;
    delete req.body.cart[i].id;




  }



  try {
    const result = await mercadopage.preferences.create({
      items: req.body.cart,
      payer: {
        name: req.body.user.name,
        surname: req.body.user.surname,
        email: "user@email.com",
        phone: {
          area_code: "54",
          number: Number(req.body.user.phone)
        },
      },
      payment_methods: {

        installments: 1
      },
      /*    items: [
           {
      
             currency_id: 'ARS',
             
             title: 'Thermogen',
          
             unit_price: 26,
             quantity: 1
           },
         ], */
       //  notification_url: "https://0616-2803-cf00-7f4-2c00-61b8-78fe-969e-b10c.ngrok-free.app/webhook",
     notification_url: "https://pagos-h22l.onrender.com/webhook",
      back_urls: {
        success: "https://san2025chez.github.io/new-ecomerce/",
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
      },
    });



    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
 console.log("recibe webhook",req);
  try {
    const payment = req.query;

    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
       console.log("Guardo en BD",data.body.status);
         console.log("Guardo en BD",data.body.status_detail);
     
         const connection = await getConnection();
    console.log("CONEXION", connection.database,
    connection.host,connection.password,
    connection.user
    );
         connection.connect()
      .then(() => {
        console.log('Conexión exitosa a la base de datos PostgreSQL');
        connection.query('INSERT INTO pagos (id, orden, status) VALUES ($1, $2, $3)',
        ["richisito", orden, data.body.status_detail], (error, result) => {
         if (error) {
           console.error('Error al guardar datos:', error);
           res.status(500).json({ error: 'Error al guardar datos' });
         } else {
           console.log('Datos guardados correctamente');
            res.json({ mensaje: 'Datos guardados correctamente' });
        }})
      })
      .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
      });
   
    }


  } catch (error) {

    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const saveData = async (req, res) => {
  const { dato1, dato2 } = req.body;

  // Ejecuta una consulta para insertar datos en la base de datos
  pool.query('INSERT INTO pagos (id, orden, status) VALUES ($1, $2, $3)', [dato1, dato2], (error, result) => {
    if (error) {
      console.error('Error al guardar datos:', error);
      res.status(500).json({ error: 'Error al guardar datos' });
    } else {
      console.log('Datos guardados correctamente');
      res.json({ mensaje: 'Datos guardados correctamente' });
    }
  });


}