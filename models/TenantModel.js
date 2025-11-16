const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
  },
  comment: {
    type: String,
  },
  receiptUrl: {
    type: String,
  },
});

const utilitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  datePaid: {
    type: Date,
    default: Date.now,
  },
});

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    amount: {
      type: String,
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
    altphonetwo: {
      type: Number,
    },
    duration: {
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
    apartmentLocation: {
      type: String,
    },
    cautionFee: {
      type: Boolean,
    },

    cautionFeePaid: {
      type: Number,
    },
    cautionFeeComment: {
      type: String,
    },
    cautionFeeDate: {
      type: String,
    },
    hasExpired: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
    },

    guarantor: {
      guarantorname: { type: String },
      guarantoraddress: { type: String },
      guarantornumber: { type: Number },
      guarantorrelationship: { type: String },
    },
    rent: {
      rentstart: { type: Date },
      rentend: { type: Date },
    },
    payments: [paymentSchema],
    utilities: [utilitySchema],
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tenant", tenantSchema);
