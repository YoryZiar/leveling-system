export interface SkillData {
  id: string;
  name: string;
  type: 'Aktif' | 'Pasif';
  manaCost: string | null;
  desc: string;
  icon: string;
  baseSource: string; // The quest it is based on
}

export const SKILL_POOL: SkillData[] = [
  // --- STR (Strength) Based Skills ---
  // Push-up based
  { id: 'power_strike', name: 'Power Strike', type: 'Aktif', manaCost: '20 MP', desc: 'Memfokuskan kekuatan di lengan untuk serangan destruktif tunggal.', icon: 'fitness_center', baseSource: 'PUSH-UP' },
  { id: 'titan_push', name: 'Titan\'s Push', type: 'Aktif', manaCost: '50 MP', desc: 'Menciptakan gelombang kejut dari tolakan tangan yang memukul mundur musuh.', icon: 'waving_hand', baseSource: 'PUSH-UP' },
  { id: 'heavy_blow', name: 'Heavy Blow', type: 'Aktif', manaCost: '15 MP', desc: 'Pukulan berat dengan penetrasi armor sebesar 30%.', icon: 'sports_mma', baseSource: 'PUSH-UP' },
  
  // Squat based
  { id: 'quake_stomp', name: 'Quake Stomp', type: 'Aktif', manaCost: '40 MP', desc: 'Menginjak tanah dengan kekuatan penuh, memberikan stun area.', icon: 'sports_martial_arts', baseSource: 'SQUAT' },
  { id: 'colossus_stance', name: 'Colossus Stance', type: 'Pasif', manaCost: null, desc: 'Kuda-kuda absolut, kebal terhadap efek knockback.', icon: 'sports_gymnastics', baseSource: 'SQUAT' },
  { id: 'leap_of_faith', name: 'Leap of Faith', type: 'Aktif', manaCost: '35 MP', desc: 'Melompat sangat tinggi dan mendarat memberikan damage area.', icon: 'publish', baseSource: 'SQUAT' },
  
  // Lunges based
  { id: 'piercing_lunge', name: 'Piercing Lunge', type: 'Aktif', manaCost: '25 MP', desc: 'Terjang lurus menembus pertahanan lawan seketika.', icon: 'sports_martial_arts', baseSource: 'LUNGES' },
  { id: 'forward_strike', name: 'Forward Strike', type: 'Aktif', manaCost: '15 MP', desc: 'Langkah maju cepat diikuti serangan fatal.', icon: 'keyboard_double_arrow_up', baseSource: 'LUNGES' },
  
  // Wall Push-ups / Tricep Dips / Arm Circles
  { id: 'barrier_push', name: 'Barrier Push', type: 'Aktif', manaCost: '30 MP', desc: 'Menghasilkan perisai tak terlihat dari tolakan angin ke depan.', icon: 'shield', baseSource: 'WALL PUSH-UPS' },
  { id: 'reverse_strike', name: 'Reverse Strike', type: 'Aktif', manaCost: '20 MP', desc: 'Serangan siku ke belakang dengan kekuatan berlipat ganda saat terdesak.', icon: 'sports_kabaddi', baseSource: 'TRICEP DIPS' },
  { id: 'whirlwind_arms', name: 'Whirlwind Deflection', type: 'Aktif', manaCost: '5 MP/detik', desc: 'Memutar senjata atau lengan untuk menangkis proyektil.', icon: 'cyclone', baseSource: 'ARM CIRCLES' },
  
  // Donkey Kicks / Superman / Inchworms
  { id: 'rear_assault', name: 'Rear Assault', type: 'Aktif', manaCost: '25 MP', desc: 'Tendangan membelakangi lawan yang mematikan.', icon: 'sports_martial_arts', baseSource: 'DONKEY KICKS' },
  { id: 'skyward_launch', name: 'Skyward Launch', type: 'Aktif', manaCost: '45 MP', desc: 'Menerbangkan diri dan musuh ke udara untuk kombo.', icon: 'flight_takeoff', baseSource: 'SUPERMAN HOLD' },
  { id: 'ground_viper', name: 'Ground Viper', type: 'Aktif', manaCost: '20 MP', desc: 'Serangan menyusur tanah yang menargetkan titik vital bawah musuh.', icon: 'bug_report', baseSource: 'INCHWORMS' },

  // --- VIT (Vitality / Core) Based Skills ---
  // Sit-up / Crunch
  { id: 'core_resolve', name: 'Core Resolve', type: 'Pasif', manaCost: null, desc: 'Regenerasi HP meningkat 50% ketika sedang duduk atau istirahat.', icon: 'favorite', baseSource: 'SIT-UP' },
  { id: 'inner_fortitude', name: 'Inner Fortitude', type: 'Pasif', manaCost: null, desc: 'Ketahanan mental terhadap sihir ilusi dan mind-control.', icon: 'psychology', baseSource: 'CRUNCH' },
  { id: 'iron_will', name: 'Iron Will', type: 'Pasif', manaCost: null, desc: 'Mengurangi rasa sakit fisik sebesar 20%.', icon: 'shield', baseSource: 'SIT-UP' },
  
  // Plank / Wall Sit / Side Plank
  { id: 'adamantine_body', name: 'Adamantine Body', type: 'Aktif', manaCost: '50 MP', desc: 'Tubuh mengeras seperti baja selama 10 detik, imun Physical Damage.', icon: 'accessibility', baseSource: 'PLANK' },
  { id: 'mountain_stance', name: 'Mountain Stance', type: 'Pasif', manaCost: null, desc: 'Sangat sulit dijatuhkan ketika berada di dekat permukaan padat.', icon: 'landscape', baseSource: 'WALL SIT' },
  { id: 'lateral_guard', name: 'Lateral Guard', type: 'Pasif', manaCost: null, desc: 'Serangan dari arah samping menerima pengurangan damage 30%.', icon: 'security', baseSource: 'SIDE PLANK' },
  { id: 'steel_skin', name: 'Steel Skin', type: 'Pasif', manaCost: null, desc: 'Ketahanan alami terhadap serangan benda tajam.', icon: 'shield', baseSource: 'PLANK' },
  
  // Russian Twist / Glute Bridge / Leg Raises / Bicycle Crunches
  { id: 'tornado_spin', name: 'Tornado Spin', type: 'Aktif', manaCost: '35 MP', desc: 'Putaran tubuh berkecepatan tinggi melempar musuh di sekitar.', icon: 'cyclone', baseSource: 'RUSSIAN TWIST' },
  { id: 'spiral_deflection', name: 'Spiral Deflection', type: 'Aktif', manaCost: '30 MP', desc: 'Mengembalikan 50% damage ke arah penyerang menggunakan gaya sentrifugal.', icon: 'sync', baseSource: 'RUSSIAN TWIST' },
  { id: 'seismic_lift', name: 'Seismic Lift', type: 'Aktif', manaCost: '40 MP', desc: 'Mengangkat beban hingga 50x berat badan menggunakan panggul.', icon: 'fitness_center', baseSource: 'GLUTE BRIDGE' },
  { id: 'upward_kick', name: 'Upward Kick', type: 'Aktif', manaCost: '20 MP', desc: 'Tendangan lurus ke atas dari posisi terbaring (Anti-Ground).', icon: 'arrow_upward', baseSource: 'LEG RAISES' },
  { id: 'cyclone_kick', name: 'Cyclone Kick', type: 'Aktif', manaCost: '45 MP', desc: 'Rentetan tendangan berputar bagaikan badai.', icon: 'directions_bike', baseSource: 'BICYCLE CRUNCHES' },

  // --- AGI (Agility / Speed) Based Skills ---
  // Run In Place / High Knees / Butt Kicks
  { id: 'sprint_burst', name: 'Sprint Burst', type: 'Aktif', manaCost: '10 MP/detik', desc: 'Meningkatkan kecepatan lari 300% dan meninggalkan jejak bayangan.', icon: 'directions_run', baseSource: 'LARI DI TEMPAT' },
  { id: 'wind_step', name: 'Wind Step', type: 'Pasif', manaCost: null, desc: 'Langkah kaki tidak bersuara dan terasa seimbang dengan angin.', icon: 'air', baseSource: 'LARI DI TEMPAT' },
  { id: 'sonic_sprint', name: 'Sonic Sprint', type: 'Aktif', manaCost: '60 MP', desc: 'Lari menembus batas kecepatan suara dalam waktu 2 detik.', icon: 'bolt', baseSource: 'HIGH KNEES' },
  { id: 'afterimage', name: 'Afterimage', type: 'Pasif', manaCost: null, desc: 'Meninggalkan bayangan palsu saat merubah arah gerak secara tiba-tiba.', icon: 'animation', baseSource: 'HIGH KNEES' },
  { id: 'back_dash', name: 'Back Dash', type: 'Aktif', manaCost: '15 MP', desc: 'Lompatan kilat ke belakang untuk menghindari bahaya.', icon: 'arrow_back', baseSource: 'BUTT KICKS' },

  // Jumping Jacks / Burpees / Mountain Climbers
  { id: 'explosive_evasion', name: 'Explosive Evasion', type: 'Aktif', manaCost: '25 MP', desc: 'Ledakan energi saat melompat mundur untuk menghindari serangan instan.', icon: 'accessibility_new', baseSource: 'JUMPING JACKS' },
  { id: 'star_jump', name: 'Star Jump', type: 'Aktif', manaCost: '30 MP', desc: 'Menembakkan paku/senjata tersembunyi ke segala arah saat melompat.', icon: 'star', baseSource: 'JUMPING JACKS' },
  { id: 'rapid_recovery', name: 'Rapid Recovery', type: 'Pasif', manaCost: null, desc: 'Memulihkan stamina dengan sangat cepat setelah kelelahan ekstrem.', icon: 'battery_charging_full', baseSource: 'BURPEES' },
  { id: 'explosive_burst', name: 'Explosive Burst', type: 'Aktif', manaCost: '40 MP', desc: 'Dari posisi meniarap meluncur bagaikan misil.', icon: 'rocket_launch', baseSource: 'BURPEES' },
  { id: 'avalanche_assault', name: 'Avalanche Assault', type: 'Aktif', manaCost: '35 MP', desc: 'Hujan pukulan/tikaman beruntun tak henti dari atas.', icon: 'landslide', baseSource: 'MOUNTAIN CLIMBERS' },
  { id: 'scaling_strike', name: 'Scaling Strike', type: 'Aktif', manaCost: '20 MP', desc: 'Kemampuan memanjat dinding vertikal dan menyerang dari atas.', icon: 'filter_hdr', baseSource: 'MOUNTAIN CLIMBERS' },

  // Calf Raises / Flutter Kicks
  { id: 'silent_step', name: 'Silent Step', type: 'Pasif', manaCost: null, desc: 'Gaya berjalan menjinjit menghilangkan seluruh suara gesekan dengan tanah.', icon: 'noise_aware', baseSource: 'CALF RAISES' },
  { id: 'spring_jump', name: 'Spring Jump', type: 'Aktif', manaCost: '10 MP', desc: 'Tolakan betis untuk melompat sangat tinggi tanpa awalan lari.', icon: 'expand_less', baseSource: 'CALF RAISES' },
  { id: 'flurry_kicks', name: 'Flurry Kicks', type: 'Aktif', manaCost: '45 MP', desc: 'Menembakkan puluhan tendangan kelembaman dalam satu detik.', icon: 'waves', baseSource: 'FLUTTER KICKS' },

  // --- PER (Perception) Based Skills ---
  // Shadow Boxing / Bird Dog
  { id: 'phantom_flurry', name: 'Phantom Flurry', type: 'Aktif', manaCost: '40 MP', desc: 'Bayangan pukulan yang dapat mengenai target yang tidak berwujud.', icon: 'sports_mma', baseSource: 'SHADOW BOXING' },
  { id: 'foresight_strike', name: 'Foresight Strike', type: 'Pasif', manaCost: null, desc: 'Membaca arah gerakan lawan melalui gerak otot sebelum musuh bergerak.', icon: 'visibility', baseSource: 'SHADOW BOXING' },
  { id: 'sixth_sense', name: 'Sixth Sense', type: 'Pasif', manaCost: null, desc: 'Merasakan aura permusuhan murni dalam radius 50 meter.', icon: 'radar', baseSource: 'SHADOW BOXING' },
  { id: 'perfect_balance', name: 'Perfect Balance', type: 'Pasif', manaCost: null, desc: 'Tidak akan pernah jatuh walau pijakan sangat ekstrem atau bergerak.', icon: 'balance', baseSource: 'BIRD DOG' },
  { id: 'focused_mind', name: 'Focused Mind', type: 'Aktif', manaCost: '20 MP', desc: 'Menghilangkan semua distraksi dan mengunci 1 target mutlak.', icon: 'center_focus_strong', baseSource: 'BIRD DOG' },

  // --- ADVANCED / COMBINATION SKILLS ---
  { id: 'rulers_authority', name: 'Ruler\'s Authority', type: 'Aktif', manaCost: '100 MP', desc: 'Menggerakkan benda mati atau entitas lemah dengan kekuatan pikiran (Telekinesis).', icon: 'pan_tool', baseSource: 'ALL' },
  { id: 'bloodlust', name: 'Bloodlust', type: 'Aktif', manaCost: '50 MP', desc: 'Memancarkan aura pembunuh yang menimbulkan ketakutan dan membekukan target di tempat.', icon: 'water_drop', baseSource: 'ALL' },
  { id: 'vital_strike', name: 'Vital Strike', type: 'Aktif', manaCost: '70 MP', desc: 'Semua serangan selama 5 detik berikutnya akan otomatis berupa Critical Hit (Fokus tingkat dewa).', icon: 'my_location', baseSource: 'ALL' },
  { id: 'stealth', name: 'Stealth', type: 'Aktif', manaCost: '15 MP/detik', desc: 'Menyamarkan wujud dan aura fisik sepenuhnya dari penglihatan.', icon: 'visibility_off', baseSource: 'ALL' },
  { id: 'mana_circuit', name: 'Mana Circuit', type: 'Pasif', manaCost: null, desc: 'Otot menyerap mana di udara mempercepat pemulihan energi fisik.', icon: 'bolt', baseSource: 'ALL' },
  { id: 'longevity', name: 'Longevity', type: 'Pasif', manaCost: null, desc: 'Regenerasi pasif dari segala penyakit, racun, dan debuff (Status Imunitas).', icon: 'health_and_safety', baseSource: 'ALL' }
];

export const getSkillsByStat = (statType: 'str' | 'vit' | 'agi' | 'per') => {
  // Rough mapping based on the skills above
  return SKILL_POOL;
};

export const getSkillById = (id: string) => {
  return SKILL_POOL.find(s => s.id === id);
};
