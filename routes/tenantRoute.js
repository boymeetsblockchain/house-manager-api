const express = require('express')
const { addTenant } = require('../controllers/tenantController')


const tenantRoute = express.Router()
tenantRoute.post('/add-tenant', addTenant)


module.exports= tenantRoute