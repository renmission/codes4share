const Task = require('../models/Task');

// @desc      Get task
// @route     GET /task
// @access    Public
exports.createtask = (req, res, next) => {
    const newTask = new Task();

    newTask.save((err, data) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/task/' + data._id);
        }
    });
};

// @desc      Render login
// @route     GET /login
// @access    Public
exports.getTask = (req, res, next) => {
    if (req.params.id) {

        Task.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                console.log(err);
                res.render('error');
            }

            if (data) {
                res.render('task', { content: data.content, roomId: data.id });
            } else {
                res.render('error');
            }
        });

    } else {

        res.render('error');

    }
};