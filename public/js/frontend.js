// import { sign } from "jsonwebtoken";

const d = document;
const stripe = Stripe('pk_test_dM0cbUz3Qc91OukZF0SwQFI300SDryM5hV');


const loginForm = d.querySelector(".login");
const emailBox = d.querySelector(".email");
const passwordBox = d.querySelector(".password");
const logout = d.querySelector(".logout");
const forget = d.querySelector(".forget");
const signupForm = d.querySelector(".signup");
const sname = d.querySelector(".sname");
const semail = d.querySelector(".semail");
const spassword = d.querySelector(".spassword");
const sconfirmpass = d.querySelector(".sconfirmpassword");
const sroles = document.querySelector(".sroles")
const reset = d.querySelector(".reset");
const rnewpass = d.querySelector(".newpass");
const rconfirmpass = d.querySelector(".confirmpass");
const rtoken = d.querySelector(".token");
const updateProfile = d.querySelector(".updateProfile");
const paymentBtn = d.querySelector(".payment");

async function loginHelper(email, password) {
  const backendResponse = await axios.post("/api/users/login", { email, password });
  if (backendResponse.data.status === "userLogged In") {
    alert("user LoggedIn");
    //  frontent browser
    location.assign("/profile");
  } else {
    alert("Wrong Email or password");
  }
}

async function logoutHelper() {
  const backendResponse = await axios.get("/logout");
  if (backendResponse.data.status == "user LoggedOut") {
    // wrong token 
    location.assign("http://localhost:3000/");
  } else {
    alert("logout failed");
  }
}

async function forgetHelper(email) {
  const backendResponse = await axios.post("/api/users/forgetpassword", { email});
  if (backendResponse.data.status == "Token send to your email")
  {
    alert("Mail sent");
    //  frontent browser 
    // location.assign(backendResponse.data.resetPath);
  }
  else
  {
    alert("Wrong Email");
  }
}

async function resetHelper(password,confirmPassword,token)
{
  
  const backendResponse = await axios.patch("/api/users/resetPassword/"+token , {password,confirmPassword});
  if (backendResponse.data.status == "Password reset")
  {
    alert("Password reset");
    //  frontent browser 
    // location.assign(backendResponse.data.resetPath);
  }
  else
  {
    alert("Wrong Email");
  }
}

if(reset)
{
  reset.addEventListener("submit", function (e) {
    // default behaviour 
    e.preventDefault();
    const password = rnewpass.value;
    const confirmPassword = rconfirmpass.value;
    const token = rtoken.value;
    resetHelper(password,confirmPassword,token);
  })
}

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    // default behaviour 
    e.preventDefault();
    const email = emailBox.value;
    const password = passwordBox.value;
    if(passwordBox.value == "")
    {
        forgetHelper(email);
    }
    else
    {
    loginHelper(email, password);
    }
  })
}

if (logout) {
  logout.addEventListener("click", function () {
    logoutHelper();
  })
}

async function signupHelper(name,email, password,confirmPassword,role) 
{
  const backendResponse = await axios.post("/api/users/signup", {name, email, password,confirmPassword,role });
  if (backendResponse.data.status === "user Signedup") {
    alert("user SignedIn");
    //  frontent browser
    location.assign("/profile");
  } else {
    alert("Wrong Email or password");
  }
}
if(signupForm){
  signupForm.addEventListener("submit",function(e)
  {
    e.preventDefault();
    const name = sname.value;
    const email = semail.value;
    const password = spassword.value;
    const confirmPassword = sconfirmpass.value;
    const role = sroles.value;
    signupHelper(name,email,password,confirmPassword,role);
  })
}

async function updateProfileHelper(mutipartFormData) {
  const response = await axios.patch("api/users/ProfileImage", mutipartFormData);
  console.log(response.data);
  if (response.data.status === "image uploaded") {
    alert("Profile Image updated");
    location.reload();
  } else {
    alert("some error occurred");
  }

}
if (updateProfile) {
  updateProfile.addEventListener("change", function (e) {
    e.preventDefault();
    // capture image so that we could send to backend
    // console.log("change event occurred");

    const mutipartFormData = new FormData();
    mutipartFormData.append("photo", updateProfile.files[0]);
    updateProfileHelper(mutipartFormData);
  })
}

async function payementHelper(planId) {
  const response = await axios.post("/api/bookings/createSession", { planId });
  if (response.data.status) {
    const { session } = response.data;
    const id = session.id;
    stripe.redirectToCheckout({
      sessionId: id
    }).then(function (result) {
      alert(result.error.message);
    });

  } else {
    alert("Payment failed");
  }
}


if (paymentBtn) {
  paymentBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const planId = paymentBtn.getAttribute("plan-id");
    payementHelper(planId);
  })
}