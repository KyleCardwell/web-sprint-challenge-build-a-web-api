require('dotenv').config()

const express = require('express');
const cors = require('cors');
const helmet = require('helmet')

const actionsRoutes = require('./actions/actions-router')
const projectsRoutes = require('./projects/projects-router')

const server = express();

server.use(express.json())
server.use(cors())
server.use(helmet())

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('/api/actions', actionsRoutes)
server.use('/api/projects', projectsRoutes)

// server.use('*', (req, res) => {
//     res.json({
//         message: "this is cool!"
//     })
// })

module.exports = server;
