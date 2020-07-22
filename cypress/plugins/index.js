/// <reference types="cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />
// ***********************************************************

const AllureWriter = require('@shelex/cypress-allure-plugin/writer');
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    AllureWriter(on, config);
    initPlugin(on, config);
    return config;
};
