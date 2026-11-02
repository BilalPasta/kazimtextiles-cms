/**
 * Site copy for the November 2026 sourcing update. Kazim Textiles is a sourcing and supply company that works
 * with manufacturing partners in Pakistan: nothing here claims factory ownership, production capacity,
 * certifications, stock, samples, guaranteed pricing or lead times.
 */
import { h2, p, rt, ul } from './richtext'

export const PHONE = '(412) 913 3089'

export const siteSettings = {
  tagline: 'Wholesale textile sourcing & supply',
  phone: PHONE,
  // The old number was also the WhatsApp number; switch it with the phone so no old number remains on the site.
  whatsapp: '+1 (412) 913 3089',
  address: 'Pennsylvania, United States',
  footerAbout:
    'Pennsylvania-based wholesale textile sourcing and supply company connecting U.S. businesses with textile manufacturing partners in Pakistan.',
  topbarLeft: 'Wholesale textile sourcing & supply for U.S. businesses',
  topbarRight: '',
  defaultDescription:
    'Kazim Textiles is a Pennsylvania-based wholesale textile sourcing and supply company. Commercial towels, industrial wiping products, hospitality linens and institutional textiles, quoted to buyer specifications.',
}

const steps = [
  { title: 'Share your requirements', text: 'Tell us the products, quantities, and specifications you need.' },
  { title: 'Supplier review & quotation', text: 'We review manufacturing options and prepare a quote based on confirmed specifications.' },
  {
    title: 'Production & delivery coordination',
    text: 'Following agreement, we coordinate the applicable sourcing, production, and shipping arrangements.',
  },
]

export const homepage = {
  hero: {
    eyebrow: 'Wholesale Textile Sourcing & Supply',
    heading: 'Commercial Textiles for U.S. Wholesalers & Distributors',
    text: 'Kazim Textiles is a Pennsylvania based wholesale textile sourcing and supply company connecting U.S. businesses with textile manufacturing partners in Pakistan. We help source commercial towels, industrial wiping products, hospitality linens, and institutional textiles based on buyer specifications and order requirements.',
    primaryCta: { label: 'Request a quote', url: '/quote' },
    secondaryCta: { label: 'Browse products', url: '/products' },
  },
  finder: {
    enabled: true,
    title: 'Get a wholesale quote',
    subtitle: 'Pick your business, choose products, and tell us roughly how many. We reply with next steps.',
  },
  trustItems: [
    { text: 'Pennsylvania-based sourcing & supply' },
    { text: 'Manufacturing partners in Pakistan' },
    { text: 'Quoted to your specifications' },
    { text: 'Wholesale and repeat orders' },
  ],
  categoriesSection: {
    eyebrow: 'Product categories',
    heading: 'Five Product Categories',
    intro: 'Kitchen and foodservice towels, industrial wiping and cleaning, hotel and bath textiles, restaurant linens, and healthcare textiles.',
  },
  productsSection: {
    eyebrow: 'Wholesale catalog',
    heading: 'Featured Wholesale Products',
    intro: 'Core products for foodservice and industrial buyers. Specifications, MOQ and lead times are confirmed with each quotation.',
  },
  industriesSection: {
    eyebrow: 'Industries served',
    heading: 'Commercial textiles for businesses that wash, wipe and serve',
    intro: 'Foodservice, cleaning, hospitality, healthcare and distribution buyers source core textiles through one point of contact.',
  },
  process: {
    eyebrow: 'Process',
    heading: 'How We Work',
    intro: 'A clear quotation process for first orders and repeat programs.',
    cta: { label: 'Start your quote', url: '/quote' },
    steps,
  },
  whyUs: {
    eyebrow: 'Why Kazim Textiles',
    heading: 'A U.S. point of contact for textile sourcing',
    items: [
      { title: 'Based in Pennsylvania', text: 'Work with a U.S. business contact from first inquiry through delivery coordination.' },
      { title: 'Manufacturing partners in Pakistan', text: 'We source through textile manufacturing partners rather than reselling general stock.' },
      { title: 'Specification-led quotes', text: 'Quotes are based on the size, material, weight, packing and quantity you confirm.' },
      { title: 'Clear terms in writing', text: 'MOQ, lead time and pricing are confirmed in a written quotation before you commit.' },
    ],
  },
  ctaBand: {
    eyebrow: 'Beyond the core catalog',
    heading: 'Need a textile product that isn’t listed?',
    text: 'Share your specifications, expected quantity and delivery requirements, and we will review potential sourcing options with our manufacturing partners.',
    buttons: [
      { label: 'Custom sourcing inquiry', url: '/custom-textile-sourcing' },
      { label: 'Request a quote', url: '/quote' },
    ],
  },
  faqs: [
    {
      question: 'Do you supply wholesale quantities?',
      answer: 'Yes. Kazim Textiles supplies businesses buying wholesale quantities, such as distributors, foodservice operators, cleaning companies and hospitality buyers. We do not sell retail.',
    },
    {
      question: 'Can I request a sample?',
      answer: 'You can ask for samples in your quote request. Whether samples are available, and any cost, depends on the product and the manufacturer and is confirmed with your quotation.',
    },
    {
      question: 'Can I submit my own specifications?',
      answer: 'Yes. Send your size, material, weight, color and packing requirements, or a spec sheet, and we will review them with our manufacturing partners.',
    },
    {
      question: 'Do you offer custom sizes and colors?',
      answer: 'Custom sizes and colors may be possible depending on the product and order quantity. Availability is subject to supplier confirmation and is stated in your quotation.',
    },
    {
      question: 'Can multiple products be included in one order?',
      answer: 'You can request several products in one inquiry. Whether they can ship together depends on the products, quantities and suppliers involved, which we confirm in the quotation.',
    },
    {
      question: 'How are minimum quantities determined?',
      answer: 'Minimum order quantities are set by the manufacturer and depend on the product, material, color and customization. We confirm the MOQ in every quotation.',
    },
    {
      question: 'How are shipping charges calculated?',
      answer: 'Shipping charges depend on order volume, packed weight and dimensions, the shipping method and the delivery location. Shipping terms are stated in your quotation.',
    },
    {
      question: 'Do you offer delivered pricing?',
      answer: 'Tell us your delivery ZIP code when you request a quote. Whether pricing is quoted delivered or at another shipping basis is confirmed in the quotation.',
    },
  ],
  meta: {
    title: 'Wholesale Commercial Textiles & Sourcing | Kazim Textiles',
    description:
      'Pennsylvania-based wholesale textile sourcing and supply: bar mops, shop towels, wiping rags, kitchen towels, hotel linens and healthcare textiles quoted to your specifications.',
  },
}

