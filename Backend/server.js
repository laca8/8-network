const express = require("express");
const dbUrl = require("./middlewares/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");
const app = express();
dbUrl();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

__dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
const NODE_ENV = "dev";
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("api running....");
  });
}
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/imagePost", require("./routes/uploadImagesPost"));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
