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

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("India");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Desi Family Hotel").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book a room", async ({ page }) => {
  await page.goto(UI_URL);
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("India");

  const date = new Date();
  date.setDate(date.getDate() + 3);

  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formattedDate); //searchbar checkout
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Desi Family Hotel").click();
  await page.getByRole("button", { name: "Book now" }).click();
  //room for 2 nights so 2000*2
  await expect(page.getByText("Total Cost: ₹4000.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator("[placeholder='Card number']")
    .fill("4242424242424242");
  await stripeFrame.locator('[placeHolder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24232");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();

  //check if hotel booked
  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Desi Family Hotel")).toBeVisible();
});
