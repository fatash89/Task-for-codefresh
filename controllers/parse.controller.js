const ParseService = require('../services');

class ParseController {
    static async parseUsersSessions(req, res){
        try {
            const data = await ParseService.parseUsersSessions();
            res.json({data});
        } catch (e) {
            console.log(e);
            res.json({data: null, errorMessage: 'Sorry, an error occurred while parsing users sessions file'});
        }
    }
}

module.exports = ParseController;