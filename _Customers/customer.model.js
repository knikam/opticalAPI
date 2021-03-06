const connection = require("../__Config/db.connection.js");

const Customer = function (customer) {
  this.first_name = customer.first_name;
  this.last_name = customer.last_name;
  this.age = customer.age;
  this.mobile_number = customer.mobile_number;
  this.address = customer.address;
  this.create_at = new Date();
  this.update_at = new Date();
  this.user_id = customer.user_id;
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
  connection.query(
    "SELECT * FROM customers WHERE id = ?",
    customerId,
    (err, res) => {
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
    }
  );
};

Customer.findByContact = (contact_id, result) =>{
  connection.query("select * from customers where mobile_number='"+contact_id+"'", (err, res)=>{
    if(err){
      console.error(err);
      result(err, null);
      return;
    }

    if(!res.length){
      console.error("customer not find with contact");
      result({kind:"not_found"},null);
      return;
    }

    console.log("Find customer by id"+contact_id);
    result(null,res);
    
  });
};

Customer.findByName = (name, result)=>{
  connection.query("select * from customers where first_name like '"+name+"' or last_name like '"+name+"'", (err, res)=>{
    if(err){
      console.error(err);
      result(err, null);
      return;
    }

    if(!res.length){
      console.error("customer not find with name");
      result({kind:"not_found"},null);
      return;
    }

    console.log("Find customer by name"+name);
    result(null,res);
    
  });
};

Customer.findByDates = (startDate, endDate, result)=>{
  connection.query("select * from customers where (create_at between '"+startDate+"' and '"+endDate+"')", (err, res)=>{
    if(err){
      console.error(err);
      result(err, null);
      return;
    }

    if(!res.length){
      console.error("customer not find with dates");
      result({kind:"not_found"},null);
      return;
    }

    console.log("Find customer by date"+startDate);
    result(null,res);
    
  });
};

Customer.getAll = (result) => {
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
  connection.query(
    "UPDATE customers SET first_name = ?,last_name=?, age = ?, address = ?, mobile_number=? WHERE mobile_number = ?",
    [customer.first_name,customer.last_name, customer.age, customer.address, customer.mobile_no, id],
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

Customer.removeAll = (result) => {
  connection.beginTransaction();
  connection.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    connection.query("ALTER TABLE customers AUTO_INCREMENT=1", (err, res) => {
      if (err) {
        connection.rollback();
        console.log("error in auto increment:", err);
        result(null, err);
        return;
      }

      connection.commit();
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  });
};

module.exports = Customer;
