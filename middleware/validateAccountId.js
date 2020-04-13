const accountDb = require('../data/dbConfig');

async function validateAccountId(req, res, next) {
  try {
    const account = await accountDb('accounts').where('id', req.params.id).first();
    if (account) {
      req.account = { ...account, ...req.account };
      next();
    } else {
      res.status(404).json({ message: 'invalid account id' });
    }
  } catch (err) {
    res.status(500).json({
      error: 'error while retrieving account from database',
      message: err.message,
    });
  }
}

module.exports = validateAccountId;
