// ==UserScript==
// @name         scm-helper
// @namespace    tf2-helper
// @version      0.4.11
// @description  adds verious links and indcators for tf2 listings
// @match        https://steamcommunity.com/market/*
// @match        https://steamcommunity.com/market/listings/440/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      pricedb.io
// @connect      sku.pricedb.io
// ==/UserScript==
(function () {
    'use strict';
const WEAPON_INDEX_MAP = {
    "Bat": 190,
    "Bottle": 191,
    "Fire Axe": 192,
    "Kukri": 193,
    "Knife": 194,
    "Fists": 195,
    "Shovel": 196,
    "Wrench": 197,
    "Bonesaw": 198,
    "Shotgun": 199,
    "Scattergun": 200,
    "Sniper Rifle": 201,
    "Minigun": 202,
    "SMG": 203,
    "Rocket Launcher": 205, // [cite: 1]
    "Grenade Launcher": 206, // [cite: 1]
    "Stickybomb Launcher": 207, // [cite: 2]
    "Flame Thrower": 208, // [cite: 2]
    "Pistol": 209, // [cite: 2]
    "Revolver": 210, // [cite: 2]
    "Medi Gun": 211, // [cite: 2]
    "Kritzkrieg": 35, // [cite: 2]
    "Blutsauger": 36, // [cite: 2]
    "Übersaw": 37, // [cite: 2]
    "Axtinguisher": 38, // [cite: 2]
    "Flare Gun": 39, // [cite: 2]
    "Backburner": 40, // [cite: 2]
    "Natascha": 41, // [cite: 2]
    "Killing Gloves of Boxing": 43, // [cite: 2]
    "Sandman": 44, // [cite: 2]
    "Force-a-Nature": 45, // [cite: 2]
    "Huntsman": 56, // [cite: 2]
    "Ambassador": 61, // [cite: 3]
    "Direct Hit": 127, // [cite: 3]
    "Equalizer": 128, // [cite: 3]
    "Scottish Resistance": 130, // [cite: 3]
    "Eyelander": 132, // [cite: 3]
    "Wrangler": 140, // [cite: 3]
    "Homewrecker": 153, // [cite: 3]
    "Pain Train": 154, // [cite: 3]
    "Southern Hospitality": 155, // [cite: 3]
    "Tribalman's Shiv": 171, // [cite: 3]
    "Scotsman's Skullcutter": 172, // [cite: 3]
    "Vita-Saw": 173, // [cite: 3]
    "Powerjack": 214, // [cite: 3]
    "Degreaser": 215, // [cite: 3]
    "Shortstop": 220, // [cite: 3]
    "Holy Mackerel": 221, // [cite: 3]
    "L'Etranger": 224, // [cite: 4]
    "Your Eternal Reward": 225, // [cite: 4]
    "Black Box": 228, // [cite: 4]
    "Sydney Sleeper": 230, // [cite: 4]
    "Bushwacka": 232, // [cite: 4]
    "Rocket Jumper": 237, // [cite: 4]
    "Gloves of Running Urgently": 239, // [cite: 4]
    "Frying Pan": 264, // [cite: 4]
    "Stickybomb Jumper": 265, // [cite: 4]
    "Amputator": 304, // [cite: 4]
    "Crusader's Crossbow": 305, // [cite: 4]
    "Ullapool Caber": 307, // [cite: 4]
    "Loch-n-Load": 308, // [cite: 4]
    "Brass Beast": 312, // [cite: 4]
    "Candy Cane": 317, // [cite: 4]
    "Boston Basher": 325, // [cite: 5]
    "Back Scratcher": 326, // [cite: 5]
    "Claidheamh Mòr": 327, // [cite: 5]
    "Jag": 329, // [cite: 5]
    "Fists of Steel": 331, // [cite: 5]
    "Sharpened Volcano Fragment": 348,
    "Sun-on-a-Stick": 349, // [cite: 5]
    "Detonator": 351, // [cite: 5]
    "Fan O'War": 355, // [cite: 5]
    "Conniver's Kunai": 356, // [cite: 5]
    "Shahanshah": 401, // [cite: 5]
    "Bazaar Bargain": 402, // [cite: 5]
    "Persian Persuader": 404, // [cite: 5]
    "Quick-Fix": 411, // [cite: 5]
    "Overdose": 412, // [cite: 5]
    "Solemn Vow": 413, // [cite: 5, 6]
    "Liberty Launcher": 414, // [cite: 6]
    "Reserve Shooter": 415, // [cite: 6]
    "Market Gardener": 416, // [cite: 6]
    "Saxxy": 423, // [cite: 6]
    "Tomislav": 424, // [cite: 6]
    "Family Business": 425, // [cite: 6]
    "Cow Mangler 5000": 441, // [cite: 6]
    "Righteous Bison": 442, // [cite: 6]
    "Disciplinary Action": 447, // [cite: 6]
    "Soda Popper": 448, // [cite: 6]
    "Winger": 449, // [cite: 6]
    "Three-Rune Blade": 452, // [cite: 6]
    "Postal Pummeler": 457, // [cite: 6]
    "Enforcer": 460, // [cite: 6]
    "Big Earner": 461, // [cite: 6]
    "Maul": 466, // [cite: 7]
    "Conscientious Objector": 474, // [cite: 7]
    "Nessie's Nine Iron": 482, // [cite: 7]
    "Original": 513, // [cite: 7]
    "Diamondback": 525, // [cite: 7]
    "Machina": 526, // [cite: 7]
    "Widowmaker": 527, // [cite: 7]
    "Unarmed Combat": 572, // [cite: 7]
    "Wanga Prick": 574, // [cite: 7]
    "Apoco-Fists": 587, // [cite: 7]
    "Eureka Effect": 589, // [cite: 7]
    "Third Degree": 593, // [cite: 7]
    "Phlogistinator": 594, // [cite: 7]
    "Manmelter": 595, // [cite: 7]
    "Scottish Handshake": 609, // [cite: 7]
    "Sharp Dresser": 638, // [cite: 7, 8]
    "Wrap Assassin": 648, // [cite: 8]
    "Spy-Cicle": 649, // [cite: 8]
    "Black Rose": 727, // [cite: 8]
    "Beggar's Bazooka": 730, // [cite: 8]
    "Sapper": 735, // [cite: 8]
    "Scorch Shot": 740, // [cite: 8]
    "Cleaner's Carbine": 751, // [cite: 8]
    "Hitman's Heatmaker": 752, // [cite: 8]
    "Baby Face's Blaster": 772, // [cite: 8]
    "Escape Plan": 775, // [cite: 8]
    "AWPer Hand": 851, // [cite: 8]
    "Freedom Staff": 880, // [cite: 8]
    "Bat Outta Hell": 939, // [cite: 8]
    "Loose Cannon": 996, // [cite: 8]
    "Rescue Ranger": 997, // [cite: 9]
    "Vaccinator": 998, // [cite: 9]
    "Ham Shank": 1013, // [cite: 9]
    "Fortified Compound": 1092, // [cite: 9]
    "Classic": 1098, // [cite: 9]
    "Back Scatter": 1103, // [cite: 9]
    "Air Strike": 1104, // [cite: 9]
    "Necro Smasher": 1123, // [cite: 9]
    "Crossing Guard": 1127, // [cite: 9]
    "Quickiebomb Launcher": 1150, // [cite: 9]
    "Iron Bomber": 1151, // [cite: 9]
    "Panic Attack": 1153, // [cite: 9]
    "Dragon's Fury": 1178,
    "Nostromo Napalmer": 30474,
    "Iron Curtain" : 298,
    "Lugermorph" : 298,
    "Frontier Justice" : 141,
    "Half-Zatoichi" : 357,
    "Gunslinger" : 142,
    "Shooting Star" : 30665,
    "Huo-Long Heater" : 811,
};
    const EFFECT_MAP = {
                    "Invalid Particle": 0,
                    "Particle 1": 1,
                    "Flying Bits": 2,
                    "Nemesis Burst": 3,
                    "Community Sparkle": 4,
                    "Green Confetti": 6,
                    "Purple Confetti": 7,
                    "Haunted Ghosts": 8,
                    "Green Energy": 9,
                    "Purple Energy": 10,
                    "Circling TF Logo": 11,
                    "Massed Flies": 12,
                    "Burning Flames": 13,
                    "Scorching Flames": 14,
                    "Searing Plasma": 15,
                    "Vivid Plasma": 16,
                    "Sunbeams": 17,
                    "Circling Peace Sign": 18,
                    "Circling Heart": 19,
                    "Map Stamps": 20,
                    "Genteel Smoke": 28,
                    "Stormy Storm": 29,
                    "Blizzardy Storm": 30,
                    "Nuts n' Bolts": 31,
                    "Orbiting Planets": 32,
                    "Orbiting Fire": 33,
                    "Bubbling": 34,
                    "Smoking": 35,
                    "Steaming": 36,
                    "Flaming Lantern": 37,
                    "Cloudy Moon": 38,
                    "Cauldron Bubbles": 39,
                    "Eerie Orbiting Fire": 40,
                    "Knifestorm": 43,
                    "Misty Skull": 44,
                    "Harvest Moon": 45,
                    "It's a Secret to Everybody": 46,
                    "Stormy 13th Hour": 47,
                    "Kill-a-Watt": 56,
                    "Terror-Watt": 57,
                    "Cloud 9": 58,
                    "Aces High": 59,
                    "Dead Presidents": 60,
                    "Miami Nights": 61,
                    "Disco Beat Down": 62,
                    "Phosphorous": 63,
                    "Sulphurous": 64,
                    "Memory Leak": 65,
                    "Overclocked": 66,
                    "Electrostatic": 67,
                    "Power Surge": 68,
                    "Anti-Freeze": 69,
                    "Time Warp": 70,
                    "Green Black Hole": 71,
                    "Roboactive": 72,
                    "Arcana": 73,
                    "Spellbound": 74,
                    "Chiroptera Venenata": 75,
                    "Poisoned Shadows": 76,
                    "Something Burning This Way Comes": 77,
                    "Hellfire": 78,
                    "Darkblaze": 79,
                    "Demonflame": 80,
                    "Bonzo the All-Gnawing": 81,
                    "Amaranthine": 82,
                    "Stare from Beyond": 83,
                    "The Ooze": 84,
                    "Ghastly Ghosts Jr": 85,
                    "Haunted Phantasm Jr": 86,
                    "Frostbite": 87,
                    "Molten Mallard": 88,
                    "Morning Glory": 89,
                    "Death at Dusk": 90,
                    "Abduction": 91,
                    "Atomic": 92,
                    "Subatomic": 93,
                    "Electric Hat Protector": 94,
                    "Magnetic Hat Protector": 95,
                    "Voltaic Hat Protector": 96,
                    "Galactic Codex": 97,
                    "Ancient Codex": 98,
                    "Nebula": 99,
                    "Death by Disco": 100,
                    "It's a Mystery to Everyone": 101,
                    "It's a Puzzle to Me": 102,
                    "Ether Trail": 103,
                    "Nether Trail": 104,
                    "Ancient Eldritch": 105,
                    "Eldritch Flame": 106,
                    "Neutron Star": 107,
                    "Tesla Coil": 108,
                    "Starstorm Insomnia": 109,
                    "Starstorm Slumber": 110,
                    "Brain Drain": 111,
                    "Open Mind": 112,
                    "Head of Steam": 113,
                    "Galactic Gateway": 114,
                    "The Eldritch Opening": 115,
                    "The Dark Doorway": 116,
                    "Ring of Fire": 117,
                    "Vicious Circle": 118,
                    "White Lightning": 119,
                    "Omniscient Orb": 120,
                    "Clairvoyance": 121,
                    "Fifth Dimension": 122,
                    "Vicious Vortex": 123,
                    "Menacing Miasma": 124,
                    "Abyssal Aura": 125,
                    "Wicked Wood": 126,
                    "Ghastly Grove": 127,
                    "Mystical Medley": 128,
                    "Ethereal Essence": 129,
                    "Twisted Radiance": 130,
                    "Violet Vortex": 131,
                    "Verdant Vortex": 132,
                    "Valiant Vortex": 133,
                    "Sparkling Lights": 134,
                    "Frozen Icefall": 135,
                    "Fragmented Gluons": 136,
                    "Fragmented Quarks": 137,
                    "Fragmented Photons": 138,
                    "Defragmenting Reality": 139,
                    "Fragmenting Reality": 141,
                    "Refragmenting Reality": 142,
                    "Snowfallen": 143,
                    "Snowblinded": 144,
                    "Pyroland Daydream": 145,
                    "Verdatica": 147,
                    "Aromatica": 148,
                    "Chromatica": 149,
                    "Prismatica": 150,
                    "Bee Swarm": 151,
                    "Frisky Fireflies": 152,
                    "Smoldering Spirits": 153,
                    "Wandering Wisps": 154,
                    "Kaleidoscope": 155,
                    "Green Giggler": 156,
                    "Laugh-O-Lantern": 157,
                    "Plum Prankster": 158,
                    "Pyroland Nightmare": 159,
                    "Gravelly Ghoul": 160,
                    "Vexed Volcanics": 161,
                    "Gourdian Angel": 162,
                    "Pumpkin Party": 163,
                    "Frozen Fractals": 164,
                    "Lavender Landfall": 165,
                    "Special Snowfall": 166,
                    "Divine Desire": 167,
                    "Distant Dream": 168,
                    "Violent Wintertide": 169,
                    "Blighted Snowstorm": 170,
                    "Pale Nimbus": 171,
                    "Genus Plasmos": 172,
                    "Serenus Lumen": 173,
                    "Ventum Maris": 174,
                    "Mirthful Mistletoe": 175,
                    "Resonation": 177,
                    "Aggradation": 178,
                    "Lucidation": 179,
                    "Stunning": 180,
                    "Ardentum Saturnalis": 181,
                    "Fragrancium Elementalis": 182,
                    "Reverium Irregularis": 183,
                    "Perennial Petals": 185,
                    "Flavorsome Sunset": 186,
                    "Raspberry Bloom": 187,
                    "Iridescence": 188,
                    "Tempered Thorns": 189,
                    "Devilish Diablo": 190,
                    "Severed Serration": 191,
                    "Shrieking Shades": 192,
                    "Restless Wraiths": 193,
                    "Infernal Wraith": 195,
                    "Phantom Crown": 196,
                    "Ancient Specter": 197,
                    "Viridescent Peeper": 198,
                    "Eyes of Molten": 199,
                    "Ominous Stare": 200,
                    "Pumpkin Moon": 201,
                    "Frantic Spooker": 202,
                    "Frightened Poltergeist": 203,
                    "Energetic Haunter": 204,
                    "Smissmas Tree": 205,
                    "Hospitable Festivity": 206,
                    "Condescending Embrace": 207,
                    "Sparkling Spruce": 209,
                    "Glittering Juniper": 210,
                    "Prismatic Pine": 211,
                    "Spiraling Lights": 212,
                    "Twisting Lights": 213,
                    "Stardust Pathway": 214,
                    "Flurry Rush": 215,
                    "Spark of Smissmas": 216,
                    "Polar Forecast": 218,
                    "Shining Stag": 219,
                    "Holiday Horns": 220,
                    "Ardent Antlers": 221,
                    "Festive Lights": 223,
                    "Crustacean Sensation": 224,
                    "Frosted Decadence": 226,
                    "Sprinkled Delights": 228,
                    "Terrestrial Favor": 229,
                    "Tropical Thrill": 230,
                    "Flourishing Passion": 231,
                    "Dazzling Fireworks": 232,
                    "Blazing Fireworks": 233,
                    "Shimmering Fireworks": 234,
                    "Twinkling Fireworks": 235,
                    "Sparkling Fireworks": 236,
                    "Glowing Fireworks": 237,
                    "Glimmering Fireworks": 238,
                    "Flying Lights": 239,
                    "Limelight": 241,
                    "Shining Star": 242,
                    "Cold Cosmos": 243,
                    "Refracting Fractals": 244,
                    "Startrance": 245,
                    "Starlush": 247,
                    "Starfire": 248,
                    "Stardust": 249,
                    "Contagious Eruption": 250,
                    "Daydream Eruption": 251,
                    "Volcanic Eruption": 252,
                    "Divine Sunlight": 253,
                    "Audiophile": 254,
                    "Soundwave": 255,
                    "Synesthesia": 256,
                    "Haunted Kraken": 257,
                    "Eerie Kraken": 258,
                    "Soulful Slice": 259,
                    "Horsemann's Hack": 260,
                    "Haunted Forever!": 261,
                    "Forever and Forever!": 263,
                    "Cursed Forever!": 264,
                    "Moth Plague": 265,
                    "Malevolent Monoculi": 266,
                    "Haunted Wick": 267,
                    "Wicked Wick": 269,
                    "Spectral Wick": 270,
                    "Musical Maelstrom": 271,
                    "Verdant Virtuoso": 272,
                    "Silver Serenade": 273,
                    "Cosmic Constellations": 274,
                    "Dazzling Constellations": 276,
                    "Tainted Frost": 277,
                    "Starlight Haze": 278,
                    "Hard Carry": 279,
                    "Jellyfish Field": 281,
                    "Jellyfish Hunter": 283,
                    "Jellyfish Jam": 284,
                    "Global Clusters": 285,
                    "Celestial Starburst": 286,
                    "Sylicone Succiduous": 287,
                    "Sakura Smoke Bomb": 288,
                    "Treasure Trove": 289,
                    "Bubble Breeze": 290,
                    "Fireflies": 291,
                    "Mountain Halo": 292,
                    "Celestial Summit": 293,
                    "Stellar Ascent": 294,
                    "Sapped": 295,
                    "Hellspawned Horns": 297,
                    "Demonic Impaler": 299,
                    "Revenant's Rack": 300,
                    "Sixth Sense": 301,
                    "Amygdala": 303,
                    "The Bone Zone": 304,
                    "Arachne's Web": 305,
                    "Acidic Climate": 306,
                    "Otherworldly Weather": 307,
                    "Nightmarish Storm": 308,
                    "Icestruck": 309,
                    "Goldstruck": 311,
                    "Radiant Rivalry": 312,
                    "Radiant Legacy": 314,
                    "Frosty Flavours": 315,
                    "Mint Frost": 317,
                    "North Star": 318,
                    "Prettiest Star": 320,
                    "Festive Falling Star": 321,
                    "Lunar Lights": 322,
                    "Fairy Lights": 324,
                    "Natural Lights": 325,
                    "Loyalist's Coronet": 327,
                    "Knight's Prideful Spirit": 329,
                    "Baron's Cherished Chaplet": 330,
                    "Lure of the Deep": 331,
                    "Violent Viridian": 333,
                    "Magenta Monstrum": 334,
                    "Rainbow Reverie": 335,
                    "Cuban Smoke": 336,
                    "Melting Mohawk": 337,
                    "Scorched Scalp": 339,
                    "Ignited Crest": 340,
                    "Rare Shine": 341,
                    "Distant Drift": 342,
                    "Warp Drive": 344,
                    "Overdrive": 345,
                    "Butterfly Season": 346,
                    "Psycho-Delic": 348,
                    "Bewitching Bugs": 349,
                    "Spectral Fire": 350,
                    "Galactic Flame": 351,
                    "Revived Recharge": 352,
                    "Undead Electricity": 353,
                    "Frankencharged": 354,
                    "Phantom Plague": 355,
                    "Haunting Haze": 356,
                    "Vicious Vampires": 357,
                    "Ravenous Ravens": 358,
                    "Delightful Doves": 359,
                    "Searing Stove": 360,
                    "Über Blaze": 362,
                    "Sizzling": 364,
                    "Crystal Crown": 365,
                    "Halcyon Halo": 367,
                    "Ghosts of Smissmas Time": 368,
                    "Aurora Skies": 369,
                    "Shining Bokeh": 370,
                    "Playful Aurora": 371,
                    "Frisky Morning": 372,
                    "Drunkard": 373,
                    "Blades of Betrayal": 374,
                    "Death's Daggers": 376,
                    "Fully Charged": 377,
                    "Overcharged": 379,
                    "Piercing Headache": 380,
                    "Decimating Wind": 381,
                    "Ocean Swirl": 382,
                    "Toxic Swirl": 384,
                    "Candle Flame": 385,
                    "Sizzling Aroma": 387,
                    "Toxic Aroma": 389,
                    "Current Conductor": 390,
                    "Sandy": 392,
					"Chromatic Blaze":393,
					"Frostfire":394,
					"Spectrum Inferno":395,
					"Calm Snowfall":396,
					"Team Recognition":397,
					"Old Hire":399,
					"Analog Fortress":401,
					"Winter Whiteout":402,
					"Midnight Frostfall":403,
					"Twilight Snowfall":404,
					"Cryogenic":405,
                    "Hot": 701,
                    "Isotope": 702,
                    "Cool": 703,
                    "Energy Orb": 704,
                    "Showstopper": 3001,
                    "Holy Grail": 3003,
                    "'72": 3004,
                    "Fountain of Delight": 3005,
                    "Screaming Tiger": 3006,
                    "Skill Gotten Gains": 3007,
                    "Midnight Whirlwind": 3008,
                    "Silver Cyclone": 3009,
                    "Mega Strike": 3010,
                    "Haunted Phantasm": 3011,
                    "Ghastly Ghosts": 3012,
                    "Hellish Inferno": 3013,
                    "Spectral Swirl": 3014,
                    "Infernal Flames": 3015,
                    "Infernal Smoke": 3016,
                    "Acidic Bubbles of Envy": 3017,
                    "Flammable Bubbles of Attraction": 3018,
                    "Poisonous Bubbles of Regret": 3019,
                    "Roaring Rockets": 3020,
                    "Spooky Night": 3021,
                    "Ominous Night": 3022,
                    "Bewitched": 3023,
                    "Accursed": 3024,
                    "Enchanted": 3025,
                    "Static Mist": 3026,
                    "Eerie Lightning": 3027,
                    "Terrifying Thunder": 3028,
                    "Jarate Shock": 3029,
                    "Nether Void": 3030,
                    "Good-Hearted Goodies": 3031,
                    "Wintery Wisp": 3032,
                    "Arctic Aurora": 3033,
                    "Winter Spirit": 3034,
                    "Festive Spirit": 3035,
                    "Magical Spirit": 3036,
                    "Spectral Escort": 3037,
                    "Astral Presence": 3038,
                    "Arcane Assistance": 3039,
                    "Emerald Allurement": 3041,
                    "Pyrophoric Personality": 3042,
                    "Spellbound Aspect": 3043,
                    "Static Shock": 3044,
                    "Veno Shock": 3045,
                    "Toxic Terrors": 3046,
                    "Arachnid Assault": 3047,
                    "Creepy Crawlies": 3048,
                    "Delightful Star": 3049,
                    "Frosted Star": 3050,
                    "Apotheosis": 3051,
                    "Ascension": 3052,
                    "Reindoonicorn Rancher": 3053,
                    "Twinkling Lights": 3055,
                    "Shimmering Lights": 3056,
                    "Spectral Shackles": 3059,
                    "Cursed Confinement": 3060,
                    "Cavalier de Carte": 3061,
                    "Hollow Flourish": 3063,
                    "Magic Shuffle": 3064,
                    "Vigorous Pulse": 3065,
                    "Thundering Spirit": 3066,
                    "Galvanic Defiance": 3067,
                    "Wispy Halos": 3068,
                    "Nether Wisps": 3069,
                    "Aurora Borealis": 3070,
                    "Aurora Australis": 3071,
                    "Aurora Polaris": 3072,
                    "Amethyst Winds": 3073,
                    "Golden Gusts": 3074,
                    "Smissmas Swirls": 3075,
                    "Minty Cypress": 3077,
                    "Pristine Pine": 3078,
                    "Sparkly Spruce": 3079,
                    "Festive Fever": 3081,
                    "Golden Glimmer": 3083,
                    "Frosty Silver": 3084,
                    "Glamorous Dazzle": 3085,
                    "Sublime Snowstorm": 3087,
                    "Marigold Ritual": 3088,
                    "Pungent Poison": 3090,
                    "Blazed Brew": 3091,
                    "Mysterious Mixture": 3092,
                    "Linguistic Deviation": 3093,
                    "Aurelian Seal": 3094,
                    "Runic Imprisonment": 3095,
                    "Prismatic Haze": 3097,
                    "Rising Ritual": 3098,
                    "Bloody Grip": 3100,
                    "Toxic Grip": 3102,
                    "Infernal Grip": 3103,
                    "Death Grip": 3104,
                    "Charged Arcane": 3105,
                    "Thunderous Rage": 3106,
                    "Convulsive Fiery": 3107,
                    "Festivized Formation": 3108,
                    "Twirling Spirits": 3110,
                    "Squash n' Twist": 3111,
                    "Midnight Sparklers": 3112,
                    "Boundless Blizzard": 3113,
                    "Solar Scorched": 3114,
                    "Deepsea Rave": 3115,
                    "Blooming Beacon": 3117,
                    "Beaming Beacon": 3118,
                    "Blazing Beacon": 3119,
                    "Floppin' Frenzy": 3120,
                    "Pastel Trance": 3121,
                    "Wildflower Meadows": 3123,
                    "Deep-sea Devourer": 3124,
                    "Eldritch Horror": 3125,
                    "Autumn Leaves": 3126,
                    "Dead Man's Party": 3127,
                    "Potion Explosion": 3128,
                    "Haunted Cremation": 3129,
                    "Cremation": 3130,
                    "Snowfall": 3131,
                    "Galactic Connection": 3132,
                    "Dark Twilight": 3134,
                    "Eldritch Rift": 3135,
                    "Selfless Sensation": 3136,
                    "Distant Desire": 3137,
                    "Glamorous Glance": 3138,
                    "Permafrost Essence": 3139,
                    "Arctic Delight": 3141,
                    "Winning Spirit": 3142,
                    "Petal Prance": 3143,
                    "Dragonflies' Embrace": 3145,
                    "Dragonflies' Nature": 3147,
                    "Dragonflies' Lucent": 3148,
                    "Electrocution": 3149,
                    "Distress Signal": 3151,
                    "Carioca's Call": 3153,
                    "Fiesta Royale": 3154,
                    "Grand Jubilee": 3156,
                    "Elemental": 3157,
                    "Godlike": 3159,
                    "Teamwork Valorance": 3160,
                    "Legacy Logo": 3162,
                    "Desert Wind": 3163,
                    "Monsoon Season": 3164,
                    "Bountiful Riches": 3165,
                    "Luxurious Lover": 3167,
                    "Amatory": 3168,
                    "Electrum": 3170,
                    "Sakura Blessings": 3171,
                    "Violent Violets": 3173,
                    "Power Pressure": 3174,
                    "Magnifying Momentum": 3176,
                    "Charging Catalyst": 3177,
                    "Amplifying Aura": 3178,
                    "Mystic Fusion": 3179,
                    "Obnoxious Confetti": 3180,
                    "Lovable Confetti": 3181,
                    "Confetti Celebration": 3182,
                    "Heavy Rain": 3183,
                    "Pumpkin Patch": 3184,
                    "Snowy Day": 3185,
                    "Snowy Spirit": 3186,
                    "Lavender Sensation": 3188,
                    "Verdant Phenomenon": 3189,
                    "Award Winning": 3190,
                    "Operatic Triumph": 3192,
                    "Tangled Lights": 3193,
                    "Seamine": 3194,
                    "Iconic Outline": 3196,
                    "Subtle Silhouette": 3198,
                    "Ocean Reef": 3199,
                    "Lost Signal": 3200,
                    "Summer Wave": 3201,
                    "Shark Attack": 3202,
                    "Hazardous Gas": 3203,
                    "Phantasmal Fog": 3204,
                    "Split Malice": 3206,
                    "Void Crawlers": 3208,
                    "Fossil Fueled": 3209,
                    "Tar Pit": 3210,
                    "Morbidly Beast": 3211,
					"Snow Dome":3213,
					"Scorching Sensation":3215,
					"Burning Sensation":3216,
					"Galactic Dust":3217,
					"Galactic Cloud":3218,
					"Aurora Aura":3219,
					"Northern Nights":3221,
					"Chilling Mist":3222,
					"Circuit Break":3223
    };
const SHEEN_COLORS = {
    "Team Shine": "#FF4D4D", // Red (or you could do a gradient)
    "Deadly Daffodil": "#E6E600", // Yellow
    "Manndarin": "#FF7E00", // Orange
    "Mean Green": "#4DFF4D", // Light Green
    "Agonizing Emerald": "#00CC00", // Dark Green
    "Villainous Violet": "#9933FF", // Purple
    "Hot Rod": "#FF66FF" // Pink
};
const WP_WEAPONS = {
    standard: {
        "Primary": ["Scattergun", "Shortstop", "Soda Popper", "Rocket Launcher", "Black Box", "Air Strike", "Flame Thrower", "Degreaser", "Grenade Launcher", "Loch-n-Load", "Loose Cannon", "Iron Bomber", "Minigun", "Brass Beast", "Tomislav", "Rescue Ranger", "Crusader's Crossbow", "Sniper Rifle", "Bazaar Bargain"],
        "Secondary": ["Winger", "Detonator", "Scorch Shot", "Stickybomb Launcher", "Family Business", "Medi Gun", "SMG", "Shotgun", "Panic Attack", "Pistol", "Reserve Shooter", "Revolver" ],
        "Melee": ["Holy Mackerel", "Disciplinary Action", "Powerjack", "Back Scratcher", "Scotsman's Skullcutter", "Claidheamh Mòr", "Persian Persuader", "Wrench", "Jag", "Übersaw", "Amputator", "Shahanshah", "Knife"],
        "Base": ["War Paint"]
    },
    dragonSlayer: { // pk: 390
        "Primary": ["Scattergun", "Rocket Launcher", "Dragon's Fury", "Grenade Launcher", "Minigun", "Sniper Rifle"],
        "Secondary": ["Medi Gun", "Shotgun"],
        "Melee": ["Knife"],
        "Base": ["War Paint"]
    }
};
const KILLSTREAKER_ICONS = {
    "Fire Horns": "🔥",
    "Cerebral Discharge": "⚡",
    "Tornado": "🌪️",
    "Flames": "🔥",
    "Singularity": "🌌",
    "Incinerator": "☄️",
    "Hypno-Beam": "🌀"
};
const HIGH_TIER_KILLSTREAKERS = ["Fire Horns", "Tornado"];
const style = document.createElement('style');
style.textContent = `
    .hiding-info-box {
        visibility: hidden !important;
        height: 0px !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
    #key-config-menu {
        position: fixed !important;
        top: 50px !important;
        right: 10px !important;
        z-index: 999999 !important; /* Extremely high to stay on top */
        background: #1b2838 !important;
        border: 2px solid #67c1f5 !important; /* Bright blue border to find it */
        padding: 15px !important;
        border-radius: 8px !important;
        color: white !important;
        display: none;
        box-shadow: 0 0 20px rgba(0,0,0,0.8) !important;
        min-width: 150px;
    }
`;
document.head.appendChild(style);
function getEffectName(asset) {
        if (!asset || !asset.descriptions) return null;

        for (let desc of asset.descriptions) {
            if (desc.value && desc.value.includes("Unusual Effect:")) {
                return desc.value.replace("★ Unusual Effect: ", "").trim();
            }
        }
        return null;
    }
function getKillstreakAttributes(asset) {
    let attributes = { sheen: null, killstreaker: null };
    if (!asset || !asset.descriptions) return attributes;

    for (let desc of asset.descriptions) {
        if (desc.value) {
            const sheenMatch = desc.value.match(/Sheen:\s*([^,\)<]+)/);
            if (sheenMatch) {
                attributes.sheen = sheenMatch[1].trim();
            }
            const ksMatch = desc.value.match(/Killstreaker:\s*([^,\)<]+)/);
            if (ksMatch) {
                attributes.killstreaker = ksMatch[1].trim();
            }
        }
    }
    return attributes;
}
// Helper to get item name safely
function getSteamItemName() {
    // The most foolproof way to get the true item name is directly from the URL.
    try {
        // Example: /market/listings/440/Strange%20Carpet%20Bomber%20Stickybomb%20Launcher%20(Well-Worn)
        const pathParts = window.location.pathname.split('/').filter(Boolean);

        const encodedName = pathParts[pathParts.length - 1];

        // Decode it (converts %20 to spaces, %28 to (, etc.)
        const trueName = decodeURIComponent(encodedName);

        return trueName;
    } catch (e) {
        console.error("PriceDB Script: Could not parse item name from URL", e);
        return "";
    }
}

