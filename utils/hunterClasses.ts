export interface HunterClass {
  id: string;
  name: string;
  type: 'Fighter' | 'Assassin' | 'Mage' | 'Ranger' | 'Tank' | 'Healer' | 'Support' | 'Special';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  description: string;
}

export const hunterClasses: HunterClass[] = [
  // === FIGHTER ===
  { id: 'fighter', name: 'Fighter', type: 'Fighter', rarity: 'Common', description: 'Petarung jarak dekat dengan keseimbangan antara serangan dan pertahanan fisik.' },
  { id: 'swordsman', name: 'Swordsman', type: 'Fighter', rarity: 'Common', description: 'Pengguna pedang yang handal dengan serangan tebasan yang cepat.' },
  { id: 'brawler', name: 'Brawler', type: 'Fighter', rarity: 'Common', description: 'Petarung tangan kosong dengan kekuatan pukulan luar biasa.' },
  { id: 'berserker', name: 'Berserker', type: 'Fighter', rarity: 'Rare', description: 'Petarung buas yang menukar pertahanan demi daya hancur brutal.' },
  { id: 'sword_master', name: 'Sword Master', type: 'Fighter', rarity: 'Epic', description: 'Ahli pedang elit yang dapat memotong apapun.' },
  { id: 'blade_dancer', name: 'Blade Dancer', type: 'Fighter', rarity: 'Epic', description: 'Petarung gesit yang mengandalkan serangan kombo yang mematikan dan tarian pedang.' },

  // === ASSASSIN ===
  { id: 'assassin', name: 'Assassin', type: 'Assassin', rarity: 'Common', description: 'Pembunuh bayaran yang fokus pada kecepatan dan serangan kejutan fatal.' },
  { id: 'thief', name: 'Thief', type: 'Assassin', rarity: 'Common', description: 'Pencuri yang gesit dengan kemampuan sembunyi dan mobilitas tinggi.' },
  { id: 'shadow_walker', name: 'Shadow Walker', type: 'Assassin', rarity: 'Rare', description: 'Dapat menyatu dengan bayangan untuk menghindari deteksi musuh.' },
  { id: 'nightshade', name: 'Nightshade', type: 'Assassin', rarity: 'Epic', description: 'Pengguna racun mematikan yang selalu menyerang dari titik buta lawan.' },
  { id: 'phantom', name: 'Phantom', type: 'Assassin', rarity: 'Legendary', description: 'Pembunuh tak terlihat yang serangannya mustahil untuk dihindari maupun diantisipasi.' },

  // === MAGE ===
  { id: 'mage', name: 'Mage', type: 'Mage', rarity: 'Common', description: 'Pengguna sihir elemen dasar dari jarak jauh.' },
  { id: 'pyromancer', name: 'Pyromancer', type: 'Mage', rarity: 'Rare', description: 'Penyihir spesialis api yang memiliki serangan area besar dan destruktif.' },
  { id: 'cryomancer', name: 'Cryomancer', type: 'Mage', rarity: 'Rare', description: 'Penyihir es yang mampu membekukan dan membatasi pergerakan musuh secara absolut.' },
  { id: 'aeromancer', name: 'Aeromancer', type: 'Mage', rarity: 'Rare', description: 'Pengendali angin yang mampu terbang dan menembakkan badai pelumpuh.' },
  { id: 'archmage', name: 'Archmage', type: 'Mage', rarity: 'Epic', description: 'Penyihir tingkat lanjut yang menguasai berbagai elemen tingkat tinggi.' },
  { id: 'rune_caster', name: 'Rune Caster', type: 'Mage', rarity: 'Epic', description: 'Menggunakan rune kuno untuk merapal sihir ledakan yang dilarang.' },

  // === RANGER ===
  { id: 'archer', name: 'Archer', type: 'Ranger', rarity: 'Common', description: 'Penembak jitu dengan busur dan ketelitian tinggi.' },
  { id: 'hunter', name: 'Hunter', type: 'Ranger', rarity: 'Common', description: 'Ahli pelacak yang dapat menjinakkan binatang buas dan memasang jebakan.' },
  { id: 'sniper', name: 'Sniper', type: 'Ranger', rarity: 'Rare', description: 'Penembak jarak sangat jauh dengan satu tembakan fatal (One Shot, One Kill).' },
  { id: 'magic_archer', name: 'Magic Archer', type: 'Ranger', rarity: 'Epic', description: 'Memanah menggunakan anak panah energi sihir yang dapat menembus halangan.' },
  { id: 'gunner', name: 'Gunner', type: 'Ranger', rarity: 'Rare', description: 'Pengguna senjata api berat yang berfungsi sebagai mesin penghancur masal.' },

  // === TANK ===
  { id: 'tank', name: 'Tank', type: 'Tank', rarity: 'Common', description: 'Pelindung garis depan yang bertugas menyerap serangan musuh.' },
  { id: 'knight', name: 'Knight', type: 'Tank', rarity: 'Common', description: 'Ksatria berzirah berat dengan moral dan disiplin tinggi.' },
  { id: 'paladin', name: 'Paladin', type: 'Tank', rarity: 'Rare', description: 'Ksatria suci yang memiliki pertahanan mutlak sekaligus sihir penyembuhan area.' },
  { id: 'guardian', name: 'Guardian', type: 'Tank', rarity: 'Epic', description: 'Pelindung kokoh seperti benteng yang dapat memantulkan kembali damage ke musuh.' },
  { id: 'juggernaut', name: 'Juggernaut', type: 'Tank', rarity: 'Legendary', description: 'Tank absolut dengan ketahanan fisik luar biasa, kebal terhadap crowd-control.' },

  // === HEALER & SUPPORT ===
  { id: 'healer', name: 'Healer', type: 'Healer', rarity: 'Common', description: 'Pemberi dukungan medis dasar untuk memulihkan luka tim.' },
  { id: 'cleric', name: 'Cleric', type: 'Healer', rarity: 'Rare', description: 'Penyembuh yang menggunakan kekuatan ilahi untuk membersihkan kutukan dan menyembuhkan.' },
  { id: 'enchanter', name: 'Enchanter', type: 'Support', rarity: 'Rare', description: 'Memberikan buff peningkatan stat luar biasa untuk seluruh sekutu di medan perang.' },
  
  // === SPECIAL & MYTHIC (SOLO LEVELING INSPIRED) ===
  { id: 'necromancer', name: 'Necromancer', type: 'Special', rarity: 'Epic', description: 'Mampu memanipulasi kematian dan membangkitkan prajurit undead skala kecil.' },
  { id: 'shadow_monarch', name: 'Shadow Monarch', type: 'Special', rarity: 'Mythic', description: 'Penguasa bayangan sejati yang dapat membangkitkan pasukan bayangan abadi (Class Eksklusif).' },
];

export const getClassesByRarity = (rarity: HunterClass['rarity']) => {
  return hunterClasses.filter(c => c.rarity === rarity);
};

export const getClassById = (id: string) => {
  return hunterClasses.find(c => c.id === id);
};
