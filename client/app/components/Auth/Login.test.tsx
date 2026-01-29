import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Pressable, Text } from "react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Login from "./Login";

const { mockLogin } = vi.hoisted(() => ({
  mockLogin: vi.fn(),
}));

vi.mock("@/src/context/Authcontext", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

describe("Login", () => {
  beforeEach(() => {
    mockLogin.mockReset();
    (AsyncStorage.setItem as unknown as vi.Mock).mockClear();
    router.replace.mockClear();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ user: [{ id: 7 }], token: "token-123" }),
      })
    );
  });

  it("submits login and navigates", async () => {
    const setEmail = vi.fn();
    const setPassword = vi.fn();
    const setLogin = vi.fn();

    let renderer!: TestRenderer.ReactTestRenderer;
    await act(async () => {
      renderer = TestRenderer.create(
        <Login
          email="user@example.com"
          setEmail={setEmail}
          password="secret"
          setPassword={setPassword}
          login={true}
          setLogin={setLogin}
        />
      );
    });

    const buttons = renderer.root.findAllByType(Pressable);
    const loginButton = buttons.find((pressable) =>
      pressable
        .findAllByType(Text)
        .some((text) => String(text.props.children).includes("Login"))
    );
    await act(async () => {
      loginButton?.props.onPress();
    });

    expect(fetch).toHaveBeenCalled();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("id", 7);
    expect(mockLogin).toHaveBeenCalledWith("token-123");
    expect(router.replace).toHaveBeenCalledWith("/(protected)/UserPage");
  });

  it("switch button toggles auth mode", () => {
    const setEmail = vi.fn();
    const setPassword = vi.fn();
    const setLogin = vi.fn();

    let renderer!: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(
        <Login
          email="user@example.com"
          setEmail={setEmail}
          password="secret"
          setPassword={setPassword}
          login={true}
          setLogin={setLogin}
        />
      );
    });

    const buttons = renderer.root.findAllByType(Pressable);
    const switchButton = buttons.find((pressable) =>
      pressable
        .findAllByType(Text)
        .some((text) => String(text.props.children).includes("Switch to Signup"))
    );
    switchButton?.props.onPress();

    expect(setLogin).toHaveBeenCalledWith(false);
    expect(setEmail).toHaveBeenCalledWith("");
    expect(setPassword).toHaveBeenCalledWith("");
  });
});
