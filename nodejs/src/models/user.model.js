'use strict';

var dbconn = require("./../../config/db.config");

var User = function(user) {
    this.firstname = user.fname;
    this.lastname =  user.lname;
    this.email = user.email;
    this.password = user.password;
};

User.create = function(newUser, result) {
    dbconn.query("INSERT INTO users SET ?", newUser, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res.insertId);
        }
    })
}

User.findUser = function(params, result) {
    let {email, password} = params;
    dbconn.query(
        "SELECT user_id, firstname FROM users WHERE email = ? AND password = ?", 
        [email, password], 
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
}

module.exports = User;