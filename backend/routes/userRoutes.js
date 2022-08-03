const express= require('express');
const {protect} =require("../middlewares/authMiddleware");
const {registerUser,authUser,allUsers} =require('../controllers/userControllers');

const router=express.Router();

router.route('/').get(protect, allUsers);
router.route('/').post(registerUser);


router.post('/login',authUser);

module.exports=router;