import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const fontsDir = path.join(__dirname, 'fonts');
GlobalFonts.registerFromPath(path.join(fontsDir, 'Inter-Medium.ttf'), 'Inter');
GlobalFonts.registerFromPath(path.join(fontsDir, 'PlayfairDisplay-Regular.ttf'), 'Playfair Display');
GlobalFonts.registerFromPath(path.join(fontsDir, 'PlayfairDisplay-Italic.ttf'), 'Playfair Display Italic');

async function generateOGImage() {
  const heroPath = path.join(__dirname, '../client/public/og-hero.jpg');
  const outputPath = path.join(__dirname, '../client/public/opengraph.jpg');

  const heroBuffer = await sharp(heroPath)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'center' })
    .toBuffer();

  const canvas = createCanvas(OG_WIDTH, OG_HEIGHT);
  const ctx = canvas.getContext('2d');

  const heroImage = await loadImage(heroBuffer);
  ctx.drawImage(heroImage, 0, 0, OG_WIDTH, OG_HEIGHT);

  const gradient = ctx.createLinearGradient(0, 0, 0, OG_HEIGHT);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.15)');
  gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, OG_WIDTH, OG_HEIGHT);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = '16px Inter';
  ctx.fillText('3 5 5   M A I N   S T R E E T   •   A R M O N K ,   N Y', OG_WIDTH / 2, 160);

  ctx.fillStyle = 'white';
  ctx.font = '80px "Playfair Display"';
  ctx.fillText('The Destination', OG_WIDTH / 2, 285);
  ctx.fillText('Workplace', OG_WIDTH / 2, 380);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = 'italic 22px "Playfair Display Italic"';
  ctx.fillText('"Form follows function, but feeling follows form."', OG_WIDTH / 2, 480);

  const pngBuffer = canvas.toBuffer('image/png');
  
  await sharp(pngBuffer)
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log(`✓ Generated OG image with brand fonts: ${outputPath}`);
}

generateOGImage().catch(err => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
