/**
 * Comprehensive explanation content for the Old vs New Tax Regimes in India.
 * Translated into English, Hindi (हिंदी), Tamil (தமிழ்), and Telugu (తెలుగు).
 */
export const regimeExplanations = {
  en: {
    languageName: 'English',
    title: 'Old vs New Tax Regime Explanation',
    subtitle: 'Understand the key differences, slab rates, deductions, and choose the best regime for your profile.',
    overviewTitle: 'Overview of the Regimes',
    oldRegimeTitle: 'Old Tax Regime (With Deductions)',
    oldRegimeDesc: 'The Old Tax Regime offers higher tax slab rates but allows you to reduce your taxable income using traditional exemptions and deductions. It encourages long-term savings through various investment options.',
    newRegimeTitle: 'New Tax Regime (Lower Slabs, No Deductions)',
    newRegimeDesc: 'The New Tax Regime is the default tax regime in India. It offers significantly lower, simplified tax rates but disallows almost all exemptions and deductions. It simplifies tax filing and provides greater liquidity to taxpayers.',
    
    // Key highlights
    keyDifferencesTitle: 'Key Differences at a Glance',
    standardDeductionLabel: 'Standard Deduction (Salaried)',
    sec87aRebateLabel: 'Section 87A Rebate Threshold',
    taxFreeLimitLabel: 'Effective Tax-Free Income',
    deductionsAllowedLabel: 'Deductions & Exemptions',
    
    standardDeductionOld: '₹50,000 for salaried individuals.',
    standardDeductionNew: '₹75,000 for salaried individuals (revised in Budget 2025).',
    rebateLimitOld: 'Up to ₹5,00,000 taxable income (Max Rebate ₹12,500).',
    rebateLimitNew: 'Up to ₹12,00,000 taxable income (Max Rebate ₹60,000 - Budget 2025).',
    taxFreeOld: '₹3,00,000 (Salaried gets ₹3,50,000).',
    taxFreeNew: '₹12,75,000 (Salaried gets ₹12,00,000 + ₹75,000 Standard Deduction).',
    deductionsOld: 'All traditional deductions allowed: Sec 80C (up to 1.5L), Sec 80D (health insurance), Section 24 (home loan interest up to 2L), HRA, LTA, and professional tax.',
    deductionsNew: 'Disallows almost all deductions. Only Standard Deduction (₹75k), Family Pension deduction (up to ₹25k), and Employer Contribution to NPS (Sec 80CCD(2)) are allowed.',

    // Slabs
    slabsTitle: 'Income Tax Slabs (FY 2025-26 & FY 2026-27)',
    slabHeaderIncome: 'Net Taxable Income Slab',
    slabHeaderOldRate: 'Old Regime Rate',
    slabHeaderNewRate: 'New Regime Rate',
    oldSlabs: [
      { slab: 'Up to ₹2,50,000', rate: 'NIL' },
      { slab: '₹2,50,001 - ₹5,00,000', rate: '5%' },
      { slab: '₹5,00,001 - ₹10,00,000', rate: '20%' },
      { slab: 'Above ₹10,00,000', rate: '30%' }
    ],
    newSlabs: [
      { slab: 'Up to ₹4,00,000', rate: 'NIL' },
      { slab: '₹4,00,001 - ₹8,00,000', rate: '5%' },
      { slab: '₹8,00,001 - ₹12,00,000', rate: '10%' },
      { slab: '₹12,00,001 - ₹16,00,000', rate: '15%' },
      { slab: '₹16,00,001 - ₹20,00,000', rate: '20%' },
      { slab: '₹20,00,001 - ₹24,00,000', rate: '25%' },
      { slab: 'Above ₹24,00,000', rate: '30%' }
    ],

    // Summary/Recommendation guide
    howToChooseTitle: 'How to Choose the Best Regime?',
    howToChooseText1: 'The best regime depends on the total exemptions and deductions you can claim. If you have a home loan interest, high HRA, and invest heavily in PPF/insurance, the Old Regime may still save you money.',
    howToChooseText2: 'However, for most salaried individuals with income up to ₹12.75 Lakhs, the New Tax Regime is extremely beneficial because it results in ZERO tax liability without requiring any locking up of funds in investments.',
    calculatorCTATitle: 'Confused? Calculate your tax instantly',
    calculatorCTADesc: 'Use our interactive calculator to plug in your actual salary and deductions to see which regime saves you more money.',
    calculatorCTAButton: 'Go to Tax Calculator',
    aiCTAButton: 'Consult AI Assistant',
  },
  hi: {
    languageName: 'हिंदी',
    title: 'पुरानी बनाम नई कर व्यवस्था की व्याख्या',
    subtitle: 'मुख्य अंतर, स्लैब दरों, कटौतियों को समझें, और अपनी प्रोफाइल के लिए सबसे अच्छी कर व्यवस्था का चयन करें।',
    overviewTitle: 'कर व्यवस्थाओं का अवलोकन',
    oldRegimeTitle: 'पुरानी कर व्यवस्था (कटौतियों के साथ)',
    oldRegimeDesc: 'पुरानी कर व्यवस्था उच्च टैक्स स्लैब दरों की पेशकश करती है लेकिन आपको पारंपरिक छूटों और कटौतियों का उपयोग करके अपनी कर योग्य आय को कम करने की अनुमति देती है। यह विभिन्न निवेश विकल्पों के माध्यम से दीर्घकालिक बचत को प्रोत्साहित करती है।',
    newRegimeTitle: 'नई कर व्यवस्था (कम स्लैब, कोई कटौती नहीं)',
    newRegimeDesc: 'नई कर व्यवस्था भारत में डिफ़ॉल्ट कर व्यवस्था है। यह काफी कम, सरल कर दरों की पेशकश करती है लेकिन लगभग सभी छूटों और कटौतियों को अस्वीकार करती है। यह कर दाखिल करने को आसान बनाती है और करदाताओं को अधिक नकदी प्रदान करती है।',
    
    // Key highlights
    keyDifferencesTitle: 'मुख्य अंतर एक नज़र में',
    standardDeductionLabel: 'मानक कटौती (वेतनभोगी)',
    sec87aRebateLabel: 'धारा 87A छूट सीमा',
    taxFreeLimitLabel: 'प्रभावी कर-मुक्त आय',
    deductionsAllowedLabel: 'कटौतियां और छूट',
    
    standardDeductionOld: 'वेतनभोगी व्यक्तियों के लिए ₹50,000।',
    standardDeductionNew: 'वेतनभोगी व्यक्तियों के लिए ₹75,000 (बजट 2025 में संशोधित)।',
    rebateLimitOld: '₹5,00,000 तक की कर योग्य आय (अधिकतम छूट ₹12,500)।',
    rebateLimitNew: '₹12,00,000 तक की कर योग्य आय (अधिकतम छूट ₹60,000 - बजट 2025)।',
    taxFreeOld: '₹3,00,000 (वेतनभोगी को ₹3,50,000 मिलते हैं)।',
    taxFreeNew: '₹12,75,000 (वेतनभोगी को ₹12,00,000 + ₹75,000 मानक कटौती मिलती है)।',
    deductionsOld: 'सभी पारंपरिक कटौतियों की अनुमति है: धारा 80C (1.5L तक), धारा 80D (स्वास्थ्य बीमा), धारा 24 (गृह ऋण ब्याज 2L तक), HRA, LTA, और व्यावसायिक कर।',
    deductionsNew: 'लगभग सभी कटौतियों को अस्वीकार करता है। केवल मानक कटौती (₹75k), पारिवारिक पेंशन कटौती (₹25k तक), और NPS में नियोक्ता का योगदान (धारा 80CCD(2)) की अनुमति है।',

    // Slabs
    slabsTitle: 'आयकर स्लैब (FY 2025-26 और FY 2026-27)',
    slabHeaderIncome: 'शुद्ध कर योग्य आय स्लैब',
    slabHeaderOldRate: 'पुरानी व्यवस्था दर',
    slabHeaderNewRate: 'नई व्यवस्था दर',
    oldSlabs: [
      { slab: '₹2,50,000 तक', rate: 'शून्य (NIL)' },
      { slab: '₹2,50,001 - ₹5,00,000', rate: '5%' },
      { slab: '₹5,00,001 - ₹10,00,000', rate: '20%' },
      { slab: '₹10,00,000 से अधिक', rate: '30%' }
    ],
    newSlabs: [
      { slab: '₹4,00,000 तक', rate: 'शून्य (NIL)' },
      { slab: '₹4,00,001 - ₹8,00,000', rate: '5%' },
      { slab: '₹8,00,001 - ₹12,00,000', rate: '10%' },
      { slab: '₹12,00,001 - ₹16,00,000', rate: '15%' },
      { slab: '₹16,00,001 - ₹20,00,000', rate: '20%' },
      { slab: '₹20,00,001 - ₹24,00,000', rate: '25%' },
      { slab: '₹24,00,000 से अधिक', rate: '30%' }
    ],

    // Summary/Recommendation guide
    howToChooseTitle: 'सर्वोत्तम कर व्यवस्था कैसे चुनें?',
    howToChooseText1: 'सर्वोत्तम कर व्यवस्था आपके द्वारा दावा की जाने वाली कुल छूट और कटौतियों पर निर्भर करती है। यदि आपके पास गृह ऋण ब्याज, उच्च HRA है, और आप PPF/बीमा में भारी निवेश करते हैं, तो पुरानी व्यवस्था अभी भी आपके पैसे बचा सकती है।',
    howToChooseText2: 'हालांकि, ₹12.75 लाख तक की आय वाले अधिकांश वेतनभोगी व्यक्तियों के लिए, नई कर व्यवस्था बेहद फायदेमंद है क्योंकि इसके परिणामस्वरूप निवेश में कोई पैसा फंसाए बिना शून्य कर देयता होती है।',
    calculatorCTATitle: 'उलझन में हैं? तुरंत अपने कर की गणना करें',
    calculatorCTADesc: 'यह देखने के लिए कि कौन सी व्यवस्था आपके अधिक पैसे बचाती है, अपने वास्तविक वेतन और कटौतियों को दर्ज करके हमारे इंटरैक्टिव कैलकुलेटर का उपयोग करें।',
    calculatorCTAButton: 'टैक्स कैलकुलेटर पर जाएं',
    aiCTAButton: 'AI सहायक से परामर्श करें',
  },
  ta: {
    languageName: 'தமிழ்',
    title: 'பழைய vs புதிய வரி முறை விளக்கம்',
    subtitle: 'முக்கிய வேறுபாடுகள், அடுக்கு விகிதங்கள், விலக்குகள் ஆகியவற்றை புரிந்து கொண்டு, உங்கள் சுயவிவரத்திற்கான சிறந்த வரி முறையை தேர்வு செய்யவும்.',
    overviewTitle: 'வரி முறைகளின் கண்ணோட்டம்',
    oldRegimeTitle: 'பழைய வரி முறை (விலக்குகளுடன்)',
    oldRegimeDesc: 'பழைய வரி முறை அதிக வரி அடுக்கு விகிதங்களை வழங்குகிறது, ஆனால் பாரம்பரிய வரி விலக்குகள் மற்றும் கழிவுகளைப் பயன்படுத்தி உங்கள் வரிக்குரிய வருமானத்தைக் குறைக்க உங்களை அனுமதிக்கிறது. இது பல்வேறு முதலீட்டு விருப்பங்கள் மூலம் நீண்ட கால சேமிப்பை ஊக்குவிக்கிறது.',
    newRegimeTitle: 'புதிய வரி முறை (குறைந்த அடுக்குகள், விலக்குகள் இல்லை)',
    newRegimeDesc: 'புதிய வரி முறை என்பது இந்தியாவில் இயல்புநிலை வரி முறையாகும். இது கணிசமாக குறைந்த, எளிமைப்படுத்தப்பட்ட வரி விகிதங்களை வழங்குகிறது ஆனால் கிட்டத்தட்ட அனைத்து வரி விலக்குகள் மற்றும் கழிவுகளையும் அனுமதிக்காது. இது வரி தாக்கல் செய்வதை எளிதாக்குகிறது.',
    
    // Key highlights
    keyDifferencesTitle: 'முக்கிய வேறுபாடுகள் ஒரு பார்வையில்',
    standardDeductionLabel: 'நிலையான கழிவு (சம்பளம் பெறுவோர்)',
    sec87aRebateLabel: 'பிரிவு 87A தள்ளுபடி வரம்பு',
    taxFreeLimitLabel: 'பயனுள்ள வரி இல்லாத வருமானம்',
    deductionsAllowedLabel: 'விலக்குகள் மற்றும் கழிவுகள்',
    
    standardDeductionOld: 'சம்பளம் பெறும் தனிநபர்களுக்கு ₹50,000.',
    standardDeductionNew: 'சம்பளம் பெறும் தனிநபர்களுக்கு ₹75,000 (பட்ஜெட் 2025 இல் திருத்தப்பட்டது).',
    rebateLimitOld: '₹5,00,000 வரை வரிக்குரிய வருமானம் (அதிகபட்ச தள்ளுபடி ₹12,500).',
    rebateLimitNew: '₹12,00,000 வரை வரிக்குரிய வருமானம் (அதிகபட்ச தள்ளுபடி ₹60,000 - பட்ஜெட் 2025).',
    taxFreeOld: '₹3,00,000 (சம்பளம் பெறுபவர்களுக்கு ₹3,50,000).',
    taxFreeNew: '₹12,75,000 (சம்பளம் பெறுபவர்களுக்கு ₹12,00,000 + ₹75,000 நிலையான கழிவு).',
    deductionsOld: 'அனைத்து பாரம்பரிய விலக்குகளும் அனுமதிக்கப்படுகின்றன: பிரிவு 80C (1.5L வரை), பிரிவு 80D (சுகாதார காப்பீடு), பிரிவு 24 (வீட்டு கடன் வட்டி 2L வரை), HRA, LTA, மற்றும் தொழில்முறை வரி.',
    deductionsNew: 'கிட்டத்தட்ட அனைத்து விலக்குகளையும் அனுமதிக்காது. நிலையான கழிவு (₹75k), குடும்ப ஓய்வூதிய கழிவு (₹25k வரை), மற்றும் NPS க்கான முதலாளியின் பங்களிப்பு (பிரிவு 80CCD(2)) மட்டுமே அனுமதிக்கப்படுகிறது.',

    // Slabs
    slabsTitle: 'வருமான வரி அடுக்குகள் (FY 2025-26 & FY 2026-27)',
    slabHeaderIncome: 'நிகர வரிக்குரிய வருமான அடுக்கு',
    slabHeaderOldRate: 'பழைய முறை விகிதம்',
    slabHeaderNewRate: 'புதிய முறை விகிதம்',
    oldSlabs: [
      { slab: '₹2,50,000 வரை', rate: 'பூஜ்ஜியம் (NIL)' },
      { slab: '₹2,50,001 - ₹5,00,000', rate: '5%' },
      { slab: '₹5,00,001 - ₹10,00,000', rate: '20%' },
      { slab: '₹10,00,000 க்கு மேல்', rate: '30%' }
    ],
    newSlabs: [
      { slab: '₹4,00,000 வரை', rate: 'பூஜ்ஜியம் (NIL)' },
      { slab: '₹4,00,001 - ₹8,00,000', rate: '5%' },
      { slab: '₹8,00,001 - ₹12,00,000', rate: '10%' },
      { slab: '₹12,00,001 - ₹16,00,000', rate: '15%' },
      { slab: '₹16,00,001 - ₹20,00,000', rate: '20%' },
      { slab: '₹20,00,001 - ₹24,00,000', rate: '25%' },
      { slab: '₹24,00,000 க்கு மேல்', rate: '30%' }
    ],

    // Summary/Recommendation guide
    howToChooseTitle: 'சிறந்த வரி முறையை எவ்வாறு தேர்வு செய்வது?',
    howToChooseText1: 'சிறந்த வரி முறை என்பது நீங்கள் கோரக்கூடிய மொத்த விலக்குகள் மற்றும் கழிவுகளைப் பொறுத்தது. உங்களிடம் வீட்டு கடன் வட்டி, அதிக HRA மற்றும் PPF/காப்பீட்டில் அதிக முதலீடு இருந்தால், பழைய முறை இன்னும் உங்கள் பணத்தை சேமிக்கலாம்.',
    howToChooseText2: 'இருப்பினும், ₹12.75 லட்சம் வரை வருமானம் உள்ள பெரும்பாலான சம்பளம் பெறும் தனிநபர்களுக்கு, புதிய வரி முறை மிகவும் நன்மை பயக்கும், ஏனெனில் இது முதலீடுகளில் எந்த பணத்தையும் பூட்டாமல் பூజ్ஜிய வரி பொறுப்பை ஏற்படுத்துகிறது.',
    calculatorCTATitle: 'குழப்பமாக உள்ளதா? உங்கள் வரியை உடனே கணக்கிடுங்கள்',
    calculatorCTADesc: 'எந்த வரி முறை உங்களுக்கு அதிக பணத்தை சேமிக்கிறது என்பதைப் பார்க்க, உங்கள் உண்மையான சம்பளம் மற்றும் விலக்குகளை உள்ளிட்டு எங்களது கால்குலேட்டரைப் பயன்படுத்தவும்.',
    calculatorCTAButton: 'வரி கால்குலேட்டருக்குச் செல்லவும்',
    aiCTAButton: 'AI உதவியாளரை அணுகவும்',
  },
  te: {
    languageName: 'తెలుగు',
    title: 'పాత vs కొత్త పన్ను విధానం వివరణ',
    subtitle: 'కీలక వ్యత్యాసాలు, స్లాబ్ రేట్లు, మినహాయింపులను అర్థం చేసుకోండి మరియు మీ ప్రొఫైల్‌కు ఉత్తమమైన పన్ను విధానాన్ని ఎంచుకోండి.',
    overviewTitle: 'పన్ను విధానాల అవలోకనం',
    oldRegimeTitle: 'పాత పన్ను విధానం (మినహాయింపులతో)',
    oldRegimeDesc: 'పాత పన్ను విధానం అధిక పన్ను స్లాబ్ రేట్లను అందిస్తుంది కానీ సాంప్రదాయ మినహాయింపులు మరియు తగ్గింపులను ఉపయోగించి మీ పన్ను పరిధిలోకి వచ్చే ఆదాయాన్ని తగ్గించుకోవడానికి మిమ్మల్ని అనుమతిస్తుంది. ఇది వివిధ పెట్టుబడి మార్గాల ద్వారా దీర్ఘకాలిక పొదుపును ప్రోత్సహిస్తుంది.',
    newRegimeTitle: 'కొత్త పన్ను విధానం (తక్కువ స్లాబ్‌లు, మినహాయింపులు లేవు)',
    newRegimeDesc: 'కొత్త పన్ను విధానం భారతదేశంలో డిఫాల్ట్ పన్ను విధానం. ఇది గణనీయంగా తక్కువ, సరళీకృత పన్ను రేట్లను అందిస్తుంది కానీ దాదాపు అన్ని మినహాయింపులను అనుమతించదు. ఇది పన్ను దాఖలు చేయడాన్ని సులభతరం చేస్తుంది.',
    
    // Key highlights
    keyDifferencesTitle: 'కీలక వ్యత్యాసాలు ఒక చూపులో',
    standardDeductionLabel: 'ప్రామాణిక తగ్గింపు (ఉద్యోగులకు)',
    sec87aRebateLabel: 'సెక్షన్ 87A రిబేట్ పరిమితి',
    taxFreeLimitLabel: 'ప్రాథమిక పన్ను రహిత ఆదాయం',
    deductionsAllowedLabel: 'మినహాయింపులు & తగ్గింపులు',
    
    standardDeductionOld: 'జీతం పొందే వ్యక్తులకు ₹50,000.',
    standardDeductionNew: 'జీతం పొందే వ్యక్తులకు ₹75,000 (బడ్జెట్ 2025లో సవరించబడింది).',
    rebateLimitOld: '₹5,00,000 వరకు పన్ను పరిధిలోకి వచ్చే ఆదాయం (గరిష్ట రిబేట్ ₹12,500).',
    rebateLimitNew: '₹12,00,000 వరకు పన్ను పరిధిలోకి వచ్చే ఆదాయం (గరిష్ట రిబేట్ ₹60,000 - బడ్జెట్ 2025).',
    taxFreeOld: '₹3,00,000 (ఉద్యోగులకు ₹3,50,000 లభిస్తుంది).',
    taxFreeNew: '₹12,75,000 (ఉద్యోగులకు ₹12,00,000 + ₹75,000 ప్రామాణిక తగ్గింపు లభిస్తుంది).',
    deductionsOld: 'అన్ని సాంప్రదాయ మినహాయింపులు అనుమతించబడతాయి: సెక్షన్ 80C (1.5L వరకు), సెక్షన్ 80D (ఆరోగ్య భీమా), సెక్షన్ 24 (హోమ్ లోన్ వడ్డీ 2L వరకు), HRA, LTA మరియు ప్రొఫెషనల్ టాక్స్.',
    deductionsNew: 'దాదాపు అన్ని తగ్గింపులను అనుమతించదు. ప్రామాణిక తగ్గింపు (₹75k), కుటుంబ పెన్షన్ తగ్గింపు (₹25k వరకు) మరియు NPSకి యజమాని సహకారం (సెక్షన్ 80CCD(2)) మాత్రమే అనుమతించబడతాయి.',

    // Slabs
    slabsTitle: 'ఆదాయపు పన్ను స్లాబ్‌లు (FY 2025-26 & FY 2026-27)',
    slabHeaderIncome: 'నికర పన్ను పరిధిలోకి వచ్చే ఆదాయ స్లాబ్',
    slabHeaderOldRate: 'పాత విధానం రేటు',
    slabHeaderNewRate: 'కొత్త విధానం రేటు',
    oldSlabs: [
      { slab: '₹2,50,000 వరకు', rate: 'సున్నా (NIL)' },
      { slab: '₹2,50,001 - ₹5,00,000', rate: '5%' },
      { slab: '₹5,00,001 - ₹10,00,000', rate: '20%' },
      { slab: '₹10,00,000 కంటే ఎక్కువ', rate: '30%' }
    ],
    newSlabs: [
      { slab: '₹4,00,000 వరకు', rate: 'సున్నా (NIL)' },
      { slab: '₹4,00,001 - ₹8,00,000', rate: '5%' },
      { slab: '₹8,00,001 - ₹12,00,000', rate: '10%' },
      { slab: '₹12,00,001 - ₹16,00,000', rate: '15%' },
      { slab: '₹16,00,001 - ₹20,00,000', rate: '20%' },
      { slab: '₹20,00,001 - ₹24,00,000', rate: '25%' },
      { slab: '₹24,00,000 కంటే ఎక్కువ', rate: '30%' }
    ],

    // Summary/Recommendation guide
    howToChooseTitle: 'ఉత్తమ పన్ను విధానాన్ని ఎలా ఎంచుకోవాలి?',
    howToChooseText1: 'ఉత్తమ విధానం మీరు క్లెయిమ్ చేయగల మొత్తం మినహాయింపులపై ఆధారపడి ఉంటుంది. మీ వద్ద హోమ్ లోన్ వడ్డీ, అధిక HRA మరియు PPF/భీమాలో భారీ పెట్టుబడులు ఉంటే, పాత విధానం ఇప్పటికీ మీ డబ్బును ఆదా చేస్తుంది.',
    howToChooseText2: 'అయితే, ₹12.75 లక్షల వరకు ఆదాయం ఉన్న మెజారిటీ జీతగాళ్లకు, కొత్త పన్ను విధానం చాలా ప్రయోజనకరంగా ఉంటుంది ఎందుకంటే ఇది పెట్టుబడులలో ఎటువంటి డబ్బును లాక్ చేయకుండానే సున్నా పన్ను బాధ్యతను కలిగిస్తుంది.',
    calculatorCTATitle: 'సందేహంగా ఉందా? మీ పన్నును తక్షణమే లెక్కించండి',
    calculatorCTADesc: 'ఏ విధానం మీకు ఎక్కువ డబ్బు ఆదా చేస్తుందో చూడటానికి మీ అసలు జీతం మరియు మినహాయింపులను నమోదు చేయడం ద్వారా మా కాలక్యులేటర్‌ను ఉపయోగించండి.',
    calculatorCTAButton: 'టాక్స్ కాలిక్యులేటర్‌కు వెళ్లండి',
    aiCTAButton: 'AI సహాయకుడిని సంప్రదించండి',
  }
};
