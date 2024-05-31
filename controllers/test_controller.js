const test = (req, res, next) => {
  console.log(req.cookies.rt);
  return res.status(200).json({ message: "test" });
};

module.exports = test;
