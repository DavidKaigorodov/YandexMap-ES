const {Station} = require('../models/models.js');

class StationController {
    async getAll(req, res) {
        try {
            const stations = await Station.findAll();
            return res.json(stations);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new StationController();
