const birdsData = [
  {
    name: "North American Bluebirds",
    blurb: "Including the Eastern, Western, and Mountain Bluebird, these beloved thrushes are a symbol of happiness and a major conservation success story.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/photo/303809721-1900px.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle" // Replace with your actual Stripe Price ID
  },
  {
    name: "Boreal Chickadee",
    blurb: "A hardy resident of the cold northern forests, distinguished from its Black-capped cousin by a brown cap, grayish-brown back, and reddish-brown flanks.",
    imageUrl: "https://media.audubon.org/sfw_img_9895.jpg?width=1616&auto=webp&quality=90&fit=bounds&disable=upscale",
    product: "NutHatch™",
    priceId: "price_NUT_example" // Replace with your actual Stripe Price ID
  },
  {
    name: "Bridled Titmouse",
    blurb: "A small, crested songbird of oak and sycamore canyons, easily identified by its striking black-and-white striped face pattern.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/photo/302511961-480px.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle"
  },
  {
    name: "Brown-headed Nuthatch",
    blurb: "A small, social songbird of southeastern pine forests, known for its squeaky, rubber-ducky-like calls. Often seen climbing down tree trunks headfirst.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/photo/308588531-480px.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example"
  },
  {
    name: "Chestnut-backed Chickadee",
    blurb: "A small, active chickadee of the Pacific Northwest, easily identified by its rich chestnut-brown back, black cap, and white cheeks.",
    imageUrl: "https://birdsdontpee.com/wp-content/uploads/2022/11/chickeroos-1-of-5.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example"
  },
  {
    name: "North American Chickadees",
    blurb: "Including the familiar Black-capped Chickadee and the Mountain Chickadee, these acrobatic and curious birds are beloved visitors to backyards.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/photo/302473191-1900px.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example"
  },
  {
    name: "Great Crested Flycatcher",
    blurb: "A large, noisy flycatcher of eastern forests, with a bright lemon-yellow belly and a cinnamon-rufous tail.",
    imageUrl: "https://www.ocalagazette.com/wp-content/uploads/2024/06/great-crested-flycatcher-9296.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle"
  },
  {
    name: "Juniper Titmouse",
    blurb: "A plain gray bird with a small crest, native to the arid pinyon-juniper woodlands of the Great Basin.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/JuniperTitmouse.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle"
  },
  {
    name: "Lewis's Woodpecker",
    blurb: "A unique, crow-like woodpecker with a glossy greenish-black back and a pinkish belly. Unlike other woodpeckers, it often catches insects in mid-air.",
    imageUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/24948851/640",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle"
  },
  {
    name: "Lucy's Warbler",
    blurb: "The smallest and palest North American warbler, unique for nesting in tree cavities within arid desert washes and mesquite bosques.",
    imageUrl: "https://www.allaboutbirds.org/guide/assets/og/75710941-1200px.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example"
  },
  {
    name: "Prothonotary Warbler",
    blurb: "Often called the 'swamp canary,' this brilliantly golden warbler is a jewel of southeastern wooded wetlands and bottomland forests.",
    imageUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/225828321/1200",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle"
  },
  {
    name: "Pygmy Nuthatch",
    blurb: "A tiny, highly social nuthatch of western pine forests, often found moving in energetic, chattering flocks.",
    imageUrl: "https://nativeherenursery.org/wp-content/uploads/2022/06/Sitta-pygmaea-1.jpg",
    product: "NutHatch™",
    priceId: "price_NUT_example"
  },
  {
    name: "Red-cockaded Woodpecker",
    blurb: "A rare, non-migratory woodpecker of the southeastern United States, unique for its complex social structure.",
    imageUrl: "https://encyclopediaofalabama.org/wp-content/uploads/2023/04/Red-cockaded-Woodpecker-1-984x1300.jpg",
    product: "NestEgg™",
    priceId: "price_1SAZoR4r07ISOh8O9rWFyXle"
  }
];
