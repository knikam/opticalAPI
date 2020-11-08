const connection = require("../_config/db.connection");

const Bill = function(bill) {

    this.delivery_date = bill.delivery_date,
    this.type_of_lens = bill.type_of_lens,
    this.frame = bill.frame,
    this.total_amount = bill.total_amount,
    this.advance_amount = bill.advance_amount,
    this.balance_amount = bill.balance_amount,
    this.create_at = new Date(),
    this.update_at = new Date()
};

Bill.create = (new_bill,result)=>{
    connection.query("INSERT INTO bills SET ?",new_bill,(err, res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("create bill :",{id: res.insertId, ...new_bill});
        result(null, {id: res.insertId, ...new_bill});
    });
};

Bill.findAll = result =>{
    connection.query("SELECT * FROM bills",(err, res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }

        console.log("bills : ", res);
        result(null,res)
    });
};

Bill.findById = (id, result)=>{
    connection.query(`SELECT * FROM bills where id = ${id}`,(err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found bill: ", res[0]);
            result(null, res[0]);
            return;
        }

         // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
}

Bill.remove = (id, result)=>{
    connection.query(`DELETE FROM bills where id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null,res);
    });
};

Bill.remove = (id, result)=>{
    connection.query(`DELETE FROM bills where id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null,res);
    });
}

Bill.removeAll = result =>{
    connection.query(`DELETE FROM bills`,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null,res);
    });
}

module.exports = Bill;


