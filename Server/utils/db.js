import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eventease",
    port: 3306
})

con.connect(function(err) {
    if(err) {
        console.log("connection error", err)
    } else {
        console.log("Connected")
    }
})

export default con;


