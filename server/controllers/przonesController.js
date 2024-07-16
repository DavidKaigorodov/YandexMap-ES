
const {Zone} = require('../models/models.js');

class przonesController {
    async getAll(req, res) {
        try {
            const zones = await Zone.findAll();
            return res.json(zones);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new przonesController();
