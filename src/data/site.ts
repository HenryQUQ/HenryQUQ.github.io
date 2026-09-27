export type LinkKind =
  | "scholar"
  | "github"
  | "linkedin"
  | "orcid"
  | "huggingface"
  | "email"
  | "project"
  | "paper"
  | "supplementary"
  | "arxiv"
  | "code"
  | "models"
  | "dataset"
  | "poster"
  | "video"
  | "workshop";

export type LinkItem = {
  kind: LinkKind;
  label: string;
  href: string;
  external?: boolean;
};

export type PublicationLink = LinkItem;

export type PersonLink = {
  name: string;
  href: string;
};

export type OrganisationLink = {
  label: string;
  href: string;
};

export type ContactEmail = {
  label: string;
  address: string;
  href: string;
};

export type PublicationMedia = {
  id: string;
  kind: "figure" | "poster" | "video";
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
  posterSrc?: string;
  embedUrl?: string;
};

export type ResearchLensRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ResearchLensStep = {
  id: string;
  label: string;
  note: string;
  focusLabel?: string;
  regions: [ResearchLensRegion, ...ResearchLensRegion[]];
};

export type ResearchLens = {
  id: string;
  label: string;
  steps: ResearchLensStep[];
};

export type Publication = {
  slug: string;
  title: string;
  authors: string;
  authorList: string[];
  authorLinks?: PersonLink[];
  venue: string;
  shortVenue: string;
  recognition?: string;
  year: number;
  summary: string;
  abstract: string;
  citationText: string;
  bibtex: string;
  doi?: string;
  arxivId?: string;
  links: PublicationLink[];
  spotlightMedia?: PublicationMedia[];
};

