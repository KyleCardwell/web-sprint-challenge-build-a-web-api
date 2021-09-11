// add middlewares here related to projects
const Projects = require('./projects-model');

function logger(req, res, next) {
    console.log(`[${req.method}] ${req.url} `, Date())
    next()
}

function validateProjectId(req, res, next) {

    Projects.get(req.body.project_id || req.params.id)

        .then(project => {
            if(!project) {
                res.status(404).json({message: "project not found"})
            } else {
                req.project = project
                next()
            }
        })
        .catch(() => {
            res.status(500).json({ message: "error getting user"})
        })
}

function validateProject(req, res, next) {
    if(!req.body.name || !req.body.description) {
        res.status(400).json({message: "project missing name or description"})
    } else {
        next()
    }
}

  module.exports = {logger, validateProjectId, validateProject}