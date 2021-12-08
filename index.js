const puppeteer = require("puppeteer");
const loginLink = " https://www.hackerrank.com/auth/login";
let browserOpen = puppeteer.launch({
  headless: false, //makes it visible
  args: ["--start-maximized"], //shows in fullscreen
  defaultViewport: null
});

let page 
browserOpen.then(function (browserObj) {
  //returns a promise
  let browserOpenPromise = browserObj.newPage();
  return browserOpenPromise;
}).then(function(newTab){
  page = newTab
  let hackerrankOpenpromise =newTab.goto(loginLink)
  return hackerrankOpenpromise;// reaches to login page 
}).then(function(){
let emailIsEntered = page.type("input[id = 'input-1']", email, {delay : 50})
return emailIsEntered
}).then(function(){
let passwordIsEntered = page.type("input[type = 'password']", password, {delay : 50})
return passwordIsEntered
})