// Function to fetch SKU from PriceDB
async function fetchSku(name) {
    const cleanName = name.trim();
    const requestUrl = `https://sku.pricedb.io/api/name/${encodeURIComponent(cleanName)}`;

    return new Promise((resolve) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: requestUrl,
            onload: (response) => {
                try {
                    const result = JSON.parse(response.responseText);
                    if (result.success && result.data) {
                        // We return the WHOLE object so the caller
                        // can decide what to do with it.
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            },
            onerror: () => resolve(null)
        });
    });
}

function addButtons() {
    const rows = document.querySelectorAll(".market_listing_row");

    rows.forEach((row) => {
        if (row.querySelector(".bptf-btn-container")) return;

        const nameEl = row.querySelector(".market_listing_item_name");
        if (!nameEl) return;

        const color = window.getComputedStyle(nameEl).color;
        if (color !== "rgb(134, 80, 172)") return; // Only process Unusuals

        const fullName = nameEl.textContent.trim();
        let quality = fullName.startsWith("Strange Unusual ") ? "Strange Unusual" : "Unusual";
        let itemName = fullName.replace(/^(Strange )?Unusual\s+/, "");

        // Filter modifiers
        itemName = itemName.replace(/(Professional |Specialized )?Killstreak /g, "")
                           .replace("Festivized ", "")
                           .trim();

        // Detect Skins/WPs
        const wears = ["(Factory New)", "(Minimal Wear)", "(Field-Tested)", "(Well-Worn)", "(Battle Scarred)"];
        const isSkin = wears.some(wear => itemName.toLowerCase().includes(wear.toLowerCase()));

        if (isSkin) {
            if (quality !== "Strange Unusual") quality = "Decorated Weapon";
            if (!itemName.includes("|")) {
                const weaponKeys = Object.keys(WEAPON_INDEX_MAP).sort((a, b) => b.length - a.length);
                let foundWeapon = weaponKeys.find(w => itemName.includes(w));
                itemName = foundWeapon ? itemName.replace(` ${foundWeapon}`, ` | ${foundWeapon}`) :
                           (itemName.includes("War Paint") ? itemName.replace(" War Paint", " | War Paint") : itemName);
            }
        }

        const listingId = row.id.replace("listing_", "");
        const listing = unsafeWindow.g_rgListingInfo?.[listingId];
        let effectId = null, effectName = null;

        if (listing) {
            const asset = unsafeWindow.g_rgAssets?.[listing.asset.appid]?.[listing.asset.contextid]?.[listing.asset.id];
            effectName = getEffectName(asset);
            if (effectName) effectId = EFFECT_MAP[effectName];
        }

        const container = row.querySelector(".market_listing_item_name_block");
        if (!container) return;

        // --- UI CONSTRUCTION ---
        const mainWrapper = document.createElement("div");
        mainWrapper.className = "bptf-btn-container";
        mainWrapper.style.cssText = "display: flex; flex-direction: column; gap: 4px; margin-top: 4px;";

        // ROW 1: PRIMARY (BPTF, STN, EFFECT)
        const row1 = document.createElement("div");
        row1.style.cssText = "display: flex; gap: 4px; align-items: center;";

        const btnStyle = "padding: 1px 5px; color: #fff; font-size: 10px; border-radius: 2px; text-decoration: none; font-weight: bold;";

        // BPTF Button
        const bptfBtn = document.createElement("a");
        bptfBtn.textContent = "BPTF";
        bptfBtn.href = `https://backpack.tf/stats/${encodeURIComponent(quality)}/${encodeURIComponent(itemName)}/Tradable/Craftable${effectId ? '/' + effectId : ''}`;
        bptfBtn.target = "_blank";
        bptfBtn.style.cssText = btnStyle + "background: #5c7e10;";
        row1.appendChild(bptfBtn);

        // STN Button
        if (effectName) {
            const stnQuery = ("Unusual " + effectName + " " + itemName.replace(" | ", " ")).replace(/\s+/g, '+');
            const stnBtn = document.createElement("a");
            stnBtn.textContent = "STN";
            stnBtn.href = `https://stntrading.eu/item/tf2/${stnQuery}`;
            stnBtn.target = "_blank";
            stnBtn.style.cssText = btnStyle + "background: #2b567a;";
            row1.appendChild(stnBtn);

            const effectBadge = document.createElement("span");
            effectBadge.style.cssText = "padding: 1px 5px; font-size: 10px; border-radius: 2px; background: #222; color: #fff; border: 1px solid #444; font-weight: bold;";
            effectBadge.textContent = effectName;
            row1.appendChild(effectBadge);
        }

        mainWrapper.appendChild(row1);

        // ROW 2: TOOLS & ATTRIBUTES (WP, STN-WP, KS INFO)
        const row2 = document.createElement("div");
        row2.className = "bptf-row-secondary"; // We'll target this in the KS function
        row2.style.cssText = "display: flex; gap: 4px; align-items: center; flex-wrap: wrap;";

        if (isSkin && itemName.includes(" | ") && effectName) {
            const nameParts = itemName.split(" | ");
            const wearMatch = itemName.match(/\(([^)]+)\)$/);
            const wear = wearMatch ? wearMatch[0] : "";
            const wpSubStyle = "padding: 1px 4px; color: #fff; font-size: 9px; border-radius: 2px; text-decoration: none; font-weight: bold; border: 1px solid rgba(255,255,255,0.1);";

            // WP (Backpack tool)
            const wpBtn = document.createElement("a");
            wpBtn.textContent = "WP";
            wpBtn.href = `https://backpack.tf/stats/${encodeURIComponent(quality)}/${encodeURIComponent(nameParts[0] + " | War Paint " + wear)}/Tradable/Craftable/${effectId}`;
            wpBtn.target = "_blank";
            wpBtn.style.cssText = wpSubStyle + "background: #8650ac;";
            row2.appendChild(wpBtn);

            // STN (War Paint)
            const wpStnBtn = document.createElement("a");
            wpStnBtn.textContent = "STNWP"
            const wpStnQuery = ("Unusual " + effectName + " " + nameParts[0] + " War Paint " + wear).replace(/\s+/g, '+');
            wpStnBtn.href = `https://stntrading.eu/item/tf2/${wpStnQuery}`;
            wpStnBtn.target = "_blank";
            wpStnBtn.style.cssText = wpSubStyle + "background: #8650ac;";
            row2.appendChild(wpStnBtn);
        }

        mainWrapper.appendChild(row2);
        container.appendChild(mainWrapper);
    });
}
function addKillstreakButtons() {
    const rows = document.querySelectorAll(".market_listing_row");

    rows.forEach(row => {
        if (row.dataset.ksProcessed) return;
        const nameEl = row.querySelector(".market_listing_item_name");

        // 1. UPDATE: Allow both Professional and Specialized items
        if (!nameEl) return;
        const isPro = nameEl.textContent.includes("Professional Killstreak");
        const isSpec = nameEl.textContent.includes("Specialized Killstreak");
        if (!isPro && !isSpec) return;

        row.dataset.ksProcessed = "true";

        // Find the secondary row we created in addButtons
        let secondaryRow = row.querySelector(".bptf-row-secondary");

        // Fallback for non-unusuals where addButtons doesn't run
        if (!secondaryRow) {
            const container = row.querySelector(".market_listing_item_name_block");
            if (!container) return;

            const wrapper = document.createElement("div");
            wrapper.style.marginTop = "4px";

            secondaryRow = document.createElement("div");
            secondaryRow.className = "bptf-row-secondary";
            secondaryRow.style.cssText = "display: flex; gap: 4px; align-items: center; flex-wrap: wrap;";

            wrapper.appendChild(secondaryRow);
            container.appendChild(wrapper);

            // Add the standard KS BPTF button for non-unusuals
            if (!nameEl.textContent.includes("Unusual")) {
                const fullName = nameEl.textContent.trim();
                const isFab = fullName.includes("Fabricator");
                const isKit = fullName.includes("Kit") && !isFab;
                const isWeapon = !isKit && !isFab;

                let url = "";

                if (isWeapon) {
                    let quality = "Unique";
                    let itemName = fullName;

                    if (fullName.startsWith("Strange ")) {
                        quality = "Strange";
                        itemName = fullName.replace(/^Strange\s+/, "");
                    } else if (fullName.startsWith("Vintage ")) {
                        quality = "Vintage";
                        itemName = fullName.replace(/^Vintage\s+/, "");
                    } else if (fullName.startsWith("Genuine ")) {
                        quality = "Genuine";
                        itemName = fullName.replace(/^Genuine\s+/, "");
                    }

                    // --- NEW: SKIN DETECTION LOGIC ---
                    const wears = ["(Factory New)", "(Minimal Wear)", "(Field-Tested)", "(Well-Worn)", "(Battle Scarred)"];
                    const isSkin = wears.some(wear => itemName.toLowerCase().includes(wear.toLowerCase()));

                    if (isSkin) {
                        // Change Unique to Decorated Weapon (but leave Strange as Strange)
                        if (quality === "Unique") quality = "Decorated Weapon";

                        // Inject the " | " divider if it's missing
                        if (!itemName.includes("|")) {
                            const weaponKeys = Object.keys(WEAPON_INDEX_MAP).sort((a, b) => b.length - a.length);
                            let foundWeapon = weaponKeys.find(w => itemName.includes(w));

                            if (foundWeapon) {
                                itemName = itemName.replace(` ${foundWeapon}`, ` | ${foundWeapon}`);
                            } else if (itemName.includes("War Paint")) {
                                itemName = itemName.replace(" War Paint", " | War Paint");
                            }
                        }
                    }
                    // ---------------------------------

                    url = `https://backpack.tf/stats/${quality}/${encodeURIComponent(itemName)}/Tradable/Craftable`;
                } else {
                    let weaponName = fullName
                        .replace("Professional Killstreak ", "")
                        .replace("Specialized Killstreak ", "")
                        .replace(" Kit Fabricator", "")
                        .replace(" Kit", "")
                        .trim();

                    const weaponIndex = WEAPON_INDEX_MAP[weaponName];

                    if (weaponIndex) {
                        if (isKit) {
                            const ksTier = isPro ? "3" : "2";
                            const ksName = isPro ? "Professional" : "Specialized";
                            url = `https://backpack.tf/stats/Unique/${ksName}%20Killstreak%20Kit/Tradable/Non-Craftable/${ksTier}-${weaponIndex}`;
                        } else if (isFab) {
                            const fabDef = isPro ? "6526" : "6523";
                            url = `https://backpack.tf/stats/Unique/Fabricator/Tradable/Craftable/${fabDef}-6-${weaponIndex}`;
                        }
                    }
                }

                if (url) {
                    const ksBtn = document.createElement("a");
                    ksBtn.textContent = "BPTF";
                    ksBtn.className = "ks-btn";
                    ksBtn.style.cssText = "padding: 1px 5px; background: #5c7e10; color: #fff; font-size: 10px; border-radius: 2px; text-decoration: none; font-weight: bold;";
                    ksBtn.href = url;
                    ksBtn.target = "_blank";
                    secondaryRow.appendChild(ksBtn);
                }
            }
        }

        const listingId = row.id.replace("listing_", "");
        const listing = unsafeWindow.g_rgListingInfo?.[listingId];

        if (listing) {
            const asset = unsafeWindow.g_rgAssets?.[listing.asset.appid]?.[listing.asset.contextid]?.[listing.asset.id];
            const ksData = getKillstreakAttributes(asset);

            if (ksData.sheen || ksData.killstreaker) {
                const indicator = document.createElement("span");
                indicator.style.cssText = "display: flex; align-items: center; gap: 4px; padding: 1px 4px; font-size: 10px; border-radius: 2px; background: rgba(0,0,0,0.3); border: 1px solid #444; color: #ccc;";

                let html = "";

                if (ksData.sheen) {
                    const color = SHEEN_COLORS[ksData.sheen] || "#FFF";
                    html += `<span style="color: ${color}; font-size: 12px;">●</span><span>${ksData.sheen}</span>`;
                }

                if (ksData.killstreaker) {
                    const icon = KILLSTREAKER_ICONS[ksData.killstreaker] || "✨";
                    const isHighTier = HIGH_TIER_KILLSTREAKERS.includes(ksData.killstreaker);
                    const ksStyle = isHighTier
                        ? "color: #FFD700; font-weight: bold; text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6);"
                        : "color: inherit;";
                    html += `<span style="vertical-align: middle; margin-left: 4px; ${ksStyle}">${icon} ${ksData.killstreaker}</span>`;
                }

                indicator.innerHTML = html;
                secondaryRow.appendChild(indicator);
            }
        }
    });
}
async function addPriceDBButton() {
    // Switch for config
    if (!getSetting("enablePriceDB", true)) return;
    // 1. If the button is already there (even if it says Loading), STOP!
    if (document.getElementById('pricedb-btn')) return;

    const itemName = getSteamItemName();
    if (!itemName) return;

    // 2. Find where the button belongs IMMEDIATELY
    const nonCommButton = document.querySelector('.market_noncommodity_buyorder_button');
    const itemNameH1 = document.querySelector('.market_listing_iteminfo h1');

    let container = null;
    let isCommodity = false;

    if (nonCommButton) {
        container = nonCommButton.parentElement;
    } else if (itemNameH1) {
        container = itemNameH1.parentElement;
        isCommodity = true;
    }

    if (!container) return; // Not loaded yet, try again later

    if (isCommodity && document.getElementById("p-db-button-row")) return;

    // 3. Create the "Loading..." button synchronously
    const priceDbBtn = document.createElement('a');
    priceDbBtn.id = 'pricedb-btn';
    priceDbBtn.href = "#";
    priceDbBtn.target = "_blank";
    priceDbBtn.className = "btn_green_white_innerfade btn_medium";
    priceDbBtn.style.marginRight = "10px";

    const span = document.createElement('span');
    span.textContent = "(Loading...)";
    priceDbBtn.appendChild(span);

    // 4. INJECT the placeholder into the page BEFORE waiting for the API
    // This acts as a "Lock" to prevent duplicates
    if (isCommodity) {
        const btnRow = document.createElement('div');
        btnRow.id = "p-db-button-row";
        btnRow.style.cssText = "margin-top: 15px; display: flex; gap: 8px; align-items: center; justify-content: flex-start;";
        btnRow.appendChild(priceDbBtn);
        container.appendChild(btnRow);
    } else {
        container.insertBefore(priceDbBtn, nonCommButton);
    }

    // 5. NOW we fetch the data (safely protected from duplicates)
    const itemData = await fetchSku(itemName);
    if (!itemData) {
        span.textContent = "(No SKU)";
        priceDbBtn.style.opacity = "0.5";
        return;
    }

    // 6. Build Navigator
    const navEnabled = getSetting("enableNavigator", true);
    if (navEnabled) {
        injectSmartNavigator(itemData);
    }

    // 7. Update the main button with actual data
    const skuString = itemData.sku;
    if (!skuString) return;

    let skuParts = skuString.split(';');
    const defindex = skuParts[0];

    // --- SCM KIT FIX ---
    const kitDefindexes = ["6523", "6526", "6527"];
    if (kitDefindexes.includes(defindex) && !skuParts.includes('uncraftable')) {
        skuParts.splice(2, 0, 'uncraftable');
    }

    const finalSku = skuParts.join(';');
    priceDbBtn.href = `https://pricedb.io/item/${finalSku}`;
    span.textContent = "PDB";

    // 8. Add the extra buttons (WP, Naked, etc.)
    const parentContainer = priceDbBtn.parentNode;

    if (parentContainer) {
       // --- CONDITION 1: NAKED (Strips Festivized and Killstreaks) ---
        const hasModifiers = skuParts.some(part => ['festive', 'kt-1', 'kt-2', 'kt-3'].includes(part));
        // Array of Kit and Fabricator defindexes to ignore
        const excludedTools = ["6522", "6523", "6526", "6527", "20002", "20003"];

        if (hasModifiers && !excludedTools.includes(defindex)) {
            const nakedSku = skuParts.filter(part =>
                !['festive', 'kt-1', 'kt-2', 'kt-3'].includes(part)
            ).join(';');
            const nakedBtn = document.createElement('a');
            nakedBtn.className = "btn_green_white_innerfade btn_medium";
            nakedBtn.href = `https://pricedb.io/item/${nakedSku}`;
            nakedBtn.target = "_blank";
            nakedBtn.style.marginRight = "10px";
            nakedBtn.innerHTML = "<span>Naked</span>";
            parentContainer.insertBefore(nakedBtn, priceDbBtn);
        }
        // --- CONDITION 2: WAR PAINT / SKIN ---
        const pkMatch = skuString.match(/pk(\d+)/);
        if (pkMatch) {
            const pkNumber = parseInt(pkMatch[1], 10);
            let wpId = null;

            if ((pkNumber >= 102 && pkNumber <= 163) || (pkNumber >= 301 && pkNumber <= 310) || (pkNumber >= 390 && pkNumber <= 391)) {
                wpId = "16" + pkNumber;
            } else if ((pkNumber >= 200 && pkNumber <= 297) || (pkNumber >= 400 && pkNumber <= 432)) {
                wpId = "17" + pkNumber;
            }

            if (wpId && defindex !== wpId) {
                let wpParts = [...skuParts];
                wpParts[0] = wpId;
                wpParts = wpParts.filter(part =>
                    part !== 'festive' && part !== 'kt-1' && part !== 'kt-2' && part !== 'kt-3'
                );
                const wpBtn = document.createElement('a');
                wpBtn.className = "btn_green_white_innerfade btn_medium";
                wpBtn.href = `https://pricedb.io/item/${wpParts.join(';')}`;
                wpBtn.target = "_blank";
                wpBtn.style.marginRight = "10px";
                wpBtn.innerHTML = "<span>WP</span>";
                parentContainer.insertBefore(wpBtn, priceDbBtn);
            }
        }
        // --- CONDITION 3: APPLIED KILLSTREAK KITS ---
        const isKit = ["6522", "6523", "6526"].includes(defindex);

        if (!isKit) {
            const tdPart = skuParts.find(part => part.startsWith('td-'));
            const targetId = tdPart ? tdPart.replace('td-', '') : defindex;

            if (skuParts.includes('kt-2') || defindex === "20002") {
                const ksBtn = document.createElement('a');
                ksBtn.className = "btn_green_white_innerfade btn_medium";
                ksBtn.href = `https://backpack.tf/stats/Unique/Specialized%20Killstreak%20Kit/Tradable/Non-Craftable/2-${targetId}`;
                ksBtn.target = "_blank";
                ksBtn.style.marginRight = "10px";
                ksBtn.innerHTML = "<span>Kits Stats</span>";
                parentContainer.insertBefore(ksBtn, priceDbBtn);
            }
            else if (skuParts.includes('kt-3') || defindex === "20003") {
                const ksBtn = document.createElement('a');
                ksBtn.className = "btn_green_white_innerfade btn_medium";
                ksBtn.href = `https://backpack.tf/stats/Unique/Professional%20Killstreak%20Kit/Tradable/Non-Craftable/3-${targetId}`;
                ksBtn.target = "_blank";
                ksBtn.style.marginRight = "10px";
                ksBtn.innerHTML = "<span>Kits Stats</span>";
                parentContainer.insertBefore(ksBtn, priceDbBtn);
            }
        }
    }
}

