const BASE_URL = "https://jmrh.lovable.app";

export const COMMON_KEYWORDS = "JMRH, Journal of Multidisciplinary Research Horizon, academic journal, research paper, peer-reviewed journal, open access journal, PhD research, multidisciplinary research, scholarly publication, Ooty, Nilgiris, Gudalur, Tamil Nadu, India, research mentoring, academic mentorship, paper publication, dissertation support, postgraduate research, education research, teaching research, technology research, science journal, humanities journal, social science research";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JMRH Publications",
  alternateName: "Journal of Multidisciplinary Research Horizon",
  url: BASE_URL,
  logo: "https://storage.googleapis.com/gpt-engineer-file-uploads/z6n6yRQR3COHl1C465nlg0EUjOx2/uploads/1770267719301-download.webp",
  description: "JMRH is a peer-reviewed, open-access academic journal based in Gudalur, The Nilgiris, Tamil Nadu, India. Dedicated to advancing multidisciplinary research through rigorous scholarly mentoring and publication for PhD scholars and early-career researchers.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gudalur",
    addressLocality: "The Nilgiris",
    addressRegion: "Tamil Nadu",
    postalCode: "643212",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@jmrhpublications.com",
    contactType: "editorial office",
  },
  sameAs: [],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JMRH - Journal of Multidisciplinary Research Horizon",
  alternateName: "JMRH Publications",
  url: BASE_URL,
  description: "Peer-reviewed open-access academic journal for multidisciplinary research from Ooty, Nilgiris, Gudalur region. Supporting PhD scholars, postgraduates, and researchers in education, technology, science, and humanities.",
  publisher: { "@type": "Organization", name: "JMRH Publications" },
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/archives?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const periodicaSchema = {
  "@context": "https://schema.org",
  "@type": "Periodical",
  name: "Journal of Multidisciplinary Research Horizon",
  alternateName: "JMRH",
  url: BASE_URL,
  publisher: {
    "@type": "Organization",
    name: "JMRH Publications",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gudalur, The Nilgiris",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  },
  description: "A peer-reviewed, open-access multidisciplinary academic journal published from the Nilgiris district near Ooty, Tamil Nadu, India. Covering research in education, technology, science, humanities, and social sciences.",
  isAccessibleForFree: true,
  inLanguage: "en",
};

export const pageSEO = {
  home: {
    title: "JMRH – Journal of Multidisciplinary Research Horizon | Peer-Reviewed Academic Journal | Ooty, Nilgiris",
    description: "JMRH is a peer-reviewed, open-access academic journal from Gudalur, Nilgiris near Ooty, Tamil Nadu. Submit your PhD research papers in education, technology, science & humanities. Free mentoring for scholars.",
    keywords: COMMON_KEYWORDS + ", home, submit paper, call for papers, research publication India",
  },
  about: {
    title: "About JMRH – Multidisciplinary Research Journal | Gudalur, Nilgiris, Tamil Nadu",
    description: "Learn about JMRH Publications – a scholarly journal based in Gudalur, The Nilgiris near Ooty. We mentor PhD scholars and early-career researchers across education, technology, science, and humanities.",
    keywords: COMMON_KEYWORDS + ", about JMRH, journal history, academic mission, research vision",
  },
  guidelines: {
    title: "Author Guidelines – How to Submit Research Papers | JMRH Journal",
    description: "Complete author guidelines for submitting research papers to JMRH. Formatting requirements, submission process, and manuscript preparation for PhD scholars and researchers.",
    keywords: COMMON_KEYWORDS + ", author guidelines, submission guidelines, manuscript format, paper submission, how to publish research paper",
  },
  editorial: {
    title: "Editorial Board – JMRH Academic Journal | Expert Reviewers & Editors",
    description: "Meet the JMRH editorial board – experienced academics and researchers guiding peer review in education, technology, science, and humanities from the Nilgiris region.",
    keywords: COMMON_KEYWORDS + ", editorial board, peer reviewers, academic editors, journal committee",
  },
  ethics: {
    title: "Publication Ethics & Policies – JMRH | Academic Integrity Standards",
    description: "JMRH publication ethics policy covering plagiarism, authorship, peer review integrity, and open access standards for academic research publishing.",
    keywords: COMMON_KEYWORDS + ", publication ethics, plagiarism policy, academic integrity, research ethics, COPE guidelines",
  },
  archives: {
    title: "Research Archives – Published Papers & Issues | JMRH Journal",
    description: "Browse published research papers and past issues of JMRH. Open-access archives covering multidisciplinary research in education, technology, science, and humanities.",
    keywords: COMMON_KEYWORDS + ", published papers, journal archives, past issues, research articles, open access papers",
  },
  reviews: {
    title: "Peer Reviews & Testimonials – JMRH Journal | Scholar Feedback",
    description: "Read reviews and testimonials from researchers and PhD scholars who published with JMRH. Learn about our mentoring and peer review experience.",
    keywords: COMMON_KEYWORDS + ", reviews, testimonials, scholar feedback, peer review experience",
  },
  contact: {
    title: "Contact JMRH – Reach Our Editorial Office | Gudalur, Nilgiris",
    description: "Contact JMRH Publications editorial office in Gudalur, The Nilgiris, Tamil Nadu. Get in touch for paper submissions, queries, and research mentoring support.",
    keywords: COMMON_KEYWORDS + ", contact, editorial office, Gudalur address, reach us, phone, email",
  },
  submitPaper: {
    title: "Submit Your Research Paper – JMRH | Online Manuscript Submission",
    description: "Submit your research paper or manuscript to JMRH online. Open to PhD scholars, postgraduates, and researchers in all disciplines. Fast peer review process.",
    keywords: COMMON_KEYWORDS + ", submit paper, manuscript submission, online submission, publish research, call for papers",
  },
};
