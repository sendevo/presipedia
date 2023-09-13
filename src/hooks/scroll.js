import { useState, useEffect } from "react";

let scrollWatchDog;
const useWindowScrollCaching = (viewName, initialValue = 0) => {
    const key = viewName+"-scroll-value";
    const initialScrollPosition = localStorage.getItem(key) || initialValue;
    const [scrollPosition, setScrollPosition] = useState(Number(initialScrollPosition));

    useEffect(() => {
        localStorage.setItem(key, scrollPosition.toString());
    }, [viewName, scrollPosition]);

    const handleScroll = () => {
        clearTimeout(scrollWatchDog);
        scrollWatchDog = setTimeout(() => {
            setScrollPosition(window.scrollY);
        }, 500);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return [scrollPosition, setScrollPosition];
};

export default useWindowScrollCaching;