const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productosModel = new Schema({
    nombre: {
        type: "string",
        unique: true,
        required: true
    },
    precio: {
        type: "number",
        required: true
    },
    stock: {
        type: "number",
        require: true
    }
});

module.exports = mongoose.model("Productos", productosModel);