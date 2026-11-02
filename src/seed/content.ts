import { h2, h3, p, rt, ul } from './richtext'

/** Alt text for each seed image (describes what is actually in the picture). */
export const imageAlt: Record<string, string> = {
  'hero-textiles.webp': 'Assortment of wholesale textiles: striped kitchen towels, red shop towels, blue scrubs, chef coat and white hotel towels',
  'home-curtains.webp': 'Neutral and brown window curtain panels in a living room',
  'towels-11.webp': 'Stack of folded red cotton shop towels',
  'towels-12.webp': 'Stack of blue huck weave towels',
  'towels-13.webp': 'White kitchen towels with blue herringbone stripe',
  'towels-14.webp': 'Stack of plain white cotton flour sack towels',
  'towels-21.webp': 'White terry bar towels with red center stripe',
  'towels-22.webp': 'Pile of mixed grey and white cotton wiping rags',
  'towels-23.webp': 'Blue and grey microfiber cleaning cloths',
  'towels-24.webp': 'White restaurant tablecloth on a dining table with folded napkins',
  'towels-31.webp': 'White dish towels with red and blue stripes',
  'towels-32.webp': 'Folded white hotel bath towels, hand towels and washcloths',
  'towels-33.webp': 'Stack of black salon towels',
  'towels-34.webp': 'Blue and white cabana stripe pool towels',
  'towels_alt-11.webp': 'Red terry shop towels folded in a stack',
  'towels_alt-12.webp': 'Blue terry cleaning towels folded in a stack',
  'towels_alt-13.webp': 'White kitchen towels with blue stripe',
  'towels_alt-14.webp': 'Folded white cotton cloths',
  'towels_alt-21.webp': 'White terry bar mop towels with blue stripes',
  'towels_alt-22.webp': 'Grey and white industrial wiping cloths',
  'towels_alt-23.webp': 'Blue and grey cleaning towels',
  'towels_alt-24.webp': 'White linen tablecloth and napkin',
  'towels_alt-31.webp': 'White cotton towels with red and blue stripes',
  'towels_alt-32.webp': 'Stack of white hotel hand towels with dobby border',
  'towels_alt-33.webp': 'Rolled and folded black terry towels',
  'towels_alt-34.webp': 'Blue and white striped beach and pool towels',
  'uniforms-11.webp': 'White double-breasted chef coat',
  'uniforms-12.webp': 'Black bib apron',
  'uniforms-13.webp': 'Ceil blue medical scrub top and pants',
  'uniforms-14.webp': 'Blue print hospital patient gown',
  'uniforms-21.webp': 'Stack of white short sleeve t-shirts',
  'uniforms-22.webp': 'Folded white long sleeve t-shirts',
  'uniforms-23.webp': 'Cream and charcoal waffle-knit thermal shirts',
  'uniforms-24.webp': 'White tank tops and black boxer briefs',
  'uniforms-31.webp': 'White cotton napkins with red, blue and green stripes',
  'uniforms-32.webp': 'Folded burgundy, green and ivory cloth napkins',
  'uniforms-33.webp': 'Quilted placemats with embroidered leaf pattern',
  'uniforms-34.webp': 'Ivory table runner with hemstitch detail',
  'medical-scrub-sets.webp': 'Woman in navy and man in charcoal V-neck scrub tops with matching jogger-style cargo scrub pants',
}

/** Better image choices than the original catalog for some products. */
export const imageOverrides: Record<string, string> = {
  'kitchen-towels': 'towels_alt-13.webp',
  'white-shop-towels': 'towels-14.webp',
  'striped-wiping-cloths': 'towels_alt-31.webp',
  'industrial-wiping-cloths': 'towels_alt-22.webp',
  'polishing-cloths': 'towels_alt-12.webp',
  'reclaimed-wiping-rags': 'towels_alt-22.webp',
  'dish-towels': 'towels-31.webp',
  'tea-towels': 'uniforms-31.webp',
  'glass-polishing-towels': 'towels_alt-14.webp',
  'bar-towels': 'towels_alt-21.webp',
  'washcloths': 'towels-32.webp',
  'spa-towels': 'towels_alt-32.webp',
  'pool-towels': 'towels-34.webp',
  'flat-bed-sheets': 'towels_alt-24.webp',
  'fitted-bed-sheets': 'towels_alt-24.webp',
  'pillowcases': 'towels_alt-24.webp',
  'duvet-covers': 'towels_alt-24.webp',
  'mattress-protectors': 'towels_alt-24.webp',
  'hospital-bed-sheets': 'towels_alt-24.webp',
  'restaurant-tablecloths': 'towels-24.webp',
  'polyester-table-linens': 'towels_alt-24.webp',
  'shop-towels': 'towels-11.webp',
}

export const featuredProducts = [
  'shop-towels',
  'bar-mop-towels',
  'flour-sack-towels',
  'huck-towels',
  'bath-towels',
  'solid-color-napkins',
  'medical-scrub-sets',
  'chef-coats',
]

type Spec = { label: string; value: string }

/** Category content: SEO heading, buyer checklist, generic made-to-order specs, customization, FAQs, page body. */
export const categoryContent: Record<
  string,
  { heading: string; intro?: string; specs: Spec[]; customization: string[]; faqs: { question: string; answer: string }[]; body: ReturnType<typeof rt> }
