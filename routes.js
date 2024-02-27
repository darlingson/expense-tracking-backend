const express = require('express');
const router = express.Router();

//read sqlite db by creating connection to the db file
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/expenses.db');



// Define routes
router.get('/users', (req, res) => {
//   res.send('List of users');
    res.json({ message: 'List of users' , users: [{name :'user1'}, {name: 'user2'}, {name: 'user3'}]});
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Details of user ${userId}`);
});

router.post('/users', (req, res) => {
  res.send('Create a new user');
});

router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Update user ${userId}`);
});

router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Delete user ${userId}`);
});


//actual appliation routes 
  router.get('/expenses', (req, res) => {
    // res.json({ message: 'List of expenses', expenses: [{name :'expense1'}, {name: 'expense2'}, {name: 'expense3'}]});
    db.all('SELECT * FROM expenses', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
      res.json({ message: 'List of expenses', expenses: rows });
    })
  });
  router.post('/expenses', (req, res) => {
    const { name, amount, category, date, note } = req.body;
    db.run('INSERT INTO expenses (name, amount, category, date, note) VALUES (?, ?, ?, ?, ?)',
      [name, amount, category, date, note],
      function(err) {
        if (err) {
          console.error(err);
        }
      }
    );
    res.json({ message: 'Expense created successfully' });
  })
  router.put('/expenses/:id', (req, res) => {
    const expenseId = req.params.id;
    res.send(`Update expense ${expenseId}`);
  })


module.exports = router;