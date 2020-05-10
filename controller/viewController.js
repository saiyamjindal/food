const planModel = require("../model/planModel");
const userModel = require("../model/userModel");
function getTrialPage(req, res) {
  const name = req.userName;
  res.render("trial.pug", {
    titleofThePage: "Trial Page", name
  })
}

async function getHomePage(req, res) {
  let plans = await planModel.find().limit(3);
  let name = req.userName;
  res.render("home.pug", {
    title: "Home Page", plans, name: name
  })
}
// 
async function getPlansPage(req, res) {
  // planModel =>get  plans 
  let plans = await planModel.find();
  let name = req.userName;
  res.render("plansPage.pug", {
    title: "Plans Page", plans, name
  })
}
function getLoginPage(req, res) {
  let name = req.userName;
  res.render("login.pug", {
    title: "Login", name
  })
}
function getSignupPage(req,res)
{
  let name = req.userName;
  res.render("signup.pug",{
    title: "Signup",
    name
  })
}
async function getProfilePage(req, res) {
  const user = await userModel.findById(req.id);
  const name = req.userName;
  res.render("profile.pug", {
    title: "Profile Page",
    user, name
  })
}
async function getResetPage(req, res) {
  res.render("reset.pug", {
    title: "Reset Page",
    token: req.params.token
    })
}
async function getManagePlanPage(req,res)
{
  
  res.render("manageplan.pug",{
    title: "Manage plan",
  })
}
module.exports.getTrialPage = getTrialPage;
module.exports.getHomePage = getHomePage;
module.exports.getPlansPage = getPlansPage;
module.exports.getLoginPage = getLoginPage;
module.exports.getProfilePage = getProfilePage;
module.exports.getManagePlanPage = getManagePlanPage;
module.exports.getSignupPage = getSignupPage;
module.exports.getResetPage = getResetPage;