const {Router} = require('express');
const router = Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({'user.userId': req.user._id})
            .populate('user.userId');
        res.render('orders', {
            title: 'Orders',
            isOrder: true,
            orders: orders.map(o => {
                console.log({...o._doc});
                return {
                    ...o._doc,
                    price: o.courses.reduce((total, c) => {
                        return total += c.count * c.course.price
                    }, 0)
                }
            })
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await req.user
            .populate(['cart.items.courseId']);

        const courses = user.cart.items.map(i => ({
            count: i.count,
            course: {...i.courseId._doc}
        }));

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            courses
        });

        await order.save();
        await req.user.clearCart();

        res.redirect('/orders');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;