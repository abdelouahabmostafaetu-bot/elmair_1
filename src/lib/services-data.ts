// Structured services content for both sectors (Arabic + English).
// Used by the Services page accordions and the home page.

export type ServiceItem = {
  id: string
  icon: string // lucide icon name
  titleAr: string
  titleEn: string
  descAr: string
  descEn: string
  pointsAr: string[]
  pointsEn: string[]
}

export const academicServices: ServiceItem[] = [
  {
    id: "scopus",
    icon: "GraduationCap",
    titleAr: "توثيق الملتقيات العلمية في Scopus و Clarivate",
    titleEn: "Indexing conferences in Scopus & Clarivate",
    descAr: "هندسة المسار الكامل لإدراج أعمال المؤتمرات الدولية في قواعد البيانات العالمية.",
    descEn: "Engineering the full path to index international conference proceedings in global databases.",
    pointsAr: [
      "بناء مواقع المؤتمرات الرسمية",
      "إعداد منصات EasyChair و EquinOCS",
      "فحص الاستلال عبر Turnitin",
      "التنسيق مع Springer و IEEE و Elsevier",
    ],
    pointsEn: [
      "Building official conference landing pages",
      "Setting up EasyChair & EquinOCS",
      "Plagiarism checks via Turnitin",
      "Coordination with Springer, IEEE, Elsevier",
    ],
  },
  {
    id: "journals",
    icon: "BookOpen",
    titleAr: "تأهيل المجلات العلمية للأرشفة الدولية",
    titleEn: "Qualifying journals for international indexing",
    descAr: "نقل المجلات الجامعية إلى مصاف المجلات المصنفة عالمياً.",
    descEn: "Moving local journals up to internationally indexed standards.",
    pointsAr: [
      "تنصيب نظام OJS وأرشفة الأعداد",
      "سياسات أخلاقيات النشر COPE",
      "توسيع هيئة التحرير دولياً",
      "التقديم أمام لجنة Scopus (CSAB)",
    ],
    pointsEn: [
      "OJS setup and back-issue archiving",
      "COPE publishing ethics policies",
      "International editorial board expansion",
      "Submission to Scopus CSAB",
    ],
  },
  {
    id: "patents",
    icon: "Lightbulb",
    titleAr: "براءات الاختراع وحماية الملكية الفكرية",
    titleEn: "Patents & intellectual property protection",
    descAr: "تحويل الابتكارات إلى أصول قانونية محمية (INAPI & WIPO).",
    descEn: "Turning innovations into protected legal assets (INAPI & WIPO).",
    pointsAr: [
      "فحص الحالة السابقة التقنية",
      "صياغة الادعاءات والمطالب القانونية",
      "الرسوم التقنية وفق INAPI",
      "دعم مشاريع القرار 1275",
    ],
    pointsEn: [
      "Prior-art search",
      "Legal drafting of claims",
      "Technical drawings per INAPI",
      "Support for decree 1275 projects",
    ],
  },
  {
    id: "admissions",
    icon: "Plane",
    titleAr: "القبولات الجامعية والملفات الأكاديمية الدولية",
    titleEn: "International admissions & academic files",
    descAr: "مرافقة الطلاب في هندسة ملفات المنح والجامعات العالمية.",
    descEn: "Guiding students in building scholarship and top-university applications.",
    pointsAr: [
      "خطاب الغرض SOP وخطاب الدوافع",
      "السيرة الأكاديمية (ATS / EuroPass)",
      "رسائل التوصية",
      "التدريب على المقابلات",
    ],
    pointsEn: [
      "SOP & motivation letters",
      "Academic CV (ATS / EuroPass)",
      "Recommendation letters",
      "Interview coaching",
    ],
  },
  {
    id: "consulting",
    icon: "LineChart",
    titleAr: "الاستشارات الأكاديمية ومرافقة الدراسات العليا",
    titleEn: "Academic consulting & graduate support",
    descAr: "استشارات في مناهج البحث والتحليل الإحصائي مع التزام الأمانة العلمية.",
    descEn: "Research methodology and statistics consulting, with full academic integrity.",
    pointsAr: [
      "التحليل الإحصائي (SPSS / MATLAB)",
      "صياغة الإشكاليات والفرضيات",
      "خطط البحث الاستراتيجية",
    ],
    pointsEn: [
      "Statistical analysis (SPSS / MATLAB)",
      "Framing research problems & hypotheses",
      "Strategic research plans",
    ],
  },
  {
    id: "proofreading",
    icon: "PenTool",
    titleAr: "التدقيق اللغوي والأكاديمي الفاخر",
    titleEn: "Premium academic proofreading",
    descAr: "مراجعة لغوية معمقة بالعربية والإنجليزية والفرنسية.",
    descEn: "In-depth language review in Arabic, English and French.",
    pointsAr: [
      "مطابقة الصياغة العلمية الدولية",
      "تدقيق المقالات والأطروحات",
    ],
    pointsEn: [
      "Aligning with international scientific style",
      "Proofing articles and theses",
    ],
  },
]

export const corporateServices: ServiceItem[] = [
  {
    id: "training",
    icon: "Users",
    titleAr: "التدريب والتطوير المؤسسي",
    titleEn: "Corporate training & development",
    descAr: "رفع كفاءة الموظفين بربط الطرح الأكاديمي بالممارسة الميدانية.",
    descEn: "Raising staff efficiency by linking academic insight to practice.",
    pointsAr: [
      "حقائب تدريبية حصرية",
      "ورش القيادة والمهارات الناعمة",
      "برامج لغات وبرمجة مكثفة",
    ],
    pointsEn: [
      "Exclusive training kits",
      "Leadership & soft-skills workshops",
      "Intensive language & coding programs",
    ],
  },
  {
    id: "quality",
    icon: "BadgeCheck",
    titleAr: "استشارات الجودة والتطوير الإداري",
    titleEn: "Quality & management consulting",
    descAr: "هيكلة الأنظمة الإدارية لضمان التميز التشغيلي.",
    descEn: "Structuring management systems for operational excellence.",
    pointsAr: [
      "تأهيل ISO 9001:2015",
      "المخططات التنظيمية وتوصيف الوظائف",
      "مؤشرات الأداء KPIs ولوحات التحكم",
    ],
    pointsEn: [
      "ISO 9001:2015 qualification",
      "Org charts & job descriptions",
      "KPIs and dashboards",
    ],
  },
  {
    id: "linguistic",
    icon: "Megaphone",
    titleAr: "الاستشارات اللغوية والسيميائية والتسويقية",
    titleEn: "Linguistic, semiotic & marketing consulting",
    descAr: "توظيف العمق اللغوي لخدمة المحتوى الرسمي والتجاري.",
    descEn: "Using linguistic depth to serve official and commercial content.",
    pointsAr: [
      "تدقيق احترافي صارم",
      "تحليل الخطاب الإعلاني والسيميائي",
      "محتوى وبروشورات فاخرة",
    ],
    pointsEn: [
      "Rigorous professional proofreading",
      "Ad-discourse & semiotic analysis",
      "Premium content & brochures",
    ],
  },
]
