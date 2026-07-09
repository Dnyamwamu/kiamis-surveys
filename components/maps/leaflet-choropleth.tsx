"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as topojson from "topojson-client";
import countyData from "@/lib/data/kenya-counties";

interface LeafletChoroplethProps {
  data: Array<{
    county: string;
    value: number;
    colorValue?: number;
    totalValue?: number;
    percentage?: number;
  }>;
  valueLabel: string;
  totalLabel?: string;
  colorScale: (value: number) => string;
}

function MapController() {
  const map = useMap();

  useEffect(() => {
    // Fit bounds to Kenya
    map.setView([-0.5, 37.5], 7);
  }, [map]);

  return null;
}

export default function LeafletChoropleth({
  data,
  valueLabel,
  totalLabel,
  colorScale,
}: LeafletChoroplethProps) {
  const geoJsonData = useMemo(() => {
    return topojson.feature(
      countyData as any,
      countyData.objects.County as any
    );
  }, []);

  const countyStatsMap = useMemo(() => {
    return new Map(data.map((d) => [d.county.toUpperCase(), d]));
  }, [data]);

  useEffect(() => {
    console.log(" Leaflet map data:", data.slice(0, 3));
    const testCounty = data[0];
    if (testCounty) {
      console.log(" Test county:", testCounty);
      console.log(" Test percentage:", testCounty.percentage);
      console.log(" Test color:", colorScale(testCounty.percentage || 0));
    }
  }, [data, colorScale]);

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const countyName = feature.properties?.COUNTY?.toUpperCase() || "";
    const countyStats = countyStatsMap.get(countyName);
    const value = countyStats?.value || 0;
    const totalValue = countyStats?.totalValue || 0;
    const percentage = countyStats?.percentage || 0;

    let tooltipContent = `<strong>${countyName}</strong><br/>`;
    if (totalLabel && totalValue > 0) {
      tooltipContent += `${totalLabel}: ${totalValue.toLocaleString()}<br/>`;
    }
    tooltipContent += `${valueLabel}: ${value.toLocaleString()}`;
    if (percentage > 0) {
      tooltipContent += `<br/>Percentage: ${percentage.toFixed(1)}%`;
    }

    layer.bindTooltip(tooltipContent, { permanent: false, direction: "top" });
  };

  const style = (feature: any) => {
    const countyName = feature.properties?.COUNTY?.toUpperCase() || "";
    const countyStats = countyStatsMap.get(countyName);
    const value = countyStats?.colorValue ?? countyStats?.value ?? 0;

    const fillColor = value > 0 ? colorScale(value) : "#9ca3af";

    return {
      fillColor,
      weight: 1,
      opacity: 1,
      color: "#9ca3af",
      fillOpacity: 0.5,
    };
  };

  return (
    <MapContainer
      center={[-0.5, 37.5]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <MapController />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={geoJsonData as any}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
}
