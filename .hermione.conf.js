module.exports = {
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
    baseUrl: 'https://shri.yandex/hw/store',
    sets: {
        mobile: {
            files: './test/hermione/mobile',
            browsers: ['chromeMobile'],
        },
        desktop: {
            files: './test/hermione/desktop',
            browsers: ['chrome'],
        },
    },
    browsers: {
        chrome: {
            windowSize: '1920x500',
            desiredCapabilities: {
                browserName: 'chrome',
            },
        },
        chromeMobile: {
            windowSize: '576x800',
            desiredCapabilities: { browserName: 'chrome' },
        },
    },
    plugins: {
        'html-reporter/hermione': { path: 'hermone-html-report' },
        'hermione-selenium-standalone-runner': true,
    },
};
