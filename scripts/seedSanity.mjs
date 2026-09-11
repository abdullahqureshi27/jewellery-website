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
    title: 'Aurelia 2.0 CT Moissanite Solitaire Ring',
    slug: 'aurelia-moissanite-solitaire-ring',
    itemCode: 'ZN-RNG-1042',
    category: 'rings',
    metal: '925 Sterling Silver (Rhodium Plated)',
    gemstone: 'D Color VVS1 Moissanite (GRA Certified)',
    caratWeight: '2.00 CT (8.0mm)',
    price: 34500,
    originalPrice: 42000,
    inStock: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Indulge in timeless brilliance. Hand-set with a certified 2.00 CT round brilliant D Color VVS1 moissanite atop a high-polish 925 sterling silver band treated with triple-layer platinum rhodium.',
  },
  {
    title: 'Emerald Empress Royal Halo Pendant',
    slug: 'emerald-empress-royal-halo-pendant',
    itemCode: 'ZN-PND-2089',
    category: 'pendants',
    metal: '18K Yellow Gold Vermeil',
    gemstone: 'Lab-Created Emerald',
    caratWeight: '3.20 CT Cushion Cut',
    price: 48000,
    originalPrice: 56000,
    inStock: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'A breathtaking deep Colombian-green cushion cut emerald wrapped in a sparkling micropavé moissanite halo. Finished with 18k yellow gold vermeil over hallmarked 925 silver.',
  },
  {
    title: 'Seraphina TearDrop Moissanite Drop Earrings',
    slug: 'seraphina-teardrop-moissanite-drop-earrings',
    itemCode: 'ZN-EAR-3012',
    category: 'earrings',
    metal: '925 Sterling Silver (Rhodium Plated)',
    gemstone: 'D Color VVS1 Moissanite (GRA Certified)',
    caratWeight: '2.50 CT Each (5.0 CT Total)',
    price: 52000,
    inStock: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Cascading teardrop cuts designed to capture evening light from every angle. Guaranteed to never cloud or lose luster, certified by Global Gemological Research (GRA).',
  },
  {
    title: 'Celeste Tennis Bangle with Channel Setting',
    slug: 'celeste-tennis-bangle-channel-setting',
    itemCode: 'ZN-BNG-4045',
    category: 'bangles',
    metal: 'Platinum Plated Silver',
    gemstone: 'D Color VVS1 Moissanite (GRA Certified)',
    caratWeight: '4.80 CT Total Weight',
    price: 68000,
    originalPrice: 79000,
    inStock: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Precision articulated links engineered for effortless wrist drape. Solid double-safety clasp with engraved 925 authenticity hallmark.',
  },
  {
    title: 'Noor-e-Jahan Vintage Ruby Bridal Choker Set',
    slug: 'noor-e-jahan-vintage-ruby-bridal-choker-set',
    itemCode: 'ZN-BRD-5099',
    category: 'bridal',
    metal: '18K Yellow Gold Vermeil',
    gemstone: 'Natural Burma Ruby',
    caratWeight: '8.50 CT Gems + Moissanite Cluster',
    price: 135000,
    inStock: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Inspired by Mughal heritage court jewellery. Handcrafted filigree setting with certified pigeon-blood rubies and suspended pearl droplets. Includes matching chandelier jhumkas.',
  },
  {
    title: 'Eternity Pavé Diamond Cut Band',
    slug: 'eternity-pave-diamond-cut-band',
    itemCode: 'ZN-RNG-1090',
    category: 'rings',
    metal: 'Rose Gold Plated 925 Silver',
    gemstone: 'D Color VVS1 Moissanite (GRA Certified)',
    caratWeight: '1.20 CT Total',
    price: 26000,
    inStock: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'A seamless circle of continuous light. 360-degree pavé setting crafted with precision microscopes to ensure a flat, snag-free everyday wear.',
  },
  {
    title: 'Kashmir Blue Sapphire Teardrop Pendant',
    slug: 'kashmir-blue-sapphire-teardrop-pendant',
    itemCode: 'ZN-PND-2033',
    category: 'pendants',
    metal: '925 Sterling Silver (Rhodium Plated)',
    gemstone: 'Natural Blue Sapphire',
    caratWeight: '2.80 CT Pear Cut',
    price: 45000,
    inStock: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'A rich royal blue sapphire suspended on an Italian sterling silver box chain. Rhodium dip protects against oxidation and guarantees a lasting mirror sheen.',
  },
  {
    title: 'Baroque Cultured Pearl & Moissanite Studs',
    slug: 'baroque-cultured-pearl-moissanite-studs',
    itemCode: 'ZN-EAR-3055',
    category: 'earrings',
    metal: '18K Yellow Gold Vermeil',
    gemstone: 'Freshwater Cultured Pearl',
    caratWeight: '9.0mm Luster Pearls',
    price: 29000,
    inStock: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Selected for their deep iridescent luster and satiny overtone. Crowned with miniature moissanite florets in warm 18K yellow gold vermeil.',
  },
];

async function uploadImageFromUrl(imageUrl, filename) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload('image', buffer, {
      filename: filename || 'jewel.jpg',
    });
    return asset._id;
  } catch (err) {
    console.warn(`Failed to upload image ${imageUrl}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log(`\n🚀 Starting seeding into Sanity project: ${projectId} (dataset: ${dataset})...\n`);

  for (const item of PRODUCTS_TO_SEED) {
    console.log(`💎 Processing: ${item.title}...`);

    // Upload images to Sanity Asset Lake
    const imageAssets = [];
    for (let i = 0; i < item.images.length; i++) {
      const assetId = await uploadImageFromUrl(item.images[i], `${item.slug}-${i}.jpg`);
      if (assetId) {
        imageAssets.push({
          _key: `img_${Date.now()}_${i}`,
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
          alt: item.title,
        });
      }
    }

    const doc = {
      _type: 'product',
      title: item.title,
      slug: {
        _type: 'slug',
        current: item.slug,
      },
      itemCode: item.itemCode,
      category: item.category,
      metal: item.metal,
      gemstone: item.gemstone,
      caratWeight: item.caratWeight,
      price: item.price,
      originalPrice: item.originalPrice,
      priceOnRequest: false,
      inStock: item.inStock,
      isFeatured: item.isFeatured,
      description: item.description,
      images: imageAssets,
    };

    try {
      const created = await client.create(doc);
      console.log(`   ✅ Created document ID: ${created._id}`);
    } catch (err) {
      console.error(`   ❌ Failed to create product:`, err.message);
    }
  }

  console.log('\n🎉 Seeding complete! All 8 pieces are now in your Sanity Studio.\n');
}

seed();
