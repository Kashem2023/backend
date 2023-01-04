const { userResister, loginUser, logout, getAllUser, getSingleUser, deleteUser, getUserDetails, updatePassword, updateProfile, AdminLogin, AdminLogout } = require('../controller/userController')

const router = require('express').Router()

router.route('/resister').post(userResister)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route("/me").get(getUserDetails);
router.route("/password/update").put(updatePassword);
router.route("/me/update").put(updateProfile);

router
    .route("/admin/users")
    .get(getAllUser)

router
    .route("/admin/user/:id")
    .get(getSingleUser)
    .delete(deleteUser)

    router.route('/admin/login').post(AdminLogin)
    router.route('/admin/logout').get(AdminLogout)

module.exports = router