> = {
  'industrial-wiping-cleaning': {
    heading: 'Wholesale Shop Towels, Wiping Rags & Industrial Cleaning Cloths',
    intro: 'Shop towels, huck towels, terry wipers, microfiber and bulk wiping rags made to order for janitorial distributors, auto shops, factories and laundries.',
    specs: [
      { label: 'Sizes', value: 'Standard (e.g. 14" x 14", 16" x 26") or custom' },
      { label: 'Fiber', value: '100% cotton, cotton/poly blend or microfiber' },
      { label: 'Weight', value: 'Specified per piece, GSM or lb per dozen' },
      { label: 'Colors', value: 'Red, blue, white, grey or custom dyed' },
      { label: 'Packing', value: 'Bundles, poly bags, cartons or compressed bales' },
    ],
    customization: ['Custom sizes', 'Hemmed or overlocked edges', 'Color coding', 'Private-label packaging', 'Bale weights to order'],
    faqs: [
      { question: 'Do you sell shop towels and rags by the pound or by the piece?', answer: 'Both. New-made towels are usually quoted per dozen or per piece; wiping rags are usually quoted per pound in bales (for example 25 lb or 50 lb). Tell us how you resell or use them and we will quote in the same unit.' },
      { question: 'Can you make low-lint towels for glass and precision wiping?', answer: 'Yes. Huck weave and tightly woven cotton towels are the usual low-lint choice. Tell us the application and we will recommend a construction and send samples.' },
      { question: 'Can towels be color coded for different areas?', answer: 'Yes. Color-coded towels (for example red for restrooms, blue for glass, green for food areas) can be produced to your color standard.' },
    ],
    body: rt(
      h2('Industrial wiping textiles made to your specification'),
      p('Cleaning and maintenance teams go through wiping towels fast, so the right construction matters: heavy terry for oil and grease, huck weave for streak-free glass, microfiber for janitorial detailing, and low-cost rag bales for one-time use. We produce each to your size, weight and color, then pack it for resale or direct use.'),
      ul([
        '**Shop towels** for automotive, machine shops and maintenance',
        '**Huck towels** for glass, surgical-style low-lint wiping and janitorial',
        '**Terry and microfiber cloths** for absorbent, general-purpose cleaning',
        '**Wiping rags and bales** for factories and industrial distributors',
      ]),
    ),
  },
  'kitchen-foodservice-towels': {
    heading: 'Wholesale Kitchen Towels, Bar Mops & Flour Sack Towels',
    intro: 'Bar mop towels, flour sack towels, herringbone kitchen towels and dish towels made to order for restaurants, bars, caterers and foodservice distributors.',
    specs: [
      { label: 'Sizes', value: 'Standard (e.g. 16" x 19" bar mop, 28" x 29" flour sack) or custom' },
      { label: 'Fiber', value: '100% cotton or cotton blends' },
      { label: 'Weight', value: 'Specified in oz or lb per dozen, or GSM' },
      { label: 'Stripe / color', value: 'White, colored stripe, herringbone or solid' },
      { label: 'Packing', value: 'Dozen bundles, retail multipacks or bulk cartons' },
    ],
    customization: ['Custom stripe colors', 'Hanging loops', 'Hemmed edges', 'Retail multipacks', 'Private-label packaging'],
    faqs: [
      { question: 'What is the difference between bar mops, flour sack and kitchen towels?', answer: 'Bar mops are small, heavy terry towels for spills and counters. Flour sack towels are large, lightweight plain-weave cotton for food prep, drying and covering dough. Kitchen towels (often herringbone or striped) sit in between and are used for general drying and handling.' },
      { question: 'How is bar mop weight measured?', answer: 'Usually in ounces or pounds per dozen. A heavier weight per dozen generally means a thicker, more absorbent towel. Tell us your target weight, or the towel you use now, and we will match it.' },
      { question: 'Can you supply retail-ready multipacks?', answer: 'Yes. We can pack towels in multipacks with your label, header card or sleeve for retail and distributor programs.' },
    ],
    body: rt(
      h2('Kitchen and foodservice towels built for daily laundering'),
      p('Commercial kitchens wash towels every day, so we focus on construction, weight and hemming that stand up to industrial laundry. Choose a standard size or send us your own specification.'),
    ),
  },
  'restaurant-table-linens': {
    heading: 'Wholesale Restaurant Linens, Cloth Napkins & Tablecloths',
    intro: 'Cloth napkins, tablecloths, table runners and placemats made to order for restaurants, hotels, caterers, event rental companies and linen services.',
    specs: [
      { label: 'Sizes', value: 'Napkins 18" or 20" square, tablecloths to table size, or custom' },
      { label: 'Fabric', value: 'Cotton, poly-cotton or 100% spun polyester' },
      { label: 'Finish', value: 'Hemmed, mitered corners, hemstitch or embroidered' },
      { label: 'Colors', value: 'White, ivory, black and solid colors, stripes or prints' },
      { label: 'Packing', value: 'By the dozen, flat-packed in cartons' },
    ],
    customization: ['Custom sizes and shapes', 'Logo embroidery', 'Printed patterns', 'Custom colors', 'Mitered corners'],
    faqs: [
      { question: 'Which fabric is best for restaurant napkins?', answer: 'Spun polyester is durable, colorfast and needs little ironing — the usual choice for linen rental and high-volume restaurants. Cotton feels softer and more absorbent but wrinkles more. Poly-cotton blends sit in between.' },
      { question: 'Can you make tablecloths for round and banquet tables?', answer: 'Yes. Send us table sizes and the drop length you want and we will size square, rectangular and round tablecloths to fit.' },
    ],
    body: rt(
      h2('Table linens for dining rooms, banquets and events'),
      p('Restaurants and caterers need table linens that look sharp after many washes. We make napkins, tablecloths, runners and placemats in the fabric, color and finish your dining room or event program needs.'),
    ),
  },
  'hotel-bath-spa': {
    heading: 'Wholesale Hotel Towels, Bed Linens & Spa Textiles',
    intro: 'Bath towels, hand towels, washcloths, bath mats, bed sheets, pillowcases, robes and pool towels made to order for hotels, resorts, spas, gyms and vacation rentals.',
    specs: [
      { label: 'Towel sizes', value: 'Bath, hand, washcloth, bath mat and pool sizes, or custom' },
      { label: 'Towel weight', value: 'Specified in GSM or lb per dozen' },
      { label: 'Bedding', value: 'Flat, fitted, pillowcases and duvet covers to mattress size' },
      { label: 'Fabric', value: 'Cotton terry, ring-spun cotton, percale or poly-cotton' },
      { label: 'Colors', value: 'White, cream or custom dyed; dobby borders available' },
    ],
    customization: ['Woven dobby borders', 'Logo embroidery', 'Custom GSM', 'Custom sizes', 'Hotel-ready packing'],
    faqs: [
      { question: 'What GSM should hotel towels be?', answer: 'Many economy and mid-scale hotels use roughly 400–500 GSM bath towels; upscale properties often choose 550–650 GSM or more. Higher GSM feels thicker but takes longer to dry and costs more to launder. We can help you choose.' },
      { question: 'Do you make blended sheets for commercial laundering?', answer: 'Yes. Poly-cotton percale blends are popular with hotels because they resist wrinkles and hold up to industrial laundry. 100% cotton sheets are also available.' },
      { question: 'Can you add our hotel logo?', answer: 'Yes — towels and robes can be embroidered or have a woven logo in the border. Logo work usually affects minimum order and lead time, which we confirm in the quote.' },
    ],
    body: rt(
      h2('Guest-ready towels and linens for hospitality'),
      p('Hotel linens carry your guest experience and your laundry costs. We make towels and bedding to the weight, size and blend that fit your brand standard and your laundry program.'),
    ),
  },
  'healthcare-institutional': {
    heading: 'Wholesale Hospital Linens, Scrubs & Patient Gowns',
    intro: 'Medical scrubs, patient gowns, hospital sheets, blankets, reusable underpads, lab coats and laundry bags made to order for hospitals, clinics and care facilities.',
    specs: [
      { label: 'Sizes', value: 'Standard hospital sizes or your facility specification' },
      { label: 'Fabric', value: 'Poly-cotton, 100% cotton or as specified by your facility' },
      { label: 'Colors', value: 'Facility colors, prints or color-coded by department' },
      { label: 'Laundering', value: 'Built for your laundering protocol — tell us temperatures and chemistry' },
      { label: 'Documentation', value: 'Fiber content, care labels and test reports on request' },
    ],
    customization: ['Department color coding', 'Facility name printing', 'Custom sizing', 'Snap or tie closures', 'Bulk institutional packing'],
    faqs: [
      { question: 'Can you meet our facility’s linen specification?', answer: 'Send us your spec sheet (fabric, weight, size, closures, color, laundering requirements) and we will confirm what we can produce and send samples for approval.' },
      { question: 'Are your products certified as medical devices?', answer: 'Our healthcare textiles are general-use linens and apparel. If your application requires a specific standard or certification, tell us in your request and we will confirm what documentation is available before you order.' },
    ],
    body: rt(
      h2('Linens and apparel for patient care'),
      p('Hospitals and care homes need textiles that survive high-temperature laundering and stay comfortable for patients. We make scrubs, gowns, bedding and laundry accessories to your facility’s specification.'),
    ),
  },
  'apparel-uniforms-workwear': {
    heading: 'Wholesale Chef Uniforms, Aprons, Workwear & Blank Apparel',
    intro: 'Chef coats, chef pants, aprons, workwear, t-shirts, thermals and underwear made to order for restaurants, hotels, uniform companies and private-label brands.',
    specs: [
      { label: 'Sizes', value: 'Full size runs (XS–5XL) or your size chart' },
      { label: 'Fabric', value: 'Cotton, poly-cotton twill, jersey or waffle knit' },
      { label: 'Colors', value: 'Standard colors or custom dyed to your shade' },
      { label: 'Branding', value: 'Embroidery, screen print, woven labels, hang tags' },
      { label: 'Packing', value: 'Individually bagged, size-assorted cartons' },
    ],
    customization: ['Logo embroidery', 'Screen printing', 'Woven neck labels', 'Custom size charts', 'Retail packaging'],
    faqs: [
      { question: 'Can you make uniforms with our restaurant or hotel logo?', answer: 'Yes. Chef coats, aprons and shirts can be embroidered or printed with your logo. Send artwork with your request.' },
      { question: 'Do you make private-label t-shirts and basics?', answer: 'Yes. We produce blank and private-label tees, thermals, tank tops and underwear with your labels, tags and packaging.' },
    ],
    body: rt(
      h2('Uniforms and apparel made for your team or your brand'),
      p('From kitchen uniforms to private-label basics, we produce apparel in your fabric, colors and size chart, finished with your branding and packed the way you need it.'),
    ),
  },
  'home-decorative': {
    heading: 'Wholesale Curtains, Table Runners & Home Textiles',
    intro: 'Curtains, printed home textiles, decorative placemats and table runners made to order for retailers, hotels and home-goods brands.',
    specs: [
      { label: 'Sizes', value: 'Standard panel and runner sizes or custom' },
      { label: 'Fabric', value: 'Cotton, linen-look, polyester or blends' },
      { label: 'Design', value: 'Solid, printed, embroidered or quilted' },
      { label: 'Header style', value: 'Rod pocket, grommet, tab top or pinch pleat' },
      { label: 'Packing', value: 'Retail packaging or bulk cartons' },
    ],
    customization: ['Custom prints', 'Embroidery', 'Private label', 'Retail packaging', 'Custom sizes'],
    faqs: [
      { question: 'Can you print our own designs?', answer: 'Yes. Send your artwork or design brief and we will advise on print method, fabric and minimums.' },
    ],
    body: rt(
      h2('Decorative textiles for retail and hospitality'),
      p('Curtains, runners and placemats in your designs and colors — produced for retail collections or for furnishing hotel rooms and restaurants.'),
    ),
  },
  'technical-industrial-fabrics': {
    heading: 'Woven Cotton Fabric Rolls, Filter Cloth & Custom Fabrics',
    intro: 'Woven cotton fabric rolls, filter cloth and custom fabric constructions made to specification for converters and industrial users.',
    specs: [
      { label: 'Width', value: 'To your requirement' },
      { label: 'Construction', value: 'Weave, yarn count and density as specified' },
      { label: 'Weight', value: 'GSM or oz per square yard' },
      { label: 'Finish', value: 'Greige, bleached, dyed or as specified' },
      { label: 'Packing', value: 'Rolls or folded bales' },
    ],
    customization: ['Custom construction', 'Custom width', 'Finishing to spec', 'Roll length to order'],
    faqs: [
      { question: 'What do you need to quote a custom fabric?', answer: 'Fiber, yarn count, weave, density (ends and picks), width, weight, finish and quantity. A physical sample or spec sheet is the fastest route.' },
    ],
    body: rt(
      h2('Specification-led fabric production'),
      p('For converters and industrial buyers who know exactly what they need: send your construction and we will confirm production and samples.'),
    ),
  },
}

