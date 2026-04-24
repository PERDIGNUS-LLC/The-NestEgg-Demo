const birdsData = [
  {
    name: "North American Bluebirds",
    blurb: "Including the Eastern, Western, and Mountain Bluebird, these beloved thrushes are a symbol of happiness and a major conservation success story.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/photo/303809721-1900px.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle",
    mounting: "4-7 ft",
    orientation: "East, South, or Southeast",
    proximity: "300 ft apart"
  },
  {
    name: "Boreal Chickadee",
    blurb: "A hardy resident of the cold northern forests, distinguished by its brown cap, grayish-brown back, and reddish-brown flanks.",
    imageUrl: "https://media.audubon.org/sfw_img_9895.jpg?width=1616&auto=webp&quality=90&fit=bounds&disable=upscale",
    product: "NutHatch™",
    priceId: "price_NUT_example",
    mounting: "1-10 ft",
    orientation: "Away from prevailing wind",
    proximity: "150 ft apart"
  },
  {
    name: "Bridled Titmouse",
    blurb: "A small, crested songbird of oak and sycamore canyons, easily identified by its striking black-and-white striped face pattern.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/photo/302511961-480px.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle",
    mounting: "5-12 ft",
    orientation: "North or East",
    proximity: "100 ft apart"
  },
  {
    name: "Brown-headed Nuthatch",
    blurb: "A small, social songbird of southeastern pine forests, known for its squeaky, rubber-ducky-like calls.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/photo/308588531-480px.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example",
    mounting: "5-15 ft",
    orientation: "South or East",
    proximity: "50-75 ft apart"
  },
  {
    name: "Chestnut-backed Chickadee",
    blurb: "A small, active chickadee of the Pacific Northwest, identified by its rich chestnut-brown back and black cap.",
    imageUrl: "https://birdsdontpee.com/wp-content/uploads/2022/11/chickeroos-1-of-5.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example",
    mounting: "1-15 ft",
    orientation: "Away from prevailing winds",
    proximity: "150 ft apart"
  },
  {
    name: "North American Chickadees",
    blurb: "Including the familiar Black-capped and Mountain Chickadee, these acrobatic and curious birds are beloved visitors.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/photo/302473191-1900px.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example",
    mounting: "4-15 ft",
    orientation: "Away from prevailing winds",
    proximity: "150 ft apart"
  },
  {
    name: "Great Crested Flycatcher",
    blurb: "A large, noisy flycatcher of eastern forests, with a bright lemon-yellow belly and a cinnamon-rufous tail.",
    imageUrl: "https://www.ocalagazette.com/wp-content/uploads/2024/06/great-crested-flycatcher-9296.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle",
    mounting: "6-20 ft",
    orientation: "Flexible",
    proximity: "200-300 ft apart"
  },
  {
    name: "Juniper Titmouse",
    blurb: "A plain gray bird with a small crest, native to the arid pinyon-juniper woodlands of the Great Basin.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/JuniperTitmouse.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle",
    mounting: "4-15 ft",
    orientation: "North or East",
    proximity: "150-200 ft apart"
  },
  {
    name: "Lewis's Woodpecker",
    blurb: "A unique, crow-like woodpecker with a glossy greenish-black back and a pinkish belly.",
    imageUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/24948851/640",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle",
    mounting: "10-30 ft",
    orientation: "East or South",
    proximity: "300 ft apart"
  },
  {
    name: "Lucy's Warbler",
    blurb: "The smallest and palest North American warbler, unique for nesting in tree cavities within arid desert washes.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/og/75710941-1200px.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example",
    mounting: "3-8 ft",
    orientation: "North or East",
    proximity: "50-100 ft apart"
  },
  {
    name: "Prothonotary Warbler",
    blurb: "Often called the 'swamp canary,' this brilliantly golden warbler is a jewel of southeastern wooded wetlands.",
    imageUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/225828321/1200",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle",
    mounting: "2-10 ft",
    orientation: "Flexible",
    proximity: "200 ft apart"
  },
  {
    name: "Pygmy Nuthatch",
    blurb: "A tiny, highly social nuthatch of western pine forests, often found moving in energetic, chattering flocks.",
    imageUrl: "https://nativeherenursery.org/wp-content/uploads/2022/06/Sitta-pygmaea-1.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example",
    mounting: "10-30 ft",
    orientation: "South or Southwest",
    proximity: "50 ft apart"
  },
  {
    name: "Red-cockaded Woodpecker",
    blurb: "A rare, non-migratory woodpecker of the southeastern United States, unique for its complex social structure.",
    imageUrl: "https://encyclopediaofalabama.org/wp-content/uploads/2023/04/Red-cockaded-Woodpecker-1-984x1300.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle",
    mounting: "15-30 ft",
    orientation: "Flexible",
    proximity: "0.5 miles apart"
  }
];
