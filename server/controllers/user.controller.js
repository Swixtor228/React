const db = require('../models');
const User = db.users;

exports.getAll = (req, res) => { //SELECT * FROM users;
    User.findAll({raw:true}).then((users)=>{
        console.log(users);
        res.send(users); 
    }).catch(err=>console.log(err));
    
}
exports.createUser = (req, res) => { //INSERT INTO users(name, phone)
    console.log(req.body);
    const user = req.body;
    User.create(user).then((users)=>{
        res.send(users)
    }).catch(err=>console.log(err));
}
exports.deleteUser = (req,res) => { //DELETE FROM users WHERE name=?
    const id = +req.params.id
    User.destroy({
        where: {
         id: id
        }
      }).then(() => {
        res.send('DELETED');
      });
}