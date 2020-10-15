const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
