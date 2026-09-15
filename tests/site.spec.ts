import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const paper = (page: Page, slug: string) =>
  page.locator(`#publication-${slug}`);
const poster = (page: Page) => page.locator(".portrait-poster");

async function checkOverflow(page: Page) {
  const size = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(size.document).toBeLessThanOrEqual(size.viewport);
  expect(size.body).toBeLessThanOrEqual(size.viewport);
}

test("the introduction leads with the person and an invitation to see the work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Chenyuan Qu." }),
  ).toBeVisible();
  await expect(page.getByText("You can call me Henry.")).toBeVisible();
  await expect(
    page.getByText(
      "I’m interested in how we see, how images are made, and what happens when we start playing with them.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toHaveAttribute("href", "#enterprise");
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "A few things I’ve made.",
    "There’s more to an image.",
    "Still looking. Still learning.",
    "Let’s compare notes.",
  ]);
  await expect(page.locator(".cq-art-controls")).toHaveText(
    /EditorialGalleryCinema/,
  );
  await expect(
    page.getByText(/自动切换|每6秒|查看背景|Every 6 seconds|View background/i),
  ).toHaveCount(0);
  await expect(page.locator(".hero")).not.toContainText(
    /applied AI engineer|Head of Technologies|200,000/i,
  );
  expect(errors).toEqual([]);
});

for (const size of [
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 390, height: 844 },
  { width: 320, height: 800 },
]) {
  test(`the layout stays readable at ${size.width} × ${size.height}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(size);
    await page.goto("/");
    await page.getByRole("button", { name: "Editorial", exact: true }).click();
    await page.getByRole("link", { name: "Chenyuan Qu, back to top" }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page
          .locator(".cq-person img")
          .evaluate((image: HTMLImageElement) => image.naturalWidth),
      )
      .toBeGreaterThan(0);
    await checkOverflow(page);
    if (size.width > 320) {
      const height = await page
        .locator(".hero")
        .evaluate((element) => element.getBoundingClientRect().height);
      expect(height).toBeLessThanOrEqual(size.height + 1);
    }
    const controls = await page.locator(".cq-art-controls").boundingBox();
    const footer = await page.locator(".hero-foot").boundingBox();
    expect(controls!.y + controls!.height).toBeLessThanOrEqual(footer!.y);
    await page.screenshot({
      path: testInfo.outputPath("homepage.png"),
      animations: "disabled",
    });
    for (const section of ["enterprise", "research", "journey", "contact"]) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await checkOverflow(page);
    }
    await page.locator(".other-emails > summary").click();
    await checkOverflow(page);
  });
}

test("navigation reaches each section beneath the fixed header", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [label, id] of [
    ["Work", "enterprise"],
    ["Research", "research"],
    ["About", "journey"],
    ["Say hello", "contact"],
  ]) {
    await page
      .getByRole("navigation", { name: "Primary", exact: true })
      .getByRole("link", { name: label })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    const heading = await page.locator(`#${id} h2`).boundingBox();
    const header = await page.locator(".site-header").boundingBox();
    expect(heading!.y).toBeGreaterThan(header!.height);
    await expect(
      page
        .getByRole("navigation", { name: "Primary", exact: true })
        .getByRole("link", { name: label }),
    ).toHaveAttribute("aria-current", "location");
  }
});

test("portrait style choices work with keyboard and stop rotation", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Gallery", exact: true }).click();
  await expect(poster(page)).toHaveAttribute("data-style", "gallery");
  await expect(
    page.getByRole("button", { name: "Resume portrait rotation" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Cinema", exact: true }),
  ).toBeFocused();
  await expect(poster(page)).toHaveAttribute("data-style", "cinema");
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("button", { name: "Editorial", exact: true }),
  ).toBeFocused();
  await expect(poster(page)).toHaveAttribute("data-style", "editorial");
  await expect(poster(page)).toHaveAttribute("data-playing", "false");
});

test("the progress control cycles all styles and pauses without resetting the selected portrait", async ({
  page,
}) => {
  test.setTimeout(35000);
  await page.goto("/");
  await page.getByRole("button", { name: "Editorial", exact: true }).click();
  await page.getByRole("button", { name: "Resume portrait rotation" }).click();
  await expect(poster(page)).toHaveAttribute("data-style", "gallery", {
    timeout: 7500,
  });
  await expect(poster(page)).toHaveAttribute("data-style", "cinema", {
    timeout: 7500,
  });
  await expect(poster(page)).toHaveAttribute("data-style", "editorial", {
    timeout: 7500,
  });
  await page.getByRole("button", { name: "Pause portrait rotation" }).click();
  await page.waitForTimeout(6500);
  await expect(poster(page)).toHaveAttribute("data-style", "editorial");
  await expect(
    page.getByRole("button", { name: "Resume portrait rotation" }),
  ).toBeVisible();
});