type IndustrySeed = {
  slug: string
  name: string
  heading: string
  summary: string
  buyers: string
  categories: string[]
  extraProducts?: string[]
  needs: { title: string; text: string }[]
  intro: ReturnType<typeof rt>
  faqs: { question: string; answer: string }[]
}

export const industries: IndustrySeed[] = [
  {
    slug: 'hotels-hospitality',
    name: 'Hotels & Resorts',
    heading: 'Wholesale Hotel Linens & Hospitality Textiles',
    summary: 'Bath towels, bed linens, robes, pool towels and restaurant linens made to your brand standard for hotels, resorts and motels.',
    buyers: 'Hotels, resorts, motels, boutique hotels, hotel management groups',
    categories: ['hotel-bath-spa', 'restaurant-table-linens', 'home-decorative'],
    needs: [
      { title: 'Consistent brand standard', text: 'Same GSM, size and color across every reorder and every property.' },
      { title: 'Built for commercial laundry', text: 'Constructions and blends that hold up to daily high-temperature washing.' },
      { title: 'Logo and dobby options', text: 'Embroidered or woven-border towels and robes with your brand.' },
    ],
    intro: rt(
      p('Guests judge a hotel by its towels and sheets, and housekeeping budgets depend on how long they last. We produce **bath towels, hand towels, washcloths, bath mats, sheets, pillowcases, duvet covers, robes and pool towels** to your specification, plus table linens for your restaurant and banquet spaces.'),
    ),
    faqs: [
      { question: 'Can you match the towels we currently use?', answer: 'Yes. Send us a sample or the specification (size, GSM, color, border) and we will match it and send a sample for approval.' },
      { question: 'Do you supply hotel groups with multiple properties?', answer: 'Yes. We can produce to one brand standard and ship to several locations or a central warehouse.' },
    ],
  },
  {
    slug: 'restaurants-foodservice',
    name: 'Restaurants & Foodservice',
    heading: 'Wholesale Restaurant Linens, Kitchen Towels & Chef Uniforms',
    summary: 'Bar mops, kitchen towels, cloth napkins, tablecloths, aprons and chef wear for restaurants, bars, cafés and commissary kitchens.',
    buyers: 'Restaurants, bars, cafés, bakeries, ghost kitchens, restaurant groups',
    categories: ['kitchen-foodservice-towels', 'restaurant-table-linens', 'apparel-uniforms-workwear'],
    needs: [
      { title: 'Front and back of house', text: 'Napkins and tablecloths for the dining room, bar mops and towels for the kitchen.' },
      { title: 'Uniforms with your logo', text: 'Chef coats, aprons and shirts embroidered with your brand.' },
      { title: 'Durable in daily wash', text: 'Weights and hems chosen for daily commercial laundering.' },
    ],
    intro: rt(
      p('Restaurants go through towels, napkins and aprons every shift. We make **bar mop towels, flour sack towels, kitchen towels, cloth napkins, tablecloths, chef coats, chef pants and aprons** in the sizes, colors and weights your operation needs.'),
    ),
    faqs: [
      { question: 'What size bar mop towels do restaurants use?', answer: '16" x 19" is the common bar mop size, but we can make any size. Weight is usually quoted per dozen.' },
      { question: 'Can you make aprons in our brand colors?', answer: 'Yes — bib and waist aprons in your colors with logo embroidery or printing.' },
    ],
  },
  {
    slug: 'healthcare-medical',
    name: 'Hospitals & Clinics',
    heading: 'Wholesale Hospital Linens, Scrubs & Patient Gowns',
    summary: 'Scrubs, patient gowns, hospital sheets, blankets, underpads, lab coats and laundry bags made to your facility specification.',
    buyers: 'Hospitals, clinics, surgery centers, dental and veterinary practices, labs',
    categories: ['healthcare-institutional', 'industrial-wiping-cleaning'],
    extraProducts: ['bath-towels', 'washcloths'],
    needs: [
      { title: 'Facility specification', text: 'Fabric, sizes, closures and colors to your linen standard.' },
      { title: 'High-temperature laundering', text: 'Blends and constructions selected for hospital laundry cycles.' },
      { title: 'Color coding', text: 'Department or role color coding for scrubs and linens.' },
    ],
    intro: rt(
      p('We produce **medical scrubs, patient gowns, hospital bed sheets, blankets, reusable underpads, patient bibs, lab coats and laundry bags** for hospitals, clinics and linen services, built around your facility’s requirements.'),
    ),
    faqs: [
      { question: 'Can you produce scrubs in our department colors?', answer: 'Yes. Send your color references and size breakdown and we will quote by department.' },
      { question: 'What documentation can you provide?', answer: 'Fiber content and care labels as standard; test reports can be arranged on request. Tell us your requirements when you ask for a quote.' },
    ],
  },
  {
    slug: 'senior-living-care-homes',
    name: 'Senior Living & Care Homes',
    heading: 'Wholesale Linens for Nursing Homes & Senior Living',
    summary: 'Bed linens, reusable underpads, patient bibs, gowns, blankets and towels for nursing homes, assisted living and long-term care.',
    buyers: 'Nursing homes, assisted living, memory care, rehab centers, group homes',
    categories: ['healthcare-institutional', 'hotel-bath-spa'],
    needs: [
      { title: 'Resident comfort', text: 'Soft, breathable fabrics for residents who spend long hours in bed.' },
      { title: 'Reusable incontinence care', text: 'Washable underpads and bibs that cut disposable costs.' },
      { title: 'Easy to identify', text: 'Color coding and printed facility names to keep linens in-house.' },
    ],
    intro: rt(
      p('Care homes launder linens constantly. We make **reusable underpads, adult bibs, patient gowns, fitted and flat sheets, blankets, towels and washcloths** sized and constructed for long-term care.'),
    ),
    faqs: [
      { question: 'Do reusable underpads save money compared with disposables?', answer: 'For many facilities they do, because each pad is laundered and reused many times. The saving depends on your laundry costs and usage — we can help you compare.' },
    ],
  },
  {
    slug: 'janitorial-cleaning',
    name: 'Cleaning & Janitorial Companies',
    heading: 'Wholesale Cleaning Cloths & Janitorial Towels',
    summary: 'Microfiber cloths, huck towels, terry wipers and wiping rags in bulk for commercial cleaning companies and janitorial distributors.',
    buyers: 'Commercial cleaning companies, janitorial suppliers, facility managers, maid services',
    categories: ['industrial-wiping-cleaning'],
    needs: [
      { title: 'Color-coded cleaning', text: 'Separate colors for restrooms, kitchens, glass and general areas.' },
      { title: 'Low-lint glass cleaning', text: 'Huck and microfiber cloths that leave windows and mirrors streak-free.' },
      { title: 'Bulk, repeatable supply', text: 'Bundled and cartoned for crews or resale.' },
    ],
    intro: rt(
      p('Cleaning teams need the right cloth for each job. We produce **microfiber cleaning cloths, huck towels, terry wiping towels, cotton cleaning rags and wiping rag bales** in color-coded sets and bulk packs.'),
    ),
    faqs: [
      { question: 'Can you supply color-coded microfiber sets?', answer: 'Yes. We can produce microfiber in your color system and pack mixed or single-color bundles.' },
    ],
  },
  {
    slug: 'commercial-laundries',
    name: 'Linen Services & Commercial Laundries',
    heading: 'Wholesale Textiles for Linen Rental & Commercial Laundries',
    summary: 'Durable towels, table linens, bar mops, shop towels, sheets and uniforms for linen rental companies and industrial laundries.',
    buyers: 'Linen rental companies, uniform services, industrial and healthcare laundries',
    categories: ['industrial-wiping-cleaning', 'kitchen-foodservice-towels', 'hotel-bath-spa', 'restaurant-table-linens'],
    needs: [
      { title: 'Long wash life', text: 'Constructions, hems and blends chosen to survive repeated industrial cycles.' },
      { title: 'Consistent replacement stock', text: 'The same spec every reorder so circulating inventory matches.' },
      { title: 'Rental-ready packing', text: 'Packed by dozen or by route for easy intake.' },
    ],
    intro: rt(
      p('Linen and uniform services live on wash life. We produce **shop towels, bar mops, napkins, tablecloths, bath towels, sheets and uniforms** to rental-grade specifications so your inventory lasts more cycles.'),
    ),
    faqs: [
      { question: 'Can you match our existing rental inventory?', answer: 'Yes — send samples or specs and we will match size, weight, color and construction so new stock blends with what is in circulation.' },
    ],
  },
  {
    slug: 'automotive-industrial',
    name: 'Auto Shops, Factories & Industrial',
    heading: 'Wholesale Shop Towels & Industrial Wiping Rags',
    summary: 'Red and blue shop towels, wiping rags, rag bales, coveralls and workwear for auto repair shops, factories, oil & gas and warehouses.',
    buyers: 'Auto repair & body shops, manufacturers, machine shops, oil & gas, warehouses',
    categories: ['industrial-wiping-cleaning', 'technical-industrial-fabrics', 'apparel-uniforms-workwear'],
    extraProducts: ['workwear-uniforms', 'thermal-shirts'],
    needs: [
      { title: 'Oil and grease absorbency', text: 'Heavy cotton shop towels and terry wipers that soak up fast.' },
      { title: 'Low cost per wipe', text: 'Rag bales and reclaimed wipers for single-use jobs.' },
      { title: 'Workwear', text: 'Durable uniforms and thermals for crews.' },
    ],
    intro: rt(
      p('Workshops and plants use wiping cloths by the bale. We make **shop towels, industrial wiping cloths, terry wipers, rag bales, filter cloth, workwear and thermal shirts** for industrial users and distributors.'),
    ),
    faqs: [
      { question: 'What size are standard shop towels?', answer: 'Around 14" x 14" to 15" x 15" is typical, but we can produce any size and weight you specify.' },
    ],
  },
  {
    slug: 'spas-salons-fitness',
    name: 'Spas, Salons & Gyms',
    heading: 'Wholesale Salon Towels, Spa Linens & Gym Towels',
    summary: 'Bleach-resistant salon towels, spa towels, robes, treatment linens and gym towels for salons, barbershops, spas and fitness clubs.',
    buyers: 'Hair salons, barbershops, day spas, massage studios, gyms, fitness clubs',
    categories: ['hotel-bath-spa', 'apparel-uniforms-workwear'],
    extraProducts: ['salon-towels', 'spa-towels', 'bathrobes-spa-wraps', 'hand-towels'],
    needs: [
      { title: 'Stain and bleach resistance', text: 'Dark or bleach-safe salon towels that stay presentable.' },
      { title: 'Quick-dry gym towels', text: 'Lighter weights that dry quickly between uses.' },
      { title: 'Branded robes and wraps', text: 'Spa robes and wraps with your logo.' },
    ],
    intro: rt(
      p('Salons and spas wash towels many times a day. We produce **salon towels, hand towels, spa towels, robes and wraps** in colors and weights that keep looking good — plus uniforms for your team.'),
    ),
    faqs: [
      { question: 'Do you make black salon towels?', answer: 'Yes. Black and dark colors are popular for salons because they hide color stains. Bleach-resistant dyeing is available on request.' },
    ],
  },
  {
    slug: 'catering-events',
    name: 'Catering & Event Rentals',
    heading: 'Wholesale Table Linens for Caterers & Event Rentals',
    summary: 'Banquet tablecloths, napkins, runners, placemats and aprons for caterers, banquet halls, wedding venues and party rental companies.',
    buyers: 'Caterers, banquet halls, wedding venues, party & event rental companies',
    categories: ['restaurant-table-linens', 'home-decorative', 'apparel-uniforms-workwear'],
    needs: [
      { title: 'Full color ranges', text: 'Napkins and tablecloths in the colors your clients ask for.' },
      { title: 'Banquet sizes', text: 'Round and rectangular tablecloths sized for your tables and drop length.' },
      { title: 'Rental durability', text: 'Spun polyester that resists stains and wrinkles over many events.' },
    ],
    intro: rt(
      p('Event linens need to look perfect every time. We make **tablecloths, napkins, runners, placemats and server aprons** in the colors, sizes and fabrics your rental inventory needs.'),
    ),
    faqs: [
      { question: 'What tablecloth size fits a 60" round table?', answer: 'A 90" round gives a lap-length drop; a 120" round reaches the floor. Tell us table sizes and the look you want and we will size each linen.' },
    ],
  },
  {
    slug: 'vacation-rentals-property-managers',
    name: 'Vacation Rentals & Property Managers',
    heading: 'Wholesale Linens for Airbnb & Vacation Rentals',
    summary: 'Hotel-quality towels, sheets, pillowcases and duvet covers for short-term rental hosts, property managers and serviced apartments.',
    buyers: 'Airbnb / short-term rental hosts, property managers, serviced apartments, student housing',
    categories: ['hotel-bath-spa', 'home-decorative', 'kitchen-foodservice-towels'],
    needs: [
      { title: 'Hotel look at home', text: 'White towels and percale sheets that photograph well and earn good reviews.' },
      { title: 'Turnover-ready sets', text: 'Bed and bath sets packed per unit for fast changeovers.' },
      { title: 'Consistent across units', text: 'The same linens in every property you manage.' },
    ],
    intro: rt(
      p('Guests expect hotel-quality linens in short-term rentals. We make **bath towels, hand towels, washcloths, sheets, pillowcases, duvet covers and kitchen towels** — and can pack them as per-unit sets for property managers.'),
    ),
    faqs: [
      { question: 'Can you pack linens as sets for each rental unit?', answer: 'Yes. We can pack bed and bath sets per unit (for example 2 bath towels, 2 hand towels, 2 washcloths and a sheet set) to speed up turnovers.' },
    ],
  },
  {
    slug: 'schools-camps-dormitories',
    name: 'Schools, Camps & Dormitories',
    heading: 'Wholesale Bedding & Towels for Schools, Dorms and Camps',
    summary: 'Durable sheets, blankets, towels, kitchen textiles and uniforms for universities, boarding schools, summer camps and shelters.',
    buyers: 'Universities, boarding schools, summer camps, shelters, correctional & government facilities',
    categories: ['hotel-bath-spa', 'kitchen-foodservice-towels', 'apparel-uniforms-workwear'],
    extraProducts: ['hospital-blankets', 'laundry-bags-linen-collection-bags'],
    needs: [
      { title: 'Durable and budget-friendly', text: 'Practical weights and blends with a long service life.' },
      { title: 'Institutional sizes', text: 'Twin XL, bunk and cot sizes as required.' },
      { title: 'Large one-time orders', text: 'Volume production ahead of term or season start.' },
    ],
    intro: rt(
      p('Institutions buy in volume and need linens that last. We make **sheets, blankets, towels, laundry bags, kitchen towels and staff uniforms** sized for dorm, camp and institutional beds.'),
    ),
    faqs: [
      { question: 'Can you make Twin XL sheets for dorm beds?', answer: 'Yes — Twin XL and any other bed size you need. Send mattress dimensions and depth.' },
    ],
  },
  {
    slug: 'wholesale-distributors',
    name: 'Distributors & Private Label Brands',
    heading: 'Private Label Textile Manufacturing for Distributors & Brands',
    summary: 'Made-to-order textiles across every category, packed under your brand for janitorial, foodservice, hospitality and retail distributors.',
    buyers: 'Janitorial & foodservice distributors, uniform companies, Amazon & retail brands, importers',
    categories: [
      'industrial-wiping-cleaning',
      'kitchen-foodservice-towels',
      'restaurant-table-linens',
      'hotel-bath-spa',
      'healthcare-institutional',
      'apparel-uniforms-workwear',
      'home-decorative',
      'technical-industrial-fabrics',
    ],
    needs: [
      { title: 'Your brand, your packaging', text: 'Labels, inserts, polybags, cartons and barcodes to your requirements.' },
      { title: 'One supplier, many categories', text: 'Towels, linens, apparel and wiping products from one partner.' },
      { title: 'Repeatable programs', text: 'Same spec every reorder for consistent inventory.' },
    ],
    intro: rt(
      p('Distributors and brands use us to build their own lines. Tell us the product, spec and packaging and we will produce it under your label — from **shop towels and bar mops to hotel towels, napkins, scrubs and t-shirts**.'),
    ),
    faqs: [
      { question: 'Can you print barcodes and retail packaging?', answer: 'Yes. Send your artwork and barcode numbers and we will produce labels, inserts and carton marks to your requirements.' },
      { question: 'Do you sign NDAs?', answer: 'Yes, we are happy to sign an NDA before you share designs or specifications.' },
    ],
  },
]

