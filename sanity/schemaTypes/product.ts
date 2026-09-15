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
      name: 'metal',
      title: 'Metal & Purity',
      type: 'string',
      options: {
        list: [
          { title: '925 Sterling Silver (Rhodium Polish)', value: '925-silver' },
          { title: '925 Sterling Silver (18K Gold Vermeil)', value: '18k-gold-vermeil' },
          { title: '925 Sterling Silver (Rose Gold Plated)', value: 'rose-gold' },
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
          { title: 'High-Quality Zircon (Brilliant Cut)', value: 'zircon' },
          { title: 'Synthetic Pink Sapphire', value: 'pink-sapphire' },
          { title: 'Synthetic Emerald (Royal Green)', value: 'synthetic-emerald' },
          { title: 'Synthetic Ruby (Dark Pink / Red)', value: 'synthetic-ruby' },
          { title: 'D Color VVS1 Moissanite (GRA Certified)', value: 'moissanite' },
          { title: 'Freshwater Cultured Pearl', value: 'pearl' },
          { title: 'No Stone / Pure Silver', value: 'none' },
        ],
      },
      initialValue: 'zircon',
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
