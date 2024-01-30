import "./bootstrap";
// import "antd/dist/antd.css";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ConfigProvider } from "antd";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfMetaTag
            ? csrfMetaTag.getAttribute("content")
            : "";

        root.render(
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#4e54c8",
                    },
                }}
            >
                <App {...props} />
            </ConfigProvider>
        );
    },
    progress: {
        color: "green",
    },
});
