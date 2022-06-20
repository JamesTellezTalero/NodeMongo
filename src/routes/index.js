const { Router } = require('express');
const router = Router();

const { CreateUser, GetAllUsers } = require('../controllers/GeneralController');

router.post('/CreateUser', CreateUser);
router.get('/GetAllUsers', GetAllUsers);

module.exports = router;