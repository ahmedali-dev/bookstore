const express = require("express");
const { getAllCategory } = require("../db/category");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = await getAllCategory();
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
