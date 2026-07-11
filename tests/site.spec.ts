import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const publicationRow = (page: Page, slug: string) =>
  page.locator(
    `[data-publication-slug="${slug}"][data-publication-variant="full"]`
  );

test("homepage presents the personal academic profile without overflow", async ({
  page
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Chenyuan Qu"
    })
  ).toBeVisible();
  await expect(
    page.getByText(
      "I am a PhD student at the University of Birmingham and Head of Technologies at Allsee and Vieunite."
    )
  ).toBeVisible();
  await expect(page.getByText("Start a conversation")).toHaveCount(0);
  await expect(
    page.getByText("University of Birmingham · Allsee · Vieunite", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Email", exact: true })).toHaveAttribute(
    "href",
    "mailto:Chenyuan.Qu@outlook.com"
  );
  await expect(page.locator("time").filter({ hasText: /Birmingham · \d{2}:\d{2} local/ })).toBeVisible();
  await expect(
    page.locator("#thread-interpretable-representations")
  ).toHaveAttribute(
    "href",
    "/?thread=interpretable-representations#study-visualsplit"
  );

  const heroImage = page.getByAltText("Portrait of Chenyuan Qu");
  await expect(heroImage).toBeVisible();
  await expect(
    heroImage.evaluate((image) => (image as HTMLImageElement).naturalWidth > 0)
  ).resolves.toBeTruthy();

  const overflow = await page.evaluate(() => ({
    body: document.body.scrollWidth,
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth
  }));
  expect(overflow.body).toBeLessThanOrEqual(overflow.viewport);
  expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
});

