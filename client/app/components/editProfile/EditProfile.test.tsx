import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Pressable, Text, TextInput } from "react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EditProfile from "./EditProfile";

vi.mock("../../../assets/images/dog.jpg", () => ({ default: "dog.jpg" }));

const { mockFetchMe } = vi.hoisted(() => ({
  mockFetchMe: vi.fn().mockResolvedValue({
    id: 1,
    name: "User",
    email: "user@example.com",
    image: null,
  }),
}));

vi.mock("@/src/utils/api", () => ({
  fetchMe: mockFetchMe,
}));

describe("EditProfile", () => {
  beforeEach(() => {
    mockFetchMe.mockClear();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: "Profile updated" }),
      })
    );
  });

  it("loads user info on mount", async () => {
    let renderer!: TestRenderer.ReactTestRenderer;
    await act(async () => {
      renderer = TestRenderer.create(<EditProfile />);
    });

    expect(mockFetchMe).toHaveBeenCalled();

    const button = renderer.root.findAllByType(Pressable).find((pressable) =>
      pressable.findAllByType(Text).some((text) =>
        String(text.props.children).includes("Choose Picture")
      )
    );
    expect(button).toBeTruthy();
  });

  it("submits profile changes", async () => {
    let renderer!: TestRenderer.ReactTestRenderer;
    await act(async () => {
      renderer = TestRenderer.create(<EditProfile />);
    });

    const nameInput = renderer.root.findByProps({
      placeholder: "Change a name",
    }) as TestRenderer.ReactTestInstance & { props: TextInput["props"] };
    const passInput = renderer.root.findByProps({
      placeholder: "Change a password",
    }) as TestRenderer.ReactTestInstance & { props: TextInput["props"] };

    act(() => {
      nameInput.props.onChangeText?.("New Name");
      passInput.props.onChangeText?.("new-pass");
    });

    const buttons = renderer.root.findAllByType(Pressable);
    const submit = buttons.find((pressable) =>
      pressable.findAllByType(Text).some((text) =>
        String(text.props.children).includes("Change")
      )
    );

    await act(async () => {
      submit?.props.onPress();
    });

    expect(fetch).toHaveBeenCalled();
  });
});
