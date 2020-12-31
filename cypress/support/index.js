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
        cy.allure()
            .label('testType', 'screenshotDiff')
            .attachFile(
                'actual',
                snapshotInfo.actual.path,
                'image/png'
            )
            .attachFile(
                'expected',
                snapshotInfo.expected.path,
                'image/png'
            )
            .attachFile(
                'diff',
                snapshotInfo.diff.path,
                'image/png'
            );
    }
    snapshot = null;
});