/** Extra industry tags for products whose category alone doesn't capture who buys them. */
export const productIndustryExtras: Record<string, string[]> = {
  'bath-towels': ['healthcare-medical', 'senior-living-care-homes', 'schools-camps-dormitories', 'spas-salons-fitness'],
  'washcloths': ['healthcare-medical', 'senior-living-care-homes'],
  'hand-towels': ['spas-salons-fitness'],
  'salon-towels': ['spas-salons-fitness'],
  'spa-towels': ['spas-salons-fitness'],
  'bathrobes-spa-wraps': ['spas-salons-fitness'],
  'hospital-blankets': ['schools-camps-dormitories', 'senior-living-care-homes'],
  'laundry-bags-linen-collection-bags': ['commercial-laundries', 'schools-camps-dormitories', 'hotels-hospitality'],
  'workwear-uniforms': ['automotive-industrial'],
  'thermal-shirts': ['automotive-industrial'],
  'flat-bed-sheets': ['senior-living-care-homes', 'schools-camps-dormitories', 'vacation-rentals-property-managers'],
  'fitted-bed-sheets': ['senior-living-care-homes', 'schools-camps-dormitories', 'vacation-rentals-property-managers'],
}

const steps = [
  { title: 'Send your requirement', text: 'Product, size, fabric, weight, quantity, branding and delivery location — or a sample you want matched.' },
  { title: 'Get options and a quote', text: 'We confirm the specification and send a written quote with MOQ, price, lead time and shipping terms.' },
  { title: 'Approve samples', text: 'Review a pre-production sample or swatch before bulk production starts.' },
  { title: 'Production and inspection', text: 'Your order is produced to the approved sample and checked before packing.' },
  { title: 'Delivery to your door', text: 'Packed and labeled as agreed, shipped to your warehouse or locations.' },
]

