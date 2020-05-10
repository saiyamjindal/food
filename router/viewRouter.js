const viewRouter = require("express").Router();
const { getTrialPage, getHomePage, getPlansPage, getLoginPage, getProfilePage,getManagePlanPage, getSignupPage,getResetPage} = require("../controller/viewController");
const { isUserLoggedIn, protectRoute, logout } = require("../controller/authController");
// req.cookies=> jwt => name 
//  /plans => isUserLoggedIN
viewRouter.use(isUserLoggedIn);
viewRouter.get("/", getHomePage);
viewRouter.get("/logout", logout);
viewRouter.get("/plans", getPlansPage);
viewRouter.get("/login", getLoginPage);
viewRouter.get("/trial", getTrialPage);
viewRouter.get("/profile", protectRoute, getProfilePage);
viewRouter.get("/managePlans",protectRoute,getManagePlanPage);
viewRouter.get("/signup",getSignupPage);
viewRouter.get("/resetPassword/:token", getResetPage);

module.exports = viewRouter;