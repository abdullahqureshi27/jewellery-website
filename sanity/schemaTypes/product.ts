export const productType = {
  name: 'product',
  title: 'Jewellery Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      description: 'e.g., Royal D VVS1 Moissanite Solitaire Ring',
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
      description: 'e.g., ZN-RNG-1049 (Used for customer WhatsApp inquiries)',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Rings', value: 'rings' },
          { title: 'Earrings', value: 'earrings' },
          { title: 'Necklaces & Pendants', value: 'pendants' },
          { title: 'Bracelets & Bangles', value: 'bangles' },
          { title: 'Bridal Sets', value: 'bridal' },
        ],
        layout: 'radio',
      },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'metal',
      title: 'Metal & Purity',
      type: 'string',
      options: {
        list: [
          { title: '925 Sterling Silver (Rhodium Plated)', value: '925-silver' },
          { title: '18K Yellow Gold Vermeil', value: '18k-gold-vermeil' },
          { title: 'Rose Gold Plated 925 Silver', value: 'rose-gold' },
          { title: 'Platinum Plated Silver', value: 'platinum-silver' },
        ],
      },
      initialValue: '925-silver',
    },
    {
      name: 'gemstone',
      title: 'Gemstone Type',
      type: 'string',
      options: {
        list: [
          { title: 'D Color VVS1 Moissanite (GRA Certified)', value: 'moissanite' },
          { title: 'Lab-Created Emerald', value: 'emerald' },
          { title: 'Natural Burma Ruby', value: 'ruby' },
          { title: 'Natural Blue Sapphire', value: 'sapphire' },
          { title: 'Freshwater Cultured Pearl', value: 'pearl' },
          { title: 'No Stone / Plain Metal', value: 'none' },
        ],
      },
      initialValue: 'moissanite',
    },
    {
      name: 'caratWeight',
      title: 'Carat Weight / Stone Size',
      type: 'string',
      description: 'e.g., 1.50 CT (7.5mm) or 2.00 CT',
    },
    {
      name: 'price',
      title: 'Showcase Price (PKR)',
      type: 'number',
      description: 'Leave blank if "Price on Request / Custom Inquiry"',
    },
    {
      name: 'originalPrice',
      title: 'Original / Compare Price (PKR)',
      type: 'number',
      description: 'Optional strike-through price for special promotional showcase',
    },
    {
      name: 'priceOnRequest',
      title: 'Price on Request',
      type: 'boolean',
      description: 'If checked, shows "Inquire for Price" instead of numeric price',
      initialValue: false,
    },
    {
      name: 'inStock',
      title: 'In Stock / Ready to Ship',
      type: 'boolean',
      description: 'If false, displays "Made to Order (7-10 Days)"',
      initialValue: true,
    },
    {
      name: 'isFeatured',
      title: 'Feature in Homepage Carousel',
      type: 'boolean',
      description: 'Highlights this piece on the hero or signature showcase',
      initialValue: false,
    },
    {
      name: 'images',
      title: 'Product Images Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enables zoom/focal point directly in Sanity Studio
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text for Accessibility & SEO',
              type: 'string',
            },
          ],
        },
      ],
      validation: (rule: any) => rule.required().min(1),
    },
    {
      name: 'description',
      title: 'Craftsmanship & Details',
      type: 'text',
      rows: 4,
      description: 'Describe the design inspiration, hallmark authenticity, and stone setting.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0',
    },
  },
};
