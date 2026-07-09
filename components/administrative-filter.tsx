"use client";

import { useState, useEffect } from "react";
import { useAdministrativeUnits } from "@/lib/utils/use-administrative-units";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Map } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface AdministrativeFilterValue {
  county: string | null;
  subcounty: string | null;
  ward: string | null;
}

interface AdministrativeFilterProps {
  value?: AdministrativeFilterValue;
  onChange?: (value: AdministrativeFilterValue) => void;
  showCard?: boolean;
  disabled?: boolean;
  preSelectedCounty?: string | null;
  lockCounty?: boolean;
}

export function AdministrativeFilter({
  value,
  onChange,
  showCard = true,
  disabled = false,
  preSelectedCounty = null,
  lockCounty = false,
}: AdministrativeFilterProps) {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(
    preSelectedCounty || value?.county || null
  );
  const [selectedSubcounty, setSelectedSubcounty] = useState<string | null>(
    value?.subcounty || null
  );
  const [selectedWard, setSelectedWard] = useState<string | null>(
    value?.ward || null
  );

  const { administrativeUnits, isLoading } = useAdministrativeUnits();

  const availableSubcounties = selectedCounty
    ? administrativeUnits.subCounties[selectedCounty] || []
    : [];
  const availableWards =
    selectedCounty && selectedSubcounty
      ? administrativeUnits.wards[`${selectedCounty}:${selectedSubcounty}`] ||
      []
      : [];

  const handleCountyChange = (county: string) => {
    const countyValue = county === "ALL_COUNTIES" ? null : county;
    setSelectedCounty(countyValue);
    setSelectedSubcounty(null);
    setSelectedWard(null);
    onChange?.({ county: countyValue, subcounty: null, ward: null });
  };

  const handleSubcountyChange = (subcounty: string) => {
    const subcountyValue = subcounty === "ALL_SUBCOUNTIES" ? null : subcounty;
    setSelectedSubcounty(subcountyValue);
    setSelectedWard(null); // Reset ward when subcounty changes
    onChange?.({
      county: selectedCounty,
      subcounty: subcountyValue,
      ward: null,
    });
  };

  const handleWardChange = (ward: string) => {
    const wardValue = ward === "ALL_WARDS" ? null : ward;
    setSelectedWard(wardValue);
    onChange?.({
      county: selectedCounty,
      subcounty: selectedSubcounty,
      ward: wardValue,
    });
  };

  const handleClear = () => {
    const resetCounty = lockCounty ? preSelectedCounty : null;
    setSelectedCounty(resetCounty);
    setSelectedSubcounty(null);
    setSelectedWard(null);
    onChange?.({ county: resetCounty, subcounty: null, ward: null });
  };

  useEffect(() => {
    if (preSelectedCounty && !selectedCounty) {
      setSelectedCounty(preSelectedCounty);
      onChange?.({ county: preSelectedCounty, subcounty: null, ward: null });
    }
  }, [preSelectedCounty]);

  const filterContent = (
    <div className="space-y-4">
      {/* County Selector */}
      <div className="space-y-2">
        <Label htmlFor="county" className="flex items-center gap-2">
          <Map className="h-4 w-4" />
          County
        </Label>
        <Select
          value={selectedCounty || "ALL_COUNTIES"}
          onValueChange={handleCountyChange}
          disabled={disabled || isLoading || lockCounty}
        >
          <SelectTrigger id="county">
            <SelectValue
              placeholder={isLoading ? "Loading..." : "Select county"}
            />
          </SelectTrigger>
          <SelectContent>
            {!lockCounty && (
              <SelectItem value="ALL_COUNTIES">
                <span className="font-medium">All Counties</span>
              </SelectItem>
            )}
            {administrativeUnits.counties.map((county) => (
              <SelectItem key={county} value={county}>
                {county}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCounty && availableSubcounties.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="subcounty">Subcounty</Label>
          <Select
            value={selectedSubcounty || "ALL_SUBCOUNTIES"}
            onValueChange={handleSubcountyChange}
            disabled={disabled || isLoading}
          >
            <SelectTrigger id="subcounty">
              <SelectValue placeholder="Select subcounty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL_SUBCOUNTIES">
                <span className="font-medium">All Subcounties</span>
              </SelectItem>
              {availableSubcounties.map((subcounty) => (
                <SelectItem key={subcounty} value={subcounty}>
                  {subcounty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedSubcounty && availableWards.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="ward">Ward</Label>
          <Select
            value={selectedWard || "ALL_WARDS"}
            onValueChange={handleWardChange}
            disabled={disabled || isLoading}
          >
            <SelectTrigger id="ward">
              <SelectValue placeholder="Select ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL_WARDS">
                <span className="font-medium">All Wards</span>
              </SelectItem>
              {availableWards.map((ward) => (
                <SelectItem key={ward} value={ward}>
                  {ward}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(selectedCounty || selectedSubcounty || selectedWard) && (
        <>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={disabled}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filter
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="font-medium">Active filters:</span>
            {selectedCounty && (
              <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
                County: {selectedCounty}
              </span>
            )}
            {selectedSubcounty && (
              <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
                Subcounty: {selectedSubcounty}
              </span>
            )}
            {selectedWard && (
              <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
                Ward: {selectedWard}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );

  if (showCard) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Administrative Filter</CardTitle>
          <CardDescription>
            {lockCounty
              ? "Your assigned county is pre-selected."
              : "Filter data by administrative units."}
          </CardDescription>
        </CardHeader>
        <CardContent>{filterContent}</CardContent>
      </Card>
    );
  }

  return filterContent;
}
