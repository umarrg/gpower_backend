const UserModel = require('../model/user.model');

class userController {
    constructor() { }

    addNewUser(obj) {
        return new Promise((resolve, reject) => {
            let newUser = new UserModel(obj);
            newUser.save((err, saved) => {
                if (err) {
                    reject(err);
                }
                resolve(newUser);
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            UserModel.find((err, allusers) => {
                if (err) {
                    reject(err)
                }
                resolve(allusers);
            })
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(id, (err, singleuser) => {
                if (err) {
                    reject(err)
                }
                resolve(singleuser);
            })
        });
    }

   

    update(id, username, email) {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(id, { $set: { username, email, } }, { new: true }, (err, result) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    }
  
   
    getOneByEmail(email) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email }, (err, singleUser) => { //password included here
                if (err) {
                    reject(err);
                }
                resolve(singleUser);
            });
        });
    }



    deleteUser(id) {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndDelete(id, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(' User Deleted Successfully');
            });
        });
    }

    deleteAllUsers() {
        return new Promise((resolve, reject) => {
            UserModel.deleteMany((err, allUsers) => {
                if (err) {
                    reject(err)
                }
                resolve(allUsers);
            });
        });
    }
}

module.exports = new userController();