const express = require("express");
const cors = require("cors");

const fs = require("fs");
const path = require("path");
const config = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        app: "Lekhpal PRO Backend",
        status: "Running",
        version: "2.0"
    });
});

// ======================
// Health Check API
// ======================
console.log("Health route loaded");
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "UP",
        service: "Lekhpal PRO Backend",
        version: "1.0",
        timestamp: new Date().toISOString()
    });
});

// Village API (Temporary Sample)
app.get("/villages", (req, res) => {

    const districtCode = req.query.districtCode;
    const tehsilCode = req.query.tehsilCode;

    const filePath = path.join(__dirname, config.PATH.VILLAGES);

    const villages = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const result = villages.filter(v =>
        v.districtCode === districtCode &&
        v.tehsilCode === tehsilCode
    );

    res.json({
        success: true,
        districtCode,
        tehsilCode,
        villages: result
    });

});

const PORT = config.SERVER.PORT;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
