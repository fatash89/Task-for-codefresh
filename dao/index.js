const fs = require('fs');
const readFileAsync = require('util').promisify(fs.readFile);
const {createFileRowsStructure} = require('../helpers');

class ParseDao {
    static async parseUsersSessionsFile(){
        const readedBuffer = await readFileAsync('./airbnb_session_data.txt');

        return createFileRowsStructure(readedBuffer.toString().split('\n'));
    }
}
module.exports = ParseDao;
