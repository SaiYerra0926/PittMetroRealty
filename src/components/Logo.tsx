import { Building2, Home, MapPin } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
          <Building2 className="h-7 w-7 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center">
          <Home className="h-2.5 w-2.5 text-white" />
        </div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Amit Agarwal
        </h1>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-yellow-400" />
          <span className="text-sm lg:text-base font-medium text-slate-300 -mt-1">
            Real Estate
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
