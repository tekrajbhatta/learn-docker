const express = require("express");
const app = express();

const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
    return res.json({message: "Hey, I am nodejs in a container"});
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));