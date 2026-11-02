/**
 * The 22-product public catalog (November 2026 sourcing update).
 *
 * Specs are reference values for buyers, not confirmed manufacturing data: every value that has not been
 * confirmed by the manufacturer says so ("confirmed with quotation" / "subject to supplier quotation").
 * Replace them with confirmed values in the admin as supplier data arrives.
 */

type Spec = { label: string; value: string }

export type CatalogProduct = {
  slug: string
  name: string
  category: string
  /** Existing product (by slug) this listing takes over, when it is renamed. */
  renamedFrom?: string
  shortDescription: string
  application: string
  specs: Spec[]
  options: string[]
  searchTerms: string
  related: string[]
  featured?: boolean
  /** Supply status: 'custom' marks configurations that still need supplier confirmation. */
  availability?: 'made-to-order' | 'program' | 'custom'
}

/** Category order on the homepage, catalog and menus (H02). */
export const categoryOrder = [
  'kitchen-foodservice-towels',
  'industrial-wiping-cleaning',
  'hotel-bath-spa',
  'restaurant-table-linens',
  'healthcare-institutional',
]

const pack = (extra: string) => `${extra}; final packing based on approved specification`

export const catalog: CatalogProduct[] = [
  // ── Kitchen & Foodservice Towels ───────────────────────────────────────────
  {
    slug: 'bar-mop-towels',
    name: 'Bar Mop Towels',
    category: 'kitchen-foodservice-towels',
    shortDescription:
      'Absorbent cotton terry bar mops for spills, counters and bar tops. Quoted by weight per dozen, size and stripe color to suit restaurant and laundry programs.',
    application: 'Restaurants, Bars and taverns, Catering kitchens, Linen rental programs, Foodservice distributors',
    specs: [
      { label: 'Material', value: '100% cotton' },
      { label: 'Construction', value: 'Ribbed or terry loop weave, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference size 16" x 19"; other sizes subject to supplier quotation' },
      { label: 'Weight', value: 'Specified in oz or lb per dozen; confirmed with quotation' },
      { label: 'Colors', value: 'White, or white with colored center stripe' },
      { label: 'Packaging', value: pack('dozen bundles in cartons') },
    ],
    options: ['Bar mop towels', 'Bar towels (where specifications overlap)', 'Center stripe colors, subject to supplier availability'],
    searchTerms: 'bar mops, bar mop, bar towels, bar rags, restaurant towels, ribbed towels, terry bar towels, kitchen rags',
    related: ['kitchen-towels', 'flour-sack-towels', 'herringbone-kitchen-towels'],
    featured: true,
  },
  {
    slug: 'flour-sack-towels',
    name: 'Flour Sack Towels',
    category: 'kitchen-foodservice-towels',
    shortDescription:
      'Large, lightweight plain-weave cotton towels for food prep, drying dishes and glassware, and covering dough. Quoted to size, weight and pack format.',
    application: 'Restaurants and bakeries, Commissary kitchens, Catering, Foodservice and retail distributors',
    specs: [
      { label: 'Material', value: '100% cotton' },
      { label: 'Construction', value: 'Plain weave, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference sizes 27" x 27" to 30" x 30"; other sizes subject to supplier quotation' },
      { label: 'Weight', value: 'Specified per dozen or in GSM; confirmed with quotation' },
      { label: 'Colors', value: 'White; natural or unbleached subject to supplier quotation' },
      { label: 'Packaging', value: pack('dozen bundles, multipacks or cartons') },
    ],
    options: ['White flour sack towels', 'Multipacks, subject to supplier availability'],
    searchTerms: 'flour sack, flour sack towels, flour sack dish towels, flour sack cloths, restaurant towels, cotton dish cloths, tea towels',
    related: ['kitchen-towels', 'bar-mop-towels', 'herringbone-kitchen-towels'],
    featured: true,
  },
  {
    slug: 'herringbone-kitchen-towels',
    name: 'Herringbone Kitchen Towels',
    category: 'kitchen-foodservice-towels',
    shortDescription:
      'Woven herringbone cotton kitchen towels, commonly with a colored stripe, for drying, handling and general kitchen use.',
    application: 'Restaurant kitchens, Hotels and foodservice, Janitorial and foodservice distributors',
    specs: [
      { label: 'Material', value: '100% cotton' },
      { label: 'Construction', value: 'Herringbone weave, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference sizes 15" x 25" to 20" x 30"; confirmed with quotation' },
      { label: 'Weight', value: 'Specified per dozen or in GSM; confirmed with quotation' },
      { label: 'Colors', value: 'White with blue, red or other stripe colors, subject to supplier availability' },
      { label: 'Packaging', value: pack('dozen bundles in cartons') },
    ],
    options: ['Stripe colors, subject to supplier availability'],
    searchTerms: 'herringbone towels, herringbone dish towels, striped kitchen towels, restaurant kitchen towels, dish towels',
    related: ['kitchen-towels', 'flour-sack-towels', 'bar-mop-towels'],
    featured: true,
  },
  {
    slug: 'kitchen-towels',
    name: 'Kitchen Towels',
    category: 'kitchen-foodservice-towels',
    shortDescription:
      'General-purpose cotton kitchen towels for drying and back-of-house use. Dish towel, tea towel and terry styles are quoted as variants of this listing.',
    application: 'Restaurants and cafés, Hotel kitchens, Institutional kitchens, Retail and foodservice distributors',
    specs: [
      { label: 'Material', value: 'Cotton or cotton blend, by style' },
      { label: 'Construction', value: 'Plain weave, waffle, dobby or terry, by style' },
      { label: 'Dimensions', value: 'Specified by style; confirmed with quotation' },
      { label: 'Weight', value: 'Specified per dozen or in GSM; confirmed with quotation' },
      { label: 'Colors', value: 'White, solids or stripes, subject to supplier availability' },
      { label: 'Packaging', value: pack('dozen bundles, multipacks or cartons') },
    ],
    options: ['Dish towels', 'Tea towels', 'Terry kitchen towels', 'Glass and polishing towels'],
    searchTerms:
      'kitchen towel, dish towels, dish cloths, tea towels, terry kitchen towels, glass towels, polishing towels, restaurant towels, cotton kitchen towels',
    related: ['bar-mop-towels', 'flour-sack-towels', 'herringbone-kitchen-towels'],
    featured: true,
  },
  {
    slug: 'commercial-aprons',
    name: 'Commercial Aprons',
    category: 'kitchen-foodservice-towels',
    renamedFrom: 'bib-aprons',
    shortDescription:
      'Bib and waist aprons for kitchen, service and catering staff. Fabric, color, pockets and branding are quoted to your requirements.',
    application: 'Restaurants and bars, Catering and events, Hotels, Bakeries and cafés, Uniform distributors',
    specs: [
      { label: 'Material', value: 'Cotton, poly-cotton twill or canvas, as specified' },
      { label: 'Construction', value: 'Bib style with neck strap and waist ties, or waist style with ties' },
      { label: 'Dimensions', value: 'Bib and waist sizes as specified; confirmed with quotation' },
      { label: 'Colors', value: 'Black, white, navy and other colors, subject to supplier availability' },
      { label: 'Packaging', value: pack('individually bagged or bulk cartons') },
    ],
    options: ['Bib aprons', 'Waist aprons', 'Pocket configurations', 'Logo embroidery, subject to supplier availability'],
    searchTerms: 'aprons, apron, bib aprons, waist aprons, chef aprons, server aprons, kitchen aprons, restaurant aprons, bistro aprons',
    related: ['kitchen-towels', 'bar-mop-towels', 'solid-color-napkins'],
    featured: true,
  },

  // ── Industrial Wiping & Cleaning ───────────────────────────────────────────
  {
    slug: 'shop-towels',
    name: 'Shop Towels',
    category: 'industrial-wiping-cleaning',
    shortDescription:
      'Reusable cotton shop towels for wiping oil, grease and general maintenance spills. Quoted in red, blue or white to your size, weight and pack format.',
    application: 'Automotive repair shops, Machine shops, Maintenance departments, Industrial laundries, Janitorial distributors',
    specs: [
      { label: 'Material', value: '100% cotton' },
      { label: 'Construction', value: 'Woven cotton wiper, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference sizes 13" x 13" to 15" x 15"; other sizes subject to supplier quotation' },
      { label: 'Weight', value: 'Specified in oz or lb per dozen; confirmed with quotation' },
      { label: 'Colors', value: 'Red, blue or white; other colors subject to supplier quotation' },
      { label: 'Packaging', value: pack('bundles, bags or cartons') },
    ],
    options: ['Red shop towels', 'Blue shop towels', 'White shop towels', 'Striped wiping cloths'],
    searchTerms: 'shop towel, red shop towels, blue shop towels, white shop towels, mechanic towels, garage towels, striped wiping cloths, wipers',
    related: ['cotton-wiping-rags', 'huck-towels', 'terry-wiping-towels'],
    featured: true,
  },
  {
    slug: 'huck-towels',
    name: 'Huck Towels',
    category: 'industrial-wiping-cleaning',
    shortDescription:
      'Tightly woven, low-lint cotton huck towels for glass, mirrors, stainless steel and general janitorial wiping.',
    application: 'Janitorial and facility cleaning, Glass and window cleaning, Commercial laundries, Hospitality housekeeping',
    specs: [
      { label: 'Material', value: '100% cotton' },
      { label: 'Construction', value: 'Huck (huckaback) weave, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference sizes 15" x 25" to 16" x 26"; other sizes subject to supplier quotation' },
      { label: 'Weight', value: 'Specified in oz or lb per dozen; confirmed with quotation' },
      { label: 'Colors', value: 'Blue or white' },
      { label: 'Packaging', value: pack('dozen bundles in cartons') },
    ],
    options: ['Blue huck towels', 'White huck towels'],
    searchTerms: 'huck towel, huck towels, blue huck towels, huckaback, glass towels, low lint towels, lint free towels, janitorial towels, window towels',
    related: ['shop-towels', 'microfiber-cleaning-cloths', 'cotton-wiping-rags'],
    featured: true,
  },
  {
    slug: 'cotton-wiping-rags',
    name: 'Cotton Wiping Rags',
    category: 'industrial-wiping-cleaning',
    renamedFrom: 'cotton-cleaning-rags',
    shortDescription:
      'Cotton wiping rags for industrial cleanup, quoted by weight in boxes or bales. New-cloth and reclaimed options are quoted separately.',
    application: 'Factories and plants, Automotive and body shops, Painting and maintenance contractors, Janitorial distributors',
    specs: [
      { label: 'Material', value: 'Cotton; new cloth or reclaimed textile, as stated in the quotation' },
      { label: 'Construction', value: 'Cut cloth pieces, knit or woven, as specified' },
      { label: 'Dimensions', value: 'Mixed or graded piece sizes, as specified' },
      { label: 'Weight', value: 'Sold by weight; box and bale weights confirmed with quotation' },
      { label: 'Colors', value: 'White, light or mixed colors, as specified' },
      { label: 'Packaging', value: pack('boxes or compressed bales') },
    ],
    options: ['Cotton cleaning rags', 'Cotton wiping rag bales', 'Reclaimed wiping rags'],
    searchTerms:
      'wiping rags, rags, rag bales, cleaning rags, cotton rags, bulk rags, reclaimed rags, recycled rags, rags by the pound, industrial wiping cloths, wipers, t-shirt rags',
    related: ['shop-towels', 'huck-towels', 'terry-wiping-towels'],
    featured: true,
  },
  {
    slug: 'terry-wiping-towels',
    name: 'Terry Wiping Towels',
    category: 'industrial-wiping-cleaning',
    shortDescription: 'Absorbent cotton terry towels for general-purpose wiping, drying and detailing work.',
    application: 'Auto detailing, Janitorial cleaning, Maintenance departments, Commercial laundries',
    specs: [
      { label: 'Material', value: 'Cotton terry' },
      { label: 'Construction', value: 'Looped terry, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference sizes 14" x 17" to 16" x 19"; other sizes subject to supplier quotation' },
      { label: 'Weight', value: 'Specified per dozen or in GSM; confirmed with quotation' },
      { label: 'Colors', value: 'White or colored, subject to supplier availability' },
      { label: 'Packaging', value: pack('dozen bundles or cartons') },
    ],
    options: [],
    searchTerms: 'terry towels, terry wipers, terry cloth rags, terry cloths, detailing towels, cleaning towels',
    related: ['shop-towels', 'cotton-wiping-rags', 'microfiber-cleaning-cloths'],
  },
  {
    slug: 'microfiber-cleaning-cloths',
    name: 'Microfiber Cleaning Cloths',
    category: 'industrial-wiping-cleaning',
    shortDescription:
      'Microfiber cloths for janitorial, housekeeping and detailing work, available in several colors for color-coded cleaning programs.',
    application: 'Commercial cleaning companies, Hotel housekeeping, Facility management, Auto detailing',
    specs: [
      { label: 'Material', value: 'Polyester/polyamide microfiber; blend ratio confirmed with quotation' },
      { label: 'Construction', value: 'Knitted microfiber; hemmed or edgeless, as specified' },
      { label: 'Dimensions', value: 'Common reference sizes 12" x 12" and 16" x 16"; confirmed with quotation' },
      { label: 'Weight', value: 'Specified in GSM; confirmed with quotation' },
      { label: 'Colors', value: 'Blue, green, yellow, red and other colors, subject to supplier availability' },
      { label: 'Packaging', value: pack('packs or cartons') },
    ],
    options: ['Color-coded sets', 'Polishing cloths'],
    searchTerms: 'microfiber, microfiber cloths, microfiber towels, polishing cloths, glass cloths, color coded cloths, detailing cloths, cleaning cloths',
    related: ['huck-towels', 'terry-wiping-towels', 'shop-towels'],
  },

  // ── Hotel, Bath & Spa Textiles ─────────────────────────────────────────────
  {
    slug: 'bath-towels',
    name: 'Bath Towels',
    category: 'hotel-bath-spa',
    shortDescription: 'Cotton terry bath towels for hotels, gyms and institutional use, quoted to your size, weight and border style.',
    application: 'Hotels and motels, Vacation rentals, Gyms and clubs, Care facilities, Linen rental programs',
    specs: [
      { label: 'Material', value: '100% cotton terry; blends subject to supplier quotation' },
      { label: 'Construction', value: 'Terry loop, plain or dobby border' },
      { label: 'Dimensions', value: 'Common reference sizes 24" x 50" to 27" x 54"; other sizes subject to supplier quotation' },
      { label: 'Weight', value: 'Specified in GSM or lb per dozen; confirmed with quotation' },
      { label: 'Colors', value: 'White; other colors subject to supplier quotation' },
      { label: 'Packaging', value: pack('bundles in cartons') },
    ],
    options: ['Plain or dobby border'],
    searchTerms: 'bath towel, bath towels, hotel towels, white towels, gym towels, bath sheets, terry towels',
    related: ['hand-towels', 'washcloths', 'bath-mats'],
  },
  {
    slug: 'hand-towels',
    name: 'Hand Towels',
    category: 'hotel-bath-spa',
    shortDescription: 'Cotton terry hand towels for guest bathrooms, spas and institutional use, quoted to match your bath towel specification.',
    application: 'Hotels and motels, Spas and salons, Vacation rentals, Care facilities',
    specs: [
      { label: 'Material', value: '100% cotton terry; blends subject to supplier quotation' },
      { label: 'Construction', value: 'Terry loop, plain or dobby border' },
      { label: 'Dimensions', value: 'Common reference sizes 16" x 27" to 16" x 30"; confirmed with quotation' },
      { label: 'Weight', value: 'Specified in GSM or lb per dozen; confirmed with quotation' },
      { label: 'Colors', value: 'White; other colors subject to supplier quotation' },
      { label: 'Packaging', value: pack('bundles in cartons') },
    ],
    options: ['Plain or dobby border'],
    searchTerms: 'hand towel, hand towels, hotel hand towels, guest towels, salon towels, spa towels',
    related: ['bath-towels', 'washcloths', 'bath-mats'],
  },
  {
    slug: 'washcloths',
    name: 'Washcloths',
    category: 'hotel-bath-spa',
    shortDescription: 'Cotton terry washcloths for hotels, care facilities and institutional bath programs.',
    application: 'Hotels and motels, Care facilities, Vacation rentals, Gyms and clubs',
    specs: [
      { label: 'Material', value: '100% cotton terry; blends subject to supplier quotation' },
      { label: 'Construction', value: 'Terry loop, plain or dobby border' },
      { label: 'Dimensions', value: 'Common reference sizes 12" x 12" to 13" x 13"; confirmed with quotation' },
      { label: 'Weight', value: 'Specified in lb per dozen; confirmed with quotation' },
      { label: 'Colors', value: 'White; other colors subject to supplier quotation' },
      { label: 'Packaging', value: pack('dozen bundles in cartons') },
    ],
    options: [],
    searchTerms: 'washcloth, washcloths, wash cloths, face cloths, face towels, wash rags',
    related: ['bath-towels', 'hand-towels', 'bath-mats'],
  },
  {
    slug: 'bath-mats',
    name: 'Bath Mats',
    category: 'hotel-bath-spa',
    shortDescription: 'Heavy cotton terry bath mats for hotel and institutional bathrooms, quoted to size and weight.',
    application: 'Hotels and motels, Vacation rentals, Care facilities, Gyms and clubs',
    specs: [
      { label: 'Material', value: '100% cotton terry' },
      { label: 'Construction', value: 'Heavy terry loop, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference sizes 20" x 30" to 22" x 34"; confirmed with quotation' },
      { label: 'Weight', value: 'Specified in GSM or lb per dozen; confirmed with quotation' },
      { label: 'Colors', value: 'White; other colors subject to supplier quotation' },
      { label: 'Packaging', value: pack('bundles in cartons') },
    ],
    options: [],
    searchTerms: 'bath mat, bath mats, bathmat, floor towels, hotel bath mats',
    related: ['bath-towels', 'hand-towels', 'washcloths'],
  },
  {
    slug: 'bed-sheets',
    name: 'Bed Sheets',
    category: 'hotel-bath-spa',
    renamedFrom: 'flat-bed-sheets',
    shortDescription:
      'Flat and fitted bed sheets for hotels, vacation rentals and institutional bedding, quoted to mattress size, fabric and construction.',
    application: 'Hotels and motels, Vacation rentals, Dormitories and camps, Care facilities',
    specs: [
      { label: 'Material', value: 'Poly-cotton or 100% cotton, as specified' },
      { label: 'Construction', value: 'Percale or as specified; flat or fitted' },
      { label: 'Dimensions', value: 'Twin, Twin XL, Full, Queen and King; fitted pocket depth to your mattress' },
      { label: 'Weight / thread count', value: 'Confirmed with quotation' },
      { label: 'Colors', value: 'White; other colors subject to supplier quotation' },
      { label: 'Packaging', value: pack('folded in cartons') },
    ],
    options: ['Flat sheets', 'Fitted sheets'],
    searchTerms: 'sheets, bed sheets, flat sheets, fitted sheets, hotel sheets, percale sheets, bed linen, twin xl sheets',
    related: ['pillowcases', 'bath-towels', 'hospital-bed-sheets'],
  },
  {
    slug: 'pillowcases',
    name: 'Pillowcases',
    category: 'hotel-bath-spa',
    shortDescription: 'Pillowcases for hotel and institutional bedding, quoted to pillow size and to match your sheet specification.',
    application: 'Hotels and motels, Vacation rentals, Dormitories and camps, Care facilities',
    specs: [
      { label: 'Material', value: 'Poly-cotton or 100% cotton, as specified' },
      { label: 'Construction', value: 'Percale or as specified; envelope or open end' },
      { label: 'Dimensions', value: 'Standard, Queen and King pillow sizes; confirmed with quotation' },
      { label: 'Colors', value: 'White; other colors subject to supplier quotation' },
      { label: 'Packaging', value: pack('folded in cartons') },
    ],
    options: [],
    searchTerms: 'pillowcase, pillowcases, pillow cases, pillow covers, hotel pillowcases',
    related: ['bed-sheets', 'bath-towels', 'hand-towels'],
  },

  // ── Restaurant & Table Linens ──────────────────────────────────────────────
  {
    slug: 'solid-color-napkins',
    name: 'Solid Color Napkins',
    category: 'restaurant-table-linens',
    shortDescription:
      'Solid-color cloth napkins for restaurants, hotels and caterers. Fabric and color availability is confirmed with each quotation.',
    application: 'Restaurants, Hotels and banquet halls, Caterers, Linen rental programs',
    specs: [
      { label: 'Material', value: 'Cotton or poly-cotton; polyester subject to manufacturer verification' },
      { label: 'Construction', value: 'Plain weave, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference sizes 18" x 18", 20" x 20" and 22" x 22"' },
      { label: 'Colors', value: 'White, ivory, black and other solids, subject to supplier availability' },
      { label: 'Packaging', value: pack('by the dozen in cartons') },
    ],
    options: [],
    searchTerms: 'napkins, cloth napkins, dinner napkins, restaurant napkins, linen napkins, table napkins, cotton napkins',
    related: ['bistro-stripe-napkins', 'restaurant-tablecloths', 'commercial-aprons'],
  },
  {
    slug: 'bistro-stripe-napkins',
    name: 'Bistro Stripe Napkins',
    category: 'restaurant-table-linens',
    shortDescription: 'Cotton napkins with a classic bistro stripe for casual dining, bars and cafés.',
    application: 'Casual dining restaurants, Bars and cafés, Caterers',
    specs: [
      { label: 'Material', value: '100% cotton' },
      { label: 'Construction', value: 'Woven stripe, hemmed edges' },
      { label: 'Dimensions', value: 'Common reference sizes 18" x 18" to 20" x 20"; confirmed with quotation' },
      { label: 'Colors', value: 'White with red, blue, green or black stripe, subject to supplier availability' },
      { label: 'Packaging', value: pack('by the dozen in cartons') },
    ],
    options: ['Stripe colors, subject to supplier availability'],
    searchTerms: 'bistro napkins, striped napkins, stripe napkins, kitchen napkins, cotton napkins, cafe napkins',
    related: ['solid-color-napkins', 'restaurant-tablecloths', 'kitchen-towels'],
  },
  {
    slug: 'restaurant-tablecloths',
    name: 'Restaurant Tablecloths',
    category: 'restaurant-table-linens',
    shortDescription: 'Tablecloths for restaurant, hotel and banquet tables, quoted to your table dimensions and drop length.',
    application: 'Restaurants, Hotels and banquet halls, Caterers, Linen rental programs',
    specs: [
      { label: 'Material', value: 'Cotton or poly-cotton; polyester subject to manufacturer verification' },
      { label: 'Construction', value: 'Plain weave, hemmed edges' },
      { label: 'Dimensions', value: 'Square and rectangular, sized to your tables; round subject to supplier quotation' },
      { label: 'Colors', value: 'White, ivory and other solids, subject to supplier availability' },
      { label: 'Packaging', value: pack('folded in cartons') },
    ],
    options: ['Square', 'Rectangular'],
    searchTerms: 'tablecloths, tablecloth, table cloths, table linens, table covers, banquet tablecloths, restaurant linens',
    related: ['solid-color-napkins', 'bistro-stripe-napkins', 'commercial-aprons'],
  },

  // ── Healthcare & Institutional ─────────────────────────────────────────────
  {
    slug: 'medical-scrub-sets',
    name: 'Medical Scrub Sets',
    category: 'healthcare-institutional',
    shortDescription:
      'Scrub tops and matching pants for clinical, dental and care staff, quoted to your fabric, color and size breakdown.',
    application: 'Hospitals and clinics, Dental and veterinary practices, Care facilities, Uniform distributors',
    specs: [
      { label: 'Material', value: 'Poly-cotton or as specified' },
      { label: 'Construction', value: 'Scrub top (V-neck or as specified) with matching drawstring or elastic-waist pants' },
      { label: 'Sizes', value: 'Size runs as specified, e.g. XS to 3XL; confirmed with quotation' },
      { label: 'Fabric weight', value: 'Confirmed with quotation' },
      { label: 'Colors', value: 'Ceil blue, navy, royal and other colors, subject to supplier availability' },
      { label: 'Packaging', value: pack('individually bagged, size-assorted cartons') },
    ],
    options: ['Scrub tops', 'Scrub pants', 'Department color coding, subject to supplier availability'],
    searchTerms: 'scrubs, scrub sets, medical scrubs, nursing scrubs, scrub tops, scrub pants, medical uniforms',
    related: ['patient-gowns', 'hospital-bed-sheets'],
  },
  {
    slug: 'patient-gowns',
    name: 'Patient Gowns',
    category: 'healthcare-institutional',
    shortDescription: 'Reusable cloth patient gowns for hospitals, clinics and care facilities, quoted to your style, print and closure type.',
    application: 'Hospitals and clinics, Care facilities, Healthcare laundries',
    specs: [
      { label: 'Material', value: 'Poly-cotton or cotton, as specified' },
      { label: 'Construction', value: 'Back-opening gown with tie or snap closures, as specified' },
      { label: 'Sizes', value: 'One size or size range, as specified' },
      { label: 'Colors', value: 'Prints or solids, subject to supplier availability' },
      { label: 'Packaging', value: pack('folded in cartons') },
    ],
    options: ['Tie closures', 'Snap closures'],
    searchTerms: 'patient gown, patient gowns, hospital gowns, exam gowns, medical gowns',
    related: ['hospital-bed-sheets', 'medical-scrub-sets'],
  },
  {
    slug: 'hospital-bed-sheets',
    name: 'Hospital Bed Sheets',
    category: 'healthcare-institutional',
    shortDescription:
      'Flat and fitted sheets sized for hospital and care-facility beds, quoted to your mattress dimensions and laundering requirements.',
    application: 'Hospitals and clinics, Care facilities, Healthcare laundries',
    specs: [
      { label: 'Material', value: 'Poly-cotton or cotton, as specified' },
      { label: 'Construction', value: 'Flat, fitted or contour, as specified' },
      { label: 'Dimensions', value: 'To your hospital mattress dimensions; confirmed with quotation' },
      { label: 'Colors', value: 'White or as specified' },
      { label: 'Packaging', value: pack('folded in cartons') },
    ],
    options: ['Flat sheets', 'Fitted or contour sheets'],
    searchTerms: 'hospital sheets, hospital bed sheets, hospital linen, care home sheets, contour sheets, fitted hospital sheets',
    related: ['patient-gowns', 'medical-scrub-sets', 'bed-sheets'],
  },
]

