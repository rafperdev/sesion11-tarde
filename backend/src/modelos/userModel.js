const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcryptjs");

const userSchema = new Schema({
    usuario: {
        type: "string",
        required: true,
        unique: true,
        max: 100
    },
    password: {
        type: "string",
        required: true,
        min: 6
    },
    rol: {
        type: "string",
        required: true
    }
});

userSchema.pre("save", async function (next) {
    const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
    this.password = await hash(this.password, salt);
    next();
})

const userModel = model("users", userSchema);

exports.userModel = userModel;