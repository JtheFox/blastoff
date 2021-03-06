// Import required packages and routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// Read the file from directory 
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// 404 Page
router.get('*', (req, res) => {
    res.status(404).render('404', { layout: 'blank' });
});

// Export router
module.exports = router;