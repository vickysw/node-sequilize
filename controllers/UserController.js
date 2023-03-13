// const { Sequelize } = require("sequelize");

const {User} = require("../models/UserModel");
const {getPagination,getPagingData} = require('../models/pagination');

// const readXlsxFile = require("read-excel-file/node"); 
const bcrypt = require("bcrypt");

/* exports.upload = async (req,res) => {

    try{
    if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
  
      let path =
        __basedir + "/assets/uploads/" + req.file.filename;

        readXlsxFile(path).then((rows)=>{
        rows.shift();

        let books = [];

        rows.forEach((row) => {
            let book = {
              title: row[0],
              price: row[1],
              authorName: row[2],
            };
    
            books.push(book);
          });

          User.bulkCreate(books).then(()=>{
            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
              });
          }).catch((error)=>{
            res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
          })

    })
    }catch(error) {
        console.log(error);
        res.status(500).send({
          message: "Could not upload the file: " + req.file.originalname,
        });
    }
} ; */
// Create and Save a new Books
exports.create = (req, res) => {
 
};

// Retrieve all Bookss from the database.
exports.findAll = (req, res) => {
    const { page, size, title } = req.query;
    // const title = req.query.title;
     var condition = title ? { title: { [like]: `%${title}%` } } : null;

    const { limit, offset } = getPagination(page, size);
    User.findAndCountAll({attributes: ['id', 'title','authorName'],where:condition,limit,offset})
        .then((data)=>{
            const response = getPagingData(data, page, limit);
            res.send(response)})
        .catch((err)=>{
            res.status(500).send({
                message:err.message || 'Some error occured while retrieving books'
            })
        })
};
// Retrieve all Bookss from the database.
exports.findAllRecords = (req, res) => {
    const title = req.query.title;
     var condition = title ? { title: { [like]: `%${title}%` } } : null;

    User.findAll({attributes: ['id', 'title','authorName'],where:condition})
        .then((data)=>{
            res.send(data)})
        .catch((err)=>{
            res.status(500).send({
                message:err.message || 'Some error occured while retrieving books'
            })
        })
};

// Find a single Books with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id).then(data=>{
        res.send(data)}).catch(err=>{
            res.status(500).send({
                message:err.message || 'Some error occured while retrieving book'
            })
        
    })
};

// Update a Books by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body,{
        where: { id: id }
    }).then(num=>{
        if(num==1){
            res.send({message:"Book Upodated successfully"});
        }else{
            res.send({message:"Could not updated book"});
        }
    }).catch(err=>{
        res.status(500).send({
            message:"Error while updating User."
        });
    })
}

// Delete a Books with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    User.destroy({
        where:{id:id}
    }).then(num=>{
        if(num==1)
        {
            res.status({message:"book deleted successfully."})
        }else{
            res.status({message:"could not deleted User."})
        }
    }).catch(err=>{
        res.status(500).send({
            message:"Error while deleting User."
        })
    })
};

// Delete all Bookss from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where:{},
        Truncate:false
    }).then(num=>{     
            res.status({message:"could not deleted User."})
    }).catch(err=>{
        res.status(500).send({
            message:"Error while deleting User."
        })
    })
};