export const homepage = {
  hero: {
    eyebrow: 'Wholesale textile manufacturer & supplier',
    heading: 'Wholesale textiles, made to your order.',
    text: 'Towels, linens, uniforms and cleaning cloths for hotels, restaurants, hospitals and cleaning businesses — produced to your size, fabric, branding and quantity, and delivered as agreed.',
    primaryCta: { label: 'Request a quote', url: '/quote' },
    secondaryCta: { label: 'Browse products', url: '/products' },
  },
  trustItems: [
    { text: 'Made to your specification' },
    { text: 'Bulk & repeat wholesale orders' },
    { text: 'Private label & custom branding' },
    { text: 'Samples before production' },
  ],
  categoriesSection: {
    eyebrow: 'What we make',
    heading: 'Wholesale textile categories',
    intro: 'Eight product families covering cleaning, kitchen, dining, hospitality, healthcare, uniforms and home textiles.',
  },
  productsSection: {
    eyebrow: 'Popular products',
    heading: 'Most requested by our buyers',
    intro: 'Every product is produced to order — choose a standard spec or send us your own.',
  },
  industriesSection: {
    eyebrow: 'Who we supply',
    heading: 'Textiles for every business that washes, wipes or serves',
    intro: 'If your business goes through towels, linens or uniforms, we can make them for you.',
  },
  whyUs: {
    eyebrow: 'Why Kazim Textiles',
    heading: 'A wholesale partner, not a catalog',
    items: [
      { title: 'Built to your spec', text: 'We don’t push stock. You tell us size, fabric, weight, color and packing — we produce exactly that.' },
      { title: 'One supplier, many categories', text: 'Cleaning cloths, kitchen towels, table linens, hotel towels, scrubs and uniforms from a single partner.' },
      { title: 'Your brand on it', text: 'Logo embroidery, woven labels, printed packaging and barcodes for distributors and private-label brands.' },
      { title: 'Samples first', text: 'Approve a sample before bulk production so there are no surprises on delivery.' },
      { title: 'Clear written quotes', text: 'MOQ, price, lead time and shipping terms in writing before you commit.' },
      { title: 'Repeat-order consistency', text: 'We keep your approved specification on file so every reorder matches.' },
    ],
  },
  process: {
    eyebrow: 'How it works',
    heading: 'From your requirement to your warehouse',
    intro: 'A simple, transparent process for first orders and repeat programs alike.',
    cta: { label: 'Start your quote', url: '/quote' },
    steps,
  },
  ctaBand: {
    eyebrow: 'Custom orders welcome',
    heading: 'Don’t see exactly what you need? We probably make it.',
    text: 'Send us a photo, a sample or a spec sheet. We’ll tell you what’s possible and quote it.',
    buttons: [
      { label: 'Request a quote', url: '/quote' },
      { label: 'Private label', url: '/private-label-manufacturing' },
    ],
  },
  faqs: [
    { question: 'What is your minimum order quantity (MOQ)?', answer: 'MOQ depends on the product, fabric and customization. Plain items usually have lower minimums than custom-dyed or logo products. We confirm the MOQ in every quote — just tell us the quantity you have in mind.' },
    { question: 'Can you make products to our exact specification?', answer: 'Yes — that is how we work. Send size, fabric, weight, color, branding and packing requirements, or a sample to match.' },
    { question: 'Do you offer samples?', answer: 'Yes. We can provide samples or pre-production samples for approval before bulk production. Sample terms are confirmed in your quote.' },
    { question: 'Can you put our logo or brand on products?', answer: 'Yes. We offer embroidery, printing, woven labels, private-label packaging and barcodes.' },
    { question: 'How long does production take?', answer: 'Lead time depends on product, quantity and customization, and is stated in your written quote along with shipping time.' },
    { question: 'Which industries do you supply?', answer: 'Hotels, restaurants, hospitals and care homes, cleaning companies, laundries, auto shops and factories, spas and gyms, caterers, vacation rentals, schools and distributors.' },
  ],
}