test("primary navigation reaches the publication list below the header", async ({
  page
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Publications", exact: true }).click();

  await expect(page).toHaveURL(/#research/);
  await expect(page.locator("#research").getByRole("heading", { name: "Publications" })).toBeVisible();

  const headingBox = await page.locator("#research h2").boundingBox();
  expect(headingBox?.y ?? 0).toBeGreaterThan(60);
});

test("selected research contains two factual project summaries", async ({ page }) => {
  await page.goto("/#work");
  const work = page.locator("#work");

  await expect(work.locator('[data-case-study="visualsplit"]')).toContainText("first-author work");
  await expect(work.locator('[data-case-study="x360"]')).toContainText("one of six authors");
  await expect(work.locator('[data-case-study="x360"]')).toContainText(
    "CVPR 2024 · Oral paper"
  );
  await expect(work.locator("[data-case-study]")).toHaveCount(2);
  await expect(work.locator("[data-case-study-takeaway]")).toHaveCount(2);
  await expect(
    work.locator('[data-case-study-takeaway="visualsplit"]')
  ).toContainText("Separating geometry, colour, and illumination");
  await expect(
    work.locator('[data-case-study-takeaway="x360"]')
  ).toContainText("beyond single-view recognition");

  const figureButton = work.getByRole("link", {
    name: "Open figure: VisualSplit overview"
  });
  await expect(figureButton).toHaveAttribute(
    "href",
    "/images/projects/visualsplit-framework.webp"
  );
  await figureButton.click();
  const lens = page.locator('[data-research-lens="visualsplit"]');
  await expect(lens).toBeVisible();
  await expect(lens.getByRole("tab")).toHaveCount(5);
  await expect(lens.getByRole("tab", { selected: true })).toContainText("Input");
  await expect(lens).toHaveAttribute("data-active-lens-step", "input");

  await lens.getByRole("tab", { name: /Input/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(lens).toHaveAttribute("data-active-lens-step", "edge");
  const edgeRegions = lens.locator('[data-lens-region="edge"]');
  await expect(edgeRegions).toHaveCount(2);
  await expect(edgeRegions.first()).toBeVisible();
  await expect(edgeRegions.last()).toBeVisible();
  await expect(lens.locator('[data-lens-note="edge"]')).toContainText(
    "Colour and Edge ↔ Edge"
  );
  await expect(lens.locator('[data-lens-note="edge"]')).toContainText(
    "Sobel operator"
  );
  await expect(lens.getByRole("tab", { selected: true })).toBeFocused();

  await page.keyboard.press("End");
  await expect(lens).toHaveAttribute(
    "data-active-lens-step",
    "reconstruction"
  );
  await page.keyboard.press("Home");
  await expect(lens).toHaveAttribute("data-active-lens-step", "input");

  const colourAndEdgeDescriptor = {
    left: "11.9%",
    top: "33%",
    width: "6.8%",
    height: "22.6%"
  } as const;
  const intensityDescriptor = {
    left: "11.8%",
    top: "67.8%",
    width: "7.6%",
    height: "12.5%"
  } as const;
  const calibratedRegions = {
    input: [
      {
        left: "0.8%",
        top: "23.3%",
        width: "7.8%",
        height: "25.5%"
      }
    ],
    edge: [
      colourAndEdgeDescriptor,
      {
        left: "93.6%",
        top: "46.8%",
        width: "5%",
        height: "16.5%"
      }
    ],
    colour: [
      colourAndEdgeDescriptor,
      {
        left: "93.7%",
        top: "19.7%",
        width: "4.8%",
        height: "15.6%"
      }
    ],
    histogram: [
      intensityDescriptor,
      {
        left: "93.5%",
        top: "76.7%",
        width: "5.2%",
        height: "12.9%"
      }
    ],
    reconstruction: [
      {
        left: "67.3%",
        top: "24.9%",
        width: "7.8%",
        height: "25.2%"
      }
    ]
  } as const;

  for (const [step, expectedRegions] of Object.entries(calibratedRegions)) {
    await lens.locator(`[data-lens-step="${step}"]`).click();
    await expect(lens).toHaveAttribute("data-active-lens-step", step);

    const regionLocator = lens.locator(`[data-lens-region="${step}"]`);
    await expect(regionLocator).toHaveCount(expectedRegions.length);
    const renderedRegions = await regionLocator.evaluateAll((elements) =>
      elements.map((element) => {
        const region = element as HTMLElement;

        return {
          left: region.style.left,
          top: region.style.top,
          width: region.style.width,
          height: region.style.height
        };
      })
    );

    expect(renderedRegions).toEqual(expectedRegions);
  }

  const figureA11y = await new AxeBuilder({ page })
    .include('[data-lightbox-backdrop="true"]')
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(
    figureA11y.violations.filter(({ impact }) =>
      impact === "serious" || impact === "critical"
    )
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.locator('[data-lightbox-backdrop="true"]')).toHaveCount(0);
  await expect(page.locator("main [inert]")).toHaveCount(0);
  await expect(figureButton).toBeFocused();
});

test("360+x lens exposes only the views and signals present in its figure", async ({
  page
}) => {
  await page.goto("/#study-x360");
  await page
    .getByRole("link", { name: "Open figure: 360+x overview" })
    .click();

  const lens = page.locator('[data-research-lens="x360"]');
  await expect(lens.getByRole("tab")).toHaveCount(5);
  await expect(lens.getByRole("tab", { name: /Panorama/ })).toBeVisible();
  await expect(lens.getByRole("tab", { name: /Egocentric/ })).toBeVisible();
  await lens.getByRole("tab", { name: /Binaural delay/ }).click();
  await expect(lens.locator('[data-lens-note="binaural-delay"]')).toContainText(
    "Interaural time delay"
  );
});

test("research threads connect inquiry, study, and publication", async ({ page }) => {
  await page.goto("/");
  const threadLink = page.locator("#thread-interpretable-representations");

  await threadLink.click();
  await expect(page).toHaveURL(
    /\?thread=interpretable-representations#study-visualsplit$/
  );
  await expect(page.locator("#study-visualsplit")).toHaveAttribute(
    "data-thread-active",
    "true"
  );
  await expect(
    page
      .locator("#study-visualsplit [data-thread-context='study']")
      .getByText("01 Interpretable image representations")
  ).toBeVisible();

  const rail = page.locator('[data-thread-rail][data-active-thread="interpretable-representations"]');
  await expect(rail).toHaveCount(1);
  await expect(rail.locator('[aria-current="location"]')).toContainText(
    "VisualSplit"
  );

  await page
    .locator("#study-visualsplit [data-thread-stage='publication']")
    .click();
  await expect(page).toHaveURL(
    /\?thread=interpretable-representations#publication-visualsplit$/
  );
  await expect(publicationRow(page, "visualsplit")).toHaveAttribute(
    "data-thread-active",
    "true"
  );
  await expect(rail.locator('[aria-current="location"]')).toContainText(
    "BMVC 2025"
  );

  await publicationRow(page, "visualsplit")
    .locator('[data-open-publication-spotlight="visualsplit"]')
    .click();
  await expect(page).toHaveURL(/thread=interpretable-representations/);
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/thread=interpretable-representations/);
});

test("a shared VisualSplit target restores the explicitly selected thread", async ({
  page
}) => {
  await page.goto("/?thread=generative-vision#study-visualsplit");

  await expect(page.locator("#thread-generative-vision")).toHaveAttribute(
    "aria-current",
    "location"
  );
  await expect(page.locator("#study-visualsplit")).toHaveAttribute(
    "data-thread-active",
    "true"
  );
  await expect(page.locator('[data-thread-rail]')).toHaveAttribute(
    "data-active-thread",
    "generative-vision"
  );
});

test("publication actions expose citation copy and BibTeX", async ({ context, page }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#research");

  const publication = publicationRow(page, "visualsplit");
  await publication.scrollIntoViewIfNeeded();
  const copyButton = publication.getByRole("button", { name: /copy citation/i });
  await copyButton.hover();

  const preview = page.locator('[data-citation-preview="visualsplit"]');
  await expect(preview).toContainText("Will copy citation text");
  await copyButton.click();
  await expect(page.locator('[data-citation-toast="visualsplit"]')).toContainText(
    "Citation copied to clipboard"
  );

  await publication.getByRole("button", { name: "BibTeX" }).click();
  await expect(publication.locator("pre code")).toContainText("@inproceedings{Qu_2025_BMVC");
});

test("reviewed author and organisation links remain available", async ({ page }) => {
  await page.goto("/#research");

  const visualsplit = publicationRow(page, "visualsplit");
  await expect(visualsplit.getByRole("link", { name: "Hao Chen" })).toHaveAttribute(
    "href",
    "https://h-chen.com/"
  );
  await expect(visualsplit.getByRole("link", { name: "Jianbo Jiao" })).toHaveAttribute(
    "href",
    "https://jianbojiao.com/"
  );
  await expect(publicationRow(page, "x360").getByRole("link", { name: "UBIRA eData" })).toHaveAttribute(
    "href",
    "https://edata.bham.ac.uk/1078/"
  );

  const journey = page.locator("#journey");
  await expect(journey.getByRole("link", { name: "Allsee" })).toHaveAttribute(
    "href",
    "https://www.allsee-tech.com/"
  );
  await expect(journey.getByRole("link", { name: "Vieunite" })).toHaveAttribute(
    "href",
    "https://vieunite.com/"
  );
});

test("journey preserves academic and industry role progression", async ({ page }) => {
  await page.goto("/#journey");
  const journey = page.locator("#journey");

  await expect(journey.getByRole("heading", { name: "Research appointments" })).toBeVisible();
  await expect(journey.getByRole("heading", { name: "Industry experience" })).toBeVisible();
  await expect(journey.locator('[data-timeline-role="Research Assistant"]')).toHaveCount(2);
  await expect(journey.locator('[data-timeline-role="Head of Technologies"]')).toContainText(
    "Dec 2024 — Present"
  );
  await expect(journey.locator('[data-timeline-role="Full-stack Engineer"]')).toContainText(
    "Dec 2023 — Dec 2024"
  );
  await expect(journey.getByText("Master's Study", { exact: true })).toBeVisible();
});

test("updates retain recent items and an earlier archive", async ({ page }) => {
  await page.goto("/#updates");
  const updates = page.locator("#updates");

  await expect(updates.getByText("5 May 2026")).toBeVisible();
  await expect(
    updates.getByRole("heading", { name: "VisualSplit accepted to BMVC 2025" })
  ).toBeVisible();

  await updates.locator("details summary").click();
  await expect(
    updates.getByRole("heading", {
      name: "360+x selected for a CVPR 2024 oral presentation"
    })
  ).toBeVisible();
  await expect(updates.getByText("Started my PhD in the MI X group")).toBeVisible();
});

test("contact keeps personal, work, and university email routes", async ({ page }) => {
  await page.goto("/#contact");
  const contact = page.locator("#contact");

  await expect(contact.getByRole("link", { name: "Chenyuan.Qu@outlook.com" })).toHaveAttribute(
    "href",
    "mailto:Chenyuan.Qu@outlook.com"
  );
  await expect(contact.getByRole("link", { name: "henry.qu@allsee-tech.com" })).toHaveAttribute(
    "href",
    "mailto:henry.qu@allsee-tech.com"
  );
  await expect(contact.getByRole("link", { name: "henry.qu@vieunite.com" })).toHaveAttribute(
    "href",
    "mailto:henry.qu@vieunite.com"
  );
  await expect(contact.getByRole("link", { name: "cxq134@student.bham.ac.uk" })).toHaveAttribute(
    "href",
    "mailto:cxq134@student.bham.ac.uk"
  );

  const structuredData = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
  expect(structuredData).toContain("Chenyuan.Qu@outlook.com");
  expect(structuredData).not.toContain("henry.qu@allsee-tech.com");
  expect(structuredData).not.toContain("cxq134@student.bham.ac.uk");
});

test("publication detail previews retain a functional fallback URL", async ({ page }) => {
  await page.goto("/#research");
  const detailLink = publicationRow(page, "visualsplit").locator(
    '[data-open-publication-spotlight="visualsplit"]'
  );

  await expect(detailLink).toHaveAttribute(
    "href",
    "https://chenyuanqu.com/VisualSplit/"
  );
  await detailLink.click();
  await expect(page.locator('[data-publication-spotlight="visualsplit"]')).toBeVisible();
});

test.describe("progressive fallbacks", () => {
  test.use({ javaScriptEnabled: false });

  test("time and research controls remain meaningful without hydration", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#birmingham-local-time")).toHaveText(
      "Birmingham · local time"
    );
    await expect(page.locator("#birmingham-local-time")).not.toContainText("--:--");
    await expect(
      page.getByRole("link", { name: "Open figure: VisualSplit overview" })
    ).toHaveAttribute("href", "/images/projects/visualsplit-framework.webp");
    await expect(
      page.locator("#thread-interpretable-representations")
    ).toHaveAttribute(
      "href",
      "/?thread=interpretable-representations#study-visualsplit"
    );
    await expect(
      publicationRow(page, "visualsplit").locator(
        '[data-open-publication-spotlight="visualsplit"]'
      )
    ).toHaveAttribute("href", "https://chenyuanqu.com/VisualSplit/");
  });
});

test("publication spotlight opens from its explicit control and closes with Escape", async ({
  page
}) => {
  await page.goto("/#research");
  const publication = publicationRow(page, "x360");
  await expect(
    publication.locator('[data-publication-recognition="x360"]')
  ).toHaveText("Oral paper");
  await publication.locator('[data-open-publication-spotlight="x360"]').click();

  await expect(page).toHaveURL(/spotlight=x360/);
  const spotlight = page.locator('[data-publication-spotlight="x360"]');
  await expect(spotlight).toBeVisible();
  await expect(
    spotlight.locator('[data-publication-recognition="x360"]')
  ).toHaveText("Oral paper");
  await page.keyboard.press("Escape");
  await expect(page.locator('[data-publication-spotlight="x360"]')).toHaveCount(0);
  await expect(page.locator('[data-modal-layer="1"]')).toHaveCount(0);
  await expect(page.locator("main [inert]")).toHaveCount(0);
  await expect(page).not.toHaveURL(/spotlight=/);

  await page.goBack();
  await expect(page.locator('[data-modal-layer="1"]')).toHaveCount(0);
  await expect(page).not.toHaveURL(/spotlight=/);

  await page.getByRole("link", { name: "Experience", exact: true }).click();
  await expect(page).toHaveURL(/#journey/);
});

test("spotlight control supports keyboard interaction", async ({ page }) => {
  await page.goto("/#research");
  const openButton = publicationRow(page, "med").locator(
    '[data-open-publication-spotlight="med"]'
  );
  await openButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-publication-spotlight="med"]')).toBeVisible();
});

test("DIFF keeps its official pipeline figure in the index and spotlight", async ({ page }) => {
  await page.goto("/#research");
  const publication = publicationRow(page, "diff");
  await publication.scrollIntoViewIfNeeded();

  const previewImage = publication.locator("img").first();
  await expect(previewImage).toBeVisible();
  await expect(
    previewImage.evaluate((image) => (image as HTMLImageElement).naturalWidth > 0)
  ).resolves.toBeTruthy();

  await publication.locator('[data-open-publication-spotlight="diff"]').click();
  await expect(page.locator('[data-spotlight-media-id="diff-pipeline"]')).toBeVisible();
});

test("nested publication links do not open the spotlight", async ({ page }) => {
  await page.goto("/#research");
  const publication = publicationRow(page, "visualsplit");
  const popupPromise = page.waitForEvent("popup");
  await publication.getByRole("link", { name: "Project", exact: true }).click();
  const popup = await popupPromise;

  await expect(page.locator('[data-publication-spotlight="visualsplit"]')).toHaveCount(0);
  await popup.close();
});

test("lightbox navigates local poster and video media", async ({ page }) => {
  await page.goto("/?spotlight=x360");
  await expect(page.locator('[data-publication-spotlight="x360"]')).toBeVisible();

  await page.getByRole("button", { name: /cvpr 2024 poster/i }).click();
  await expect(page.locator('[data-lightbox-media-id="x360-poster"]')).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator('[data-lightbox-media-id="x360-overview"]')).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(page.locator('[data-publication-spotlight="x360"]')).toBeVisible();
  await page.getByRole("button", { name: /project teaser video/i }).click();
  await expect(page.locator('[data-lightbox-media-id="x360-video"]')).toBeVisible();
  const video = page.locator('[data-lightbox-media-kind="video"] video');
  await expect(video).toBeVisible();
  await video.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-lightbox-media-id="x360-video"]')).toBeVisible();

  await page
    .locator('[data-lightbox-backdrop="true"]')
    .getByRole("button", { name: /close media lightbox/i })
    .focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-lightbox-media-id="x360-overview"]')).toBeVisible();
  await expect(
    page
      .locator('[data-lightbox-backdrop="true"]')
      .getByRole("button", { name: /close media lightbox/i })
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator('[data-lightbox-backdrop="true"]')).toHaveCount(0);
  await expect(page.locator('[data-publication-spotlight="x360"]')).toBeVisible();
});

