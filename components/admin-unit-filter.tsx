"use client";

import { useState, useEffect, useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Building2, Map, Lock } from "lucide-react";

interface County {
  county_id: string;
  county: string;
}

interface SubCounty {
  subcounty_id: string;
  subcounty: string;
  county: string;
  county_id: string;
}

interface Ward {
  ward_id: string;
  ward: string;
  subcounty: string;
  subcounty_id: string;
}

interface AdminUnitsData {
  counties: County[];
  subcounties: SubCounty[];
  wards: Ward[];
}

interface AdminUnitFilterProps {
  onFilterChange?: (filters: {
    county: string;
    subcounty: string;
    ward: string;
  }) => void;
  defaultCounty?: string;
  defaultSubCounty?: string;
  defaultWard?: string;
  userRole?: string | null;
}

export function AdminUnitFilter({
  onFilterChange,
  defaultCounty,
  defaultSubCounty,
  defaultWard,
  userRole,
}: AdminUnitFilterProps) {
  const [adminUnits, setAdminUnits] = useState<AdminUnitsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string>(defaultCounty || "");
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>(
    defaultSubCounty || ""
  );
  const [selectedWard, setSelectedWard] = useState<string>(defaultWard || "");

  // Determine lock level based on user's assigned admin units
  const lockCounty = !!defaultCounty;
  const lockSubCounty = !!defaultSubCounty;
  const lockWard = !!defaultWard;

  // Tracks previous prop values to adjust state when props change during rendering
  const [prevDefaultCounty, setPrevDefaultCounty] = useState(defaultCounty);
  const [prevDefaultSubCounty, setPrevDefaultSubCounty] = useState(defaultSubCounty);
  const [prevDefaultWard, setPrevDefaultWard] = useState(defaultWard);

  // Tracks previous selected values to detect when they change during rendering
  const [prevSelectedCounty, setPrevSelectedCounty] = useState(selectedCounty);
  const [prevSelectedSubCounty, setPrevSelectedSubCounty] = useState(selectedSubCounty);

  if (
    defaultCounty !== prevDefaultCounty ||
    defaultSubCounty !== prevDefaultSubCounty ||
    defaultWard !== prevDefaultWard
  ) {
    setPrevDefaultCounty(defaultCounty);
    setPrevDefaultSubCounty(defaultSubCounty);
    setPrevDefaultWard(defaultWard);
    setSelectedCounty(defaultCounty || "");
    setSelectedSubCounty(defaultSubCounty || "");
    setSelectedWard(defaultWard || "");
    setPrevSelectedCounty(defaultCounty || "");
    setPrevSelectedSubCounty(defaultSubCounty || "");
  }

  // Reset dependent fields when parent selection changes during rendering
  if (selectedCounty !== prevSelectedCounty) {
    setPrevSelectedCounty(selectedCounty);
    if (!lockSubCounty) {
      setSelectedSubCounty("");
    }
    if (!lockWard) {
      setSelectedWard("");
    }
  }

  if (selectedSubCounty !== prevSelectedSubCounty) {
    setPrevSelectedSubCounty(selectedSubCounty);
    if (!lockWard) {
      setSelectedWard("");
    }
  }

  // Normalize selected values case to match JSON on the fly
  const normalizedCounty = useMemo(() => {
    if (!adminUnits) return selectedCounty;
    if (!selectedCounty) return "";
    const matched = adminUnits.counties.find(
      (c) => c.county.toLowerCase() === selectedCounty.toLowerCase()
    );
    return matched ? matched.county : selectedCounty;
  }, [adminUnits, selectedCounty]);

  const normalizedSubCounty = useMemo(() => {
    if (!adminUnits) return selectedSubCounty;
    if (!selectedSubCounty) return "";
    const matched = adminUnits.subcounties.find(
      (sc) => sc.subcounty.toLowerCase() === selectedSubCounty.toLowerCase()
    );
    return matched ? matched.subcounty : selectedSubCounty;
  }, [adminUnits, selectedSubCounty]);

  const normalizedWard = useMemo(() => {
    if (!adminUnits) return selectedWard;
    if (!selectedWard) return "";
    const matched = adminUnits.wards.find(
      (w) => w.ward.toLowerCase() === selectedWard.toLowerCase()
    );
    return matched ? matched.ward : selectedWard;
  }, [adminUnits, selectedWard]);

  // Compute available items based on selections
  const availableSubCounties = useMemo(() => {
    if (!adminUnits || !normalizedCounty) return [];
    const county = adminUnits.counties.find(
      (c) => c.county.toLowerCase() === normalizedCounty.toLowerCase()
    );
    if (!county) return [];
    return adminUnits.subcounties.filter(
      (sc) => sc.county_id === county.county_id
    );
  }, [adminUnits, normalizedCounty]);

  const availableWards = useMemo(() => {
    if (!adminUnits) return [];
    if (normalizedSubCounty) {
      const subcounty = adminUnits.subcounties.find(
        (sc) => sc.subcounty.toLowerCase() === normalizedSubCounty.toLowerCase()
      );
      if (!subcounty) return [];
      return adminUnits.wards.filter(
        (w) => String(w.subcounty_id) === String(subcounty.subcounty_id)
      );
    } else if (normalizedCounty) {
      const county = adminUnits.counties.find(
        (c) => c.county.toLowerCase() === normalizedCounty.toLowerCase()
      );
      if (!county) return [];
      const countySubcounties = adminUnits.subcounties.filter(
        (sc) => sc.county_id === county.county_id
      );
      const subcountyIds = countySubcounties.map((sc) => String(sc.subcounty_id));
      return adminUnits.wards.filter((w) =>
        subcountyIds.includes(String(w.subcounty_id))
      );
    }
    return [];
  }, [adminUnits, normalizedCounty, normalizedSubCounty]);

  useEffect(() => {
    fetch("/admin_units.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load admin units");
        return res.json();
      })
      .then((data: AdminUnitsData) => {
        setAdminUnits(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Notify parent of filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        county: normalizedCounty,
        subcounty: normalizedSubCounty,
        ward: normalizedWard,
      });
    }
  }, [normalizedCounty, normalizedSubCounty, normalizedWard, onFilterChange]);

  const handleCountyChange = (value: string) => {
    if (value === "all") {
      setSelectedCounty("");
    } else {
      setSelectedCounty(value);
    }
  };

  const handleSubCountyChange = (value: string) => {
    if (value === "all") {
      setSelectedSubCounty("");
    } else {
      setSelectedSubCounty(value);
    }
  };

  const handleWardChange = (value: string) => {
    if (value === "all") {
      setSelectedWard("");
    } else {
      setSelectedWard(value);
    }
  };

  const handleClearFilters = () => {
    if (!lockCounty) setSelectedCounty("");
    if (!lockSubCounty) setSelectedSubCounty("");
    if (!lockWard) setSelectedWard("");
  };

  const isCountyDisabled = lockCounty;
  const isSubCountyDisabled = lockSubCounty;
  const isWardDisabled = lockWard;

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading locations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive">
        Error loading admin units. Please try again.
      </div>
    );
  }

  if (!adminUnits || adminUnits.counties.length === 0) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No admin units available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-none space-y-4">
      {" "}
      <div className="flex items-center">
        <h3 className="text-sm font-medium">Filter by Location</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end w-full">
        {" "}
        {/* County Select */}
        <div className="flex-1 min-w-0 space-y-2">
          <Label htmlFor="county" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            County
            {isCountyDisabled && <Lock className="h-3 w-3 text-amber-500" />}
          </Label>
          <Select
            value={normalizedCounty || "all"}
            onValueChange={handleCountyChange}
            disabled={isCountyDisabled}
          >
            <SelectTrigger id="county" className="w-full">
              <SelectValue placeholder="Select county..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Counties</SelectItem>
              {adminUnits.counties.map((county) => (
                <SelectItem key={`county-${county.county_id}`} value={county.county}>
                  {county.county}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* SubCounty Select */}
        <div className="flex-1 min-w-0 space-y-2">
          <Label htmlFor="subcounty" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Sub-County
            {isSubCountyDisabled && <Lock className="h-3 w-3 text-amber-500" />}
          </Label>
          <Select
            value={normalizedSubCounty || "all"}
            onValueChange={handleSubCountyChange}
            disabled={
              isSubCountyDisabled ||
              !normalizedCounty ||
              availableSubCounties.length === 0
            }
          >
            <SelectTrigger id="subcounty" className="w-full">
              <SelectValue placeholder="Select sub-county..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All SubCounties</SelectItem>
              {availableSubCounties.map((subcounty) => (
                <SelectItem
                  key={`subcounty-${subcounty.subcounty_id}`}
                  value={subcounty.subcounty}
                >
                  {subcounty.subcounty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Ward Select */}
        <div className="flex-1 min-w-0 space-y-2">
          <Label htmlFor="ward" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Ward
            {isWardDisabled && <Lock className="h-3 w-3 text-amber-500" />}
          </Label>
          <Select
            value={normalizedWard || "all"}
            onValueChange={handleWardChange}
            disabled={
              isWardDisabled || !normalizedCounty || availableWards.length === 0
            }
          >
            <SelectTrigger id="ward" className="w-full">
              <SelectValue placeholder="Select ward..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wards</SelectItem>
              {availableWards.map((ward, index) => (
                <SelectItem key={ward.ward_id ? `${ward.ward_id}-${index}` : `ward-${index}`} value={ward.ward}>
                  {ward.ward}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Clear Filters */}
        {((normalizedCounty && !isCountyDisabled) ||
          (normalizedSubCounty && !isSubCountyDisabled) ||
          (normalizedWard && !isWardDisabled)) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear filters
            </button>
          )}
      </div>
    </div>
  );
}