type Faq = { question: string; answer: string }
type CategoryCopy = { name: string; heading: string; intro: string; buyerChecklist: string; body: ReturnType<typeof rt>; faqs: Faq[]; metaDescription: string }

export const categories: Record<string, CategoryCopy> = {
  'kitchen-foodservice-towels': {
    name: 'Kitchen & Foodservice Towels',
    heading: 'Wholesale Bar Mops, Flour Sack Towels & Kitchen Towels',
    intro: 'Bar mop towels, flour sack towels, herringbone and general kitchen towels, and commercial aprons for restaurants, caterers and foodservice distributors.',
    buyerChecklist: 'Towel type, size, weight per dozen, stripe color, estimated quantity, packing format and delivery ZIP code.',
    body: rt(
      h2('Foodservice textiles sourced to your specification'),
      p('Commercial kitchens launder towels daily, so construction, weight and hemming matter. Tell us the towels you use now, or the specification you need, and we will review options with our manufacturing partners.'),
      ul([
        '**Bar mop towels** for spills, counters and bar tops',
        '**Flour sack towels** for food prep and drying',
        '**Herringbone and kitchen towels** for general back-of-house use',
        '**Commercial aprons** in bib and waist styles',
      ]),
    ),
    faqs: [
      {
        question: 'What is the difference between bar mops, flour sack and kitchen towels?',
        answer: 'Bar mops are small, absorbent terry towels for spills and counters. Flour sack towels are large, lightweight plain-weave cotton for food prep and drying. Kitchen towels, including herringbone styles, are general-purpose drying and handling towels.',
      },
      {
        question: 'How is bar mop weight specified?',
        answer: 'Usually in ounces or pounds per dozen. Tell us your target weight, or the towel you use now, and the weight is confirmed in your quotation.',
      },
    ],
    metaDescription: 'Wholesale bar mop towels, flour sack towels, herringbone kitchen towels and commercial aprons for restaurants and foodservice distributors.',
  },
  'industrial-wiping-cleaning': {
    name: 'Industrial Wiping & Cleaning',
    heading: 'Wholesale Shop Towels, Huck Towels & Wiping Rags',
    intro: 'Shop towels, huck towels, cotton wiping rags, terry wiping towels and microfiber cloths for janitorial distributors, auto shops, maintenance teams and laundries.',
    buyerChecklist: 'Product type, size, weight per dozen or bale weight, color, estimated quantity, packing format and intended cleaning application.',
    body: rt(
      h2('Wiping and cleaning textiles for commercial buyers'),
      p('The right wiper depends on the job: heavy cotton shop towels for oil and grease, huck towels for low-lint glass work, microfiber for janitorial detailing, and rags by weight for single-use cleanup. Share your application and quantity and we will quote suitable options.'),
    ),
    faqs: [
      {
        question: 'Do you quote shop towels and rags by the pound or by the piece?',
        answer: 'Shop towels and huck towels are usually quoted per dozen. Wiping rags are usually quoted by weight in boxes or bales. Tell us how you buy or resell them and we will quote in that unit where possible.',
      },
      {
        question: 'Can towels be color coded?',
        answer: 'Shop towels and microfiber cloths are commonly supplied in several colors for color-coded cleaning. Color availability is confirmed with your quotation.',
      },
    ],
    metaDescription: 'Wholesale shop towels, huck towels, cotton wiping rags, terry wiping towels and microfiber cleaning cloths for janitorial and industrial buyers.',
  },
  'hotel-bath-spa': {
    name: 'Hotel, Bath & Spa Textiles',
    heading: 'Wholesale Hotel Towels, Bath Mats & Bed Sheets',
    intro: 'Bath towels, hand towels, washcloths, bath mats, bed sheets and pillowcases for hotels, vacation rentals and institutional housekeeping.',
    buyerChecklist: 'Item, size, towel GSM or weight per dozen, sheet fabric and mattress size, color, estimated quantity and delivery ZIP code.',
    body: rt(
      h2('Bath and bed linens for hospitality buyers'),
      p('Hotel linens affect both the guest experience and laundry costs. Share your brand standard, or the towels and sheets you use now, and we will review matching options with our manufacturing partners.'),
    ),
    faqs: [
      {
        question: 'What GSM should hotel towels be?',
        answer: 'Many economy and mid-scale properties use bath towels of roughly 400–500 GSM, while upscale properties often choose heavier towels. Heavier towels take longer to dry and launder. The final weight is confirmed in your quotation.',
      },
      {
        question: 'Do you supply flat and fitted sheets?',
        answer: 'Yes. Bed sheets are quoted as flat or fitted styles to your mattress size, fabric and construction.',
      },
    ],
    metaDescription: 'Wholesale bath towels, hand towels, washcloths, bath mats, bed sheets and pillowcases for hotels and vacation rentals.',
  },
  'restaurant-table-linens': {
    name: 'Restaurant & Table Linens',
    heading: 'Wholesale Cloth Napkins & Restaurant Tablecloths',
    intro: 'Solid color napkins, bistro stripe napkins and restaurant tablecloths for restaurants, hotels, caterers and linen programs.',
    buyerChecklist: 'Napkin or table size, fabric preference, color, estimated quantity and delivery ZIP code.',
    body: rt(
      h2('Napkins and tablecloths for dining rooms and banquets'),
      p('Tell us your table sizes, napkin size and color preferences. Fabric and color availability, including any polyester options, is verified with the manufacturer and confirmed in your quotation.'),
      p('Printed, embroidered or decorative linens and placemats are handled as [custom sourcing inquiries](/custom-textile-sourcing).'),
    ),
    faqs: [
      {
        question: 'Which fabrics are available for napkins and tablecloths?',
        answer: 'Cotton and poly-cotton are the usual options. Polyester availability, material specifications and minimum quantities must be verified with the manufacturer before they are confirmed in a quotation.',
      },
    ],
    metaDescription: 'Wholesale solid color napkins, bistro stripe napkins and restaurant tablecloths for restaurants, hotels and caterers.',
  },
  'healthcare-institutional': {
    name: 'Healthcare & Institutional',
    heading: 'Wholesale Scrubs, Patient Gowns & Hospital Sheets',
    intro: 'Medical scrub sets, patient gowns and hospital bed sheets for clinics, care facilities and institutional linen programs.',
    buyerChecklist: 'Item, fabric, sizes or size breakdown, colors, closure style for gowns, mattress dimensions for sheets, estimated quantity and delivery ZIP code.',
    body: rt(
      h2('General-use healthcare textiles'),
      p('We source general-use scrubs, gowns and sheets to the specification your facility provides. These are not medical devices, and we do not make medical performance, infection-control or certification claims. If your purchase requires specific documentation, tell us in your request and we will confirm what is available before you order.'),
    ),
    faqs: [
      {
        question: 'Can you meet our facility’s linen specification?',
        answer: 'Send your specification (fabric, size, closures, color and laundering requirements) and we will review it with our manufacturing partners before quoting.',
      },
    ],
    metaDescription: 'Wholesale medical scrub sets, patient gowns and hospital bed sheets sourced to facility specifications.',
  },
}

