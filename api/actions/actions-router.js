// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();



router.use((err, req, res) => {
    res.status(err.status || 500).json({
        custom: "something super bad happened",
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;