test("VisualSplit spotlight exposes project resources", async ({ page }) => {
  await page.goto("/?spotlight=visualsplit");
  const spotlight = page.locator('[data-publication-spotlight="visualsplit"]');

  await expect(spotlight.getByRole("link", { name: "Poster" })).toHaveAttribute(
    "href",
    "https://chenyuanqu.com/VisualSplit/docs/posters/0873_poster.pdf"
  );
  await expect(spotlight.getByRole("link", { name: "Presentation" })).toHaveAttribute(
    "href",
    "https://chenyuanqu.com/VisualSplit/videos/presentation/0873_presentation_1080p.mp4"
  );
  await expect(spotlight.getByRole("link", { name: "Examples" })).toHaveAttribute(
    "href",
    "https://chenyuanqu.com/VisualSplit/colour-map-examples/"
  );
});

test("homepage has no serious or critical automated accessibility violations", async ({
  page
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  const blocking = results.violations.filter(({ impact }) =>
    impact === "serious" || impact === "critical"
  );
  expect(blocking).toEqual([]);
});

test("reduced-motion mode keeps offscreen content readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const researchTitle = page.locator("#research h2");
  await expect(researchTitle).toBeVisible();
  await expect(researchTitle).toHaveCSS("opacity", "1");
  await expect(publicationRow(page, "med")).toHaveCSS("opacity", "1");
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("navigation supports Escape, anchors, and a no-overflow layout", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Open navigation menu" });

    await menuButton.click();
    const mobileDialog = page.getByRole("dialog", { name: "Navigation" });
    await expect(mobileDialog).toBeVisible();
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await expect(
      mobileDialog.getByRole("button", { name: "Close navigation menu" })
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(mobileDialog).toHaveCount(0);
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
    await expect(menuButton).toBeFocused();

    await menuButton.click();
    await page.getByRole("dialog", { name: "Navigation" }).getByRole("link", { name: "Publications" }).click();
    await expect(page).toHaveURL(/#research/);

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth
    }));
    expect(overflow.body).toBeLessThanOrEqual(overflow.viewport);
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
  });

  test("spotlight and citation interactions fit the mobile viewport", async ({ context, page }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/#research");
    const publication = publicationRow(page, "visualsplit");
    await publication.scrollIntoViewIfNeeded();

    await publication.getByRole("button", { name: /copy citation/i }).click();
    await expect(page.locator('[data-citation-toast="visualsplit"]')).toBeVisible();

    await publication.locator('[data-open-publication-spotlight="visualsplit"]').click();
    const dialog = page.locator('[data-publication-spotlight="visualsplit"]');
    await expect(dialog).toBeVisible();

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth
    }));
    expect(overflow.body).toBeLessThanOrEqual(overflow.viewport);
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
  });

  test("figure lens remains operable on touch-sized screens", async ({ page }) => {
    await page.goto("/#work");
    await page
      .getByRole("link", { name: "Open figure: VisualSplit overview" })
      .click();

    const lens = page.locator('[data-research-lens="visualsplit"]');
    await expect(lens).toBeVisible();
    await lens.getByRole("tab", { name: /Colour/ }).click();
    await expect(lens).toHaveAttribute("data-active-lens-step", "colour");
    await expect(lens.locator('[data-lens-note="colour"]')).toContainText(
      "Soft K-means"
    );

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth
    }));
    expect(overflow.body).toBeLessThanOrEqual(overflow.viewport);
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
  });

  test("standalone datasets remain discoverable", async ({ page }) => {
    await page.goto("/#research");
    await expect(page.getByRole("heading", { name: "BinEgo-360" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "text-to-art-database" })).toBeVisible();
  });
});
