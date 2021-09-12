// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');
const { logger, validateProjectId, validateProject } = require('./projects-middleware')


const router = express.Router();

router.get('/', logger, (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', logger, validateProjectId, (req, res, next) => {

    res.json(req.project)
    next()
})

router.post('/', logger, validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', logger, validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        })
        .catch(next)
})

router.delete('/:id', logger, validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(deletedProject => {
            res.json(deletedProject)
        })
        .catch(next)
})

router.get('/:id/actions', logger, validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions)
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