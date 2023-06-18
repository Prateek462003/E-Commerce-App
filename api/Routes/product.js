const router = require("express").Router();
const Product = require("../Models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// create
router.post("/", verifyTokenAndAdmin, async(req, res)=>{
    const product = new Product(req.body);
    try{
        const savedProduct = await product.save();    
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});
// read
router.get("/find/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const product = await Product.findById(
            req.params.id
        );
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});
// read all
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    const newquery = req.query.new;
    const categoryQuery = req.query.category;
    try{
        let products;
        if(newquery){
            products = await Product.find().sort({createdAt:-1}).limit(1);
        }else if(categoryQuery){
            products = await Product.find().sort(
                {
                    categories:{
                        $in:[categoryQuery],
                    },
                },
            )
        }else{
            products = await Product.find();
        }
        res.status(200).json(products);        
    }catch(err){
        res.status(500).json(err);
    }
})



// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedproduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );
        res.status(200).json(updatedproduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedproduct = await Product.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletedproduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;