export type Project = {
  title: string;
  category: "project" | "dataset";
  year: number;
  summary: string;
  image?: string;
  imageFit?: "cover" | "contain";
  relatedPublicationSlug?: Publication["slug"];
  links: LinkItem[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  thesis: string;
  takeaway: string;
  challenge: string;
  contribution: string;
  outcome: string;
  year: string;
  context: string;
  media: {
    src: string;
    alt: string;
    width: number;
    height: number;
    fit?: "cover" | "contain";
    lens?: ResearchLens;
  };
  links: LinkItem[];
  accent: "blue" | "cyan" | "coral";
};

export type ResearchThread = {
  slug: string;
  index: string;
  title: string;
  detail: string;
  study: {
    slug: CaseStudy["slug"];
    label: string;
  };
  publication: {
    slug: Publication["slug"];
    label: string;
  };
  inferFromTarget?: boolean;
};

export type ProfileEvidence = {
  track: "enterprise" | "research";
  value: string;
  label: string;
  detail: string;
};

export type EnterpriseCaseStudy = {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  contribution: string;
  outcomeLabel: string;
  outcome: string;
  system: string[];
  capabilities: string[];
  source?: {
    label: string;
    href: string;
  };
};

export type NewsItem = {
  date: string;
  title: string;
  detail: string;
  href?: string;
};

export type TimelineItem = {
  title: string;
  organisation: string;
  organisationLinks?: OrganisationLink[];
  period: string;
  detail: string;
  highlights?: string[];
};

export type TimelineRole = {
  title: string;
  period: string;
  detail: string;
  highlights?: string[];
};

export type TimelineGroup = {
  track: "academic" | "industry";
  organisation: string;
  organisationLinks?: OrganisationLink[];
  period: string;
  roles: TimelineRole[];
};

export type Profile = {
  name: string;
  englishName: string;
  location: string;
  shortAffiliation: string;
  role: string;
  affiliation: string;
  positioning: string;
  shortBio: string;
  bio: string;
  email: string;
  primaryContact: ContactEmail;
  contactEmails: ContactEmail[];
  heroImage: string;
  heroBackgroundImageDesktop: string;
  heroBackgroundImageMobile: string;
  links: LinkItem[];
};

// Chapter numerals are print devices for structure only; they carry no facts.
export const sections = [
  { id: "enterprise", label: "Work", folio: "I" },
  { id: "research", label: "Research", folio: "II" },
  { id: "journey", label: "About", folio: "III" },
  { id: "contact", label: "Say hello", folio: "IV" },
];

export const homeContent = {
  hero: {
    greeting: "Hello, I’m",
    note: "This is a collection of my projects, research and things still taking shape.",
    footer: "A few different sides of me",
  },
  work: {
    label: "Selected work",
    title: "A few things I’ve made.",
    intro:
      "Some are out in the world. Others are still taking shape. Each began with something I wanted to understand or make better.",
  },
  research: {
    label: "Research & curiosity",
    title: "There’s more to an image.",
    intro:
      "Colour, shape, light, a change of perspective. My research looks at what images can tell us, and how we might work with them.",
  },
  about: {
    label: "Beyond the projects",
    title: "Still looking. Still learning.",
    introduction: "From physics to pictures.",
    paragraphs: [
      "I started with physics at Southampton, then came to Birmingham for a master’s. Somewhere along the way, questions about how the world works became questions about how we see it.",
      "These days, I study computer vision as a part-time PhD researcher at the University of Birmingham and lead technology at Allsee. I like being able to follow an idea through a paper, a prototype, and the conversations it starts.",
    ],
    image: "/images/hero/home-hero-desktop.webp",
    imageMobile: "/images/hero/home-hero-mobile.webp",
    imageAlt: "Chenyuan looking across a busy city crossing at night",
    caption: "A different point of view.",
  },
  contact: {
    label: "Say hello",
    title: "Let’s compare notes.",
    intro:
      "A question about the work, an idea to explore together, or just something you’d like to share. I’d be glad to hear from you.",
  },
  colophon: "Set in Newsreader & DM Sans.",
};

export type WorkStory = {
  slug: "nexus" | "erp-ai" | "compad";
  name: string;
  category: string;
  title: string;
  description: string;
  role: string;
  status?: string;
  highlight: string;
  highlightContext: string;
  story: string[];
};

export const workStories: WorkStory[] = [
  {
    slug: "compad",
    name: "COMPaD",
    category: "Allsee × University of Birmingham",
    title: "A poster is a starting point.",
    description:
      "Change a word, move an image, try another colour. I’m exploring how a generated design can leave room for the person who finishes it.",
    role: "I started and lead COMPaD, a joint research project between Allsee and the University of Birmingham.",
    status: "In alpha",
    highlight: "In alpha",
    highlightContext: "an editable design, from a short brief",
    story: [
      "Instead of delivering one flattened picture, the project keeps text, images, logos and other elements separate. The aim is to give people a first draft they can keep working with.",
      "I designed and trained the text-and-image model using an open-source foundation, and built the tools that turn a brief into a design. We’re in first-stage alpha testing, looking closely at visual quality and whether the results remain useful to edit.",
    ],
  },
  {
    slug: "nexus",
    name: "Nexus",
    category: "Allsee · Digital signage",
    title: "One place for every screen.",
    description:
      "Choosing what plays, deciding when it appears, keeping it all in view. Nexus brings the work behind a network of screens into one place.",
    role: "I led the redesign and a five-person team, while building much of the software myself.",
    highlight: "200,000+",
    highlightContext: "devices managed worldwide",
    story: [
      "It started with visiting customers and watching how they worked. Those conversations helped us bring around ten separate platforms into one shared home for customers and their content.",
      "I wrote most of the backend and contributed to the device software. Nexus now serves more than 1,000 organisations and 50,000 users. Larger features that once took about a month can often reach customers in a few days.",
    ],
  },
  {
    slug: "erp-ai",
    name: "Everyday tools",
    category: "Allsee · Tools for colleagues",
    title: "A little less busywork.",
    description:
      "Small tasks have a way of filling a day. This assistant helps colleagues work through orders, repairs and warehouse requests, with a chance to check before anything important changes.",
    role: "I built the AI layer, including the checks that keep people in control.",
    highlight: "≈80%",
    highlightContext: "less time on the tasks we tested",
    story: [
      "The assistant works inside the company’s existing business rules. It checks who can do what, asks people to confirm important changes and keeps a record of its actions.",
      "In the everyday tasks we evaluated, colleagues took around 80% less time and made around 99% fewer manual mistakes. Those results describe the tasks tested, rather than every job across the company.",
    ],
  },
];

export const researchStories = [
  {
    slug: "visualsplit",
    name: "VisualSplit",
    title: "Take a picture apart.",
    description:
      "I wanted to give image models controls we can see and understand. VisualSplit starts with three familiar things: shape, colour and light.",
    image: "/images/projects/visualsplit/egret-original.webp",
    imageAlt:
      "Original white egret photograph from the VisualSplit colour-editing example",
    href: "https://chenyuanqu.com/VisualSplit/",
  },
  {
    slug: "x360",
    name: "360+x",
    title: "There’s more than one view.",
    description:
      "A place is more than the view in front of you. We brought different viewpoints and sound together to study how they add up to a scene. Take a look around.",
    image: "/images/projects/x360-panorama.webp",
    imageAlt:
      "A panoramic museum scene from the official 360+x dataset preview",
    href: "https://x360dataset.github.io/",
  },
];

export const paperIntroductions: Record<
  string,
  { name: string; title: string }
> = {
  visualsplit: {
    name: "VisualSplit",
    title: "Giving image models controls we can understand.",
  },
  diff: {
    name: "DIFF",
    title: "Helping a model recognise a world it hasn’t seen.",
  },
  x360: {
    name: "360+x",
    title: "Understanding a place from more than one perspective.",
  },
  med: { name: "MeD", title: "Finding the picture in the noise." },
};

export const profile: Profile = {
  name: "Chenyuan Qu",
  englishName: "Henry",
  location: "Birmingham, UK",
  shortAffiliation: "Allsee · University of Birmingham",
  role: "Head of Technologies · PhD Researcher",
  affiliation: "University of Birmingham · Allsee · Vieunite",
  positioning: "Research, images & things in progress",
  shortBio:
    "I’m interested in how we see, how images are made, and what happens when we start playing with them.",
  bio: "I lead technology at Allsee and study computer vision as a part-time PhD researcher at the University of Birmingham.",
  email: "Chenyuan.Qu@outlook.com",
  primaryContact: {
    label: "Personal",
    address: "Chenyuan.Qu@outlook.com",
    href: "mailto:Chenyuan.Qu@outlook.com",
  },
  contactEmails: [
    {
      label: "Personal",
      address: "Chenyuan.Qu@outlook.com",
      href: "mailto:Chenyuan.Qu@outlook.com",
    },
    {
      label: "Allsee",
      address: "henry.qu@allsee-tech.com",
      href: "mailto:henry.qu@allsee-tech.com",
    },
    {
      label: "Vieunite",
      address: "henry.qu@vieunite.com",
      href: "mailto:henry.qu@vieunite.com",
    },
    {
      label: "University of Birmingham",
      address: "cxq134@student.bham.ac.uk",
      href: "mailto:cxq134@student.bham.ac.uk",
    },
  ],
  heroImage: "/images/portrait.webp",
  heroBackgroundImageDesktop: "/images/hero/home-hero-desktop.webp",
  heroBackgroundImageMobile: "/images/hero/home-hero-mobile.webp",
  links: [
    {
      kind: "scholar",
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?hl=en&user=MrHJXYcAAAAJ",
    },
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/HenryQUQ",
    },
    {
      kind: "huggingface",
      label: "Hugging Face",
      href: "https://huggingface.co/quchenyuan",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://uk.linkedin.com/in/henry-qu-436621195",
    },
    {
      kind: "orcid",
      label: "ORCID",
      href: "https://orcid.org/0009-0000-4814-2022",
    },
    {
      kind: "email",
      label: "Email",
      href: "mailto:Chenyuan.Qu@outlook.com",
      external: false,
    },
  ],
};

