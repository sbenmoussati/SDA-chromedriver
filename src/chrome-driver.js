const webdriverio = require('webdriverio');
const options = {
  hostname: 'localhost',
  port: 9515,
  capabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Applications/Symphony.app/Contents/MacOS/Symphony',
      args: [
        '--remote-debugging-port=9222',
        '--remote-allow-origins=http://localhost:9222',
        '--userDataPath=/tmp/Symphony-dev99',
        '--multiInstance',
        '--no-sandbox',
        '--headless',
        '--url=https://st3.dev.symphony.com',
      ],
    },
  },
};

let client;

(async () => {
  client = await webdriverio.remote(options);
  const elem = await client.$('#signin-email');
  await elem.waitForDisplayed({ timeout: 3000 });
  await client.saveScreenshot(
    './before-redirect.png',
  );
  await client.url('http://google.com');
  await client.saveScreenshot(
    './after-redirect.png',
  );
})().then(
  () => client.deleteSession(),
  (err) => {
    console.log(`Something went wrong: ${err.stack}`);
    return client.deleteSession();
  },
);
