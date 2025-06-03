import { useCallback, useEffect, useState } from "react";

export const useMediaQuery = (width: string | number, queryType = "min") => {
    const [targetReached, setTargetReached] = useState<boolean>();

    const updateTarget = useCallback((e: { matches: any; }) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(${queryType}-width: ${width}px)`);
        media.addListener(updateTarget);

        setTargetReached(media.matches);

        return () => {
            media.removeListener(updateTarget);
        };
    }, []);

    return targetReached;
};
