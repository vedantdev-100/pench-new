import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "../utils/tokenUtils";
import { ROUTES } from "@/constants/route";

export function useLogout() {
    const clearAuth = useAuthStore((s) => s.clearAuth);
    const router = useRouter();

    const logout = async () => {
        await tokenUtils.clearTokens();
        clearAuth();
        router.replace(ROUTES.AUTH.LOGIN as any);
    };

    return { logout };
}