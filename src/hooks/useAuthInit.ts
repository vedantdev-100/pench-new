import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "@/features/auth/utils/tokenUtils";
import { httpClient } from "@/services/api/httpClient"; // ← keep as is
import type { User } from "@/types/domain/user.types";
import { getErrorMessage, logError } from "@/errors/errorHandler";
import { errorMessages } from "@/errors/errorMessages";

export function useAuthInit() {
    const { setTokens, setUser, setDomainAndRoute } = useAuthStore();
    const [isReady, setIsReady] = useState(false);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        async function bootstrap() {
            try {
                const access = await tokenUtils.getAccessToken();
                const refresh = await tokenUtils.getRefreshToken();

                if (access && refresh) {
                    setTokens(access, refresh);

                    try {
                        // ── cast to unknown first, then User — safe because
                        //    response interceptor already unwraps .data
                        const me = await httpClient.get("/api/accounts/me/") as unknown as User;

                        setUser(me);
                        setDomainAndRoute(me.tenant_schema, me.tenant_schema);

                    } catch (err) {
                        // Token exists but /me/ failed — expired or revoked
                        logError(err, "useAuthInit:/api/accounts/me/");
                        const msg = getErrorMessage(err);

                        // 401 → session expired, clear and force re-login
                        // Network error → isReady still fires, login screen shows
                        if (__DEV__) console.warn(`[Bootstrap] ${msg}`);
                        await tokenUtils.clearTokens();
                    }
                }
            } catch (err) {
                // SecureStore read failure — device issue
                logError(err, "useAuthInit:SecureStore");
                if (__DEV__) {
                    console.error(
                        `[Bootstrap] ${errorMessages.UNKNOWN}`,
                        err
                    );
                }
            } finally {
                setIsReady(true);
            }
        }

        bootstrap();
    }, []);

    return { isReady };
} 