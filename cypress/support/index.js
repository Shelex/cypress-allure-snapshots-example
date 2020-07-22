import '@shelex/cypress-allure-plugin';
import 'cypress-plugin-snapshots/commands';

const path = require('path');

let snapshot;

Cypress.on('log:added', (log) => {
    if (log.name === 'toMatchImageSnapshot') {
        snapshot = log.message;
    }
});

afterEach(() => {
    const state = Cypress.state();
    if (
        state.error &&
        state.error.message === 'Snapshot images do not match.'
    ) {
        if (!snapshot) {
            return;
        }
        const base64 = snapshot
            .replace('[compare snapshot](#cypress-plugin-snapshot-', '')
            .slice(0, -1);
        const snapshotInfo = JSON.parse(atob(base64));
        cy.allure().then((allure) => {
            allure.currentTest.addAttachment(
                'actual',
                'image/png',
                path.join('..', snapshotInfo.actual.path)
            );
            allure.currentTest.addAttachment(
                'expected',
                'image/png',
                path.join('..', snapshotInfo.expected.path)
            );
            allure.currentTest.addAttachment(
                'diff',
                'image/png',
                path.join('..', snapshotInfo.diff.path)
            );
        });
    }
    snapshot = null;
});
