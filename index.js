const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const path = require('path');
const csrf = require('csurf');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const homeRoutes = require('./routes/home');
const cartRoutes = require('./routes/cart');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const User = require('./models/user');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const MONGODB_URI = `mongodb+srv://Bohdan:NEdEFWz0ofHGMgpg@cluster0.b3nsifa.mongodb.net/shop`;
const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csrf());
app.use(varMiddleware);
app.use(userMiddleware);

// ROUTES
app.use('/', homeRoutes);
app.use('/cart', cartRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();