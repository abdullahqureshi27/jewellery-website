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