export const profileEvidence: ProfileEvidence[] = [
  {
    track: "enterprise",
    value: "200,000+",
    label: "managed devices",
    detail: "Serving 1,000+ organisations and 50,000+ users around the world.",
  },
  {
    track: "enterprise",
    value: "≈80%",
    label: "less time per task",
    detail: "Less time needed to complete the ERP tasks that were tested.",
  },
  {
    track: "enterprise",
    value: "≈99%",
    label: "fewer human errors",
    detail: "Fewer human mistakes in the ERP tasks that were tested.",
  },
  {
    track: "research",
    value: "BMVC 2025",
    label: "first author",
    detail:
      "VisualSplit explores image representations people can understand and edit.",
  },
  {
    track: "research",
    value: "CVPR 2024",
    label: "oral paper",
    detail: "Co-author of 360+x, selected for an oral presentation.",
  },
  {
    track: "research",
    value: "4 papers",
    label: "peer reviewed",
    detail: "Published at BMVC, CVPR, ICASSP, and ICCV.",
  },
];

export const enterpriseCaseStudies: EnterpriseCaseStudy[] = [
  {
    slug: "nexus",
    index: "01",
    eyebrow: "Customer platform · Live worldwide",
    title: "Nexus MySignagePortal",
    summary:
      "Allsee's previous platform had grown into around ten different versions. Nexus replaced them with one shared platform that is easier for customers to use and for the team to improve.",
    contribution:
      "I began by visiting customers and watching how they worked. I then led the redesign, wrote most of the Python/FastAPI backend, contributed to the Java software on the devices, and guided a five-person team.",
    outcomeLabel: "What changed",
    outcome:
      "Nexus now manages more than 200,000 devices for 1,000+ organisations and 50,000+ users worldwide. Larger features that used to take about a month can often be delivered in a few days, monthly reported bugs fell from dozens to low single digits, and the platform helped win at least £50,000 in directly attributable sales.",
    system: [
      "Listen to customers",
      "Design one shared platform",
      "Build the online services",
      "Connect the device software",
    ],
    capabilities: [
      "Customer research",
      "Python / FastAPI",
      "Java",
      "AWS",
      "Device software",
      "Team leadership",
    ],
  },
  {
    slug: "erp-ai",
    index: "02",
    eyebrow: "Everyday operations · In use",
    title: "An AI assistant for everyday ERP work",
    summary:
      "Employees can describe an order, warehouse, or repair task in everyday language and let the system complete the approved steps inside the company's ERP.",
    contribution:
      "I built the AI layer. It checks what each person is allowed to do, asks for confirmation before sensitive changes, and records every action. Behind the scenes, reusable MCP tools connect the model to the ERP without allowing it to bypass normal business rules.",
    outcomeLabel: "What changed",
    outcome:
      "In the day-to-day tasks we tested, employees completed the work around 80% faster and made around 99% fewer manual mistakes.",
    system: [
      "An employee describes the task",
      "The system checks permission",
      "The approved task is carried out",
      "Important actions are confirmed and recorded",
    ],
    capabilities: [
      "AI agents",
      "MCP",
      "Permissions",
      "Safeguards",
      "Human approval",
    ],
  },
  {
    slug: "compad",
    index: "03",
    eyebrow: "Joint research project · Early testing",
    title: "COMPaD",
    summary:
      "Most image generators leave a finished picture that is hard to change. COMPaD aims to create a real design file, so text, product images, logos, shapes, and QR codes can still be edited.",
    contribution:
      "I started and lead this joint project between Allsee and the University of Birmingham. I designed and trained a model that works with both text and images, built on open-source Qwen2.5. I also built the agents and online services that break a brief into smaller tasks and keep the design information organised as the system works.",
    outcomeLabel: "Where it is now",
    outcome:
      "The system is in first-stage alpha testing. We check whether the poster looks right, whether each element is placed correctly, and whether the final result is genuinely editable.",
    system: [
      "Understand the brief",
      "Plan the design",
      "Create and arrange the elements",
      "Return an editable file",
    ],
    capabilities: [
      "Model training",
      "Qwen2.5",
      "AI agents",
      "Editable output",
      "Testing",
      "Deployment",
    ],
  },
];

export const personLinks: PersonLink[] = [
  {
    name: "Chenyuan Qu",
    href: "https://chenyuanqu.com/",
  },
  {
    name: "Hao Chen",
    href: "https://h-chen.com/",
  },
  {
    name: "Jianbo Jiao",
    href: "https://jianbojiao.com/",
  },
  {
    name: "Yuxiang Ji",
    href: "https://yuxiang-ji.com/",
  },
  {
    name: "Yuqi Hou",
    href: "https://openreview.net/profile?id=~Yuqi_Hou2",
  },
  {
    name: "Irene Testini",
    href: "https://www.chia.cam.ac.uk/team/irene-testini",
  },
  {
    name: "Xiaohan Hong",
    href: "https://hannh5.github.io/",
  },
  {
    name: "Chen Chen",
    href: "https://www.crcv.ucf.edu/chenchen/",
  },
];

export const organisationLinks: OrganisationLink[] = [
  {
    label: "Allsee",
    href: "https://www.allsee-tech.com/",
  },
  {
    label: "Vieunite",
    href: "https://vieunite.com/",
  },
  {
    label: "University of Birmingham",
    href: "https://www.birmingham.ac.uk/",
  },
  {
    label: "MI X Group",
    href: "https://mix.jianbojiao.com/people/",
  },
  {
    label: "University of Southampton",
    href: "https://www.southampton.ac.uk/",
  },
  {
    label: "AsiaInfo Software Co. Ltd",
    href: "https://www.asiainfo.com/en_us/about.html",
  },
];

