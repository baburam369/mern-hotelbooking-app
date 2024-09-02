import test, { expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("Ajayup1@gmail.com");
  await page.locator("[name=password]").fill("111111");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Successfully signed in")).toBeVisible();
});

test("should show search results", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("India");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in India")).toBeVisible();
  await expect(page.getByText("Desi Family Hotel")).toBeVisible();
});
