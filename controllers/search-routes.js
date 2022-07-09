//Import required packages and routes
const router = require('express').Router();
const { getNextLaunch } = require('../utils/helpers');
const { Launch } = require('../models');

//GET method to display the search page
router.get('/', async (req, res) => {
    const nextLaunch = await getNextLaunch();
    res.render('search', { nextLaunch, loggedIn: req.session.loggedIn });
});

/* TODO: implement search method in the route below
* using node-fetch and SpaceX api query https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v5/query.md
* OR using sequelize FindAll() query
* User should be able to search a launch by partial name and find all results containing their search term(s)
*/

router.get('/', async (req, res) => {
    try {
      const nextLaunch = await getNextLaunch();
      //Find all launch data
      const dbLaunchData = await Launch.findAll({
        attributes: ['id', 'icon', 'name', 'rocket_name', 'date', 'webcast'],
        order: [['date', 'DESC']]
      });
      //Serialize data
      const launches = dbLaunchData.map(post => post.get({ plain: true }));
      //Render the home page
      res.render('search', {
        launches,
        nextLaunch,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


//POST method to be able to search the launches
router.post('/', async (req, res) => {
    console.log('Searching for', req.body.query)
    try {
        const nextLaunch = await getNextLaunch();
        
        res.status(404).json();
    } catch (err) {
        res.status(500).json(err);
    }
});

//Export router
module.exports = router; 