export const researchThreads: ResearchThread[] = [
  {
    slug: "interpretable-representations",
    index: "01",
    title: "Making image features easier to understand",
    detail:
      "I separate shape, colour, and brightness so we can see—and edit—what an AI model is using.",
    study: { slug: "visualsplit", label: "VisualSplit" },
    publication: { slug: "visualsplit", label: "BMVC 2025" },
    inferFromTarget: true,
  },
  {
    slug: "multimodal-scenes",
    index: "02",
    title: "Understanding a scene from more than one viewpoint",
    detail:
      "I combine panoramic and first-person views with sound, text, and location to give AI a fuller picture of a place.",
    study: { slug: "x360", label: "360+x" },
    publication: { slug: "x360", label: "CVPR 2024 Oral" },
    inferFromTarget: true,
  },
  {
    slug: "generative-vision",
    index: "03",
    title: "Giving people more control over generated images",
    detail:
      "I explore how generative models can rebuild, restore, and edit images without hiding every decision from the user.",
    study: { slug: "visualsplit", label: "VisualSplit" },
    publication: { slug: "visualsplit", label: "BMVC 2025" },
  },
];

export const publications: Publication[] = [
  {
    slug: "visualsplit",
    title:
      "Exploring Image Representation with Decoupled Classical Visual Descriptors",
    authors: "Chenyuan Qu, Hao Chen, Jianbo Jiao",
    authorList: ["Chenyuan Qu", "Hao Chen", "Jianbo Jiao"],
    authorLinks: personLinks.filter((person) =>
      ["Chenyuan Qu", "Hao Chen", "Jianbo Jiao"].includes(person.name),
    ),
    venue: "British Machine Vision Conference (BMVC)",
    shortVenue: "BMVC",
    year: 2025,
    summary:
      "VisualSplit breaks an image into three familiar parts—edges, colour regions, and overall brightness—and learns to rebuild the image from them. Keeping those parts separate makes the result easier to understand and edit.",
    abstract:
      "Most neural networks store visual information in features that are difficult to inspect. VisualSplit instead represents an image through edges, colour regions, and a brightness histogram. The model learns to reconstruct the image from those three inputs. Because each input has a clear meaning, it can also be changed directly—for example, to adjust colour or lighting—and reused for image restoration and generation.",
    citationText:
      'Qu, Chenyuan, Hao Chen, and Jianbo Jiao. "Exploring Image Representation with Decoupled Classical Visual Descriptors." 36th British Machine Vision Conference (BMVC), 2025.',
    bibtex: `@inproceedings{Qu_2025_BMVC,
  author    = {Chenyuan Qu and Hao Chen and Jianbo Jiao},
  title     = {Exploring Image Representation with Decoupled Classical Visual Descriptors},
  booktitle = {36th British Machine Vision Conference 2025, {BMVC} 2025, Sheffield, UK, November 24-27, 2025},
  publisher = {BMVA},
  year      = {2025},
  url       = {https://bmva-archive.org.uk/bmvc/2025/assets/papers/Paper_873/paper.pdf}
}`,
    doi: "10.48550/arXiv.2510.14536",
    arxivId: "2510.14536",
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://chenyuanqu.com/VisualSplit/",
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://chenyuanqu.com/VisualSplit/docs/papers/VisualSplit_BMVC2025.pdf",
      },
      {
        kind: "supplementary",
        label: "Supplementary",
        href: "https://chenyuanqu.com/VisualSplit/docs/supplementary/VisualSplit_supplementary.pdf",
      },
      {
        kind: "poster",
        label: "Poster",
        href: "https://chenyuanqu.com/VisualSplit/docs/posters/0873_poster.pdf",
      },
      {
        kind: "video",
        label: "Presentation",
        href: "https://chenyuanqu.com/VisualSplit/videos/presentation/0873_presentation_1080p.mp4",
      },
      {
        kind: "arxiv",
        label: "arXiv",
        href: "https://arxiv.org/abs/2510.14536",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/HenryQUQ/VisualSplit",
      },
      {
        kind: "models",
        label: "Models",
        href: "https://huggingface.co/quchenyuan/VisualSplit",
      },
      {
        kind: "project",
        label: "Examples",
        href: "https://chenyuanqu.com/VisualSplit/colour-map-examples/",
      },
    ],
    spotlightMedia: [
      {
        id: "visualsplit-framework",
        kind: "figure",
        label: "Framework overview",
        src: "/images/projects/visualsplit-framework.webp",
        alt: "Framework overview for VisualSplit showing descriptor decomposition and image reconstruction.",
        width: 1200,
        height: 365,
        fit: "contain",
      },
      {
        id: "visualsplit-poster",
        kind: "poster",
        label: "BMVC 2025 poster",
        src: "/images/publications/visualsplit-poster.webp",
        alt: "Poster for the VisualSplit BMVC 2025 paper.",
        width: 1600,
        height: 2260,
        fit: "contain",
      },
      {
        id: "visualsplit-presentation",
        kind: "video",
        label: "BMVC 2025 presentation",
        src: "https://chenyuanqu.com/VisualSplit/videos/presentation/0873_presentation_1080p.mp4",
        posterSrc: "/images/projects/visualsplit-hero.webp",
        alt: "BMVC 2025 presentation video for VisualSplit.",
        width: 1920,
        height: 1080,
        fit: "cover",
      },
    ],
  },
  {
    slug: "diff",
    title: "Diffusion Features to Bridge Domain Gap for Semantic Segmentation",
    authors:
      "Yuxiang Ji, Boyong He, Chenyuan Qu, Zhuoyue Tan, Chuan Qin, Liaoni Wu",
    authorList: [
      "Yuxiang Ji",
      "Boyong He",
      "Chenyuan Qu",
      "Zhuoyue Tan",
      "Chuan Qin",
      "Liaoni Wu",
    ],
    authorLinks: personLinks.filter((person) =>
      ["Yuxiang Ji", "Chenyuan Qu"].includes(person.name),
    ),
    venue:
      "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)",
    shortVenue: "ICASSP",
    year: 2025,
    summary:
      "DIFF uses information already learned by image-generation models to help a segmentation system label images from visual domains it did not see during training.",
    abstract:
      "A model trained to label every pixel in one visual domain can struggle when the style or environment changes. DIFF draws on features from several stages of a diffusion model and combines them into a richer representation. This helps the segmentation model work better on new domains without needing labelled examples from each one.",
    citationText:
      'Ji, Yuxiang, Boyong He, Chenyuan Qu, Zhuoyue Tan, Chuan Qin, and Liaoni Wu. "Diffusion Features to Bridge Domain Gap for Semantic Segmentation." ICASSP 2025, 1-5.',
    bibtex: `@inproceedings{DBLP:conf/icassp/JiHQTQW25,
  author       = {Yuxiang Ji and
                  Boyong He and
                  Chenyuan Qu and
                  Zhuoyue Tan and
                  Chuan Qin and
                  Liaoni Wu},
  title        = {Diffusion Features to Bridge Domain Gap for Semantic Segmentation},
  booktitle    = {2025 {IEEE} International Conference on Acoustics, Speech and Signal Processing, {ICASSP} 2025, Hyderabad, India, April 6-11, 2025},
  pages        = {1--5},
  publisher    = {{IEEE}},
  year         = {2025},
  doi          = {10.1109/ICASSP49660.2025.10888537},
  url          = {https://doi.org/10.1109/ICASSP49660.2025.10888537}
}`,
    doi: "10.1109/ICASSP49660.2025.10888537",
    arxivId: "2406.00777",
    links: [
      {
        kind: "arxiv",
        label: "arXiv",
        href: "https://arxiv.org/abs/2406.00777",
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://ieeexplore.ieee.org/abstract/document/10888537/",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/Yux1angJi/DIFF",
      },
    ],
    spotlightMedia: [
      {
        id: "diff-pipeline",
        kind: "figure",
        label: "Pipeline overview",
        src: "/images/projects/diff-pipeline.webp",
        alt: "Official DIFF pipeline overview showing diffusion feature extraction and fusion for cross-domain semantic segmentation.",
        width: 1800,
        height: 726,
        fit: "contain",
      },
    ],
  },
  {
    slug: "x360",
    title: "360+x: A Panoptic Multi-modal Scene Understanding Dataset",
    authors:
      "Hao Chen, Yuqi Hou, Chenyuan Qu, Irene Testini, Xiaohan Hong, Jianbo Jiao",
    authorList: [
      "Hao Chen",
      "Yuqi Hou",
      "Chenyuan Qu",
      "Irene Testini",
      "Xiaohan Hong",
      "Jianbo Jiao",
    ],
    authorLinks: personLinks.filter((person) =>
      [
        "Hao Chen",
        "Yuqi Hou",
        "Chenyuan Qu",
        "Irene Testini",
        "Xiaohan Hong",
        "Jianbo Jiao",
      ].includes(person.name),
    ),
    venue:
      "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    shortVenue: "CVPR",
    recognition: "Oral paper",
    year: 2024,
    summary:
      "360+x brings together panoramic, front-facing, and first-person views with sound, location, and text, so researchers can study how AI understands the same place from several perspectives.",
    abstract:
      "Many datasets show a scene through one camera. 360+x records the same environment through panoramic, front-facing, and first-person views, then aligns them with sound, location, and written context. This lets researchers test whether a model can connect information across viewpoints and data types in real-world settings.",
    citationText:
      'Chen, Hao, Yuqi Hou, Chenyuan Qu, Irene Testini, Xiaohan Hong, and Jianbo Jiao. "360+x: A Panoptic Multi-modal Scene Understanding Dataset." Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2024.',
    bibtex: `@inproceedings{chen2024x360,
  title  = {360+x: A Panoptic Multi-modal Scene Understanding Dataset},
  author = {Chen, Hao and Hou, Yuqi and Qu, Chenyuan and Testini, Irene and Hong, Xiaohan and Jiao, Jianbo},
  booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  year   = {2024}
}`,
    doi: "10.1109/CVPR52733.2024.01833",
    arxivId: "2404.00989",
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://x360dataset.github.io/",
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding.pdf",
      },
      {
        kind: "supplementary",
        label: "Supplementary",
        href: "https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding_supp.pdf",
      },
      {
        kind: "poster",
        label: "Poster",
        href: "https://x360dataset.github.io/static/pdfs/360_poster.pdf",
      },
      {
        kind: "arxiv",
        label: "arXiv",
        href: "https://arxiv.org/abs/2404.00989",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/x360dataset/x360dataset-kit",
      },
      {
        kind: "dataset",
        label: "Dataset",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_HR",
      },
      {
        kind: "video",
        label: "Video",
        href: "https://x360dataset.github.io/static/videos/teaser_video.mp4",
      },
    ],
    spotlightMedia: [
      {
        id: "x360-overview",
        kind: "figure",
        label: "Dataset overview",
        src: "/images/projects/x360-main.webp",
        alt: "Overview figure for 360+x showing the multimodal scene understanding dataset.",
        width: 1400,
        height: 787,
        fit: "contain",
      },
      {
        id: "x360-poster",
        kind: "poster",
        label: "CVPR 2024 poster",
        src: "/images/publications/x360-poster.webp",
        alt: "Poster for the 360+x CVPR 2024 paper.",
        width: 1600,
        height: 801,
        fit: "contain",
      },
      {
        id: "x360-video",
        kind: "video",
        label: "Project teaser video",
        src: "https://x360dataset.github.io/static/videos/teaser_video.mp4",
        posterSrc: "/images/projects/x360-main.webp",
        alt: "Teaser video for the 360+x dataset project.",
        width: 1920,
        height: 1080,
        fit: "cover",
      },
    ],
  },
  {
    slug: "med",
    title:
      "Multi-view Self-supervised Disentanglement for General Image Denoising",
    authors: "Hao Chen, Chenyuan Qu, Yu Zhang, Chen Chen, Jianbo Jiao",
    authorList: [
      "Hao Chen",
      "Chenyuan Qu",
      "Yu Zhang",
      "Chen Chen",
      "Jianbo Jiao",
    ],
    authorLinks: personLinks.filter((person) =>
      ["Hao Chen", "Chenyuan Qu", "Chen Chen", "Jianbo Jiao"].includes(
        person.name,
      ),
    ),
    venue: "IEEE/CVF International Conference on Computer Vision (ICCV)",
    shortVenue: "ICCV",
    year: 2023,
    summary:
      "MeD learns to remove image noise without needing a clean target image. It compares several noisy versions of the same scene to separate the shared image content from the changing noise.",
    abstract:
      "Training an image-cleaning model usually requires pairs of noisy and clean images, which can be hard to collect. MeD learns from several noisy views of the same scene instead. The visual structure shared by those views is treated as the underlying image, while the differences help the model identify noise. The method was tested on both simulated and real image noise.",
    citationText:
      'Chen, Hao, Chenyuan Qu, Yu Zhang, Chen Chen, and Jianbo Jiao. "Multi-view Self-supervised Disentanglement for General Image Denoising." Proceedings of the IEEE/CVF International Conference on Computer Vision, 2023.',
    bibtex: `@InProceedings{MeD_ICCV23,
  author    = {Chen, Hao and Qu, Chenyuan and Zhang, Yu and Chen, Chen and Jiao, Jianbo},
  title     = {Multi-view Self-supervised Disentanglement for General Image Denoising},
  booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},
  month     = {October},
  year      = {2023}
}`,
    doi: "10.1109/ICCV51070.2023.01128",
    arxivId: "2309.05049",
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://chqwer2.github.io/MeD/",
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Final_Version.pdf",
      },
      {
        kind: "supplementary",
        label: "Supplementary",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Supplymentary_Final_Version.pdf",
      },
      {
        kind: "poster",
        label: "Poster",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV23_MeD_Poster%20(1)_20230930132936.pdf",
      },
      {
        kind: "arxiv",
        label: "arXiv",
        href: "https://arxiv.org/abs/2309.05049",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/chqwer2/Multi-view-Self-supervised-Disentanglement-Denoising",
      },
    ],
    spotlightMedia: [
      {
        id: "med-overview",
        kind: "figure",
        label: "Method overview",
        src: "/images/projects/med-arc.webp",
        alt: "Method overview for MeD showing the multi-view self-supervised denoising framework.",
        width: 1400,
        height: 611,
        fit: "contain",
      },
      {
        id: "med-poster",
        kind: "poster",
        label: "ICCV 2023 poster",
        src: "/images/publications/med-poster.webp",
        alt: "Poster for the MeD ICCV 2023 paper.",
        width: 1600,
        height: 938,
        fit: "contain",
      },
    ],
  },
];

