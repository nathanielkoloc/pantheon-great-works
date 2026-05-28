/* Great Works Studio — The Pantheon
   Project data. Each entry feeds a magazine-cover tile + a detail modal.
   `categories` is an array of category IDs (a project can carry multiple tags).
   `category` is preserved for legacy fields — kept in sync with categories[0].
*/

window.GW_STYLE_PREAMBLE =
  "Editorial cover illustration in the style of 1940s Fortune Magazine and golden-age comics. Painterly gouache, flat planes of saturated color, dramatic chiaroscuro, subtle grain. Limited palette of ink black, cream parchment, oxblood red, lapis blue, and bullion gold. Composition is symbolic, monumental, slightly surreal — closer to Cassandre and Lurçat than realism. Strong geometry, low horizon, single shaft of light. No text, no logos, no captions. Square format, 4:5 portrait variant.";

window.GW_CATEGORIES = {
  arcane: {
    id: "arcane",
    label: "Arcane Inquiries",
    glyph: "▲",
    color: "var(--purple)",
    blurb: "Funding the illegible — work that the market refuses to recognize.",
  },
  garden: {
    id: "garden",
    label: "Garden Empire",
    glyph: "◆",
    color: "var(--green)",
    blurb: "Continental-scale acts of restoration, eradication, and rewilding.",
  },
  monumental: {
    id: "monumental",
    label: "Monumental Works",
    glyph: "●",
    color: "var(--red)",
    blurb: "Civic objects on the scale of cathedrals, canals, and coastlines.",
  },
  commissioned: {
    id: "commissioned",
    label: "Commissioned Ventures",
    glyph: "◈",
    color: "var(--blue)",
    blurb: "Bespoke institutions and companies, commissioned to answer a single brief.",
  },
  union: {
    id: "union",
    label: "A More Perfect Union",
    glyph: "★",
    color: "var(--indigo)",
    blurb: "Civic re-architecture for the American experiment in its third century.",
  },
  defense: {
    id: "defense",
    label: "Civilizational Defense",
    glyph: "◤",
    color: "var(--bronze)",
    blurb: "Hardening the foundations beneath the things worth keeping.",
  },
};

// Time-horizon bands used by the filter. Each project carries a `years` value
// (2 | 5 | 10 | 25). Retained on the project record for now even though the
// horizon filter UI has been removed.
window.GW_HORIZONS = [
  { id: 2,  label: "2 years",  glyph: "✓" },
  { id: 5,  label: "5 years",  glyph: "◐" },
  { id: 10, label: "10 years", glyph: "◑" },
  { id: 25, label: "25 years", glyph: "●" },
];

