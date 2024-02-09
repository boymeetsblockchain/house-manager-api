const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  amount :{
    type:String,
    required:true
  },
  phonenumber: {
    type: Number,
  },
  occupation: {
    type: String, 
  },
  altphone: {
    type: Number,
  },
  duration :{
    type: String,
  },
  employadd: {
    type: String,
  },
  paymentmethod: {
    type: String,
  },
  apartmentLocation:{
    type: String,
  },
  cautionFee:{
    type:Boolean,
  },
  source:{
    type: String,
  },
  guarantor: {
    guarantorname: { type: String, required: true },
    guarantoraddress: { type: String, required: true },
    guarantornumber: { type: Number, required: true }
  },
  rent: {
    rentstart: { type: Date, required: true },
    rentend: { type: Date, required: true }
  },
  imageUrl:{
    type: String,
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Tenant', tenantSchema);