type IndustryCopy = {
  name?: string
  /** Search-result title when the heading is too long for Google (~60 characters). */
  metaTitle?: string
  heading: string
  summary: string
  buyers?: string
  categories: string[]
  needs: { title: string; text: string }[]
  intro: ReturnType<typeof rt>
  faqs: Faq[]
}

export const industries: Record<string, IndustryCopy> = {
  'hotels-hospitality': {
    heading: 'Wholesale Hotel Towels, Sheets & Table Linens',
    summary: 'Bath towels, hand towels, washcloths, bath mats, bed sheets, pillowcases and restaurant linens for hotels, resorts and motels.',
    categories: ['hotel-bath-spa', 'restaurant-table-linens'],
    needs: [
      { title: 'Consistent specifications', text: 'Quote reorders against the same size, weight and color specification.' },
      { title: 'Suited to commercial laundry', text: 'Constructions and blends chosen with your laundering in mind.' },
      { title: 'Rooms and restaurants', text: 'Bath and bed linens plus napkins and tablecloths from one contact.' },
    ],
    intro: rt(p('We source **bath towels, hand towels, washcloths, bath mats, bed sheets and pillowcases** for hotels, plus napkins and tablecloths for restaurant and banquet spaces, quoted to your brand standard.')),
    faqs: [
      { question: 'Can you match the towels we use now?', answer: 'Send the specification or details of your current towels (size, GSM, color and border) and we will review matching options with our manufacturing partners.' },
    ],
  },
  'restaurants-foodservice': {
    heading: 'Wholesale Kitchen Towels, Bar Mops & Restaurant Linens',
    summary: 'Bar mops, flour sack towels, kitchen towels, aprons, cloth napkins and tablecloths for restaurants, bars, cafés and commissary kitchens.',
    categories: ['kitchen-foodservice-towels', 'restaurant-table-linens'],
    needs: [
      { title: 'Front and back of house', text: 'Napkins and tablecloths for the dining room; bar mops and towels for the kitchen.' },
      { title: 'Daily laundering', text: 'Weights and hems specified for frequent commercial washing.' },
      { title: 'Aprons for staff', text: 'Bib and waist aprons in the colors and fabrics you specify.' },
    ],
    intro: rt(p('We source **bar mop towels, flour sack towels, kitchen towels, commercial aprons, cloth napkins and tablecloths** in the sizes and weights your operation specifies.')),
    faqs: [
      { question: 'What size bar mop towels do restaurants use?', answer: '16" x 19" is a common reference size. Weight is usually specified per dozen and confirmed in your quotation.' },
    ],
  },
  'healthcare-medical': {
    heading: 'Wholesale Scrubs, Patient Gowns & Hospital Sheets',
    summary: 'Medical scrub sets, patient gowns, hospital bed sheets, towels and washcloths sourced to your facility specification.',
    categories: ['healthcare-institutional', 'hotel-bath-spa'],
    needs: [
      { title: 'Facility specification', text: 'Fabric, sizes, closures and colors to your linen standard.' },
      { title: 'Laundering requirements', text: 'Share your laundering protocol so options can be reviewed against it.' },
      { title: 'Color coding', text: 'Scrub colors by department, subject to supplier availability.' },
    ],
    intro: rt(p('We source general-use **medical scrub sets, patient gowns and hospital bed sheets** for clinics, care facilities and linen services. We do not make medical performance or certification claims.')),
    faqs: [
      { question: 'What documentation is available?', answer: 'Fiber content and care labeling are standard. Any other documentation depends on the product and manufacturer and is confirmed before you order.' },
    ],
  },
  'senior-living-care-homes': {
    heading: 'Wholesale Linens for Nursing Homes & Senior Living',
    summary: 'Hospital bed sheets, patient gowns, towels and washcloths for nursing homes, assisted living and long-term care.',
    categories: ['healthcare-institutional', 'hotel-bath-spa'],
    needs: [
      { title: 'Resident comfort', text: 'Fabric choices suited to residents who spend long hours in bed.' },
      { title: 'Frequent laundering', text: 'Constructions specified for repeated commercial washing.' },
      { title: 'Consistent reorders', text: 'Quote against the same specification each time.' },
    ],
    intro: rt(p('We source **hospital bed sheets, patient gowns, bath towels and washcloths** for long-term care. Underpads and patient bibs are available as [custom sourcing inquiries](/custom-textile-sourcing).')),
    faqs: [],
  },
  'janitorial-cleaning': {
    heading: 'Wholesale Cleaning Cloths & Janitorial Towels',
    summary: 'Microfiber cloths, huck towels, terry wiping towels and cotton wiping rags for commercial cleaning companies and janitorial distributors.',
    categories: ['industrial-wiping-cleaning'],
    needs: [
      { title: 'Color-coded cleaning', text: 'Separate colors for restrooms, kitchens, glass and general areas.' },
      { title: 'Low-lint glass cleaning', text: 'Huck and microfiber cloths for windows and mirrors.' },
      { title: 'Bulk packing', text: 'Bundled and cartoned for crews or resale.' },
    ],
    intro: rt(p('We source **microfiber cleaning cloths, huck towels, terry wiping towels, shop towels and cotton wiping rags** for cleaning crews and janitorial distributors.')),
    faqs: [],
  },
  'commercial-laundries': {
    heading: 'Wholesale Textiles for Linen Rental & Commercial Laundries',
    metaTitle: 'Textiles for Commercial Laundries | Kazim Textiles',
    summary: 'Shop towels, bar mops, napkins, tablecloths, bath towels and sheets for linen rental companies and industrial laundries.',
    categories: ['industrial-wiping-cleaning', 'kitchen-foodservice-towels', 'hotel-bath-spa', 'restaurant-table-linens'],
    needs: [
      { title: 'Wash life', text: 'Constructions, hems and blends specified for repeated industrial cycles.' },
      { title: 'Matching replacement stock', text: 'Quote against your circulating specification.' },
      { title: 'Rental-ready packing', text: 'Packing by dozen or as specified.' },
    ],
    intro: rt(p('We source **shop towels, bar mops, napkins, tablecloths, bath towels and sheets** to the specifications linen and uniform services circulate.')),
    faqs: [],
  },
  'automotive-industrial': {
    heading: 'Wholesale Shop Towels & Industrial Wiping Rags',
    summary: 'Red and blue shop towels, terry wipers and cotton wiping rags for auto repair shops, plants, oil & gas and warehouses.',
    categories: ['industrial-wiping-cleaning'],
    needs: [
      { title: 'Oil and grease absorbency', text: 'Cotton shop towels and terry wipers for heavy wiping.' },
      { title: 'Low cost per wipe', text: 'Wiping rags by weight for single-use jobs.' },
      { title: 'Bulk supply', text: 'Bundles, boxes and bales for shops and distributors.' },
    ],
    intro: rt(p('We source **shop towels, terry wiping towels and cotton wiping rags** for workshops, plants and industrial distributors.')),
    faqs: [
      { question: 'What size are standard shop towels?', answer: 'Around 13" x 13" to 15" x 15" is a common reference range. Other sizes are subject to supplier quotation.' },
    ],
  },
  'spas-salons-fitness': {
    heading: 'Wholesale Towels for Spas, Salons & Gyms',
    summary: 'Bath towels, hand towels and washcloths for salons, spas and fitness clubs; salon and spa towels by custom sourcing inquiry.',
    categories: ['hotel-bath-spa'],
    needs: [
      { title: 'Frequent washing', text: 'Weights chosen for towels laundered many times a day.' },
      { title: 'Quick drying', text: 'Lighter weights that dry between uses.' },
      { title: 'Specialty towels', text: 'Salon towels, spa towels and robes reviewed as custom sourcing inquiries.' },
    ],
    intro: rt(p('We source **bath towels, hand towels and washcloths** for salons, spas and gyms. Salon towels, spa towels and bathrobes are available as [custom sourcing inquiries](/custom-textile-sourcing).')),
    faqs: [],
  },
  'catering-events': {
    heading: 'Wholesale Table Linens for Caterers & Event Rentals',
    summary: 'Tablecloths, cloth napkins and aprons for caterers, banquet halls, wedding venues and event rental companies.',
    categories: ['restaurant-table-linens', 'kitchen-foodservice-towels'],
    needs: [
      { title: 'Color ranges', text: 'Napkins and tablecloths in the colors your clients request, subject to availability.' },
      { title: 'Table sizes', text: 'Tablecloths sized to your tables and drop length.' },
      { title: 'Staff aprons', text: 'Bib and waist aprons for service teams.' },
    ],
    intro: rt(p('We source **restaurant tablecloths, solid color and bistro stripe napkins, and commercial aprons** for event and catering inventory. Runners and placemats are available as [custom sourcing inquiries](/custom-textile-sourcing).')),
    faqs: [],
  },
  'vacation-rentals-property-managers': {
    heading: 'Wholesale Linens for Vacation Rentals',
    summary: 'Bath towels, hand towels, washcloths, bed sheets, pillowcases and kitchen towels for short-term rental hosts and property managers.',
    categories: ['hotel-bath-spa', 'kitchen-foodservice-towels'],
    needs: [
      { title: 'Hotel-style linens', text: 'White towels and sheets that are easy to launder and match across units.' },
      { title: 'Consistent across units', text: 'The same specification for every property.' },
      { title: 'Kitchen textiles', text: 'Kitchen and flour sack towels for guest kitchens.' },
    ],
    intro: rt(p('We source **bath towels, hand towels, washcloths, bed sheets, pillowcases and kitchen towels** for property managers. Packing options are confirmed in your quotation.')),
    faqs: [],
  },
  'schools-camps-dormitories': {
    heading: 'Wholesale Bedding & Towels for Schools, Dorms and Camps',
    metaTitle: 'Bedding & Towels for Schools and Camps | Kazim Textiles',
    summary: 'Bed sheets, pillowcases, towels and kitchen textiles for universities, boarding schools, camps and shelters.',
    categories: ['hotel-bath-spa', 'kitchen-foodservice-towels'],
    needs: [
      { title: 'Durable and practical', text: 'Weights and blends specified for long service life.' },
      { title: 'Institutional sizes', text: 'Twin XL and other bed sizes as required.' },
      { title: 'Planned volume orders', text: 'Quotes for orders ahead of term or season start.' },
    ],
    intro: rt(p('We source **bed sheets, pillowcases, bath towels and kitchen towels** for institutional beds and kitchens. Blankets and laundry bags are available as [custom sourcing inquiries](/custom-textile-sourcing).')),
    faqs: [
      { question: 'Can you quote Twin XL sheets for dorm beds?', answer: 'Yes. Send mattress dimensions and depth, and sizes are confirmed in your quotation.' },
    ],
  },
  'wholesale-distributors': {
    name: 'Wholesalers & Distributors',
    heading: 'Wholesale Textile Sourcing for Distributors',
    summary: 'Core commercial textiles across five categories for janitorial, foodservice, hospitality and healthcare distributors.',
    buyers: 'Janitorial & foodservice distributors, uniform and linen suppliers, wholesalers, importers',
    categories: ['kitchen-foodservice-towels', 'industrial-wiping-cleaning', 'hotel-bath-spa', 'restaurant-table-linens', 'healthcare-institutional'],
    needs: [
      { title: 'One contact, five categories', text: 'Towels, wiping products, linens and healthcare textiles through one sourcing contact.' },
      { title: 'Specification-led quotes', text: 'Quotes based on the specifications your customers need.' },
      { title: 'Repeat programs', text: 'Reorders quoted against your approved specification.' },
    ],
    intro: rt(p('Distributors use Kazim Textiles to source **bar mops, flour sack towels, shop towels, huck towels, wiping rags, kitchen towels and aprons**, along with hospitality and healthcare textiles. Packaging and labeling options are subject to supplier availability and confirmed in your quotation.')),
    faqs: [],
  },
}