export const selectedPublicationSlugs = ["visualsplit", "x360"];

export const caseStudies: CaseStudy[] = [
  {
    slug: "visualsplit",
    title: "VisualSplit",
    eyebrow: "BMVC 2025 · Image representation",
    thesis:
      "VisualSplit asks whether an AI model can understand and rebuild an image using three simple parts: edges, colour regions, and overall brightness.",
    takeaway:
      "When shape, colour, and brightness stay separate, it becomes easier to understand what the model sees and to change one part without changing everything else.",
    challenge:
      "Modern vision models often mix shape, colour, and lighting into features that people cannot easily inspect or control.",
    contribution:
      "As first author, I developed and evaluated the approach with my co-authors. We tested how the three inputs could rebuild images and support editing, restoration, and image generation.",
    outcome:
      "The work was published at BMVC 2025. The paper, talk, code, model weights, and working examples are all public.",
    year: "2025",
    context: "BMVC · First-author research",
    media: {
      src: "/images/projects/visualsplit-framework.webp",
      alt: "VisualSplit framework decomposing an image into interpretable descriptors before reconstruction.",
      width: 1200,
      height: 365,
      fit: "contain",
      lens: {
        id: "visualsplit",
        label: "VisualSplit figure explorer",
        steps: [
          {
            id: "input",
            label: "Input",
            note: "The original image before it is separated into simpler visual parts.",
            regions: [{ x: 0.8, y: 23.3, width: 7.8, height: 25.5 }],
          },
          {
            id: "edge",
            label: "Edge",
            focusLabel: "Colour and Edge ↔ Edge",
            note: "The model receives a map of the original edges, then uses a Sobel operator to extract edges from the rebuilt image for comparison.",
            regions: [
              { x: 11.9, y: 33, width: 6.8, height: 22.6 },
              { x: 93.6, y: 46.8, width: 5, height: 16.5 },
            ],
          },
          {
            id: "colour",
            label: "Colour",
            focusLabel: "Colour and Edge ↔ Colour",
            note: "Colour regions are kept separate from brightness. Soft K-means extracts matching regions from the rebuilt image for comparison.",
            regions: [
              { x: 11.9, y: 33, width: 6.8, height: 22.6 },
              { x: 93.7, y: 19.7, width: 4.8, height: 15.6 },
            ],
          },
          {
            id: "histogram",
            label: "Intensity",
            focusLabel: "Intensity ↔ Intensity",
            note: "A brightness histogram describes the overall lighting and is matched in the rebuilt image.",
            regions: [
              { x: 11.8, y: 67.8, width: 7.6, height: 12.5 },
              { x: 93.5, y: 76.7, width: 5.2, height: 12.9 },
            ],
          },
          {
            id: "reconstruction",
            label: "Reconstruction",
            note: "The model rebuilds the image using only the separated shape, colour, and brightness information.",
            regions: [{ x: 67.3, y: 24.9, width: 7.8, height: 25.2 }],
          },
        ],
      },
    },
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://chenyuanqu.com/VisualSplit/",
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://chenyuanqu.com/VisualSplit/docs/papers/VisualSplit_BMVC2025.pdf",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/HenryQUQ/VisualSplit",
      },
      {
        kind: "models",
        label: "Models",
        href: "https://huggingface.co/quchenyuan/VisualSplit",
      },
    ],
    accent: "blue",
  },
  {
    slug: "x360",
    title: "360+x",
    eyebrow: "CVPR 2024 · Oral paper",
    thesis:
      "360+x lets researchers study the same scene through several camera views, together with sound, location, and text.",
    takeaway:
      "A scene makes more sense when an AI system can connect what is visible from different viewpoints with what can be heard and where it happened.",
    challenge:
      "Most datasets show a place through one camera or one type of data. That makes it difficult to study how different views and signals relate to one another.",
    contribution:
      "I was one of six authors. We built the dataset, research benchmarks, and publication together as a team.",
    outcome:
      "The paper was selected for an oral presentation at CVPR 2024. The paper, code, dataset, poster, and project video are public.",
    year: "2024",
    context: "CVPR Oral · Collaborative research",
    media: {
      src: "/images/projects/x360-main.webp",
      alt: "360+x overview showing panoramic, frontal, and egocentric views with aligned multimodal signals.",
      width: 1400,
      height: 787,
      fit: "contain",
      lens: {
        id: "x360",
        label: "360+x figure explorer",
        steps: [
          {
            id: "panorama",
            label: "Panorama",
            note: "A 360° image shows the whole scene around the recording point.",
            regions: [{ x: 2.2, y: 1.5, width: 23.5, height: 26 }],
          },
          {
            id: "front-view",
            label: "Front view",
            note: "A normal front-facing view is taken from the wider panorama.",
            regions: [{ x: 1.8, y: 64.5, width: 18.4, height: 22 }],
          },
          {
            id: "egocentric",
            label: "Egocentric",
            note: "A stereo camera records what a person would see from a first-person viewpoint.",
            regions: [{ x: 74.2, y: 1.8, width: 24.2, height: 24 }],
          },
          {
            id: "audio",
            label: "Audio",
            note: "The left and right audio channels show what could be heard at the same moment.",
            regions: [{ x: 41.1, y: 68.2, width: 19.2, height: 22 }],
          },
          {
            id: "binaural-delay",
            label: "Binaural delay",
            note: "The small timing difference between the two ears—known as interaural time delay—helps indicate where a sound came from.",
            regions: [{ x: 74.1, y: 71, width: 24.2, height: 18 }],
          },
        ],
      },
    },
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://x360dataset.github.io/",
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding.pdf",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/x360dataset/x360dataset-kit",
      },
      {
        kind: "dataset",
        label: "Dataset",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_HR",
      },
    ],
    accent: "cyan",
  },
];

