// ==UserScript==
// @name         scm-helpertestbuild
// @namespace    tf2-helper
// @version      0.5.1
// @description  adds verious links and indcators for tf2 listings
// @match        https://steamcommunity.com/market/*
// @match        https://steamcommunity.com/market/listings/440/*
// @updateURL    https://github.com/matthew44123/scm-helper/raw/main/scm-helper.user.js
// @downloadURL  https://github.com/matthew44123/scm-helper/raw/main/scm-helper.user.js
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      pricedb.io
// @connect      sku.pricedb.io
// ==/UserScript==
//==================================================================
//                CHANGELOGCHANGELOG 0.5.1
//*add filter to fetch unusualifier skus and generate correct link
//*Fixed some bugs for the navigators.
//*added feature to scan for filled parts
//
//                CHANGELOGCHANGELOG 0.5.0
//*Added Goku
//*Changed the Ref diplay to mixed display when ref value over 1key
//*Changed the button colors
//*Added Classifieds button for unusual hats/taunts and kits/fabs.
//*Added MCS button for unusual hats/taunts
//===================================================================
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
    "Rocket Launcher": 205,
    "Grenade Launcher": 206,
    "Stickybomb Launcher": 207,
    "Flame Thrower": 208,
    "Pistol": 209,
    "Revolver": 210,
    "Medi Gun": 211,
    "Kritzkrieg": 35,
    "Blutsauger": 36,
    "Übersaw": 37,
    "Axtinguisher": 38,
    "Flare Gun": 39,
    "Backburner": 40,
    "Natascha": 41,
    "Killing Gloves of Boxing": 43,
    "Sandman": 44,
    "Force-a-Nature": 45,
    "Huntsman": 56,
    "Ambassador": 61,
    "Direct Hit": 127,
    "Equalizer": 128,
    "Scottish Resistance": 130,
    "Eyelander": 132,
    "Wrangler": 140,
    "Homewrecker": 153,
    "Pain Train": 154,
    "Southern Hospitality": 155,
    "Tribalman's Shiv": 171,
    "Scotsman's Skullcutter": 172,
    "Vita-Saw": 173,
    "Powerjack": 214,
    "Degreaser": 215,
    "Shortstop": 220,
    "Holy Mackerel": 221,
    "L'Etranger": 224,
    "Your Eternal Reward": 225,
    "Black Box": 228,
    "Sydney Sleeper": 230,
    "Bushwacka": 232,
    "Rocket Jumper": 237,
    "Gloves of Running Urgently": 239,
    "Frying Pan": 264,
    "Stickybomb Jumper": 265,
    "Amputator": 304,
    "Crusader's Crossbow": 305,
    "Ullapool Caber": 307,
    "Loch-n-Load": 308,
    "Brass Beast": 312,
    "Candy Cane": 317,
    "Boston Basher": 325,
    "Back Scratcher": 326,
    "Claidheamh Mòr": 327,
    "Jag": 329,
    "Fists of Steel": 331,
    "Sharpened Volcano Fragment": 348,
    "Sun-on-a-Stick": 349,
    "Detonator": 351,
    "Fan O'War": 355,
    "Conniver's Kunai": 356,
    "Shahanshah": 401,
    "Bazaar Bargain": 402,
    "Persian Persuader": 404,
    "Quick-Fix": 411,
    "Overdose": 412,
    "Solemn Vow": 413,
    "Liberty Launcher": 414,
    "Reserve Shooter": 415,
    "Market Gardener": 416,
    "Saxxy": 423,
    "Tomislav": 424,
    "Family Business": 425,
    "Cow Mangler 5000": 441,
    "Righteous Bison": 442,
    "Disciplinary Action": 447,
    "Soda Popper": 448,
    "Winger": 449,
    "Three-Rune Blade": 452,
    "Postal Pummeler": 457,
    "Enforcer": 460,
    "Big Earner": 461,
    "Maul": 466,
    "Conscientious Objector": 474,
    "Nessie's Nine Iron": 482,
    "Original": 513,
    "Diamondback": 525,
    "Machina": 526,
    "Widowmaker": 527,
    "Unarmed Combat": 572, 
    "Wanga Prick": 574,
    "Apoco-Fists": 587, 
    "Eureka Effect": 589,
    "Third Degree": 593,
    "Phlogistinator": 594,
    "Manmelter": 595,
    "Scottish Handshake": 609,
    "Sharp Dresser": 638,
    "Wrap Assassin": 648,
    "Spy-Cicle": 649,
    "Black Rose": 727,
    "Beggar's Bazooka": 730,
    "Sapper": 735,
    "Scorch Shot": 740,
    "Cleaner's Carbine": 751,
    "Hitman's Heatmaker": 752,
    "Baby Face's Blaster": 772,
    "Escape Plan": 775,
    "AWPer Hand": 851,
    "Freedom Staff": 880,
    "Bat Outta Hell": 939,
    "Loose Cannon": 996, 
    "Rescue Ranger": 997,
    "Vaccinator": 998, 
    "Ham Shank": 1013,
    "Fortified Compound": 1092,
    "Classic": 1098,
    "Back Scatter": 1103,
    "Air Strike": 1104, 
    "Necro Smasher": 1123,
    "Crossing Guard": 1127,
    "Quickiebomb Launcher": 1150,
    "Iron Bomber": 1151,
    "Panic Attack": 1153,
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
const TAUNT_INDEX_MAP = {
    "High Five!": 167,
    "Director's Vision": 438,
    "Schadenfreude": 463,
    "Meet the Medic": 477,
    "Shred Alert": 1015,
    "Square Dance": 1106,
    "Flippin' Awesome": 1107,
    "Buy a Life": 1108,
    "Results Are In": 1109,
    "Rock, Paper, Scissors": 1110,
    "Skullcracker": 1111,
    "Party Trick": 1112,
    "Fresh Brewed Victory": 1113,
    "Spent Well Spirits": 1114,
    "Rancho Relaxo": 1115,
    "I See You": 1116,
    "Battin' a Thousand": 1117,
    "Conga": 1118,
    "Deep Fried Desire": 1119,
    "Oblooterated": 1120,
    "Kazotsky Kick": 1157,
    "Mannrobics": 1162,
    "Carlton": 1168,
    "Victory Lap": 1172,
    "Table Tantrum": 1174,
    "Boiling Point": 1175,
    "Yeti Punch": 1182,
    "Yeti Smash": 1183,
    "Panzer Pants": 1196,
    "Scooty Scoot": 1197,
    "Pool Party": 30570,
    "Boston Breakdance": 30572,
    "Killer Solo": 30609,
    "Most Wanted": 30614,
    "Box Trot": 30615,
    "Proletariat Posedown": 30616,
    "Bucking Bronco": 30618,
    "Burstchester": 30621,
    "Bad Pipes": 30671,
    "Zoomin' Broom": 30672,
    "Soldier's Requiem": 30673,
    "Fubar Fanfare": 30761,
    "Disco Fever": 30762,
    "Balloonibouncer": 30763,
    "Second Rate Sorcery": 30816,
    "Didgeridrongo": 30839,
    "Scotsmann's Stagger": 30840,
    "Dueling Banjo": 30842,
    "Russian Arms Race": 30843,
    "Soviet Strongarm": 30844,
    "Jumping Jack": 30845,
    "Headcase": 30876,
    "Trackman's Touchdown": 30917,
    "Surgeon's Squeezebox": 30918,
    "Skating Scorcher": 30919,
    "Bunnyhopper": 30920,
    "Runner's Rhythm": 30921,
    "Luxury Lounge": 30922,
    "Pooped Deck": 31153,
    "Time Out Therapy": 31154,
    "Rocket Jockey": 31155,
    "Boston Boarder": 31156,
    "Scorcher's Solo": 31157,
    "Texas Truckin'": 31160,
    "Spin-to-Win": 31161,
    "Fist Bump": 31162,
    "Drunken Sailor": 31201,
    "Profane Puppeteer": 31202,
    "Mannbulance!": 31203,
    "Bare Knuckle Beatdown": 31207,
    "Homerunner's Hobby": 31233,
    "Doctor's Defibrillators": 31236,
    "Shooter's Stakeout": 31237,
    "Hot Wheeler": 31239,
    "Texas Twirl 'Em": 31286,
    "Scaredy-Cat!": 31288,
    "Crypt Creeper": 31289,
    "Travel Agent": 31290,
    "Drunk Mann's Cannon": 31291,
    "Shanty Shipmate": 31292,
    "Russian Rubdown": 31320,
    "Tailored Terminal": 31321,
    "Roasty Toasty": 31322,
    "Star-Spangled Strategy": 31347,
    "Killer Joke": 31348,
    "Head Doctor": 31349,
    "Teufort Tango": 31351,
    "Road Rager": 31352,
    "Killer Signature": 31354,
    "Roar O'War": 31380,
    "Neck Snap": 31381,
    "Borrowed Bones": 31382,
    "Cheers!": 31412,
    "Mourning Mercs": 31413,
    "Foul Play": 31414,
    "Can It!": 31438,
    "Cremators Condolences": 31439,
    "Straight Shooter Tutor": 31440,
    "Unleashed Rage": 31441,
    "Crushing Defeat": 31465,
    "Peace Out": 31466,
    "Commending Clap": 31467,
    "Punchline": 31468,
    "Curtain Call": 31491,
    "Peace!": 31492,
    "Fore-Head Slice": 31493,
    "Final Score": 31518,
    "Bear Hug": 31519,
    "Texan Trickshot": 31520,
    "Flying Colors": 31521,
    "Heartbreaker": 31545,
    "Healthcare Hog": 31546,
    "Ring King": 31547,
    "Dead Mann's Drink": 31576,
    "Critical Fail": 31577,
    "Chairholder": 31578,
    "Circuit Breaker": 31602,
    "Buffoon's Bivouac": 31603,
    "Faux-calization": 31604,
    "Friendly Fire": 31605,
};
const EFFECT_MAP = {
                    "Invalid Particle": 0,
                    "Particle 1": 1,
                    "Flying Bits": 2,
                    "Nemesis Burst": 3,
                    "Community Sparkle": 4,
                    "Green Confetti": 6,
                    "Purple Confetti": 7,//                                              ⠈⠙⠀⠀⠀⠀⠀⠀⢀⠀⣀⡀⢠⣿⠟⢛⠃⠀⠀⢣⠀⠀⢀⣿⠀⠀⢀⠀⣿⡆⠀⠋⠀⠀⣿⣴⣿⠏⠀⠀⢈⡇⡆⢠⢟⢸⣿⣿⣿⣿
                    "Haunted Ghosts": 8,//                                                ⠀⠀⠀⠀⠀⠀⠀⠀⣼⣶⣿⣇⣘⡇⠀⠀⠀⠀⠸⡆⠣⠀⠸⡇⠀⠀⢸⡆⡜⣷⠀⠀⠀⢠⡙⠉⠀⠀⠀⠀⣾⢧⠁⣼⢸⠘⣿⣿⣿⣿
                    "Green Energy": 9,//                                                  ⡀⠀⠀⠀⠀⠀⠀⠠⠟⣃⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡃⠱⡀⠁⠀⠀⠀⣇⡇⣿⡆⠀⠀⠈⠁⠀⠀⠀⠀⣸⡿⡘⢠⡏⠈⠀⣿⣿⠟⣿
                    "Purple Energy": 10,//                                                ⣧⠀⠀⠀⠀⠀⠀⣀⣸⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⠐⠜⢄⠀⠀⠀⠙⣿⠘⣟⠄⠀⠀⠀⠀⠀⠀⣸⠟⣴⠃⣾⠃⣀⠀⣿⢁⢀⣿
                    "Circling TF Logo": 11,//                                             ⢿⠄⠀⠀⠀⠀⠈⣿⡿⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢇⠈⢄⠀⠀⠀⠀⠘⣇⢹⡄⠀⠀⠠⠀⠀⣰⡏⠀⡏⢰⡿⠀⠁⠸⢡⡎⢸⣿
                    "Massed Flies": 12,//                                               ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⢢⠀⠀⠀⠈⠂⠀⠀⠀⠀⠸⡀⠘⠄⠻⢶⡄⠁⢀⡼⠟⠀⣸⠀⠋⠀⢀⢄⠔⡟⠀⣿⣿
                    "Burning Flames": 13,//                                               ⣦⠀⠀⠀⠀⠀⠀⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⢀⠀⠡⢔⡊⠭⠀⡀⠀⢋⣤⠀⢰⠇⠀⣠⠞⡡⠃⡼⠁⢸⣿⣿
                    "Scorching Flames": 14,//                                             ⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⣠⠞⠋⣴⠖⣡⣞⠉⠀⠀⠀⢹⡏⠀⢀⠀⠛⣥⡞⢁⠎⠀⢀⣿⣿⣿
                    "Searing Plasma": 15,//                                               ⠿⠙⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠁⠀⢸⢃⡜⠁⠀⠀⠀⠀⠀⢸⠃⡠⠈⠣⣠⠀⡠⠁⠀⠠⢋⡩⠟⣻
                    "Vivid Plasma": 16,//                                                 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⣤⣶⡄⠀⠈⠀⠃⠀⠀⣿⠀⠀⢀⣴⠞⠋⢀⣼⣿
                    "Sunbeams": 17,//                                                     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⠀⠀⣠⠀⠀⠠⠋⠀⢰⢋⣠⠞⣡⣿⣿⣿
                    "Circling Peace Sign": 18,//                                          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⠀⠐⣄⠀⣹⠟⠁⠀⡈⠕⠂⢀⠀⠠⡇⠘⠉⢀⣾⣿⣿⣿⣿
                    "Circling Heart": 19,//                                               ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠠⠄⠀⠘⢿⡇⠀⡀⠈⠴⢋⣤⠇⢀⡄⠀⠀⠚⢻⣿⣿⣿⣿⣿
                    "Map Stamps": 20,//                                                   ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢤⡄⠀⢀⡀⠀⢀⣠⣴⡟⠀⠠⠴⣶⣾⣿⣿⣿⣿⣿⣿⣿
                    "Genteel Smoke": 28,//                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⠟⢠⣇⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿
                    "Stormy Storm": 29,//                                                 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣒⣿⠿⠋⢀⣾⣿⢀⡀⠀⠈⠙⣿⣿⣿⣿⡟⠛
                    "Blizzardy Storm": 30,//                                              ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠁⢀⠀⣼⠋⣿⠀⠙⠷⣄⡀⠈⠉⠉⠀⠀⠀
                    "Nuts n' Bolts": 31,//                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢆⠀⠀⠀⠀⣠⠀⢠⡎⢠⡏⠀⠟⠀⠀⠀⠈⠻⠆⠀⠀⣀⣀⠀
                    "Orbiting Planets": 32,//                                             ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡆⠀⠀⠀⠃⠀⠘⠀⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇
                    "Orbiting Fire": 33,//                                                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠤⠤⠴⠶⣶⣶⣭⣄⣀⠀⠀⠀⢀⣈⣫⣤⣤⣤⣤⣤⣄⣀⠀⠀⠀⢸⣿⣿⠁
                    "Bubbling": 34,//                                                     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠒⠒⠛⠛⠿⣿⣿⣿⠉⠉⠉⠉⡉⠛⠿⢷⣶⣶⠶⠀⠀⠀⠀⣿⣿⡇⠀
                    "Smoking": 35,//                                                      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⢰⣿⣿⠀⣸
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
    "Team Shine": "#FF4D4D",
    "Deadly Daffodil": "#E6E600",
    "Manndarin": "#FF7E00",
    "Mean Green": "#4DFF4D",
    "Agonizing Emerald": "#00CC00",
    "Villainous Violet": "#9933FF",
    "Hot Rod": "#FF66FF"
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
const PART_GRADES = {
    reinforced: ["Robot Emotion Detector", "Robot Bomb Stabilizer", "Robot Humor Suppression Pump"],
    battleWorn: ["Robot Taunt Processor", "Robot Money Furnace", "Robot KB-808"],
    pristine: ["Robot Brainstorm Bulb", "Robot Currency Digester"]
};
const FABRICATOR_REQUIREMENTS = {
    specialized: { weapons: 1, battleWorn: 24, reinforced: 5, pristine: 0 },
    professional: { weapons: 2, battleWorn: 16, reinforced: 6, pristine: 3 }
};
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
function getRequiredMaterials(asset) {
    let required = { weapons: 0, reinforced: 0, battleWorn: 0, pristine: 0 };
    if (!asset || !asset.descriptions) return required;

    for (let desc of asset.descriptions) {
        if (!desc.value) continue;

        // Parse "[part name] x [quantity]" pattern from Steam descriptions
        const partMatch = desc.value.match(/([^,\n<]+?)\s*x\s*(\d+)/i);
        if (!partMatch) continue;

        const partName = partMatch[1].trim();
        const quantity = parseInt(partMatch[2], 10);

        // Check for weapon requirement
        if (partName.includes("Killstreak Item") || partName.includes("Killstreak")) {
            required.weapons += quantity;
            continue;
        }

        // Check each grade
        for (let grade of ['reinforced', 'battleWorn', 'pristine']) {
            if (PART_GRADES[grade].some(name => partName.includes(name))) {
                required[grade] += quantity;
                break;
            }
        }
    }
    return required;
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

        // Detect Unusualifiers
        const isUnusualifier = itemName.includes("Unusualifier");
        let tauntId = null;
        let tauntCleanName = "";
        if (isUnusualifier) {
            tauntCleanName = itemName
                .replace(/^Taunt: /, "")
                .replace(/ Unusualifier$/, "")
                .trim();
            tauntId = TAUNT_INDEX_MAP[tauntCleanName] || null;
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

        // ROW 1: PRIMARY (BPTF, CLS, STN, MCO, EFFECT)
        const row1 = document.createElement("div");
        row1.style.cssText = "display: flex; gap: 4px; align-items: center;";

        const btnStyle = "padding: 1px 5px; color: #fff; font-size: 10px; border-radius: 2px; text-decoration: none; font-weight: bold;";

        // BPTF Button
        const bptfBtn = document.createElement("a");
        bptfBtn.textContent = "BPTF";
        bptfBtn.href = isUnusualifier
            ? `https://backpack.tf/stats/Unusual/Unusualifier/Tradable/Non-Craftable/${tauntId || ''}`
            : `https://backpack.tf/stats/${encodeURIComponent(quality)}/${encodeURIComponent(itemName)}/Tradable/Craftable${effectId ? '/' + effectId : ''}`;
        bptfBtn.target = "_blank";
        bptfBtn.style.cssText = btnStyle + "background: #587a91;";
        row1.appendChild(bptfBtn);

        // Classifieds (Cls) Button
        if (isUnusualifier && tauntCleanName) {
            // Unusualifier-specific CLS link
            const clsBtn = document.createElement("a");
            clsBtn.textContent = "CLS";
            clsBtn.href = `https://backpack.tf/classifieds?item=${encodeURIComponent(tauntCleanName)}&item_type=target`;
            clsBtn.target = "_blank";
            clsBtn.style.cssText = btnStyle + "background: #395163;";
            row1.appendChild(clsBtn);
        } else if (!isSkin) {
            let clsUrl = `https://backpack.tf/classifieds?item=${encodeURIComponent(itemName)}&quality=5`;
            if (effectId) clsUrl += `&particle=${effectId}`;
            if (quality === "Strange Unusual") clsUrl += "&elevated=11";

            const clsBtn = document.createElement("a");
            clsBtn.textContent = "CLS";
            clsBtn.href = clsUrl;
            clsBtn.target = "_blank";
            clsBtn.style.cssText = btnStyle + "background: #395163;";
            row1.appendChild(clsBtn);
        }

        // STN Button
        if (effectName) {
            const stnQuery = ("Unusual " + effectName + " " + itemName.replace(" | ", " ")).replace(/\s+/g, '+');
            const stnBtn = document.createElement("a");
            stnBtn.textContent = "STN";
            stnBtn.href = `https://stntrading.eu/item/tf2/${stnQuery}`;
            stnBtn.target = "_blank";
            stnBtn.style.cssText = btnStyle + "background: #22b14c;";
            row1.appendChild(stnBtn);

            // NEW: Mannco.store Button (Only for non-skin hats & taunts)
            if (!isSkin) {
                // Inline URL cleaner: handles case conversion, drops special characters, and fixes hyphens
                const cleanManncoStr = (str) => {
                    return str.toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, "") // Keep only alphanumeric characters, spaces, and existing hyphens
                        .trim()
                        .replace(/\s+/g, "-")// Swap all spaces out for a single hyphen
                        .replace(/-+/g, "-");// Safety collapse to prevent double hyphens ("--")
                };

                const mEffect = cleanManncoStr(effectName);
                const mQuality = cleanManncoStr(quality);
                const mHat = cleanManncoStr(itemName);

                const manncoBtn = document.createElement("a");
                manncoBtn.textContent = "MCS";
                manncoBtn.href = `https://mannco.store/item/440-${mEffect}-${mQuality}-${mHat}`;
                manncoBtn.target = "_blank";
                manncoBtn.style.cssText = btnStyle + "background: #2596be;"; //
                row1.appendChild(manncoBtn);
            }

            const effectBadge = document.createElement("span");
            effectBadge.style.cssText = "padding: 1px 5px; font-size: 10px; border-radius: 2px; background: #222; color: #fff; border: 1px solid #444; font-weight: bold;";
            effectBadge.textContent = effectName;
            row1.appendChild(effectBadge);
        }

        mainWrapper.appendChild(row1);

        // ROW 2: TOOLS & ATTRIBUTES (WP, STN-WP, KS INFO)
        const row2 = document.createElement("div");
        row2.className = "bptf-row-secondary";
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
            wpStnBtn.textContent = "STNWP";
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
                let clsUrl = ""; // NEW: Variable to hold the Classifieds link

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

                    // --- SKIN DETECTION LOGIC ---
                    const wears = ["(Factory New)", "(Minimal Wear)", "(Field-Tested)", "(Well-Worn)", "(Battle Scarred)"];
                    const isSkin = wears.some(wear => itemName.toLowerCase().includes(wear.toLowerCase()));

                    if (isSkin) {
                        if (quality === "Unique") quality = "Decorated Weapon";

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

                    url = `https://backpack.tf/stats/${quality}/${encodeURIComponent(itemName)}/Tradable/Craftable`;
                } else {
                    // This block targets ONLY Kits and Fabricators
                    let weaponName = fullName
                        .replace("Professional Killstreak ", "")
                        .replace("Specialized Killstreak ", "")
                        .replace(" Kit Fabricator", "")
                        .replace(" Kit", "")
                        .trim();

                    const weaponIndex = WEAPON_INDEX_MAP[weaponName];

                    if (weaponIndex) {
                        const ksTier = isPro ? "3" : "2";
                        if (isKit) {
                            const ksName = isPro ? "Professional" : "Specialized";
                            url = `https://backpack.tf/stats/Unique/${ksName}%20Killstreak%20Kit/Tradable/Non-Craftable/${ksTier}-${weaponIndex}`;
                        } else if (isFab) {
                            const fabDef = isPro ? "6526" : "6523";
                            url = `https://backpack.tf/stats/Unique/Fabricator/Tradable/Craftable/${fabDef}-6-${weaponIndex}`;
                        }

                        // NEW: Generate the search query for the custom Classifieds link
                        const craftableValue = isKit ? "-1" : "1";
                        clsUrl = `https://backpack.tf/classifieds?item=${encodeURIComponent(weaponName)}&craftable=${craftableValue}&killstreak_tier=${ksTier}&item_type=target`;
                    }
                }

                // Append standard stats BPTF button
                if (url) {
                    const ksBtn = document.createElement("a");
                    ksBtn.textContent = "BPTF";
                    ksBtn.className = "ks-btn";
                    ksBtn.style.cssText = "padding: 1px 5px; background: #587a91; color: #fff; font-size: 10px; border-radius: 2px; text-decoration: none; font-weight: bold;";
                    ksBtn.href = url;
                    ksBtn.target = "_blank";
                    secondaryRow.appendChild(ksBtn);
                }

                // NEW: Append Classifieds button immediately after BPTF if it's a Kit/Fabricator
                if (clsUrl) {
                    const clsBtn = document.createElement("a");
                    clsBtn.textContent = "CLS";
                    clsBtn.className = "ks-cls-btn";
                    clsBtn.style.cssText = "padding: 1px 5px; background: #395163; color: #fff; font-size: 10px; border-radius: 2px; text-decoration: none; font-weight: bold;";
                    clsBtn.href = clsUrl;
                    clsBtn.target = "_blank";
                    secondaryRow.appendChild(clsBtn);
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

            // Prefilled indicator for Fabricators
            const fullName = nameEl.textContent.trim();
            const isFab = fullName.includes("Fabricator");
            if (isFab && (isPro || isSpec)) {
                const requirements = getRequiredMaterials(asset);
                const defaults = isPro ? FABRICATOR_REQUIREMENTS.professional : FABRICATOR_REQUIREMENTS.specialized;

                const prefilled = {
                    reinforced: defaults.reinforced - requirements.reinforced,
                    battleWorn: defaults.battleWorn - requirements.battleWorn,
                    pristine: defaults.pristine - requirements.pristine,
                    weapons: defaults.weapons - requirements.weapons
                };

                // Build indicator parts for categories that have prefilled amounts
                let prefilledParts = [];
                if (prefilled.reinforced > 0) prefilledParts.push(`-${prefilled.reinforced} R`);
                if (prefilled.battleWorn > 0) prefilledParts.push(`-${prefilled.battleWorn} B`);
                if (prefilled.pristine > 0) prefilledParts.push(`-${prefilled.pristine} P`);
                if (prefilled.weapons > 0) prefilledParts.push(`-${prefilled.weapons} wep`);

                if (prefilledParts.length > 0) {
                    // Check glow conditions
                    const shouldGlow = prefilled.battleWorn > 10 || prefilled.pristine >= 2 || prefilled.weapons > 0;
                    const glowStyle = shouldGlow
                        ? "color: #FFD700; font-weight: bold; text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); border: 1px solid rgba(255, 215, 0, 0.4);"
                        : "color: #aaa;";

                    const prefilledIndicator = document.createElement("span");
                    prefilledIndicator.style.cssText = `display: flex; align-items: center; gap: 2px; padding: 1px 4px; font-size: 10px; border-radius: 2px; background: rgba(0,0,0,0.3); border: 1px solid #444; ${glowStyle}`;
                    prefilledIndicator.textContent = prefilledParts.join(" ");
                    secondaryRow.appendChild(prefilledIndicator);
                }
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

    const skuString = itemData.sku;
    if (!skuString) return;

    let skuParts = skuString.split(';');
    const defindex = skuParts[0];

    // --- SCM KIT FIX ---
    const kitDefindexes = ["6523", "6526", "6527","9258"];
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

        paintName = skuData.name
            .replace(currentWeapon, "")
            .replace(/Strange |Festivized |Professional Killstreak |Specialized Killstreak |Killstreak |Unusual |Vintage |Genuine |Haunted |Collector's /g, "")
            .replace(/\s*\((Factory New|Minimal Wear|Field-Tested|Well-Worn|Battle Scarred)\)\s*$/, "")
            .trim();
    }

    const graphContainer = document.getElementById('pricehistory_container');
    const infoContainer = document.querySelector('.market_listing_iteminfo');

    if (!graphContainer && !infoContainer) return;

    const navBox = document.createElement('div');
    navBox.id = 'scm-navigator';
    navBox.style.cssText = "background: #101822; border: 1px solid #4f94bc; padding: 12px; margin-top: 15px; margin-bottom: 15px; border-radius: 4px; color: #ccc; font-size: 12px;";

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
                baseItemName = baseItemName.replace(/\s*\((Factory New|Minimal Wear|Field-Tested|Well-Worn|Battle Scarred)\)\s*$/, "").trim();
                finalWear = " " + wear;
            }

            finalName = `${isStr ? 'Strange ' : ''}${inherentQuality}${isFest ? 'Festivized ' : ''}${ksPrefix}${baseItemName}${finalWear} ${toolType}`.trim();
        }

        window.location.href = `https://steamcommunity.com/market/listings/440/${encodeURIComponent(finalName)}`;
    };
}