const contactCta = { eyebrow: 'Ready when you are', heading: 'Tell us what you need', intro: 'Send your requirement and we’ll reply with options and a written quote.', buttons: [{ label: 'Request a quote', url: '/quote' }, { label: 'Browse products', url: '/products' }] }

export const pages = [
  {
    title: 'About Kazim Textiles',
    slug: 'about',
    hero: { eyebrow: 'About us', intro: 'A wholesale textile supplier that makes products to each customer’s order — for hotels, restaurants, healthcare, cleaning and industrial buyers.' },
    layout: [
      {
        blockType: 'content',
        narrow: true,
        content: rt(
          h2('Made to order, not off the shelf'),
          p('Kazim Textiles is a wholesale textile business. Instead of selling whatever happens to be in stock, we produce towels, linens, uniforms and cleaning textiles to the specification each customer asks for — size, fabric, weight, color, branding and packing — and deliver them as agreed.'),
          p('Our customers include hotels and resorts, restaurants and caterers, hospitals and care homes, commercial cleaning companies, linen services, industrial users and distributors building their own private-label lines.'),
        ),
      },
      {
        blockType: 'cards',
        eyebrow: 'How we work',
        heading: 'What you can expect',
        cards: [
          { title: 'Clear specifications', text: 'We use the language purchasing teams use — GSM, weight per dozen, construction, case pack — so quotes are easy to compare.' },
          { title: 'Written quotations', text: 'MOQ, price, lead time and shipping terms confirmed in writing before you commit.' },
          { title: 'Samples before bulk', text: 'Approve a sample before production so the delivered order matches what you expected.' },
        ],
      },
      { blockType: 'cta', ...contactCta },
    ],
  },
  {
    title: 'Contact Us',
    slug: 'contact',
    hero: { eyebrow: 'Contact', intro: 'Questions about a product, a custom order or an existing quote? Get in touch.' },
    layout: [
      {
        blockType: 'content',
        narrow: true,
        content: rt(
          h2('The fastest way to a quote'),
          p('Use our [quote request form](/quote) — it tells us everything we need to come back with options and pricing. Include product, quantity, size, fabric, branding and delivery location if you know them.'),
          p('Our email, phone and WhatsApp details are shown at the top and bottom of every page.'),
        ),
      },
      { blockType: 'cta', ...contactCta },
    ],
  },
  {
    title: 'Private Label & Custom Textile Manufacturing',
    slug: 'private-label-manufacturing',
    hero: { eyebrow: 'Private label', intro: 'Your product, your brand, your packaging — made to order for distributors, uniform companies and retail brands.' },
    layout: [
      {
        blockType: 'checklist',
        eyebrow: 'What we can customize',
        heading: 'Build the product around your brand',
        intro: 'Customization options depend on the product and quantity; we confirm them in your quote.',
        items: [
          { text: 'Custom dimensions, fabric, weave and weight' },
          { text: 'Custom colors and stripe patterns' },
          { text: 'Logo embroidery and printing' },
          { text: 'Woven labels, care labels and hang tags' },
          { text: 'Retail multipacks, header cards and polybags' },
          { text: 'Barcodes, carton marks and shipping labels' },
        ],
      },
      { blockType: 'steps', eyebrow: 'Process', heading: 'How a private-label order works', intro: 'From brief to delivered product.', steps },
      {
        blockType: 'faq',
        heading: 'Private label FAQs',
        items: [
          { question: 'Is the MOQ higher for private label?', answer: 'Often yes, because custom labels, packaging and colors need minimum production runs. We confirm the exact MOQ in your quote.' },
          { question: 'Can you work from a competitor product or sample?', answer: 'Yes. Send a sample of a product you own and we will match the specification (without copying any brand or trademark).' },
        ],
      },
      { blockType: 'cta', ...contactCta },
    ],
  },
  {
    title: 'How We Work',
    slug: 'how-we-work',
    hero: { eyebrow: 'Our process', intro: 'How we take your requirement from first inquiry to delivered goods.' },
    layout: [
      { blockType: 'steps', eyebrow: 'Step by step', heading: 'From inquiry to delivery', intro: 'Every order follows the same transparent path.', steps },
      {
        blockType: 'cards',
        eyebrow: 'What to send us',
        heading: 'Information that speeds up your quote',
        cards: [
          { title: 'Product & use', text: 'What the product is and how it will be used (e.g. restaurant bar mops, hotel bath towels).' },
          { title: 'Specification', text: 'Size, fabric, GSM or weight per dozen, color, construction — or a sample to match.' },
          { title: 'Quantity & delivery', text: 'Order quantity, packing preference, delivery location and target date.' },
        ],
      },
      { blockType: 'cta', ...contactCta },
    ],
  },
  {
    title: 'Quality Assurance',
    slug: 'quality-assurance',
    hero: { eyebrow: 'Quality', intro: 'The checks we use to make sure your order matches the approved sample.' },
    layout: [
      {
        blockType: 'checklist',
        eyebrow: 'Quality steps',
        heading: 'What we check',
        intro: 'Specific tests and inspection levels can be agreed per order.',
        items: [
          { text: 'Pre-production sample approval' },
          { text: 'Fiber content and fabric construction' },
          { text: 'Dimensions and weight against tolerance' },
          { text: 'Stitching, hems and finishing' },
          { text: 'Color match and colorfastness' },
          { text: 'Labels, packing and carton marks' },
        ],
      },
      {
        blockType: 'content',
        narrow: true,
        content: rt(p('Need third-party testing or a specific standard? Tell us in your quote request and we will confirm what is available for your product.')),
      },
      { blockType: 'cta', ...contactCta },
    ],
  },
  {
    title: 'Shipping & Delivery',
    slug: 'shipping-and-delivery',
    hero: { eyebrow: 'Logistics', intro: 'How orders are packed, shipped and delivered.' },
    layout: [
      {
        blockType: 'checklist',
        eyebrow: 'Agreed in every quote',
        heading: 'Shipping terms, clearly stated',
        items: [
          { text: 'Shipping basis / Incoterms (e.g. FOB, CIF, DDP)' },
          { text: 'Carton size, weight and pallet configuration' },
          { text: 'Labeling and country-of-origin marking' },
          { text: 'Commercial invoice and packing list' },
          { text: 'Delivery address(es) and target date' },
        ],
      },
      {
        blockType: 'content',
        narrow: true,
        content: rt(p('Import duties and customs requirements depend on the product and destination. We recommend working with a licensed customs broker for classification and clearance.')),
      },
      { blockType: 'cta', ...contactCta },
    ],
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    hero: { intro: 'How we handle information submitted through this website.' },
    layout: [
      {
        blockType: 'content',
        narrow: true,
        content: rt(
          p('**Draft — review with your legal advisor before launch.**'),
          h2('Information we collect'),
          p('When you submit a quote request we collect the business contact details and order information you provide (name, company, email, phone, product requirements and delivery location).'),
          h2('How we use it'),
          p('We use this information only to respond to your inquiry, prepare quotations and manage our business relationship with you. We do not sell your information.'),
          h2('Analytics'),
          p('If analytics are enabled, we use them to understand how visitors use the site. Update this section to list the tools actually in use.'),
          h2('Contact'),
          p('Questions about privacy? Contact us using the details on this website.'),
        ),
      },
    ],
  },
  {
    title: 'Terms of Use',
    slug: 'terms',
    hero: { intro: 'Terms that apply to use of this website.' },
    layout: [
      {
        blockType: 'content',
        narrow: true,
        content: rt(
          p('**Draft — review with your legal advisor before launch.**'),
          h2('Product information'),
          p('Product images may be illustrative. Specifications, prices, minimum quantities, lead times and availability are confirmed only in a written quotation.'),
          h2('Quotations and orders'),
          p('Nothing on this website is a binding offer. Orders are subject to a written quotation and order confirmation, including payment, shipping and claims terms.'),
        ),
      },
    ],
  },
]