export const projects: Project[] = [
  {
    title: "VisualSplit",
    category: "project",
    year: 2025,
    image: "/images/projects/visualsplit-framework.webp",
    imageFit: "contain",
    relatedPublicationSlug: "visualsplit",
    summary:
      "A model that rebuilds images from separate shape, colour, and brightness information, then uses those clear controls for restoration and editing.",
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://chenyuanqu.com/VisualSplit/",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/HenryQUQ/VisualSplit",
      },
      {
        kind: "models",
        label: "Models",
        href: "https://huggingface.co/quchenyuan/VisualSplit",
      },
      {
        kind: "project",
        label: "Examples",
        href: "https://chenyuanqu.com/VisualSplit/colour-map-examples/",
      },
    ],
  },
  {
    title: "360+x",
    category: "dataset",
    year: 2024,
    image: "/images/projects/x360-main.webp",
    imageFit: "contain",
    relatedPublicationSlug: "x360",
    summary:
      "A dataset that records the same scene through panoramic, front-facing, and first-person views, with matching sound, location, and text.",
    links: [
      {
        kind: "dataset",
        label: "Dataset (HR)",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_HR",
      },
      {
        kind: "dataset",
        label: "Dataset (LR)",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_LR",
      },
      {
        kind: "project",
        label: "Project",
        href: "https://x360dataset.github.io/",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/x360dataset/x360dataset-kit",
      },
      {
        kind: "dataset",
        label: "eData DOI",
        href: "https://doi.org/10.25500/edata.bham.00001078",
      },
      {
        kind: "dataset",
        label: "UBIRA eData",
        href: "https://edata.bham.ac.uk/1078/",
      },
      {
        kind: "video",
        label: "Video",
        href: "https://x360dataset.github.io/static/videos/teaser_video.mp4",
      },
      {
        kind: "workshop",
        label: "BinEgo-360",
        href: "https://x360dataset.github.io/BinEgo-360/",
      },
    ],
  },
  {
    title: "MeD",
    category: "project",
    year: 2023,
    image: "/images/projects/med-arc.webp",
    imageFit: "contain",
    relatedPublicationSlug: "med",
    summary:
      "A method that learns to clean an image by comparing several noisy views of the same scene, without requiring a clean training image.",
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://chqwer2.github.io/MeD/",
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/chqwer2/Multi-view-Self-supervised-Disentanglement-Denoising",
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Final_Version.pdf",
      },
    ],
  },
  {
    title: "BinEgo-360",
    category: "dataset",
    year: 2025,
    image: "/images/projects/x360-main.webp",
    imageFit: "cover",
    summary:
      "A research dataset and challenge combining stereo first-person video, 360° views, spatial sound, text, and location information.",
    links: [
      {
        kind: "workshop",
        label: "Challenge",
        href: "https://x360dataset.github.io/BinEgo-360/",
      },
      {
        kind: "github",
        label: "Repository",
        href: "https://github.com/HenryQUQ/BinEgo-360",
      },
    ],
  },
  {
    title: "text-to-art-database",
    category: "dataset",
    year: 2026,
    summary:
      "A privacy-safe text-to-image dataset on Hugging Face, organised so researchers can load and work with the images more easily.",
    links: [
      {
        kind: "dataset",
        label: "Dataset",
        href: "https://huggingface.co/datasets/quchenyuan/text-to-art-database",
      },
    ],
  },
];

