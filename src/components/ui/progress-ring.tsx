
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
}

const ProgressRing = ({
  progress,
  size = 60,
  strokeWidth = 4,
  className,
  showPercentage = true,
}: ProgressRingProps) => {
  // Ensure progress is between 0-100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;
  
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          className="text-muted/30"
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "text-primary transition-all duration-500 ease-in-out",
            normalizedProgress >= 100 && "text-success"
          )}
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {normalizedProgress}%
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
