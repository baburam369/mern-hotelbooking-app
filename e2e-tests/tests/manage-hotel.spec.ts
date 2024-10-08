import { test, expect } from "@playwright/test";
import exp from "constants";

import path from "path";

const UI_URL = "http://localhost:5173/";

//links are identified by getByRole

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  //expect to have landed on sign up page
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  //add required fields
  await page.locator("[name=email]").fill("Ajayup1@gmail.com");
  await page.locator("[name=password]").fill("111111");

  //click the signup button
  await page.getByRole("button", { name: "Login" }).click();

  //expect to be logged in and get a toast message with "successfully signed in"
  await expect(page.getByText("Successfully signed in")).toBeVisible();
});

test("Should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  //expect to have landed on add hotel page
  await expect(page.getByRole("heading", { name: "Add Hotel" })).toBeVisible();

  /*
    name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
   */

  //fillup form fields
  await page.locator("[name='name']").fill("Test Hotel");
  await page.locator("[name='city']").fill("test city");
  await page.locator("[name='country']").fill("test country");
  await page
    .locator("[name='description']")
    .fill("this is a description for test hotel");
  await page.locator("[name='pricePerNight']").fill("2000");
  await page.locator("[name='starRating']").selectOption("4");
  // await page.selectOption('select[name="starRating"]', "4")

  //check radio button for type
  await page.getByText("Family", { exact: true }).click();
  //check for faciliteis
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();
  await page.getByLabel("Family Rooms").check();

  await page.locator("[name='adultCount']").fill("4");
  await page.locator("[name='childCount']").fill("4");

  await page.setInputFiles("[name='imageFiles']", [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 150000 });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  // await expect(page.getByRole("heading", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByText("Hotel Que interesente")).toBeVisible();
  //check if description matches
  await expect(page.getByText("this is a description").first()).toBeVisible();
  await expect(page.getByText("test city, test country").first()).toBeVisible();
  await expect(page.getByText("Family").first()).toBeVisible();
  await expect(page.getByText("4 Star rating").first()).toBeVisible();
  await expect(page.getByText("₹2000 Per night").first()).toBeVisible();
  await expect(page.getByText("4 adults, 4 children").first()).toBeVisible();

  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Hotel Que Interesente"
  );
  //update hotel name
  await page.locator('[name="name"]').fill("Hotel Que Interesente updated");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();
  //expect the hotel name is updated
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Hotel Que Interesente updated"
  );
  //reset to previous name and save , just to make the overall test robust
  await page.locator('[name="name"]').fill("Hotel Que Interesente");
  await page.getByRole("button", { name: "Save" }).click();
});
