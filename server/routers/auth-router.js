const express=require("express");
const router=express.Router();
const authControllers=require('../controllers/auth-controllers');
const validate=require('../middlewares/validate-middleware');
const authValidation=require('../validators/auth-validators');

router.route('/').get(authControllers.home);

router.route('/register').post(validate(authValidation.signupSchema),authControllers.register);

// router.route('/login').post(validate(authValidation.loginSchema),authControllers.login);
router.route('/login').post(authControllers.login);

router.route('/forgot-password').post(authControllers.forgotPassword);

router.route('/reset-password/:token').post(authControllers.resetPassword);


module.exports=router;