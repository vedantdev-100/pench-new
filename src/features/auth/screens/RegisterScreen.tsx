import React, { useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { AuthInput } from "../components/AuthInput";
import { useRegister } from "../hooks/useRegister";
import { httpClient } from "@services/api/httpClient";

interface CityOption {
    label: string;
    value: string;
}

async function fetchCities(): Promise<CityOption[]> {
    return httpClient.get<CityOption[]>("tenants/cities/") as unknown as CityOption[];
}

export default function RegisterScreen() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCityPicker, setShowCityPicker] = useState(false);

    const dropdownAnim = useRef(new Animated.Value(0)).current;

    const { mutate: register, isPending, isError, error } = useRegister();

    const {
        data: cityOptions = [],
        isLoading: isCitiesLoading,
        isError: isCitiesError,
    } = useQuery({
        queryKey: ["cities"],
        queryFn: fetchCities,
        staleTime: 10 * 60 * 1000,
    });

    const isFormValid = username.trim() && email.trim() && phone.trim() && password.trim() && city;

    function handleRegister() {
        register({
            username: username.trim(),
            password,
            email: email.trim(),
            phone: phone.trim(),
            role: "Customers",
            is_customer: true,
            tenant_schema: city,
        });
    }

    function toggleCityPicker() {
        const toValue = showCityPicker ? 0 : 1;
        setShowCityPicker((v) => !v);
        Animated.spring(dropdownAnim, {
            toValue,
            useNativeDriver: false,
            damping: 18,
            stiffness: 200,
            mass: 0.8,
        }).start();
    }

    const selectedCity = cityOptions.find((c) => c.value === city);

    const dropdownHeight = dropdownAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, cityOptions.length * 52],
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-bg-screen"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 px-screen-x py-10">

                    {/* Back */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="self-start mb-4 flex-row items-center gap-x-1"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons name="arrow-back" size={18} color="#1A1A1A" />
                        <Text className="text-body text-text-primary">Back</Text>
                    </TouchableOpacity>

                    {/* Logo */}
                    <Image
                        source={require("@assets/images/logo.png")}
                        className="w-16 h-16 self-center mb-4"
                        resizeMode="contain"
                    />

                    <Text className="text-title font-bold text-text-primary text-center mb-6">
                        Create Account
                    </Text>

                    <View className="gap-y-4">

                        <AuthInput
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />

                        <AuthInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <AuthInput
                            placeholder="10-digit mobile number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />

                        {/* Password with eye toggle via rightIcon */}
                        <AuthInput
                            placeholder="Min 8 characters"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <TouchableOpacity
                                    onPress={() => setShowPassword((v) => !v)}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off" : "eye"}
                                        size={18}
                                        color="#9E9E9E"
                                    />
                                </TouchableOpacity>
                            }
                        />

                        {/* City Picker */}
                        <View>
                            <TouchableOpacity
                                onPress={toggleCityPicker}
                                disabled={isCitiesLoading}
                                className="flex-row items-center justify-between px-4 py-3.5 bg-bg-input rounded-input border border-border-disable"
                            >
                                {isCitiesLoading ? (
                                    <ActivityIndicator size="small" color="#9E9E9E" />
                                ) : (
                                    <Text className={`text-body ${city ? "text-text-primary" : "text-text-muted"}`}>
                                        {selectedCity?.label ?? "Select your city"}
                                    </Text>
                                )}
                                <Animated.View style={{
                                    transform: [{
                                        rotate: dropdownAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ["0deg", "180deg"],
                                        })
                                    }]
                                }}>
                                    <Ionicons name="chevron-down" size={18} color="#9E9E9E" />
                                </Animated.View>
                            </TouchableOpacity>

                            {isCitiesError && (
                                <Text className="text-error text-caption mt-1">
                                    Failed to load cities. Please restart the app.
                                </Text>
                            )}

                            <Animated.View
                                style={{ maxHeight: dropdownHeight, overflow: "hidden" }}
                                className="bg-bg-card rounded-input border border-border-disable mt-1"
                            >
                                {cityOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option.value}
                                        onPress={() => {
                                            setCity(option.value);
                                            toggleCityPicker();
                                        }}
                                        className={`px-5 py-3.5 ${city === option.value ? "bg-brand-light" : "bg-white"}`}
                                    >
                                        <Text className="text-body text-text-primary">
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </Animated.View>
                        </View>

                        {isError && (
                            <Text className="text-error text-caption text-center">
                                {(error as any)?.message ?? "Registration failed. Please try again."}
                            </Text>
                        )}

                        <TouchableOpacity
                            onPress={handleRegister}
                            disabled={!isFormValid || isPending || isCitiesLoading}
                            activeOpacity={0.85}
                            className={`w-full h-14 rounded-full items-center justify-center mt-2 ${isFormValid && !isPending ? "bg-brand-primary" : "bg-brand-primary/50"
                                }`}
                        >
                            <Text className="text-label text-text-white">
                                {isPending ? "Creating account..." : "Register"}
                            </Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center items-center gap-x-1 mt-2">
                            <Text className="text-body text-text-secondary">
                                Already have an account?
                            </Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text className="text-label text-brand-primary">Log in</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <Text className="text-caption text-text-muted text-center pb-6">
                    © 2024 Pench Foods. All rights reserved.
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}