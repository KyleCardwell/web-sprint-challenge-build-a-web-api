// Write your "actions" router here!
const express = require('express');
const { logger, validateActionId, validateAction } = require('./actions-middlware');
const { validateProjectId } = require('../projects/projects-middleware')

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', logger, (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', logger, validateActionId, (req, res, next) => {

    res.json(req.action)
    next()
})

router.post('/', logger, validateProjectId, validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', logger, validateProjectId, validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction)
        })
        .catch(next)
})

router.delete('/:id', logger, validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(deletedAction => {
            res.status(200).json(deletedAction)
        })
        .catch(next)
})



// router.use((err, req, res) => {
//     res.status(err.status || 500).json({
//         custom: "something super bad happened",
//         message: err.message,
//         stack: err.stack
//     })
// })

module.exports = router;