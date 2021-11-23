/* Aqui faz a customização do express */
/* Configura o consig e export o app */
const express = require('express')
const consign = require('consign')
/*const bodyParser = require('body-parser')*/

module.exports = () => {
 const app = express()

 app.use(express.urlencoded({extended: true }))
 app.use(express.json())

 /*app.use(bodyParser.urlencoded({extended: true }))
 app.use(bodyParser.json()) */

 consign()
   .include('controllers')
   .into(app)

 return app
}