export const guides = [
  {
    title: 'How to Request a Wholesale Textile Quote',
    slug: 'how-to-request-a-textile-quote',
    excerpt: 'The checklist purchasing managers use to get accurate, comparable textile quotes — first time.',
    image: 'hero-textiles.webp',
    relatedProducts: ['shop-towels', 'bar-mop-towels', 'bath-towels'],
    content: rt(
      p('A vague request gets a vague quote. The more precise your request, the faster you get a price you can actually compare between suppliers.'),
      h2('1. Name the product and how it will be used'),
      p('“Towels” could mean a 16" x 19" bar mop or a 27" x 54" bath towel. Say what it is and where it will be used — for example “bar mop towels for a restaurant kitchen, laundered daily.”'),
      h2('2. Give the specification'),
      ul([
        '**Size** in inches or centimeters',
        '**Fiber** — 100% cotton, cotton/poly, polyester, microfiber',
        '**Weight** — GSM, or ounces/pounds per dozen (say which)',
        '**Construction** — terry, huck, plain weave, herringbone, twill',
        '**Color** — white, standard color, or a Pantone reference',
      ]),
      h2('3. State quantity and packing'),
      p('Give the order quantity and unit (pieces, dozens or pounds). Say how you want it packed — dozen bundles, retail multipacks, or 25 lb bales. A case pack is not the same as the MOQ.'),
      h2('4. Branding'),
      p('Logo embroidery, printing, woven labels, packaging and barcodes all affect price and minimums. Mention them up front.'),
      h2('5. Delivery'),
      p('Delivery city or ZIP, target date and preferred shipping terms (FOB, CIF, DDP) if you have them.'),
      p('Ready? [Send your quote request](/quote).'),
    ),
  },
  {
    title: 'Wholesale Towel Sizes, GSM & Weight Guide',
    slug: 'bulk-towel-specifications',
    excerpt: 'Typical commercial towel sizes, what GSM and weight per dozen mean, and how to specify towels for hotels, kitchens and cleaning.',
    image: 'towels-32.webp',
    relatedProducts: ['bath-towels', 'hand-towels', 'bar-mop-towels', 'huck-towels'],
    content: rt(
      p('Towel specifications use a few terms that are easy to mix up. Here is what they mean and the common sizes buyers ask for.'),
      h2('GSM vs. weight per dozen'),
      p('**GSM (grams per square meter)** describes how dense the fabric is, regardless of size. **Weight per dozen** (in ounces or pounds) is the total weight of 12 towels — so it depends on both density and size. Hotel towels are usually specified in GSM or lb/dozen; bar mops and shop towels usually in oz or lb per dozen.'),
      h2('Typical commercial towel sizes'),
      ul([
        '**Washcloth:** about 12" x 12" or 13" x 13"',
        '**Hand towel:** about 16" x 27" to 16" x 30"',
        '**Bath towel:** about 24" x 50" to 27" x 54"',
        '**Bath sheet / pool towel:** about 30" x 60" to 35" x 70"',
        '**Bar mop:** about 16" x 19"',
        '**Shop towel:** about 14" x 14" to 15" x 15"',
        '**Huck towel:** about 15" x 25" to 16" x 26"',
        '**Flour sack towel:** about 27" x 27" to 30" x 30"',
      ]),
      p('These are common reference sizes only — we can make any size you specify.'),
      h2('Choosing GSM for hotel towels'),
      p('Lighter towels (around 400–500 GSM) dry faster and cost less to launder; heavier towels (550–650+ GSM) feel more luxurious. Match the weight to your guest positioning and your laundry capacity.'),
      h3('Don’t forget packing'),
      p('Tell us units per bundle and per carton. A 12-piece bundle is a pack size, not a minimum order quantity.'),
    ),
  },
  {
    title: 'Bar Mops vs. Huck Towels vs. Flour Sack Towels: Which Do You Need?',
    slug: 'bar-mop-vs-huck-vs-flour-sack-towels',
    excerpt: 'Three workhorse towels, three different jobs. Here’s how restaurants, cleaners and laundries choose between them.',
    image: 'towels-21.webp',
    relatedProducts: ['bar-mop-towels', 'huck-towels', 'flour-sack-towels', 'kitchen-towels'],
    content: rt(
      h2('Bar mop towels'),
      p('Small, thick terry cloth towels, usually around 16" x 19". Highly absorbent, great for spills, counters and bar tops. Often have a colored center stripe. Specified by weight per dozen.'),
      h2('Huck towels'),
      p('A tightly woven, textured (“huckaback”) cotton towel that leaves very little lint. The go-to for glass, mirrors, stainless steel and janitorial work. Usually around 15" x 25" to 16" x 26"; blue is the common color.'),
      h2('Flour sack towels'),
      p('Large, lightweight plain-weave cotton towels. Ideal for food prep, drying glassware and dishes, covering dough and straining. They get softer with every wash.'),
      h2('Quick comparison'),
      ul([
        '**Spills and wiping:** bar mops',
        '**Streak-free glass and polishing:** huck towels',
        '**Food prep and drying:** flour sack towels',
      ]),
      p('Not sure which suits your operation? [Ask us](/quote) — we can send samples of each.'),
    ),
  },
  {
    title: 'Choosing Linens for Hotels and Vacation Rentals',
    slug: 'hotel-and-vacation-rental-linens',
    excerpt: 'Towel weights, sheet fabrics and par levels: a practical guide to buying linens for hotels and short-term rentals.',
    image: 'towels_alt-32.webp',
    relatedProducts: ['bath-towels', 'flat-bed-sheets', 'pillowcases', 'duvet-covers'],
    content: rt(
      h2('Start with par levels'),
      p('“Par” is how many sets you need per bed. Many hotels work on 3 to 5 par: one set in the room, one in the laundry, one on the shelf, plus spares. Vacation rental hosts often keep at least 2 to 3 sets per bed.'),
      h2('Towels'),
      p('White towels are the hospitality standard because they can be bleached and look clean. Choose GSM based on your positioning and drying capacity. A dobby border or woven logo adds a finished look.'),
      h2('Sheets'),
      p('Poly-cotton percale blends are popular with hotels because they wrinkle less and last longer in commercial laundry. 100% cotton feels crisp and breathable but needs more care.'),
      h2('Keep it consistent'),
      p('Use the same specification in every room and every property so linens can be swapped freely. We keep your approved spec on file for reorders.'),
    ),
  },
]

