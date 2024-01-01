const asyncHandler = require("express-async-handler");
const Tenant = require("../models/TenantModel");

const addTenant = asyncHandler(async (req, res) => {
  // Assuming the request body contains the tenant data
  const {
    name,
    address,
    phonenumber,
    amount,
    occupation,
    altphone,
    employadd,
    paymentmethod,
    guarantorname,
    guarantoraddress,
    guarantornumber,
    rentstart,
    rentend,
  } = req.body;

  try {
    // Create a new tenant using the Tenant model
    const newTenant = await Tenant.create({
      name,
      address,
      phonenumber,
      occupation,
      amount,
      altphone,
      employadd,
      paymentmethod,
      guarantor: {
        guarantorname,
        guarantoraddress,
        guarantornumber,
      },
      rent: {
        rentstart,
        rentend,
      },
    });

    res.status(201).json({
      success: true,
      data: newTenant,
    });
  } catch (error) {
    console.error("Error adding tenant:", error);
    res.status(500).json({
      success: false,
      error: "Error adding tenant",
    });
    throw new Error ("Error adding tenant")
  }
});

module.exports = {
  addTenant
}
