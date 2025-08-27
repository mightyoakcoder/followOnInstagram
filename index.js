require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const Instauto = require('instauto');

// configure the limites for our Instagram bot. Only allow 20 new follows per
// hour and limit the total number of follwers per day to 150. set a max
// number of likes per day to 50

const options = {
  cookiesPath: './cookies.json',

  username: process.env.INSTA_USERNAME,
  password: process.env.INSTA_PASSWORD,


  maxFollowsPerHour: 20,
  maxFollowsPerDay: 150,
  maxLikesPerDay: 50,

  // dontUnfollowUntilTimeElapsed: 3 * 24 * 60 * 60 * 1000,

  excludeUsers: [],

  dryRun: false,
};

(async () => {
  let browser;

  try {
    browser = await puppeteer.launch({ headless: false, 
      executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium', 
      timeout: 120000, 
      args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ] 
  });
    const [page] = await browser.pages();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    page.setDefaultNavigationTimeout(120000); // 2 minutes

    // Create a database where state will be loaded/saved to
    const instautoDb = await Instauto.JSONDB({
      // Will store a list of all users that have been followed before, to prevent future re-following.
      followedDbPath: './followed.json',
      // Will store all unfollowed users here
      unfollowedDbPath: './unfollowed.json',
      // Will store all likes here
      likedPhotosDbPath: './liked-photos.json',
    });

    const instauto = await Instauto(instautoDb, browser, options);

    // // List of usernames that we should follow the followers of, can be celebrities etc.
    // const usersToFollowFollowersOf = ['dedik_armawann'];

    // Now go through each of these and follow a certain amount of their followers
    await instauto.followUsers(["4weeks2020"]);

    await instauto.sleep(10 * 60 * 1000);

    // This is used to unfollow people - auto-followed AND manually followed -
    // who are not following us back, after some time has passed
    // (config parameter dontUnfollowUntilTimeElapsed)
    // await instauto.unfollowNonMutualFollowers();

    // await instauto.sleep(10 * 60 * 1000);

    // Unfollow auto-followed users (regardless of whether they are following us)
    // after a certain amount of days
    // await instauto.unfollowOldFollowed({ ageInDays: 60 });

    console.log('Done running');

    // await instauto.sleep(30000);
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Closing browser');
    if (browser) await browser.close();
  }
})();