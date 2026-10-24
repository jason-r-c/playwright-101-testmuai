# 3. Debugging commands

## Open the Playwright Inspector (Step through your test, inspect locators and examine browser state.)
```
npx playwright test -g "clickOnSpecialHotMenu" --debug
```
Runs a test() block called "clickOnSpecialHotMenu" and displays the debugger.
Notice the red annotations specifically "element is outside of the viewport". 
This indicates the test cannot click the link as its not displayed in the mobile viewport.
This is an example of affectively using the debugger, analysing the log to see why the test is failing.
![playwright-debug-example](terminal-playwright-commands-images/playwright-debug-example.jpg)

## Run a single test file in the interactive test runner / UI mode
```
npx playwright test -g "example.spec.ts" --ui
```
This finds the "example.spec.ts" test file, then opens it up all by itself
![playwright-open-single-test-in-ui-mode](terminal-playwright-commands-images/playwright-open-single-test-in-ui-mode.jpg)

## Run test/s with verbose Playwright API logs enabled
```
DEBUG=pw:api npx playwright test -g "example.spec.ts"
```
The above displays all playwright API activity thats happening when running test/s

![playwright-debug-pwapi](terminal-playwright-commands-images/playwright-debug-pwapi.jpg)
![playwright-debug-pwapi-2](terminal-playwright-commands-images/playwright-debug-pwapi-2.jpg)


## Run a test with minimal terminal output
```
npx playwright test -g "example.spec.ts" --reporter=line
```
Runs the test with run and pass/fail status only:
![playwright-minimal-terminal-logging](terminal-playwright-commands-images/playwright-minimal-terminal-logging.jpg)

## 
```
npx playwright test --max-failures=1
```
Stops test execution when the 1st failure or N failures have ocurred:
![playwright-stop-after-1st-failure](terminal-playwright-commands-images/playwright-stop-after-1st-failure.jpg)