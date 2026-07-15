/**
 * Comprehensive explanation content for ITR Form Selection in India.
 * Translated into English, Hindi (हिंदी), Tamil (தமிழ்), and Telugu (తెలుగు).
 */
export const itrExplanations = {
  en: {
    languageName: 'English',
    title: 'ITR Form Selection Guide',
    subtitle: 'Find the right Income Tax Return (ITR) form based on your sources of income for the current assessment year.',
    eligibleLabel: 'Who Should File',
    notEligibleLabel: 'Who Cannot File',
    keyDetailsLabel: 'Important Disclosures Required',
    
    forms: [
      {
        id: 'itr1',
        name: 'ITR-1 (Sahaj)',
        description: 'For individuals having income up to ₹50 Lakhs from Salary, One House Property, and Other Sources (like Interest, Family Pension).',
        eligible: [
          'Salaried individuals & Pensioners.',
          'Single house property owners.',
          'Income from other sources (Savings/FD interest, dividend, family pension).',
          'Agricultural income up to ₹5,000.'
        ],
        notEligible: [
          'Income exceeding ₹50 Lakhs.',
          'Non-Residents (NRI) and RNOR.',
          'Directors of companies or holding unlisted equity shares.',
          'Income from Capital Gains (mutual funds, stocks, property sale).',
          'More than one house property.'
        ],
        keyDetails: [
          'Salary break-up (allowances, deductions).',
          'House property details (Self-occupied or Let out).',
          'Interest income details.'
        ]
      },
      {
        id: 'itr2',
        name: 'ITR-2',
        description: 'For individuals & HUFs who do not have business or professional income but have capital gains, foreign assets, or multiple properties.',
        eligible: [
          'Income exceeding ₹50 Lakhs.',
          'Capital Gains from shares, mutual funds, or real estate.',
          'Holding director positions in companies or unlisted equity shares.',
          'More than one house property.',
          'Foreign assets or foreign income.'
        ],
        notEligible: [
          'Individuals or HUFs having income from a proprietary business or profession.'
        ],
        keyDetails: [
          'Detailed Capital Gains computations (Schedule CG).',
          'Foreign Asset reporting (Schedule FA).',
          'Details of multiple properties and rental income.'
        ]
      },
      {
        id: 'itr3',
        name: 'ITR-3',
        description: 'For individuals and HUFs carrying out a proprietary business or profession, including partners in a partnership firm.',
        eligible: [
          'Income from business or profession (Audit and Non-audit cases).',
          'Partners in partnership firms.',
          'Presumptive business income exceeding ₹50 Lakhs.',
          'Crypto/VDAs income (Virtual Digital Assets).'
        ],
        notEligible: [
          'Companies, LLPs, or trusts (requires ITR-5, ITR-6, or ITR-7).'
        ],
        keyDetails: [
          'Balance Sheet and Profit & Loss Statement details.',
          'GST turnover verification details.',
          'Tax Audit reports if applicable (Section 44AB).'
        ]
      },
      {
        id: 'itr4',
        name: 'ITR-4 (Sugam)',
        description: 'For individuals, HUFs, and partnership firms (excluding LLPs) with presumptive business/profession income up to ₹50 Lakhs.',
        eligible: [
          'Presumptive income under Sec 44AD (Business up to 2/3 Crore turnover).',
          'Presumptive income under Sec 44ADA (Professionals up to 50/75 Lakhs gross receipts).',
          'Presumptive income under Sec 44AE (Goods Carriage business).',
          'Salary, one house property, and other sources up to ₹50 Lakhs.'
        ],
        notEligible: [
          'Total income exceeding ₹50 Lakhs.',
          'Non-residents or directors of a company.',
          'Capital gains or foreign assets holder.'
        ],
        keyDetails: [
          'Gross receipts / Turnovers.',
          'Cash balance and bank balance declarations.',
          'Sundry debtors & creditors details.'
        ]
      }
    ],
    
    howToChooseTitle: 'Unsure which ITR is right for you?',
    howToChooseText1: 'Selecting the wrong ITR form can lead to a "Defective Return" notice under Section 139(9) from the Income Tax Department.',
    howToChooseText2: 'Our AI Assistant can guide you. Tell the chatbot about your income sources (e.g., salary, stock profits, business), and it will recommend the exact form and assist with listing documents.',
    aiCTAButton: 'Consult AI for ITR Help',
    calculatorCTAButton: 'Open Calculator'
  },
  hi: {
    languageName: 'हिंदी',
    title: 'ITR फॉर्म चयन मार्गदर्शिका',
    subtitle: 'चालू कर निर्धारण वर्ष के लिए अपनी आय के स्रोतों के आधार पर सही आयकर रिटर्न (ITR) फॉर्म चुनें।',
    eligibleLabel: 'किसे फ़ाइल करना चाहिए',
    notEligibleLabel: 'कौन फ़ाइल नहीं कर सकता',
    keyDetailsLabel: 'महत्वपूर्ण खुलासे आवश्यक',
    
    forms: [
      {
        id: 'itr1',
        name: 'ITR-1 (सहज)',
        description: 'वेतन, एक गृह संपत्ति, और अन्य स्रोतों (जैसे ब्याज, पारिवारिक पेंशन) से ₹50 लाख तक की आय वाले व्यक्तियों के लिए।',
        eligible: [
          'वेतनभोगी व्यक्ति और पेंशनभोगी।',
          'केवल एक गृह संपत्ति के मालिक।',
          'अन्य स्रोतों से आय (बचत/FD ब्याज, लाभांश, पारिवारिक पेंशन)।',
          'कृषि आय ₹5,000 तक।'
        ],
        notEligible: [
          '₹50 लाख से अधिक की कुल आय।',
          'अनिवासी (NRI) और RNOR।',
          'कंपनियों के निदेशक या असूचीबद्ध इक्विटी शेयर रखने वाले।',
          'पूंजीगत लाभ (म्यूचुअल फंड, शेयर, संपत्ति की बिक्री) से आय।',
          'एक से अधिक गृह संपत्ति।'
        ],
        keyDetails: [
          'वेतन ब्रेक-अप (भत्ते, कटौतियां)।',
          'गृह संपत्ति का विवरण (स्वयं के कब्जे में या किराए पर)।',
          'ब्याज आय का विवरण।'
        ]
      },
      {
        id: 'itr2',
        name: 'ITR-2',
        description: 'उन व्यक्तियों और HUF के लिए जिनकी व्यावसायिक या पेशेवर आय नहीं है, लेकिन उनके पास पूंजीगत लाभ, विदेशी संपत्ति, या एक से अधिक संपत्तियां हैं।',
        eligible: [
          '₹50 लाख से अधिक की आय।',
          'शेयरों, म्यूचुअल फंड या रियल एस्टेट से पूंजीगत लाभ।',
          'कंपनियों में निदेशक पद या असूचीबद्ध इक्विटी शेयर रखना।',
          'एक से अधिक गृह संपत्ति।',
          'विदेशी संपत्ति या विदेशी आय।'
        ],
        notEligible: [
          'मालिकाना व्यवसाय या पेशे से आय वाले व्यक्ति या HUF।'
        ],
        keyDetails: [
          'विस्तृत पूंजीगत लाभ गणना (शेड्यूल CG)।',
          'विदेशी संपत्ति रिपोर्टिंग (शेड्यूल FA)।',
          'अनेक संपत्तियों और किराये की आय का विवरण।'
        ]
      },
      {
        id: 'itr3',
        name: 'ITR-3',
        description: 'मालिकाना व्यवसाय या पेशा चलाने वाले व्यक्तियों और HUF के लिए, जिसमें साझेदारी फर्म के भागीदार भी शामिल हैं।',
        eligible: [
          'व्यवसाय या पेशे से आय (ऑडिट और गैर-ऑडिट मामले)।',
          'साझेदारी फर्मों में भागीदार।',
          '₹50 लाख से अधिक की संभावित व्यावसायिक आय।',
          'क्रिप्टो/VDA आय (वर्चुअल डिजिटल एसेट)।'
        ],
        notEligible: [
          'कंपनियां, LLP, या ट्रस्ट (ITR-5, ITR-6, या ITR-7 की आवश्यकता होती है)।'
        ],
        keyDetails: [
          'बैलेंस शीट और लाभ-हानि विवरण।',
          'GST टर्नओवर सत्यापन विवरण।',
          'यदि लागू हो तो टैक्स ऑडिट रिपोर्ट (धारा 44AB)।'
        ]
      },
      {
        id: 'itr4',
        name: 'ITR-4 (सुगम)',
        description: '₹50 लाख तक की संभावित व्यवसाय/पेशा आय वाले व्यक्तियों, HUF और साझेदारी फर्मों (LLP को छोड़कर) के लिए।',
        eligible: [
          'धारा 44AD के तहत संभावित आय (2/3 करोड़ तक टर्नओवर)।',
          'धारा 44ADA के तहत संभावित आय (पेशेवर ₹50/75 लाख तक की सकल प्राप्तियां)।',
          'धारा 44AE के तहत संभावित आय (माल ढुलाई व्यवसाय)।',
          'वेतन, एक गृह संपत्ति और अन्य स्रोतों से ₹50 लाख तक की कुल आय।'
        ],
        notEligible: [
          '₹50 लाख से अधिक की कुल आय।',
          'अनिवासी या कंपनी के निदेशक।',
          'पूंजीगत लाभ या विदेशी संपत्ति धारक।'
        ],
        keyDetails: [
          'सकल प्राप्तियां / टर्नओवर।',
          'नकद और बैंक बैलेंस घोषणा।',
          'विविध देनदार और लेनदार का विवरण।'
        ]
      }
    ],
    
    howToChooseTitle: 'उलझन में हैं कि कौन सा ITR आपके लिए सही है?',
    howToChooseText1: 'गलत ITR फॉर्म का चयन करने से आयकर विभाग से धारा 139(9) के तहत "दोषपूर्ण रिटर्न" का नोटिस मिल सकता है।',
    howToChooseText2: 'हमारा AI सहायक आपका मार्गदर्शन कर सकता है। चैटबॉट को अपनी आय के स्रोतों (जैसे वेतन, शेयर लाभ, व्यवसाय) के बारे में बताएं, और यह सही फॉर्म की सिफारिश करेगा।',
    aiCTAButton: 'ITR सहायता के लिए AI से पूछें',
    calculatorCTAButton: 'कैलकुलेटर खोलें'
  },
  ta: {
    languageName: 'தமிழ்',
    title: 'ITR படிவம் தேர்வு வழிகாட்டி',
    subtitle: 'நடப்பு வரி மதிப்பீட்டு ஆண்டிற்கான உங்கள் வருமான ஆதாரங்களின் அடிப்படையில் சரியான வருமான வரித் தாக்கல் (ITR) படிவத்தைத் தேர்வுசெய்யவும்.',
    eligibleLabel: 'யார் தாக்கல் செய்ய வேண்டும்',
    notEligibleLabel: 'யார் தாக்கல் செய்ய முடியாது',
    keyDetailsLabel: 'தேவையான முக்கிய வெளிப்பாடுகள்',
    
    forms: [
      {
        id: 'itr1',
        name: 'ITR-1 (சஹஜ்)',
        description: 'சம்பளம், ஒரு வீட்டு சொத்து மற்றும் இதர ஆதாரங்கள் (வட்டி, குடும்ப ஓய்வூதியம் போன்றவை) மூலம் ₹50 லட்சம் வரை வருமானம் உள்ள தனிநபர்களுக்கு.',
        eligible: [
          'சம்பளம் பெறுவோர் மற்றும் ஓய்வூதியதாரர்கள்.',
          'ஒரே ஒரு வீட்டு சொத்து உரிமையாளர்கள்.',
          'இதர ஆதாரங்களில் இருந்து வருமானம் (சேமிப்பு/FD வட்டி, ஈவுத்தொகை, குடும்ப ஓய்வூதியம்).',
          '₹5,000 வரை விவசாய வருமானம்.'
        ],
        notEligible: [
          '₹50 லட்சத்திற்கு மேல் வருமானம் உடையவர்கள்.',
          'வெளிநாடு வாழ் இந்தியர்கள் (NRI) மற்றும் RNOR.',
          'நிறுவனங்களின் இயக்குநர்கள் அல்லது பட்டியலிடப்படாத பங்குகளை வைத்திருப்பவர்கள்.',
          'மூலதன ஆதாயங்கள் (மியூச்சுவல் ஃபண்டுகள், பங்குகள், சொத்து விற்பனை) மூலம் வரும் வருமானம்.',
          'ஒன்றுக்கு மேற்பட்ட வீட்டு சொத்துக்கள்.'
        ],
        keyDetails: [
          'சம்பள विवरणங்கள் (படிகள், விலக்குகள்).',
          'வீட்டு சொத்து விவரங்கள் (சொந்த பயன்பாடு அல்லது வாடகைக்கு விடப்பட்டது).',
          'வட்டி வருமான விவரங்கள்.'
        ]
      },
      {
        id: 'itr2',
        name: 'ITR-2',
        description: 'வணிகம் அல்லது தொழில் முறை வருமானம் இல்லாத, ஆனால் மூலதன ஆதாயங்கள், வெளிநாட்டு சொத்துக்கள் அல்லது ஒன்றுக்கு மேற்பட்ட சொத்துக்கள் கொண்ட தனிநபர்கள் & HUFகளுக்கு.',
        eligible: [
          '₹50 லட்சத்திற்கு மேல் வருமானம் உடையவர்கள்.',
          'பங்குகள், மியூச்சுவல் ஃபண்டுகள் அல்லது ரியல் எஸ்டேட் மூலமான மூலதன ஆதாயங்கள்.',
          'நிறுவனங்களில் இயக்குநர் பதவி அல்லது பட்டியலிடப்படாத பங்குகளை வைத்திருத்தல்.',
          'ஒன்றுக்கு மேற்பட்ட வீட்டு சொத்துக்கள்.',
          'வெளிநாட்டு சொத்துக்கள் அல்லது வெளிநாட்டு வருமானம்.'
        ],
        notEligible: [
          'சொந்த வணிகம் அல்லது தொழில் மூலம் வருமானம் பெறும் தனிநபர்கள் அல்லது HUFகள்.'
        ],
        keyDetails: [
          'விரிவான மூலதன ஆதாயக் கணக்கீடுகள் (Schedule CG).',
          'வெளிநாட்டுச் சொத்துகள் அறிக்கை (Schedule FA).',
          'பல சொத்துக்கள் மற்றும் வாடகை வருமானத்தின் விவரங்கள்.'
        ]
      },
      {
        id: 'itr3',
        name: 'ITR-3',
        description: 'சொந்த வணிகம் அல்லது தொழில் செய்யும் தனிநபர்கள் மற்றும் HUFகளுக்கு, கூட்டாண்மை நிறுவனங்களின் கூட்டாளிகள் உட்பட.',
        eligible: [
          'வணிகம் அல்லது தொழில் மூலம் வருமானம் (தணிக்கை மற்றும் தணிக்கை அல்லாத வழக்குகளுக்கு).',
          'கூட்டாண்மை நிறுவனங்களின் கூட்டாளிகள்.',
          '₹50 லட்சத்திற்கு மேல் ஊகிக்கப்பட்ட வணிக வருமானம்.',
          'கிரிப்டோ/VDA மூலம் கிடைக்கும் வருமானம்.'
        ],
        notEligible: [
          'நிறுவனங்கள், LLPகள் அல்லது அறக்கட்டளைகள் (ITR-5, ITR-6 அல்லது ITR-7 தேவை).'
        ],
        keyDetails: [
          'இருப்புநிலை (Balance Sheet) மற்றும் லாப நட்ட கணக்கு விவரங்கள்.',
          'GST விற்றுமுதல் சரிபார்ப்பு விவரங்கள்.',
          'பொருந்தினால் வரி தணிக்கை அறிக்கைகள் (பிரிவு 44AB).'
        ]
      },
      {
        id: 'itr4',
        name: 'ITR-4 (சுகம்)',
        description: '₹50 லட்சம் வரை ஊகிக்கப்பட்ட வணிக/தொழில் வருமானம் கொண்ட தனிநபர்கள், HUF மற்றும் கூட்டாண்மை நிறுவனங்களுக்கு (LLP தவிர).',
        eligible: [
          'பிரிவு 44AD இன் கீழ் ஊகிக்கப்பட்ட வருமானம் (₹2/3 கோடி வரை விற்றுமுதல்).',
          'பிரிவு 44ADA இன் கீழ் ஊகிக்கப்பட்ட வருமானம் (₹50/75 லட்சம் வரை மொத்த வருவாய் பெறும் தொழில் வல்லుநர்கள்).',
          'பிரிவு 44AE இன் கீழ் ஊகிக்கப்பட்ட வருமானம் (சரக்கு வாகன வணிகம்).',
          'சம்பளம், ஒரு வீட்டுச் சொத்து மற்றும் இதர ஆதாரங்கள் மூலம் ₹50 லட்சம் வரை மொத்த வருமானம்.'
        ],
        notEligible: [
          'மொத்த வருமானம் ₹50 லட்சத்திற்கு மேல் இருத்தல்.',
          'வெளிநாடு வாழ் இந்தியர்கள் அல்லது நிறுவன இயக்குநர்கள்.',
          'மூலதன ஆதாயங்கள் அல்லது வெளிநாட்டு சொத்துக்கள் வைத்திருப்பவர்கள்.'
        ],
        keyDetails: [
          'மொத்த வரவுகள் / விற்றுமுதல்.',
          'ரொக்க இருப்பு மற்றும் வங்கி இருப்பு அறிவிப்புகள்.',
          'இதர கடனாளிகள் மற்றும் கடனளிப்போர் விவரங்கள்.'
        ]
      }
    ],
    
    howToChooseTitle: 'உங்களுக்கு எந்த ITR சரியானது என்பதில் குழப்பமா?',
    howToChooseText1: 'தவறான ITR படிவத்தைத் தேர்ந்தெடுப்பது வருமான வரித் துறையிடமிருந்து பிரிவு 139(9) இன் கீழ் "குறைபாடுள்ள தாக்கல்" அறிவிப்புக்கு வழிவகுக்கும்.',
    howToChooseText2: 'எங்கள் AI உதவியாளர் உங்களுக்கு வழிகாட்ட முடியும். உங்கள் வருமான ஆதாரங்களைப் பற்றி (எ.கா. சம்பளம், பங்கு லாபம், வணிகம்) அரட்டையடிக்குக் கூறவும், அது சரியான படிவத்தை பரிந்துரைக்கும்.',
    aiCTAButton: 'ITR உதவிக்கு AI ஐ அணுகவும்',
    calculatorCTAButton: 'காலകുംலேட்டரைத் திறக்கவும்'
  },
  te: {
    languageName: 'తెలుగు',
    title: 'ITR ఫారమ్ ఎంపిక మార్గదర్శి',
    subtitle: 'ప్రస్తుత పన్ను నిర్ధారణ సంవత్సరానికి మీ ఆదాయ వనరుల ఆధారంగా సరైన ఆదాయపు పన్ను రిటర్న్ (ITR) ఫారమ్‌ను కనుగొనండి.',
    eligibleLabel: 'ఎవరు ఫైల్ చేయాలి',
    notEligibleLabel: 'ఎవరు ఫైల్ చేయకూడదు',
    keyDetailsLabel: 'అవసరమైన కీలక వివరాలు',
    
    forms: [
      {
        id: 'itr1',
        name: 'ITR-1 (సహజ్)',
        description: 'జీతం, ఒక ఇల్లు మరియు ఇతర వనరుల (వడ్డీ, ఫ్యామిలీ పెన్షన్ వంటివి) నుండి ₹50 లక్షల వరకు ఆదాయం ఉన్న వ్యక్తుల కోసం.',
        eligible: [
          'జీతం పొందే ఉద్యోగులు & పెన్షనర్లు.',
          'ఒకే ఒక ఇల్లు ఉన్న యజమానులు.',
          'ఇతర వనరుల నుండి ఆదాయం (పొదుపు/FD వడ్డీ, డివిడెండ్, ఫ్యామిలీ పెన్షన్).',
          'వ్యవసాయ ఆదాయం ₹5,000 వరకు.'
        ],
        notEligible: [
          'మొత్తం ఆదాయం ₹50 లక్షలు దాటినప్పుడు.',
          'ప్రవాస భారతీయులు (NRI) మరియు RNOR.',
          'కంపెనీల డైరెక్టర్లు లేదా అన్‌లిస్టెడ్ ఈక్విటీ షేర్లు కలిగి ఉన్నవారు.',
          'క్యాపిటల్ గెయిన్స్ (మ్యూచువల్ ఫండ్స్, షేర్లు, ఆస్తి విక్రయాలు) నుండి ఆదాయం.',
          'ఒకటి కంటే ఎక్కువ ఇళ్లు ఉన్నవారు.'
        ],
        keyDetails: [
          'జీతం వివరాలు (భత్యాలు, తగ్గింపులు).',
          'ఇంటి ఆస్తి వివరాలు (సొంతంగా నివసిస్తున్నారా లేదా అద్దెకు ఇచ్చారా).',
          'వడ్డీ ఆదాయ వివరాలు.'
        ]
      },
      {
        id: 'itr2',
        name: 'ITR-2',
        description: 'వ్యాపారం లేదా వృత్తిపరమైన ఆదాయం లేకుండా, క్యాపిటల్ గెయిన్స్, విదేశీ ఆస్తులు లేదా ఒకటి కంటే ఎక్కువ ఇళ్లు ఉన్న వ్యక్తులు & HUFల కోసం.',
        eligible: [
          'ఆదాయం ₹50 లక్షలు దాటినప్పుడు.',
          'షేర్లు, మ్యూచువల్ ఫండ్స్ లేదా రియల్ ఎస్టేట్ ద్వారా వచ్చే క్యాపిటల్ గెయిన్స్.',
          'కంపెనీలలో డైరెక్టర్ హోదా లేదా అన్‌లిస్టెడ్ షేర్లు కలిగి ఉండటం.',
          'ఒకటి కంటే ఎక్కువ ఇళ్లు ఉండటం.',
          'విదేశీ ఆస్తులు లేదా విదేశీ ఆదాయం.'
        ],
        notEligible: [
          'సొంత వ్యాపారం లేదా వృత్తి నుండి ఆదాయం ఉన్న వ్యక్తులు లేదా HUFలు.'
        ],
        keyDetails: [
          'వివరణాత్మక క్యాపిటల్ గెయిన్స్ లెక్కలు (Schedule CG).',
          'విదేశీ ఆస్తుల నివేదిక (Schedule FA).',
          'బహుళ గృహాలు మరియు అద్దె ఆదాయ వివరాలు.'
        ]
      },
      {
        id: 'itr3',
        name: 'ITR-3',
        description: 'సొంత వ్యాపారం లేదా వృత్తిని నిర్వహించే వ్యక్తులు మరియు HUFల కోసం (భాగస్వామ్య సంస్థల భాగస్వాములతో సహా).',
        eligible: [
          'వ్యాపారం లేదా వృత్తి నుండి ఆదాయం (ఆడిట్ మరియు నాన్-ఆడిట్ కేసులు).',
          'భాగస్వామ్య సంస్థలలో భాగస్వాములు.',
          'అంచనా వ్యాపార ఆదాయం ₹50 లక్షలు దాటినప్పుడు.',
          'క్రిప్టో/VDA ఆదాయం (వర్చువల్ డిజిటల్ అసెట్స్).'
        ],
        notEligible: [
          'కంపెనీలు, LLPలు లేదా ట్రస్ట్‌లు (వీరికి ITR-5, ITR-6 లేదా ITR-7 అవసరం).'
        ],
        keyDetails: [
          'బ్యాలెన్స్ షీట్ మరియు లాభ నష్టాల ఖాతా వివరాలు.',
          'GST టర్నోవర్ ధృవీకరణ వివరాలు.',
          'వర్తిస్తే టాక్స్ ఆడిట్ నివేదికలు (సెక్షన్ 44AB).'
        ]
      },
      {
        id: 'itr4',
        name: 'ITR-4 (సుగమ్)',
        description: '₹50 లక్షల వరకు అంచనా వ్యాపార/వృత్తి ఆదాయం ఉన్న వ్యక్తులు, HUFలు మరియు భాగస్వామ్య సంస్థల (LLPలు మినహా) కోసం.',
        eligible: [
          'సెక్షన్ 44AD కింద అంచనా ఆదాయం (₹2/3 కోట్ల వరకు టర్నోవర్).',
          'సెక్షన్ 44ADA కింద అంచనా ఆదాయం (₹50/75 లక్షల వరకు మొత్తం రసీదులు ఉన్న నిపుణులు).',
          'సెక్షన్ 44AE కింద అంచనా ఆదాయం (గూడ్స్ క్యారేజ్ వ్యాపారం).',
          'జీతం, ఒక ఇల్లు మరియు ఇతర వనరుల నుండి ₹50 లక్షల వరకు మొత్తం ఆదాయం.'
        ],
        notEligible: [
          'మొత్తం ఆదాయం ₹50 లక్షలు దాటినప్పుడు.',
          'ప్రవాస భారతీయులు లేదా కంపెనీ డైరెక్టర్లు.',
          'క్యాపిటల్ గెయిన్స్ లేదా విదేశీ ఆస్తులు ఉన్నవారు.'
        ],
        keyDetails: [
          'మొత్తం రసీదులు / టర్నోవర్.',
          'నగదు నిల్వ మరియు బ్యాంక్ బ్యాలెన్స్ డిక్లరేషన్.',
          'వివిధ రుణగ్రస్తులు & రుణదాతల వివరాలు.'
        ]
      }
    ],
    
    howToChooseTitle: 'మీకు ఏ ITR సరిపోతుందో తెలియడం లేదా?',
    howToChooseText1: 'తప్పుడు ITR ఫారమ్‌ను ఎంచుకోవడం వల్ల ఆదాయపు పన్ను శాఖ నుండి సెక్షన్ 139(9) కింద "లోపభూయిష్ట రిటర్న్" నోటీసు రావచ్చు.',
    howToChooseText2: 'మా AI సహాయకుడు మీకు మార్గనిర్దేశం చేయగలడు. చాట్‌బాట్‌కు మీ ఆదాయ వనరుల గురించి చెప్పండి (ఉదా. జీతం, స్టాక్ లాభాలు, వ్యాపారం), అది సరైన ఫారమ్‌ను సూచిస్తుంది.',
    aiCTAButton: 'ITR సహాయం కోసం AIని అడగండి',
    calculatorCTAButton: 'కాలిక్యులేటర్ తెరవండి'
  }
};
