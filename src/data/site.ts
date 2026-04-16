export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type PublicationLink = LinkItem;

export type Publication = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  shortVenue: string;
  year: number;
  summary: string;
  links: PublicationLink[];
};

export type Project = {
  title: string;
  year: number;
  summary: string;
  image?: string;
  links: LinkItem[];
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
  period: string;
  detail: string;
};

export const sections = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "selected-publications", label: "Selected Work" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "news", label: "News" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

export const profile = {
  name: "Chenyuan Qu",
  role: "PhD Student in Computer Science",
  affiliation: "University of Birmingham · MI X Group",
  bio: "His research sits at the intersection of computer vision, multimodal learning, and generative AI, with recent work spanning interpretable image representations, multimodal scene understanding, and creative systems.",
  email: "cxq134@student.bham.ac.uk",
  heroImage: "/images/portrait.jpg",
  links: [
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?hl=en&user=MrHJXYcAAAAJ"
    },
    { label: "GitHub", href: "https://github.com/HenryQUQ" },
    {
      label: "LinkedIn",
      href: "https://uk.linkedin.com/in/henry-qu-436621195"
    },
    { label: "ORCID", href: "https://orcid.org/0009-0000-4814-2022" },
    {
      label: "Email",
      href: "mailto:cxq134@student.bham.ac.uk",
      external: false
    }
  ]
};

export const researchInterests = [
  {
    title: "Computer Vision",
    detail:
      "Learning interpretable representations and robust visual understanding from images, scenes, and multimodal observations."
  },
  {
    title: "Multimodal Learning",
    detail:
      "Studying how visual, spatial, audio, textual, and viewpoint-specific signals can be fused for richer scene understanding."
  },
  {
    title: "Generative AI",
    detail:
      "Exploring controllable generative systems that connect representation learning with editing, restoration, and creative workflows."
  },
  {
    title: "AI for Science",
    detail:
      "Applying machine learning methods in scientifically grounded settings where interpretability and structure matter."
  }
];

export const publications: Publication[] = [
  {
    slug: "visualsplit",
    title: "Exploring Image Representation with Decoupled Classical Visual Descriptors",
    authors: "Chenyuan Qu, Hao Chen, Jianbo Jiao",
    venue: "British Machine Vision Conference (BMVC)",
    shortVenue: "BMVC",
    year: 2025,
    summary:
      "VisualSplit revisits classical visual descriptors as controllable, human-interpretable ingredients for representation learning and downstream image generation or editing.",
    links: [
      {
        label: "Project",
        href: "https://chenyuanqu.com/VisualSplit/"
      },
      {
        label: "Paper",
        href: "https://chenyuanqu.com/VisualSplit/docs/papers/VisualSplit_BMVC2025.pdf"
      },
      {
        label: "Supplementary",
        href: "https://chenyuanqu.com/VisualSplit/docs/supplementary/VisualSplit_supplementary.pdf"
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2510.14536"
      },
      {
        label: "Code",
        href: "https://github.com/HenryQUQ/VisualSplit"
      },
      {
        label: "Models",
        href: "https://huggingface.co/quchenyuan/VisualSplit"
      }
    ]
  },
  {
    slug: "diff",
    title: "Diffusion Features to Bridge Domain Gap for Semantic Segmentation",
    authors: "Yuxiang Ji, Boyong He, Chenyuan Qu, Zhuoyue Tan, Chuan Qin, Liaoni Wu",
    venue:
      "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)",
    shortVenue: "ICASSP",
    year: 2025,
    summary:
      "DIFF leverages diffusion-model features to improve cross-domain semantic segmentation by extracting and fusing semantically rich representations across the diffusion process.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2406.00777"
      },
      {
        label: "IEEE",
        href: "https://ieeexplore.ieee.org/abstract/document/10888537/"
      },
      {
        label: "Code",
        href: "https://github.com/Yux1angJi/DIFF"
      }
    ]
  },
  {
    slug: "x360",
    title: "360+x: A Panoptic Multi-modal Scene Understanding Dataset",
    authors: "Hao Chen, Yuqi Hou, Chenyuan Qu, Irene Testini, Xiaohan Hong, Jianbo Jiao",
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    shortVenue: "CVPR",
    year: 2024,
    summary:
      "A panoptic multimodal dataset that combines panoramic, frontal, and egocentric viewpoints with audio, location, and textual signals for richer scene understanding benchmarks.",
    links: [
      {
        label: "Project",
        href: "https://x360dataset.github.io/"
      },
      {
        label: "Paper",
        href: "https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding.pdf"
      },
      {
        label: "Supplementary",
        href: "https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding_supp.pdf"
      },
      {
        label: "Poster",
        href: "https://x360dataset.github.io/static/pdfs/360_poster.pdf"
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2404.00989"
      },
      {
        label: "Code",
        href: "https://github.com/x360dataset/x360dataset-kit"
      },
      {
        label: "Dataset",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_HR"
      }
    ]
  },
  {
    slug: "med",
    title: "Multi-view Self-supervised Disentanglement for General Image Denoising",
    authors: "Hao Chen, Chenyuan Qu, Yu Zhang, Chen Chen, Jianbo Jiao",
    venue: "IEEE/CVF International Conference on Computer Vision (ICCV)",
    shortVenue: "ICCV",
    year: 2023,
    summary:
      "A self-supervised denoising framework that disentangles clean image structure from corruption by comparing multiple noisy views of the same latent scene.",
    links: [
      {
        label: "Project",
        href: "https://chqwer2.github.io/MeD/"
      },
      {
        label: "Paper",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Final_Version.pdf"
      },
      {
        label: "Supplementary",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Supplymentary_Final_Version.pdf"
      },
      {
        label: "Poster",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV23_MeD_Poster%20(1)_20230930132936.pdf"
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2309.05049"
      },
      {
        label: "Code",
        href: "https://github.com/chqwer2/Multi-view-Self-supervised-Disentanglement-Denoising"
      }
    ]
  }
];

