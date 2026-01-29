import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Pressable } from "react-native";
import { describe, expect, it } from "vitest";
import { router } from "expo-router";
import Friends from "./Friends";

describe("Friends", () => {
  it("navigates to ShowFriends", () => {
    router.push.mockClear();
    let renderer!: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<Friends />);
    });
    const button = renderer.root.findByType(Pressable);
    button.props.onPress();

    expect(router.push).toHaveBeenCalledWith("/(protected)/ShowFriends");
  });
});
