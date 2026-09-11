export interface JewelleryProduct {
  _id: string;
  title: string;
  slug: string;
  itemCode: string;
  category: 'rings' | 'earrings' | 'pendants' | 'bangles' | 'bridal';
  metal: string;
  gemstone: string;
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
    _id: 'zn-001',
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
      {
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
        alt: 'Aurelia 2.0 CT Moissanite Solitaire Ring close-up on velvet',
      },
      {
        url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
        alt: 'Solitaire Ring worn on model hand',
      },
    ],
    description:
      'Indulge in timeless brilliance. Hand-set with a certified 2.00 CT round brilliant D Color VVS1 moissanite atop a high-polish 925 sterling silver band treated with triple-layer platinum rhodium.',
  },
  {
    _id: 'zn-002',
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
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Emerald Empress Royal Halo Pendant close-up',
      },
      {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
        alt: 'Pendant worn against silk collar',
      },
    ],
    description:
      'A breathtaking deep Colombian-green cushion cut emerald wrapped in a sparkling micropavé moissanite halo. Finished with 18k yellow gold vermeil over hallmarked 925 silver.',
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
    category: 'bangles',
    metal: 'Platinum Plated Silver',
    gemstone: 'D Color VVS1 Moissanite (GRA Certified)',
    caratWeight: '4.80 CT Total Weight',
    price: 68000,
    originalPrice: 79000,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611591475836-8158c54c379a?auto=format&fit=crop&w=1000&q=80',
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
