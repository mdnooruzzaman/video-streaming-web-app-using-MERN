const router = require("express").Router();
const { Mongoose } = require("mongoose");
const Movie = require("../Models/Movie");

const verify = require('../verifyToken')

//Create

router.post("/" , verify, async (req , res) => {
    if( req.user.isAdmin){
       const newMovie = new Movie(req.body);

       try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie)
       }catch(err){
           res.status(500).json(err)
       }
        
    } else {
        res.status(403).json("You are not allowed to create")
    }
});
//Update 

router.put("/:id" , verify, async (req , res) => {
    if(req.user.isAdmin){
       
        try{
           const updatedMovie = await Movie.findByIdAndUpdate(req.params.id ,{
               $set: req.body,
           },{
               new: true
           });

            res.status(200).json(updatedMovie)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You are not allowed to update ")
    }
});
//Delete
router.delete("/delete/:id" , verify, async (req , res) => {
    if(req.user.isAdmin){
       
        try{
           const deletedMovie = await Movie.findByIdAndDelete(req.params.id 
           )

            res.status(200).json("U have deleted the movie")
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You are not allowed to delete ")
    }
});

//Get 

router.get("/:id" ,  async (req , res) => {
   
        try{
           const getMovie = await Movie.findById(req.params.id)
            res.status(200).json(getMovie)
        }catch(err){
            res.status(500).json(err)
        }
    
});

//get all movies

router.get('/' , verify , async (req , res) => {
    if(req.user.isAdmin){
        try{
            const movie = await Movie.find();
            res.status(200).json(movie.reverse())
        }catch(err){
            res.status(500).json(err)
        }
    }else {
        res.status(403).json("You are not allowed")
    }
})

//Get Random

router.get('/one' ,   async (req , res) => {
   const typeQuery = req.query.type;
   let movie = [] ;
    try{
        movie = await Movie.findOne([
                      {notInSchema: {isSeries: typeQuery} },
                     
                  ]);
       
    //   if(typeQuery === "series"){
    //       movie = await Movie.findOne([
    //           {notInSchema: {isSeries: true} },
             
    //       ]);
    //   }else {
    //     movie = await Movie.findOne([
    //         { notInSchema: {isSeries: false} },
            
    //     ]);
    //   }

      res.status(200).json(movie)
    }catch(err){
        res.status(500).json(err)
    }

});




module.exports = router;