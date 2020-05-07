const fs = require('fs');
const path = require('path');

function Store(file) {

    this.contents;

    const options = {
        encoding: 'utf8'
    }

    this.load = () => {
        fs.read(file, options, (err, data) => {
            // TODO:: this whole thing is implemented poorly af rn
            if (err) {
                // File *probably* does not exist
                console.log(err);
                return false;
            }
            this.contents = JSON.parse(data);
            return true;
        })
    }
}

module.exports = {
    default: Store
}