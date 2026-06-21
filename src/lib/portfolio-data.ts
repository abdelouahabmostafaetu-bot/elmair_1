// Sample portfolio projects (client identities kept generic for privacy).
export type Project = {
  id: string
  category: "patents" | "scopus" | "training" | "scholarships"
  titleAr: string
  titleEn: string
  beneficiaryAr: string
  beneficiaryEn: string
  image: string
}

export const projects: Project[] = [
  {
    id: "p1",
    category: "scopus",
    titleAr: "توثيق مؤتمر دولي في الهندسة ضمن Scopus",
    titleEn: "Indexing an international engineering conference in Scopus",
    beneficiaryAr: "جامعة وطنية",
    beneficiaryEn: "A national university",
    image: "/images/academic.png",
  },
  {
    id: "p2",
    category: "patents",
    titleAr: "تسجيل براءة اختراع صناعية لدى INAPI",
    titleEn: "Registering an industrial patent with INAPI",
    beneficiaryAr: "مخبر بحث",
    beneficiaryEn: "A research lab",
    image: "/images/cta.png",
  },
  {
    id: "p3",
    category: "training",
    titleAr: "برنامج تدريب إداري وتأهيل ISO 9001",
    titleEn: "Management training & ISO 9001 readiness",
    beneficiaryAr: "شركة خاصة",
    beneficiaryEn: "A private company",
    image: "/images/corporate.png",
  },
  {
    id: "p4",
    category: "scholarships",
    titleAr: "ملف قبول ومنحة دكتوراه دولية",
    titleEn: "International PhD admission & scholarship file",
    beneficiaryAr: "باحث دراسات عليا",
    beneficiaryEn: "A graduate researcher",
    image: "/images/about.png",
  },
  {
    id: "p5",
    category: "scopus",
    titleAr: "تأهيل مجلة علمية للأرشفة الدولية",
    titleEn: "Qualifying a scientific journal for indexing",
    beneficiaryAr: "كلية جامعية",
    beneficiaryEn: "A university faculty",
    image: "/images/academic.png",
  },
  {
    id: "p6",
    category: "training",
    titleAr: "استشارة لغوية وتسويقية لعلامة تجارية",
    titleEn: "Linguistic & marketing consulting for a brand",
    beneficiaryAr: "مؤسسة ناشئة",
    beneficiaryEn: "A startup",
    image: "/images/corporate.png",
  },
]
