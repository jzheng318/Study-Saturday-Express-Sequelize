const router = require('express').Router();
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
    try {
        const students = await Student.findAll();
        res.send(students);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {firstName, lastName, email} = req.body
        const newStudent = await Student.create({
            firstName,
            lastName,
            email
        })
        res.status(201).send(newStudent);
    } catch (error) {
        next(error);
    }
})


router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const student = await Student.findById(id);
        if(!(student)){
            res.status(404).send('Student does not exist');
        } else {
            res.send(student);
        }

    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const student = await Student.findById(id);
        if(!student) {
            res.status(404).send('Student does not exist!');
        } else {
            const updatedStudent = await student.update(req.body);
            res.status(200).send(updatedStudent);
        }
    } catch (error) {
        next(error);
    }
})


router.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const student = await Student.findById(id);
        if(!(student)){
            res.status(404).send('Student does not exist');
        } else {
            await student.destroy();
            res.sendStatus(204);
        }

    } catch (error) {
        next(error);
    }
})




module.exports = router;
