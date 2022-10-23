const { spawn } = require('child_process');
const fs = require('fs');
const delay = require('delay');

module.exports = (hermione) => {
    let selenium;

    hermione.on(hermione.events.RUNNER_START, async () => {
        const file = fs.openSync('selenium.log', 'w');

        selenium = spawn('selenium-standalone', ['start'], {
            stdio: ['ignore', file, file],
            shell: true,
        });

        await delay(2000);
    });

    hermione.on(hermione.events.RUNNER_END, () => {
        return new Promise(async (resolve) => {
            await delay(1000);
            selenium.on('exit', resolve);
            selenium.kill();
        });
    });
};
