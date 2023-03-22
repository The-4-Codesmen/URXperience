const mongoose = require("mongoose");

//User Schema
const recipeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    recipeId: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("myRecipe", recipeSchema);
