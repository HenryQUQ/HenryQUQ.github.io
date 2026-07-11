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
  unitLabel: string;
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

export const sections = [
  { id: "work", label: "Research" },
  { id: "research", label: "Publications" },
  { id: "journey", label: "Experience" },
  { id: "updates", label: "News" },
  { id: "contact", label: "Contact" }
];

export const profile: Profile = {
  name: "Chenyuan Qu",
  role: "PhD Student · Head of Technologies",
  affiliation: "University of Birmingham · Allsee · Vieunite",
  positioning: "Computer vision, multimodal learning, and software systems.",
  shortBio:
    "I am a PhD student at the University of Birmingham and Head of Technologies at Allsee and Vieunite.",
  bio: "My research focuses on computer vision, multimodal learning, and generative models. Alongside my doctoral work, I work on backend services, internal software, and applied machine-learning systems at Allsee and Vieunite.",
  email: "Chenyuan.Qu@outlook.com",
  primaryContact: {
    label: "Personal",
    address: "Chenyuan.Qu@outlook.com",
    href: "mailto:Chenyuan.Qu@outlook.com"
  },
  contactEmails: [
    {
      label: "Personal",
      address: "Chenyuan.Qu@outlook.com",
      href: "mailto:Chenyuan.Qu@outlook.com"
    },
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
      href: "mailto:Chenyuan.Qu@outlook.com",
      external: false
    }
  ]
};

export const personLinks: PersonLink[] = [
  {
    name: "Chenyuan Qu",
    href: "https://chenyuanqu.com/"
  },
  {
    name: "Hao Chen",
    href: "https://h-chen.com/"
  },
  {
    name: "Jianbo Jiao",
    href: "https://jianbojiao.com/"
  },
  {
    name: "Yuxiang Ji",
    href: "https://yuxiang-ji.com/"
  },
  {
    name: "Yuqi Hou",
    href: "https://openreview.net/profile?id=~Yuqi_Hou2"
  },
  {
    name: "Irene Testini",
    href: "https://www.chia.cam.ac.uk/team/irene-testini"
  },
  {
    name: "Xiaohan Hong",
    href: "https://hannh5.github.io/"
  },
  {
    name: "Chen Chen",
    href: "https://www.crcv.ucf.edu/chenchen/"
  }
];

export const organisationLinks: OrganisationLink[] = [
  {
    label: "Allsee",
    href: "https://www.allsee-tech.com/"
  },
  {
    label: "Vieunite",
    href: "https://vieunite.com/"
  },
  {
    label: "University of Birmingham",
    href: "https://www.birmingham.ac.uk/"
  },
  {
    label: "MI X Group",
    href: "https://mix.jianbojiao.com/people/"
  },
  {
    label: "University of Southampton",
    href: "https://www.southampton.ac.uk/"
  },
  {
    label: "AsiaInfo Software Co. Ltd",
    href: "https://www.asiainfo.com/en_us/about.html"
  }
];

export const researchThreads: ResearchThread[] = [
  {
    slug: "interpretable-representations",
    index: "01",
    title: "Interpretable image representations",
    detail:
      "Separating visual information into structures such as edges, colour regions, and intensity.",
    study: { slug: "visualsplit", label: "VisualSplit" },
    publication: { slug: "visualsplit", label: "BMVC 2025" },
    inferFromTarget: true
  },
  {
    slug: "multimodal-scenes",
    index: "02",
    title: "Multimodal scene understanding",
    detail:
      "Learning across viewpoints, images, audio, text, location, and spatial context.",
    study: { slug: "x360", label: "360+x" },
    publication: { slug: "x360", label: "CVPR 2024 Oral" },
    inferFromTarget: true
  },
  {
    slug: "generative-vision",
    index: "03",
    title: "Generative computer vision",
    detail:
      "Using generative models for representation learning, reconstruction, restoration, and editing.",
    study: { slug: "visualsplit", label: "VisualSplit" },
    publication: { slug: "visualsplit", label: "BMVC 2025" }
  }
];

