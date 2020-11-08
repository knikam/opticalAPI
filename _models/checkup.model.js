const connection = require("../_config/db.connection");

const Checkup = function (checkup) {
    
    this.spa_dv = checkup.spa_dv;
    this.cyl_dv = checkup.cyl_dv;
    this.axis_dv = checkup.axis_dv;
    this.va_dv = checkup.va_dv;

    this.spa_nv = checkup.spa_nv;
    this.cyl_nv = checkup.cyl_nv;
    this.axis_nv = checkup.axis_nv;
    this.va_nv = checkup.va_nv;

    this.spa_add = checkup.spa_add;
    this.cyl_add = checkup.cyl_add;
    this.axis_add = checkup.axis_add;
    this.va_add = checkup.va_add;

    this.eye_side = checkup.eye_side;
};

Checkup.create = (new_checkup, result)=>{

    connection.query("INSERT INTO checkups SET ?",new_checkup,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }

        console.log("Create checkUp : ", {id : res.insertId, ...new_checkup});
        result(null,{id : res.insertId, ...new_checkup})
    });
};

Checkup.findAll = result =>{

    connection.query("SELECT * from checkups",(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
         console.log("CheckUps : ", res);
         result(null, res);
    });
};

Checkup.findById = (id, result)=>{
    
    connection.query(`select * from checkups where id = ${id}`,(err,res)=>{
        
        if(err){
            console.log(err);
            result(err,null);
            return;
        }

        if(res.length){
            console.log("found checkup: ", res[0]);
            result(null, res[0]);
            return;
        }

         // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Checkup.remove = (id, result) =>{
    connection.query("delete from checkups where id = ?",id,(err, res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("delete checkup with Id : ", id);
        result(null, res)
    });
}

Checkup.removeAll = result =>{
    connection.query("delete from checkups",(err, res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }

       console.log(`deleted ${res.affectedRows} checkups`);
        result(null, res);
    });
}

module.exports = Checkup;