const router = require('express').Router();
const Test = require('../db/models/test')
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
    try {
        const tests = await Test.findAll();
        res.status(200).send(tests);
    } catch (error) {
        next(error);
    }
})


router.get('/:id', async(req, res, next) => {
    try {
        const id = Number(req.params.id);
        const test = await Test.findById(id);
        if(!test) {
            res.sendStatus(404);
        } else {
            res.status(200).send(test);
        }
    } catch (error) {
        next(error)
    }
})

router.post('/student/:studentId', async(req,res,next) => {
    try {
        const studentId = Number(req.params.studentId)
        const student = await Student.findById(studentId);
        if (!student) {
            res.sendStatus(404);
        } else {
            const test = await Test.create(req.body)
            test.setStudent(student)
            res.status(201).send(test)
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async(req,res,next) => {
    try {
        const testId = Number(req.params.id);
        const test = await Test.findById(testId);
        if(!test) {
            res.sendStatus(404);
        } else {
            await test.destroy()
            res.sendStatus(204)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;
