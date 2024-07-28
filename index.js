import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const content = result;
    res.render("index.ejs", content);
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

app.post("/get-recipe", async (req, res) => {
  const name = req.body.recipeName;
  try {
    const result = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name
    );
    console.log(result.data);
    if (result.data.meals) {
      res.render("recipe.ejs", { content: result.data });
    } else {
      throw "Recipe doesn't exist. Please check spelling.";
    }
  } catch (error) {
    console.error("Failed to make request: ", error);
    res.render("recipe.ejs", {
      error: error,
    });
  }
});

app.get("/back", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const content = result;
    res.render("index.ejs", content);
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
