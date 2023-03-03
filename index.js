const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const express = require("express");
const path = require("path");
var cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const PORT = process.env.PORT || 7000;

const app = express();

app.use(fileUpload());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// viewer

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./", "views/", "feed.html"));
});

app.get("/photo/:id", (req, res) => {
  res.sendFile(path.resolve("./", "views/", "photo.html"));
});

// admin

app.get("/auth", (req, res) => {
  res.sendFile(path.resolve("./", "views/", "auth.html"));
});

app.get("/admin", (req, res) => {
  res.redirect("/auth");
});

app.post("/admin", (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    res.sendFile(path.resolve("./", "views/", "admin.html"));
  } else {
    res.status(403).send("Invalid authorization token!");
  }
});

app.get("/upload", (req, res) => {
  res.redirect("/auth");
});

app.post("/upload", function (req, res) {
  let photo;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  photoID = nanoid(8);

  photo = req.files.photo;

  console.log(photo.name);
  photo.name = `${photoID}.JPG`; // sets a unique name

  // saving to filesystem

  uploadPath = __dirname + "/public/uploads/" + photo.name;

  photo.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    // saving to data.json

    const data = require("./public/data.json");

    data.push({
      id: photoID,
      path: `/uploads/${photo.name}`,
    });

    fs.writeFileSync("./public/data.json", JSON.stringify(data));

    res.send("File uploaded!");
  });
});

app.get("/delete", (req, res) => {
  res.redirect("/auth");
});

app.post("/delete", (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const id = req.query.id;

    function deleteFile(name) {
      const data = require("./public/data.json");

      fs.writeFileSync(
        "./public/data.json",
        JSON.stringify(data.filter((item) => item.id !== name))
      );

      fs.unlink(`./public/uploads/${name}.JPG`, () => {
        res.status(200).json({ message: "Photo Deleted!" });
      });
    }

    try {
      deleteFile(id);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json({ message: "Invalid authorization token!" });
  }
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`);
});
