const express = require('express');
const router = express.Router();
const blogController= require('../controllers/blogController');
const faqController= require('../controllers/faqController');

const subscriberController= require('../controllers/subscriberController');
const loginController= require('../controllers/loginController');
const contactController = require('../controllers/contactController');


router.post('/blogs/fetch',blogController.fetchData);
router.post('/blogs',blogController.insertData);
router.post('/blogs/update',blogController.updateData);

router.post('/faqs/fetch',faqController.fetchData);
router.post('/faqs',faqController.insertData);
router.post('/faqs/update',faqController.updateData);


router.post('/subscribers',subscriberController.insertSubscriber);
router.post('/subscribers/fetch',subscriberController.fetchSubscriber);

router.post('/contacts',contactController.insertMessage);
router.post('/contacts/fetch',contactController.fetchMessage);




router.post('/login',loginController.validatePassword);
router.get('/login',loginController.validateToken);
// router.post('/login/update',loginController.updatePassword);

router.post('/login/create',loginController.insertUser);

// router.post('/login/password',loginController.updatePassword);
router.post('/login/token',loginController.validateToken);


module.exports = router;