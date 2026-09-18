import { i18n } from "@lingui/core";

export async function dynamicActivate(locale: Locales) {
    let catalog;
    try {
        // Explicit per-locale imports keep Vite from bundling every catalog under i18n/
        const catalogs: Record<
            Locales,
            () => Promise<{ messages: import("@lingui/core").Messages }>
        > = {
            en: () => import("../i18n/en/messages.po"),
            es: () => import("../i18n/es/messages.po"),
            pt: () => import("../i18n/pt/messages.po"),
            it: () => import("../i18n/it/messages.po"),
        };
        catalog = await catalogs[locale]();
    } catch {
        catalog = { messages: {} };
    }

    i18n.load(locale, catalog.messages);
    i18n.activate(locale);
}

export default i18n;
