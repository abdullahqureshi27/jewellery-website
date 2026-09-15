import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local
const envPath = path.resolve(__dirname, '../.env.local');
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
const token = envConfig.SANITY_API_TOKEN;

if (!token) {
  console.error('Missing SANITY_API_TOKEN in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const REAL_PRODUCTS = [
  {
    title: 'Brilliant Zircon Halo Locket Set with Tops',
    slug: 'brilliant-zircon-halo-locket-set',
    category: 'locket-sets',
    price: 56600,
    isFeatured: true,
    imageFile: 'ff-zircon-locket-set.jpeg',
    description:
      'Handcrafted in pure 925 solid sterling silver with premium anti-tarnish rhodium polish. Features a brilliant-cut center with surrounding high-grade zircons. Complete set includes matching 925 silver chain and matching tops presented in official FF Jewellers velvet heirloom box.',
  },
  {
    title: 'Imperial Emerald Floral Locket Set with Tops',
    slug: 'imperial-emerald-floral-locket-set',
    category: 'locket-sets',
    price: 37800,
    isFeatured: true,
    imageFile: 'ff-emerald-locket-set.jpeg',
    description:
      'Exquisite 3-piece locket set featuring deep royal green synthetic emeralds encircled by high-clarity zircon petals. Meticulously handcrafted in 925 solid sterling silver with rhodium polish. Includes matching 925 silver chain and matching floral tops.',
  },
  {
    title: 'Pink Floral Blossom Tops (Stud Earrings)',
    slug: 'pink-floral-blossom-tops',
    category: 'earrings',
    price: 26700,
    isFeatured: true,
    imageFile: 'ff-pink-blossom-tops.jpeg',
    description:
      'Handcrafted 925 solid sterling silver tops featuring a synthetic pink gemstone surrounded by micro-pave zircons. Finished with triple-pass mirror rhodium polish for long-lasting tarnish resistance. Lightweight and comfortable for daily elegance.',
  },
  {
    title: 'Ruby Rose Floral Locket Set with Tops',
    slug: 'ruby-rose-floral-locket-set',
    category: 'locket-sets',
    price: 26600,
    isFeatured: true,
    imageFile: 'ff-ruby-locket-set.jpeg',
    description:
      'Captivating dark pink ruby-hued synthetic gemstone locket set hand-set in certified 925 sterling silver. Finished with high-durability rhodium polish. Includes matching silver chain and tops. Handcrafted on order by FFZever Atelier.',
  },
  {
    title: 'Soft Pink Halo Pendant with Silver Chain',
    slug: 'soft-pink-halo-pendant-chain',
    category: 'pendants',
    price: 14700,
    isFeatured: true,
    imageFile: 'ff-soft-pink-pendant.jpeg',
    description:
      'Delicate handcrafted 925 pure sterling silver pendant set with a radiant round synthetic pink gemstone and sparkling zircon halo. Includes authentic 925 sterling silver chain. Treated with tarnish-resistant rhodium finish.',
  },
];

async function sync() {
  console.log(`Connecting to Sanity (${projectId} / ${dataset})...`);

  // 1. Delete all existing product documents
  const existing = await client.fetch('*[_type == "product"]{_id, title}');
  console.log(`Found ${existing.length} existing products in Sanity.`);
  for (const doc of existing) {
    console.log(`Deleting old product: ${doc.title} (${doc._id})...`);
    await client.delete(doc._id);
  }

  // 2. Upload and insert the 5 authentic products
  for (const item of REAL_PRODUCTS) {
    console.log(`\nAdding real product: ${item.title}...`);
    const filePath = path.resolve(__dirname, '../public/products', item.imageFile);
    let imageAsset = null;

    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      const asset = await client.assets.upload('image', buffer, {
        filename: item.imageFile,
      });
      console.log(`  Uploaded asset ID: ${asset._id}`);
      imageAsset = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
        alt: item.title,
      };
    } else {
      console.warn(`  Image file not found: ${filePath}`);
    }

    const newDoc = {
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

    const res = await client.create(newDoc);
    console.log(`  ✅ Created product with ID: ${res._id}`);
  }

  // 3. Verify
  const verified = await client.fetch('*[_type == "product"]{_id, title, price, category}');
  console.log('\n--- VERIFIED SANITY PRODUCTS ---');
  console.log(verified);
  console.log('--- ALL DONE ---');
}

sync().catch(console.error);
