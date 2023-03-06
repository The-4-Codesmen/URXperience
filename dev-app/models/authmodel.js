const mongoose = require("mongoose");
const crypto = require("crypto"); // for encrypting password

//User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    hash_password: {
      //password will be saved as hash after encryption
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      //there will be one for students(normal) and RAs()
      default: "Normal",
    },
    newMessages: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "offline",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true, minimize: false }
);

//Virtual Password
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hash_password = this.encryptedPass(password);
  })
  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  //comparing password to hased password
  authenticate: function (plainPass) {
    return this.encryptedPass(plainPass) === this.hash_password;
  },
  //encrypt password
  encryptedPass: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
  //generate salt for password
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
