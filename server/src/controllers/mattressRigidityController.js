const { MattressRigidity } = require("../models");

class MattressRigidityController {
    async getAll(req, res) {
        try {
            const rigidities = await MattressRigidity.findAll();
            if (!rigidities.length) {
                return res.status(404).json({ error: "Rigidities not found" });
            }
            res.json(rigidities);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const rigidity = await MattressRigidity.findByPk(id);
            if (!rigidity) {
                return res.status(404).json({ error: "Rigidity not found" });
            }
            res.json(rigidity);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = new MattressRigidityController();
