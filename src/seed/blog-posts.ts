/**
 * Blog post copy, exactly as approved. Links were added to existing pages; wording is unchanged.
 * Applied by add-blog-posts.ts.
 */
import { h2, h3, ol, p, quote, rt, table, ul } from './richtext'

export type BlogPostSeed = {
  slug: string
  title: string
  excerpt: string
  tag: string
  readTime: string
  metaTitle: string
  metaDescription: string
  image: { file: string; filename: string; alt: string; caption: string }
  relatedProducts: string[]
  content: ReturnType<typeof rt>
}

export const blogPosts: BlogPostSeed[] = [
  {
    slug: 'wash-microfiber-towels',
    title: 'How to Wash Microfiber Towels Without Damaging Them',
    excerpt: 'A practical microfiber towel care guide covering sorting, detergent, washing, drying and storage for commercial cleaning teams.',
    tag: 'Microfiber Care',
    readTime: '7 min read',
    metaTitle: 'How to Wash Microfiber Towels Without Damaging Them',
    metaDescription: 'Learn how to wash microfiber towels, choose detergent, avoid fabric softener and dry cleaning cloths without excess heat.',
    image: {
      file: 'wash-microfiber-towels.webp',
      filename: 'wash-microfiber-towels.webp',
      alt: 'Folded microfiber cleaning towels beside a washing machine.',
      caption: 'Follow the care label when washing and drying microfiber towels.',
    },
    relatedProducts: ['microfiber-cleaning-cloths', 'terry-wiping-towels', 'cotton-wiping-rags'],
    content: rt(
      p('Wash microfiber towels separately from cotton and other lint-shedding fabrics, using a suitable detergent without fabric softener. Follow the care label for the wash cycle and temperature, rinse thoroughly, and air-dry or tumble-dry on low heat when permitted.'),
      p('For commercial cleaning teams, the process also needs to keep cloths from different jobs organized. A towel used on greasy equipment should stay separate from cloths prepared for glass or light dusting.'),
      p('This guide explains how to wash microfiber towels and build a repeatable care routine for your team.'),

      h2('Microfiber Towel Care at a Glance'),
      table([
        ['Care step', 'General guidance'],
        ['Sorting', 'Keep microfiber separate from cotton; sort by task and soil level.'],
        ['Detergent', 'Choose a suitable formula without fabric softener; measure the dose.'],
        ['Water temperature', 'Use the setting permitted by the cloth manufacturer.'],
        ['Rinsing', 'Remove detergent residue; add a rinse if needed.'],
        ['Drying', 'Air-dry or use an approved low-heat setting without dryer sheets.'],
        ['Storage', 'Put fully dry, inspected cloths in a clean storage area.'],
      ]),
      p('Treat this as a general checklist. Product-specific instructions take priority, especially for commercial laundering systems.'),

      h2('How to Wash Microfiber Towels Step by Step'),
      h3('Sort Cloths Before Loading the Washer'),
      p('Keep microfiber away from cotton towels and other fabrics that shed lint. Microfiber can collect those loose fibers during washing. Separate light and dark colors where dye transfer is a concern, particularly with new cloths.'),
      p('Also separate lightly soiled cloths from those used for heavy cleaning. For example, keep glass-cleaning cloths apart from towels carrying grease or polishing residue.'),
      p('Remove loose debris before washing and check the manufacturer’s pretreatment instructions for stubborn soil.'),
      h3('Choose the Right Detergent and Dose'),
      p('A fragrance-free liquid laundry detergent without softening additives is a practical option for many general-use microfiber cloths. A compatible microfiber detergent may be useful for particular cleaning-product residues. Check the cloth and detergent instructions before choosing.'),
      p('Measure the dose for the product and load. Adding extra detergent can leave residue rather than improve cleaning. There is no single spoonful measurement that suits every machine, detergent concentration and commercial load.'),
      p('Skip fabric softener, including detergent with built-in softener. Its coating can interfere with the cloth’s cleaning performance.'),
      h3('Select the Approved Temperature and Cycle'),
      p('For many general-purpose cloths, cool water suits light soil, while warm water may be appropriate for heavier cleaning when the label allows it. A gentle cycle is commonly recommended for household laundering, but commercial products can have different requirements.'),
      p('Use the manufacturer’s approved settings rather than treating one temperature as safe for every microfiber towel.'),
      p('Commercial laundry programs may specify different temperatures, chemicals and cycle stages. Confirm those requirements for the actual product.'),
      h3('Rinse Out Remaining Detergent'),
      p('If detergent remains after washing, an additional rinse can help remove it. Check the dose if towels repeatedly feel coated or leave streaks.'),
      p('If fabric softener was used by mistake, rewash using the cloth manufacturer’s instructions. Adding more softener can further interfere with performance.'),
      h3('Dry and Inspect Before Reuse'),
      p('Air-dry the cloths with space for air circulation, or use a low-heat or no-heat dryer setting if the care label permits it.'),
      p('Keep them separate from cotton during drying, clean the lint filter and leave out dryer sheets. Avoid unapproved high heat.'),
      p('Before reuse, inspect each towel for embedded grit, lint or damaged areas. A clean-looking cloth can still contain particles that make it unsuitable for a delicate surface.'),
      p('Store fully dry towels in clean, covered containers or cupboards, organized by their intended task.'),

      h2('Can You Wash Microfiber Cloths by Hand'),
      p('Hand washing can suit a small number of lightly soiled cloths when their care instructions allow it.'),
      ol([
        'Put the cloths in a clean basin with cool or warm water permitted by the label.',
        'Add a suitable detergent if needed and gently work the soil loose.',
        'Rinse with clean water until detergent and loosened dirt have been removed.',
        'Squeeze out excess water gently and hang the cloths to dry.',
      ]),
      p('Cloths carrying heavy grease or specialist cleaning residues may need a different approved process.'),

      h2('Fix Common Microfiber Washing Problems'),
      table([
        ['Problem', 'What to check and do'],
        ['Towels feel stiff or leave streaks', 'Check detergent dose and softener exposure; rewash using a compatible process and rinse thoroughly.'],
        ['Cloths contain cotton lint', 'Remove visible lint and rewash separately. Inspect carefully before using them on delicate surfaces.'],
        ['Towels still smell after washing', 'Review soil removal, the washing process and drying. Avoid returning them to use while the problem remains.'],
        ['Fibers feel hard or appear damaged', 'Review heat exposure and inspect the fibers. Rewashing may not reverse damage.'],
      ]),
      p('Residue and physical damage need different responses. A compatible wash may improve a towel affected by buildup, but it cannot guarantee that a damaged or contaminated cloth is suitable for its original task.'),

      h2('Bleach and Commercial Laundry Requirements'),
      p('Do not assume every microfiber cloth is bleach-safe.'),
      p('Some manufacturers prohibit chlorine bleach. Certain commercial microfiber systems have approved procedures that include it. The correct approach depends on the specific product and laundry program.'),
      p('For professional cleaning operations, obtain written instructions covering temperature limits, detergent, bleach compatibility and drying.'),
      p('Where a facility has a required hygiene process, confirm that the cloth is suitable for that process before purchasing it. A routine care guide cannot establish that compatibility.'),

      h2('Set Up a Consistent Routine for Your Cleaning Team'),
      p('For [cleaning and janitorial companies](/industries/janitorial-cleaning), we recommend keeping a simple care record for each cloth specification:'),
      ol([
        'Record the approved wash and drying instructions.',
        'Define which cloth colors or labels belong to each task.',
        'Keep used cloths separate from clean stock.',
        'Assign someone to check towels after laundering.',
        'Remove unsuitable cloths from their assigned task and record recurring problems.',
      ]),
      p('For example, a team could reserve one clearly labeled group for glass and another for general cleaning. The colors are a business choice; use a written system that staff can follow consistently.'),
      p('When comparing [industrial wiping and cleaning textiles](/categories/industrial-wiping-cleaning), include laundering requirements alongside size, material and quantity. This helps you evaluate how a proposed cloth will fit your existing operation.'),

      h2('Frequently Asked Questions'),
      h3('Can You Put Microfiber Towels in the Washing Machine'),
      p('Yes, if the care instructions permit machine washing. Keep them separate from lint-shedding fabrics and use the approved detergent, temperature and cycle.'),
      h3('Can You Use Regular Laundry Detergent'),
      p('A fragrance-free liquid detergent without fabric softener can suit general cleaning cloths. Use a compatible specialist detergent for residues when required.'),
      h3('Can Microfiber Towels Go in the Dryer'),
      p('Tumble-dry on low heat or no heat when the label permits. Leave out dryer sheets, dry separately from cotton, or choose air drying.'),
      h3('Should You Wash New Microfiber Towels Before Use'),
      p('Many suppliers recommend washing before first use to remove loose manufacturing fibers or residual dye. Follow the instructions supplied with your cloths and separate colors where required.'),
      h3('How Often Should You Wash Microfiber Towels'),
      p('Wash after use, especially when cloths have collected dirt, grease or cleaning-product residue. Replace a soiled towel with a clean one during work rather than carrying the collected material to another surface.'),

      h2('Request Microfiber Cloths for Your Cleaning Operation'),
      p('Kazim Textiles sources [microfiber cleaning cloths](/products/microfiber-cleaning-cloths) through manufacturing partners for janitorial, housekeeping and detailing applications. Blend, dimensions, GSM, colors and packing are confirmed with the quotation.'),
      p('Share your intended use, preferred size, quantity, color requirements and delivery ZIP code through the [wholesale quote request form](/quote?product=microfiber-cleaning-cloths). Include your laundry requirements so compatibility can be reviewed before you approve the specification.'),
    ),
  },

  {
    slug: 'tablecloth-size-guide',
    title: 'Tablecloth Size Guide: How to Choose the Right Size',
    excerpt: 'Learn how to measure tables, calculate side and end drops, and specify finished tablecloth sizes for restaurant and event orders.',
    tag: 'Tablecloth Sizing',
    readTime: '7 min read',
    metaTitle: 'Tablecloth Size Guide: How to Choose the Right Size',
    metaDescription: 'Find the right fit with this tablecloth size guide, including a size chart, measuring formulas and drop calculations.',
    image: {
      file: 'tablecloth-size-guide.webp',
      filename: 'tablecloth-size-guide.webp',
      alt: 'White tablecloth draped over a rectangular table with a measuring tape on top.',
      caption: 'Measure your table and choose the drop before ordering.',
    },
    relatedProducts: ['restaurant-tablecloths', 'solid-color-napkins', 'bistro-stripe-napkins'],
    content: rt(
      p('To choose a tablecloth size, add twice your desired drop to the table dimensions. For rectangular and square tables, calculate the width and length separately. For round tables, add twice the drop to the tabletop diameter.'),
      p('For example, a table measuring 30 × 72 inches needs a 60 × 102-inch finished tablecloth for a 15-inch drop on each side and end. This tablecloth size guide explains how to measure, check the fit and prepare a clear specification for restaurant, hotel and event linen orders.'),

      h2('What Is a Tablecloth Drop?'),
      p('The drop is the fabric that hangs below the tabletop edge. Measure it straight down from the edge. On rectangular cloths, check the middle of a side or end rather than a corner.'),
      p('For everyday seated dining, a 6–12-inch drop is a common starting point. A 15-inch drop gives a longer look. For a floor-length setting, measure the actual table height and decide how much clearance you want above the floor. These are styling choices, rather than one required size for every business.'),
      p('Before deciding, place a chair at the table and check the proposed length with someone seated. For event layouts, also check how the cloth fits around table legs and corners.'),

      h2('Measure Your Table Before Choosing a Cloth'),
      ol([
        '**Identify the shape.** Record whether the tabletop is rectangular, square, round or oval.',
        '**Measure the top.** Record width and length for rectangular or square tables. For round tables, measure the diameter through the center.',
        '**Measure the height.** This matters when the cloth should reach near the floor.',
        '**Include extensions.** Measure the table with leaves or extensions in the position used for service.',
        '**Use one unit.** Keep the entire calculation in inches or centimeters.',
      ]),
      p('A “6-foot table” describes its length, rather than every dimension. Six feet equals 72 inches, but you should still measure the width and height.'),
      p('For joined tables, measure the complete arrangement that the linen must cover.'),

      h2('Calculate the Size for Your Table Shape'),
      h3('Rectangular Tables'),
      p('Use these formulas:'),
      ul(['Tablecloth width = table width + (2 × side drop)', 'Tablecloth length = table length + (2 × end drop)']),
      p('For a 30 × 72-inch table with a 15-inch drop all around:'),
      ul(['Width: 30 + (2 × 15) = 60 inches', 'Length: 72 + (2 × 15) = 102 inches']),
      p('The calculated finished size is 60 × 102 inches. Side and end drops can also be different if that is the fit you want. This follows the standard method of adding the required overhang to both sides of each table dimension.'),
      h3('Round Tables'),
      p('Tablecloth diameter = table diameter + (2 × desired drop)'),
      p('A 60-inch round table with a 15-inch drop needs a 90-inch round tablecloth:'),
      p('60 + (2 × 15) = 90 inches'),
      p('If that table is 30 inches high, a 120-inch round cloth gives a calculated 30-inch drop. Check actual floor clearance before approving the size.'),
      h3('Square Tables'),
      p('For a square table and an even drop, add twice the drop to one side measurement.'),
      p('A 36 × 36-inch table with a 12-inch drop needs a 60 × 60-inch finished cloth.'),

      h2('Tablecloth Size Chart'),
      p('All measurements below are in inches. The drops assume a centered cloth and the stated finished dimensions.'),
      p('These are sizing examples, rather than a list of sizes held in stock.'),
      table([
        ['Tabletop measurements', 'Finished cloth size', 'Calculated drop'],
        ['Square: 36 × 36', '54 × 54', '9 on each side'],
        ['Round: 48-inch diameter', '72-inch diameter', '12 all around'],
        ['Round: 60-inch diameter', '90-inch diameter', '15 all around'],
        ['Round: 60-inch diameter', '120-inch diameter', '30 all around'],
        ['Round: 72-inch diameter', '132-inch diameter', '30 all around'],
        ['Rectangle: 30 × 72', '52 × 96', '11 on sides; 12 at ends'],
        ['Rectangle: 30 × 72', '60 × 102', '15 on sides and ends'],
        ['Rectangle: 30 × 72', '90 × 132', '30 on sides and ends'],
        ['Rectangle: 30 × 96', '60 × 126', '15 on sides and ends'],
        ['Rectangle: 30 × 96', '90 × 156', '30 on sides and ends'],
      ]),
      p('A 30-inch edge drop reaches floor level only when the tabletop is 30 inches high. Rectangular corners can hang lower than the straight edges, so confirm the corner treatment and try the cloth on the actual table when a precise floor-length fit is needed.'),
      p('If a supplier offers a nearby size, calculate the actual drop before choosing it.'),
      p('For example, a 60 × 108-inch cloth on a 30 × 72-inch table gives:'),
      ul(['15 inches at the sides', '18 inches at the ends']),
      p('It does not give the same drop all around.'),

      h2('Check Finished Size and Laundry Requirements'),
      p('The finished size is the dimension of the completed tablecloth after hemming. A fabric cutting measurement can be different. Ask the supplier which measurement appears on the quotation. Supplier sizing references also distinguish between cut and finished measurements.'),
      p('Laundering may change the fit depending on the material, finishing and wash process. Do not apply one assumed shrinkage percentage to every fabric. Confirm the care instructions, expected dimensional change and finished-size tolerance with the supplier.'),
      p('For a repeat-order program, keep a written record of the approved dimensions, fabric, color and care requirements. Where practical, assess a sample on your table and after the intended laundry process before approving a larger order.'),

      h2('Prepare a Clear Specification for a Bulk Order'),
      p('[Restaurants](/industries/restaurants-foodservice) and [catering and event businesses](/industries/catering-events) may use several table shapes. List each requirement separately so the supplier can review the sizes and quantities accurately.'),
      p('Include:'),
      ul([
        'Table shape, width and length or diameter; add height for a near-floor fit.',
        'Desired side and end drops, or one all-around drop for a round table.',
        'Required finished cloth size and any tolerance requirements.',
        'Fabric preference, color and intended use.',
        'Quantity for each size and any packing requirements.',
        'Laundry requirements, delivery ZIP code and required date.',
      ]),
      p('For example:'),
      quote('Please quote 100 white tablecloths with a finished size of 60 × 102 inches for our 30 × 72-inch tables. We want a 15-inch drop. Please confirm fabric options, size tolerance, care instructions and lead time.'),
      p('You can review the [Restaurant & Table Linens](/categories/restaurant-table-linens) range when planning matching napkins and tablecloths.'),

      h2('Frequently Asked Questions'),
      h3('What size tablecloth fits a 6-foot table?'),
      p('For a 30 × 72-inch table, a 60 × 102-inch cloth gives a 15-inch drop on each side and end.'),
      p('A 90 × 132-inch cloth gives a 30-inch edge drop. Measure the table height and check corners for a floor-length fit.'),
      h3('What size tablecloth fits an 8-foot table?'),
      p('For a 30 × 96-inch table, a 60 × 126-inch cloth gives a 15-inch drop.'),
      p('A 90 × 156-inch cloth gives a 30-inch edge drop. An 8-foot length alone does not confirm the table width or height.'),
      h3('What size tablecloth fits a 60-inch round table?'),
      p('A 90-inch round cloth gives a 15-inch drop. A 120-inch round cloth gives a 30-inch drop.'),
      p('Choose the drop after checking table height and the finish you want.'),
      h3('Does every rectangular tablecloth hang evenly on all sides?'),
      p('No. Calculate each drop separately:'),
      ul(['Side drop = (cloth width − table width) ÷ 2', 'End drop = (cloth length − table length) ÷ 2']),
      p('Both results must match if you want an even edge drop.'),

      h2('Request Tablecloths to Your Required Dimensions'),
      p('Kazim Textiles sources [restaurant tablecloths](/products/restaurant-tablecloths) to buyer requirements. Square and rectangular options are listed; round sizes are subject to supplier quotation. Fabric, color availability, minimum order quantities and lead times are confirmed with the quotation.'),
      p('Share your table measurements, preferred drop, material, quantities and delivery location through the [wholesale quote request form](/quote?product=restaurant-tablecloths). The required finished dimensions can then be reviewed with the manufacturing partners before the order is agreed.'),
    ),
  },
]
