const { Router } = require('express');
const router = Router();

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add new course',
        isAdd: true
    });
});

module.exports = router;