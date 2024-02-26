const fetch = require('node-fetch'); // If you're running this on Node.js
const express = require('express');

const app = express();

app.get('/proxy', async (req, res) => {
    try {
        // Fetch the target JavaScript file
        const response = await fetch('https://supportcases.mathworks.com/mwsupport/auraFW/javascript/aura_prod.js.map?sf_js_last_mod=1708507544491');
        const scriptContent = await response.text();
        
        // Send the script content as the response
        res.send(scriptContent);
    } catch (error) {
        console.error('Error fetching script:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
