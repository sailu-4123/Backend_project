const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, async (req,res)=>{
    const task = await Task.create({
        title: req.body.title,
        userId: req.user.id
    });
    res.send(task);
});

router.get('/', auth, async (req,res)=>{
    const tasks = await Task.find({userId:req.user.id});
    res.send(tasks);
});

router.delete('/:id', auth, async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

module.exports = router;