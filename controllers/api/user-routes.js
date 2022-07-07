const router = require('express').Router();
const { User } = require('../../models');

// GET users by id
router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        if (dbUserData) res.status(200).json({dbUserData});
        else res.status(404).json({ message: 'No user found with this id' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//POST method to create a new user 
router.post("/", async (req, res) => {

    try {

        //Create a new user 
        const createUser = await User.create({
            username: req.body.username, 
            password: req.body.password
        });

        //Save session the user created 
        req.session.save(() => {
            req.session.user_id = createUser.id;
            req.session.loggedIn = true;
            res.json(createUser);
        });

    } catch (err) {

        //Return error if any
        res.json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: { username: req.body.username, },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'Invalid username.' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid password.' });
            return;
        }

        const user = dbUserData.get({ plain: true });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = user.id;
            console.log('User Logged In', req.session.cookie);
            res.status(200).json({ message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) req.session.destroy(() => res.status(204).end());
    else res.status(404).end();
});

module.exports = router;