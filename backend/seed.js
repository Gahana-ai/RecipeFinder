import mongoose from 'mongoose';
import Recipe from './models/Recipe.js'; 

const atlasURI = "mongodb://gahanajain:gahanajain@ac-jryltsy-shard-00-00.t41zyzf.mongodb.net:27017,ac-jryltsy-shard-00-01.t41zyzf.mongodb.net:27017,ac-jryltsy-shard-00-02.t41zyzf.mongodb.net:27017/recipeDB?ssl=true&replicaSet=atlas-zun67x-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(atlasURI)
  .then(() => console.log('MongoDB Atlas connected successfully for seeding...'))
  .catch(err => console.error('Database connection error:', err));


 const seedRecipes = [
  // ==================== BREAKFAST ====================
  { 
      name: "Authentic Idli Chutney", 
      category: "Breakfast", 
      cookTime: "30 mins", 
      description: "Soft, pillowy steamed rice cakes served alongside a hot, flavorful coconut chutney.", 
      steps: [
          "Grease the idli molds lightly with a drop of sesame or vegetable oil to prevent sticking.",
          "Pour the fermented parboiled rice and urad dal batter into each clean mold cavity, leaving a little room for expansion.",
          "Bring water to a rolling boil in the idli steamer pot, place the filled stand inside, seal tightly, and steam over medium-high heat for 10-12 minutes.",
          "Turn off the flame and let the stand sit undisturbed for 2-3 minutes before using a wet spoon to gently scoop out the hot, fluffy idlis.",
          "Prepare the fresh chutney by blending grated fresh coconut, roasted chana dal, split green chilies, ginger, and salt with a splash of water into a smooth paste.",
          "Transfer the chutney to a serving bowl and temper it with hot oil, mustard seeds, split urad dal, and crisp curry leaves before serving."
      ],
      ingredients: ["Rice & Urad Dal batter", "Coconut", "Roasted chana dal", "Green chilies"], 
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Crispy Masala Dosa", 
      category: "Breakfast", 
      cookTime: "25 mins", 
      description: "Thin, crispy rice crepes stuffed with a spiced potato mash and served with sambar.", 
      steps: [
          "Heat a heavy flat cast-iron griddle (tawa) over medium heat and sprinkle a few drops of water to check the temperature; it should sizzle off immediately.",
          "Wipe the griddle surface clean with a damp cloth or a cut onion dipped in a tiny drop of oil to create a non-stick coating.",
          "Pour a large ladleful of smooth, fermented dosa batter right into the center of the hot pan.",
          "Using the flat bottom of your ladle, quickly spread the batter outward in expanding concentric circles until it forms a thin, uniform crepe layer.",
          "Drizzle a teaspoon of clarified butter (ghee) or oil along the outer edges and over the surface, cooking until the bottom becomes deeply golden and crisp.",
          "Place a generous scoop of pre-cooked, turmeric-spiced mashed potato filling across the center line of the crepe.",
          "Fold the sides carefully over the potato filling to form a neat roll or triangle, and slide it onto a plate to serve immediately while crunchy."
      ],
      ingredients: ["Dosa batter", "Potatoes", "Onions", "Mustard seeds", "Turmeric"], 
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Fluffy Blueberry Pancakes", 
      category: "Breakfast", 
      cookTime: "15 mins", 
      description: "Classic American style pancakes bursting with fresh, juicy blueberries.", 
      steps: [
          "In a large mixing bowl, sift together the dry ingredients: all-purpose flour, white sugar, baking powder, and a tiny pinch of salt.",
          "In a separate bowl, whisk the wet ingredients: fresh whole milk, large eggs, and melted unsalted butter until completely smooth.",
          "Pour the liquid mixture directly into the dry ingredients and stir gently using a spatula just until combined, leaving minor lumps in the batter.",
          "Heat a flat non-stick skillet or griddle over medium heat and melt a thin pat of unsalted butter to coat the cooking surface.",
          "Ladle approximately 1/4 cup of thick batter onto the hot skillet for each individual pancake loop.",
          "Drop a handful of fresh, washed blueberries evenly onto the wet top surface of the cooking batter circles.",
          "Cook undisturbed until small uniform bubbles form on top and the edges look set, then flip cleanly with a spatula and cook the other side for 1-2 minutes until golden brown."
      ],
      ingredients: ["All-purpose flour", "Fresh blueberries", "Milk", "Eggs", "Maple syrup"], 
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Avocado Toast with Egg", 
      category: "Breakfast", 
      cookTime: "10 mins", 
      description: "Crispy sourdough bread topped with creamy mashed avocado, chili flakes, and a perfectly poached egg.", 
      steps: [
          "Slice a thick piece of fresh artisanal sourdough bread and toast it in a toaster or on a pan with butter until crisp and deeply golden brown.",
          "Cut a ripe avocado in half, discard the central pit safely, and scoop the rich green flesh cleanly into a small mixing bowl.",
          "Mash the avocado roughly with a fork, mixing in fresh lime juice, flaky sea salt, and ground black pepper to keep it bright and flavorful.",
          "Bring a small saucepan of clean water to a gentle simmer over medium heat and stir in a splash of white vinegar to help the egg whites coagulate.",
          "Crack a cold fresh egg into a small ramekin, swirl the simmering water gently to create a slow whirlpool vortex, and drop the egg directly into the center.",
          "Poach the egg for exactly 3 to 4 minutes until the whites are fully set but the yolk remains completely liquid, then lift it out carefully with a slotted spoon.",
          "Spread the seasoned mashed avocado thickly over the warm toasted sourdough, rest the warm poached egg on top, and garnish with red chili flakes."
      ],
      ingredients: ["Sourdough bread", "Avocado", "Egg", "Chili flakes", "Lime"], 
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
  },

  // ==================== LUNCH ====================
  { 
      name: "Paneer Butter Masala", 
      category: "Lunch", 
      cookTime: "35 mins", 
      description: "Soft cottage cheese cubes simmered in a rich, creamy, and mildly sweet tomato-onion gravy.", 
      steps: [
          "Heat a tablespoon of oil in a pan and saute chopped onions, ginger, garlic, and ripe red tomatoes along with whole cashews until soft and mushy.",
          "Allow the cooked aromatics to cool completely down to room temperature, then transfer them into a blender and process until a perfectly smooth gravy paste forms.",
          "Melt two generous tablespoons of butter in a clean deep kadhai pan and stir in a bay leaf along with Kashmiri red chili powder on low heat to release color.",
          "Pour the blended tomato-onion cashew paste into the hot seasoned butter mix, stirring continuously to prevent spitting.",
          "Cover and cook the gravy base until you see small drops of oil separate and bubble along the outer edges of the sauce.",
          "Pour in half a cup of warm water, add salt, a touch of sugar, and fresh paneer cubes, simmering gently for 5 minutes so the cheese absorbs the flavor.",
          "Finish the dish by crushing dried fenugreek leaves (kasuri methi) between your palms into the pan, and swirl in a heavy splash of fresh cream."
      ],
      ingredients: ["Paneer cubes", "Tomatoes", "Cashews", "Heavy cream", "Butter"], 
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Creamy Tomato Basil Pasta", 
      category: "Lunch", 
      cookTime: "25 mins", 
      description: "Al dente penne pasta smothered in a vibrant, rich tomato sauce infused with fresh sweet basil.", 
      steps: [
          "Bring a large pot of water to a rolling boil, add a generous tablespoon of salt, and drop in the dry penne pasta shapes.",
          "Cook the pasta uncovered, stirring occasionally, for roughly 9-11 minutes until it reaches an al dente bite texture.",
          "Drain the cooked pasta thoroughly through a colander, making sure to reserve at least one cup of the starchy hot cooking water for the sauce later.",
          "Heat extra virgin olive oil in a wide skillet, adding finely minced garlic cloves and cooking until aromatic without letting them brown.",
          "Pour in pureed plum tomatoes and a pinch of red pepper flakes, simmering the sauce down for 10 minutes until it darkens and thickens.",
          "Lower the flame, pour in heavy whipping cream, and stir smoothly until a beautiful orange, velvety uniform sauce base is achieved.",
          "Toss in the hot drained penne pasta, add the fresh torn sweet basil leaves, and pour in a splash of the pasta water to coat the noodles evenly."
      ],
      ingredients: ["Penne pasta", "Tomato puree", "Fresh basil", "Heavy cream"], 
      image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Hyderabadi Veg Biryani", 
      category: "Lunch", 
      cookTime: "45 mins", 
      description: "Fragrant basmati rice layered with spiced mixed vegetables, saffron, and fried onions.", 
      steps: [
          "Wash long-grain basmati rice under cold running water multiple times until the water runs clear, then soak it in water for 30 minutes.",
          "Cook the soaked rice in a large pot with whole spices (cardamom, cloves, cinnamon) until it is exactly 70% cooked, then drain completely.",
          "In a separate deep pan, parboil a mix of chopped carrots, french beans, green peas, and potatoes, then drain and set aside.",
          "Toss the vegetables with thick yogurt, biryani masala spices, ginger-garlic paste, and mint leaves, cooking until the base is fragrant.",
          "In a heavy-bottomed pot, spread a layer of the spiced vegetable gravy, then top it evenly with a layer of the cooked aromatic rice.",
          "Garnish the top layer with crisp deep-fried onions (birista), fresh mint leaves, melted ghee, and a drizzle of warm saffron-infused milk.",
          "Seal the rim of the pot tightly with dough or a clean foil sheet, put the heavy lid on, and cook over ultra-low heat (dum) for 20 minutes."
      ],
      ingredients: ["Basmati rice", "Mixed vegetables", "Fried onions", "Yogurt", "Saffron"], 
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Classic Caesar Salad", 
      category: "Lunch", 
      cookTime: "15 mins", 
      description: "Crisp romaine lettuce tossed in creamy Caesar dressing, parmesan cheese, and crunchy garlic croutons.", 
      steps: [
          "Separate the fresh romaine lettuce leaves, wash them thoroughly in ice-cold water to crisp them up, and pat them dry completely.",
          "Tear or chop the dry, crisp lettuce leaves into uniform bite-sized pieces and drop them into a large chilled salad wooden bowl.",
          "Prepare fresh croutons by tossing cubed day-old bread with olive oil, sea salt, and garlic powder, baking at 180°C until crunchy.",
          "Pour a desired amount of creamy Caesar dressing over the chopped romaine lettuce greens inside the bowl.",
          "Toss the greens lightly with tongs until every leaf is evenly and thinly coated with the dressing layer.",
          "Scatter the toasted garlic croutons and a handful of freshly shaved or grated parmesan cheese blocks over the top before serving cold."
      ],
      ingredients: ["Romaine lettuce", "Caesar dressing", "Croutons", "Parmesan cheese"], 
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Dal Tadka with Jeera Rice", 
      category: "Lunch", 
      cookTime: "30 mins", 
      description: "Yellow lentils cooked to smooth perfection, finished with a tempering of ghee, cumin, and garlic.", 
      steps: [
          "Rinse toor dal (pigeon peas) thoroughly and pressure cook it with water, turmeric powder, and salt for 4-5 whistles until completely soft.",
          "Mash the cooked yellow lentils gently with a wire whisk or wooden spoon to form a smooth, thick consistency.",
          "For the jeera rice, heat ghee in a pot, crackle cumin seeds, add soaked basmati rice, pour water, and simmer covered until fluffy.",
          "Heat two tablespoons of pure cow ghee in a small tempering pan over medium heat.",
          "Add cumin seeds to the hot ghee and let them sizzle, then immediately throw in finely chopped garlic cloves and dried red chilies.",
          "Fry the garlic pieces until they turn a light golden color and become highly aromatic, adding a pinch of hing (asafoetida) at the very end.",
          "Pour this sizzling, hot aromatic ghee tempering directly over the hot mashed dal base, cover instantly to trap the smoke, and mix before serving."
      ],
      ingredients: ["Toor dal", "Ghee", "Garlic", "Cumin seeds", "Basmati rice"], 
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },

  // ==================== DINNER ====================
  { 
      name: "Classic Margherita Pizza", 
      category: "Dinner", 
      cookTime: "20 mins", 
      description: "Simple Italian flatbread pizza topped with vibrant san marzano tomato sauce, fresh mozzarella, and basil.", 
      steps: [
          "Preheat your kitchen oven to its absolute maximum setting (ideally 250°C or higher) with a pizza baking stone placed inside.",
          "Place a proofed ball of fresh yeast pizza dough onto a lightly floured surface or wooden pizza peel board.",
          "Using your fingertips, gently press and stretch the dough out from the center to form a 12-inch round disc with a slightly thicker rim edge.",
          "Ladle a thin layer of smooth, seasoned San Marzano tomato sauce onto the center of the dough, spreading it outward uniformly.",
          "Tear fresh high-moisture mozzarella cheese blocks into flat pieces and distribute them evenly over the sauce layer.",
          "Slide the loaded pizza carefully onto the screaming hot stone inside the oven and bake for 7-10 minutes until the crust edge turns deep golden brown.",
          "Remove the hot baked pizza safely from the oven, scatter fresh whole sweet basil leaves over the top, and drizzle with extra virgin olive oil."
      ],
      ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Fresh basil", "Olive oil"], 
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Stir-Fry Tofu Noodles", 
      category: "Dinner", 
      cookTime: "20 mins", 
      description: "Wok-tossed hakka noodles loaded with crispy pan-seared tofu cubes and fresh colorful vegetables.", 
      steps: [
          "Drop dry hakka noodles into boiling water, cook for 4-5 minutes until barely tender, drain, rinse with cold water, and toss with a drop of oil.",
          "Press firm tofu with a clean towel to extract excess moisture, cut into uniform cubes, and toss with cornstarch.",
          "Heat oil in a wide skillet, pan-fry the tofu cubes on medium-high heat until golden brown and crispy on all sides, then remove.",
          "Crank the heat to high on a large wok, add oil, and stir-fry minced garlic, ginger, sliced bell peppers, shredded cabbage, and carrots rapidly.",
          "Pour dark soy sauce, green chili sauce, and a teaspoon of white vinegar along the fiery hot sides of the wok pan.",
          "Dump the boiled cold noodles and the crispy pan-seared tofu cubes directly into the sizzling hot wok vegetable mix.",
          "Using tongs or a quick folding motion, toss everything together dynamically over high heat for 2 minutes before serving hot."
      ],
      ingredients: ["Hakka noodles", "Tofu", "Bell peppers", "Soy sauce", "Garlic"], 
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Vegetable Thai Green Curry", 
      category: "Dinner", 
      cookTime: "30 mins", 
      description: "A fragrant and fiery aromatic curry made with coconut milk, green curry paste, and bamboo shoots.", 
      steps: [
          "Heat a tablespoon of neutral cooking oil in a deep pot over medium flame.",
          "Add authentic Thai green curry paste directly into the oil, mashing and frying it for 2 minutes until it becomes intensely aromatic.",
          "Slowly pour in one can of full-fat premium coconut milk, whisking constantly to smoothly dissolve the paste into the liquid.",
          "Bring the liquid coconut mix to a gentle simmer, letting the natural coconut oil separate and float on the surface layer.",
          "Add fresh exotic vegetables: broccoli florets, sliced baby corn, sliced bell peppers, and tender bamboo shoots into the pot.",
          "Simmer uncovered for 8-10 minutes until the added vegetables are cooked through but still retain a slight crisp bite.",
          "Stir in a splash of soy sauce, a squeeze of fresh lime juice, torn Thai basil leaves, and serve hot next to a bowl of steamed jasmine rice."
      ],
      ingredients: ["Green curry paste", "Coconut milk", "Broccoli", "Baby corn", "Jasmine rice"], 
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Creamy Mushroom Risotto", 
      category: "Dinner", 
      cookTime: "40 mins", 
      description: "Rich Italian arborio rice slow-cooked with earthy vegetable broth and sauteed wild mushrooms.", 
      steps: [
          "Bring a pot of rich vegetable stock to a simmer on the back burner and keep it hot throughout the entire cooking process.",
          "In a separate wide heavy-bottomed pan, melt butter and saute sliced wild mushrooms until all their liquid evaporates and they turn brown.",
          "Remove half the cooked mushrooms for garnishing later; add minced shallots and garlic to the remaining pan, cooking until clear.",
          "Pour the dry starchy Arborio rice grains directly into the pan, stirring for 2 minutes until the rice edges look translucent.",
          "Pour in a splash of dry white wine, stirring constantly until the liquid is entirely absorbed by the dry rice grains.",
          "Add one ladleful of the hot vegetable stock into the rice, stirring continuously until the liquid is fully absorbed before adding the next ladle.",
          "Continue this slow addition process for 20-25 minutes until the rice becomes thick and velvety, then stir in grated parmesan cheese."
      ],
      ingredients: ["Arborio rice", "Mushrooms", "Vegetable stock", "Parmesan cheese", "White wine"], 
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Paneer Tikka Masala", 
      category: "Dinner", 
      cookTime: "35 mins", 
      description: "Char-grilled marinated cottage cheese cubes tossed in a spicy, smoky, and robust onion-tomato gravy.", 
      steps: [
          "Cut paneer, capsicum, and onions into uniform square blocks, and marinate them in a mix of thick yogurt, mustard oil, and tikka spices for 30 minutes.",
          "Thread the marinated pieces onto metal skewers and grill them in a smoking hot oven or stove-top pan until the edges show charred spots.",
          "In a separate deep pan, melt butter and saute finely chopped onions along with ginger-garlic paste until rich brown.",
          "Add Kashmiri red chili, coriander powder, garam masala, and fresh tomato puree, cooking the base down until the fat starts to leave the sides.",
          "Pour in a splash of warm water and a tablespoon of cashew paste to create a thick, smooth, and heavy cream gravy texture.",
          "Gently slide the grilled paneer blocks, cooked capsicum, and onions out of the skewers directly into the simmering masala gravy sauce.",
          "Simmer together on low heat for 3-5 minutes, finish with a heavy drizzle of fresh cream, and serve hot with naan bread."
      ],
      ingredients: ["Paneer", "Yogurt", "Capsicum", "Onion-tomato gravy", "Garam masala"], 
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },

  // ==================== SNACKS ====================
  { 
      name: "French Fries", 
      category: "Snacks", 
      cookTime: "20 mins", 
      description: "Crispy, classic potato matchsticks deep-fried twice and dusted with sea salt flakes.", 
      steps: [
          "Peel large russet potatoes and slice them into uniform 1/4-inch thick matchstick strips using a sharp knife or mandoline.",
          "Soak the raw cut potato strips in a bowl of ice-cold water for at least 30 minutes to wash away excess surface starches.",
          "Drain the potato sticks completely and spread them out over clean kitchen towels, patting them until they are completely dry.",
          "Heat a deep pot of frying oil to a moderate 160°C and par-fry the potato batches for 5 minutes until soft but pale, then drain them.",
          "Let the par-fried matchsticks cool down to room temperature on a wire cooling rack for roughly 15-20 minutes.",
          "Crank the cooking oil temperature up to a hot 190°C and plunge the fries back in for a second round of quick deep frying.",
          "Fry for 2-3 minutes until they turn a glassy, crisp golden brown, transfer to a paper towel bowl, and dust instantly with sea salt."
      ],
      ingredients: ["Potatoes", "Oil", "Salt"], 
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Loaded Nachos", 
      category: "Snacks", 
      cookTime: "15 mins", 
      description: "Crunchy tortilla chips piled high with melted warm cheese sauce, jalapenos, and fresh salsa salad.", 
      steps: [
          "Arrange a thick, overlapping layer of salted corn tortilla chips across a large oven-safe baking platter or serving sheet.",
          "Prepare a smooth cheese sauce by melting cheddar cheese into a warm butter-flour roux mixed with whole milk.",
          "Drizzle the warm, liquid cheese sauce generously all over the laid-out tortilla chips, ensuring even distribution.",
          "Scatter a handful of pickled or fresh sliced jalapeno rings evenly over the cheesy chip layout.",
          "Finely dice fresh red tomatoes, white onions, and cilantro leaves, mixing them with lime juice to create a fresh pico de gallo salsa.",
          "Spoon the cold salsa mix neatly over the warm cheese chips right before serving so the nachos stay intensely crunchy."
      ],
      ingredients: ["Tortilla chips", "Cheese sauce", "Jalapenos", "Tomatoes", "Onions"], 
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Vegetable Spring Rolls", 
      category: "Snacks", 
      cookTime: "25 mins", 
      description: "Crispy wrapper logs stuffed with shredded crunchy stir-fried cabbage and carrots.", 
      steps: [
          "Finely shred fresh green cabbage and carrots, and cut bell peppers into very thin matchsticks.",
          "Heat oil in a wok over high flame, drop in the shredded vegetables, and stir-fry rapidly for 3 minutes so they stay crisp.",
          "Season the vegetable mix with soy sauce, white pepper powder, minced garlic, and salt, then transfer to a plate to cool down completely.",
          "Lay a thin spring roll wrapper sheet flat on a clean surface in a diamond position facing you.",
          "Place two tablespoons of the cooled vegetable stuffing near the bottom corner, roll upward tightly, and fold the side flaps inward.",
          "Brush the top corner edge with a sticky cornstarch slurry paste mix to seal the rolled log wrapper securely.",
          "Deep fry the stuffed rolls in medium-hot oil until the outer skin turns bubbly, brittle, and a beautiful even golden-brown color."
      ],
      ingredients: ["Spring roll wrappers", "Cabbage", "Carrots", "Soy sauce", "Cornstarch"], 
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Paneer Popcorn", 
      category: "Snacks", 
      cookTime: "15 mins", 
      description: "Bite-sized cubes of cottage cheese double-coated in crunchy breadcrumbs and quick fried.", 
      steps: [
          "Cut fresh block paneer into small, bite-sized half-inch square cubes.",
          "In a small mixing bowl, whisk all-purpose flour, cornstarch, red chili powder, garlic powder, and water into a smooth, thick batter slurry.",
          "Spread crispy panko breadcrumbs out evenly onto a flat rimmed plate or shallow bowl container.",
          "Drop a batch of paneer cubes directly into the wet seasoned flour slurry, coating each piece entirely.",
          "Lift the wet paneer pieces out and roll them thoroughly in the panko breadcrumbs, pressing gently to make the crumbs stick firmly.",
          "Repeat the coating process a second time if you prefer an extra thick, crunchy outer shell barrier.",
          "Deep fry the breaded paneer popcorn cubes in hot oil for 2 minutes until they turn golden-brown, then drain on paper towels."
      ],
      ingredients: ["Paneer cubes", "Breadcrumbs", "All-purpose flour", "Spices"], 
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  { 
            name: "Fudgy Chocolate Brownies", 
            category: "Dessert", 
            cookTime: "30 mins", 
            description: "Rich, dense chocolate brownies with a crackly top surface layer and ultra fudgy core center.", 
            steps: [
                "Preheat your baking oven to 175°C and line an 8x8 inch square baking tin with parchment paper, leaving overhang flaps on the sides.",
                "Melt unsalted butter in a saucepan, stir in unsweetened cocoa powder and sugar thoroughly, then remove from heat to cool slightly.",
                "Whisk whole eggs into the warm sugar-cocoa mixture one at a time, beating vigorously until the batter looks smooth and shiny.",
                "Gently fold in sifted all-purpose flour and a pinch of salt using a spatula, stirring just until the flour streaks disappear completely.",
                "Toss a generous handful of semi-sweet chocolate chips or chunks into the thick brownie batter mix for pocket textures.",
                "Spread the heavy batter evenly into the lined square tin, smoothing out the top surface with the back of a spoon.",
                "Bake at 175°C for 22-25 minutes until a toothpick inserted into the center comes out with a few moist, fudgy crumbs attached."
            ],
            ingredients: ["Cocoa powder", "Butter", "Sugar", "Eggs", "Chocolate chips"], 
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  { 
      name: "Rice Kheer", 
      category: "Dessert", 
      cookTime: "40 mins", 
      description: "Traditional Indian pudding made by slow simmering milk with rice, sugar, and dry fruits.", 
      steps: [
          "Wash a quarter-cup of fragrant basmati rice thoroughly under cold water, then soak it in fresh water for 20 minutes.",
          "Drain the soaked rice completely and crush the grains roughly between your fingers or using a mortar and pestle to break them down.",
          "Pour full-fat whole milk into a deep, heavy-bottomed pot and bring it to a boil over medium-high heat, stirring to prevent scorching.",
          "Lower the heat to a gentle simmer and add the broken rice grains directly into the hot milk pot.",
          "Cook uncovered on low flame for 25-30 minutes, stirring the bottom frequently and scraping the milk solids off the pot sides back into the mix.",
          "Once the rice grains are completely soft and mashed, and the milk has reduced down to a thick consistency, stir in white sugar.",
          "Add crushed cardamom powder, a few warm saffron strands, and toasted almond and pistachio flakes, simmering for 5 more minutes."
      ],
      ingredients: ["Whole milk", "Basmati rice", "Sugar", "Saffron", "Almonds"], 
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  // ==================== SNACKS ====================
  { 
      name: "Crispy Punjabi Samosa", 
      category: "Snacks", 
      cookTime: "40 mins", 
      description: "Flaky, golden pastry pyramids stuffed with a deeply spiced potato and green pea filling.", 
      steps: [
          "In a large mixing bowl, rub carom seeds (ajwain), salt, and a generous amount of melted ghee into all-purpose flour using your fingertips until the mixture resembles coarse breadcrumbs.",
          "Slowly add ice-cold water a little at a time and knead vigorously to form a very stiff, tight dough, then cover it with a damp cloth to rest for 30 minutes.",
          "Boil potatoes until just tender, peel and crumble them coarsely, then saute with cumin seeds, ginger, green chilies, green peas, and heavy spices like amchur (mango powder) and garam masala.",
          "Divide the rested dough into equal smooth balls, roll each ball out into a thin oval shape, and cut the oval clean down the middle with a knife to make two semi-circles.",
          "Brush the straight edge of a semi-circle with water, fold it over to form a neat cone shape, and securely press the overlapping seam to seal it shut.",
          "Stuff the pastry cone generously with the cooled potato filling, brush the top circular edges with water, make a small fold in the back, and pinch the rim tightly to close.",
          "Heat oil in a deep pan to a low-medium temperature and slowly fry the samosas for 15-18 minutes, moving them constantly until the crust is blister-free, crisp, and golden brown."
      ],
      ingredients: ["All-purpose flour", "Potatoes", "Ghee", "Green peas", "Ajwain"], 
      image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSetu5NvA38rg6xx-rdbpiaIwm79H9JyhsLNkYMFizeL8u_rUzT08fOZ63xYaPecm-uJ8YIC2g5WHS9KAQ"
  },
  { 
      name: "Crispy Chicken Popcorn", 
      category: "Snacks", 
      cookTime: "25 mins", 
      description: "Bite-sized tender chicken chunks marinated in buttermilk, double-dredged, and fried to extreme crunchiness.", 
      steps: [
          "Cut boneless, skinless chicken breasts into uniform, bite-sized half-inch cubes and place them into a clean glass bowl.",
          "Pour seasoned buttermilk, garlic powder, onion powder, smoked paprika, salt, and black pepper over the chicken cubes, mixing well to marinate for 30 minutes.",
          "In a wide shallow dish, combine all-purpose flour, cornstarch, a pinch of baking powder, and the same dry spices to create a seasoned flour dredge.",
          "Lift a handful of chicken pieces out of the wet buttermilk marinade, let the excess drip off, and drop them into the seasoned flour bowl.",
          "Toss the chicken cubes thoroughly in the flour, pressing firmly so the dry mix adheres, then dip them back into the buttermilk briefly for a second coating.",
          "Roll the wet chicken pieces in the flour mixture one final time, shaking off any loose excess flour through a colander to create those signature craggy ridges.",
          "Deep fry the coated chicken bits in small batches in hot oil (180°C) for 4-5 minutes until the exterior turns an intensely crunchy, golden brown shell."
      ],
      ingredients: ["Boneless chicken", "Buttermilk", "All-purpose flour", "Cornstarch", "Spices"], 
      image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTdRdVqUo04XC3BDSvNjF39OFx94ztzCh0lf6_ykDuwDrWVkY_EGdTjAIEG44DeD2E81fqbEeJ5J87lV38"
  },

  // ==================== BREAKFAST ====================
  { 
      name: "Classic Egg Toast", 
      category: "Breakfast", 
      cookTime: "10 mins", 
      description: "Crispy, butter-toasted bread slice featuring a perfectly cooked egg nestled right in the center.", 
      steps: [
          "Take a thick slice of white or brioche sandwich bread and use a small cookie cutter or a water glass rim to stamp out a clean 2-inch circle from the absolute center.",
          "Melt a generous tablespoon of unsalted butter in a flat non-stick skillet over medium-low heat until it begins to foam slightly.",
          "Place both the main hollowed-out bread slice and the small cut-out center disc directly onto the hot buttery pan surface.",
          "Toast the bread undisturbed for roughly 2-3 minutes until the underside transforms into a beautiful, uniform golden-brown crust.",
          "Flip the bread slice carefully using a wide spatula, drop another tiny dot of butter right into the empty center hole, and let it melt down.",
          "Crack a fresh egg directly into the hollow center opening of the toasted slice, seasoning the top with a pinch of salt and cracked black pepper.",
          "Cover the skillet with a lid and cook on low heat for 3-4 minutes until the egg whites completely set white but the yolk remains warm and runny."
      ],
      ingredients: ["Bread slice", "Egg", "Butter", "Salt", "Black pepper"], 
      image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTV0xEBv6-xUvj-1KmbTI-0QmjJeMW4uYbqLHJ3Fg1gJtw7mvmpGbUEYua3udmPWPVywteaYUmdbS4cC38"
  },

  { 
      name: "Traditional Kaju Katli", 
      category: "Dessert", 
      cookTime: "25 mins", 
      description: "Classic, melt-in-the-mouth Indian diamond fudge made entirely from premium cashew nuts.", 
      steps: [
          "Add raw, unroasted cashew nuts to a dry high-speed blender jar and pulse in short 3-second bursts until it transforms into a fine, smooth powder.",
          "Sift the cashew powder through a fine-mesh strainer to catch and remove any large grit pieces, ensuring a completely silky fudge texture.",
          "In a wide, non-stick heavy pan, combine white sugar and clean water over medium heat, stirring until the sugar dissolves completely.",
          "Bring the sugar syrup to a gentle simmer just until it becomes sticky, but turn off the heat right before it reaches a single-thread consistency.",
          "Dump the sifted cashew powder into the hot syrup, mixing vigorously with a spatula to break up any lumps until a uniform paste forms.",
          "Turn the flame back to ultra-low and cook the cashew mixture continuously for 7-9 minutes until it develops into a dough that cleanly leaves the pan sides.",
          "Transfer the warm dough onto a sheet of parchment paper greased with ghee, knead it smooth with your hands once safe to touch, roll it out to 1/4-inch thickness, and slice into classic diamond shapes."
      ],
      ingredients: ["Cashew nuts", "Sugar", "Water", "Ghee", "Silver leaf (optional)"], 
      image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSLImc-4IYqjEFEUpfZjhsGS_JtQKwbqAdDjvmm-m0uh_LM1E1D23PKw9eavy9CYvfGTs9CFhx5Yzlse04"
  },
  {
      name: "Hyderabadi Chicken Biryani",
      category: "Lunch",
      cookTime: "60 mins",
      description: "An aromatic masterpiece of marinating tender chicken layered with parboiled basmati rice, slow-cooked on 'Dum' for maximum flavor explosion.",
      steps: [
          "Wash premium long-grain Basmati rice thoroughly under cold running water until the starch clears out completely, then soak it in clean water for at least 30 minutes.",
          "Slice red onions ultra-thin and deep-fry them in hot oil on a medium flame until they transform into uniformly crisp, sweet, golden-brown birista (fried onions).",
          "Marinate bone-in chicken pieces in a heavy-bottomed pot with thick yogurt, ginger-garlic paste, green chilies, red chili powder, garam masala, fresh mint, coriander, and a handful of the fried onions for 2 hours.",
          "Bring a massive pot of water to a roaring boil along with whole spices (cinnamon, green cardamom, cloves, and bay leaves) and a generous handful of salt until it tastes like seawater.",
          "Drop the soaked rice into the boiling spiced water and parboil it just until it is 70% cooked (the grains should bend but still have a firm bite in the middle), then drain immediately.",
          "Spread the parboiled rice directly over the raw marinated chicken layer in the pot, scattering more fried onions, chopped mint, ghee, and saffron-infused warm milk over the surface.",
          "Seal the rim of the pot tightly with a layer of aluminum foil or wheat dough, cover with a heavy lid, and slow-cook on low heat (Dum) for 35-40 minutes so all the steam infuses into the rice grains."
      ],
      ingredients: ["Basmati rice", "Chicken", "Yogurt", "Onions", "Mint and Coriander leaves", "Saffron", "Whole spices"],
      image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTflxjmHAPEjQaI3zkwQ695lfZVyaYnLIS1u7c4SGDX3vD307E0yWXl6QaqAD51PvxTAc1IOqW0cwsrBoE"
  },
  {
      name: "Creamy White Sauce Pasta",
      category: "Snacks",
      cookTime: "25 mins",
      description: "Perfectly al dente pasta smothered in a rich, velvety smooth, cheesy Bechamel sauce loaded with vibrant bell peppers.",
      steps: [
          "Bring a large pot of water to a rolling boil with a tablespoon of salt, add Penne or Fusilli pasta, and cook until it hits perfect al dente consistency before draining and reserving a cup of pasta water.",
          "Heat a small splash of olive oil in a pan and saute finely chopped garlic alongside diced colorful bell peppers, sweet corn, and broccoli for 2-3 minutes until bright but still snappy.",
          "In a separate heavy-bottomed saucepan, melt an equal amount of unsalted butter over medium-low heat and stir in all-purpose flour cleanly to build a smooth roux base.",
          "Cook the flour-butter roux for exactly 1 minute until the raw smell fades out entirely, ensuring the mixture does not turn brown.",
          "Slowly pour in chilled whole milk in a steady stream while whisking continuously with your other hand to completely dissolve any flour lumps and form a smooth cream texture.",
          "Let the white sauce simmer gently until it thickens enough to coat the back of a wooden spoon, then season with salt, crushed black pepper, dried oregano, and red chili flakes.",
          "Stir in a generous handful of grated processed or mozzarella cheese, toss in the sautéed vegetables and boiled pasta, adding a splash of reserved pasta water if needed to loosen the glossy sauce."
      ],
      ingredients: ["Pasta", "Milk", "Butter", "All-purpose flour", "Bell peppers", "Cheese", "Italian seasoning"], 
      image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSSoXPnw6Uv6H2Tb7vdT6tqoh0EwFO24NSsmbkvhwBk7GR_NAnlPfJZGQnAZNqrrGYT4RS-H2OY8RBJVcw"
  }

];

const seedDB = async () => {
  try {
      await Recipe.deleteMany({ $or: [{ isSeed: true }, { userId: { $exists: false } }] });

      const seedData = seedRecipes.map(recipe => ({
          ...recipe,
          isSeed: true 
      }));

      await Recipe.insertMany(seedData);
      
      console.log("Seed complete! User recipes were preserved.");
  } catch (error) {
      console.error("Seeding error:", error);
  } finally {
      mongoose.connection.close();
  }
};

seedDB();