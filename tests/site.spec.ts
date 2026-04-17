import { expect, test } from "@playwright/test";

test("homepage loads key content and assets without horizontal overflow", async ({
  page
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Chenyuan Qu" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Publications & Datasets"
    })
  ).toBeVisible();
  await expect(page.getByText("Tech Lead in AI/ML · PhD Student")).toBeVisible();
  await expect(page.getByText("Allsee · Vieunite · University of Birmingham")).toBeVisible();
  await expect(
    page.locator("#about").getByRole("link", { name: "Hugging Face" })
  ).toBeVisible();
  await expect(
    page
      .locator("#selected-publications")
      .getByText("Diffusion Features to Bridge Domain Gap for Semantic Segmentation")
  ).toHaveCount(0);

  const heroImage = page.locator("#about img").nth(1);
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

test("anchor navigation lands publications content below the fixed header", async ({
  page
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Publications & Datasets" }).click();

  await expect(page).toHaveURL(/#publications/);

  const headingBox = await page.locator("#publications h2").boundingBox();
  expect(headingBox?.y ?? 0).toBeGreaterThan(40);
});

test("publication actions expose citation copy and BibTeX", async ({
  context,
  page
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");

  const publication = page.locator(
    '[data-publication-slug="visualsplit"][data-publication-variant="full"]'
  );
  await publication.scrollIntoViewIfNeeded();

  const copyButton = publication.getByRole("button", {
    name: /copy citation/i
  });
  await copyButton.click();
  await expect(copyButton).toContainText("Copied");

  await publication.getByRole("button", { name: "BibTeX" }).click();
  await expect(publication.locator("pre code")).toContainText(
    "@inproceedings{Qu_2025_BMVC"
  );
});

test("contact section shows all email addresses while hero and structured data keep the primary academic email", async ({
  page
}) => {
  await page.goto("/#contact");

  const contact = page.locator("#contact");
  await expect(
    contact.getByRole("link", { name: "henry.qu@allsee-tech.com" })
  ).toHaveAttribute("href", "mailto:henry.qu@allsee-tech.com");
  await expect(
    contact.getByRole("link", { name: "henry.qu@vieunite.com" })
  ).toHaveAttribute("href", "mailto:henry.qu@vieunite.com");
  await expect(
    contact.getByRole("link", { name: "cxq134@student.bham.ac.uk" })
  ).toHaveAttribute("href", "mailto:cxq134@student.bham.ac.uk");
  await expect(
    contact.getByRole("link", { name: "Chenyuan.Qu@outlook.com" })
  ).toHaveAttribute("href", "mailto:Chenyuan.Qu@outlook.com");

  const heroEmail = page.locator("#about").getByRole("link", { name: "Email" });
  await expect(heroEmail).toHaveCount(1);
  await expect(heroEmail).toHaveAttribute("href", "mailto:cxq134@student.bham.ac.uk");

  const structuredDataText = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();

  expect(structuredDataText).toContain('"email":"cxq134@student.bham.ac.uk"');
  expect(structuredDataText).not.toContain("henry.qu@allsee-tech.com");
  expect(structuredDataText).not.toContain("henry.qu@vieunite.com");
  expect(structuredDataText).not.toContain("Chenyuan.Qu@outlook.com");
});

test("selected publication row opens spotlight and closes with Escape", async ({
  page
}) => {
  await page.goto("/");

  const publication = page.locator(
    '[data-publication-slug="x360"][data-publication-variant="selected"]'
  );
  await publication.click();

  await expect(page).toHaveURL(/spotlight=x360/);
  await expect(page.locator('[data-publication-spotlight="x360"]')).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.locator('[data-publication-spotlight="x360"]')).toHaveCount(0);
  await expect(page).not.toHaveURL(/spotlight=/);
});

test("full publication row and keyboard interaction open spotlight", async ({
  page
}) => {
  await page.goto("/#publications");

  const publication = page.locator(
    '[data-publication-slug="med"][data-publication-variant="full"]'
  );
  await publication.scrollIntoViewIfNeeded();
  await publication.click();

  await expect(page.locator('[data-publication-spotlight="med"]')).toBeVisible();
  await page.keyboard.press("Escape");

  await publication.locator('[role="button"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-publication-spotlight="med"]')).toBeVisible();
});

test("DIFF publication uses the official pipeline figure in archive and spotlight", async ({
  page
}) => {
  await page.goto("/#publications");

  const publication = page.locator(
    '[data-publication-slug="diff"][data-publication-variant="full"]'
  );
  await publication.scrollIntoViewIfNeeded();

  const previewImage = publication.locator("img").first();
  await expect(previewImage).toBeVisible();
  await expect(
    previewImage.evaluate((image) => (image as HTMLImageElement).naturalWidth > 0)
  ).resolves.toBeTruthy();

  await publication.click();
  await expect(page.locator('[data-publication-spotlight="diff"]')).toBeVisible();
  await expect(page.locator('[data-spotlight-media-id="diff-pipeline"]')).toBeVisible();
});

test("nested links remain clickable without opening spotlight", async ({
  page
}) => {
  await page.goto("/#publications");

  const publication = page.locator(
    '[data-publication-slug="visualsplit"][data-publication-variant="full"]'
  );
  await publication.scrollIntoViewIfNeeded();

  const popupPromise = page.waitForEvent("popup");
  await publication.getByRole("link", { name: "Project" }).click();
  const popup = await popupPromise;

  await popup.waitForLoadState("domcontentloaded");
  await expect(page.locator('[data-publication-spotlight="visualsplit"]')).toHaveCount(0);
  await popup.close();
});

test("lightbox opens local poster media and video media", async ({
  page
}) => {
  await page.goto("/?spotlight=x360");

  await expect(page.locator('[data-publication-spotlight="x360"]')).toBeVisible();
  await page.getByRole("button", { name: /cvpr 2024 poster/i }).click();

  await expect(page).toHaveURL(/media=x360-poster/);
  await expect(page.locator('[data-lightbox-media-id="x360-poster"]')).toBeVisible();

  await page.keyboard.press("ArrowLeft");
  await expect(page.locator('[data-lightbox-media-id="x360-overview"]')).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.locator('[data-lightbox-media-id="x360-overview"]')).toHaveCount(0);
  await expect(page.locator('[data-publication-spotlight="x360"]')).toBeVisible();

  await page.getByRole("button", { name: /project teaser video/i }).click();
  await expect(page).toHaveURL(/media=x360-video/);
  await expect(page.locator('[data-lightbox-media-id="x360-video"]')).toBeVisible();
  await expect(page.locator('[data-lightbox-media-kind="video"] video')).toBeVisible();
});

