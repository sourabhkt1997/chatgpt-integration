const express = require("express");
const app = express();
require("dotenv").config();
const apiKey = process.env.APIKEY; // Update to match your environment variable
const port = process.env.PORT; // Update to match your environment variable
const axios = require("axios");
let cors=require("cors")
app.use(cors())

app.use(express.json());

app.post("/api/input", async (req, res) => {
    let { prompt } = req.body;
     let quotePrompt=`i want a Quote related to ${prompt}`
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: quotePrompt }],
                max_tokens: 100,
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        let ans = response.data.choices[0].message.content;
        if (ans) {
            res.status(201).send({ message: ans });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.listen(port, async () => {
    try {
        console.log("Server running in port " + port);
    } catch (error) {
        console.log(error.message);
    }
});
