import { test, expect } from "@playwright/test";

test("intro page renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("My recipies Mobile App")).toBeVisible();
  await expect(
    page.getByText("Hi, my name is Aleksandra! Let's start the journey through my app.")
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Let's start" })).toBeVisible();
});

test("start button navigates to auth screen", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Let's start" }).click();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  await expect(page.getByText("Switch to Signup")).toBeVisible();
});

test("switch to signup shows signup button", async ({ page }) => {
  await page.goto("/screens/Home");
  await page.getByText("Switch to Signup").click();
  await expect(page.getByRole("button", { name: "Signup" })).toBeVisible();
});
