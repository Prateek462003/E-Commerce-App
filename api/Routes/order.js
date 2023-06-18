const router = require("express").Router();
const Order = require("../Models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// create
router.post("/", verifyToken, async(req, res)=>{
    const order = new Order(req.body);
    try{
        const savedorder = await order.save();    
        res.status(200).json(savedorder);
    }catch(err){
        res.status(500).json(err);
    }
});
// read
router.get("/find/:userid", verifyTokenAndAuthorization, async(req, res)=>{
    try {
        const orders = await Order.find(
            {
                userId:req.params.userid,
            }
        );
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});
// read all
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    // const query = req.query.new;
    try{
        const orders = await Order.find();
        res.status(200).json(orders);        
    }catch(err){
        res.status(500).json(err);
    }
})

// get income
router.get("/income", verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth())-1);
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try{
        const income = await Order.aggregate(
            {$match:{createdAt:{$gte:previousMonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount"
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{sum:{$sales}},
                },
            },
        );
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
})

// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedorder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );
        res.status(200).json(updatedorder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedorder = await Order.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletedorder);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;