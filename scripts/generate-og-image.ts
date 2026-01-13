import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOGImage() {
  const heroPath = path.join(__dirname, '../client/public/og-hero.jpg');
  const outputPath = path.join(__dirname, '../client/public/opengraph.jpg');

  const addressText = '355 MAIN STREET • ARMONK, NY';
  const headlineText1 = 'The Destination';
  const headlineText2 = 'Workplace';
  const quoteText = '"Form follows function, but feeling follows form."';

  const svgOverlay = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="overlayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.1)"/>
          <stop offset="40%" style="stop-color:rgba(0,0,0,0.25)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.45)"/>
        </linearGradient>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&amp;family=Playfair+Display:wght@400&amp;display=swap');
          .address { 
            font-family: 'Inter', sans-serif; 
            font-size: 16px; 
            font-weight: 500;
            letter-spacing: 3px;
            fill: white; 
          }
          .headline { 
            font-family: 'Playfair Display', Georgia, serif; 
            font-size: 80px; 
            font-weight: 400;
            fill: white; 
          }
          .quote { 
            font-family: 'Playfair Display', Georgia, serif; 
            font-size: 22px; 
            font-style: italic;
            fill: rgba(255,255,255,0.9); 
          }
        </style>
      </defs>
      
      <!-- Dark gradient overlay -->
      <rect width="100%" height="100%" fill="url(#overlayGradient)"/>
      
      <!-- Address -->
      <text x="50%" y="175" text-anchor="middle" class="address">${addressText}</text>
      
      <!-- Headlines centered -->
      <text x="50%" y="290" text-anchor="middle" class="headline">${headlineText1}</text>
      <text x="50%" y="385" text-anchor="middle" class="headline">${headlineText2}</text>
      
      <!-- Quote -->
      <text x="50%" y="480" text-anchor="middle" class="quote">${quoteText}</text>
    </svg>
  `;

  try {
    await sharp(heroPath)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'center' })
      .composite([
        {
          input: Buffer.from(svgOverlay),
          top: 0,
          left: 0,
        }
      ])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`✓ Generated OG image: ${outputPath}`);
  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();
