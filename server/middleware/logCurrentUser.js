module.exports = (req, res, done) => {
  console.log('AUTH USER', req.user)
  done()
}