export const newsItems: NewsItem[] = [
  {
    date: "2026",
    title: "COMPaD entered first-stage alpha testing",
    detail:
      "We’re trying out the first version: can it make a good-looking poster that people can still edit?",
  },
  {
    date: "5 May 2026",
    title: "Began Help to Grow: Management at BCU",
    detail:
      "I joined a 12-week course at Birmingham City University to learn more about running and growing a business.",
    href: "https://www.bcu.ac.uk/courses/help-to-grow-management-course",
  },
  {
    date: "2025",
    title: "VisualSplit accepted to BMVC 2025",
    detail:
      "The paper, talk, code and examples are now out in the open for others to try.",
    href: "https://chenyuanqu.com/VisualSplit/",
  },
  {
    date: "2025",
    title: "DIFF presented at ICASSP 2025",
    detail:
      "Our team showed how features from image-generation models can help a segmentation system work across different visual domains.",
    href: "https://arxiv.org/abs/2406.00777",
  },
  {
    date: "2024",
    title: "360+x selected for a CVPR 2024 oral presentation",
    detail:
      "The paper, code, research benchmarks, and dataset are available through the public project page.",
    href: "https://x360dataset.github.io/",
  },
  {
    date: "2023",
    title: "Started my PhD in the MI X group",
    detail:
      "I began my part-time PhD in the University of Birmingham's MI X Group, studying how AI can understand images, sound, text, and different viewpoints together.",
    href: "https://mix.jianbojiao.com/people/",
  },
  {
    date: "2023",
    title: "MeD published at ICCV 2023",
    detail:
      "This collaborative project learns to remove image noise by comparing several noisy views, without relying on clean target images.",
    href: "https://chqwer2.github.io/MeD/",
  },
];

