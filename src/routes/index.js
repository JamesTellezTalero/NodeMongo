const { Router } = require('express');
const router = Router();

const { CreateUser, GetAllUsers, LoginUser } = require('../controllers/GeneralController');

router.post('/CreateUser', CreateUser);
router.get('/GetAllUsers', GetAllUsers);
router.post('/LoginUser', LoginUser);

module.exports = router;