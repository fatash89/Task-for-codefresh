const ParseDao = require('../dao');
const useragent = require('useragent');
const {objectToSortedArray} = require('../helpers');

class ParseService {
    /**
     * parse file of users sessions, return object with parsed analytic data
     * @returns object
     */
    static async parseUsersSessions(){

        /*Use objects to group data using a data value as a key*/
        const uniqueDevices = {};
        const uniqueUserAgent = {};
        const uniqueVisitors = {};

        /*parsedFile - array of objects represented file lines*/
        const parsedFile = await ParseDao.parseUsersSessionsFile();

        parsedFile.forEach(({
            dim_device_app_combo,
            next_dim_user_agent,
            id_visitor,
            ts_min,
            ts_max
        }) => {
            /*group and count by devices*/
            this.handleDevice(dim_device_app_combo, uniqueDevices);

            /*group and count by browsers*/
            this.handleUserAgent(next_dim_user_agent, uniqueUserAgent);

            /*group visitors and get sessions durations sum*/
            this.handleVisitor({id_visitor, ts_min, ts_max}, uniqueVisitors);
        });

        /*now we need convert objects to array of objects for sorting them*/

        return {
            usersPerDevices: objectToSortedArray(uniqueDevices),
            usersPerBrowsers: objectToSortedArray(uniqueUserAgent),
            sessionPerVisitor: objectToSortedArray(uniqueVisitors, 'sum')
        };
    }

    static handleDevice(device, groupObj){
        if (device) {
            let deviceName = device.split('-')[0].trim();

            if (deviceName.length) {
                groupObj[deviceName] = groupObj[deviceName] ?
                    ++groupObj[deviceName] : 1;
            }
        }
    }

    static handleUserAgent(agent, groupObj){
        if (agent) {
            const {family, major, minor, patch} = useragent.parse(agent);

            const browserName = `${family} ${major}.${minor}.${patch}`;

            /*make sure that the property exists*/
            groupObj[browserName] = groupObj[browserName] ?
                ++groupObj[browserName] : 1;
        }
    }

    static handleVisitor({id_visitor, ts_min, ts_max}, groupObj){
        if (id_visitor) {
            /*make sure that the property exists*/
            groupObj[id_visitor] = groupObj[id_visitor] ?
                groupObj[id_visitor] : {};

            const startSession = new Date(ts_min).getTime();
            const endSession = new Date(ts_max).getTime();

            /*make sure that the property exists*/
            groupObj[id_visitor].sum = groupObj[id_visitor].sum ?
                groupObj[id_visitor].sum : 0;

            groupObj[id_visitor].sum += (endSession - startSession) / 1000;
        }
    }
}

module.exports = ParseService;