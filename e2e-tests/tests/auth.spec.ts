import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow sign in", async ({ page }) => {
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

  //expect the follwing links to be visible
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "SignOut" })).toBeVisible();
});

test("should allow user ti register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 9000) + 1000
  }@test.com`;
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("Babs");
  await page.locator("[name=lastName]").fill("Balboa");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password2");
  await page.locator("[name=confirmPassword]").fill("password2");

  await page.getByRole("button", { name: "Create Account" }).click();

  //expect the following to be visible upon successfull registration
  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "SignOut" })).toBeVisible();
});
