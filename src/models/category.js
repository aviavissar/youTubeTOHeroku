const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cat_name: {
      type: String,
      required: true,
    },
    videos: {
      type: Array,
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
