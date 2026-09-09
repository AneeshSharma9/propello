import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const HashScroll = () => {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [hash, pathname]);

    return <Outlet />;
};

export default HashScroll;