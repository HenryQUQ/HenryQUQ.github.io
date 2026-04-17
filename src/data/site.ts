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

export type Publication = {
  slug: string;
  title: string;
  authors: string;
  authorList: string[];
  venue: string;
  shortVenue: string;
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
  highlights?: string[];
};

export type Profile = {
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  email: string;
  contactEmails: ContactEmail[];
  heroImage: string;
  heroBackgroundImageDesktop: string;
  heroBackgroundImageMobile: string;
  links: LinkItem[];
};

export const sections = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "selected-publications", label: "Selected Publications" },
  { id: "publications", label: "Publications & Datasets" },
  { id: "news", label: "News" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

export const profile: Profile = {
  name: "Chenyuan Qu",
  role: "Tech Lead in AI/ML · PhD Student",
  affiliation: "Allsee · Vieunite · University of Birmingham",
  bio: "I work across research and production AI systems, combining doctoral work in computer vision and multimodal learning with applied machine-learning systems for search, recommendation, and generative workflows.",
  email: "cxq134@student.bham.ac.uk",
  contactEmails: [
    {
      label: "Allsee",
      address: "henry.qu@allsee-tech.com",
      href: "mailto:henry.qu@allsee-tech.com"
    },
    {
      label: "Vieunite",
      address: "henry.qu@vieunite.com",
      href: "mailto:henry.qu@vieunite.com"
    },
    {
      label: "University of Birmingham",
      address: "cxq134@student.bham.ac.uk",
      href: "mailto:cxq134@student.bham.ac.uk"
    },
    {
      label: "Personal",
      address: "Chenyuan.Qu@outlook.com",
      href: "mailto:Chenyuan.Qu@outlook.com"
    }
  ],
  heroImage: "/images/portrait.webp",
  heroBackgroundImageDesktop: "/images/hero/home-hero-desktop.webp",
  heroBackgroundImageMobile: "/images/hero/home-hero-mobile.webp",
  links: [
    {
      kind: "scholar",
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?hl=en&user=MrHJXYcAAAAJ"
    },
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/HenryQUQ"
    },
    {
      kind: "huggingface",
      label: "Hugging Face",
      href: "https://huggingface.co/quchenyuan"
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://uk.linkedin.com/in/henry-qu-436621195"
    },
    {
      kind: "orcid",
      label: "ORCID",
      href: "https://orcid.org/0009-0000-4814-2022"
    },
    {
      kind: "email",
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
    authorList: ["Chenyuan Qu", "Hao Chen", "Jianbo Jiao"],
    venue: "British Machine Vision Conference (BMVC)",
    shortVenue: "BMVC",
    year: 2025,
    summary:
      "VisualSplit revisits classical visual descriptors as controllable, human-interpretable ingredients for representation learning and downstream image generation or editing.",
    abstract:
      "VisualSplit studies whether classical visual descriptors can serve as explicit, controllable ingredients for image representation learning. The framework decouples edge structure, colour regions, and luminance statistics, then learns to reconstruct and manipulate images from those interpretable cues for restoration, generation, and editing.",
    citationText:
      "Qu, Chenyuan, Hao Chen, and Jianbo Jiao. \"Exploring Image Representation with Decoupled Classical Visual Descriptors.\" 36th British Machine Vision Conference (BMVC), 2025.",
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
        href: "https://chenyuanqu.com/VisualSplit/"
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://chenyuanqu.com/VisualSplit/docs/papers/VisualSplit_BMVC2025.pdf"
      },
      {
        kind: "supplementary",
        label: "Supplementary",
        href: "https://chenyuanqu.com/VisualSplit/docs/supplementary/VisualSplit_supplementary.pdf"
      },
      {
        kind: "arxiv",
        label: "arXiv",
        href: "https://arxiv.org/abs/2510.14536"
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/HenryQUQ/VisualSplit"
      },
      {
        kind: "models",
        label: "Models",
        href: "https://huggingface.co/quchenyuan/VisualSplit"
      }
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
        fit: "contain"
      }
    ]
  },
  {
    slug: "diff",
    title: "Diffusion Features to Bridge Domain Gap for Semantic Segmentation",
    authors: "Yuxiang Ji, Boyong He, Chenyuan Qu, Zhuoyue Tan, Chuan Qin, Liaoni Wu",
    authorList: [
      "Yuxiang Ji",
      "Boyong He",
      "Chenyuan Qu",
      "Zhuoyue Tan",
      "Chuan Qin",
      "Liaoni Wu"
    ],
    venue:
      "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)",
    shortVenue: "ICASSP",
    year: 2025,
    summary:
      "DIFF leverages diffusion-model features to improve cross-domain semantic segmentation by extracting and fusing semantically rich representations across the diffusion process.",
    abstract:
      "DIFF uses diffusion-model features as a representation backbone for cross-domain semantic segmentation. By extracting and fusing semantic information across the diffusion process, the method improves generalisation to unseen domains without relying on target-domain supervision.",
    citationText:
      "Ji, Yuxiang, Boyong He, Chenyuan Qu, Zhuoyue Tan, Chuan Qin, and Liaoni Wu. \"Diffusion Features to Bridge Domain Gap for Semantic Segmentation.\" ICASSP 2025, 1-5.",
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
        href: "https://arxiv.org/abs/2406.00777"
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://ieeexplore.ieee.org/abstract/document/10888537/"
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/Yux1angJi/DIFF"
      }
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
        fit: "contain"
      }
    ]
  },
  {
    slug: "x360",
    title: "360+x: A Panoptic Multi-modal Scene Understanding Dataset",
    authors: "Hao Chen, Yuqi Hou, Chenyuan Qu, Irene Testini, Xiaohan Hong, Jianbo Jiao",
    authorList: [
      "Hao Chen",
      "Yuqi Hou",
      "Chenyuan Qu",
      "Irene Testini",
      "Xiaohan Hong",
      "Jianbo Jiao"
    ],
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    shortVenue: "CVPR",
    year: 2024,
    summary:
      "A panoptic multimodal dataset that combines panoramic, frontal, and egocentric viewpoints with audio, location, and textual signals for richer scene understanding benchmarks.",
    abstract:
      "360+x introduces a multimodal scene-understanding dataset that combines panoramic, frontal, and egocentric views together with audio, location, and textual context. It is designed to support richer benchmarks for scene understanding across viewpoints, modalities, and real-world environments.",
    citationText:
      "Chen, Hao, Yuqi Hou, Chenyuan Qu, Irene Testini, Xiaohan Hong, and Jianbo Jiao. \"360+x: A Panoptic Multi-modal Scene Understanding Dataset.\" Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2024.",
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
        href: "https://x360dataset.github.io/"
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding.pdf"
      },
      {
        kind: "supplementary",
        label: "Supplementary",
        href: "https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding_supp.pdf"
      },
      {
        kind: "poster",
        label: "Poster",
        href: "https://x360dataset.github.io/static/pdfs/360_poster.pdf"
      },
      {
        kind: "arxiv",
        label: "arXiv",
        href: "https://arxiv.org/abs/2404.00989"
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/x360dataset/x360dataset-kit"
      },
      {
        kind: "dataset",
        label: "Dataset",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_HR"
      },
      {
        kind: "video",
        label: "Video",
        href: "https://x360dataset.github.io/static/videos/teaser_video.mp4"
      }
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
        fit: "contain"
      },
      {
        id: "x360-poster",
        kind: "poster",
        label: "CVPR 2024 poster",
        src: "/images/publications/x360-poster.webp",
        alt: "Poster for the 360+x CVPR 2024 paper.",
        width: 1600,
        height: 801,
        fit: "contain"
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
        fit: "cover"
      }
    ]
  },
  {
    slug: "med",
    title: "Multi-view Self-supervised Disentanglement for General Image Denoising",
    authors: "Hao Chen, Chenyuan Qu, Yu Zhang, Chen Chen, Jianbo Jiao",
    authorList: [
      "Hao Chen",
      "Chenyuan Qu",
      "Yu Zhang",
      "Chen Chen",
      "Jianbo Jiao"
    ],
    venue: "IEEE/CVF International Conference on Computer Vision (ICCV)",
    shortVenue: "ICCV",
    year: 2023,
    summary:
      "A self-supervised denoising framework that disentangles clean image structure from corruption by comparing multiple noisy views of the same latent scene.",
    abstract:
      "MeD approaches image denoising through self-supervised disentanglement across multiple corrupted views of the same scene. Instead of learning from clean targets, it separates shared clean structure from noise and shows strong performance on both synthetic and real-noise settings.",
    citationText:
      "Chen, Hao, Chenyuan Qu, Yu Zhang, Chen Chen, and Jianbo Jiao. \"Multi-view Self-supervised Disentanglement for General Image Denoising.\" Proceedings of the IEEE/CVF International Conference on Computer Vision, 2023.",
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
        href: "https://chqwer2.github.io/MeD/"
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Final_Version.pdf"
      },
      {
        kind: "supplementary",
        label: "Supplementary",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Supplymentary_Final_Version.pdf"
      },
      {
        kind: "poster",
        label: "Poster",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV23_MeD_Poster%20(1)_20230930132936.pdf"
      },
      {
        kind: "arxiv",
        label: "arXiv",
        href: "https://arxiv.org/abs/2309.05049"
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/chqwer2/Multi-view-Self-supervised-Disentanglement-Denoising"
      }
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
        fit: "contain"
      },
      {
        id: "med-poster",
        kind: "poster",
        label: "ICCV 2023 poster",
        src: "/images/publications/med-poster.webp",
        alt: "Poster for the MeD ICCV 2023 paper.",
        width: 1600,
        height: 938,
        fit: "contain"
      }
    ]
  }
];

