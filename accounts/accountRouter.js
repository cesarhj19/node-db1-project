const express = require('express');
const accountDb = require('../data/dbConfig');
const { validateAccount, validateAccountId } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const account = await accountDb.select('*').from('accounts');
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({
      error: 'account information could not be retrieved',
      message: err.message,
    });
  }
});

router.get('/:id', validateAccountId, (req, res) => {
  try {
    res.status(200).json(req.account);
  } catch (err) {
    res.status(500).json({
      error: 'error while getting account from database',
      message: err.message,
    });
  }
});

router.post('/', validateAccount, async (req, res) => {
  try {
    const account = await accountDb.insert(req.account).into('accounts');
    res.status(201).json(account); // returns id
  } catch (err) {
    res.status(500).json({
      error: 'error while saving account to database',
      message: err.message,
    });
  }
});

router.put('/:id', validateAccount, validateAccountId, async (req, res) => {
  try {
    const account = await accountDb('accounts').where('id', req.params.id).update(req.account);
    if (account) res.status(200).json({ updated: account }); // returns number of accounts updated
    else res.status(404).json({ message: 'invalid account id' });
  } catch (err) {
    res.status(500).json({
      error: 'error while updating account in database',
      message: err.message,
    });
  }
});

router.delete('/:id', validateAccountId, async (req, res) => {
  try {
    const account = await accountDb('accounts').del().where('id', req.params.id);
    if (account) res.status(200).json({ deleted: account }); // returns number of accounts deleted
    else res.status(404).json({ message: 'invalid id' });
  } catch (err) {
    res.status(500).json({
      error: 'error while deleting account from the database',
      message: err.message,
    });
  }
});

module.exports = router;