window.GW_PROJECTS = [
  // ── Garden Empire ────────────────────────────────────────────────────
  {
    id: "ticks",
    no: "GW—01",
    categories: ["garden"],
    title: "Eradicate Ticks from the United States",
    pitch: "A coordinated continental-scale extirpation of Ixodes scapularis.",
    budget: "$80M",
    timeline: "8 years",
    years: 10,
    scoping: "$500,000",
    horizon: "Decade",
    lead: "Vector biologist — TBD",
    locale: "Continental USA",
    body: [
      "Lyme disease and its co-infections disable hundreds of thousands of Americans every year, with cases doubling each decade. The blacklegged tick that carries them is geographically tractable: its life cycle is small, its host range narrow, its genome sequenced.",
      "Combining oral mouse-vaccine baits, targeted gene drive on a contained Atlantic island as proof-of-concept, and a multi-state federal coordinating compact, we believe Ixodes scapularis can be extirpated from the continental United States within a decade. The biology is not the bottleneck. The bottleneck is patron, charter, and political cover.",
      "Phase I delivers the scientific advisory board, the legal framework for the island trial, and the federal-state compact draft.",
    ],
    imagePrompt:
      "A topographic relief map of the eastern United States rendered as a textured tapestry, with a thinning cloud of small dark insects dissolving above it into points of light. Symbolic, painterly, 1940s Fortune cover style.",
    accent: "green",
  },
  {
    id: "chestnut",
    no: "GW—02",
    categories: ["garden"],
    title: "The American Chestnut Restoration",
    pitch: "Return the lost canopy giant to three million acres of Appalachia.",
    budget: "$30M",
    timeline: "25 years",
    years: 25,
    scoping: "$300,000",
    horizon: "Generational",
    lead: "American Chestnut Foundation alliance",
    locale: "Appalachian range",
    body: [
      "Before the blight, one in every four trees east of the Mississippi was an American chestnut — a single species responsible for the architecture, economy, and ecology of a third of the continent. The blight took it in forty years. The blight-resistant transgenic Darling-58 is real, federally deregulated, and waiting.",
      "The remaining bottlenecks are land, labor, and patience. We propose a private trust to plant six million chestnuts across the spine of the Appalachians over a quarter-century, in partnership with the American Chestnut Foundation, the Forest Service, and state land trusts.",
      "Phase I assembles the trust, the land pipeline, and the first hundred-acre demonstration plantings.",
    ],
    imagePrompt:
      "A single colossal American chestnut tree in full leaf, rising over Appalachian ridgelines at golden hour. Below, a small figure for scale. Painterly, romantic, autumnal palette, 1940s Fortune cover style.",
    accent: "green",
  },
  {
    id: "wolf-corridor",
    no: "GW—03",
    categories: ["garden"],
    title: "The Wolf Corridor",
    pitch: "An unbroken eight-hundred-mile wild migration path from Maine to the Smokies.",
    budget: "$45M",
    timeline: "15 years",
    years: 25,
    scoping: "$400,000",
    horizon: "Generational",
    lead: "Conservation biologist + land trust principal",
    locale: "Eastern seaboard",
    body: [
      "Top predators set the shape of an ecosystem. The American East has not had one at continental scale since the eastern timber wolf was extirpated in the nineteenth century. The result is a forest that has forgotten how to behave like a forest.",
      "We propose to assemble — through purchase, easement, and federal partnership — an unbroken corridor of forest reaching from Acadia National Park to Great Smoky Mountains National Park, with sufficient width and connectivity to support the natural reintroduction of the eastern wolf.",
      "Phase I produces the corridor map, the parcel acquisition strategy, and the political and tribal partnerships required to thread it.",
    ],
    imagePrompt:
      "A lone wolf on a high ridge silhouetted against a streaked dusk sky in deep blues and oxblood reds. Far below, a forest stretches to a low horizon. Painterly, slightly heroic, 1940s Fortune cover style.",
    accent: "green",
  },
  {
    id: "lightning-bugs",
    no: "GW—04",
    categories: ["garden"],
    title: "Repopulate the Lightning Bugs",
    pitch: "Restore the vanished summer firefly to the eastern half of the continent.",
    budget: "$22M",
    timeline: "10 years",
    years: 10,
    scoping: "$250,000",
    horizon: "Decade",
    lead: "Entomologist + land-use coalition — TBD",
    locale: "Eastern USA",
    body: [
      "Anyone over forty remembers a backyard that flickered. Habitat loss, pesticide drift, and light pollution have collapsed firefly populations across most of the country in a single generation. The species is recoverable; the habits that doom it are reversible at the level of policy, lighting ordinance, and lawn care.",
      "We propose a continental restoration program: dark-sky agreements with a thousand municipalities, larval-habitat trusts on private land, and a long-running citizen science census tied to a federal monitoring partner.",
      "Phase I produces the coalition, the monitoring protocol, and the first ten anchor municipalities.",
    ],
    imagePrompt:
      "A dusk meadow at the edge of trees, with countless small golden points of light hovering above tall grass. A child's silhouette stands at the threshold. Painterly, hushed, 1940s Fortune cover style.",
    accent: "green",
  },
  {
    id: "great-salt-lake",
    no: "GW—05",
    categories: ["garden"],
    title: "Refill the Great Salt Lake",
    pitch: "Reverse the desiccation of America's largest inland sea before its bed becomes airborne.",
    budget: "$140M",
    timeline: "10 years",
    years: 10,
    scoping: "$500,000",
    horizon: "Decade",
    lead: "Hydrology + western water-rights coalition — TBD",
    locale: "Utah / Great Basin",
    body: [
      "The Great Salt Lake has lost more than two-thirds of its surface and is, on its current trajectory, on track to become the most consequential dust source in North America — arsenic, mercury, and lead drifting into the lungs of three million people. The cause is unambiguous: upstream agricultural withdrawals. The fix is unambiguous: reduce them.",
      "We propose a private trust to retire water rights, fund precision-irrigation conversion, and underwrite the political work required to legislate a permanent floor for the lake's surface elevation.",
      "Phase I delivers the trust structure, the rights-acquisition pipeline, and the legislative campaign in Salt Lake City.",
    ],
    imagePrompt:
      "An aerial view of a shrinking inland sea, salt-pan rings receding from a small blue center, distant snowed mountains. Painterly, ominous, 1940s Fortune cover style.",
    accent: "green",
  },
  {
    id: "mycoremediation",
    no: "GW—06",
    categories: ["garden"],
    title: "Scale Mycoremediation for Superfund Sites",
    pitch: "Fungi that eat industrial poisons, deployed across the EPA's worst land.",
    budget: "$60M",
    timeline: "10 years",
    years: 10,
    scoping: "$450,000",
    horizon: "Decade",
    lead: "Mycologist + remediation engineer — TBD",
    locale: "Initial sites: Region IX (CA/AZ/NV)",
    body: [
      "There are 1,300+ active Superfund sites in the United States — abandoned mines, refineries, smelters, and creosote yards whose soils will be toxic for centuries under conventional remediation. The standard fix is excavation and landfill: we move the poison from one place to another and call it managed.",
      "A small body of work — Stamets, the Battelle group, recent literature out of Penn State — shows that specific fungal consortia can metabolize hydrocarbons, mercury, and heavy-metal complexes in situ, at orders of magnitude lower cost than removal. The science is real; the deployment infrastructure does not exist.",
      "We propose to assemble it: a continental network of mycoremediation labs, a strain library, a regulatory pathway through EPA Region pilots, and a contracting model that out-bids excavation for the first ten sites.",
      "Phase I builds the science team, secures the first pilot site, and produces the regulatory roadmap.",
    ],
    imagePrompt:
      "A cross-section of contaminated earth in painterly chiaroscuro: black industrial soil at the surface, lacy white mycelium threading down through it, clean amber soil and roots emerging beneath. Single shaft of light from above. 1940s Fortune cover style.",
    accent: "green",
  },

  // ── Monumental Works ─────────────────────────────────────────────────
  {
    id: "expand-manhattan",
    no: "GW—07",
    categories: ["monumental"],
    title: "Expand Manhattan",
    pitch: "Add 1,760 acres of new land to the south of the Battery.",
    budget: "$1.7B",
    timeline: "Generational",
    years: 25,
    scoping: "$750,000",
    horizon: "Civic / generational",
    lead: "Civil engineering consortium",
    locale: "New York Harbor",
    body: [
      "Manhattan's housing crisis is, at root, a problem of geometry. There is not enough island. The original landfill that built Battery Park City and most of lower Manhattan ran for a century and a half; the project simply ended. It need not have.",
      "We propose extending the southern tip of Manhattan into the lower harbor — a phased landfill program on the scale of the original, but engineered for sea-level rise from the first foot. Housing for 250,000. A second downtown. Coastal protection for everything north of it. The largest civic project of the century.",
      "Phase I delivers the feasibility study, the engineering preliminaries, and the early political alignment in Albany and City Hall.",
    ],
    imagePrompt:
      "An aerial cutaway of lower Manhattan with a new landmass extending southward into the harbor — drafted in the painterly style of a 1950s civic-engineering brochure. Cranes, barges, dotted parcel lines, gold sun reflecting off the water.",
    accent: "red",
  },
  {
    id: "bullet-train",
    no: "GW—08",
    categories: ["monumental"],
    title: "A National Bullet Train System",
    pitch: "A continent stitched together by steel, at the speed the rest of the world has had for fifty years.",
    budget: "$80B+",
    timeline: "25 years",
    years: 25,
    scoping: "$1,500,000",
    horizon: "Generational",
    lead: "Engineering consortium + federal compact — TBD",
    locale: "Continental USA",
    body: [
      "Every other peer nation built theirs in the second half of the twentieth century. America did not, for reasons that are entirely about coordination and almost not at all about engineering. The result is a continental economy that moves freight by rail and people by car or air, badly.",
      "We propose a thirty-thousand-mile dedicated high-speed network, anchored on the existing northeast and California corridors and extended in phases. A private trust does the corridor assembly the federal government has failed at; a federal compact runs the operating company.",
      "Phase I delivers the corridor atlas, the right-of-way strategy, the federal compact draft, and the first private-trust capital stack.",
    ],
    imagePrompt:
      "A long silver bullet train cutting across a vast painted American landscape at dusk, mountains in the distance, telegraph poles ticking past. Painterly, monumental, 1940s Fortune cover style.",
    accent: "red",
  },

  // ── Commissioned Ventures ────────────────────────────────────────────
  {
    id: "birth-centers",
    no: "GW—09",
    categories: ["commissioned"],
    title: "A National Network of Birth Centers",
    pitch: "Doula- and midwife-led birth centers as the default site of low-risk American birth.",
    budget: "$120M",
    timeline: "10 years",
    years: 10,
    scoping: "$500,000",
    horizon: "Decade",
    lead: "Obstetric clinician + health-system operator — TBD",
    locale: "First 25 sites — mixed urban / rural",
    body: [
      "American hospital birth is the most expensive in the world and produces the worst maternal-health outcomes of any wealthy country. Black mothers die at three to four times the rate of white mothers. The procedural defaults — continuous monitoring, supine labor, routine intervention — are an artifact of mid-century hospital economics, not of evidence.",
      "Freestanding, midwife- and doula-led birth centers cut cost by more than half, drop unnecessary intervention dramatically, and — for low-risk pregnancies, the overwhelming majority — match or beat hospital outcomes. The model is proven. It does not exist at scale in the United States for reasons of insurance, real estate, and credentialing.",
      "We propose a venture that builds and operates a national network — twenty-five centers in ten years, anchored on integration agreements with one major health system per region, a unified credentialing pipeline, and a national insurance product that pays for the model directly.",
      "Phase I produces the operator team, the first three site selections, and the payor and health-system MOUs.",
    ],
    imagePrompt:
      "A quiet, light-filled room with a single bed and a window looking out on dawn; a midwife's silhouette stands beside it. Painterly, hushed, gentle palette of cream, oxblood, and gold. 1940s Fortune cover style.",
    accent: "blue",
  },
  {
    id: "biohardening",
    no: "GW—10",
    categories: ["commissioned", "defense"],
    title: "Biohardening Products for Critical Built Environments",
    pitch: "A venture that ships engineered hardware to harden hospitals, transit, and schools against biological threats.",
    budget: "$45M (venture)",
    timeline: "5 years",
    years: 5,
    scoping: "$350,000",
    horizon: "Half-decade",
    lead: "Indoor-air engineer + product CEO — TBD",
    locale: "Boston / Atlanta",
    body: [
      "Most of the buildings that matter in a pandemic — hospitals, airports, mass-transit nodes, schools — are biologically defenseless. HVAC filtration is below MERV-13. Surface materials are passive. Far-UVC is barely deployed. The interventions that work are well-characterized in the literature and almost entirely absent from the catalog of an HVAC contractor.",
      "We propose a venture that ships the missing products: drop-in MERV-16 retrofits, far-UVC ceiling fixtures certified for occupied spaces, antimicrobial surface laminates, and the data layer that lets a hospital procurement officer prove a building's biological hardening to an insurer.",
      "The market is paying for none of this today and will pay for all of it the day after the next outbreak. We would rather build the company before the day.",
      "Phase I assembles the product team, validates the first three SKUs with a pilot health system, and closes the seed round.",
    ],
    imagePrompt:
      "A painterly cutaway of a hospital corridor with glowing engineered ceiling panels casting a clean violet light, air moving in invisible currents through unseen filtration. Monumental, slightly clinical, 1940s Fortune cover style.",
    accent: "bronze",
  },
  {
    id: "guardian-ai",
    no: "GW—11",
    categories: ["commissioned", "defense"],
    title: "Guardian Model Development",
    pitch: "Continuous, real-time AI monitoring of frontier biological AI deployments.",
    budget: "$30M (venture)",
    timeline: "3 years",
    years: 5,
    scoping: "$400,000",
    horizon: "Half-decade",
    lead: "ML researcher + biosafety lead — TBD",
    locale: "San Francisco / DC",
    body: [
      "Frontier models are increasingly capable of meaningful contributions to biological design — gene editing, viral engineering, synthesis planning. The labs deploying them rely on training-time safety work that is, by construction, brittle: a single jailbreak collapses it. Inference-time monitoring is a separable problem, well-suited to a smaller dedicated model.",
      "We propose a Guardian: a continuously-trained companion model that audits frontier-model interactions in real time for biological-uplift signals, with sub-second latency, an independent governance structure, and a published evaluation suite. Sold under contract to frontier labs and operated under the supervision of a non-profit safety board.",
      "Phase I builds the founding team, secures a first-customer contract with a frontier lab, and produces the evaluation framework.",
    ],
    imagePrompt:
      "A single oxblood-red eye, opened wide, rendered as a stylized circuit-board mandala — symmetric, geometric, watching. Surrounded by faint constellations of code. Painterly, severe, 1940s Fortune cover style.",
    accent: "bronze",
  },

  // ── Arcane Inquiries ─────────────────────────────────────────────────
  {
    id: "safir",
    no: "GW—12",
    categories: ["arcane"],
    title: "Simple Agreement for Future IP Royalties",
    pitch: "A scalable legal instrument that gives patrons a small share of any commercial IP born of their grant.",
    budget: "$1.2M",
    timeline: "2 years",
    years: 2,
    scoping: "$150,000",
    horizon: "Two years",
    lead: "Securities counsel + nonprofit-law lead — TBD",
    locale: "Distributed",
    body: [
      "The grant has not meaningfully evolved as an instrument since the 1950s. Philanthropy still treats every dollar as terminal, even when the work it funds becomes valuable IP — a drug, a software platform, a patent. The patron gets a tax receipt; the world gets a windfall it never returns.",
      "We propose SAFIR: a YC-SAFE-like template that lets a patron's grant carry a small participation right in any commercial IP the work eventually produces, with clean default terms, a single-page execution copy, and IRS and 501(c)(3) compatibility worked out in advance. Open-sourced once final.",
      "Phase I retains the counsel, drafts the instrument, and shepherds it through the first three pilot grants.",
    ],
    imagePrompt:
      "A single sheet of legal paper on a dark desk, lit from above, with a brass pen and a wax seal half-finished beside it. Painterly chiaroscuro, 1940s Fortune cover style.",
    accent: "purple",
  },

  // ── Civilizational Defense ───────────────────────────────────────────
  {
    id: "ppe-stockpiles",
    no: "GW—13",
    categories: ["defense"],
    title: "Pandemic PPE Stockpiles",
    pitch: "Procure and quietly cache pandemic-grade PPE near every major U.S. metro before we need it again.",
    budget: "$220M",
    timeline: "3 years",
    years: 5,
    scoping: "$300,000",
    horizon: "Half-decade",
    lead: "Logistics principal + biosecurity counsel — TBD",
    locale: "20 metros, undisclosed sites",
    body: [
      "The 2020 PPE crisis was not a manufacturing failure; it was an inventory failure. The Strategic National Stockpile held a fraction of the demand in the first week, and what was held was older than the people it was meant to protect. Replenishment policy has not meaningfully changed. The next pandemic — and there will be one — will repeat the exact failure unless someone with a longer horizon than a federal procurement cycle does the work.",
      "We propose a private, philanthropy-funded stockpile: pandemic-grade respirators, gowns, gloves, and elastomeric replacements, procured to spec, rotated on a verified shelf-life schedule, and pre-positioned in low-profile warehouses within four hours of every U.S. metro of more than one million people.",
      "The caches are private until the day they are needed. On that day, they are donated, by pre-arranged agreement, to a coordinating federal partner. The whole point is that they exist before the panic and arrive before the supply chain has time to fail.",
      "Phase I delivers the procurement plan, the site network, and the federal-handoff legal structure.",
    ],
    imagePrompt:
      "A single anonymous warehouse at the edge of a city at dawn, doors closed, stacks of unmarked crates seen faintly through one tall window. Painterly, restrained, deeply quiet. 1940s Fortune cover style.",
    accent: "bronze",
  },

  // ── A More Perfect Union ─────────────────────────────────────────────
  {
    id: "national-service",
    no: "GW—14",
    categories: ["union"],
    title: "Install a National Service Program",
    pitch: "A bipartisan civilian-service year for every American high school graduate.",
    budget: "$60M (campaign) + federal implementation",
    timeline: "5 years to enactment",
    years: 5,
    scoping: "$500,000",
    horizon: "Half-decade",
    lead: "Coalition principal — TBD",
    locale: "Washington, DC",
    body: [
      "America is fractured in part because young Americans no longer meet each other. A mandatory year of civilian service — an internal Peace Corps, organized so that no participant serves within five hundred miles of where they grew up — is the highest-leverage civic intervention available to us.",
      "We propose to design the program, build the bipartisan political coalition required to pass it, and shepherd its installation as federal law within a single presidential term. The work is principally legislative, not architectural: the policy mechanics are well understood; the politics are not.",
      "Phase I produces the coalition map, the model legislation, and the first wave of governor and senator endorsements required to move it.",
    ],
    imagePrompt:
      "A line of young Americans of every background standing at attention in front of an enormous painted map of the United States, dawn light from the east, civilian uniforms. Painterly, hopeful, 1940s Fortune cover style.",
    accent: "indigo",
  },
  {
    id: "special-economic-zone",
    no: "GW—15",
    categories: ["union"],
    title: "A Special Economic Zone within the United States",
    pitch: "A geographically bounded zone where most ubiquitous regulation does not apply.",
    budget: "$25M (assembly) + state partnership",
    timeline: "10 years",
    years: 10,
    scoping: "$600,000",
    horizon: "Decade",
    lead: "Constitutional lawyer + state-government principal — TBD",
    locale: "TBD — candidate states identified",
    body: [
      "A zone free of most otherwise ubiquitous regulations, to allow for an intentional tradeoff of caution in favor of accelerated innovation. Like Hong Kong but without the human rights violations. Within the zone: streamlined construction, simplified financial supervision, a unified state-federal regulator, a sunset on most administrative rule-making.",
      "We propose to design the zone — its legal scaffolding, its political compact with a host state, its enforceable civil-liberties floor — and to assemble the patron coalition required to capitalize the assembly and the first ten years of operation.",
      "Phase I produces the legal framework, the host-state shortlist, and the first patron consortium.",
    ],
    imagePrompt:
      "A vast aerial view of a planned new district at dawn — clean grids, half-built towers, a long causeway connecting it to the mainland, golden sun on the water. Painterly, optimistic, 1940s Fortune cover style.",
    accent: "indigo",
  },
  {
    id: "county-fair",
    no: "GW—16",
    categories: ["union"],
    title: "Bring Back the (Serious) County Fair",
    pitch: "A revival of county fairs as the working institution of American craft and skills transfer.",
    budget: "$18M",
    timeline: "8 years",
    years: 10,
    scoping: "$250,000",
    horizon: "Decade",
    lead: "Folk-arts director + 4-H alumni network — TBD",
    locale: "First 40 counties — distributed",
    body: [
      "The American county fair was, for most of the nineteenth and twentieth centuries, the public institution of skilled craft. Master blacksmiths, dairymen, seamstresses, beekeepers, and breeders showed work to each other in front of the towns they came from, with judges who knew the work and ribbons that meant something. The fair was the most important continuing-education event in rural America.",
      "What replaced it — a midway, a few tractor pulls, a deep-fried funnel cake — is the husk. The judges are gone, the craft halls are empty, and the transmission line for skilled trades has been allowed to fray to almost nothing.",
      "We propose a working revival: a national charter that re-establishes serious judging tracks at forty county fairs, a master-apprentice ribbon system tied to apprenticeship credit, restored craft halls, and a small endowment per fair to fund the work.",
      "Phase I produces the charter, the first ten county partnerships, and the master-judge roster.",
    ],
    imagePrompt:
      "A painted county fairground at dusk: a wooden craft hall lit warm from within, prize ribbons fluttering, a line of carefully built objects on display tables. Painterly, nostalgic but serious, 1940s Fortune cover style.",
    accent: "indigo",
  },
];