export const publications: Publication[] = [
  {
    slug: "visualsplit",
    title: "Exploring Image Representation with Decoupled Classical Visual Descriptors",
    authors: "Chenyuan Qu, Hao Chen, Jianbo Jiao",
    authorList: ["Chenyuan Qu", "Hao Chen", "Jianbo Jiao"],
    authorLinks: personLinks.filter((person) =>
      ["Chenyuan Qu", "Hao Chen", "Jianbo Jiao"].includes(person.name)
    ),
    venue: "British Machine Vision Conference (BMVC)",
    shortVenue: "BMVC",
    year: 2025,
    summary:
      "VisualSplit learns image representations from decoupled edges, colour segmentation, and grey-level histograms, enabling descriptor-to-image reconstruction, controllable editing, and diffusion-based restoration.",
    abstract:
      "VisualSplit decomposes each image into three classical descriptors: edges for geometry, segmented colours for regional chroma, and a grey-level histogram for global illumination. It then learns to reconstruct images from those cues alone, yielding an explicitly interpretable representation that supports descriptor-level illumination and colour editing while transferring naturally to restoration and descriptor-guided image generation with diffusion models.",
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
        kind: "poster",
        label: "Poster",
        href: "https://chenyuanqu.com/VisualSplit/docs/posters/0873_poster.pdf"
      },
      {
        kind: "video",
        label: "Presentation",
        href: "https://chenyuanqu.com/VisualSplit/videos/presentation/0873_presentation_1080p.mp4"
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
      },
      {
        kind: "project",
        label: "Examples",
        href: "https://chenyuanqu.com/VisualSplit/colour-map-examples/"
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
      },
      {
        id: "visualsplit-poster",
        kind: "poster",
        label: "BMVC 2025 poster",
        src: "/images/publications/visualsplit-poster.webp",
        alt: "Poster for the VisualSplit BMVC 2025 paper.",
        width: 1600,
        height: 2260,
        fit: "contain"
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
        fit: "cover"
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
    authorLinks: personLinks.filter((person) =>
      ["Yuxiang Ji", "Chenyuan Qu"].includes(person.name)
    ),
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
    authorLinks: personLinks.filter((person) =>
      [
        "Hao Chen",
        "Yuqi Hou",
        "Chenyuan Qu",
        "Irene Testini",
        "Xiaohan Hong",
        "Jianbo Jiao"
      ].includes(person.name)
    ),
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    shortVenue: "CVPR",
    recognition: "Oral paper",
    year: 2024,
    summary:
      "A CVPR 2024 oral paper introducing a panoptic multimodal dataset that combines panoramic, frontal, and egocentric viewpoints with audio, location, and textual signals.",
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
    authorLinks: personLinks.filter((person) =>
      ["Hao Chen", "Chenyuan Qu", "Chen Chen", "Jianbo Jiao"].includes(
        person.name
      )
    ),
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

export const caseStudies: CaseStudy[] = [
  {
    slug: "visualsplit",
    title: "VisualSplit",
    eyebrow: "BMVC 2025 · Image representation",
    thesis:
      "VisualSplit studies image representations based on three classical visual descriptors: edges, colour segmentation, and grey-level histograms.",
    takeaway:
      "Separating geometry, colour, and illumination into explicit descriptors provides an interpretable representation that can also be edited at the descriptor level.",
    challenge:
      "Learned image features are often difficult to interpret because geometry, colour, and illumination information are represented together.",
    contribution:
      "In this first-author work, we use the three descriptors as separate inputs for image reconstruction and examine their use in editing, restoration, and diffusion-guided generation.",
    outcome:
      "The work was published at BMVC 2025. The paper, supplementary material, presentation, code, model weights, and examples are publicly available.",
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
        unitLabel: "stages",
        steps: [
          {
            id: "input",
            label: "Input",
            note: "The source image from which the visual descriptors are extracted.",
            regions: [{ x: 0.8, y: 23.3, width: 7.8, height: 25.5 }]
          },
          {
            id: "edge",
            label: "Edge",
            focusLabel: "Colour and Edge ↔ Edge",
            note: "The combined colour-and-edge descriptor is used on the left; a Sobel operator extracts the reconstructed image's edge descriptor on the right.",
            regions: [
              { x: 11.9, y: 33, width: 6.8, height: 22.6 },
              { x: 93.6, y: 46.8, width: 5, height: 16.5 }
            ]
          },
          {
            id: "colour",
            label: "Colour",
            focusLabel: "Colour and Edge ↔ Colour",
            note: "The combined colour-and-edge descriptor is used on the left; Soft K-means extracts the reconstructed image's colour descriptor on the right.",
            regions: [
              { x: 11.9, y: 33, width: 6.8, height: 22.6 },
              { x: 93.7, y: 19.7, width: 4.8, height: 15.6 }
            ]
          },
          {
            id: "histogram",
            label: "Intensity",
            focusLabel: "Intensity ↔ Intensity",
            note: "The input intensity histogram is used on the left; a smooth histogram extracts the reconstructed image's intensity descriptor on the right.",
            regions: [
              { x: 11.8, y: 67.8, width: 7.6, height: 12.5 },
              { x: 93.5, y: 76.7, width: 5.2, height: 12.9 }
            ]
          },
          {
            id: "reconstruction",
            label: "Reconstruction",
            note: "The decoder reconstructs the image from the descriptor representation.",
            regions: [{ x: 67.3, y: 24.9, width: 7.8, height: 25.2 }]
          }
        ]
      }
    },
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
    accent: "blue"
  },
  {
    slug: "x360",
    title: "360+x",
    eyebrow: "CVPR 2024 · Oral paper",
    thesis:
      "360+x is a dataset for studying scene understanding across multiple viewpoints and aligned sensory modalities.",
    takeaway:
      "Aligning panoramic, frontal, and egocentric views with audio, location, and text supports scene-understanding research beyond single-view recognition.",
    challenge:
      "Many scene-understanding datasets focus on a single camera view or modality. 360+x records panoramic, frontal, and egocentric views together with spatial, audio, location, and textual signals.",
    contribution:
      "I was one of six authors on the project. The dataset, benchmark resources, and publication were produced collaboratively by the research team.",
    outcome:
      "The work was selected for an oral presentation at CVPR 2024. The project site provides the paper, supplementary material, code, dataset access, poster, and teaser video.",
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
        unitLabel: "views and signals",
        steps: [
          {
            id: "panorama",
            label: "Panorama",
            note: "A stitched equirectangular projection provides the 360° panoramic view.",
            regions: [{ x: 2.2, y: 1.5, width: 23.5, height: 26 }]
          },
          {
            id: "front-view",
            label: "Front view",
            note: "The third-person front view is projected from the spherical panorama.",
            regions: [{ x: 1.8, y: 64.5, width: 18.4, height: 22 }]
          },
          {
            id: "egocentric",
            label: "Egocentric",
            note: "A stereo camera captures the binocular egocentric view.",
            regions: [{ x: 74.2, y: 1.8, width: 24.2, height: 24 }]
          },
          {
            id: "audio",
            label: "Audio",
            note: "Left and right audio channels are represented as Mel spectrograms.",
            regions: [{ x: 41.1, y: 68.2, width: 19.2, height: 22 }]
          },
          {
            id: "binaural-delay",
            label: "Binaural delay",
            note: "Interaural time delay provides a directional binaural cue.",
            regions: [{ x: 74.1, y: 71, width: 24.2, height: 18 }]
          }
        ]
      }
    },
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
        kind: "code",
        label: "Code",
        href: "https://github.com/x360dataset/x360dataset-kit"
      },
      {
        kind: "dataset",
        label: "Dataset",
        href: "https://huggingface.co/datasets/quchenyuan/360x_dataset_HR"
      }
    ],
    accent: "cyan"
  }
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
      "A descriptor-driven project that reconstructs images from edges, colour segmentation, and grey-level histograms, then reuses those interpretable controls for restoration and prompt-free editing.",
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
      },
      {
        kind: "project",
        label: "Examples",
        href: "https://chenyuanqu.com/VisualSplit/colour-map-examples/"
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
        kind: "dataset",
        label: "eData DOI",
        href: "https://doi.org/10.25500/edata.bham.00001078"
      },
      {
        kind: "dataset",
        label: "UBIRA eData",
        href: "https://edata.bham.ac.uk/1078/"
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
    date: "5 May 2026",
    title: "Started Help To Grow: Management at BCU",
    detail:
      "I started the 12-week Help To Grow: Management Course at Birmingham City University Business School, with sessions spanning strategy, digital transformation, marketing, operations, finance, and growth planning.",
    href: "https://www.bcu.ac.uk/courses/help-to-grow-management-course"
  },
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
    title: "360+x selected for a CVPR 2024 oral presentation",
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