/**
 * Retired listings → where their URL now permanently redirects (H10).
 * A product slug redirects to that product page; a path starting with "/" is a custom target.
 * Retired products are hidden, never deleted, so they can be restored from the admin.
 */
export const retired: Record<string, string> = {
  // Industrial Wiping & Cleaning
  'white-shop-towels': 'shop-towels',
  'striped-wiping-cloths': 'shop-towels',
  'blue-huck-towels': 'huck-towels',
  'cotton-cleaning-rags': 'cotton-wiping-rags',
  'cotton-wiping-rag-bales': 'cotton-wiping-rags',
  'reclaimed-wiping-rags': 'cotton-wiping-rags',
  'industrial-wiping-cloths': 'cotton-wiping-rags',
  'polishing-cloths': 'microfiber-cleaning-cloths',
  // Kitchen & Foodservice Towels
  'dish-towels': 'kitchen-towels',
  'tea-towels': 'kitchen-towels',
  'terry-kitchen-towels': 'kitchen-towels',
  'glass-polishing-towels': 'kitchen-towels',
  'bar-towels': 'bar-mop-towels',
  'bib-aprons': 'commercial-aprons',
  'waist-aprons': 'commercial-aprons',
  // Restaurant & Table Linens → custom sourcing
  'polyester-table-linens': '/custom-textile-sourcing',
  'printed-cloth-napkins': '/custom-textile-sourcing',
  'printed-table-covers': '/custom-textile-sourcing',
  'table-runners': '/custom-textile-sourcing',
  'embroidered-table-runners': '/custom-textile-sourcing',
  'embroidered-placemats': '/custom-textile-sourcing',
  'quilted-placemats': '/custom-textile-sourcing',
  'round-placemats': '/custom-textile-sourcing',
  // Hotel, Bath & Spa
  'flat-bed-sheets': 'bed-sheets',
  'fitted-bed-sheets': 'bed-sheets',
  'pool-towels': '/custom-textile-sourcing',
  'salon-towels': '/custom-textile-sourcing',
  'spa-towels': '/custom-textile-sourcing',
  'duvet-covers': '/custom-textile-sourcing',
  'bathrobes-spa-wraps': '/custom-textile-sourcing',
  'mattress-protectors': '/custom-textile-sourcing',
  // Healthcare & Institutional
  'hospital-blankets': '/custom-textile-sourcing',
  'reusable-underpads': '/custom-textile-sourcing',
  'patient-bibs': '/custom-textile-sourcing',
  'lab-coats': '/custom-textile-sourcing',
  'laundry-bags-linen-collection-bags': '/custom-textile-sourcing',
}

/** Homepage featured products, in display order (H01). */
export const homepageFeatured = [
  'bar-mop-towels',
  'flour-sack-towels',
  'herringbone-kitchen-towels',
  'shop-towels',
  'huck-towels',
  'cotton-wiping-rags',
  'kitchen-towels',
  'commercial-aprons',
]
