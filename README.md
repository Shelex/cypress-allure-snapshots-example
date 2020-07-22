> This repo is an example of using `@shelex/cypress-allure-plugin` with `cypress-plugin-snapshots`

## Description

-   Example of generated [Allure report](https://shelex.github.io/cypress-allure-snapshots-example/allure-report/index.html)
-   parsing and attaching images to Allure report is in [cypress/support/index.js](cypress/support/index.js)

## Known issues

-   when `cypress-plugin-snapshots` takes a screenshot, cypress put it inside `cypress/screenshots` folder, but then plugin moves it into [cypress/integration/**image_snapshots**](cypress/integration/__image_snapshots__) folder. As Allure plugin catches `cy.screenshot` command, it is added to final report, however screenshot is not available. It could be fixed on `cypress-plugin-snapshots` side by copying screenshot instead of moving.

-   as mentioned in issue https://github.com/meinaart/cypress-plugin-snapshots/issues/136 - you should add resolution for `js-base64` dependency in [package.json](package.json) by yourself:

```json
"resolutions": {
       "js-base64": "2.5.2"
   }
```

-   Allure API for attachments in `@shelex/cypress-allure-plugin` will be revisited, as for now it is possible to attach files passing content only, but actually it would be nice having an option to pass relative path.  
    Workaround:

```javascript
cy.allure().then((allure) => {
    allure.currentTest.addAttachment('name', 'image/png', relativePath);
});
```
