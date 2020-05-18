const fs = require('fs');

function Store(file) {

    this.contents;
    this.path = file;

    const options = {
        encoding: 'utf8'
    }

    this.load = async () => {
        fs.readFile(this.path, (err, data) => {
            if (err) throw Error(err);
            try { 
                this.contents = JSON.parse(data);
                return;
            } catch(err) {
                console.log("Error parsing json", this.path);
                throw Error("Error parsing json")
            }
        })
    }

    this.save = async () => {
        fs.writeFile(this.path, JSON.stringify(this.contents), (err) => {
            if (err) throw Error(err);
            return;
        });
    }

    this.exists = () => {
        return fs.existsSync(this.path)
    }

    this.validJSON = async () => {
        fs.readFile(this.path, (err, data) => {
            if (err) { throw Error(err) }
            try {
                JSON.parse(data);
                return true;
            } catch(err) {
                return false;
            }
        })
    }
}

module.exports = Store