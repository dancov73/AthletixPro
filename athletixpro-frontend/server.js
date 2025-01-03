const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// ...existing code...

app.post('/register', (req, res) => {
    const userData = req.body;

    fs.readFile('users.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user data');
        }

        let users = JSON.parse(data);
        users.push(userData);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving user data');
            }

            res.status(200).send('User registered successfully');
        });
    });
});

// ...existing code...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
