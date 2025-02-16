const asyncHandler = require("express-async-handler");
const Tenant = require("../models/TenantModel");

const addTenant = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    phonenumber,
    amount,
    occupation,
    altphone,
    altphonetwo,
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
    imageUrl,
    comment,
    paymenttype,
  } = req.body;

  try {
    const newTenant = await Tenant.create({
      name,
      address,
      phonenumber,
      occupation,
      amount,
      altphone,
      altphonetwo,
      employadd,
      cautionFee,
      source,
      duration,
      apartmentLocation,
      paymentmethod,
      paymenttype,
      comment,
      guarantor: {
        guarantorname,
        guarantoraddress,
        guarantornumber,
      },
      rent: {
        rentstart,
        rentend,
      },
      imageUrl,
      payments: [
        {
          amountPaid: amount,
          paymentDate: new Date(),
          paymentMethod: paymentmethod,
          comment: comment,
          receiptUrl: imageUrl,
        },
      ],
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
  }
});

const getAllTenants = asyncHandler(async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.status(200).json({ tenants });
  } catch (error) {
    console.error("Error fetching tenants:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching tenants",
    });
  }
});

const getTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (tenant) {
    return res.json(tenant);
  } else {
    res.status(404);
    throw new Error("Tenant not found");
  }
});

const deleteTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findByIdAndDelete(req.params.id);

  if (tenant) {
    res.json({ success: true, message: "Tenant deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Tenant not found");
  }
});

const editTenant = asyncHandler(async (req, res) => {
  const { id: tenantId } = req.params;
  const {
    name,
    address,
    phonenumber,
    occupation,
    altphone,
    altphonetwo,
    employadd,
    paymentmethod,
    guarantorname,
    guarantoraddress,
    guarantornumber,
    rentstart,
    rentend,
    imageUrl,
    comment,
    paymenttype,
  } = req.body;

  try {
    const existingTenant = await Tenant.findById(tenantId);

    if (!existingTenant) {
      return res
        .status(404)
        .json({ success: false, error: "Tenant not found" });
    }

    existingTenant.name = name || existingTenant.name;
    existingTenant.address = address || existingTenant.address;
    existingTenant.phonenumber = phonenumber || existingTenant.phonenumber;
    existingTenant.occupation = occupation || existingTenant.occupation;
    existingTenant.altphone = altphone || existingTenant.altphone;
    existingTenant.altphonetwo = altphonetwo || existingTenant.altphonetwo;
    existingTenant.employadd = employadd || existingTenant.employadd;
    existingTenant.imageUrl = imageUrl || existingTenant.imageUrl;
    existingTenant.paymentmethod =
      paymentmethod || existingTenant.paymentmethod;
    existingTenant.paymenttype = paymenttype || existingTenant.paymenttype;
    existingTenant.comment = comment || existingTenant.comment;
    existingTenant.guarantor = {
      guarantorname: guarantorname || existingTenant.guarantor.guarantorname,
      guarantoraddress:
        guarantoraddress || existingTenant.guarantor.guarantoraddress,
      guarantornumber:
        guarantornumber || existingTenant.guarantor.guarantornumber,
    };
    existingTenant.rent = {
      rentstart: rentstart || existingTenant.rent.rentstart,
      rentend: rentend || existingTenant.rent.rentend,
    };

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

const renewRent = asyncHandler(async (req, res) => {
  const { id: tenantId } = req.params;
  const { rentstart, rentend, amount, paymentMethod, comment, receiptUrl } =
    req.body;

  try {
    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
      return res
        .status(404)
        .json({ success: false, error: "Tenant not found" });
    }

    // Update rent details
    tenant.rent.rentstart = rentstart || tenant.rent.rentstart;
    tenant.rent.rentend = rentend || tenant.rent.rentend;
    tenant.amount = amount || tenant.amount;

    // Add new payment record
    tenant.payments.push({
      amountPaid: amount,
      paymentDate: new Date(),
      paymentMethod: paymentMethod || tenant.paymentmethod,
      comment,
      receiptUrl,
    });

    const updatedTenant = await tenant.save();

    res.status(200).json({
      success: true,
      message: "Rent renewed successfully",
      data: updatedTenant,
    });
  } catch (error) {
    console.error("Error renewing rent:", error);
    res.status(500).json({
      success: false,
      error: "Error renewing rent",
    });
  }
});

const deleteSinglePayment = asyncHandler(async (req, res) => {
  const { tenantId, paymentId } = req.params;

  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      tenantId,
      { $pull: { payments: { _id: paymentId } } },
      { new: true }
    );

    if (!updatedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res
      .status(200)
      .json({ message: "Payment deleted successfully", tenant: updatedTenant });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const toggleActive = asyncHandler(async (req, res) => {
  const { id: tenantId } = req.params;
  if (!tenantId) {
    return res.status(400).json({ message: "Tenant ID is required" });
  }
  try {
    const findtenantandUpdate = await Tenant.findByIdAndUpdate(tenantId, {
      hasExpired: true,
    });
    res.status(200).json({ message: "Tenant updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = {
  addTenant,
  getAllTenants,
  getTenant,
  deleteTenant,
  editTenant,
  renewRent,
  deleteSinglePayment,
  toggleActive,
};
