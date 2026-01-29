import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Pressable, Text } from "react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import SignUp from "./SignUp";

const { mockLogin } = vi.hoisted(() => ({
  mockLogin: vi.fn(),
}));

vi.mock("@/src/context/Authcontext", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

describe("SignUp", () => {
  beforeEach(() => {
    mockLogin.mockReset();
    (AsyncStorage.setItem as unknown as vi.Mock).mockClear();
    router.replace.mockClear();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ newUser: { id: 11 }, token: "token-xyz" }),
      })
    );
  });

  it("submits signup and navigates", async () => {
    const setEmail = vi.fn();
    const setPassword = vi.fn();
    const setName = vi.fn();
    const setLogin = vi.fn();

    let renderer!: TestRenderer.ReactTestRenderer;
    await act(async () => {
      renderer = TestRenderer.create(
        <SignUp
          email="user@example.com"
          setEmail={setEmail}
          name="User"
          setName={setName}
          password="secret"
          setPassword={setPassword}
          login={false}
          setLogin={setLogin}
        />
      );
    });

    const buttons = renderer.root.findAllByType(Pressable);
    const signupButton = buttons.find((pressable) =>
      pressable
        .findAllByType(Text)
        .some((text) => String(text.props.children).includes("Signup"))
    );
    await act(async () => {
      signupButton?.props.onPress();
    });

    expect(fetch).toHaveBeenCalled();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("id", "11");
    expect(mockLogin).toHaveBeenCalledWith("token-xyz");
    expect(router.replace).toHaveBeenCalledWith("/(protected)/UserPage");
  });

  it("switch button toggles auth mode", () => {
    const setEmail = vi.fn();
    const setPassword = vi.fn();
    const setName = vi.fn();
    const setLogin = vi.fn();

    let renderer!: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(
        <SignUp
          email="user@example.com"
          setEmail={setEmail}
          name="User"
          setName={setName}
          password="secret"
          setPassword={setPassword}
          login={false}
          setLogin={setLogin}
        />
      );
    });

    const buttons = renderer.root.findAllByType(Pressable);
    const switchButton = buttons.find((pressable) =>
      pressable
        .findAllByType(Text)
        .some((text) => String(text.props.children).includes("Switch to Login"))
    );
    switchButton?.props.onPress();

    expect(setLogin).toHaveBeenCalledWith(true);
    expect(setEmail).toHaveBeenCalledWith("");
    expect(setPassword).toHaveBeenCalledWith("");
  });
});
