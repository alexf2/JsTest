type distMetric = "MILES" | "METERS" | "KM" | "YARDS" | "FEET" | "INCH";

export default function printMove(distance: number, m: distMetric) {
    console.log(`Moved ${distance} ${m}`);
}
