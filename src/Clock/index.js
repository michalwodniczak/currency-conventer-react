import { useState, useEffect } from "react";
import { StyledClock } from "./styled";

const formatDate = (date) => date.toLocaleString(undefined, {
    month: "long",
    weekday: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
});

export const Clock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(
            () => {
                setDate(new Date());
            }, 1000
        )
        return () => {
            clearInterval(intervalId);
        }
    }, [date]);

    return (
        <StyledClock>
            Dzisiaj jest: {formatDate(date)}
        </StyledClock>
    );
};