test("the portrait holds its place while the reader is further down the page", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Gallery", exact: true }).click();
  await page.getByRole("button", { name: "Resume portrait rotation" }).click();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".cq-cycle-progress")
        .evaluate((element) => element.getAnimations().length),
    )
    .toBe(0);
  await page.waitForTimeout(6500);
  await expect(poster(page)).toHaveAttribute("data-style", "gallery");
});

test("reduced motion starts with a still portrait and keeps every section readable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Resume portrait rotation" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Gallery", exact: true }).click();
  await expect(poster(page)).toHaveAttribute("data-style", "gallery");
  await page.locator(".cq-poster").hover({ position: { x: 30, y: 30 } });
  await expect
    .poll(() =>
      poster(page).evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--cq-person-x").trim(),
      ),
    )
    .toBe("0px");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: "Let’s compare notes." }),
  ).toBeVisible();
});

test("the selected work can be explored without a mouse and retains the scope of results", async ({
  page,
}) => {
  await page.goto("/#enterprise");
  await expect(page.getByRole("tab", { name: "01 COMPaD" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.getByRole("tab", { name: "02 Nexus" }).click();
  const nexus = page.getByRole("tabpanel", { name: "02 Nexus" });
  await expect(nexus).toContainText("200,000+");
  await expect(nexus).toContainText("devices managed");
  await expect(nexus.locator(".work-outcome")).not.toBeVisible();
  await nexus.locator("summary").click();
  await expect(nexus.locator(".work-outcome")).toBeVisible();
  await expect(nexus).toContainText("1,000 organisations and 50,000 users");
  await page.getByRole("tab", { name: "02 Nexus" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "03 Everyday tools" }),
  ).toBeFocused();
  const assistant = page.getByRole("tabpanel", { name: "03 Everyday tools" });
  await expect(assistant.getByRole("heading")).toHaveText(
    "A little less busywork.",
  );
  await expect(assistant).toContainText("less time on the tasks we tested");
  await assistant.locator("summary").click();
  await expect(assistant).toContainText("99% fewer manual mistakes");
  await expect(assistant).toContainText(
    "Those results describe the tasks tested",
  );
  await page.getByRole("tab", { name: "03 Everyday tools" }).press("Home");
  const compad = page.getByRole("tabpanel", { name: "01 COMPaD" });
  await expect(compad).toContainText("In alpha");
  await compad.locator("summary").click();
  await expect(compad).toContainText("first-stage alpha testing");
  await expect(
    compad.getByRole("group", {
      name: "Editable COMPaD poster demo",
      exact: true,
    }),
  ).toBeVisible();
  await checkOverflow(page);
});

test("COMPaD leads the work section while its three posters rotate and retain edits", async ({
  page,
}) => {
  test.setTimeout(35000);
  await page.goto("/#enterprise");
  const demo = page.getByRole("group", {
    name: "Editable COMPaD poster demo",
    exact: true,
  });
  const canvas = page.locator(".compad-paper");
  await expect(
    page.getByRole("tablist", { name: "Selected work" }).getByRole("tab"),
  ).toHaveText(["01COMPaD", "02Nexus", "03Everyday tools"]);
  await expect(demo).toHaveAttribute("data-playing", "true");
  await expect
    .poll(() =>
      page
        .locator(".compad-cycle-progress")
        .evaluate((element) => element.getAnimations().length),
    )
    .toBe(1);
  await page
    .getByRole("textbox", { name: "Poster headline", exact: true })
    .fill("Grow");
  await expect(demo).toHaveAttribute("data-playing", "false");
  await page
    .getByRole("button", { name: "Resume poster rotation", exact: true })
    .click();
  // A visible playback button can still leave most of the poster offscreen.
  await canvas.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      page
        .locator(".compad-cycle-progress")
        .evaluate((element) => element.getAnimations().length),
    )
    .toBe(1);
  const height = (await canvas.boundingBox())!.height;
  for (const design of ["form", "city", "bloom"]) {
    await expect(canvas).toHaveAttribute("data-design", design, {
      timeout: 7500,
    });
    await expect(
      page.getByRole("tab", { name: "01 COMPaD", exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    expect((await canvas.boundingBox())!.height).toBeCloseTo(height, 0);
  }
  await page
    .getByRole("button", { name: "Pause poster rotation", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Poster headline", exact: true }),
  ).toHaveValue("Grow");
  await page.waitForTimeout(6500);
  await expect(canvas).toHaveAttribute("data-design", "bloom");
});

test("poster rotation holds while hovered or hidden and stops for editing", async ({
  page,
}) => {
  test.setTimeout(35000);
  await page.goto("/#enterprise");
  const demo = page.getByRole("group", {
    name: "Editable COMPaD poster demo",
    exact: true,
  });
  const canvas = page.locator(".compad-paper");
  const progress = page.locator(".compad-cycle-progress");
  await canvas.hover();
  await expect
    .poll(() => progress.evaluate((element) => element.getAnimations().length))
    .toBe(0);
  await page.waitForTimeout(6500);
  await expect(canvas).toHaveAttribute("data-design", "bloom");
  await page.mouse.move(0, 0);
  await expect
    .poll(() => progress.evaluate((element) => element.getAnimations().length))
    .toBe(1);
  await page.getByRole("tab", { name: "02 Nexus", exact: true }).click();
  await expect
    .poll(() => progress.evaluate((element) => element.getAnimations().length))
    .toBe(0);
  await page.waitForTimeout(6500);
  await expect(canvas).toHaveAttribute("data-design", "bloom");
  await page.getByRole("tab", { name: "01 COMPaD", exact: true }).click();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect
    .poll(() => progress.evaluate((element) => element.getAnimations().length))
    .toBe(0);
  await page.waitForTimeout(6500);
  await expect(canvas).toHaveAttribute("data-design", "bloom");
  await demo.scrollIntoViewIfNeeded();
  await page
    .getByRole("textbox", { name: "Poster headline", exact: true })
    .fill("Stay");
  await expect(demo).toHaveAttribute("data-playing", "false");
  await page.mouse.move(0, 0);
  await page.waitForTimeout(6500);
  await expect(canvas).toHaveAttribute("data-design", "bloom");
  await page
    .getByRole("button", { name: "Resume poster rotation", exact: true })
    .click();
  await expect
    .poll(() => progress.evaluate((element) => element.getAnimations().length))
    .toBe(1);
});

test("poster rotation respects reduced motion and manual selection", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#enterprise");
  await expect(
    page.getByRole("button", { name: "Resume poster rotation", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "02 Form & space", exact: true })
    .click();
  await expect(page.locator(".compad-paper")).toHaveAttribute(
    "data-design",
    "form",
  );
  await expect(
    page.getByRole("group", {
      name: "Editable COMPaD poster demo",
      exact: true,
    }),
  ).toHaveAttribute("data-playing", "false");
});

test("VisualSplit reveals real results with a draggable and keyboard-accessible comparison", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#study-visualsplit");
  const study = page.locator(".visualsplit-study");
  const slider = study.getByRole("slider", {
    name: "Compare original and VisualSplit result",
  });
  const images = study.locator(".visualsplit-images");
  await expect(study).toHaveAttribute("data-ready", "true");
  await images.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      images
        .locator("img")
        .evaluateAll((items) =>
          items.every(
            (item) =>
              (item as HTMLImageElement).complete &&
              (item as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await expect(study.locator(".visualsplit-result img")).toHaveAttribute(
    "src",
    /egret-result.webp$/,
  );
  await slider.focus();
  await slider.press("Home");
  await expect(slider).toHaveValue("0");
  await expect(study.locator(".visualsplit-result")).toHaveCSS(
    "clip-path",
    "inset(0px 0px 0px 0%)",
  );
  const result = await images.screenshot();
  await slider.press("End");
  await expect(slider).toHaveValue("100");
  await expect(study.locator(".visualsplit-result")).toHaveCSS(
    "clip-path",
    "inset(0px 0px 0px 100%)",
  );
  expect((await images.screenshot()).equals(result)).toBe(false);
  const bounds = (await slider.boundingBox())!;
  await page.mouse.move(
    bounds.x + bounds.width * 0.75,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width * 0.25,
    bounds.y + bounds.height / 2,
    { steps: 8 },
  );
  await page.mouse.up();
  expect(Number(await slider.inputValue())).toBeGreaterThan(15);
  expect(Number(await slider.inputValue())).toBeLessThan(35);
  await checkOverflow(page);
});

test("VisualSplit switches complete experiments and pairs each lighting result with its histogram", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#study-visualsplit");
  const study = page.locator(".visualsplit-study");
  const colourTab = study.getByRole("tab", { name: "Colour", exact: true });
  const lightTab = study.getByRole("tab", { name: "Light", exact: true });
  await colourTab.focus();
  await colourTab.press("ArrowRight");
  await expect(lightTab).toBeFocused();
  await expect(lightTab).toHaveAttribute("aria-selected", "true");
  await expect(study.getByRole("tabpanel")).toHaveAccessibleName("Light");
  for (const [label, filename] of [
    ["Darker", "dark"],
    ["Balanced", "balanced"],
    ["Brighter", "bright"],
  ]) {
    await study.getByRole("button", { name: label, exact: true }).click();
    await expect(study.locator(".visualsplit-result img")).toHaveAttribute(
      "src",
      new RegExp(`valley-${filename}\\.webp$`),
    );
    await expect(study.locator(".visualsplit-histogram img")).toHaveAttribute(
      "src",
      new RegExp(`valley-histogram-${filename}\\.webp$`),
    );
    await expect
      .poll(() =>
        study
          .locator(".visualsplit-result img")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth === 512,
          ),
      )
      .toBe(true);
    await checkOverflow(page);
  }
  await lightTab.focus();
  await lightTab.press("End");
  await expect(
    study.getByRole("tab", { name: "Rebuild", exact: true }),
  ).toBeFocused();
  await expect(study.locator(".visualsplit-result img")).toHaveAttribute(
    "src",
    /dog-result.webp$/,
  );
  await expect(async () => {
    const picture = (await study.locator(".visualsplit-images").boundingBox())!;
    const tabs = (await study.getByRole("tablist").boundingBox())!;
    expect(
      picture.y,
      "New picture starts below the sticky tabs",
    ).toBeGreaterThanOrEqual(tabs.y + tabs.height - 1);
    expect(
      picture.y + picture.height,
      "New picture fits in the viewport",
    ).toBeLessThanOrEqual(page.viewportSize()!.height);
  }).toPass({ timeout: 5000 });
  await expect(
    study.locator(".visualsplit-ingredient-images figcaption"),
  ).toHaveText(["Shape", "Colour", "Light"]);
  await checkOverflow(page);
  await study.getByRole("tab", { name: "Rebuild", exact: true }).press("Home");
  await expect(colourTab).toBeFocused();
  await expect(study.getByRole("slider")).toHaveValue("40");
  await expect(study.locator(".visualsplit-ingredient-images img")).toHaveCount(
    2,
  );
  expect(errors).toEqual([]);
});

test("360+x opens inside the scene and supports keyboard, dragging and reset", async ({
  page,
}) => {
  await page.goto("/#research");
  await expect(page.locator("#study-visualsplit")).toContainText(
    "BMVC 2025 · First author",
  );
  await expect(page.locator("#study-x360")).toContainText(
    "CVPR 2024 · Oral paper · Co-author",
  );
  const viewer = page.getByRole("group", {
    name: "Interactive 360+x panorama",
    exact: true,
  });
  await viewer.scrollIntoViewIfNeeded();
  await expect(viewer).toHaveAttribute("data-ready", "true", {
    timeout: 15000,
  });
  const surface = viewer.locator("canvas");
  // Compare the rendered scene independently of pointer/keyboard focus styling.
  const capture = () =>
    surface.screenshot({
      style: ".panorama-surface { outline: none !important; }",
    });
  await expect(surface).toHaveAccessibleName(
    "Inside the 360+x museum panorama",
  );
  await expect(
    viewer.getByRole("button", { name: /Step inside|Back to globe/ }),
  ).toHaveCount(0);
  const frame = (await viewer.boundingBox())!;
  const initialBounds = (await surface.boundingBox())!;
  expect(initialBounds.width).toBeCloseTo(frame.width, 0);
  expect(initialBounds.height).toBeCloseTo(frame.height, 0);
  await surface.focus();
  const initial = await capture();
  await surface.press("ArrowRight");
  await surface.press("ArrowUp");
  expect((await capture()).equals(initial)).toBe(false);
  await surface.press("Home");
  expect((await capture()).equals(initial)).toBe(true);
  const bounds = (await surface.boundingBox())!;
  await page.mouse.move(
    bounds.x + bounds.width * 0.45,
    bounds.y + bounds.height * 0.4,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width * 0.7,
    bounds.y + bounds.height * 0.4,
    { steps: 8 },
  );
  await page.mouse.up();
  expect((await capture()).equals(initial)).toBe(false);
  await viewer
    .getByRole("button", { name: "Reset panorama view", exact: true })
    .click();
  await page.mouse.move(0, 0);
  expect((await capture()).equals(initial)).toBe(true);
  await expect(
    page.getByRole("link", { name: "Explore 360+x", exact: true }),
  ).toHaveAttribute("href", "https://x360dataset.github.io/");
});

test("the panorama retains a photograph and project link without WebGL", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (
        this: HTMLCanvasElement,
        type: string,
        ...args: unknown[]
      ) {
        return type.startsWith("webgl")
          ? null
          : Reflect.apply(original, this, [type, ...args]);
      },
    });
  });
  await page.goto("/#study-x360");
  await expect(page.locator(".panorama-fallback img")).toBeVisible();
  const frame = (await page.locator(".immersive-panorama").boundingBox())!;
  const photograph = (await page.locator(".panorama-fallback").boundingBox())!;
  expect(photograph.width).toBeCloseTo(frame.width, 0);
  expect(photograph.height).toBeCloseTo(frame.height, 0);
  await expect(
    page.getByRole("button", { name: "Reset panorama view", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Explore 360+x", exact: true }),
  ).toBeVisible();
});

for (const width of [1440, 800, 390, 320]) {
  test(`COMPaD keeps text and imagery independently editable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#enterprise");
    await page.getByRole("tab", { name: "01 COMPaD" }).click();
    const title = page.getByRole("button", {
      name: "Move the poster headline",
      exact: true,
    });
    const flower = page.getByRole("button", {
      name: "Move the flower image",
      exact: true,
    });
    const canvas = page.locator(".compad-paper");
    await page
      .getByRole("textbox", { name: "Poster headline" })
      .fill("Make it\nyours.");
    await expect(title).toHaveText("Make it\nyours.");
    await page
      .getByRole("button", { name: "Use sans serif type", exact: true })
      .click();
    await expect(title).toHaveAttribute("data-font", "sans");
    await page
      .getByRole("button", { name: "Use forest paper", exact: true })
      .click();
    await expect(canvas).toHaveCSS("background-color", "rgb(36, 59, 48)");
    await title.focus();
    const fontSizeBeforeMove = await title.evaluate(
      (element) => getComputedStyle(element).fontSize,
    );
    const before = (await title.boundingBox())!;
    await title.press("Shift+ArrowUp");
    const after = (await title.boundingBox())!;
    expect(after.y).toBeLessThan(before.y - 5);
    await expect(title).toHaveCSS("font-size", fontSizeBeforeMove);
    await canvas.scrollIntoViewIfNeeded();
    const titleBeforeDrag = (await title.boundingBox())!;
    const flowerBefore = (await flower.boundingBox())!;
    await page.mouse.move(
      flowerBefore.x + flowerBefore.width * 0.4,
      flowerBefore.y + flowerBefore.height * 0.2,
    );
    await page.mouse.down();
    await page.mouse.move(
      flowerBefore.x + flowerBefore.width * 0.4 - 20,
      flowerBefore.y + flowerBefore.height * 0.2 + 10,
      { steps: 6 },
    );
    await page.mouse.up();
    const flowerAfter = (await flower.boundingBox())!;
    expect(flowerAfter.x).toBeLessThan(flowerBefore.x - 10);
    expect((await title.boundingBox())!.y).toBeCloseTo(titleBeforeDrag.y, 0);
    const size = page.getByRole("slider", {
      name: "Flower image size",
      exact: true,
    });
    await size.press("End");
    await expect(size).toHaveValue("120");
    expect((await flower.boundingBox())!.width).toBeGreaterThan(
      flowerAfter.width,
    );
    await checkOverflow(page);
    await page
      .getByRole("button", { name: "Reset poster", exact: true })
      .click();
    await expect(
      page.getByRole("textbox", { name: "Poster headline" }),
    ).toHaveValue("BLOOM");
    await expect(title).toHaveAttribute("data-font", "serif");
    await expect(canvas).toHaveAttribute("data-tone", "cream");
    for (const design of [
      "01 In bloom",
      "02 Form & space",
      "03 City in flux",
    ]) {
      await page.getByRole("button", { name: design, exact: true }).click();
      const layout = await canvas.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const headline = element.querySelector(
          '[data-poster-layer="headline"] > span',
        )!;
        return {
          bottom: bounds.bottom,
          headlineHeight: headline.getBoundingClientRect().height,
          headlineLineHeight: parseFloat(getComputedStyle(headline).lineHeight),
          textBottoms: Array.from(
            element.querySelectorAll('[data-kind="text"] > span'),
          ).map((text) => text.getBoundingClientRect().bottom),
        };
      });
      expect(
        layout.headlineHeight,
        design + " headline stays on one line",
      ).toBeLessThanOrEqual(layout.headlineLineHeight + 1);
      for (const bottom of layout.textBottoms)
        expect(
          bottom,
          design + " lettering stays on the paper",
        ).toBeLessThanOrEqual(layout.bottom + 1);
      const tools = (await page.locator(".compad-tools").boundingBox())!;
      const history = (await page
        .getByRole("group", { name: "Poster history", exact: true })
        .boundingBox())!;
      expect(
        tools.y + tools.height,
        design + " controls leave room for undo",
      ).toBeLessThanOrEqual(history.y);
      await checkOverflow(page);
    }
  });
}

test("COMPaD follows the clicked element and keeps three designs independently editable", async ({
  page,
}) => {
  await page.goto("/#enterprise");
  await page.getByRole("tab", { name: "01 COMPaD" }).click();
  const demo = page.getByRole("group", {
    name: "Editable COMPaD poster demo",
    exact: true,
  });
  const canvas = page.getByRole("group", {
    name: "Poster canvas",
    exact: true,
  });
  await expect(
    demo.getByRole("button", { name: /^(Text|Image)$/ }),
  ).toHaveCount(0);
  await expect(canvas.getByRole("button", { name: /^Move the / })).toHaveCount(
    9,
  );

  await page
    .getByRole("button", { name: "Move the poster edition", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Poster edition", exact: true })
    .fill("A NEW COLLECTION");
  await expect(
    page.getByRole("button", { name: "Move the poster edition", exact: true }),
  ).toHaveText("A NEW COLLECTION");
  await page
    .getByRole("button", { name: "02 Form & space", exact: true })
    .click();
  await expect(canvas).toHaveAttribute("data-design", "form");
  await expect(canvas.locator("img")).toHaveAttribute(
    "src",
    /compad-sculpture.webp$/,
  );
  const sculpture = page.getByRole("button", {
    name: "Move the sculpture image",
    exact: true,
  });
  await sculpture.click({ position: { x: 130, y: 120 } });
  await expect(demo.getByRole("textbox")).toHaveCount(0);
  await page
    .getByRole("slider", { name: "Sculpture image rotation", exact: true })
    .press("End");
  await expect(sculpture).not.toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 0, 0)",
  );
  await page
    .getByRole("button", {
      name: "Flip sculpture image horizontally",
      exact: true,
    })
    .click();
  await expect(sculpture.locator("img")).toHaveCSS(
    "transform",
    "matrix(-1, 0, 0, 1, 0, 0)",
  );
  await page
    .getByRole("button", { name: "Move the poster headline", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Poster headline", exact: true })
    .fill("& motion");
  await page
    .getByRole("button", { name: "03 City in flux", exact: true })
    .click();
  await expect(canvas).toHaveAttribute("data-design", "city");
  await expect(canvas.locator("img")).toHaveAttribute(
    "src",
    /compad-city.webp$/,
  );
  await expect(
    page.getByRole("button", { name: "Undo poster change", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("textbox", { name: "Poster headline", exact: true })
    .fill("AFTER HOURS");
  await page.getByRole("button", { name: "01 In bloom", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Move the poster edition", exact: true }),
  ).toHaveText("A NEW COLLECTION");
  await page
    .getByRole("button", { name: "02 Form & space", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Poster headline", exact: true }),
  ).toHaveValue("& motion");
  await expect(sculpture.locator("img")).toHaveCSS(
    "transform",
    "matrix(-1, 0, 0, 1, 0, 0)",
  );
  await page
    .getByRole("button", { name: "Undo poster change", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Poster headline", exact: true }),
  ).toHaveValue("& space");
  await page
    .getByRole("button", { name: "Redo poster change", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Poster headline", exact: true }),
  ).toHaveValue("& motion");
  await page.getByRole("button", { name: "Reset poster", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Poster headline", exact: true }),
  ).toHaveValue("& space");
  await page
    .getByRole("button", { name: "03 City in flux", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Poster headline", exact: true }),
  ).toHaveValue("AFTER HOURS");
  await checkOverflow(page);
});

for (const width of [1440, 390]) {
  test(`every reading entry has a visible preview and an immediately available overview at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#papers");
    for (const slug of ["visualsplit", "diff", "x360", "med"]) {
      const row = paper(page, slug);
      const summary = row.locator(":scope > summary");
      const preview = summary.locator(".paper-preview");
      await preview.scrollIntoViewIfNeeded();
      await expect(preview).toBeVisible();
      await expect(preview).toHaveAccessibleName(/\S+/);
      await expect(row).not.toHaveAttribute("open", "");
      await expect
        .poll(() =>
          preview
            .locator("img")
            .evaluateAll((images) =>
              images.every(
                (image) =>
                  (image as HTMLImageElement).complete &&
                  (image as HTMLImageElement).naturalWidth > 0,
              ),
            ),
        )
        .toBe(true);
      const previewSize = (await preview.boundingBox())!;
      expect(previewSize.width).toBeGreaterThan(200);
      expect(previewSize.height).toBeGreaterThan(140);
      await summary.focus();
      await summary.press("Enter");
      await expect(row).toHaveAttribute("open", "");
      await expect(row.locator(".paper-overview img")).toBeVisible();
      await expect(row.locator(".paper-overview a")).toHaveAttribute(
        "href",
        /^\/images\/projects\//,
      );
      await checkOverflow(page);
      await summary.click();
      await expect(row).not.toHaveAttribute("open", "");
    }
  });
}

test("all four papers retain formal details, resources, author links and selectable citations", async ({
  page,
}) => {
  await page.goto("/#papers");
  await expect(page.locator(".publication-row")).toHaveCount(4);
  for (const slug of ["visualsplit", "diff", "x360", "med"]) {
    const row = paper(page, slug);
    await row.locator(":scope > summary").click();
    await expect(row.locator(".publication-detail h4")).toBeVisible();
    await expect(
      row.getByRole("link", { name: "Paper", exact: true }),
    ).toHaveAttribute("href", /^https:\/\//);
    await row.locator(".citation-detail > summary").click();
    await expect(row.locator("pre code")).toContainText(
      /@(?:inproceedings|InProceedings)/,
    );
    await checkOverflow(page);
  }
  await expect(
    paper(page, "visualsplit").getByRole("link", {
      name: "Hao Chen",
      exact: true,
    }),
  ).toHaveAttribute("href", "https://h-chen.com/");
  for (const label of [
    "Supplementary",
    "Poster",
    "Presentation",
    "Code",
    "Models",
    "Examples",
    "DOI",
  ]) {
    await expect(
      paper(page, "visualsplit").getByRole("link", {
        name: label,
        exact: true,
      }),
    ).toBeVisible();
  }
  await expect(paper(page, "x360").locator(".paper-authors")).toContainText(
    "Chenyuan Qu",
  );
});

test("copy citation puts the complete reference in the clipboard", async ({
  context,
  page,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?spotlight=visualsplit");
  await paper(page, "visualsplit")
    .getByRole("button", { name: /^Copy citation/ })
    .click();
  await expect(paper(page, "visualsplit").getByRole("status")).toHaveText(
    "Citation copied.",
  );
  const citation = await page.evaluate(() => navigator.clipboard.readText());
  expect(citation).toContain(
    "Exploring Image Representation with Decoupled Classical Visual Descriptors",
  );
  expect(citation).toContain("Chenyuan");
  expect(citation).toContain("2025");
});

test("existing shared paper URLs open the matching paper", async ({ page }) => {
  await page.goto("/?spotlight=visualsplit");
  await expect(paper(page, "visualsplit")).toHaveAttribute("open", "");
  await expect(paper(page, "diff")).not.toHaveAttribute("open", "");
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect
    .poll(() =>
      page
        .locator("#enterprise h2")
        .evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBeLessThan(400);
  expect(
    (await page.locator("#enterprise h2").boundingBox())!.y,
  ).toBeGreaterThan(88);
  await page.goto("/#publication-med");
  await expect(paper(page, "med")).toHaveAttribute("open", "");
  await expect(
    paper(page, "med").getByRole("heading", { level: 4 }),
  ).toBeVisible();
});

test("paper figures, posters and videos remain available without loading videos on arrival", async ({
  page,
}) => {
  await page.goto("/?spotlight=visualsplit");
  const row = paper(page, "visualsplit");
  await row.locator(".paper-media > summary").click();
  await expect(
    row.getByRole("link", { name: /Framework overview/ }),
  ).toHaveAttribute("href", "/images/projects/visualsplit-framework.webp");
  await expect(
    row.getByRole("link", { name: /BMVC 2025 poster/ }),
  ).toHaveAttribute("href", "/images/publications/visualsplit-poster.webp");
  await expect(row.locator("video")).toHaveAttribute("preload", "none");
  await expect(row.locator("video source")).toHaveAttribute(
    "src",
    "https://chenyuanqu.com/VisualSplit/videos/presentation/0873_presentation_1080p.mp4",
  );
  await expect(
    page.getByRole("link", { name: "BinEgo-360", exact: true }),
  ).toHaveAttribute("href", "https://x360dataset.github.io/BinEgo-360/");
  await expect(
    page.getByRole("link", { name: "text-to-art-database", exact: true }),
  ).toHaveAttribute(
    "href",
    "https://huggingface.co/datasets/quchenyuan/text-to-art-database",
  );
});

test("experience, education and earlier updates are still easy to find", async ({
  page,
}) => {
  await page.goto("/#journey");
  await page.locator(".journey-detail > summary").click();
  const journey = page.locator(".journey-detail");
  for (const title of [
    "Head of Technologies",
    "Full-stack Engineer",
    "Algorithm Engineer",
    "Algorithm Engineer Intern",
    "PhD Researcher (part-time)",
    "BSc in Physics",
    "Master's in Artificial Intelligence and Machine Learning",
  ]) {
    await expect(
      journey.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  }
  await expect(journey).toContainText("Sep 2023 — Expected 2028");
  await expect(journey).toContainText("Dec 2024 — Present");
  await expect(journey).toContainText("Graduated with Distinction");
  await expect(
    journey.getByRole("link", { name: "University of Southampton" }),
  ).toHaveAttribute("href", "https://www.southampton.ac.uk/");
  await expect(page.locator(".recently > div > article")).toHaveCount(3);
  await page.locator(".earlier-updates > summary").click();
  await expect(page.locator(".earlier-updates article")).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: "Started my PhD in the MI X group" }),
  ).toBeVisible();
});

test("contact provides the personal email, public profiles and all work addresses", async ({
  page,
}) => {
  await page.goto("/#contact");
  await expect(
    page.getByRole("link", { name: "Chenyuan.Qu@outlook.com", exact: true }),
  ).toHaveAttribute("href", "mailto:Chenyuan.Qu@outlook.com");
  for (const label of [
    "Google Scholar",
    "GitHub",
    "Hugging Face",
    "LinkedIn",
    "ORCID",
  ]) {
    await expect(
      page.locator("#contact").getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("href", /^https:\/\//);
  }
  await page.locator(".other-emails > summary").click();
  for (const email of [
    "henry.qu@allsee-tech.com",
    "henry.qu@vieunite.com",
    "cxq134@student.bham.ac.uk",
  ]) {
    await expect(page.locator(`a[href="mailto:${email}"]`)).toBeVisible();
  }
});

test("the mobile navigation traps focus, closes with Escape and follows links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open navigation menu" });
  await open.click();
  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole("button", { name: "Close navigation menu" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: /Say hello/ })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  await open.click();
  await dialog.getByRole("link", { name: /Research/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#research$/);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await checkOverflow(page);
});

test("essential content and native disclosures work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Chenyuan Qu." }),
  ).toBeVisible();
  await expect(page.locator(".no-script-nav")).toBeVisible();
  await expect(
    page.locator(".publication-row > summary .paper-preview"),
  ).toHaveCount(4);
  await expect(page.locator(".visualsplit-study")).toHaveAttribute(
    "data-ready",
    "false",
  );
  await expect(page.locator(".visualsplit-comparison img")).toHaveCount(2);
  await expect(page.locator(".visualsplit-ingredient-images img")).toHaveCount(
    2,
  );
  await expect(
    page.getByRole("link", { name: "Explore the research", exact: true }),
  ).toHaveAttribute("href", "https://chenyuanqu.com/VisualSplit/");
  await expect(
    page.getByRole("button", { name: "Open navigation menu" }),
  ).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "One place for every screen." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "A little less busywork." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "A poster is a starting point." }),
  ).toBeVisible();
  await paper(page, "visualsplit").locator(":scope > summary").click();
  await expect(
    paper(page, "visualsplit").getByRole("link", {
      name: "Paper",
      exact: true,
    }),
  ).toBeVisible();
  await paper(page, "visualsplit")
    .locator(".citation-detail > summary")
    .click();
  await expect(paper(page, "visualsplit").locator("pre")).toContainText(
    "Qu_2025_BMVC",
  );
  await checkOverflow(page);
  await context.close();
});