/** Buyer-facing rewrites of catalog descriptions that carried supplier/catalog wording. */
export const descriptionOverrides: Record<string, string> = {
  'reclaimed-wiping-rags': 'Sorted reclaimed textile wiping rags in bulk bales — an economical choice for single-use industrial wiping.',
  'solid-color-napkins': 'Solid-color restaurant napkins in cotton, poly-cotton or spun polyester, made in your colors and sizes.',
  'bistro-stripe-napkins': 'Classic bistro-stripe cotton napkins for casual dining and bars, in your choice of stripe colors.',
  'bath-towels': 'Hotel-grade cotton bath towels for hospitality and institutional use, made to your size and GSM.',
  'pool-towels': 'Cabana-stripe and solid pool towels for hotels, resorts, gyms and clubs, in your colors.',
  'medical-scrub-sets': 'Scrub tops and pants for hospitals and clinics, in your fabric, colors and size breakdown.',
  'patient-gowns': 'Reusable patient gowns with tie or snap closures, made to your facility’s style and print.',
  'hospital-blankets': 'Durable, launderable blankets for hospitals, care homes and institutional bedding programs.',
  'chef-shirts': 'Lightweight chef shirts for kitchen and foodservice staff, in your fabric, colors and branding.',
  'bib-aprons': 'Full-coverage bib aprons for chefs, servers and catering staff, with optional pockets and logo embroidery.',
  'woven-cotton-fabric-rolls': 'Woven cotton fabric rolls for converters and industrial use, produced to your construction and finish.',
}
