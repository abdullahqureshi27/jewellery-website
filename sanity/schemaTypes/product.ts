export const productType = {
  name: 'product',
  title: 'Jewellery Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      description: 'e.g., Brilliant Zircon Halo Locket Set with Tops',
      validation: (rule: any) => rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug (URL identifier)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'itemCode',
      title: 'SKU / Item Code',
      type: 'string',
      description: 'e.g., FF-LS-101 (Used for customer WhatsApp inquiries)',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Locket Sets (Pendant + Chain + Tops)', value: 'locket-sets' },
          { title: 'Pendants', value: 'pendants' },
          { title: 'Ear rings (Tops / Studs)', value: 'earrings' },
          { title: 'Bracelets', value: 'bracelets' },
          { title: 'Bridal Sets', value: 'bridal' },
          { title: 'Rings (Solitaires & Bands)', value: 'rings' },
        ],
        layout: 'radio',
      },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'price',
      title: 'Price (PKR)',
      type: 'number',
      description: 'Price in Pakistani Rupees (e.g. 26600)',
      validation: (rule: any) => rule.required().min(0),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload product photo',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'metal',
      title: 'Metal & Purity',
      type: 'string',
      options: {
        list: [
          { title: '925 Sterling Silver (Rhodium Polish)', value: '925 Sterling Silver (Rhodium Polish)' },
          { title: '925 Sterling Silver (18K Gold Vermeil)', value: '18K Yellow Gold Vermeil' },
          { title: '925 Sterling Silver (Rose Gold Plated)', value: 'Rose Gold Plated 925 Silver' },
        ],
      },
      initialValue: '925 Sterling Silver (Rhodium Polish)',
    },
    {
      name: 'gemstone',
      title: 'Gemstone Type',
      type: 'string',
      options: {
        list: [
          { title: 'High-Quality Brilliant Zircon', value: 'High-Quality Brilliant Zircon' },
          { title: 'Synthetic Pink Sapphire', value: 'Synthetic Pink Sapphire' },
          { title: 'Synthetic Emerald (Royal Green)', value: 'Synthetic Emerald (Royal Green)' },
          { title: 'Synthetic Ruby (Dark Pink)', value: 'Synthetic Ruby (Dark Pink)' },
          { title: 'D Color VVS1 Moissanite (GRA Certified)', value: 'D Color VVS1 Moissanite (GRA Certified)' },
          { title: 'Freshwater Cultured Pearl', value: 'Freshwater Cultured Pearl' },
          { title: 'Pure 925 Silver (No Stone)', value: 'Pure 925 Silver (No Stone)' },
        ],
      },
      initialValue: 'High-Quality Brilliant Zircon',
    },
    {
      name: 'isFeatured',
      title: 'Feature on Homepage',
      type: 'boolean',
      description: 'Showcase this piece in signature carousels',
      initialValue: false,
    },
    {
      name: 'description',
      title: 'Description & Inclusions',
      type: 'text',
      rows: 4,
      description: 'e.g. Handcrafted in 925 silver. Includes matching chain & tops. Delivered in FF Jewellers box.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
};
