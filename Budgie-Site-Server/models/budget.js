/*
Budget model contains:
-Cycle Amount
-Remaining Amount
-Reset Date
-Purchase History
*/


var mongoose = require('mongoose');

var budgetSchema = new mongoose.Schema({
    cycle_amount: Number,
    remaining_amount: Number,
    spent_amount: Number,
    reset_date: Date,
    history: [
        {
            description: String,
            amount: Number,
            transaction_date: Date
        }
    ]
});

var Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;