export const experience: TimelineGroup[] = [
  {
    track: "academic",
    organisation: "University of Birmingham · MI X Group",
    organisationLinks: organisationLinks.filter((organisation) =>
      ["University of Birmingham", "MI X Group"].includes(organisation.label),
    ),
    period: "Feb 2023 — Present",
    roles: [
      {
        title: "PhD Researcher (part-time)",
        period: "Sep 2023 — Expected 2028",
        detail:
          "I study how AI can understand and create visual content in ways that are easier to interpret, combine, and control.",
      },
      {
        title: "Research Assistant (part-time)",
        period: "Dec 2023 — Present",
        detail:
          "I research how foundation models represent and combine visual ideas. This work includes COMPaD, the joint Allsee–University of Birmingham project for editable poster generation.",
      },
      {
        title: "Research Assistant (part-time)",
        period: "Feb 2023 — Dec 2023",
        detail:
          "I worked with domain researchers to apply machine learning to hydrology while keeping the results understandable to scientific users.",
      },
    ],
  },
  {
    track: "industry",
    organisation: "Allsee · Vieunite",
    organisationLinks: organisationLinks.filter((organisation) =>
      ["Allsee", "Vieunite"].includes(organisation.label),
    ),
    period: "Sep 2022 — Present",
    roles: [
      {
        title: "Head of Technologies",
        period: "Dec 2024 — Present",
        detail:
          "I lead the company's technology work while continuing to build software myself. My focus includes customer platforms, device software, the ERP, and practical AI tools for everyday work.",
        highlights: [
          "Led Nexus from customer visits and early design through launch, while writing most of its Python/FastAPI backend and contributing to the Java device software.",
          "Led the replacement of the company's ERP and built an AI layer that lets staff complete approved tasks in everyday language.",
          "Started and lead COMPaD, a joint industry–university project for creating editable commercial posters with AI.",
          "Work directly with customers, sales, operations, and engineers to decide what should be built and to explain the trade-offs clearly.",
        ],
      },
      {
        title: "Full-stack Engineer",
        period: "Dec 2023 — Dec 2024",
        detail:
          "I worked across the customer platform, ERP, cloud services, and device software, helping replace a collection of hardware-specific systems with one shared product.",
        highlights: [
          "Helped turn around ten separate platform versions into one codebase that could still work with the existing device range.",
          "Built core parts of the replacement ERP and connected it with the CMS, Salesforce, and QuickBooks.",
          "Worked across the user interface, online services, software releases, and device constraints instead of treating them as separate problems.",
        ],
      },
      {
        title: "Algorithm Engineer",
        period: "Sep 2022 — Dec 2023",
        detail:
          "I built backend services, recommendation features, and generative-AI tools for Allsee and Vieunite, including features used in the Vieutopia AI art product.",
        highlights: [
          "Connected AI features to the online services and day-to-day processes needed by the product.",
          "Built recommendation features for content and product discovery.",
          "Developed image-generation features that people could use through Vieutopia.",
        ],
      },
    ],
  },
  {
    track: "industry",
    organisation: "AsiaInfo Software Co. Ltd",
    organisationLinks: organisationLinks.filter(
      (organisation) => organisation.label === "AsiaInfo Software Co. Ltd",
    ),
    period: "Jul 2020 — Sep 2020",
    roles: [
      {
        title: "Algorithm Engineer Intern",
        period: "Jul 2020 — Sep 2020",
        detail:
          "I built and improved machine-learning features for a virtual customer-service presenter designed to run on mobile devices.",
      },
    ],
  },
];

export const education: TimelineItem[] = [
  {
    title: "Master's in Artificial Intelligence and Machine Learning",
    organisation: "University of Birmingham",
    organisationLinks: organisationLinks.filter(
      (organisation) => organisation.label === "University of Birmingham",
    ),
    period: "2021 — 2022",
    detail:
      "Graduated with Distinction, then continued at Birmingham for research work and a part-time PhD.",
  },
  {
    title: "BSc in Physics",
    organisation: "University of Southampton",
    organisationLinks: organisationLinks.filter(
      (organisation) => organisation.label === "University of Southampton",
    ),
    period: "2018 — 2021",
    detail:
      "Physics gave me a strong base in mathematics, modelling, and experimental thinking that I still use in engineering and research.",
  },
];
