const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        app: "Lekhpal PRO Backend",
        status: "Running"
    });
});

// Village API
app.get("/villages", (req, res) => {

    const districtCode = req.query.districtCode;
    const tehsilCode = req.query.tehsilCode;

    res.json({
        success: true,
        districtCode,
        tehsilCode,
        villages: [
            {
                villageCode: "001",
                villageNameHindi: "नमूना गाँव 1",
                villageNameEnglish: "Sample Village 1"
            },
            {
                villageCode: "002",
                villageNameHindi: "नमूना गाँव 2",
                villageNameEnglish: "Sample Village 2"
            }
        ]
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});