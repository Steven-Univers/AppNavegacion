// app/(tabs)/+layout.tsx
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      {/* Cada <Tabs.Screen> hace referencia a un archivo dentro de (tabs) */}
      <Tabs.Screen name="index" options={{ title: "Personajes" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}