function injectSmartNavigator(skuData) {
    if (document.getElementById('scm-navigator')) return;

    const pk = skuData.paintkit;
    const isFabricator = skuData.name.includes("Fabricator");
    const isKit = skuData.name.includes("Kit") && !isFabricator;

    let weaponList = null;
    if (pk > 86) {
        weaponList = (pk === 390) ? WP_WEAPONS.dragonSlayer : WP_WEAPONS.standard;
    }

    let currentWeapon = "";
    let paintName = "";
    if (weaponList) {
        const allWeapons = [].concat(...Object.values(weaponList));
        allWeapons.sort((a, b) => b.length - a.length);

        currentWeapon = allWeapons.find(w => skuData.name.includes(w)) || "";

        // NEW: Safely strip ALL qualities so they don't get trapped in the base name
        paintName = skuData.name
            .replace(currentWeapon, "")
            .replace(/Strange |Festivized |Professional Killstreak |Specialized Killstreak |Killstreak |Unusual |Vintage |Genuine |Haunted |Collector's /g, "")
            .replace(/\(.*\)/, "")
            .trim();
    }

    const graphContainer = document.getElementById('pricehistory_container');
    const infoContainer = document.querySelector('.market_listing_iteminfo');

    if (!graphContainer && !infoContainer) return;

    const navBox = document.createElement('div');
    navBox.id = 'scm-navigator';
    navBox.style.cssText = "background: #101822; border: 1px solid #4f94bc; padding: 12px; margin-top: 15px; margin-bottom: 15px; border-radius: 4px; color: #ccc; font-size: 12px;";

    // NEW: We added a Quality Dropdown to perfectly control Unusual, Vintage, etc.
    let html = `
        <div style="font-weight: bold; color: #67c1f5; margin-bottom: 8px; display: flex; justify-content: space-between;">
            <span>QUICK NAVIGATOR</span>
            <span style="font-size: 10px; color: #555;">${paintName || 'KS Tool / Base Item'}</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
            <label><input type="checkbox" id="nav-strange" ${skuData.quality === 11 || skuData.name.includes("Strange") ? 'checked' : ''}> Str</label>
            <label><input type="checkbox" id="nav-festive" ${skuData.festive || skuData.name.includes("Festivized") ? 'checked' : ''}> Fest</label>

            <select id="nav-quality" style="background: #000; color: #fff; border: 1px solid #444; padding: 2px;">
                <option value="">Unique (Normal)</option>
                <option value="Unusual " ${skuData.quality === 5 || skuData.name.includes("Unusual") ? 'selected' : ''}>Unusual</option>
                <option value="Vintage " ${skuData.quality === 3 || skuData.name.includes("Vintage") ? 'selected' : ''}>Vintage</option>
                <option value="Genuine " ${skuData.quality === 1 || skuData.name.includes("Genuine") ? 'selected' : ''}>Genuine</option>
                <option value="Haunted " ${skuData.quality === 13 || skuData.name.includes("Haunted") ? 'selected' : ''}>Haunted</option>
                <option value="Collector's " ${skuData.quality === 14 || skuData.name.includes("Collector's") ? 'selected' : ''}>Collector's</option>
            </select>

            <select id="nav-ks" style="background: #000; color: #fff; border: 1px solid #444; padding: 2px;">
                <option value="0" ${skuData.killstreak === 0 ? 'selected' : ''}>No KS</option>
                <option value="1" ${skuData.killstreak === 1 ? 'selected' : ''}>KS</option>
                <option value="2" ${skuData.killstreak === 2 ? 'selected' : ''}>Spec</option>
                <option value="3" ${skuData.killstreak === 3 ? 'selected' : ''}>Prof</option>
            </select>

            <select id="nav-wear" style="background: #000; color: #fff; border: 1px solid #444; padding: 2px;">
                <option value="(Factory New)" ${skuData.wear === 1 ? 'selected' : ''}>FN</option>
                <option value="(Minimal Wear)" ${skuData.wear === 2 ? 'selected' : ''}>MW</option>
                <option value="(Field-Tested)" ${skuData.wear === 3 ? 'selected' : ''}>FT</option>
                <option value="(Well-Worn)" ${skuData.wear === 4 ? 'selected' : ''}>WW</option>
                <option value="(Battle Scarred)" ${skuData.wear === 5 ? 'selected' : ''}>BS</option>
            </select>
    `;

    if (weaponList) {
        html += `<select id="nav-weapon" style="background: #000; color: #67c1f5; border: 1px solid #4f94bc; padding: 2px; max-width: 150px;">`;
        html += Object.entries(weaponList).map(([group, items]) => {
            const options = items.map(item =>
                `<option value="${item}" ${currentWeapon === item ? 'selected' : ''}>${item}</option>`
            ).join('');
            return `<optgroup label="${group}" style="background: #1b2838; color: #fff;">${options}</optgroup>`;
        }).join('');
        html += `</select>`;
    }

    if (isKit || isFabricator) {
        html += `
            <select id="nav-tool" style="background: #000; color: #fff; border: 1px solid #444; padding: 2px;">
                <option value="Kit" ${isKit ? 'selected' : ''}>Kit</option>
                <option value="Kit Fabricator" ${isFabricator ? 'selected' : ''}>Fabricator</option>
            </select>
        `;
    }

    html += `<button id="nav-go" style="background: #4f94bc; color: white; border: none; padding: 3px 10px; cursor: pointer; border-radius: 2px; font-weight: bold; margin-left: auto;">GO</button></div>`;

    navBox.innerHTML = html;
    if (graphContainer) {
        graphContainer.after(navBox);
    } else {
        infoContainer.after(navBox);
    }

    document.getElementById('nav-go').onclick = () => {
        const isStr = document.getElementById('nav-strange').checked;
        const isFest = document.getElementById('nav-festive').checked;

        // Retrieve the selected quality from the new dropdown
        const inherentQuality = document.getElementById('nav-quality').value;

        const ksTier = document.getElementById('nav-ks').value;
        const wear = document.getElementById('nav-wear').value;

        let ksPrefix = "";
        if (ksTier == 1) ksPrefix = "Killstreak ";
        else if (ksTier == 2) ksPrefix = "Specialized Killstreak ";
        else if (ksTier == 3) ksPrefix = "Professional Killstreak ";

        let finalName = "";

        if (weaponList) {
            const selectedWeapon = document.getElementById('nav-weapon').value;
            // The order is EXACTLY what Steam expects
            finalName = `${isStr ? 'Strange ' : ''}${inherentQuality}${isFest ? 'Festivized ' : ''}${ksPrefix}${paintName} ${selectedWeapon} ${wear}`.trim();
        } else {
            const toolType = document.getElementById('nav-tool') ? document.getElementById('nav-tool').value : "";

            // Safely strip qualities from hats/base items too
            let baseItemName = skuData.name
                .replace(/Strange |Festivized |Professional Killstreak |Specialized Killstreak |Killstreak |Unusual |Vintage |Genuine |Haunted |Collector's /g, "")
                .replace(/ Kit Fabricator$/, "")
                .replace(/ Kit$/, "")
                .trim();

            // Allows Fixed Skins (like Night Owl) to cleanly swap wear
            let finalWear = "";
            if (skuData.wear) {
                baseItemName = baseItemName.replace(/\(.*\)/, "").trim();
                finalWear = " " + wear;
            }

            // The order is EXACTLY what Steam expects for Hats/Standard Items
            finalName = `${isStr ? 'Strange ' : ''}${inherentQuality}${isFest ? 'Festivized ' : ''}${ksPrefix}${baseItemName}${finalWear} ${toolType}`.trim();
        }

        window.location.href = `https://steamcommunity.com/market/listings/440/${encodeURIComponent(finalName)}`;
    };
}

// ===== UI CUSTOMIZATION =====
// Function to handle the actual hiding logic
// Toggles the Price History Graph and its Zoom Controls

function applyVisibilitySettings() {
    const hideDetails = getSetting("hideItemDetails", false);
    const hideAll = getSetting("hideEntireInfo", false);

    const itemInfo = document.querySelector('.market_listing_iteminfo');
    if (!itemInfo) return;

    // 1. Reset everything first
    itemInfo.style.display = '';
    const reactPlaceholder = itemInfo.querySelector('.largeiteminfo_react_placeholder');
    const warnings = document.getElementById('largeiteminfo_warning');
    const hrTags = itemInfo.querySelectorAll('hr');
    if (reactPlaceholder) reactPlaceholder.style.display = '';
    if (warnings) warnings.style.display = '';
    hrTags.forEach(hr => { hr.style.display = ''; });

    // 2. The Activity Section Debug/Hide
    const hideActivity = () => {
        const activity = document.getElementById('market_activity_section');
        if (activity) {
            activity.style.setProperty('display', 'none', 'important');
        }
    };

    if (hideAll) {
        itemInfo.style.display = 'none';
        hideActivity();
        // Check again in 1s and 3s because Steam loads this late
        setTimeout(hideActivity, 1000);
        setTimeout(hideActivity, 3000);
    } else if (hideDetails) {
        if (reactPlaceholder) reactPlaceholder.style.display = 'none';
        if (warnings) warnings.style.display = 'none';
        hrTags.forEach(hr => { hr.style.display = 'none'; });

        hideActivity();
        setTimeout(hideActivity, 1000);
        setTimeout(hideActivity, 3000);
    }

    // Refresh the graph layout
    if (hideDetails || hideAll) {
        setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 200);
    }
}


// Run this immediately on load to apply saved preference
//toggleMarketInfo(localStorage.getItem("hideMarketInfo") === "true");
    const observer = new MutationObserver(() => {
        addButtons();
        addKillstreakButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    addButtons();


// ===== KEY PRICE CONFIG =====

// Storage Helpers
const getSetting = (key, defaultValue) => {
    const val = localStorage.getItem(key);
    if (val === null) return defaultValue;
    return val === "true" || val === "false" ? val === "true" : val;
};

const getKeyPrice = () => parseFloat(localStorage.getItem("keyPrice")) || 70.00;
const getRefPrice = () => parseFloat(localStorage.getItem("refPrice")) || 80.00;
const setKeyPrice = (val) => localStorage.setItem("keyPrice", val);
const setRefPrice = (val) => localStorage.setItem("refPrice", val);

// ===== CONFIG BUTTON =====

function createConfigButton() {
    if (document.getElementById("key-config-btn")) return;

    const btn = document.createElement("div");
    btn.id = "key-config-btn";
    btn.textContent = "⚙";
    btn.style.cssText = "position:fixed; top:10px; right:10px; z-index:99999; cursor:pointer; background:#16202d; color:#fff; padding:6px 10px; border-radius:6px; border:1px solid #4f94bc;";

    const menu = document.createElement("div");
    menu.id = "key-config-menu";
    menu.style.cssText = "display:none; position:fixed; top:45px; right:10px; z-index:99999; background:#16202d; color:#fff; padding:15px; border-radius:8px; border:1px solid #4f94bc; width:200px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);";

    // Load current states
const showKeys = getSetting("showKeys", true);
    const showRef = getSetting("showRef", false);
    const hideDetails = getSetting("hideItemDetails", false);
    const hideAll = getSetting("hideEntireInfo", false);
    const enableNav = getSetting("enableNavigator", true);
    // NEW: Load the PriceDB/Fetch setting
    const enablePriceDB = getSetting("enablePriceDB", true);

    menu.innerHTML = `
        <div style="margin-bottom:12px; font-weight:bold; color:#67c1f5; border-bottom:1px solid #444; padding-bottom:5px;">Script Settings</div>

        <div style="margin-bottom:10px;">
            <label style="font-size:11px; display:block;">Key Price (Steam):</label>
            <input type="number" id="cfg-key-price" value="${getKeyPrice()}" step="0.01" style="background:#000; color:#fff; border:1px solid #444; width:90%; padding:2px;">
        </div>

        <div style="margin-bottom:10px;">
            <label style="font-size:11px; display:block;">Ref per Key:</label>
            <input type="number" id="cfg-ref-price" value="${getRefPrice()}" step="0.1" style="background:#000; color:#fff; border:1px solid #444; width:90%; padding:2px;">
        </div>

        <div style="margin-bottom:8px; font-size:12px; line-height: 1.6;">
            <label><input type="checkbox" id="cfg-show-keys" ${showKeys ? 'checked' : ''}> Show Key Value</label><br>
            <label><input type="checkbox" id="cfg-show-ref" ${showRef ? 'checked' : ''}> Show Ref Value</label>
            <hr style="border:0; border-top:1px solid #444; margin: 8px 0;">
            <label title="Fetches SKUs for PriceDB buttons and Navigator"><input type="checkbox" id="cfg-enable-pdb" ${enablePriceDB ? 'checked' : ''}> Enable PriceDB Features</label><br>
            <label title="Shows the quick switch UI below graph"><input type="checkbox" id="cfg-enable-nav" ${enableNav ? 'checked' : ''}> Enable Navigator</label><br>
            <hr style="border:0; border-top:1px solid #444; margin: 8px 0;">
            <label title="Hides image and text, keeps graph"><input type="checkbox" id="cfg-hide-details" ${hideDetails ? 'checked' : ''}> Hide Item Details</label><br>
            <label title="Hides everything in the top block"><input type="checkbox" id="cfg-hide-all" ${hideAll ? 'checked' : ''}> Hide Entire Info</label>
        </div>

        <button id="cfg-save" style="background:#4f94bc; color:#fff; border:none; padding:6px; cursor:pointer; width:100%; border-radius:4px; font-weight:bold; margin-top:5px;">Save & Reload</button>
    `;

    btn.onclick = (e) => {
        e.stopPropagation();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    };

    document.body.appendChild(btn);
    document.body.appendChild(menu);

document.getElementById("cfg-save").onclick = () => {
        setKeyPrice(document.getElementById("cfg-key-price").value);
        setRefPrice(document.getElementById("cfg-ref-price").value);
        localStorage.setItem("showKeys", document.getElementById("cfg-show-keys").checked);
        localStorage.setItem("showRef", document.getElementById("cfg-show-ref").checked);
        localStorage.setItem("hideItemDetails", document.getElementById("cfg-hide-details").checked);
        localStorage.setItem("hideEntireInfo", document.getElementById("cfg-hide-all").checked);
        localStorage.setItem("enableNavigator", document.getElementById("cfg-enable-nav").checked);
        // NEW: Save the PriceDB setting
        localStorage.setItem("enablePriceDB", document.getElementById("cfg-enable-pdb").checked);
        location.reload();
    };
}
// ===== PRICE PARSER =====

function parsePrice(text) {
    if (!text) return null;

    // ONLY take first line (ignore after-fee price)
    const firstLine = text.split("\n")[0];

    const num = firstLine.replace(/[^0-9.]/g, "");
    return parseFloat(num);
}

// ===== ADD KEY DISPLAY =====

function addKeyPrices() {
    const rows = document.querySelectorAll(".market_listing_row");
    const showKeys = getSetting("showKeys", true);
    const showRef = getSetting("showRef", false);

    // If both features are off, don't do anything
    if (!showKeys && !showRef) return;

    rows.forEach(row => {
        if (row.querySelector(".price-converter-display")) return;

        const priceEl = row.querySelector(".market_listing_price");
        if (!priceEl) return;

        const price = parsePrice(priceEl.innerText);
        if (!price) return;

        const keyPrice = getKeyPrice();
        const refPerKey = getRefPrice();
        const keys = price / keyPrice;
        const ref = keys * refPerKey;

        const div = document.createElement("div");
        div.className = "price-converter-display";
        div.style.cssText = "font-size: 11px; margin-bottom: 2px; line-height: 1.1;";

        let html = "";
        if (showKeys) {
            html += `<div style="color: #9ecbff;">≈ ${keys.toFixed(2)} keys</div>`;
        }
        if (showRef) {
            html += `<div style="color: #dedede;">≈ ${ref.toFixed(1)} ref</div>`;
        }

        div.innerHTML = html;
        priceEl.parentNode.insertBefore(div, priceEl);
    });
}
// ===== OBSERVER =====

// ===== IMPROVED OBSERVER =====

let timeout = null;
const keyObserver = new MutationObserver(() => {
    // Debounce: Wait 200ms after the last change before running
    // This prevents the "feedback loop" and UI lag
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        addKeyPrices();
        addPriceDBButton();
        // Also re-run your button/link creation here if needed
    }, 200);
});

// Targeted function to start observing
function startObserving() {
    const container = document.getElementById("searchResultsRows");
    if (container) {
        keyObserver.observe(container, { childList: true });
        addKeyPrices(); // Run once on load
    } else {
        // If the container isn't loaded yet, try again in a bit
        setTimeout(startObserving, 500);
    }
}
// This runs the check every 500ms until the button is successfully added
const initPriceDB = setInterval(() => {
    // Check if we're on a TF2 listing page
    if (window.location.href.includes('/listings/440/')) {
        addPriceDBButton();
    }
}, 1000);

startObserving();

// ===== INIT =====
applyVisibilitySettings()
addPriceDBButton();
createConfigButton();
addKeyPrices();
addKillstreakButtons();
})();