export const selectedPublicationSlugs = ["visualsplit", "diff", "x360"];

export const projects: Project[] = [
  {
    title: "VisualSplit",
    year: 2025,
    image: "/images/projects/visualsplit-framework.png",
    summary:
      "A research project on interpretable image representation that decomposes visual structure into controllable classical descriptors for learning, restoration, and editing.",
    links: [
      { label: "Project", href: "https://chenyuanqu.com/VisualSplit/" },
      { label: "Code", href: "https://github.com/HenryQUQ/VisualSplit" },
      { label: "Models", href: "https://huggingface.co/quchenyuan/VisualSplit" }
    ]
  },
  {
    title: "360+x",
    year: 2024,
    image: "/images/projects/x360-main.png",
    summary:
      "A multimodal dataset and benchmark for scene understanding across panoramic, frontal, and egocentric perspectives, with complementary sensory signals and tasks.",
    links: [
      { label: "Project", href: "https://x360dataset.github.io/" },
      {
        label: "Dataset",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_HR"
      },
      {
        label: "Code",
        href: "https://github.com/x360dataset/x360dataset-kit"
      },
      {
        label: "Workshop",
        href: "https://x360dataset.github.io/BinEgo-360/"
      }
    ]
  },
  {
    title: "MeD",
    year: 2023,
    image: "/images/projects/med-arc.png",
    summary:
      "A multi-view self-supervised denoising framework that learns latent clean structure by contrasting different noisy observations of the same image.",
    links: [
      { label: "Project", href: "https://chqwer2.github.io/MeD/" },
      {
        label: "Code",
        href: "https://github.com/chqwer2/Multi-view-Self-supervised-Disentanglement-Denoising"
      },
      {
        label: "Paper",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Final_Version.pdf"
      }
    ]
  },
  {
    title: "BinEgo-360",
    year: 2025,
    summary:
      "A workshop and challenge surface built around egocentric and panoramic multimodal understanding, extending the 360+x research ecosystem.",
    links: [
      {
        label: "Workshop",
        href: "https://x360dataset.github.io/BinEgo-360/"
      },
      {
        label: "Repository",
        href: "https://github.com/HenryQUQ/BinEgo-360"
      }
    ]
  }
];

export const newsItems: NewsItem[] = [
  {
    date: "2025",
    title: "VisualSplit released as BMVC 2025 work",
    detail:
      "The VisualSplit project page, paper, supplementary material, and code were published around a new line of work on interpretable image representations.",
    href: "https://chenyuanqu.com/VisualSplit/"
  },
  {
    date: "2025",
    title: "DIFF appeared at ICASSP 2025",
    detail:
      "Diffusion Features to Bridge Domain Gap for Semantic Segmentation is listed in Google Scholar as an ICASSP 2025 publication.",
    href: "https://arxiv.org/abs/2406.00777"
  },
  {
    date: "2024",
    title: "360+x published at CVPR 2024",
    detail:
      "The 360+x dataset paper and supporting materials were released together with code, datasets, and benchmark resources.",
    href: "https://x360dataset.github.io/"
  },
  {
    date: "2023",
    title: "Started PhD study in the MI X group",
    detail:
      "The MI X group page lists Chenyuan Qu as a PhD student from 2023, working on computer vision and multimodal learning.",
    href: "https://mix.jianbojiao.com/people/"
  },
  {
    date: "2023",
    title: "MeD published at ICCV 2023",
    detail:
      "Multi-view Self-supervised Disentanglement for General Image Denoising became the earliest paper in the current public publication record.",
    href: "https://chqwer2.github.io/MeD/"
  }
];

export const experience: TimelineItem[] = [
  {
    title: "PhD Student",
    organisation: "University of Birmingham · MI X Group",
    period: "2023 — Present",
    detail:
      "Doctoral research in computer vision, multimodal learning, and generative AI within the School of Computer Science."
  },
  {
    title: "Full-Stack Engineer (Machine Learning)",
    organisation: "Allsee Technologies Limited",
    period: "Aug 2022 — Present",
    detail:
      "Worked on recommendation, search, generative image workflows, and production-facing machine learning systems."
  },
  {
    title: "Research Assistant",
    organisation: "University of Birmingham",
    period: "Feb 2023 — Present",
    detail:
      "Contributed to machine-learning research for interpretable hydrological modelling and scientific analysis."
  },
  {
    title: "Algorithm Engineer Intern",
    organisation: "AsiaInfo Software Co. Ltd",
    period: "Jul 2020 — Sep 2020",
    detail:
      "Built and optimised machine-learning components for a visual customer-service anchor deployed in a mobile setting."
  }
];

export const education: TimelineItem[] = [
  {
    title: "Master's Study",
    organisation: "University of Birmingham",
    period: "2021 — 2022",
    detail:
      "Completed postgraduate study prior to doctoral research; public sources differ on the exact programme title."
  },
  {
    title: "BSc in Physics",
    organisation: "University of Southampton",
    period: "2018 — 2021",
    detail:
      "Undergraduate training in physics, forming an analytical foundation for later work in machine learning and computer vision."
  }
];
