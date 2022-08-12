const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Register user
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password.toString(), 10)
  })

  try {
    const savedUser = await newUser.save()
    console.log(savedUser)
    res.status(200).json(savedUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/login',async  (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      const cmp = await bcrypt.compareSync(req.body.password.toString(), user.password);
      if (cmp) {
        const { password, ...others } = user._doc
        const accessToken = jwt.sign({
          id: user._id,
          isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY, {
          expiresIn: "3d"
        })
        res.status(200).json({...others, accessToken})
      } else {
        res.send("Wrong username or password.");
      }
    } else {
      res.send("Wrong username or password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
})

module.exports = router
