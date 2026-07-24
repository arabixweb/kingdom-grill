/**
 * Menu Data — Kingdom Grill | مشاوي المملكة
 * Premium menu with images
 */

const dishImages = {
  "Hummus Royale": "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop",
  "Sambousa Trio": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
  "Jareesh Shrimp": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
  "Royal Lamb Kabsa": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
  "Grilled Hammour": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
  "Mandi de la Maison": "https://images.unsplash.com/photo-1598103442097-8b74f8e547ff?w=400&h=300&fit=crop",
  "Stuffed Camel Saddle": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
  "Gold Leaf Knafeh": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop",
  "Date Pudding Majesty": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
  "Saffron Ice Cream": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
  "Saudi Coffee": "https://images.unsplash.com/photo-1587080262689-9ec0aae8a3d9?w=400&h=300&fit=crop",
  "Lemon Mint Royale": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
  "Karak Chai": "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=400&h=300&fit=crop",
};

const menuData = {
  appetizers: [
    { en: "Hummus Royale", ar: "حمّص ملكي", desc_en: "Silky chickpea purée with truffle oil, pine nuts & smoked paprika", desc_ar: "حمص ناعم مع زيت الكمأة والصنوبر والبابريكا المدخنة", price: "45 SAR", icon: "🫘" },
    { en: "Sambousa Trio", ar: "سمبوسة ثلاثية", desc_en: "Three fillings — spiced meat, cheese, and mushroom — with tamarind dip", desc_ar: "ثلاث حشوات — لحم بالبهارات، جبن، وفطر — مع صلصة التمر الهندي", price: "38 SAR", icon: "🥟" },
    { en: "Jareesh Shrimp", ar: "جريش الجمبري", desc_en: "Creamy crushed wheat with succulent Gulf shrimp and saffron", desc_ar: "جريش كريمي مع جمبري الخليج والزعفران", price: "55 SAR", icon: "🍤" },
  ],
  mains: [
    { en: "Royal Lamb Kabsa", ar: "كابسة لحم ملكية", desc_en: "Slow-cooked lamb on fragrant spiced rice with roasted nuts & raisins", desc_ar: "لحم مطبوخ ببطء على أرز منكه بالبهارات مع المكسرات والزبيب", price: "95 SAR", icon: "🥩" },
    { en: "Grilled Hammour", ar: "هامور مشوي", desc_en: "Fresh Gulf grouper fillet with lemon herb butter and saffron couscous", desc_ar: "فيليه هامور الخليج الطازج مع زبدة الليمون والأعشاب وكسكس الزعفران", price: "110 SAR", icon: "🐟" },
    { en: "Mandi de la Maison", ar: "مندي المطعم", desc_en: "Tender chicken mandi with aged basmati rice, special house spice blend", desc_ar: "مندي دجاج طري مع أرز بسمتي معتق ومزيج بهارات المطعم الخاص", price: "75 SAR", icon: "🍗" },
    { en: "Stuffed Camel Saddle", ar: "سرج الجمل المحشي", desc_en: "Premium camel meat stuffed with freekeh, dates & aromatic herbs", desc_ar: "لحم جمل فاخر محشي بالفريكة والتمر والأعشاب العطرية", price: "145 SAR", icon: "🐪" },
  ],
  desserts: [
    { en: "Gold Leaf Knafeh", ar: "كنافة ورق الذهب", desc_en: "Crispy shredded phyllo with sweet cheese, rose syrup & 24k gold leaf", desc_ar: "كنافة مقرمشة مع جبن حلو وشراب الورد وورق الذهب عيار 24", price: "65 SAR", icon: "🥮" },
    { en: "Date Pudding Majesty", ar: "بودنغ التمر الملكي", desc_en: "Warm date and cardamom pudding with tahini caramel & toasted sesame", desc_ar: "بودنغ التمر والهيل الدافئ مع كراميل الطحينية والسمسم المحمص", price: "55 SAR", icon: "🍮" },
    { en: "Saffron Ice Cream", ar: "آيس كريم الزعفران", desc_en: "Hand-churned saffron ice cream with pistachio crumble & honey drizzle", desc_ar: "آيس كريم الزعفران المخفوق يدويًا مع فتات الفستق ورذاذ العسل", price: "35 SAR", icon: "🍨" },
  ],
  beverages: [
    { en: "Saudi Coffee", ar: "قهوة سعودية", desc_en: "Traditional Arabic coffee with cardamom, saffron & dates", desc_ar: "قهوة عربية تقليدية مع الهيل والزعفران والتمر", price: "25 SAR", icon: "☕" },
    { en: "Lemon Mint Royale", ar: "ليمون نعناع ملكي", desc_en: "Fresh lemonade with mint, rose water and sparkling water", desc_ar: "ليموناضة طازجة مع النعناع وماء الورد والمياه الفوارة", price: "22 SAR", icon: "🍋" },
    { en: "Karak Chai", ar: "شاي كرك", desc_en: "Spiced milk tea with cardamom, cinnamon & evaporated milk", desc_ar: "شاي بالحليب والبهارات مع الهيل والقرفة والحليب المبخر", price: "18 SAR", icon: "🫖" },
  ],
};

function getDishImage(item) {
  return dishImages[item.en] || `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop`;
}

function renderMenuItems(items, gridId = 'menuGrid') {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const lang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
  
  grid.innerHTML = items.map(item => {
    const img = getDishImage(item);
    return `
      <div class="menu-card reveal">
        <div class="menu-card-img" style="background:url('${img}') center/cover;border-radius:12px;height:180px;margin-bottom:16px;"></div>
        <h3>${lang === 'en' ? item.en : item.ar}</h3>
        <p class="desc">${lang === 'en' ? item.desc_en : item.desc_ar}</p>
        <span class="price">${item.price}</span>
      </div>
    `;
  }).join('');
  
  setTimeout(() => {
    grid.querySelectorAll('.menu-card.reveal').forEach(c => c.classList.add('visible'));
  }, 50);
}

function renderHomeMenu() {
  const items = [];
  Object.values(menuData).forEach(cat => items.push(cat[0], cat[1]));
  renderMenuItems(items, 'homeMenuGrid');
}
