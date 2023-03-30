const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


//...............Available Routes ......................................
app.use("/api/digitap/", require("./routes/digitap_signature"));
// .......................................................................

app.listen(port, function() {
    console.log(`backend is listening @ http://localhost:${port}`);
});