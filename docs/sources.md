# Sources for Chenyuan Qu Personal Website

Initial public-source research was completed on April 16, 2026. The career narrative and current profile were audited again on August 27, 2026.

## Personal collection — September 15, 2026

The user confirmed that his English name is **Henry**. The introduction now says “You can call me Henry.”, and the footer, page metadata and Person schema include this name. Publication authorship and citations retain Chenyuan Qu.

At the user's request, the site now gives less prominence to an Applied AI Engineer identity. The introduction describes visual curiosity, work summaries are shorter, project roles and qualified outcomes live inside disclosures, and the biography keeps the verified technology and research roles. The third project is labelled “Everyday tools”; it remains the same ERP assistant. Page metadata uses “A personal collection”. This changes presentation, not the underlying career or research record.

No new employment, travel, hobby, project-status or impact claims were added. The large photograph is the same existing night scene and is not assigned a new location. Nexus figures, the evaluated scope of ERP results, COMPaD's alpha status and publication authorship are preserved. The previous source audits below remain the basis for these facts.

## Project visuals — September 15, 2026

- The “A little more reading.” list now has a visual preview for every publication. VisualSplit reuses the verified egret original/result, and 360+x reuses the existing official panorama. DIFF pairs the street photograph and **reference segmentation labels** from its published pipeline figure; the preview does not claim these labels are a separately evaluated prediction. MeD pairs the original stairwell photograph with the published denoised image. The original overview figure is visible as soon as each paper is expanded, with posters and videos retained below.
- New reading-list sources, copied without altering the source files into `public/images/publications/studies/`:
  - `diff-pipeline.jpg`: [official DIFF pipeline figure](https://raw.githubusercontent.com/Yux1angJi/DIFF/main/resources/pipeline.jpg), 8181 × 3300. CSS frames the input photograph at `(62, 1293, 566, 565)` and reference labels at `(62, 275, 566, 565)`; the complete overview remains linked in the paper entry.
  - `med-noisy.jpg`: [MeD original stairwell image](https://chqwer2.github.io/MeD/static/images/PolyU/data30.JPG), 3680 × 2456.
  - `med-denoised.jpg`: [MeD published denoised stairwell image](https://chqwer2.github.io/MeD/static/images/PolyU/data30_denoised.jpg), 3680 × 2456. Both previews use the same CSS framing `(1660, 510, 1040, 720)` to show the tile and pipe detail. No noise was added and no browser filter was used to simulate denoising.
  - Preview mappings, alternatives and captions live in `src/data/paper-visuals.ts`. Native image loading is deferred, and every asset uses the configured static base path.
- VisualSplit now presents three actual published experiments in a manual comparison viewer, replacing the decorative beach photograph. The egret example edits the colour map; the mountain valley changes the brightness histogram in the downstream diffusion application; the dog demonstrates descriptor-to-image reconstruction. These are precomputed research results, not live browser inference or synthetic CSS effects. The original paper, authorship and venue are unchanged. Asset mapping is recorded below.
- Nexus was inspected at the user's supplied test portal, including its existing layout editor. No layouts were saved or published. The new portfolio image uses the portal's publicly served feature previews for Campaigns (`/images/login/feature-campaigns.png`) and content scheduling (`/images/login/feature-content-scheduling.png`), plus its `/images/login/msp-logo.svg` logo. These were acquired through the rendered login page at [Nexus](https://nexus-test.mysignageportal.com/), exported as local `nexus-campaigns.webp`, `nexus-schedule.webp` and `nexus-logo.svg` assets under `public/images/projects/`, and composed with CSS. They are product-provided examples, not a new customer deployment, customer endorsement or live account data. No credentials or authenticated account screenshots are included in the site.
- COMPaD now uses three working, local interactive poster concepts: In bloom, Form & space, and City in flux. All words, typography, paper colours, image transforms and separate layer positions can be edited. The flower, silver sculpture and architectural photograph are original artworks generated with the built-in image tool, stored under `public/images/projects/` as `compad-flower.webp`, `compad-sculpture.webp` and `compad-city.webp`; the first two retain their transparency. They are not claimed outputs of the COMPaD model. [Artwork provenance and complete prompts](compad-artwork.md).
- The 360+x image retains the original 2880 × 1440 panorama resolution. Following the user's clarification, the camera now starts inside the scene and the panorama fills the frame; the external globe and its mode switch have been removed. The source, existing face blurring, attribution and CC BY-NC-SA 4.0 terms documented below are unchanged. It falls back to a full-frame photograph if JavaScript or WebGL is unavailable. The renderer follows the projection approach documented in the [Three.js equirectangular panorama example](https://threejs.org/examples/webgl_panorama_equirectangular.html).
- These visuals replace the Nexus and COMPaD HTML/CSS illustrations and the sliding 360+x photo crop described in the September 14 entry. All career, project-status and authorship facts are unchanged.

## Personal portfolio redesign — September 14, 2026

The introduction, selected work, research summaries, about section and contact invitation were rewritten in concise first-person English. This is a presentation update using the existing verified record, not a new audit of employment, paper status or business results. The scope of Nexus and ERP figures, COMPaD's alpha status, publication authorship, career dates and contact details is unchanged.

- The layered portrait uses the original `/public/images/portrait.webp` photograph. The face and clothing are not regenerated. `/public/images/portrait/person-matte.webp` is the generated luminance mask applied to that original photograph; `/public/images/portrait/street-background.webp` is the separately generated inpainted background made for the approved portrait concept. Reconstructed scenery is an artistic completion of the obscured area, not documentary evidence of it.
- The candid photograph in About is the existing `/public/images/hero/home-hero-desktop.webp` asset. No new location or travel claims were added.
- The beach image comes from the official VisualSplit project hero, already documented below. Its palette swatches are decorative colour studies, not claimed model outputs.
- The 360+x preview uses the official project's panorama at `https://x360dataset.github.io/static/images/image_base64.txt`, linked by `https://x360dataset.github.io/`. The embedded PNG was decoded and resized to an 1800-pixel-wide WebP in `/public/images/projects/x360-panorama.webp`; existing face blurring is preserved. Attribution: 360+x authors, official 360+x project, [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). The research preview links to the source project.
- The Nexus, Everyday AI and COMPaD visuals are original HTML/CSS project illustrations using the above photography. Each is labelled “Project illustration”. They are not customer screenshots or evidence of a released interface.
- Formal publication titles, author order, DOI/arXiv identifiers, resource links, citation text, BibTeX and original figures remain available through the expandable paper library. Existing `?spotlight=` and `#publication-` links open the matching paper.

## Narrative and source update — August 27, 2026

The site now presents Enterprise AI and academic research as two equal parts of one practice. This update was based on the user-provided **Career Evidence Master Record, version 26 August 2026**, an authenticated review of the user's newly updated LinkedIn profile on August 27, 2026, the public sources below, and direct user confirmation that both practices should be emphasised.

- VisualSplit and 360+x summaries paraphrase the same official paper, project, code, dataset, and media sources documented below.
- The 360+x contribution is deliberately described as collaborative co-authorship; the site does not assign unverified individual ownership of the team output.
- Nexus, ERP AI, and COMPaD descriptions use user-confirmed facts and wording controls from the Career Evidence Master Record. No customer names, private interfaces, confidential implementation detail, or planning estimates are published.
- The `200,000+` figure means devices managed by Nexus; it does not mean all devices are online at once.
- The ERP `≈80%` and `≈99%` figures apply only to the day-to-day tasks evaluated, and the error figure refers to observed human mistakes.
- COMPaD is described as being in first-stage alpha testing. Commercial planning estimates are not presented as realised results.
- All new prose was rewritten for a broad audience: the problem, personal role, and result appear before optional technical terms.

## Source priority

Academic facts were verified in this order:

1. Google Scholar
2. University of Birmingham profile
3. ORCID
4. Official paper and project pages
5. Current personal website

In the April pass, industry and experience facts were checked against the personal website because LinkedIn was behind an authwall.

For the August 27 update, industry and current-profile facts were checked in this order:

1. User-provided Career Evidence Master Record, version 26 August 2026
2. Authenticated LinkedIn profile review completed with the user signed in on August 27, 2026
3. Direct user confirmation in the website-upgrade task
4. Official organisation and product pages where available

The earlier authwall limitation no longer applies to the August 27 review.

## Verified profile facts

| Fact | Value used on site | Sources |
| --- | --- | --- |
| Name | Chenyuan Qu | Google Scholar, ORCID, Birmingham profile |
| English name | Henry | Direct user confirmation on September 15, 2026 |
| Current structured role line | Head of Technologies · PhD Researcher | Career Evidence Master Record, authenticated LinkedIn review, Birmingham profile, and MI X people page |
| Affiliation line | University of Birmingham · Allsee · Vieunite | User-confirmed affiliations, Birmingham profile, and public Allsee / Vieunite association from the current personal website and BinEgo-360 site |
| Primary email | `Chenyuan.Qu@outlook.com` | User-provided contact information; selected as the primary public contact in the July 2026 narrative restructure |
| Additional contact emails | `henry.qu@allsee-tech.com`, `henry.qu@vieunite.com`, `cxq134@student.bham.ac.uk` | User-provided contact information and Birmingham profile |
| Short research areas | Computer vision, multimodal learning, generative AI, AI for science | Birmingham profile, MI X people page, Google Scholar interests |
| Public links | Google Scholar, GitHub, Hugging Face, LinkedIn, ORCID | Seed URLs supplied by user, Hugging Face public profile, ORCID |
| Short bio basis | Customer-facing and internal AI systems, Python/FastAPI and Java engineering, together with part-time research in computer vision and generative AI | Career Evidence Master Record, authenticated LinkedIn review, Birmingham profile, MI X people page, and user-confirmed engineering experience |

## Enterprise AI work used

| Work | Facts presented on site | Source and wording controls |
| --- | --- | --- |
| Nexus MySignagePortal | Led customer discovery and delivery; wrote most of the Python/FastAPI backend; contributed to Java device software; five-person team; roughly ten implementations consolidated; 200,000+ managed devices; 1,000+ organisations; 50,000+ users; feature and bug improvements; at least £50,000 directly attributable sales | Career Evidence Master Record §§6, 24, 30. Device count always uses “manages”; no concurrency claim. Customer names are omitted. |
| ERP AI | Natural-language order, warehouse, and repair tasks; permission checks; confirmations; audit record; reusable MCP tools; ≈80% less completion time and ≈99% fewer observed human mistakes in tested tasks | Career Evidence Master Record §§8, 24, 29. Figures are never generalised to the whole company or every type of error. |
| COMPaD | Joint Allsee–University of Birmingham programme; editable poster output; text-and-image model using an open-source Qwen2.5 backbone; agent workflow; first-stage alpha testing | Career Evidence Master Record §§14, 24, 29. The model is not described as trained from scratch. Planning estimates and unreconciled commercial figures are omitted. |

## Publications used

| Year | Title | Site status | Sources |
| --- | --- | --- | --- |
| 2025 | Exploring Image Representation with Decoupled Classical Visual Descriptors | Included | Google Scholar citation page, VisualSplit project page, arXiv |
| 2025 | Diffusion Features to Bridge Domain Gap for Semantic Segmentation | Included | Google Scholar citation page, arXiv, IEEE link exposed from Scholar/arXiv |
| 2024 | 360+x: A Panoptic Multi-modal Scene Understanding Dataset | Included · CVPR oral | Google Scholar citation page, 360+x project page, CVPR OpenAccess, ORCID |
| 2023 | Multi-view Self-supervised Disentanglement for General Image Denoising | Included | Google Scholar citation page, MeD project page, CVF OpenAccess, ORCID |

### Publication detail mapping

#### VisualSplit

- Title, authors, year, arXiv identifier: Google Scholar citation page and arXiv.
- BMVC 2025 venue statement: VisualSplit project page.
- Spotlight abstract text on the site is a paraphrase of the introduction and method framing on the official VisualSplit project page.
- Official BMVC citation block and BibTeX: `https://bmvc2025.bmva.org/proceedings/873/`
- DOI used on site: `10.48550/arXiv.2510.14536`
- Local spotlight figure: `/public/images/projects/visualsplit-framework.webp`, matched to the framework overview visual used on the official VisualSplit project page.
- Local poster preview: `/public/images/publications/visualsplit-poster.webp`, generated from the official poster PDF `https://chenyuanqu.com/VisualSplit/docs/posters/0873_poster.pdf`
- Local video poster preview: `/public/images/projects/visualsplit-hero.webp`, derived from the official VisualSplit hero image `https://chenyuanqu.com/VisualSplit/images/hero/visualsplit_hero.jpg`
- Interactive case assets: copied from the matching public assets in the local VisualSplit project-page repository, with lossless WebP encoding and original dimensions and pixels preserved. No cropping, retouching, sharpening, colour correction or generated replacements. Local names below are relative to `public/images/projects/visualsplit/`; source paths are relative to `https://chenyuanqu.com/VisualSplit/images/`.

  | Local asset(s) | Published source path(s) |
  | --- | --- |
  | `egret-original.webp`, `egret-result.webp` | `editing/apps/apps_editing_colour_original.png`, `editing/apps/apps_editing_colour_output.png` |
  | `egret-colour-before.webp`, `egret-colour-after.webp` | `editing/apps/apps_editing_colour_seg_original.png`, `editing/apps/apps_editing_colour_seg_edited.png` |
  | `valley-original.webp` | `editing/apps/apps_editing_original.png` |
  | `valley-dark.webp`, `valley-balanced.webp`, `valley-bright.webp` | `editing/apps/apps_editing_output_-2.png`, `editing/apps/apps_editing_output_0.png`, `editing/apps/apps_editing_output_2.png` |
  | `valley-histogram-dark.webp`, `valley-histogram-balanced.webp`, `valley-histogram-bright.webp` | `editing/apps/apps_editing_hist_after_-2.png`, `editing/apps/apps_editing_hist_after_0.png`, `editing/apps/apps_editing_hist_after_2.png` |
  | `dog-original.webp`, `dog-result.webp` | `experiments/descriptor/exp_original.png`, `experiments/descriptor/exp_output.png` |
  | `dog-edges.webp`, `dog-colour.webp`, `dog-light.webp` | `experiments/descriptor/exp_edge.png`, `experiments/descriptor/exp_segmentation.png`, `experiments/descriptor/exp_histogram.png` |

  The dog's published reconstruction is 224 × 224, as is the valley's original input; their softer details remain visible when enlarged by the layout. The egret original/result are 1024 × 1024 and the valley outputs are 512 × 512. All 16 selected source PNGs were verified byte-for-byte against the official public site on September 15, 2026. No human illustration or competitor result is used. Presentation copy and mappings live in `src/data/visualsplit-examples.ts`; each case links to the official project page.
- Project links:
  - Project page: `https://chenyuanqu.com/VisualSplit/`
  - Paper PDF: `https://chenyuanqu.com/VisualSplit/docs/papers/VisualSplit_BMVC2025.pdf`
  - Supplementary: `https://chenyuanqu.com/VisualSplit/docs/supplementary/VisualSplit_supplementary.pdf`
  - Poster PDF: `https://chenyuanqu.com/VisualSplit/docs/posters/0873_poster.pdf`
  - BMVC 2025 presentation video: `https://chenyuanqu.com/VisualSplit/videos/presentation/0873_presentation_1080p.mp4`
  - Colour-map examples page: `https://chenyuanqu.com/VisualSplit/colour-map-examples/`
  - Code: `https://github.com/HenryQUQ/VisualSplit`
  - Models: `https://huggingface.co/quchenyuan/VisualSplit`
  - arXiv: `https://arxiv.org/abs/2510.14536`
- The footer text on the VisualSplit project page contains template placeholder language and extra contact details; these were treated as non-authoritative and not copied into the personal site.
- Author links used on the site:
  - Chenyuan Qu: `https://chenyuanqu.com/`
  - Hao Chen: `https://h-chen.com/`
  - Jianbo Jiao: `https://jianbojiao.com/`

#### DIFF

- Title, author order, venue, year, pages: Google Scholar citation page.
- Abstract and arXiv record: `https://arxiv.org/abs/2406.00777`
- Spotlight abstract text on the site is a paraphrase of the arXiv abstract.
- Official repository and project overview: `https://github.com/Yux1angJi/DIFF`
- Code link extracted from arXiv page and cross-checked against the official repository: `https://github.com/Yux1angJi/DIFF`
- IEEE abstract link surfaced from Scholar: `https://ieeexplore.ieee.org/abstract/document/10888537/`
- DOI and BibTeX used on site: `https://dblp.org/rec/conf/icassp/JiHQTQW25.bib`
- Local spotlight figure: `/public/images/projects/diff-pipeline.webp`, derived from the official repository README figure `resources/pipeline.jpg`
- The publication summary remains based on the arXiv abstract; the spotlight figure and project framing are taken from the official repository README overview.
- Author links used on the site:
  - Yuxiang Ji: `https://yuxiang-ji.com/`
  - Chenyuan Qu: `https://chenyuanqu.com/`
- Author links intentionally not added for Boyong He, Zhuoyue Tan, Chuan Qin, and Liaoni Wu based on user instruction.

#### 360+x

- Title, authors, venue, year, pages: Google Scholar citation page.
- Oral-presentation status: the official 360+x project page labels the CVPR 2024 paper as an “Oral Presentation”; the official poster also links to the CVPR virtual oral page at `https://cvpr.thecvf.com/virtual/2024/oral/32053`.
- ORCID also lists the CVPR 2024 publication with DOI `10.1109/CVPR52733.2024.01833`.
- Spotlight abstract text on the site is a paraphrase of the official 360+x project page overview.
- BibTeX used on site was extracted from the official 360+x project page.
- Local spotlight figure: `/public/images/projects/x360-main.webp`, matched to the official project page overview figure.
- Local poster preview: `/public/images/publications/x360-poster.webp`, generated from the official poster PDF `https://x360dataset.github.io/static/pdfs/360_poster.pdf`.
- Spotlight video source: official teaser video `https://x360dataset.github.io/static/videos/teaser_video.mp4` and embedded paper video `https://www.youtube.com/embed/tUhIPyw705w`, both referenced from the official 360+x project page.
- Project links:
  - Project page: `https://x360dataset.github.io/`
  - Paper PDF: `https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding.pdf`
  - Supplementary: `https://x360dataset.github.io/static/pdfs/CVPR2024_360x__A_Dataset_for_Panoptic_Multi_modal_Scene_Understanding_supp.pdf`
  - Poster: `https://x360dataset.github.io/static/pdfs/360_poster.pdf`
  - arXiv: `https://arxiv.org/abs/2404.00989`
  - Code: `https://github.com/x360dataset/x360dataset-kit`
  - Dataset: `https://huggingface.co/datasets/quchenyuan/360x_dataset_HR`, `https://huggingface.co/datasets/quchenyuan/360x_dataset_LR`
  - UBIRA eData DOI: `https://doi.org/10.25500/edata.bham.00001078`
  - UBIRA eData page: `https://edata.bham.ac.uk/1078/`
  - Workshop page: `https://x360dataset.github.io/BinEgo-360/`
- Author links used on the site:
  - Hao Chen: `https://h-chen.com/`
  - Yuqi Hou: `https://openreview.net/profile?id=~Yuqi_Hou2`
  - Chenyuan Qu: `https://chenyuanqu.com/`
  - Irene Testini: `https://www.chia.cam.ac.uk/team/irene-testini`
  - Xiaohan Hong: `https://hannh5.github.io/`
  - Jianbo Jiao: `https://jianbojiao.com/`

#### MeD

- Title, authors, venue, year, pages: Google Scholar citation page.
- ORCID also lists the ICCV 2023 publication with DOI `10.1109/ICCV51070.2023.01128`.
- Spotlight abstract text on the site is a paraphrase of the official MeD project page abstract.
- BibTeX used on site was extracted from the official MeD project page.
- Local spotlight figure: `/public/images/projects/med-arc.webp`, matched to the official MeD project page overview image.
- Local poster preview: `/public/images/publications/med-poster.webp`, generated from the official poster PDF `https://chqwer2.github.io/MeD/static/pdfs/ICCV23_MeD_Poster%20(1)_20230930132936.pdf`.
- Project links:
  - Project page: `https://chqwer2.github.io/MeD/`
  - Paper PDF: `https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Final_Version.pdf`
  - Supplementary: `https://chqwer2.github.io/MeD/static/pdfs/ICCV2023_MeD_Supplymentary_Final_Version.pdf`
  - Poster: `https://chqwer2.github.io/MeD/static/pdfs/ICCV23_MeD_Poster%20(1)_20230930132936.pdf`
  - arXiv: `https://arxiv.org/abs/2309.05049`
  - Code: `https://github.com/chqwer2/Multi-view-Self-supervised-Disentanglement-Denoising`
- Author links used on the site:
  - Hao Chen: `https://h-chen.com/`
  - Chenyuan Qu: `https://chenyuanqu.com/`
  - Chen Chen: `https://www.crcv.ucf.edu/chenchen/`
  - Jianbo Jiao: `https://jianbojiao.com/`
- No personal link is used for Yu Zhang because the official MeD project page lists an affiliation but no personal URL.

## Datasets and supporting surfaces

| Item | Use on site | Sources |
| --- | --- | --- |
| VisualSplit | Featured research project | VisualSplit project page, GitHub repo |
| 360+x | Featured publication and dataset surface | 360+x project page, GitHub repo, Hugging Face dataset pages |
| MeD | Featured prior project | MeD project page, CVF OpenAccess |
| BinEgo-360 | Featured in the datasets block | BinEgo-360 challenge homepage and repository |
| text-to-art-database | Featured in the datasets block | Hugging Face dataset page and public profile |

## Institution and organisation links

| Entity | Link used | Source |
| --- | --- | --- |
| Allsee | `https://www.allsee-tech.com/` | Official Allsee Technologies website |
| Vieunite | `https://vieunite.com/` | Official Vieunite website |
| University of Birmingham | `https://www.birmingham.ac.uk/` | Official university website |
| MI X Group | `https://mix.jianbojiao.com/people/` | Official MI X group people page |
| University of Southampton | `https://www.southampton.ac.uk/` | Official university website |
| AsiaInfo Software Co. Ltd | `https://www.asiainfo.com/en_us/about.html` | Official AsiaInfo about page |

### Hugging Face profile and dataset verification

- Public profile: `https://huggingface.co/quchenyuan`
  - Public page title: `quchenyuan (Chenyuan Qu)`
  - Used on site as a top-level external profile link and in structured metadata `sameAs`.
- Dataset: `https://huggingface.co/datasets/quchenyuan/text-to-art-database`
  - Dataset name: `text-to-art-database`
  - Pretty name on the dataset card: `Vieutopia T2A Privacy Train v1`
  - Public description confirms:
    - Privacy-safe text-to-image dataset
    - Parquet shards with embedded image bytes
    - samples and iterations configs
    - train / validation / test splits
  - The site summary is a paraphrase of this public dataset description.

## Experience and education

### Experience

The August 27, 2026 experience record uses the role chronology from the authenticated, newly updated LinkedIn profile and the fuller project evidence in the Career Evidence Master Record. Dates, company relationships, part-time research status, internal project scope, and measured outcomes are user-confirmed professional self-description. Public organisation and product pages support the affiliations and public project surfaces but do not independently verify every internal metric.

The current `Head of Technologies` wording shown in the hero and experience section is user-confirmed. Publicly accessible sources support the Allsee / Vieunite association and engineering scope, but not that exact title string.

On 2026-06-24, Chenyuan Qu confirmed that the Allsee / Vieunite experience should be split into:

- Algorithm Engineer, September 2022 to December 2023, focused on backend development, AI recommendation infrastructure, and AI image-generation features.
- Full-stack Engineer, December 2023 to December 2024, focused on CMS refactoring into one shared cross-board / cross-system software architecture, and building an ERP system from the ground up.
- Head of Technologies, December 2024 to present, focused on company-wide digital transformation, AI acceleration, technology-roadmap ownership, and translating business bottlenecks into deployable systems.

Vieutopia was publicly verified on 2026-06-24 as the AI art product name:

- Official site: `https://vieutopia.com/`, which describes Vieutopia as a web and mobile AI art generator with multiple art styles and generated-art management.
- Google Play: `https://play.google.com/store/apps/details?hl=en_US&id=com.app.vieuly`, which lists `Vieutopia AI Art Redefined` and describes it as an art creation tool by Vieunite.

The more detailed contribution wording in these Allsee / Vieunite role descriptions is user-confirmed. Public sources were not used to verify internal architecture ownership, ERP implementation scope, or company-wide transformation responsibilities.

On 2026-06-24, Chenyuan Qu further confirmed that the personal site should more clearly reflect the depth of his industry experience, including backend architecture, traditional software engineering, enterprise management, project-management systems such as Linear, and sales / commercialisation collaboration. These positioning statements are treated as user-confirmed professional self-description rather than independently public-verified claims.

On 2026-06-24, Chenyuan Qu confirmed that the previously aggregated University of Birmingham Research Assistant entry should be split into:

- Research Assistant, February 2023 to December 2023, focused on interpretable hydrological modelling and machine-learning methods for scientific analysis.
- Research Assistant, December 2023 to present, focused on compositionality research for foundation models.

Public search on 2026-06-24 confirmed the University of Birmingham / MI X affiliation and broad computer-vision / multimodal-learning research direction, but did not find a public source for this Research Assistant date split or the compositionality-specific role description. The site therefore treats the split as user-confirmed profile information rather than a publicly cross-verified fact.

### Education

The authenticated LinkedIn profile reviewed on August 27, 2026 identifies the 2021–2022 Birmingham qualification as a **Master's in Artificial Intelligence and Machine Learning**, completed with **Distinction**. This newer user-maintained record resolves the earlier conservative placeholder used on the site. The BSc in Physics at the University of Southampton remains consistent across the Birmingham profile and personal records.

## News items used

| Item | Sources |
| --- | --- |
| COMPaD entered first-stage alpha testing | Career Evidence Master Record, version 26 August 2026, and direct user confirmation |
| Started Help To Grow: Management at BCU on 5 May 2026 | Participation is user-provided; course title, start date, 12-week duration, hybrid delivery, Birmingham City University Business School delivery, and curriculum themes come from the BCU Help To Grow: Management Course page: `https://www.bcu.ac.uk/courses/help-to-grow-management-course` |
| VisualSplit presented as BMVC 2025 work | VisualSplit project page |
| DIFF published at ICASSP 2025 | Google Scholar citation page, arXiv |
| 360+x published at CVPR 2024 | Google Scholar citation page, 360+x project page, current personal website news |
| MeD published at ICCV 2023 | Google Scholar citation page, MeD project page, current personal website news |
| PhD student in MI X since 2023 | MI X people page |

## Blocked or unresolved items

- Google Scholar citation counts were visible during research, but they are volatile and were not surfaced in the final UI.
- ERP evaluation sample size and adoption volume are not published; the site therefore scopes the time and error figures to the tasks tested.
- Nexus device concurrency is not published; the site says the platform “manages” 200,000+ devices.
- COMPaD remains in first-stage alpha testing; no launch, revenue, labour-saving, or sales-uplift estimate is presented as an achieved result.
- No CV file is linked in the new site because a current, independently verified CV was not available.
- The production site URL is treated as `https://chenyuanqu.com` for canonical metadata, Open Graph, and the GitHub Pages `CNAME`.
