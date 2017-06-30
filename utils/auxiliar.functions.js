module.exports.onError = (funName, res, err) => {
  console.log('Error in: ' + funName + ': ' + err);
  return res.status(err.status).json(err.message);
}