// ===== UI CUSTOMIZATION =====


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
            <input type="text" inputmode="decimal" id="cfg-key-price" value="${getKeyPrice()}" style="background:#000; color:#fff; border:1px solid #444; width:90%; padding:2px;">
        </div>

        <div style="margin-bottom:10px;">
            <label style="font-size:11px; display:block;">Ref per Key:</label>
            <input type="text" inputmode="decimal" id="cfg-ref-price" value="${getRefPrice()}" style="background:#000; color:#fff; border:1px solid #444; width:90%; padding:2px;">
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
        // Run what the user typed through the smart parser before saving!
        const safeKey = parseSafeNumber(document.getElementById("cfg-key-price").value);
        const safeRef = parseSafeNumber(document.getElementById("cfg-ref-price").value);

        setKeyPrice(safeKey);
        setRefPrice(safeRef);
        localStorage.setItem("showKeys", document.getElementById("cfg-show-keys").checked);
        localStorage.setItem("showRef", document.getElementById("cfg-show-ref").checked);
        localStorage.setItem("hideItemDetails", document.getElementById("cfg-hide-details").checked);
        localStorage.setItem("hideEntireInfo", document.getElementById("cfg-hide-all").checked);
        localStorage.setItem("enableNavigator", document.getElementById("cfg-enable-nav").checked);
        localStorage.setItem("enablePriceDB", document.getElementById("cfg-enable-pdb").checked);
        location.reload();
    };
}
// ===== PRICE PARSER =====


