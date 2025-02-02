const express = require("express");
const {
  addTenant,
  getAllTenants,
  getTenant,
  deleteTenant,
  editTenant,
  renewRent,
} = require("../controllers/tenantController");

const tenantRoute = express.Router();
tenantRoute.post("/add-tenant", addTenant);
tenantRoute.get("/", getAllTenants);
tenantRoute.get("/:id", getTenant);
tenantRoute.delete("/:id", deleteTenant);
tenantRoute.post("/:id", editTenant);
tenantRoute.put("/:id", renewRent);

module.exports = tenantRoute;
