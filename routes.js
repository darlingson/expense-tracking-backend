const express = require('express');
const router = express.Router();

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

module.exports = router;