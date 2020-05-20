const express = require("express");
const path = require("path");
const hbs = require("hbs");
const chalk = require("chalk");
const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up Handlebars engine & views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes ~~~~~~~~~~~~~~~~~~~~~~

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tom Bran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tom Bran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Some help text here",
    name: "Tom Bran",
  });
});

app.get("/weather", ({ query }, res) => {
  if (!query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecast,
        address: query.address,
      });
    });
  });
});

app.get("/products", ({ query }, res) => {
  if (!query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tom Bran",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tom Bran",
    errorMessage: "Page not found.",
  });
});

// ~~~~~~~~~~~~~

app.listen(port, () => {
  console.log(chalk.bold.yellow(`Server is up on port ${port}`));
});
