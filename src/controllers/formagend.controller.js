const FormAgendModel = require("../models/FormAgend.model");

class FormAgendController {
    async index(req, res) {
        const users = await FormAgendModel.find();

        res.send({ data: users });
    }

    async store(req, res) {

        const body = {
            ...req.body,
            dataNascimento: new Date(req.body.dataNascimento),
            selectedDate: new Date(req.body.selectedDate),
        }

        const timeAgend = await FormAgendModel.find({
            selectedDate: body.selectedDate,
        })
        
        const min = new Date(
            body.selectedDate.getFullYear(),
            body.selectedDate.getMonth(),
            body.selectedDate.getDate(),
            0,
            0,
            0,
            0
        )
        
        const max = new Date(
            min.getFullYear(),
            min.getMonth(),
            min.getDate() + 1,
            0,
            0,
            0,
            0
        )





        const limitAgend = await FormAgendModel.find({
            selectedDate: { $gte: min, $lte: max },
        })

        if (limitAgend.length > 19){
            return (res.status(400).json({ message: 'Vagas expiradas na data selecionada.' }))
        }
        if (timeAgend.length > 1){
            return (res.status(400).json({ message: 'Vagas expiradas horário selecionado.' }))
        } 
        
        const user = await FormAgendModel.create(body);

        
        return res.send({ data: user });
    }



    async remove(req, res) {
        const { id } = req.params;
        try {
        const user = await FormAgendModel.findById(id);

        if (!user) {
            return res.send({ message: "User not exist" });
        }

        await user.remove();

        res.send({ message: "User removed" });
        } catch (error) {
        res.status(400).send({ message: error.message });
        }
    }
}
  
  module.exports = new FormAgendController();