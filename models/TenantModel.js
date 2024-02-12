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
  paymenttype: {
    type: String,
  },
  comment: {
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
    guarantorname: { type: String,  },
    guarantoraddress: { type: String,  },
    guarantornumber: { type: Number,  }
  },
  rent: {
    rentstart: { type: Date,  },
    rentend: { type: Date,  }
  },
  imageUrl:{
    type: String,
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Tenant', tenantSchema);