function parseSafeNumber(input) {
    if (!input) return 0;
    if (typeof input === "number") return input;

    const firstLine = input.toString().split("\n")[0];

    // Strip everything except digits, dots, and commas (removes €, $, letters, etc.)
    let clean = firstLine.replace(/[^\d.,]/g, '');
    // CASE 1: Contains BOTH a dot and a comma (e.g., "1.234,56" or "1,234.56")
    if (clean.includes(',') && clean.includes('.')) {
        const lastComma = clean.lastIndexOf(',');
        const lastDot = clean.lastIndexOf('.');
        if (lastComma > lastDot) {
            clean = clean.replace(/\./g, '').replace(',', '.');
        } else {
            clean = clean.replace(/,/g, '');
        }
    }
    // CASE 2: Contains ONLY commas (e.g., "67,846" vs "2,50")
    else if (clean.includes(',')) {
        const parts = clean.split(',');
        const lastPart = parts[parts.length - 1];
        if (parts.length > 2 || lastPart.length === 3) {
            clean = clean.replace(/,/g, '');
        } else {
            clean = clean.replace(',', '.');
        }
    }
    // CASE 3: Contains ONLY dots (e.g., "25.000" vs "2.50")
    else if (clean.includes('.')) {
        const parts = clean.split('.');
        const lastPart = parts[parts.length - 1];
        if (parts.length > 2 || lastPart.length === 3) {
            clean = clean.replace(/\./g, '');
        }
    }

    // Final conversion to a standard JavaScript float
    return parseFloat(clean) || 0;
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

        const price = parseSafeNumber(priceEl.innerText);
        if (!price) return;

        const keyPrice = getKeyPrice();
        const refPerKey = getRefPrice();
        const keys = price / keyPrice;

        const div = document.createElement("div");
        div.className = "price-converter-display";
        div.style.cssText = "font-size: 11px; margin-bottom: 2px; line-height: 1.1;";

        let html = "";

        // 1. Standard Key Display (e.g., ≈ 5.50 keys)
        if (showKeys) {
            html += `<div style="color: #9ecbff;">≈ ${keys.toFixed(2)} keys</div>`;
        }

        // 2. Compact Mixed Metal Display (e.g., ≈ 5 keys 20 ref OR ≈ 20 ref)
        if (showRef) {
            const totalRef = Math.round((keys * refPerKey) * 10) / 10;

            const mixedKeys = Math.floor(totalRef / refPerKey);
            const mixedRef = Math.round((totalRef % refPerKey) * 10) / 10;

            let refParts = [];


            if (mixedKeys > 0) {
                refParts.push(`${mixedKeys} key${mixedKeys > 1 ? 's' : ''}`);
            }
            if (mixedRef > 0 || mixedKeys === 0) {
                refParts.push(`${mixedRef} ref`);
            }
          html += `<div style="color: #dedede;">≈ ${refParts.join(" ")}</div>`;
        }

        div.innerHTML = html;
        priceEl.parentNode.insertBefore(div, priceEl);
    });
}
// ===== OBSERVER =====


let timeout = null;
const keyObserver = new MutationObserver(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        addKeyPrices();
        addPriceDBButton();
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
addInstaBuyButtons();
})();
