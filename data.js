let usersToFollow = [
  "alberta.tech",
  "theprimeagen",
  "tedchroastshow",
  "rita_codes",
  "asistilli",
  "realtechpunks",
  "github",
  "educativeinc",
  "tech_wizzdom",
  "thelonercodergirl",
  "coderscult",
  "codedatt",
  "thehackathonguy",
  "codevmonkey",
  "404mediaco",
  "bytetag.co",
  "37signalshq",
  "generalassembly",
  "codinginflow",
  "hubspotacademy",
  "mockinterviews.dev",
  "lizthedeveloper",
  "coding.with.jp",
  "sajjaad.khader",
  "tldv.io",
  "the_bearded_programmer",
  "coding_guruu_",
  "olesia_learns",
  "shaeinthecloud",
  "devibe.network",
  "mattupham",
  "codecrafter.io",
  "siliconvalleybets",
  "thatcodingvibe",
  "coderscult",
  "peachietech",
  "trumancyber",
  "cybersecuritygirl",
  "digitalsamaritan",
  "clickup",
  "activeprogrammer",
  "meglovesdata",
  "mewtru",
  "addielamarr.sh",
  "techroastshow",
  "coders.learning",
  "harpercarollai",
  "andrewcodesmith",
  "diariesofacodegirl",
  "opportunityhack",
  "pm_alec",
  "codemyjourney",
  "olha.codes",
  "pikacodes",
  "vibing_javascript",
];

// Function to follow specific usernames listed in an array
async function followSpecificUsers(usernames, delay = 2000) {
  for (let username of usernames) {
    // Search for user on page by username text near a Follow button
    let userButton = Array.from(document.querySelectorAll('button')).find(btn => {
      let parent = btn.closest('a');
      return btn.innerText === "Follow" && parent && parent.href && parent.href.includes(username);
    });

    if (userButton) {
      userButton.click();
      console.log('Following user:', username);
      await new Promise(resolve => setTimeout(resolve, delay));
    } else {
      console.log('User not found / button not visible for:', username);
    }
  }
}

followSpecificUsers(usersToFollow, 2000);
