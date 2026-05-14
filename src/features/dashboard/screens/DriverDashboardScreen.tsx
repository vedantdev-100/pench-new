import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@store/authStore";
import { DashboardHeader } from "../components/DashboardHeader";
import { GreetingRow } from "../components/GreetingRow";
import { ShipmentOverview } from "../components/ShipmentOverview";
import { SectionHeading } from "../components/SectionHeading";
import { SafeAreaView } from "react-native-safe-area-context";
// TODO: import { OrderList } from "../components/OrderList";
// TODO: import { useDashboardStats } from "../hooks/useDashboardStats";

export function DriverDashboardScreen() {
    const router = useRouter();
    const { user } = useAuthStore();

    // TODO: Replace with real API data via useDashboardStats()
    const stats = {
        newOrders: 6,
        dailyDeliveries: 14,
        hasDeliveryAlert: true,
    };

    const fullName = user?.username ?? "Driver"; // TODO: replace with full name from profile API

    return (
        <SafeAreaView className="flex-1 bg-bg-screen">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-24"
            >
                {/* Header */}
                <DashboardHeader
                    cityName={user?.city_name ?? "Nagpur"}
                    hubName="Bilzen" // TODO: fetch from driver profile
                    // onAvatarPress={() => router.push("/(driver)/profile")}
                />

                {/* Greeting */}
                <GreetingRow name={fullName} />

                {/* Shipment Overview */}
                <ShipmentOverview
                    newOrdersCount={stats.newOrders}
                    dailyDeliveriesCount={stats.dailyDeliveries}
                    hasDeliveryAlert={stats.hasDeliveryAlert}
                    // onOrdersPress={() => router.push("/(driver)/orders")}
                    // onDeliveriesPress={() => router.push("/(driver)/deliveries")}
                />

                {/* Today's Orders */}
                <SectionHeading
                    title="Today's Orders"
                    actionLabel="View All"
                    // onActionPress={() => router.push("/(driver)/orders")}
                />

                {/* TODO: <OrderList /> */}
            </ScrollView>
        </SafeAreaView>
    );
}