test("the homepage, expanded paper and mobile menu pass the accessibility audit", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const audit = async () => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.filter(
        ({ impact }) => impact === "serious" || impact === "critical",
      ),
    ).toEqual([]);
  };
  await audit();
  await page.getByRole("tab", { name: "01 COMPaD" }).click();
  await page
    .getByRole("button", { name: "Use forest paper", exact: true })
    .click();
  await audit();
  for (const design of ["02 Form & space", "03 City in flux"]) {
    await page.getByRole("button", { name: design, exact: true }).click();
    await audit();
  }
  await paper(page, "visualsplit").locator(":scope > summary").click();
  await paper(page, "visualsplit")
    .locator(".citation-detail > summary")
    .click();
  await audit();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await audit();
});

test("static images and identity metadata survive the export", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const localImages = await page
    .locator("img")
    .evaluateAll((images) => [
      ...new Set(
        images.map(
          (image) => new URL((image as HTMLImageElement).src).pathname,
        ),
      ),
    ]);
  for (const source of [...localImages, "/images/portrait/person-matte.webp"]) {
    const response = await request.get(source);
    expect(response.ok(), source).toBeTruthy();
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
  await expect(page).toHaveTitle("Chenyuan Qu (Henry) — A personal collection");
  const graph = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(
    JSON.parse(graph!)["@graph"].filter(
      (item: { "@type": string }) => item["@type"] === "ScholarlyArticle",
    ),
  ).toHaveLength(4);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://chenyuanqu.com/",
  );
});
