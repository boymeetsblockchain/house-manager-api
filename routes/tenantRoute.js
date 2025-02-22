const express = require("express");
const {
  addTenant,
  getAllTenants,
  getTenant,
  deleteTenant,
  editTenant,
  renewRent,
  deleteSinglePayment,
  toggleActive,
} = require("../controllers/tenantController");

const tenantRoute = express.Router();
tenantRoute.post("/add-tenant", addTenant);
tenantRoute.get("/", getAllTenants);
tenantRoute.get("/:id", getTenant);
tenantRoute.delete("/:id", deleteTenant);
tenantRoute.post("/:id", editTenant);
tenantRoute.put("/:id", renewRent);
tenantRoute.put("/toggle/:id", toggleActive);
tenantRoute.delete("/payment/:tenantId/:paymentId", deleteSinglePayment);
module.exports = tenantRoute;
