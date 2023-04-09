
const sqlite = require('sqlite3').verbose();

class databasemanager
{
    db = null;

    openDB()
    {
        this.db = new sqlite.Database('./Database/database.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            else
            {
                console.log('Connected to the quotes database.');
            }

        });
    }

    closeDB()
    {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            else
            {
                console.log('Closed the database connection.');
            }
        });
    }

    addtoDB(id, quote, approved)
    {        

        this.db.all("INSERT INTO quotes (id, quote, approved) VALUES (?, ?, ?)", [id, quote, approved], (err, rows) => {
            if (err) {
                throw err;  
            }
            rows.forEach((row) => {
                console.log(row.id + "\t" + row.quote + "\t" + row.approved);
            });
            console.log("Added to database");
        });
        this.closeDB();
    }

    getfromDB(id)
    {
        //code to get from database
    }

    updateDB(id, quote, approved)
    {
        //code to update database
    }

    deletefromDB(id)
    {
        //code to delete from database
    }

    getallfromDB()
    {
        //code to get all from database
    }

    getallapprovedfromDB()
    {
        //code to get all approved from database
        return new Promise((resolve, reject) => {
            const d = this.openDB();

            this.db.all("SELECT * FROM quotes WHERE approved = 1", (err, rows) => {
                if (err) 
                {
                    reject(err);
                }
                else
                {
                    resolve(rows);
                }
            });
        });
    }

    gethighestidfromDB()
    {
        return new Promise((resolve, reject) => {
            const d = this.openDB();
            this.db.get("SELECT id FROM quotes ORDER BY id DESC LIMIT 1", (err, row) => {
                if (err) {
                    reject(err);
                }
                else
                {
                    resolve(row["id"]);
                }
            });
        });
    }

}

module.exports = new databasemanager;