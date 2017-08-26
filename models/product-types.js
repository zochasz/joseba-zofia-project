const mongoose      = require("mongoose");
const Schema        = mongoose.Schema;

const ProductTypeSchema  = new Schema({
  key             : { type: String, required: true, unique: true },
  name            : { type: String, required: true},
  image600        : { type: String, required: true},
  image1200       : { type: String, required: true},
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const ProductType = mongoose.model("ProductType", ProductTypeSchema);

module.exports = ProductType;
