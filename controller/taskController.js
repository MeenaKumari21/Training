const Task = require('../models/Task');

exports.createTask = async(req,res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || 'pending',
            user: req.user.id,
            //which req is using that id will store here

            //without Mid ==> req->routes->controllers->response
            //with Middleware ==> req->middleware->routes->controllers->response
        })
        res.status(201).json({
            msg: 'task created successfully'
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await Task.find({ user: req.user.id });
        res.json(task); // ✅ FIXED (task → tasks issue)
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,  //id comes from parameter so params,id is obj so _id
            user: req.user.id
        });
        res.json(task);
    } catch (error) {
        res.status(500).json(error); // ✅ status added
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id
        }, {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        }, {
            new: true
        });

        if (!task) {
            return res.status(404).json({ msg: "task not found" });
        }

        res.json({ msg: "task updated successfully", task });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};



// also for delete
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!task) {
            return res.status(404).json({ msg: "task not found" });
        }
        res.json({ msg: "task deleted successfully", task });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};

exports.updateTaskPatch = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id
        },
            req.body, { new: true }
        );

        if (!task) {
            return res.status(404).json({ msg: "task not found" });
        }

        res.json({ msg: "task updated successfully", task });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};