const contactCta = {
  blockType: 'cta',
  eyebrow: 'Ready when you are',
  heading: 'Share your requirements',
  intro: 'Send the products, quantities and specifications you need, and we will reply with next steps.',
  buttons: [
    { label: 'Request a quote', url: '/quote' },
    { label: 'Browse products', url: '/products' },
  ],
}

export const pages: Record<string, { title: string; hero: { eyebrow?: string; heading?: string; intro: string }; layout: Record<string, unknown>[]; meta?: { title: string; description: string } }> = {
  about: {
    title: 'About Kazim Textiles',
    hero: {
      eyebrow: 'About us',
      heading: 'About Kazim Textiles',
      intro: 'A Pennsylvania-based wholesale textile sourcing and supply company connecting U.S. businesses with textile manufacturing partners in Pakistan.',
    },
    layout: [
      {
        blockType: 'content',
        narrow: true,
        content: rt(
          h2('Who we are'),
          p('Kazim Textiles is a wholesale textile sourcing and supply business based in Pennsylvania. We work with textile manufacturing partners in Pakistan to source commercial textiles for U.S. businesses, based on each buyer’s specifications and order requirements.'),
          p('We do not own manufacturing facilities. Our role is to understand what you need, review options with our manufacturing partners, prepare a quotation on confirmed specifications, and coordinate sourcing, production and shipping once an order is agreed.'),
          h2('What we supply'),
          ul([
            '[Kitchen & Foodservice Towels](/categories/kitchen-foodservice-towels): bar mops, flour sack towels, kitchen towels and aprons',
            '[Industrial Wiping & Cleaning](/categories/industrial-wiping-cleaning): shop towels, huck towels, wiping rags and cleaning cloths',
            '[Hotel, Bath & Spa Textiles](/categories/hotel-bath-spa): towels, bath mats, sheets and pillowcases',
            '[Restaurant & Table Linens](/categories/restaurant-table-linens): napkins and tablecloths',
            '[Healthcare & Institutional](/categories/healthcare-institutional): scrubs, patient gowns and hospital sheets',
          ]),
          h2('Industries we serve'),
          p('Restaurants and foodservice, janitorial and cleaning companies, automotive and industrial users, hotels and vacation rentals, linen services, healthcare and care facilities, and the distributors who supply them.'),
        ),
      },
      { blockType: 'steps', eyebrow: 'How sourcing and quotation work', heading: 'How We Work', intro: 'Every inquiry follows the same three steps.', steps },
    ],
    meta: {
      title: 'About Kazim Textiles | Wholesale Textile Sourcing & Supply',
      description: 'Pennsylvania-based wholesale textile sourcing and supply company working with textile manufacturing partners in Pakistan.',
    },
  },
  contact: {
    title: 'Contact Us',
    hero: { eyebrow: 'Contact', intro: 'Questions about a product, a quote or a sourcing inquiry? Call, email or send your requirements.' },
    layout: [
      {
        blockType: 'content',
        narrow: true,
        content: rt(
          h2('The fastest way to a quote'),
          p('Use the [quote request form](/quote) for core catalog products, or the [custom sourcing form](/custom-textile-sourcing) for anything else. Include the product, estimated quantity, any specifications you know and your delivery ZIP code.'),
        ),
      },
    ],
    meta: { title: 'Contact Kazim Textiles', description: `Call ${PHONE} or email Kazim Textiles about wholesale textile quotes and sourcing inquiries.` },
  },
  'how-we-work': {
    title: 'How We Work',
    hero: { eyebrow: 'Our process', intro: 'How a requirement becomes a quotation, and a quotation becomes a delivered order.' },
    layout: [
      { blockType: 'steps', eyebrow: 'Step by step', heading: 'How We Work', intro: 'A clear process for first orders and repeat programs.', steps },
      {
        blockType: 'cards',
        eyebrow: 'What to send us',
        heading: 'Information that speeds up your quote',
        cards: [
          { title: 'Product & use', text: 'What the product is and how it will be used, e.g. restaurant bar mops or hotel bath towels.' },
          { title: 'Specification', text: 'Size, material, weight, color and construction, if known. Send what you have.' },
          { title: 'Quantity & delivery', text: 'Estimated quantity, packing preference and delivery ZIP code.' },
        ],
      },
      {
        blockType: 'content',
        narrow: true,
        content: rt(p('U.S. inventory, local pickup, samples and mixed-container orders are not standard services. If you need any of them, ask in your request and we will confirm what is possible for your order.')),
      },
      contactCta,
    ],
  },
  'quality-assurance': {
    title: 'Quality & Specifications',
    hero: { eyebrow: 'Quality', intro: 'How product specifications and quality requirements are agreed before an order.' },
    layout: [
      {
        blockType: 'checklist',
        eyebrow: 'Agreed before ordering',
        heading: 'What we confirm with you',
        intro: 'Requirements are agreed per order and confirmed with our manufacturing partners.',
        items: [
          { text: 'Product specification: size, material, construction and weight' },
          { text: 'Color and finishing requirements' },
          { text: 'Labeling and packing requirements' },
          { text: 'Any documentation or testing your purchase requires' },
          { text: 'Tolerances and acceptance criteria, where applicable' },
        ],
      },
      {
        blockType: 'content',
        narrow: true,
        content: rt(p('We do not publish certifications or test results that have not been verified for your product. If you need third-party testing or a specific standard, tell us in your request and we will confirm what is available before you order.')),
      },
      contactCta,
    ],
  },
  'shipping-and-delivery': {
    title: 'Shipping & Delivery',
    hero: { eyebrow: 'Logistics', intro: 'How shipping terms are agreed for each order.' },
    layout: [
      {
        blockType: 'checklist',
        eyebrow: 'Stated in every quotation',
        heading: 'Shipping terms, clearly stated',
        items: [
          { text: 'Shipping basis (for example FOB, CIF or delivered), where offered' },
          { text: 'Carton size, weight and pallet configuration' },
          { text: 'Labeling and country-of-origin marking' },
          { text: 'Commercial invoice and packing list' },
          { text: 'Delivery address(es) and target date' },
        ],
      },
      {
        blockType: 'content',
        narrow: true,
        content: rt(
          p('Shipping charges depend on order volume, packed weight, shipping method and delivery location. Lead times and delivery dates are confirmed in writing for each order; we do not publish standard delivery promises.'),
          p('Import duties and customs requirements depend on the product. We recommend working with a licensed customs broker for classification and clearance.'),
        ),
      },
      contactCta,
    ],
  },
}

