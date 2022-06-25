const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { UserAuth, ValidateErrors } = require('../middlewares/auth');

const { CreateUser, UpdateUserByEmail, LoginUser, GetAllUsers, GetUserById, GetUserByEmail } = require('../controllers/GeneralController');

router.post('/CreateUser', [
    check('user_name', 'send valid username').not().isEmpty(),
    check('user_email', 'send valid email').isEmail(),
    check('user_password', 'your password must be had eight characters length ').isLength({ min: 8 }),
    check('user_phone', 'send valid email').isNumeric().isLength({ min: 10 }),
    ValidateErrors
], CreateUser);
router.post('/LoginUser', LoginUser);
router.put('/UpdateUserByEmail', [
    check('id', 'send valid id').not().isEmpty(),
    check('user_name', 'send valid username').optional().not().isEmpty(),
    check('user_email', 'send valid email').optional().isEmail(),
    check('user_phone', 'send valid phone').optional().isNumeric().isLength({ min: 10 }),
    ValidateErrors
], UpdateUserByEmail);

router.get('/Admin', UserAuth, GetAllUsers);
router.get('/GetAllUsers', GetAllUsers);
router.get('/GetUserById', GetUserById);
router.get('/GetUserByEmail', GetUserByEmail);

module.exports = router;