const router = require('express').Router()
const passport = require('../config/auth')
const { pageItem } = require('../server/models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/items', (req, res, next) => {
  pageItem.all()
    .then((items) => res.json(items))
    .catch((error) => next(error))
  })

   .put('/items/:id', authenticate, (req, res, next) => {
  const id = req.params.id
  if (req.account.admin === false) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  else {
    return pageItem
     .findById(id)
     .then((item) => {
        if (!item) { return next() }
        return item
          .update({
            title: req.body.title || item.title,
            subtitle: req.body.subtitle || item.subtitle,
            content: req.body.content || item.content,
            urls: req.body.urls || item.urls
          })
      .then(() => res.json(item))
      .catch((error) => next(error))
    })
  }
})

module.exports = router
