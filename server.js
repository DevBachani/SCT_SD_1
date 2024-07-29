const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/convert', (req, res) => {
    const { temperature, scale } = req.body;

    let celsius, fahrenheit, kelvin;

    switch (scale) {
        case 'C':
            celsius = temperature;
            fahrenheit = (temperature * 9/5) + 32;
            kelvin = parseFloat(temperature) + 273.15;
            break;
        case 'F':
            celsius = (temperature - 32) * 5/9;
            fahrenheit = temperature;
            kelvin = ((temperature - 32) * 5/9) + 273.15;
            break;
        case 'K':
            celsius = temperature - 273.15;
            fahrenheit = ((temperature - 273.15) * 9/5) + 32;
            kelvin = temperature;
            break;
        default:
            return res.status(400).send('Invalid scale');
    }

    res.json({ celsius, fahrenheit, kelvin });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
