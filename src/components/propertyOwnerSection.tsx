import React from "react";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import OwnerAccess from "./OwnerAccess";

const PropertyOwnerSection = () => {
  return (
    <div className="mt-8 sm:mt-10 md:mt-12">
      <div className="text-center mb-6 sm:mb-8 px-4">
        <Badge variant="outline" className="mb-3 sm:mb-4 text-xs sm:text-sm">
          <Shield className="h-3 w-3 mr-1 flex-shrink-0" />
          Property Owner Services
        </Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
          Owner Portal Access
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          Property owners can access our secure portal to manage listings, upload photos, and track their properties.
        </p>
      </div>
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <OwnerAccess />
      </div>
    </div>
  );
};

export default PropertyOwnerSection;        