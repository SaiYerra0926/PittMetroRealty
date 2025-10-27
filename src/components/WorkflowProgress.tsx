import { CheckCircle, Circle, ArrowRight, Search, Filter, MapPin, Save, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface WorkflowProgressProps {
  currentStep: 'search' | 'filter' | 'map' | 'save' | 'results';
  progress: number;
  onStepClick?: (step: string) => void;
}

const WorkflowProgress = ({ currentStep, progress, onStepClick }: WorkflowProgressProps) => {
  const steps = [
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      description: 'Enter your criteria'
    },
    {
      id: 'filter',
      label: 'Filter',
      icon: Filter,
      description: 'Refine results'
    },
    {
      id: 'map',
      label: 'Map View',
      icon: MapPin,
      description: 'Explore locations'
    },
    {
      id: 'save',
      label: 'Save Search',
      icon: Save,
      description: 'Get notifications'
    },
    {
      id: 'results',
      label: 'Results',
      icon: Eye,
      description: 'View properties'
    }
  ];

  const getStepStatus = (stepId: string) => {
    const stepOrder = ['search', 'filter', 'map', 'save', 'results'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Search Progress</span>
              <Badge variant="outline" className="text-xs">
                {progress}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      status === 'completed'
                        ? 'bg-green-500 text-white'
                        : status === 'current'
                        ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                    onClick={() => onStepClick?.(step.id)}
                  >
                    {status === 'completed' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${
                      status === 'completed' || status === 'current'
                        ? 'text-slate-800'
                        : 'text-slate-500'
                    }`}>
                      {step.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {step.description}
                    </div>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-5 transform translate-x-6">
                      <ArrowRight className="h-4 w-4 text-slate-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                {(() => {
                  const currentStepData = steps.find(s => s.id === currentStep);
                  const Icon = currentStepData?.icon || Search;
                  return <Icon className="h-4 w-4 text-primary" />;
                })()}
              </div>
              <div>
                <div className="font-medium text-slate-800">
                  {steps.find(s => s.id === currentStep)?.label} Step
                </div>
                <div className="text-sm text-slate-600">
                  {steps.find(s => s.id === currentStep)?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowProgress;

