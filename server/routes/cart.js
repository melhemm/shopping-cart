const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken ,verfiyTokenAndAdmin, verfiyTokenAndAuthorization } = require("./verfiyToken");


router.post("/", verifyToken ,async (req, res) => {
  const newCart = new Cart(req.body)

  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put("/:id", verfiyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true})
    res.status(200).json(updatedCart)
  } catch (error) {
    res.status(500).json(error)
  }})

router.delete("/:id", verfiyTokenAndAuthorization, async(req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json("Cart has been deleted>>>")
  } catch (error) {
    res.status(500).json(error)
  }
})

// get user cart

router.get("/find/:userId", verfiyTokenAndAuthorization,async(req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId})
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all 

router.get("/", verfiyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