test("image lightbox closes when clicking outside the visible media panel", async ({
  page
}) => {
  await page.goto("/?spotlight=x360");

  await expect(page.locator('[data-publication-spotlight="x360"]')).toBeVisible();
  await page.getByRole("button", { name: /cvpr 2024 poster/i }).click();

  const panel = page.locator('[data-lightbox-panel="image"]');
  await expect(panel).toBeVisible();

  const panelBox = await panel.boundingBox();
  expect(panelBox).not.toBeNull();

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();

  const clickX = (panelBox?.x ?? 0) + (panelBox?.width ?? 0) / 2;
  const clickY =
    (panelBox?.y ?? 0) > 48
      ? (panelBox?.y ?? 0) - 20
      : Math.min(
          (viewport?.height ?? 0) - 20,
          (panelBox?.y ?? 0) + (panelBox?.height ?? 0) + 20
        );

  await page.mouse.click(clickX, clickY);

  await expect(page.locator('[data-lightbox-media-id="x360-poster"]')).toHaveCount(0);
  await expect(page.locator('[data-publication-spotlight="x360"]')).toBeVisible();
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile menu toggles and layout avoids overflow", async ({ page }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", {
      name: "Open navigation menu"
    });
    await menuButton.click();
    await expect(
      page.getByRole("link", { name: "Publications & Datasets" })
    ).toBeVisible();
    await page.getByRole("link", { name: "Publications & Datasets" }).click();
    await expect(page).toHaveURL(/#publications/);

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth
    }));

    expect(overflow.body).toBeLessThanOrEqual(overflow.viewport);
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
  });

  test("mobile spotlight opens without horizontal overflow", async ({ page }) => {
    await page.goto("/#publications");

    const publication = page.locator(
      '[data-publication-slug="med"][data-publication-variant="full"]'
    );
    await publication.scrollIntoViewIfNeeded();
    await publication.click();

    const dialog = page.locator('[data-publication-spotlight="med"]');
    await expect(dialog).toBeVisible();

    const dialogBox = await dialog.boundingBox();
    expect(dialogBox?.width ?? 0).toBeGreaterThan(340);

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth
    }));

    expect(overflow.body).toBeLessThanOrEqual(overflow.viewport);
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
  });

  test("datasets section includes the Hugging Face text-to-art dataset", async ({
    page
  }) => {
    await page.goto("/#publications");
    await expect(page.getByRole("heading", { level: 3, name: "Datasets" })).toBeVisible();
    await expect(page.getByText("text-to-art-database")).toBeVisible();
  });
});
