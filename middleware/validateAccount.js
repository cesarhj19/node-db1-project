function validateAccount(req, res, next) {
  const account = req.body;
  if (typeof account.name === 'undefined' || typeof account.budget === 'undefined') {
    res.status(400).json({ message: 'missing required name or budget field' });
  } else {
    req.account = { ...req.account, ...account };
    next();
  }
}

module.exports = validateAccount;
