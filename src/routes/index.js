const { Router } = require('express');
const router = Router();

const { CreateUser, GetAllUsers, LoginUser, GetUserById } = require('../controllers/GeneralController');

router.post('/CreateUser', CreateUser);
router.post('/LoginUser', LoginUser);
router.get('/GetAllUsers', GetAllUsers);
router.get('/GetUserById', GetUserById);

module.exports = router;