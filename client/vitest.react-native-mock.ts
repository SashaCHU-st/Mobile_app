import React from "react";

type PropsWithChildren = { children?: React.ReactNode } & Record<string, any>;

const createComponent = (displayName: string) => {
  const Component = (props: PropsWithChildren) => {
    return React.createElement(displayName, props, props.children);
  };
  Component.displayName = displayName;
  return Component;
};

export const View = createComponent("View");
export const Text = createComponent("Text");
export const Pressable = createComponent("Pressable");
export const Image = createComponent("Image");
export const TextInput = createComponent("TextInput");
export const ScrollView = createComponent("ScrollView");
export const FlatList = createComponent("FlatList");

export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T) => styles,
  absoluteFillObject: {},
};

export const Dimensions = {
  get: () => ({ width: 320, height: 640 }),
};

export const ActivityIndicator = createComponent("ActivityIndicator");
