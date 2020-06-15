const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get('/api/players', (req, res) => {
    const players = req.params.players;
    connection.query('SELECT * FROM players', players, (err, results) => {

        if (err) {
            res.status(500).send('error when displaying players');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/players/:id/lastname/firstname/birthday/club', (req, res) => {
    const idPlayers = req.params.id;
    connection.query('SELECT id, lastname, firstname, birthday, club FROM players WHERE id = ?', idPlayers, (err, results) => {
        if (err) {
            res.status(500).send('error retrieving data');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/players/club/', (req, res) => {
    const players = req.params.players;
    connection.query('SELECT club FROM players WHERE club LIKE "Man%" ', players, (err, results) => {
        if (err) {
            res.status(500).send('error retrieving data');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/players/lastname/club', (req, res) => {
    const players = req.params.players;
    connection.query('SELECT * FROM players WHERE club LIKE "Liverpool" ', players, (err, results) => {
        if (err) {
            res.status(500).send('error retrieving data');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/players/lastname/firstname/birthday/', (req, res) => {
    const players = req.params.players;
    connection.query('SELECT lastname, firstname, birthday FROM players WHERE birthday > "1999-01-01" ', players, (err, results) => {
        if (err) {
            res.status(500).send('error retrieving data');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/players/lastname/firstname/', (req, res) => {
    const players = req.params.players;
    connection.query('SELECT lastname, firstname FROM players ORDER BY lastname ASC ', players, (err, results) => {
        if (err) {
            res.status(500).send('error retrieving data');
        } else {
            res.json(results);
        }
    });
});

app.post('/api/players', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO players SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error when saving data');
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.put('/api/players/:id', (req, res) => {
    const idPlayers = req.params.id;
    const formData = req.body;
    connection.query('UPDATE players SET ? WHERE id = ?', [formData, idPlayers], err => {
      if (err) {
        console.log(err);
        res.status(500).send('Error while modifying player');
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.put('/api/players/:id/golden_ball', (req, res) => {
    const idPlayers = req.params.id;
    const formData = req.body;
    connection.query('UPDATE players SET golden_ball = true WHERE id = 45', [formData, idPlayers], err => {
      if (err) {
        console.log(err);
        res.status(500).send('Error while modifying player');
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.delete('/api/players/:id', (req, res) => {
    const idPlayers = req.params.id;
    connection.query('DELETE FROM players WHERE id = ?', [idPlayers], err => {
      if (err) {
        console.log(err);
        res.status(500).send('Error while removing player');
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.delete('/api/players/', (req, res) => {
    const players = req.params.players;
    connection.query('DELETE FROM players WHERE golden_ball = false', players, err => {
      if (err) {
        console.log(err);
        res.status(500).send('Error while removing player');
      } else {
        res.sendStatus(200);
      }
    });
  });

app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }

    console.log(`Server is listening on ${port}`);
});