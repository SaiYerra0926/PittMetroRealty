import React, { useState } from 'react';
import { Lock, Shield, Home, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OwnerAccessProps {
  onAccessGranted?: () => void;
  className?: string;
}

const OwnerAccess: React.FC<OwnerAccessProps> = ({ 
  onAccessGranted,
  className = '' 
}) => {
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Secure access codes (in production, these would be server-validated)
  const validAccessCodes = [
    'OWNER2024',
    'PITT-METRO-OWNER',
    'PROPERTY-ACCESS-2024'
  ];

  const handleAccessRequest = () => {
    setShowAccessForm(true);
  };

  const handleAccessSubmit = () => {
    if (validAccessCodes.includes(accessCode.toUpperCase())) {
      // Redirect to owner portal
      window.location.href = '/admin';
      if (onAccessGranted) {
        onAccessGranted();
      }
    } else {
      setError('Invalid access code. Please contact Pitt Metro Realty for assistance.');
    }
  };

  if (!showAccessForm) {
    return (
      <div className={`${className}`}>
        <Card className="border-2 border-dashed border-slate-300 hover:border-primary/50 transition-colors cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Lock className="h-8 w-8 text-slate-400 group-hover:text-primary transition-colors" />
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Property Owner Access
            </h3>
            
            <p className="text-slate-600 text-sm mb-4 max-w-md mx-auto">
              Secure portal for property owners to manage listings, upload photos, and track their properties.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 mb-4">
              <Shield className="h-3 w-3" />
              <span>Restricted Access Only</span>
            </div>
            
            <Button 
              onClick={handleAccessRequest}
              variant="outline"
              className="group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Request Access
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold text-slate-800">
            Owner Portal Access
          </CardTitle>
          <p className="text-slate-600 text-sm">
            Enter your access code to continue
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code</Label>
            <div className="relative">
              <Input
                id="accessCode"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setError('');
                }}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-400" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowAccessForm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAccessSubmit}
              className="flex-1"
              disabled={!accessCode.trim()}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Access Portal
            </Button>
          </div>
          
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-slate-500">
              Don't have an access code? Contact Pitt Metro Realty at{' '}
              <a href="tel:+14129777090" className="text-primary hover:underline">
                +1-412-977-7090
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerAccess;