export const selectedPublicationSlugs = ["visualsplit", "x360"];

export const projects: Project[] = [
  {
    title: "VisualSplit",
    category: "project",
    year: 2025,
    image: "/images/projects/visualsplit-framework.webp",
    imageFit: "contain",
    relatedPublicationSlug: "visualsplit",
    summary:
      "A research project on interpretable image representation that decomposes visual structure into controllable classical descriptors for learning, restoration, and editing.",
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://chenyuanqu.com/VisualSplit/"
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/HenryQUQ/VisualSplit"
      },
      {
        kind: "models",
        label: "Models",
        href: "https://huggingface.co/quchenyuan/VisualSplit"
      }
    ]
  },
  {
    title: "360+x",
    category: "dataset",
    year: 2024,
    image: "/images/projects/x360-main.webp",
    imageFit: "contain",
    relatedPublicationSlug: "x360",
    summary:
      "A multimodal scene-understanding dataset spanning panoramic, frontal, and egocentric video, with aligned audio, location, and textual signals for benchmarking perception across viewpoints.",
    links: [
      {
        kind: "dataset",
        label: "Dataset (HR)",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_HR"
      },
      {
        kind: "dataset",
        label: "Dataset (LR)",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_LR"
      },
      {
        kind: "project",
        label: "Project",
        href: "https://x360dataset.github.io/"
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/x360dataset/x360dataset-kit"
      },
      {
        kind: "video",
        label: "Video",
        href: "https://x360dataset.github.io/static/videos/teaser_video.mp4"
      },
      {
        kind: "workshop",
        label: "BinEgo-360",
        href: "https://x360dataset.github.io/BinEgo-360/"
      }
    ]
  },
  {
    title: "MeD",
    category: "project",
    year: 2023,
    image: "/images/projects/med-arc.webp",
    imageFit: "contain",
    relatedPublicationSlug: "med",
    summary:
      "A multi-view self-supervised denoising framework that learns latent clean structure by contrasting different noisy observations of the same image.",
    links: [
      {
        kind: "project",
        label: "Project",
        href: "https://chqwer2.github.io/MeD/"
      },
      {
        kind: "code",
        label: "Code",
        href: "https://github.com/chqwer2/Multi-view-Self-supervised-Disentanglement-Denoising"
      },
      {
        kind: "paper",
        label: "Paper",
        href: "https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Final_Version.pdf"
      }
    ]
  },
  {
    title: "BinEgo-360",
    category: "dataset",
    year: 2025,
    image: "/images/projects/x360-main.webp",
    imageFit: "cover",
    summary:
      "A binocular egocentric and 360° panoramic multimodal dataset and challenge surface for scene understanding, aligned with spatial audio, text, and geo-metadata.",
    links: [
      {
        kind: "workshop",
        label: "Challenge",
        href: "https://x360dataset.github.io/BinEgo-360/"
      },
      {
        kind: "github",
        label: "Repository",
        href: "https://github.com/HenryQUQ/BinEgo-360"
      }
    ]
  },
  {
    title: "text-to-art-database",
    category: "dataset",
    year: 2026,
    summary:
      "A privacy-safe text-to-image dataset released on Hugging Face, repacked into Parquet shards with embedded image bytes and organised into samples and iterations splits.",
    links: [
      {
        kind: "dataset",
        label: "Dataset",
        href: "https://huggingface.co/datasets/quchenyuan/text-to-art-database"
      }
    ]
  }
];

