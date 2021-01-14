const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../__Config/db.connection.js");
const config = require("../__Config/key.js");

const User = function (user) {
  (this.name = user.name),
    (this.address = user.address),
    (this.email_id = user.email_id),
    (this.mobile_number = user.mobile_number),
    (this.password = user.password),
    (this.registration_no = user.registration_no),
    (this.shop_name = user.shop_name),
    (this.shop_gst_no = user.shop_gst_no),
    (this.active = 1),
    (this.create_at = user.create_at),
    (this.update_at = new Date());
};

User.create = (new_user, result) => {
  connection.query(
    "select * from users where email_id='" +
      new_user.email_id +
      "' or mobile_number='" +
      new_user.mobile_number +
      "'",
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.error("Username already exist");
        result({ kind: "already_exist" }, null);
        return;
      }

      bcrypt.hash(new_user.password, 10, (herr, hash) => {
        if (herr) {
          console.error(herr);
          result(herr, null);
          return;
        }

        new_user.password = hash;
        connection.query("INSERT INTO users SET ?", new_user, (err, res) => {
          if (err) {
            console.error(err);
            result(err, null);
            return;
          }

          console.log("create user : ", { id: res.insertId, ...new_user });
          result(null, { id: res.insertId, ...new_user });
        });
      });
    }
  );
};

User.findById = (user_id, result) => {
  connection.query(
    "SELECT * FROM users WHERE id ='" + user_id + "'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

User.findByUsername = (username, result) => {
  connection.query(
    "select * from users where email_id='" +
      username +
      "' or mobile_number='" +
      username +
      "'",
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }

      if (!res.length) {
        console.error("user not found with this username" + username);
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("user found with username" + username);
      result(null, res);
    }
  );
};

User.getAll = (result) => {
  connection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  connection.query(
    "UPDATE users SET name = ?, address = ?, email_id = ?, mobile_number = ?, shop_name = ?, update_at = ? WHERE id = ?",
    [
      user.name,
      user.address,
      user.email_id,
      user.mobile_number,
      user.shop_name,
      new Date(),
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  connection.query(`DELETE FROM users WHERE id =${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted users with id: ", id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  connection.beginTransaction();

  connection.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    connection.query("ALTER TABLE users AUTO_INCREMENT=1", (error, resp) => {
      if (error) {
        connection.rollback();
        console.error(error);
        result(error, null);
        return;
      }

      connection.commit();
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  });
};

User.validate = (username, password, result) => {
  connection.query(
    "Select * from users where email_id='" +
      username +
      "' or mobile_number='" +
      username +
      "'",
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null, null);
        return;
      }

      if (!res.length) {
        result({ kind: "id_not_found" }, null, null);
        return;
      }

      bcrypt.compare(password, res[0]["password"], (berr, bres) => {
        if (berr) {
          result({ kind: "password_not_found" }, null, null);
          return;
        }

        if (bres) {
          const token = jwt.sign(
            {
              username: res[0].username,
            },
            config.secret,
            {
              expiresIn: "1d",
            }
          );

          result(null, res[0], token);
          return;
        }

        result({ kind: "not_found" }, null, null);
      });
    }
  );
};

module.exports = User;
