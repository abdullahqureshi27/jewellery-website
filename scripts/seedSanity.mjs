/**
 * Automated Seeding Script for Sanity
 * Uploads all 8 curated jewellery showcase products (with real assets) into your live Sanity dataset.
 *
 * Usage:
 * 1. Go to https://www.sanity.io/manage -> Project t9ug7jem -> API -> Tokens
 * 2. Click "Add API token" with Editor/Write permission.
 * 3. Add to your .env.local:
 *    SANITY_API_TOKEN="your_token_here"
 * 4. Run:
 *    node scripts/seedSanity.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...rest] = trimmed.split('=');
      envConfig[key.trim()] = rest.join('=').replace(/^["']|["']$/g, '').trim();
    }
  });
}

const projectId = envConfig.NEXT_PUBLIC_SANITY_PROJECT_ID || 't9ug7jem';
const dataset = envConfig.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = envConfig.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('\n⚠️  MISSING SANITY WRITE TOKEN!');
  console.error('To automatically upload the jewellery products into your live Sanity dataset, we need a write token:');
  console.error('1. Go to: https://www.sanity.io/manage');
  console.error(`2. Select your project: ${projectId}`);
  console.error('3. Click: API -> Tokens -> "Add API token" (Select Role: Editor or Write)');
  console.error('4. Copy the token and add this line to your .env.local:');
  console.error('   SANITY_API_TOKEN="sk..."\n');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const PRODUCTS_TO_SEED = [
  {
    title: 'Brilliant Zircon Halo Locket Set with Tops',
    slug: 'brilliant-zircon-halo-locket-set',
    category: 'locket-sets',
    price: 56600,
    isFeatured: true,
    imagePath: path.resolve(__dirname, '../public/products/ff-zircon-locket-set.jpeg'),
    description:
      'Handcrafted in pure 925 solid sterling silver with premium anti-tarnish rhodium polish. Features a brilliant-cut center with surrounding high-grade zircons. Complete set includes matching 925 silver chain and matching tops presented in official FF Jewellers velvet heirloom box.',
  },
  {
    title: 'Imperial Emerald Floral Locket Set with Tops',
    slug: 'imperial-emerald-floral-locket-set',
    category: 'locket-sets',
    price: 37800,
    isFeatured: true,
    imagePath: path.resolve(__dirname, '../public/products/ff-emerald-locket-set.jpeg'),
    description:
      'Exquisite 3-piece locket set featuring deep royal green synthetic emeralds encircled by high-clarity zircon petals. Meticulously handcrafted in 925 solid sterling silver with rhodium polish. Includes matching 925 silver chain and matching floral tops.',
  },
  {
    title: 'Pink Floral Blossom Tops (Stud Earrings)',
    slug: 'pink-floral-blossom-tops',
    category: 'earrings',
    price: 26700,
    isFeatured: true,
    imagePath: path.resolve(__dirname, '../public/products/ff-pink-blossom-tops.jpeg'),
    description:
      'Handcrafted 925 solid sterling silver tops featuring a synthetic pink gemstone surrounded by micro-pave zircons. Finished with triple-pass mirror rhodium polish for long-lasting tarnish resistance. Lightweight and comfortable for daily elegance.',
  },
  {
    title: 'Ruby Rose Floral Locket Set with Tops',
    slug: 'ruby-rose-floral-locket-set',
    category: 'locket-sets',
    price: 26600,
    isFeatured: true,
    imagePath: path.resolve(__dirname, '../public/products/ff-ruby-locket-set.jpeg'),
    description:
      'Captivating dark pink ruby-hued synthetic gemstone locket set hand-set in certified 925 sterling silver. Finished with high-durability rhodium polish. Includes matching silver chain and tops. Handcrafted on order by FFZever Atelier.',
  },
  {
    title: 'Soft Pink Halo Pendant with Silver Chain',
    slug: 'soft-pink-halo-pendant-chain',
    category: 'pendants',
    price: 14700,
    isFeatured: true,
    imagePath: path.resolve(__dirname, '../public/products/ff-soft-pink-pendant.jpeg'),
    description:
      'Delicate handcrafted 925 pure sterling silver pendant set with a radiant round synthetic pink gemstone and sparkling zircon halo. Includes authentic 925 sterling silver chain. Treated with tarnish-resistant rhodium finish.',
  },
  {
    title: 'Heirloom Zircon Locket Set in Velvet Presentation Case',
    slug: 'heirloom-zircon-locket-set-box',
    category: 'locket-sets',
    price: 56600,
    isFeatured: true,
    imagePath: path.resolve(__dirname, '../public/products/ff-zircon-box.jpeg'),
    description:
      'The signature FFZever Zircon Locket Set showcased in our bespoke velvet presentation case. Pure 925 hallmarked sterling silver, paired with matching Tops earrings and silver chain.',
  },
  {
    title: 'Imperial Emerald Floral Tops & Locket Suite',
    slug: 'imperial-emerald-floral-tops-locket',
    category: 'earrings',
    price: 37800,
    isFeatured: true,
    imagePath: path.resolve(__dirname, '../public/products/ff-emerald-angle.jpeg'),
    description:
      'Side and post angle view highlighting the master craftsmanship, prong precision, and comfort backings of the Imperial Emerald Tops and Locket. Solid 925 pure sterling silver.',
  },
  {
    title: 'Artisan Pavé Zircon Craftsmanship Suite',
    slug: 'artisan-pave-zircon-craftsmanship-suite',
    category: 'pendants',
    price: 28500,
    isFeatured: true,
    imagePath: path.resolve(__dirname, '../public/products/ff-zircon-collage.jpeg'),
    description:
      'A macro showcase of FFZever stone-setting mastery. Solid 925 sterling silver with mirror rhodium finish, handset micro-pavé zircons, and refined prong alignment.',
  },
];

async function uploadLocalImage(filePath, filename) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`Local file not found: ${filePath}`);
      return null;
    }
    const buffer = fs.readFileSync(filePath);
    const asset = await client.assets.upload('image', buffer, {
      filename: filename || 'jewel.jpg',
    });
    return asset._id;
  } catch (err) {
    console.warn(`Failed to upload local image ${filePath}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log(`\n🚀 Starting seeding into Sanity project: ${projectId} (dataset: ${dataset})...\n`);

  for (const item of PRODUCTS_TO_SEED) {
    console.log(`💎 Processing: ${item.title}...`);

    let imageAsset = null;
    if (item.imagePath) {
      const assetId = await uploadLocalImage(item.imagePath, `${item.slug}.jpg`);
      if (assetId) {
        imageAsset = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
          alt: item.title,
        };
      }
    }

    const doc = {
      _type: 'product',
      title: item.title,
      slug: {
        _type: 'slug',
        current: item.slug,
      },
      category: item.category,
      price: item.price,
      isFeatured: item.isFeatured,
      description: item.description,
      image: imageAsset,
    };

    try {
      const created = await client.create(doc);
      console.log(`   ✅ Created document ID: ${created._id}`);
    } catch (err) {
      console.error(`   ❌ Failed to create product:`, err.message);
    }
  }

  console.log('\n🎉 Seeding complete! All FFZever pieces are now in your Sanity Studio.\n');
}

seed();
