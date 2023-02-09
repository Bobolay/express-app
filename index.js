const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const homeRoutes = require('./routes/home');
const cartRoutes = require('./routes/cart');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

// register handlebars
app.engine('hbs', hbs.engine);
// use handlebars
app.set('view engine', 'hbs');
// set views folder
app.set('views', 'views');
// set css
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// use routes
app.use('/', homeRoutes);
app.use('/cart', cartRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});