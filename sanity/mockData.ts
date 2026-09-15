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
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Brilliant Zircon Halo Locket Set with Tops by Faraz Faheem',
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
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
        alt: 'Imperial Emerald Floral Locket Set with Tops by Faraz Faheem',
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
        url: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=80',
        alt: 'Pink Floral Blossom Tops by Faraz Faheem',
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
        url: 'https://images.unsplash.com/photo-1611591475152-4735e1823901?auto=format&fit=crop&w=1000&q=80',
        alt: 'Ruby Rose Floral Locket Set with Tops by Faraz Faheem',
      },
    ],
    description:
      'Captivating dark pink ruby-hued synthetic gemstone locket set hand-set in certified 925 sterling silver. Finished with high-durability rhodium polish. Includes matching silver chain and tops. Handcrafted on order by Faraz Faheem Atelier.',
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
        url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
        alt: 'Soft Pink Halo Pendant with Chain by Faraz Faheem',
      },
    ],
    description:
      'Delicate handcrafted 925 pure sterling silver pendant set with a radiant round synthetic pink gemstone and sparkling zircon halo. Includes authentic 925 sterling silver chain. Treated with tarnish-resistant rhodium finish.',
  },
  {
    _id: 'ff-006',
    title: 'Celeste Channel Tennis Bracelet',
    slug: 'celeste-channel-tennis-bracelet',
    category: 'bracelets',
    price: 68000,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80',
        alt: 'Celeste Channel Tennis Bracelet in 925 silver',
      },
    ],
    description:
      'Precision articulated links engineered for effortless wrist drape in solid 925 sterling silver. Finished with double safety clasp and triple rhodium polish for dazzling everyday wear.',
  },
  {
    _id: 'ff-007',
    title: 'Noor-e-Jahan Vintage Ruby Bridal Set',
    slug: 'noor-e-jahan-vintage-ruby-bridal-set',
    category: 'bridal',
    price: 135000,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80',
        alt: 'Noor-e-Jahan Vintage Ruby Bridal Set in solid 925 silver',
      },
    ],
    description:
      'Inspired by heritage Mughal court jewellery. Handcrafted filigree setting in solid 925 sterling silver with royal crimson gemstones and suspended pearl droplets. Includes matching chandelier jhumkas.',
  },
  {
    _id: 'ff-008',
    title: 'Eternal Solitaire Diamond Cut Ring',
    slug: 'eternal-solitaire-diamond-cut-ring',
    category: 'rings',
    price: 26000,
    inStock: true,
    isFeatured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
        alt: 'Eternal Solitaire Ring in solid 925 sterling silver',
      },
    ],
    description:
      'A timeless solitaire ring handcrafted in solid 925 sterling silver with mirror rhodium finish. Features a brilliant-cut center gemstone surrounded by pavé setting for unparalleled sparkle.',
  },
  {
    _id: 'ff-009',
    title: 'Kashmir Blue Sapphire Teardrop Pendant',
    slug: 'kashmir-blue-sapphire-teardrop-pendant',
    category: 'pendants',
    price: 45000,
    inStock: true,
    isFeatured: false,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
        alt: 'Kashmir Blue Sapphire Pendant with 925 silver chain',
      },
    ],
    description:
      'A rich royal blue teardrop gemstone suspended on an authentic 925 sterling silver chain. Protected by anti-tarnish rhodium coating to maintain brilliance forever.',
  },
  {
    _id: 'ff-010',
    title: 'Royal Teardrop Moissanite Tops',
    slug: 'royal-teardrop-moissanite-tops',
    category: 'earrings',
    price: 52000,
    inStock: true,
    isFeatured: false,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
        alt: 'Royal Teardrop Tops in 925 Sterling Silver',
      },
    ],
    description:
      'Cascading teardrop cuts designed to capture light from every angle. Hand-set in solid 925 sterling silver with comfortable screw-back posts.',
  },
];
