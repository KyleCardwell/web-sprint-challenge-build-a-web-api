// add middlewares here related to actions
const Actions = require('./actions-model');

function logger(req, res, next) {
    console.log(`[${req.method}] ${req.url} `, Date())
    next()
}

function validateActionId(req, res, next) {

    Actions.get(req.params.id)

        .then(action => {
            if(!action) {
                res.status(404).json({message: "action not found"})
            } else {
                req.action = action
                next()
            }
        })
        .catch(() => {
            res.status(400).json({ message: "error getting user"})
        })
}

function validateAction(req, res, next) {
    if(!req.body.notes || !req.body.description || !req.body.project_id) {
        res.status(400).json({message: "Action missing notes or description or project ID"})
    } else {
        next()
    }
}

  module.exports = {logger, validateActionId, validateAction}