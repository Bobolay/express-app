const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

// register handlebars
app.engine('hbs', hbs.engine);
// use it
app.set('view engine', 'hbs');
// set views folder
app.set('views', 'views');
// set css
app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Main page',
        isHome: true
    });
});

app.get('/add', (req, res, next) => {
    res.render('add', {
        title: 'Add new course',
        isAdd: true
    });
});

app.get('/courses', (req, res, next) => {
    res.render('courses', {
        title: 'Courses',
        isCourses: true
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});