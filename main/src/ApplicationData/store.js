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
                    reject(false);
                } else {
                    try {
                        this.contents = JSON.parse(data);
                        console.log(this.contents);
                        resolve(true);
                    } catch(err) {
                        console.log("Error loading store", this.path);
                        reject(false);
                    }
                }
            })
        })
    }

    this.save = async () => {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.path, JSON.stringify(this.contents), (err) => {
                if (err) {
                    reject(false);
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