import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
    // console.log("was sent category paramiter "+req.body.category);

    const chosenCategory = req.body.category;
    const chosenType = "single";
    const chosenLang = req.body.language;


    const result = await axios.get(API_URL + chosenCategory, {
        params: {
          type: chosenType,
          lang: chosenLang
        }
      });
    console.log(result.data);
    // res.render("index.ejs",{data: JSON.stringify(result.data)});
    res.render("index.ejs",{data: result.data});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