/** Pages retired from navigation and unpublished, with where their URL now goes. */
export const retiredPages: Record<string, string> = {
  'private-label-manufacturing': '/custom-textile-sourcing',
}

export const guides: Record<string, { excerpt?: string; metaTitle?: string; relatedProducts: string[]; content: ReturnType<typeof rt> }> = {
  'how-to-request-a-textile-quote': {
    relatedProducts: ['bar-mop-towels', 'shop-towels', 'bath-towels'],
    content: rt(
      p('A precise request gets a faster, more accurate quote. Use this checklist, and send whatever you know: missing details can be worked out together.'),
      h2('1. Name the product and how it will be used'),
      p('“Towels” could mean a 16" x 19" bar mop or a 27" x 54" bath towel. Say what it is and where it will be used, for example “bar mop towels for a restaurant kitchen, laundered daily.”'),
      h2('2. Give the specification, if known'),
      ul([
        '**Size** in inches',
        '**Material**: 100% cotton, cotton/poly, polyester or microfiber',
        '**Weight**: GSM, or ounces or pounds per dozen (say which)',
        '**Construction**: terry, huck, plain weave, herringbone or twill',
        '**Color**: white, a standard color or a color reference',
      ]),
      h2('3. State quantity and packing'),
      p('Give an estimated quantity and unit (pieces, dozens, cases, cartons or pounds) and your packing preference. A case pack is not the same as a minimum order quantity.'),
      h2('4. Branding'),
      p('Labels, logos and custom packaging affect price and minimums, and availability depends on the manufacturer. Mention them up front.'),
      h2('5. Delivery'),
      p('Include your delivery ZIP code and target timing. Shipping terms are confirmed in the quotation.'),
      p('Ready? [Send your quote request](/quote).'),
    ),
  },
  'bulk-towel-specifications': {
    relatedProducts: ['bath-towels', 'hand-towels', 'bar-mop-towels', 'huck-towels'],
    content: rt(
      p('Towel specifications use a few terms that are easy to mix up. Here is what they mean, with common reference sizes buyers ask for.'),
      h2('GSM vs. weight per dozen'),
      p('**GSM (grams per square meter)** describes fabric density regardless of size. **Weight per dozen** is the total weight of 12 towels, so it depends on both density and size. Hotel towels are usually specified in GSM or lb per dozen; bar mops and shop towels usually in oz or lb per dozen.'),
      h2('Common reference sizes'),
      ul([
        '**Washcloth:** about 12" x 12" to 13" x 13"',
        '**Hand towel:** about 16" x 27" to 16" x 30"',
        '**Bath towel:** about 24" x 50" to 27" x 54"',
        '**Bar mop:** about 16" x 19"',
        '**Shop towel:** about 13" x 13" to 15" x 15"',
        '**Huck towel:** about 15" x 25" to 16" x 26"',
        '**Flour sack towel:** about 27" x 27" to 30" x 30"',
      ]),
      p('These are reference sizes only. Other sizes are subject to supplier quotation.'),
      h2('Choosing GSM for hotel towels'),
      p('Lighter towels dry faster and cost less to launder; heavier towels feel more substantial. Match the weight to your guest positioning and laundry capacity.'),
    ),
  },
  'bar-mop-vs-huck-vs-flour-sack-towels': {
    metaTitle: 'Bar Mop vs. Huck vs. Flour Sack Towels | Kazim Textiles',
    relatedProducts: ['bar-mop-towels', 'huck-towels', 'flour-sack-towels', 'kitchen-towels'],
    content: rt(
      h2('Bar mop towels'),
      p('Small, absorbent terry towels, commonly around 16" x 19". Used for spills, counters and bar tops, often with a colored center stripe. Specified by weight per dozen.'),
      h2('Huck towels'),
      p('Tightly woven, textured (“huckaback”) cotton towels that leave little lint. Common for glass, mirrors, stainless steel and janitorial work, usually around 15" x 25" to 16" x 26"; blue is a common color.'),
      h2('Flour sack towels'),
      p('Large, lightweight plain-weave cotton towels for food prep, drying glassware and dishes, and covering dough.'),
      h2('Quick comparison'),
      ul(['**Spills and wiping:** bar mops', '**Streak-free glass and polishing:** huck towels', '**Food prep and drying:** flour sack towels']),
      p('Not sure which suits your operation? [Ask us](/quote) and describe how the towels will be used.'),
    ),
  },
  'hotel-and-vacation-rental-linens': {
    relatedProducts: ['bath-towels', 'bed-sheets', 'pillowcases', 'hand-towels'],
    content: rt(
      h2('Start with par levels'),
      p('“Par” is how many sets you keep per bed. Many hotels work on 3 to 5 par: one set in the room, one in the laundry, one on the shelf, plus spares. Vacation rental hosts often keep at least 2 to 3 sets per bed.'),
      h2('Towels'),
      p('White towels are the hospitality standard because they can be bleached and look clean. Choose GSM based on your positioning and drying capacity.'),
      h2('Sheets'),
      p('Poly-cotton percale blends are popular with hotels because they wrinkle less in commercial laundry. 100% cotton feels crisp and breathable but needs more care.'),
      h2('Keep it consistent'),
      p('Use the same specification in every room and property so linens can be swapped freely, and quote reorders against that specification.'),
    ),
  },
}

/** Header and footer. Blog is left out until articles are published (L01). */
export const navigation = {
  headerLinks: [
    { label: 'Products', url: '/products' },
    { label: 'Industries', url: '/industries' },
    { label: 'Custom Sourcing', url: '/custom-textile-sourcing' },
    { label: 'Guides', url: '/guides' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' },
  ],
  headerCta: { label: 'Request a Quote', url: '/quote' },
  companyLinks: [
    { label: 'About us', url: '/about' },
    { label: 'How we work', url: '/how-we-work' },
    { label: 'Custom textile sourcing', url: '/custom-textile-sourcing' },
    { label: 'Shipping & delivery', url: '/shipping-and-delivery' },
    { label: 'Buying guides', url: '/guides' },
    { label: 'Contact', url: '/contact' },
  ],
  copyright: 'Kazim Textiles. All rights reserved.',
}
