import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

export default function ScrollToTop() {
    const { pathname, search } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);

        ReactGA.initialize("UA-192129269-1");
        ReactGA.pageview(pathname + search);
        // console.log(pathname + search);
    }, [pathname]);

    return null;
}
