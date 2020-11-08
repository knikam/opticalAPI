const connection = require("../_config/db.connection.js");

const Customer = function (customer) {
    this.first_name = customer.first_name;
    this.last_name = customer.last_name;
    this.age = customer.age;  
    this.mobile_number = customer.mobile_number;
    this.address = customer.address;
    this.create_at = new Date();
    this.update_at = new Date();
};

Customer.create = (new_customer, result) => {
    connection.query("INSERT INTO customers SET ?", new_customer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...new_customer });
        result(null, { id: res.insertId, ...new_customer });
  });
};


Customer.findById = (customerId, result) => {

    connection.query("SELECT * FROM customers WHERE id = ?",customerId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
  });
};


Customer.getAll = result => {

    connection.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("customers: ", res);
        result(null, res);
  });
};


Customer.updateById = (id, customer, result) => {
    connection.query("UPDATE customers SET name = ?, age = ?, address = ? WHERE mobile_no = ?",
    [customer.name, customer.age, customer.address, customer.mobile_no],
    (err, res) => {
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

        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
    }
  );
};


Customer.remove = (id, result) => {
    connection.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
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

        console.log("deleted customers with id: ", id);
        result(null, res);
  });
};


Customer.removeAll = result => {
    connection.query("DELETE FROM customer", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
  });
};


module.exports = Customer;