export const experience: TimelineGroup[] = [
  {
    track: "academic",
    organisation: "University of Birmingham · MI X Group",
    organisationLinks: organisationLinks.filter((organisation) =>
      ["University of Birmingham", "MI X Group"].includes(organisation.label)
    ),
    period: "Feb 2023 — Present",
    roles: [
      {
        title: "PhD Student",
        period: "2023 — Present",
        detail:
          "Doctoral research in computer vision, multimodal learning, and generative AI within the School of Computer Science."
      },
      {
        title: "Research Assistant",
        period: "Dec 2023 — Present",
        detail:
          "Research on compositionality for foundation models, with a focus on representation, reasoning, and generative computer-vision systems."
      },
      {
        title: "Research Assistant",
        period: "Feb 2023 — Dec 2023",
        detail:
          "Research on interpretable hydrological modelling and machine-learning methods for scientific analysis."
      }
    ]
  },
  {
    track: "industry",
    organisation: "Allsee · Vieunite",
    organisationLinks: organisationLinks.filter((organisation) =>
      ["Allsee", "Vieunite"].includes(organisation.label)
    ),
    period: "Sep 2022 — Present",
    roles: [
      {
        title: "Head of Technologies",
        period: "Dec 2024 — Present",
        detail:
          "Responsible for technology planning across backend architecture, internal software, AI development, and operational systems.",
        highlights: [
          "Coordinate technical priorities across hardware, software, and internal workflows, with attention to maintainability and delivery requirements.",
          "Use Linear to organise requests from sales, product, operations, and engineering into roadmaps, assigned work, and progress tracking.",
          "Evaluate and implement machine-learning, generative-AI, and automation use cases in internal and product-facing workflows.",
          "Translate requirements discussed with leadership, operations, and sales into technical designs and implementation plans."
        ]
      },
      {
        title: "Full-stack Engineer",
        period: "Dec 2023 — Dec 2024",
        detail:
          "Worked on the CMS and ERP platforms, including consolidating board-specific CMS code into a shared architecture for multiple hardware boards and operating systems.",
        highlights: [
          "Refactored the CMS so a shared codebase could support multiple boards, deployment targets, and system environments.",
          "Developed the internal ERP system, including its core workflows, data structures, and interfaces.",
          "Worked across frontend, backend, deployment, and device constraints in response to product requirements."
        ]
      },
      {
        title: "Algorithm Engineer",
        period: "Sep 2022 — Dec 2023",
        detail:
          "Worked on backend services, recommendation components, and Vieutopia AI art features for Allsee and Vieunite.",
        highlights: [
          "Implemented backend services for AI-related product features and internal workflows.",
          "Developed recommendation components for content and product discovery.",
          "Developed Vieutopia AI art functionality using generative models."
        ]
      }
    ]
  },
  {
    track: "industry",
    organisation: "AsiaInfo Software Co. Ltd",
    organisationLinks: organisationLinks.filter(
      (organisation) => organisation.label === "AsiaInfo Software Co. Ltd"
    ),
    period: "Jul 2020 — Sep 2020",
    roles: [
      {
        title: "Algorithm Engineer Intern",
        period: "Jul 2020 — Sep 2020",
        detail:
          "Developed and optimised machine-learning components for a visual customer-service anchor in a mobile deployment setting."
      }
    ]
  }
];

export const education: TimelineItem[] = [
  {
    title: "Master's Study",
    organisation: "University of Birmingham",
    organisationLinks: organisationLinks.filter(
      (organisation) => organisation.label === "University of Birmingham"
    ),
    period: "2021 — 2022",
    detail:
      "Postgraduate study completed at Birmingham before beginning doctoral research."
  },
  {
    title: "BSc in Physics",
    organisation: "University of Southampton",
    organisationLinks: organisationLinks.filter(
      (organisation) => organisation.label === "University of Southampton"
    ),
    period: "2018 — 2021",
    detail:
      "Undergraduate training in physics, which continues to shape how I think about machine learning and computer vision."
  }
];
