import React from "react";
import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";

type Props = {};

export default function AditionalInfo({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: -23.5489, lon: -46.6388 }),
  });

  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8"
    >
      {rows.map(({ label, value }) => (
        <div className="flex justify-between" key={value}>
          <p className="text-gray-500">{label}:</p>
          <FormatComponent value={value} number={data?.current[value]} />
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  return number;
}

const rows = [
  { label: "Cloudiness (%)", value: "clouds" },
  { label: "UV Index", value: "uvi" },
  { label: "Wind Direction", value: "wind_deg" },
  { label: "Visibility (m)", value: "visibility" },
  { label: "Sunrise", value: "sunrise" },
  { label: "Sunset", value: "sunset" },
] as const;
