import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

/* ==============================
HEALTH CHECK
============================== */

app.get("/", (req, res) => {

res.json({
status: "online",
service: "Lamina AI"
});

});

/* ==============================
LAMINA AI
============================== */

app.post("/api/lamina", async (req, res) => {

try {

```
const {
  message,
  businessData
} = req.body;

const prompt = `
```

You are Lamina.

You are a professional AI business advisor.

You help entrepreneurs with:

* Ecommerce
* Shopify
* Marketing
* Sales
* Customer retention
* Product research
* Market analysis
* Business growth

Business data:

${JSON.stringify(
businessData || {},
null,
2
)}

User question:

${message}

If current information is needed,
use web search.

Provide practical and actionable advice.

`;

```
const response =
  await openai.responses.create({

    model: "gpt-5",

    tools: [
      {
        type: "web_search"
      }
    ],

    input: prompt

  });

res.json({

  success: true,

  reply:
    response.output_text ||
    "No response generated."

});
```

} catch (error) {

```
console.error(error);

res.status(500).json({

  success: false,

  error: error.message

});
```

}

});

/* ==============================
START SERVER
============================== */

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(
`Lamina Server running on port ${PORT}`
);

});
