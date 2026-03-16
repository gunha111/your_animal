const CARE_PLANS = {
  dog: {
    morning: [
      { time: "7:00 AM", icon: "🌅", task: "Refresh water bowl", detail: "Start the day with fresh, clean water" },
      { time: "7:30 AM", icon: "🚶", task: "Morning walk (30 min)", detail: "Essential for burning energy and starting the day right" },
      { time: "8:00 AM", icon: "🍽️", task: "Morning meal", detail: "Feed the appropriate amount for their weight" },
    ],
    afternoon: [
      { time: "12:00 PM", icon: "💧", task: "Check & refill water", detail: "Make sure they're staying hydrated" },
      { time: "1:00 PM", icon: "🎾", task: "Indoor playtime (15 min)", detail: "Fetch, tug-of-war, or puzzle toys" },
    ],
    evening: [
      { time: "6:00 PM", icon: "🍽️", task: "Evening meal", detail: "Slightly smaller portion than morning" },
      { time: "7:00 PM", icon: "🚶", task: "Evening walk (40 min)", detail: "The most important walk of the day" },
      { time: "9:00 PM", icon: "🧴", task: "Wipe paws & brush coat", detail: "Clean up after outdoor time" },
      { time: "10:00 PM", icon: "🌙", task: "Bedtime prep", detail: "Check that their sleeping area is cozy and calm" },
    ],
    weekly: [
      { day: "Monday", icon: "🛁", task: "Ear cleaning", detail: "Gently clean inner ears with a cotton pad" },
      { day: "Wednesday", icon: "✂️", task: "Nail check", detail: "Trim if too long, or schedule a groomer" },
      { day: "Friday", icon: "🛁", task: "Bath", detail: "Use dog-specific shampoo only" },
      { day: "Sunday", icon: "🦷", task: "Teeth brushing", detail: "Use dog toothbrush and toothpaste" },
    ],
    monthly: [
      "Administer heartworm prevention medication",
      "Apply flea and tick prevention treatment",
      "Weight check — monitor for healthy weight",
      "Check food expiration dates and restock",
    ],
    tips: [
      "💡 Stick to consistent feeding times — twice a day works best",
      "💡 Always check paw pads after walks (cuts, debris, etc.)",
      "💡 Keep vaccination records handy for vet visits and dog parks",
      "💡 If your dog is panting heavily after play, give water and let them rest",
    ]
  },
  cat: {
    morning: [
      { time: "7:00 AM", icon: "💧", task: "Refresh water", detail: "Cats prefer fresh, clean water — change it daily" },
      { time: "8:00 AM", icon: "🍽️", task: "Morning meal (wet + dry)", detail: "A mix of wet and dry food is recommended" },
      { time: "8:30 AM", icon: "🧹", task: "Scoop litter box", detail: "Scoop at least twice a day" },
    ],
    afternoon: [
      { time: "2:00 PM", icon: "🎯", task: "Wand toy play (10 min)", detail: "Satisfy that hunting instinct" },
      { time: "3:00 PM", icon: "☀️", task: "Check sunny spot availability", detail: "Make sure they have access to their favorite sunbath spot" },
    ],
    evening: [
      { time: "6:00 PM", icon: "🍽️", task: "Evening meal", detail: "About 50% of their daily food amount" },
      { time: "8:00 PM", icon: "🎮", task: "Evening playtime (20 min)", detail: "Peak activity time for most cats" },
      { time: "9:00 PM", icon: "🧴", task: "Brushing", detail: "Reduces shedding and prevents hairballs" },
    ],
    weekly: [
      { day: "Tuesday", icon: "👁️", task: "Clean eye area", detail: "Gently remove discharge with a damp cotton pad" },
      { day: "Thursday", icon: "🦷", task: "Dental check", detail: "Look for tartar buildup and gum health" },
      { day: "Saturday", icon: "✂️", task: "Nail trim", detail: "Just clip the tips every 3–4 weeks" },
      { day: "Sunday", icon: "🧹", task: "Full litter box clean", detail: "Complete litter replacement and box wash" },
    ],
    monthly: [
      "Administer internal parasite prevention",
      "Apply flea and tick prevention",
      "Weight check — watch for sudden changes",
      "Check litter supply and restock as needed",
    ],
    tips: [
      "💡 Cats sleep 12–16 hours a day — that's totally normal",
      "💡 Litter box rule: one box per cat, plus one extra",
      "💡 Drinking less water can signal a urinary tract issue",
      "💡 Cat trees: the taller the better — cats love height",
    ]
  },
  rabbit: {
    morning: [
      { time: "7:00 AM", icon: "🌿", task: "Unlimited timothy hay — check supply", detail: "Hay should make up 80% of a rabbit's diet" },
      { time: "7:30 AM", icon: "💧", task: "Refresh water", detail: "Change daily with fresh water" },
      { time: "8:00 AM", icon: "🥦", task: "Morning veggies (small portion)", detail: "Romaine, bok choy, parsley work well" },
    ],
    afternoon: [
      { time: "2:00 PM", icon: "🏃", task: "Free roam time (1 hour)", detail: "Let them run freely in a safe enclosed area" },
      { time: "3:00 PM", icon: "🎮", task: "Tunnel or toy time", detail: "Mental stimulation is just as important as physical" },
    ],
    evening: [
      { time: "6:00 PM", icon: "🌿", task: "Top up the hay", detail: "Always keep it fully stocked" },
      { time: "7:00 PM", icon: "🥬", task: "Evening veggies + pellets", detail: "A small amount of pellets plus a different veggie from morning" },
      { time: "9:00 PM", icon: "🧹", task: "Clean litter box", detail: "Scoop paper or hay-based litter" },
    ],
    weekly: [
      { day: "Monday", icon: "✂️", task: "Nail check", detail: "Trim every 4–6 weeks on average" },
      { day: "Wednesday", icon: "🧴", task: "Brushing (long-haired breeds)", detail: "Prevents matting and tangles" },
      { day: "Friday", icon: "👁️", task: "Eye, ear, and nose check", detail: "Look for unusual discharge or changes" },
      { day: "Sunday", icon: "🏠", task: "Full enclosure clean", detail: "Replace bedding and disinfect" },
    ],
    monthly: [
      "Parasite prevention (vet-prescribed)",
      "Weight check",
      "Dental check — watch for overgrown or misaligned teeth",
      "Restock hay and pellets",
    ],
    tips: [
      "💡 If your rabbit stops eating hay, that's an emergency — dental issues or stress",
      "💡 Carrots are a treat — limit to a thumb-size piece per day",
      "💡 Rabbits can get depressed alone — consider adopting a bonded pair",
      "💡 When a rabbit grinds their teeth softly, they're content — like a cat purring",
    ]
  },
  hamster: {
    morning: [
      { time: "7:00 PM", icon: "🌙", task: "(Evening start!) Wake-up check", detail: "Hamsters are nocturnal — they get going in the evening" },
      { time: "7:30 PM", icon: "🍽️", task: "Evening meal", detail: "About 1 tablespoon of pellet and seed mix" },
      { time: "8:00 PM", icon: "💧", task: "Refresh water bottle", detail: "Swap out the water in their bottle daily" },
    ],
    afternoon: [
      { time: "9:00 AM", icon: "😴", task: "Daytime sleep — do not disturb", detail: "Sleeping during the day is completely normal for hamsters" },
      { time: "2:00 PM", icon: "🧹", task: "Clean litter area (quietly)", detail: "Tidy up while they sleep" },
    ],
    evening: [
      { time: "8:00 PM", icon: "🎡", task: "Check wheel condition", detail: "Make sure it spins smoothly and quietly" },
      { time: "9:00 PM", icon: "🥕", task: "Small treat (tiny portion)", detail: "A nibble of carrot or broccoli — nail-sized only" },
      { time: "10:00 PM", icon: "🎮", task: "Escape-proof check", detail: "Confirm cage latches are secure and there are no gaps" },
    ],
    weekly: [
      { day: "Monday", icon: "🧹", task: "Partial bedding change", detail: "Replace only smelly areas — preserve scent-marked spots" },
      { day: "Thursday", icon: "🍽️", task: "Food inventory check", detail: "Also check cheek pouch hoard for spoiled food" },
      { day: "Saturday", icon: "🏠", task: "Full cage clean", detail: "Complete bedding change every 2–3 weeks" },
      { day: "Sunday", icon: "⚖️", task: "Weight check", detail: "Track for sudden changes" },
    ],
    monthly: [
      "Oil wheel bearings if they squeak",
      "Nail check (vet visit if too long)",
      "Check front teeth length — watch for overgrowth",
      "Deep clean and disinfect cage thoroughly",
    ],
    tips: [
      "💡 Never wake a sleeping hamster — disrupted sleep is a major stress trigger",
      "💡 Get a silent wheel — nighttime spinning shouldn't wake you up",
      "💡 Ball time should be capped at 30 minutes max",
      "💡 Keep them solo — hamsters fight over territory",
    ]
  },
  fish: {
    morning: [
      { time: "8:00 AM", icon: "💡", task: "Turn on tank light", detail: "Consistent light cycle is essential — 8–10 hours of light per day" },
      { time: "8:30 AM", icon: "🌡️", task: "Check water temperature", detail: "Tropical fish: 75–82°F · Goldfish: 65–72°F" },
      { time: "9:00 AM", icon: "🍽️", task: "Morning feeding (small amount)", detail: "Only as much as they can eat in 3 minutes" },
    ],
    afternoon: [
      { time: "1:00 PM", icon: "👁️", task: "Observe behavior", detail: "Watch for unusual swimming, color changes, or fin issues" },
      { time: "2:00 PM", icon: "💧", task: "Visual water quality check", detail: "Cloudiness or excess foam signals a water quality problem" },
    ],
    evening: [
      { time: "6:00 PM", icon: "🍽️", task: "Evening feeding", detail: "Twice a day is ideal — avoid overfeeding" },
      { time: "8:00 PM", icon: "🔦", task: "Turn off tank light", detail: "Consistent lights-off time maintains their biological clock" },
      { time: "9:00 PM", icon: "🔇", task: "Minimize noise and vibration nearby", detail: "Loud sounds near the tank stress fish" },
    ],
    weekly: [
      { day: "Tuesday", icon: "💧", task: "25–30% water change", detail: "Check carbon filter condition while you're at it" },
      { day: "Thursday", icon: "🧪", task: "Water quality test", detail: "Test ammonia, nitrite, and pH levels" },
      { day: "Saturday", icon: "🪟", task: "Scrub tank glass", detail: "Remove algae with a scraper" },
      { day: "Sunday", icon: "🔧", task: "Filter check", detail: "Rinse filter media in tank water (NOT tap water)" },
    ],
    monthly: [
      "Inspect and replace filter media as needed",
      "Check heater is functioning properly",
      "Verify aeration is working well",
      "Vacuum substrate with a gravel siphon",
    ],
    tips: [
      "💡 Underfeeding is better than overfeeding — 80% of water issues come from excess food",
      "💡 Never use tap water directly — use a water conditioner or let it sit 24 hours first",
      "💡 Quarantine new fish for 1–2 weeks before adding them to the main tank",
      "💡 If fish are hanging near the surface, it usually means low oxygen",
    ]
  },
  parrot: {
    morning: [
      { time: "7:00 AM", icon: "🌅", task: "Remove cage cover & say good morning", detail: "Parrots love a greeting — they'll respond!" },
      { time: "7:30 AM", icon: "🍽️", task: "Serve breakfast", detail: "Pellets plus a fresh fruit and veggie mix" },
      { time: "8:00 AM", icon: "💧", task: "Refresh water + offer bath opportunity", detail: "A light mist from a spray bottle is usually welcomed" },
    ],
    afternoon: [
      { time: "1:00 PM", icon: "🎓", task: "Training session (15 min)", detail: "Practice step-ups, name recall, and new tricks" },
      { time: "2:00 PM", icon: "🎵", task: "Play some music", detail: "Classical or nature sounds are favorites" },
      { time: "3:00 PM", icon: "🧩", task: "Rotate toys", detail: "Keep things fresh to prevent boredom" },
    ],
    evening: [
      { time: "6:00 PM", icon: "🍽️", task: "Evening meal", detail: "Remove leftovers from earlier and add fresh food" },
      { time: "7:00 PM", icon: "🤝", task: "Bonding time (30 min)", detail: "The most important part of your parrot's day!" },
      { time: "8:00 PM", icon: "🌙", task: "Cover cage & lights out", detail: "Parrots need 10–12 hours of sleep" },
    ],
    weekly: [
      { day: "Monday", icon: "🧹", task: "Deep clean cage floor", detail: "Remove all dropped food and droppings" },
      { day: "Wednesday", icon: "✂️", task: "Check nails and beak", detail: "Vet visit if either looks too long" },
      { day: "Friday", icon: "🛁", task: "Full cage wash", detail: "Scrub with mild dish soap, rinse thoroughly, dry completely" },
      { day: "Sunday", icon: "🎾", task: "Add new toy or perch variety", detail: "Environmental enrichment is key for mental health" },
    ],
    monthly: [
      "Vet health check (twice yearly recommended)",
      "Check feather condition — look for abnormal molting or color changes",
      "Review food and treat supply",
      "Disinfect food cups and perches",
    ],
    tips: [
      "💡 Long hours alone can cause depression in parrots — they need social time",
      "💡 Avocado, chocolate, and onion are toxic — keep them away",
      "💡 Be careful what words you teach — they will repeat them in front of guests 😅",
      "💡 Stress signs: feather plucking, excessive screaming, or loss of appetite",
    ]
  },
  guinea_pig: {
    morning: [
      { time: "7:30 AM", icon: "🥬", task: "Morning veggies", detail: "Romaine, parsley, and bell pepper for vitamin C" },
      { time: "8:00 AM", icon: "🌿", task: "Top up timothy hay", detail: "Unlimited hay is non-negotiable" },
      { time: "8:30 AM", icon: "💧", task: "Refresh water bottle", detail: "Change daily" },
    ],
    afternoon: [
      { time: "2:00 PM", icon: "🏃", task: "Exercise time (1 hour)", detail: "Let them roam freely in a larger safe space" },
      { time: "3:00 PM", icon: "🎮", task: "Socialization time", detail: "Pet them, hold them — this builds trust" },
    ],
    evening: [
      { time: "6:00 PM", icon: "🥦", task: "Evening veggies", detail: "Offer a different vegetable than this morning" },
      { time: "7:00 PM", icon: "🌿", task: "Confirm hay supply", detail: "Make sure there's plenty left" },
      { time: "9:00 PM", icon: "🧹", task: "Litter box clean", detail: "Scoop paper or wood pellet litter" },
    ],
    weekly: [
      { day: "Monday", icon: "✂️", task: "Nail check", detail: "Trim every 3–4 weeks" },
      { day: "Wednesday", icon: "🧴", task: "Brush their coat", detail: "Daily for long-haired breeds, weekly for short-haired" },
      { day: "Friday", icon: "👁️", task: "Eye, nose, ear check", detail: "Look for discharge or any unusual changes" },
      { day: "Sunday", icon: "🏠", task: "Full enclosure clean", detail: "Replace all bedding and disinfect the cage" },
    ],
    monthly: [
      "Dental check — watch for misaligned teeth",
      "Weight check",
      "Parasite prevention (vet-prescribed)",
      "Restock food and hay supply",
    ],
    tips: [
      "💡 That loud 'wheek wheek' sound? It means they're happy to see you!",
      "💡 Guinea pigs can't make their own vitamin C — bell pepper is essential",
      "💡 Two guinea pigs are significantly happier than one — consider a pair",
      "💡 If they suddenly stop eating, see a vet immediately — GI stasis is dangerous",
    ]
  },
  turtle: {
    morning: [
      { time: "8:00 AM", icon: "💡", task: "Turn on UV-B lamp", detail: "10–12 hours of UV exposure per day is required" },
      { time: "8:30 AM", icon: "🌡️", task: "Check water and air temperature", detail: "Water: 77°F · Basking zone: 86–95°F" },
      { time: "9:00 AM", icon: "🍽️", task: "Feed (every other day)", detail: "Daily for juveniles, every other day for adults" },
    ],
    afternoon: [
      { time: "1:00 PM", icon: "☀️", task: "Monitor basking behavior", detail: "They need time under the heat lamp to regulate body temp" },
      { time: "2:00 PM", icon: "👁️", task: "Behavioral observation", detail: "Watch for lethargy, appetite loss, or eye cloudiness" },
    ],
    evening: [
      { time: "8:00 PM", icon: "💡", task: "Turn off UV-B lamp", detail: "Consistent light/dark cycle is important" },
      { time: "8:30 PM", icon: "🌡️", task: "Check nighttime temperature", detail: "Maintain above 68°F at night" },
    ],
    weekly: [
      { day: "Tuesday", icon: "💧", task: "30% water change", detail: "Check carbon filter replacement schedule" },
      { day: "Thursday", icon: "🧪", task: "Water quality test", detail: "Test ammonia and pH" },
      { day: "Saturday", icon: "🧹", task: "Clean land area", detail: "Remove droppings and debris from dry zone" },
      { day: "Sunday", icon: "🔧", task: "Filter inspection", detail: "Check filtration strength" },
    ],
    monthly: [
      "Check UV-B bulb — replace every 6–12 months even if still lit",
      "Monitor weight and shell growth",
      "Check for hibernation readiness (land tortoises)",
      "Restock food supply",
    ],
    tips: [
      "💡 No UV-B means metabolic bone disease — this is non-negotiable",
      "💡 If a turtle stops eating, low temperature is often the culprit",
      "💡 Never feed wild-caught insects — parasite risk is high",
      "💡 When they start coming toward your hand, trust has been established!",
    ]
  },
  ferret: {
    morning: [
      { time: "7:00 AM", icon: "🌅", task: "Wake-up check & greeting", detail: "Ferrets sleep 18 hours a day and are active for about 6" },
      { time: "7:30 AM", icon: "🍽️", task: "Food top-up (free feeding)", detail: "High-protein, high-fat ferret-specific kibble" },
      { time: "8:00 AM", icon: "💧", task: "Refresh water bottle", detail: "Change daily" },
    ],
    afternoon: [
      { time: "3:00 PM", icon: "🎮", task: "Playtime (1–2 hours)", detail: "Tunnels, balls, and hide-and-seek games" },
      { time: "4:00 PM", icon: "🏃", task: "Free roam in safe space", detail: "Verify ferret-proofing before letting them loose" },
    ],
    evening: [
      { time: "7:00 PM", icon: "🎯", task: "Trick training (10 min)", detail: "Positive reinforcement training using treats" },
      { time: "8:00 PM", icon: "🛁", task: "Weekly bath check", detail: "Don't over-bathe — it dries out their skin" },
      { time: "9:00 PM", icon: "🌙", task: "Bedtime setup", detail: "Confirm hammock or sleep nook is clean and accessible" },
    ],
    weekly: [
      { day: "Monday", icon: "👂", task: "Ear cleaning", detail: "Gently wipe brown wax with a cotton swab" },
      { day: "Wednesday", icon: "✂️", task: "Nail trim", detail: "Every 2 weeks is a good routine" },
      { day: "Friday", icon: "🛁", task: "Bath", detail: "Use ferret-specific shampoo only" },
      { day: "Sunday", icon: "🧹", task: "Full cage clean", detail: "Wash hammocks, replace bedding, clean toys" },
    ],
    monthly: [
      "Administer heartworm prevention",
      "Check flea and tick prevention is current",
      "Weight check — monitor for obesity",
      "Inspect toys for small pieces they could swallow",
    ],
    tips: [
      "💡 Ferrets love sugar but it's extremely dangerous — insulinoma risk is real",
      "💡 The 'war dance' (spinning and bouncing) means they're having the time of their life!",
      "💡 Strong chemical scents — air fresheners, candles — irritate their respiratory system",
      "💡 A group of ferrets is called a 'business' — they're happier with friends",
    ]
  },
  hedgehog: {
    morning: [
      { time: "9:00 PM", icon: "🌙", task: "(Night start!) Wake-up check", detail: "Hedgehogs are nocturnal — evenings are their daytime" },
      { time: "9:30 PM", icon: "🍽️", task: "Evening meal", detail: "Hedgehog-specific food or high-quality cat kibble" },
      { time: "10:00 PM", icon: "💧", task: "Refresh water bottle", detail: "Change daily" },
    ],
    afternoon: [
      { time: "10:00 AM", icon: "😴", task: "Daytime sleep — no interruptions", detail: "Sleeping during the day is totally normal" },
      { time: "2:00 PM", icon: "🌡️", task: "Temperature check", detail: "Maintain 73–84°F — too cold triggers hibernation attempts" },
    ],
    evening: [
      { time: "8:00 PM", icon: "🏃", task: "Check wheel condition", detail: "Hedgehogs can run 3–5 miles a night — wheel must be solid" },
      { time: "10:00 PM", icon: "🎮", task: "Handling and socialization", detail: "Wear gloves and take it slow — build trust gradually" },
      { time: "11:00 PM", icon: "👁️", task: "Health observation", detail: "Check appetite, droppings, and activity level" },
    ],
    weekly: [
      { day: "Tuesday", icon: "🦶", task: "Foot cleaning", detail: "Wheel droppings can build up on their feet" },
      { day: "Thursday", icon: "✂️", task: "Nail check", detail: "Trim every 3–4 weeks" },
      { day: "Saturday", icon: "🛁", task: "Bath (optional)", detail: "Gently scrub with a soft toothbrush, dry thoroughly" },
      { day: "Sunday", icon: "🏠", task: "Full cage clean", detail: "Replace bedding and scrub the wheel" },
    ],
    monthly: [
      "Weight check — watch for obesity (make sure the wheel is being used)",
      "Dental check — gum disease is common in hedgehogs",
      "Spine condition check — watch for unusual quill loss",
      "Inspect all cage equipment",
    ],
    tips: [
      "💡 If a hedgehog goes limp and cold, it's attempted hibernation — warm them up immediately",
      "💡 'Anointing' — covering themselves in frothy saliva — is completely normal behavior",
      "💡 Handling at the same time each evening speeds up bonding significantly",
      "💡 Avocado, grapes, and seeds are toxic — keep these away from them",
    ]
  }
};
