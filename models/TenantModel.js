const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  amount :{
    type:String,
    required:true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  occupation: {
    type: String, // Adjust this based on your requirements
    required: true
  },
  altphone: {
    type: Number,
    required: true
  },
  employadd: {
    type: String,
    required: true
  },
  paymentmethod: {
    type: String,
    required: true
  },
  guarantor: {
    guarantorname: { type: String, required: true },
    guarantoraddress: { type: String, required: true },
    guarantornumber: { type: Number, required: true }
  },
  rent: {
    rentstart: { type: Date, required: true },
    rentend: { type: Date, required: true }
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Tenant', tenantSchema);