// Sync legacy `category` field for any consumer that still reads it.
window.GW_PROJECTS.forEach((p) => {
  if (!p.categories) p.categories = p.category ? [p.category] : [];
  p.category = p.categories[0];
});

// ─────────────────────────────────────────────────────────────────────────
// Partners — editable in the admin panel. Each carries an id (stable) and a
// display name. Logos themselves are dropped onto the matching <image-slot>
// in the live page, just like project illustrations.
// ─────────────────────────────────────────────────────────────────────────
window.GW_PARTNERS = [
  { id: "p1", name: "Founding Patron I" },
  { id: "p2", name: "Founding Patron II" },
  { id: "p3", name: "Founding Patron III" },
  { id: "p4", name: "Allied Foundation" },
  { id: "p5", name: "Allied Family Office" },
  { id: "p6", name: "Allied Trust" },
];

// Defaults snapshot — used by the admin panel's "Reset to defaults" action.
window.GW_DEFAULT_PROJECTS = JSON.parse(JSON.stringify(window.GW_PROJECTS));
window.GW_DEFAULT_CATEGORIES = JSON.parse(JSON.stringify(window.GW_CATEGORIES));
window.GW_DEFAULT_PARTNERS = JSON.parse(JSON.stringify(window.GW_PARTNERS));
