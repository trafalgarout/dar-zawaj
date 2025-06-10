const fs = require('fs');
const path = require('path');

// Put your real Arabic names here (add more as needed)
const arabicNames = [
  "آية", "فاطمة", "مريم", "زينب", "خديجة", "نورة", "سارة", "جميلة", "حنان", "نسرين",
  "ياسمين", "دلال", "منى", "هدى", "سلمى", "أميرة", "رنا", "شيماء", "ليلى", "سهى",
  // ... add more names as you wish
];

const countries = ["المغرب", "مصر", "تونس", "الجزائر", "السعودية"];
const bios = [
  "أهلاً بك في ملفي الشخصي!",
  "أبحث عن علاقة جدية.",
  "أحب الطبيعة والهدوء.",
  "أبحث عن شريك حياة.",
  "مهتمة بالفن.",
  "أحب القراءة والموسيقى.",
  "أبحث عن شريك لطيف.",
  "أحب السفر والتصوير.",
  "أبحث عن علاقة مستقرة.",
  "أحب الطبيعة والحيوانات."
];
const hobbiesList = [
  ["القراءة", "السفر"], ["الطبخ", "الموسيقى"], ["الرياضة", "الرسم"], ["التصوير", "القراءة"],
  ["الفن", "الموضة"], ["الموسيقى", "القراءة"], ["الرياضة", "الطبخ"], ["السفر", "التصوير"],
  ["القراءة", "الموضة"], ["الطبيعة", "الحيوانات"]
];
const marriageTypes = ["دائم", "شرعي", "تقليدي"];
const lookingForList = ["شريك جاد", "رجل محترم", "شخص طموح", "زوج صالح", "رجل متفهم", "شخص صادق", "زوج طيب", "شخص مغامر", "شخص جاد", "شخص محب للطبيعة"];
const followersList = ["1.1M", "900K", "800K", "1.5M", "1.2M", "1.3M", "1.0M", "950K", "1.4M", "1.6M", "1.7M"];

const picturesDir = path.join(__dirname, 'public', 'pictures');
const outputFile = path.join(__dirname, 'data', 'girls.ts');

const imageFiles = fs.readdirSync(picturesDir)
  .filter(f => f.endsWith('.webp') && f !== 'placeholder.webp')
  .sort((a, b) => {
    // Sort numerically if possible, otherwise lexicographically
    const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return numA - numB || a.localeCompare(b, 'ar');
  });

const cities = ["الدار البيضاء", "القاهرة", "تونس", "الجزائر", "الرياض", "جدة", "مراكش", "طنجة", "الإسكندرية", "سوسة"];
const nationalities = ["مغربية", "مصرية", "تونسية", "جزائرية", "سعودية"];
const dialects = ["دارجة مغربية", "مصري", "تونسي", "جزائري", "خليجي"];
const maritalStatuses = ["عزباء", "مطلقة", "أرملة"];
const hasChildrenOptions = ["نعم", "لا"];
const locations = [
  "الدار البيضاء، المغرب", "القاهرة، مصر", "تونس، تونس", "الجزائر، الجزائر", "الرياض، السعودية", "جدة، السعودية", "مراكش، المغرب", "طنجة، المغرب", "الإسكندرية، مصر", "سوسة، تونس"
];
const shortBios = [
  "أنا فتاة هادئة أحب البساطة وأبحث عن شريك جاد لبناء أسرة مستقرة.",
  "أحب الضحك والسفر وأبحث عن علاقة مبنية على الاحترام.",
  "أبحث عن رجل صادق يشاركني القيم العائلية.",
  "أحب القراءة والطبيعة وأبحث عن زوج متفهم.",
  "أطمح لحياة مستقرة يسودها الحب والرحمة."
];
const whatLookingForList = [
  "أبحث عن رجل بين 28 و38 سنة، من المغرب أو الخليج، جاد في الزواج، يقدر الحياة الأسرية، ويحب السفر.",
  "أرغب في شريك متعلم، صبور، يقدر المرأة ويحترم العادات والتقاليد.",
  "أبحث عن زوج صالح، متدين وحنون، يفضل الزواج التقليدي أو الدائم.",
  "أبحث عن رجل يحب الأطفال، مستقر مادياً، ويطمح لحياة هادئة.",
  "يفضل أن يكون من مدينة كبيرة، يحب الطبيعة والقراءة، ويبحث عن الاستقرار."
];
const marriageTypesAll = ["دائم", "شرعي عن بعد", "تقليدي", "عرفي", "مسيار"];
const commentsList = [
  "بالتوفيق إن شاء الله، بنت محترمة.",
  "الله يرزقك الزوج الصالح.",
  "ما شاء الله عليكِ، ربي يسعدك.",
  "أتمنى لكِ كل التوفيق.",
  "ملف جميل وراقي.",
  "الله يتمم لكِ على خير."
];
const ratings = [4, 5, 3, 4.5, 5];

const girls = imageFiles.map((img, i) => {
  // Pick extra images (up to 3 total)
  const extraImages = [img];
  if (imageFiles[i + 1]) extraImages.push(imageFiles[i + 1]);
  if (imageFiles[i + 2]) extraImages.push(imageFiles[i + 2]);
  // Generate comments
  const comments = Array.from({length: 2 + (i % 3)}, (_, j) => commentsList[(i + j) % commentsList.length]);
  // Marriage types (1-3 per profile)
  const marriageTypes = [marriageTypesAll[i % marriageTypesAll.length]];
  if (i % 2 === 0) marriageTypes.push(marriageTypesAll[(i + 1) % marriageTypesAll.length]);
  // Rating and last seen
  const rating = ratings[i % ratings.length];
  const lastSeen = `${1 + (i % 7)} أيام مضت`;
  return {
    id: (i + 1).toString(),
    name: arabicNames[i % arabicNames.length],
    fullName: arabicNames[i % arabicNames.length] + " " + nationalities[i % nationalities.length],
    age: 20 + (i % 10),
    country: countries[i % countries.length],
    city: cities[i % cities.length],
    nationality: nationalities[i % nationalities.length],
    dialect: dialects[i % dialects.length],
    maritalStatus: maritalStatuses[i % maritalStatuses.length],
    hasChildren: hasChildrenOptions[i % hasChildrenOptions.length],
    location: locations[i % locations.length],
    shortBio: shortBios[i % shortBios.length],
    whatLookingFor: whatLookingForList[i % whatLookingForList.length],
    marriageTypes: marriageTypes,
    hobbies: hobbiesList[i % hobbiesList.length],
    images: extraImages.map(f => `/pictures/${f}`),
    followers: followersList[i % followersList.length],
    comments: comments,
    rating: rating,
    lastSeen: lastSeen
  };
});


const fileContent =
  "// This file is auto-generated. Do not edit manually.\n" +
  "const girls = " + JSON.stringify(girls, null, 2) + ";\n\nexport default girls;\n";

fs.writeFileSync(outputFile, fileContent, 'utf8');
console.log(`Generated ${girls.length} profiles in girls.ts`);