const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({
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

const productosModel = mongoose.model("productos",productoSchema);
exports.productosModel = productosModel;