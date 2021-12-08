let puppeteer=require("puppeteer");
const {answer}=require("./code");

let browserStartPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized","--disable-notifications"]
});
let page;
(async function fn() {

    try{
        let browserObj=await browserStartPromise;
    console.log("Browser opened");
    page= await browserObj.newPage();
    console.log("page opened");
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type(".ui-tooltip-wrapper input[type='text']","uihfltu@gumaygo.com");
    await page.type(".ui-tooltip-wrapper input[type='password']","userone");
    await page.click(".auth-button span");
    console.log("algo clicked");
    await waitAndClick("div[data-automation='algorithms']",page);
    console.log("warmup clicked");
    await waitAndClick("input[value='warmup']",page);
    await page.waitFor(1000);
    console.log("challenge opened");
    let quesArr= await page.$$(".challenge-submit-btn",{delay:100});
    console.log("no. of questions",quesArr.length);
    for(let i=0;i<quesArr.length-3;i++){
        quesArr= await page.$$(".challenge-submit-btn",{delay:100});
        
        await questionSolver(page,quesArr[i],answer[i]);
    
        console.log("question solved");
        await page.goBack();
        await page.waitFor(3000);
    }
    }
    catch(err){
        console.log(err);
    }
})();

// browserStartPromise.then(function(browserObj){
//     console.log("Browser opened");
//     let browserTabOpenPromise=browserObj.newPage();
//     return browserTabOpenPromise;
// }).then(function(newTab){
//     page=newTab;
//     console.log("page opened");
//     let hackPageOpenPromise=newTab.goto("https://www.hackerrank.com/auth/login");
//     return hackPageOpenPromise;
// })
// .then(function(){
//     let usernameTypePromise=page.type(".ui-tooltip-wrapper input[type='text']","picociy319@mnqlm.com");
//     return usernameTypePromise;
// })
// .then(function(){
//     let passwordTypePromise=page.type(".ui-tooltip-wrapper input[type='password']","workerw");
//     return passwordTypePromise;
// })
// .then(function(){
//     let enterPromise=page.click(".auth-button span");
//     return enterPromise;
// })
// .then(   function(){
//     console.log("algo clicked");
//     let algoPromise=waitAndClick("div[data-automation='algorithms']",page);
//     return algoPromise;
// }   )
// .then(function(){
//     console.log("warmup clicked");
//     let warmupPromise=waitAndClick("input[value='warmup']",page);
//     return warmupPromise;
// })
// .then(function(){
//     let waitForPromise=page.waitFor(1000);
//     return waitForPromise;
// })
// .then(function(){
//     console.log("challenge opened");
//     let challengePromise=page.$$(".challenge-submit-btn");
//     return challengePromise;
// })
// .then(function(quesArr){
//     console.log("no. of questions",quesArr.length);
//     let qWillBeSolvedPromise=questionSolver(page,quesArr[0],answer[0]);
//     // for(let i=1;i<3;i++){
//     //     qWillBeSolvedPromise=qWillBeSolvedPromise
//     //     .then(function (){
//     //      return questionSolver(page,quesArr[i],answer[i]);    
//     //     })                              
//     // }
//     return qWillBeSolvedPromise;
// }).then(function(){
//     console.log("question solved");
// }) 
    

function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        (async function fn() {
            try{
                await question.click();;
            await waitAndClick(".monaco-editor,no-user-select.vs",page);
            await waitAndClick(".checkbox-input",page);
            await page.waitForSelector("textarea.custominput",{visible:true});
            await page.type("textarea.custominput",answer,{deial:10});
            await page.keyboard.down("Control");
            await page.keyboard.press("A",{delay:100});
            await page.keyboard.press("X",{delay:100});
            await page.keyboard.up("Control");
            await waitAndClick(".monaco-editor,no-user-select.vs",page);
            await page.keyboard.down("Control");
            await page.keyboard.press("A",{delay:100});
            await page.keyboard.press("V",{delay:100});
            await page.keyboard.up("Control");
            await page.click(".ui-btn-secondary.pull-right");
            await page.waitFor(10000);
            resolve();
            }
            catch(err){
                reject(err);
            }
        })()

        // let qWillBeClickedPromise = question.click();
        // //code read
        // //hk editor->ctrl A + X
        // //code type
        // qWillBeClickedPromise
        // .then(function(){
        //     //focus
        //     let waitForEditorPromise=waitAndClick(".monaco-editor,no-user-select.vs",page);
        //     return waitForEditorPromise;
        // })
        // .then(function() {
        //     return waitAndClick(".checkbox-input",page);
        // })
        // .then(function() {
        //     return page.waitForSelector("textarea.custominput",{visible:true});
        // })
        // .then(function() {
        //     return page.type("textarea.custominput",answer,{delay:10});
        // })
        // .then(function() {
        //     let ctrlIsPressed=page.keyboard.down("Control");
        //     return ctrlIsPressed;
        // }).then(function() {
        //     let AIsPressed=page.keyboard.press("A",{delay:100});
        //     return AIsPressed;
        // }).then(function() {
        //     return page.keyboard.press("X",{delay:100});
        // }).then(function() {
        //     let ctrlIsPressed=page.keyboard.up("Control");
        //     return ctrlIsPressed;
        // })
        // .then(function(){
        //     //focus
        //     let waitForEditorPromise=waitAndClick(".monaco-editor,no-user-select.vs",page);
        //     return waitForEditorPromise;
        // }).then(function() {
        //     let ctrlIsPressed=page.keyboard.down("Control");
        //     return ctrlIsPressed;
        // }).then(function() {
        //     let AIsPressed=page.keyboard.press("A",{delay:100});
        //     return AIsPressed;
        // }).then(function() {
        //     return page.keyboard.press("V",{delay:100});
        // }).then(function() {
        //     let ctrlIsPressed=page.keyboard.up("Control");
        //     return ctrlIsPressed;
        // })
        // // .then(function() {
        // //     console.log("submitted");
        // //     let submitBtnPromise=waitAndClick("span.ui-text");
        // //     return submitBtnPromise;
        // // })
        // .then(function() {
        //     resolve();
        // }).catch(function(err) {
        //     reject(err);
        // })

    })
} 

function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
      (async function fn() {
        try{
            await cPage.waitForSelector(selector,{visible:true});
            await cPage.click(selector,{delay:1000});
            resolve();
        }
        catch(err){
            reject(err);
        }

      })();  
        
    })
}
