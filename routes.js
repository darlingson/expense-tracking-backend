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
  console.log(req.query.pagesize);
    db.all('SELECT * FROM expenses', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
      if(req.query.page && req.query.pagesize){
        const page = parseInt(req.query.page);
        const pagesize = parseInt(req.query.pagesize);
        const startIndex = (page - 1) * pagesize;
        const endIndex = page * pagesize;

        const paginatedExpenses = rows.slice(startIndex, endIndex);
        const totalPages = Math.ceil(rows.length / pagesize);
        res.json({ products: paginatedExpenses, totalPages });
      }
      else 
        res.json({ message: 'List of expenses', expenses: rows });
    })
  });

router.post('/expenses', (req, res) => {
    console.log(req.body);
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
    const { name, amount, category, date, note } = req.body;
    db.run(`UPDATE expenses SET name = '${name}', amount = '${amount}', category = '${category}', date = '${date}', note = '${note}' where id = ${expenseId}`, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
      // res.json({ message: 'Expense updated successfully' });
    })



    res.send(`Update expense ${expenseId}`);
  })
router.get('/expenses/:id', (req, res) =>{
    const expenseId = req.params.id;
    db.all(`SELECT * from expenses where id = ${expenseId}`,(err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
      res.json({ message: 'List of expenses', expenses: rows });
    })
  })

router.get("/expenses/category/:category", (req, res) =>{
    const category = req.params.category;
    db.all(`SELECT * from expenses where category = '${category}'`,(err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
      res.json({ message: 'List of expenses', expenses: rows });
    })
})
router.get("/expenses/date/:date", (req, res) =>{
    const date = req.params.date;
    db.all(`SELECT * from expenses where date = '${date}'`,(err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
      res.json({ message: 'List of expenses', expenses: rows });
    })
})
router.get("/expenses/search/:keyword", (req, res) =>{
  const date = req.params.keyword;
  db.all(`SELECT * from expenses where name like '%${date}%'`,(err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
    res.json({ message: 'List of expenses', expenses: rows });
  })
})

router.delete('/expenses/:id', (req, res) => {
  const expenseId = req.params.id;
  db.run(`DELETE from expenses where id = ${expenseId}`);
  res.send(`Delete expense ${expenseId}`);
})
module.exports = router;