export const newsItems: NewsItem[] = [
  {
    date: "2025",
    title: "VisualSplit accepted to BMVC 2025",
    detail:
      "Project page, paper, supplementary material, code, and model weights are publicly available.",
    href: "https://chenyuanqu.com/VisualSplit/"
  },
  {
    date: "2025",
    title: "DIFF presented at ICASSP 2025",
    detail:
      "Collaborative work on diffusion features for cross-domain semantic segmentation.",
    href: "https://arxiv.org/abs/2406.00777"
  },
  {
    date: "2024",
    title: "360+x published at CVPR 2024",
    detail:
      "Dataset paper with accompanying benchmark resources, code, and public dataset access.",
    href: "https://x360dataset.github.io/"
  },
  {
    date: "2023",
    title: "Started my PhD in the MI X group",
    detail:
      "I began doctoral research in 2023 on computer vision and multimodal learning in the MI X Group.",
    href: "https://mix.jianbojiao.com/people/"
  },
  {
    date: "2023",
    title: "MeD published at ICCV 2023",
    detail:
      "An early project on self-supervised image denoising using multi-view disentanglement.",
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
    title: "Tech Lead in AI/ML",
    organisation: "Allsee · Vieunite",
    period: "Aug 2022 — Present",
    detail:
      "Lead applied AI/ML work across production systems for product discovery, creative generation, and internal tooling.",
    highlights: [
      "Build and ship machine-learning systems for recommendation, search, and multimodal product understanding.",
      "Develop generative workflows for creative and merchandising use cases across the Vieunite stack.",
      "Work across model development and product delivery, connecting ML pipelines with full-stack engineering."
    ]
  },
  {
    title: "Research Assistant",
    organisation: "University of Birmingham",
    period: "Feb 2023 — Present",
    detail:
      "Research on interpretable hydrological modelling and machine-learning methods for scientific analysis."
  },
  {
    title: "Algorithm Engineer Intern",
    organisation: "AsiaInfo Software Co. Ltd",
    period: "Jul 2020 — Sep 2020",
    detail:
      "Developed and optimised machine-learning components for a visual customer-service anchor in a mobile deployment setting."
  }
];

export const education: TimelineItem[] = [
  {
    title: "Master's Study",
    organisation: "University of Birmingham",
    period: "2021 — 2022",
    detail:
      "Postgraduate study completed at Birmingham before beginning doctoral research."
  },
  {
    title: "BSc in Physics",
    organisation: "University of Southampton",
    period: "2018 — 2021",
    detail:
      "Undergraduate training in physics, which continues to shape how I think about machine learning and computer vision."
  }
];
