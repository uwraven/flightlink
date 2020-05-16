const fs = require('fs');
const path = require('path');

function Store(file) {

    this.contents;
    this.path = file;

    const options = {
        encoding: 'utf8'
    }

    this.load = async () => {
        return new Promise((resolve, reject) => {
            fs.readFile((this.path), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        this.contents = JSON.parse(data);
                        resolve(true);
                    } catch(err) {
                        console.log("Error loading store", this.path);
                        reject(err);
                    }
                }
            })
        })
    }

    this.save = async () => {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.path, JSON.stringify(this.contents), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    }
}

module.exports = { 
    Store
}