const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verfiyTokenAndAdmin,
  verfiyTokenAndAuthorization
} = require("./verfiyToken");


router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body)

  try {
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put("/:id", verfiyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    })
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete("/:id", verfiyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order has been deleted ---")
  } catch (error) {
    res.status(500).json(error)
  }
})

// get user orders

router.get("/find/:userId", verfiyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all 
router.get("/", verfiyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
