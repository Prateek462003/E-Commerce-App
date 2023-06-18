const router = require("express").Router();
const Cart = require("../Models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// create
router.post("/", verifyToken, async(req, res)=>{
    const cart = new Cart(req.body);
    try{
        const savedcart = await cart.save();    
        res.status(200).json(savedcart);
    }catch(err){
        res.status(500).json(err);
    }
});

// read
router.get("/find/:userid", verifyTokenAndAuthorization, async(req, res)=>{
    try {
        const carts = await Cart.findOne(
            {
                userId:req.params.userid,
            }
        );
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});
// read all
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    // const query = req.query.new;
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);        
    }catch(err){
        res.status(500).json(err);
    }
})

/
// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedcart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );
        res.status(200).json(updatedcart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedcart = await Cart.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletedcart);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router; 