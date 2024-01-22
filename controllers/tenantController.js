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
    source,
    cautionFee,
    apartmentLocation,
    duration,
    imageUrl
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
      cautionFee,
      source,
      duration,
      apartmentLocation,
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
      imageUrl
    });

    res.status(201).json({
      success: true,
      data: newTenant,
    });
  } catch (error) {
    console.error("Error adding tenant:", error);
    res.status(500).json({
      success: false,
      error: error,
    });
    throw new Error ("Error adding tenant")
  }
});


const getAllTenants = asyncHandler(async (req, res) => {
  try {
    // Fetch all tenants from the Tenant model
    const tenants = await Tenant.find();

    res.status(200).json({tenants});
  } catch (error) {
    console.error("Error fetching tenants:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching tenants",
    });
    throw new Error("Error fetching tenants");
  }
});

const getTenant = asyncHandler(async(req,res)=>{
  const tenant = await Tenant.findById(req.params.id);
  if (tenant) {
    return res.json(tenant);
  } else {
    
    res.status(404);
    throw new Error('Tenant not found');
  }
})
const deleteTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findByIdAndDelete(req.params.id);

  if (tenant) {
    res.json({ success: true, message: 'Tenant deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Tenant not found');
  }
});



const editTenant = asyncHandler(async (req, res) => {
  const { id } = req.params; // Assuming tenantId is part of the route params
  const {
    name,
    address,
    phonenumber,
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
    // Find the tenant by ID
    const existingTenant = await Tenant.findById(tenantId);

    if (!existingTenant) {
      res.status(404).json({
        success: false,
        error: "Tenant not found",
      });
      return;
    }

    // Update the tenant's fields
    existingTenant.name = name || existingTenant.name;
    existingTenant.address = address || existingTenant.address;
    existingTenant.phonenumber = phonenumber || existingTenant.phonenumber;
    existingTenant.occupation = occupation || existingTenant.occupation;
    existingTenant.altphone = altphone || existingTenant.altphone;
    existingTenant.employadd = employadd || existingTenant.employadd;
    existingTenant.paymentmethod = paymentmethod || existingTenant.paymentmethod;
    existingTenant.guarantor = {
      guarantorname: guarantorname || existingTenant.guarantor.guarantorname,
      guarantoraddress: guarantoraddress || existingTenant.guarantor.guarantoraddress,
      guarantornumber: guarantornumber || existingTenant.guarantor.guarantornumber,
    };
    existingTenant.rent = {
      rentstart: rentstart || existingTenant.rent.rentstart,
      rentend: rentend || existingTenant.rent.rentend,
    };

    // Save the updated tenant
    const updatedTenant = await existingTenant.save();

    res.status(200).json({
      success: true,
      data: updatedTenant,
    });
  } catch (error) {
    console.error("Error editing tenant:", error);
    res.status(500).json({
      success: false,
      error: "Error editing tenant",
    });
  }
});



module.exports = {
  addTenant,
  getAllTenants,
  getTenant,
  deleteTenant,
  editTenant
}
