const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: String,
    invoice: String,

})

module.exports = expenseSchema