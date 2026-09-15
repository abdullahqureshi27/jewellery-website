export interface JewelleryProduct {
  _id: string;
  title: string;
  slug: string;
  itemCode?: string;
  category: 'locket-sets' | 'pendants' | 'earrings' | 'bracelets' | 'bridal' | 'rings';
  metal?: string;
  gemstone?: string;
  caratWeight?: string;
  price: number;
  originalPrice?: number;
  priceOnRequest?: boolean;
  inStock: boolean;
  isFeatured: boolean;
  images: {
    url: string;
    alt: string;
  }[];
  description: string;
}

export const MOCK_JEWELLERY_PRODUCTS: JewelleryProduct[] = [
  {
    _id: 'ff-001',
    title: 'Brilliant Zircon Halo Locket Set with Tops',
    slug: 'brilliant-zircon-halo-locket-set',
    itemCode: 'FF-LS-101',
    category: 'locket-sets',
    metal: '925 Sterling Silver (Rhodium Polish)',
    gemstone: 'High-Quality Brilliant Zircon',
    price: 56600,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Brilliant Zircon Halo Locket Set with Tops by Faraz Faheem',
      },
      {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
        alt: '925 Silver Locket Set with Chain and Matching Tops',
      },
    ],
    description:
      'Handcrafted in pure 925 solid sterling silver with premium anti-tarnish rhodium polish. Features a brilliant-cut center with surrounding high-grade zircons. Complete set includes matching 925 silver chain and matching tops (earrings) presented in official FF Jewellers velvet heirloom box.',
  },
  {
    _id: 'ff-002',
    title: 'Imperial Emerald Floral Locket Set with Tops',
    slug: 'imperial-emerald-floral-locket-set',
    itemCode: 'FF-LS-102',
    category: 'locket-sets',
    metal: '925 Sterling Silver (Rhodium Polish)',
    gemstone: 'Synthetic Emerald (Royal Green)',
    price: 37800,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
        alt: 'Imperial Emerald Floral Locket Set with Tops by Faraz Faheem',
      },
      {
        url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
        alt: 'Emerald Floral Pendant and Tops Set',
      },
    ],
    description:
      'Exquisite 3-piece locket set featuring deep royal green synthetic emeralds encircled by high-clarity zircon petals. Meticulously handcrafted in 925 solid sterling silver with rhodium polish. Includes matching 925 silver chain and matching floral tops.',
  },
  {
    _id: 'ff-003',
    title: 'Pink Floral Blossom Tops (Stud Earrings)',
    slug: 'pink-floral-blossom-tops',
    itemCode: 'FF-ER-201',
    category: 'earrings',
    metal: '925 Sterling Silver (Rhodium Polish)',
    gemstone: 'Synthetic Pink Sapphire & Zircon Halo',
    price: 26700,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=80',
        alt: 'Pink Floral Blossom Tops by Faraz Faheem',
      },
      {
        url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
        alt: '925 Silver Pink Tops on Model',
      },
    ],
    description:
      'Handcrafted 925 solid sterling silver tops featuring a synthetic pink gemstone surrounded by micro-pave zircons. Finished with triple-pass mirror rhodium polish for long-lasting tarnish resistance. Lightweight and comfortable for both daily elegance and special occasions.',
  },
  {
    _id: 'ff-004',
    title: 'Ruby Rose Floral Locket Set with Tops',
    slug: 'ruby-rose-floral-locket-set',
    itemCode: 'FF-LS-103',
    category: 'locket-sets',
    metal: '925 Sterling Silver (Rhodium Polish)',
    gemstone: 'Synthetic Ruby (Dark Pink)',
    price: 26600,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611591475152-4735e1823901?auto=format&fit=crop&w=1000&q=80',
        alt: 'Ruby Rose Floral Locket Set with Tops by Faraz Faheem',
      },
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Dark Pink Floral Locket Set Detail',
      },
    ],
    description:
      'Captivating dark pink ruby-hued synthetic gemstone locket set hand-set in certified 925 sterling silver. Finished with high-durability rhodium polish. Includes matching silver chain and tops. Handcrafted on order by Faraz Faheem Atelier.',
  },
  {
    _id: 'ff-005',
    title: 'Soft Pink Halo Pendant with Silver Chain',
    slug: 'soft-pink-halo-pendant-chain',
    itemCode: 'FF-PD-301',
    category: 'pendants',
    metal: '925 Sterling Silver (Rhodium Polish)',
    gemstone: 'Synthetic Pink Sapphire',
    price: 14700,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
        alt: 'Soft Pink Halo Pendant with Chain by Faraz Faheem',
      },
      {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
        alt: 'Pink Halo Pendant Detail Shot',
      },
    ],
    description:
      'Delicate handcrafted 925 pure sterling silver pendant set with a radiant round synthetic pink gemstone and sparkling zircon halo. Includes authentic 925 sterling silver chain. Treated with tarnish-resistant rhodium finish. Delivered across Pakistan in luxury FF Jewellers packaging.',
  },
  {
    _id: 'zn-003',
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
      {
        url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
        alt: 'Seraphina TearDrop Moissanite Drop Earrings close-up',
      },
      {
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
        alt: 'Earrings lifestyle shot on model',
      },
    ],
    description:
      'Cascading teardrop cuts designed to capture evening light from every angle. Guaranteed to never cloud or lose luster, certified by Global Gemological Research (GRA).',
  },
  {
    _id: 'zn-004',
    title: 'Celeste Tennis Bangle with Channel Setting',
    slug: 'celeste-tennis-bangle-channel-setting',
    itemCode: 'ZN-BNG-4045',
    category: 'bracelets',
    metal: 'Platinum Plated Silver',
    gemstone: 'D Color VVS1 Moissanite (GRA Certified)',
    caratWeight: '4.80 CT Total Weight',
    price: 68000,
    originalPrice: 79000,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80',
        alt: 'Celeste Tennis Bangle with Channel Setting macro',
      },
      {
        url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80',
        alt: 'Bangle stacked on wrist',
      },
    ],
    description:
      'Precision articulated links engineered for effortless wrist drape. Solid double-safety clasp with engraved 925 authenticity hallmark.',
  },
  {
    _id: 'zn-005',
    title: 'Noor-e-Jahan Vintage Ruby Bridal Choker Set',
    slug: 'noor-e-jahan-vintage-ruby-bridal-choker-set',
    itemCode: 'ZN-BRD-5099',
    category: 'bridal',
    metal: '18K Yellow Gold Vermeil',
    gemstone: 'Natural Burma Ruby',
    caratWeight: '8.50 CT Gems + Moissanite Cluster',
    price: 135000,
    priceOnRequest: false,
    inStock: false,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80',
        alt: 'Noor-e-Jahan Vintage Ruby Bridal Set on satin',
      },
      {
        url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80',
        alt: 'Bridal Set editorial photoshoot',
      },
    ],
    description:
      'Inspired by Mughal heritage court jewellery. Handcrafted filigree setting with certified pigeon-blood rubies and suspended pearl droplets. Includes matching chandelier jhumkas.',
  },
  {
    _id: 'zn-006',
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
      {
        url: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1000&q=80',
        alt: 'Eternity Pavé Band in rose gold',
      },
      {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
        alt: 'Eternity Pavé Band worn stacked',
      },
    ],
    description:
      'A seamless circle of continuous light. 360-degree pavé setting crafted with precision microscopes to ensure a flat, snag-free everyday wear.',
  },
  {
    _id: 'zn-007',
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
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Kashmir Blue Sapphire Pendant',
      },
      {
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
        alt: 'Sapphire Pendant macro reflection',
      },
    ],
    description:
      'A rich royal blue sapphire suspended on an Italian sterling silver box chain. Rhodium dip protects against oxidation and guarantees a lasting mirror sheen.',
  },
  {
    _id: 'zn-008',
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
      {
        url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
        alt: 'Baroque Cultured Pearl Studs',
      },
      {
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
        alt: 'Pearl Studs on model',
      },
    ],
    description:
      'Selected for their deep iridescent luster and satiny overtone. Crowned with miniature moissanite florets in warm 18K yellow gold vermeil.',
  },
];
