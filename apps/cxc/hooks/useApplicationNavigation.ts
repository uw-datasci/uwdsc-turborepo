import { useState, useCallback } from "react";

/**
 * Hook to manage application navigation state and direction
 */
export function useApplicationNavigation(initialStep: number = 0) {
    const [currentIndex, setCurrentIndex] = useState<number>(initialStep);
    const [direction, setDirection] = useState<number>(1); // 1 for forward, -1 for backward

    const goToIndex = useCallback(
        (newIndex: number) => {
            setDirection(newIndex > currentIndex ? 1 : -1);
            setCurrentIndex(newIndex);
        },
        [currentIndex]
    );

    const goNext = useCallback(() => {
        goToIndex(currentIndex + 1);
    }, [currentIndex, goToIndex]);

    const goPrevious = useCallback(() => {
        goToIndex(currentIndex - 1);
    }, [currentIndex, goToIndex]);

    return {
        currentIndex,
        direction,
        goToIndex,
        goNext,
        goPrevious,
    };
}

