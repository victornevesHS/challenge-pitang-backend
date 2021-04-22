const mongoose = require ('mongoose');

const FormAgendSchema= new mongoose.Schema({
    name: String,
    dataNascimento: Date,
    selectedDate: Date,



  }, {
    timestamps: true,
  });
  

  const FormAgendModel = mongoose.model('FormAgend', FormAgendSchema);
  
  module.exports = FormAgendModel;