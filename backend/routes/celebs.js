
let CelebModel = require('../models/celeb');


// get all items in the db
module.exports.all = async (req, res) => {

    CelebModel.find({done:0},function (err, Celebs) {
        if (err) {
            res.status(404).send(err.stack);
            console.log('fail!')
        }
        console.log('get all success!')
        res.json(Celebs) // return all Celebs
      })    
}

// add item to db
module.exports.add = async (req, res) => {
    
    CelebModel.create(
        {
          name: req.body.name,
          done: 0
        },
        function (error, Celebs) {
          if (error) {
            console.log('add fail!')
            res.status(400).send('Unable to create Celebrity list')
          }
          res.status(200).json(Celebs)
          console.log('add success!')
        }
      )   
}
// delete item from db
module.exports.del = async (req, res) => {
    
    try {
      console.log('delete success!')
      res.status(200).send( await CelebModel.findOneAndDelete({_id: req.params.celebId}));
    } catch(err) {
      res.status(404).send(err.stack);
    }
}
// update item from db
module.exports.update = async (req, res) => {
    
    var id = req.params.celebId
    CelebModel.findById(id, function (error, Celebs) {
      if (error) {
        console.log('fail!')
        return next(new Error('Celebrity was not found'))
      } else {
        Celebs.name = req.body.name
        Celebs.save({
          function (error, Cabin) {
            if (error) {
                console.log('update fail!')
              res.status(400).send('Unable to update Celebrity')
            } else {
              res.status(200).json(Cabin)
              console.log('update success!')
            }
          }
        })
      }
    })  
}
// update seenitem from db
module.exports.seen = async (req, res) => {
    
    var id = req.params.celebId
    CelebModel.findById(id, function (error, Celebs) {
      if (error) {
        console.log('fail!')
        return next(new Error('Celebrity was not found'))
      } else {

        Celebs.done = 1;
  
        Celebs.save({
          function (error, Cabin) {
            if (error) {
                console.log('update fail!')
              res.status(400).send('Unable to update Celebrity')
            } else {
              res.status(200).json(Cabin)
              console.log('update success!')
            }
          }
        })
      }
    })  
}
// get seen items in the db
module.exports.seenList = async (req, res) => {
    
    CelebModel.find({done:1},function (err, Celebs) {
        if (err) {
            res.status(404).send(err.stack);
            console.log('fail!')
        }
        console.log('success!')
        res.json(Celebs) // return all Celebs
      })    
}