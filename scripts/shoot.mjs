import puppeteer from "puppeteer-core";

const OUT = process.argv[2] ?? ".";
const browser = await puppeteer.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:4173", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500));

const sections = [
  "home",
  "experience",
  "projects",
  "architecture",
  "skills",
  "ai",
  "about",
  "testimonials",
  "contact",
];

for (const id of sections) {
  await page.evaluate((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, id);
  await new Promise((r) => setTimeout(r, 1400)); // let reveal animations settle
  await page.screenshot({ path: `${OUT}/${id}.png` });
}

// Section overflow check: capture tall sections' second screen
for (const id of ["projects", "about", "contact"]) {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo(0, el.offsetTop + 900);
  }, id);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${OUT}/${id}-2.png` });
}

// Modal state
await page.evaluate(() => {
  document.getElementById("projects")?.scrollIntoView({ behavior: "instant" });
});
await new Promise((r) => setTimeout(r, 1200));
const btn = await page.$("#projects article button[aria-label^='Open']");
if (btn) {
  await btn.click();
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/modal.png` });
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 500));
}

// Command palette
await page.keyboard.down("Meta");
await page.keyboard.press("k");
await page.keyboard.up("Meta");
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: `${OUT}/palette.png` });
await page.keyboard.press("Escape");

// Light mode hero
await new Promise((r) => setTimeout(r, 400));
await page.evaluate(() => {
  document.querySelector("button[aria-label^='Switch to light']")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: `${OUT}/light-hero.png` });

// Mobile hero + nav
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.evaluate(() => {
  document.documentElement.classList.remove("light");
  localStorage.removeItem("theme");
});
await page.reload({ waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: `${OUT}/mobile-hero.png` });
await page.evaluate(() => {
  document.getElementById("projects")?.scrollIntoView({ behavior: "instant" });
});
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: `${OUT}/mobile-projects.png` });

await browser.close();
console.log("done");
