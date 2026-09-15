export interface JewelleryProduct {
  _id: string;
  title: string;
  slug: string;
  category: 'locket-sets' | 'pendants' | 'earrings' | 'bracelets' | 'bridal' | 'rings';
  price: number;
  inStock: boolean;
  isFeatured: boolean;
  images: {
    url: string;
    alt: string;
  }[];
  description: string;
  itemCode?: string;
  metal?: string;
  gemstone?: string;
  caratWeight?: string;
  originalPrice?: number;
  priceOnRequest?: boolean;
}

export const MOCK_JEWELLERY_PRODUCTS: JewelleryProduct[] = [
  {
    _id: 'ff-001',
    title: 'Brilliant Zircon Halo Locket Set with Tops',
    slug: 'brilliant-zircon-halo-locket-set',
    category: 'locket-sets',
    price: 56600,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: '/products/ff-zircon-locket-set.jpeg',
        alt: 'Brilliant Zircon Halo Locket Set with Tops by FFZever',
      },
    ],
    description:
      'Handcrafted in pure 925 solid sterling silver with premium anti-tarnish rhodium polish. Features a brilliant-cut center with surrounding high-grade zircons. Complete set includes matching 925 silver chain and matching tops presented in official FF Jewellers velvet heirloom box.',
  },
  {
    _id: 'ff-002',
    title: 'Imperial Emerald Floral Locket Set with Tops',
    slug: 'imperial-emerald-floral-locket-set',
    category: 'locket-sets',
    price: 37800,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: '/products/ff-emerald-locket-set.jpeg',
        alt: 'Imperial Emerald Floral Locket Set with Tops by FFZever',
      },
    ],
    description:
      'Exquisite 3-piece locket set featuring deep royal green synthetic emeralds encircled by high-clarity zircon petals. Meticulously handcrafted in 925 solid sterling silver with rhodium polish. Includes matching 925 silver chain and matching floral tops.',
  },
  {
    _id: 'ff-003',
    title: 'Pink Floral Blossom Tops (Stud Earrings)',
    slug: 'pink-floral-blossom-tops',
    category: 'earrings',
    price: 26700,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: '/products/ff-pink-blossom-tops.jpeg',
        alt: 'Pink Floral Blossom Tops by FFZever',
      },
    ],
    description:
      'Handcrafted 925 solid sterling silver tops featuring a synthetic pink gemstone surrounded by micro-pave zircons. Finished with triple-pass mirror rhodium polish for long-lasting tarnish resistance. Lightweight and comfortable for daily elegance.',
  },
  {
    _id: 'ff-004',
    title: 'Ruby Rose Floral Locket Set with Tops',
    slug: 'ruby-rose-floral-locket-set',
    category: 'locket-sets',
    price: 26600,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: '/products/ff-ruby-locket-set.jpeg',
        alt: 'Ruby Rose Floral Locket Set with Tops by FFZever',
      },
    ],
    description:
      'Captivating dark pink ruby-hued synthetic gemstone locket set hand-set in certified 925 sterling silver. Finished with high-durability rhodium polish. Includes matching silver chain and tops. Handcrafted on order by FFZever Atelier.',
  },
  {
    _id: 'ff-005',
    title: 'Soft Pink Halo Pendant with Silver Chain',
    slug: 'soft-pink-halo-pendant-chain',
    category: 'pendants',
    price: 14700,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: '/products/ff-soft-pink-pendant.jpeg',
        alt: 'Soft Pink Halo Pendant with Chain by FFZever',
      },
    ],
    description:
      'Delicate handcrafted 925 pure sterling silver pendant set with a radiant round synthetic pink gemstone and sparkling zircon halo. Includes authentic 925 sterling silver chain. Treated with tarnish-resistant rhodium finish.',
  },
];
