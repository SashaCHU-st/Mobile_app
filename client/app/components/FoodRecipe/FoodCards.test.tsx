import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { FlatList, Pressable } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { router } from "expo-router";
import FoodCards from "./FoodCards";

vi.mock("../../../assets/images/dog.jpg", () => ({ default: "dog.jpg" }));

describe("FoodCards", () => {
  it("renders empty state", () => {
    let renderer!: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<FoodCards foods={[]} />);
    });
    const list = renderer.root.findByType(FlatList);
    const empty = list.props.ListEmptyComponent;
    expect(empty.props.children).toBe("No food found");
  });

  it("navigates to details when a card is pressed", () => {
    router.push.mockClear();
    const foods = [{ id: 1, title: "Pasta", image: undefined }];
    let renderer!: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<FoodCards foods={foods} />);
    });
    const list = renderer.root.findByType(FlatList);
    const itemElement = list.props.renderItem({ item: foods[0] });
    let itemRenderer!: TestRenderer.ReactTestRenderer;
    act(() => {
      itemRenderer = TestRenderer.create(itemElement);
    });
    const pressable = itemRenderer.root.findByType(Pressable);
    act(() => {
      pressable.props.onPress();
    });

    expect(router.push).toHaveBeenCalledWith({
      pathname: "/recipe-details/RecipeDetails",
      params: { recipe: JSON.stringify(foods[0]) },
    });
  });
});
