const mongoose = require('mongoose');

const { Schema } = mongoose;

const SymbolSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Symbol = mongoose.model('Symbol', SymbolSchema);

module.exports = Symbol;
