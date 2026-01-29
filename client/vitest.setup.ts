import { vi } from "vitest";

const router = {
  push: vi.fn(),
  replace: vi.fn(),
};

vi.mock("expo-router", () => ({
  useRouter: () => router,
  router,
}));

vi.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
  FontAwesome: () => null,
}));

const storage = new Map<string, string>();
vi.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    setItem: vi.fn(async (key: string, value: string) => {
      storage.set(key, value);
    }),
    getItem: vi.fn(async (key: string) => storage.get(key) ?? null),
    removeItem: vi.fn(async (key: string) => {
      storage.delete(key);
    }),
    clear: vi.fn(async () => {
      storage.clear();
    }),
  },
}));

vi.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: vi.fn(async () => ({ granted: true })),
  launchImageLibraryAsync: vi.fn(async () => ({ canceled: true, assets: [] })),
  MediaTypeOptions: { Images: "Images" },
}));
