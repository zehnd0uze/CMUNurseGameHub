import puppeteer from 'puppeteer';
import path from 'path';

const games = [
  { id: 'pmcgo', url: 'https://cmu.to/pmcgo' },
  { id: 'medprep', url: 'https://app.nurse.cmu.ac.th/medical-preparation/' },
  { id: 'eyecan', url: 'https://app.nurse.cmu.ac.th/eyecando/' },
  { id: 'nurse360', url: 'https://mis.nurse.cmu.ac.th/nurse360/' },
];

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  for (const game of games) {
    console.log(`Navigating to ${game.url}...`);
    try {
      await page.goto(game.url, { waitUntil: 'networkidle2', timeout: 30000 });
      console.log(`Waiting 15 seconds for ${game.id} to load...`);
      await new Promise(r => setTimeout(r, 15000));

      // Attempt to click center in case there's a play button
      await page.mouse.click(640, 360);
      await new Promise(r => setTimeout(r, 5000));

      const outPath = path.join(process.cwd(), 'public', `scene_${game.id}.png`);
      await page.screenshot({ path: outPath });
      console.log(`Saved screenshot to ${outPath}`);
    } catch (e) {
      console.error(`Failed to capture ${game.id}:`, e.message);
    }
  }

  await browser.close();
  console.log('Done!');
})();
