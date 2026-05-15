import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DriverTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopColor: "#1e293b",
        },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Live Map",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      {/* ── New Profile Tab ───────────────────────────────────── */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}