import { useState, useEffect } from "react";
import "./style.css"

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
        <p className="clock">
            Dzisiaj jest {date.toLocaleString("pl-pl", { month: "long", weekday: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })}
        </p>
    )
}