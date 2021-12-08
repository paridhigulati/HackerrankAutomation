const puppeteer = require("puppeteer");
const loginLink = " https://www.hackerrank.com/auth/login";
const email = 'uihfltu@gumaygo.com'
const password = 'userone'
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
.then(function(){
    let loginButtonClicked = page.click("button[data-analytics = 'LoginPassword']", {delay : 50})
    return loginButtonClicked
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1 = "algorithms"]', page)
return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]', page)
    return getToWarmUp;
}).then(function() {
let waitfor3Seconds = page.waitFor(3000)
return waitfor3Seconds
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay : 50}) //$$ shorthand for doc.queryselectorall
        return allChallengesPromise;
}).then(function(questionArray)
{
    console.log('number of questions', questionArray.length);
})








function waitAndClick(selector, cPage) //waits for that element which is available after page gets loaded bbcoz only after that we are able to access those elements 
{ 
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){ 
            let clickModel = cPage.click(selector)
           return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}
