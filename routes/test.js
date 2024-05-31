// const {
//   generateAccessToken,
//   generateRefreshToken,
// } = require("../utilities/tokenGenerate");

const test_controller = require("../controllers/test_controller");

// const { createUser, updateUser } = require("./../db/users");
module.exports = (app) => {
  app.get("/", test_controller);
};
//   app.get("/", async (req, res) => {
//     const access = generateAccessToken({ name: "hello" }, "10d");
//     const refresh = generateRefreshToken({ name: "hello" }, "60d");
//     //res.json({ access, refresh });
//     //return;
//     try {
//       const access_Token = process.env.access_Token;
//       console.log("🚀 ~ app.get ~ access_Token:", access_Token);
//       const refresh_token = process.env.refresh_token;
//       console.log("🚀 ~ app.get ~ refresh_token:", refresh_token);
//       const userId = " 01028dca-33e7-45f0-ae7b-34ec4c9614b7".trim();
//       const updateData = { username: "changed", email: "changedEmail@g.com" };
//       const updatedUser = await updateUser(userId, updateData);
//       res.status(200).json({ updatedUser });
//       return;

//       const [userCreated] = await createUser({
//         username: "ahmedali",
//         email: "ahmedddd43d@gmail.com",
//         password: "12345678",
//       });
//       res.status(200).json({ userCreated });
//     } catch (error) {
//       console.log("🚀 ~ app.get ~ error:", error);
//       res.status(403).json({ error: "email is found" });
//     }
//   });
// };
