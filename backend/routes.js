router = require("express").Router();
const userController = require("./controllers/createUser");

//example
// router.get("/item", lostItemController.getItemsC);
router.get("/", (req, res) => "hello world");

router.post("/user", userController.createUser);

module.exports = router;
