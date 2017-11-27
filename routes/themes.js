const router = require('express').Router()
const passport = require('../config/auth')
const { Theme } = require('../server/models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/themes', (req, res, next) => {
  Theme.findAll({ limit: 1 })
    .then((theme) => res.json(theme[0]))
    .catch((error) => next(error))
  })

   .put('/themes/:id', authenticate, (req, res, next) => {
  const id = req.params.id
  if (req.account.admin === false) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  else {
    return Theme
     .findById(id)
     .then((theme) => {
        if (!theme) { return next() }
        return theme
          .update({
            primaryOne: req.body.primaryOne || theme.primaryOne,
            primaryTwo: req.body.primaryTwo || theme.primaryTwo,
            error: req.body.error || theme.error,
            title: req.body.title || theme.title,
            titleTwo: req.body.titleTwo || theme.titleTwo,
            subtitle: req.body.subtitle || theme.subtitle,
            subtitleTwo: req.body.subtitleTwo || theme.subtitleTwo,
            textColor: req.body.textColor || theme.textColor,
            textTwo: req.body.textTwo || theme.textTwo,
            canvas: req.body.canvas || theme.canvas,
            border: req.body.border || theme.border,
            disabled: req.body.disabled || theme.disabled,
            fontTitle: req.body.fontTitle || theme.fontTitle,
            fontSubtitle: req.body.fontSubtitle || theme.fontSubtitle,
            fontText: req.body.fontText || theme.fontText
          })
      .then(() => res.json(theme))
      .catch((error) => next(error))
    })
  }
})

module.exports = router
