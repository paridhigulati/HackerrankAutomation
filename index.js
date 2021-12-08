const { resolve } = require("path/posix");
const puppeteer = require("puppeteer");
const loginLink = " https://www.hackerrank.com/auth/login";
const email = 'uihfltu@gumaygo.com'
const password = 'userone'
const codeObj = require('./codes')
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
}).then(function(newTab){ //promise chaining
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
     let questionWillBeSolved = questionSolver(page,questionArray[0], codeObj.answers[0]);
return questionWillBeSolved
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
function questionSolver( question)
{
    return new Promise(function(resolve, reject){
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function(){
          let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
          return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput',page)
        }).then(function(){
            return page.type('textarea.custominput', answer, {delay:10})

        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:100})
            return AisPressed
        }).then(function()
        {
            let XisPressed = page.keyboard.press('X', {delay : 100})
            return XisPressed
        }).then(function()
        {
            let ctrlisUnPressed = page.keyboard.up(Control)
            return ctrlisUnPressed
        }).then(function()
        {
            let mainEditorinFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return mainEditorinFocus
        })   }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:100})
            return AisPressed
        }).then(function()
        {
            let VisPressed = page.keyboard.press('V', {delay : 100})
            return VisPressed
        }).then(function()
        {
            let ctrlisUnPressed = page.keyboard.up(Control)
            return ctrlisUnPressed
        }).then(function(){
            return page.click('.hr-monaco_run-code', {delay : 50})
        }).then(function(){
            resolve()
        }).catch(function(err)
        {
            reject()
        })
    
}

//challenge faced -> editors have inbuilt auto close but if write code through automation it will give for(())
//solution -> write code in test against custom input box copy it and paste in editor
