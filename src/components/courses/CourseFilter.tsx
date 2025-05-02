
import { useState } from "react";
import { Category } from "@/types";
import { Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseFilterProps {
  categories: Category[];
  onFilterChange: (filters: { category: string; difficulty: string }) => void;
}

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const CourseFilter = ({ categories, onFilterChange }: CourseFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({
      category,
      difficulty: selectedDifficulty,
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    onFilterChange({
      category: selectedCategory,
      difficulty,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="max-h-[200px] overflow-y-auto">
            <DropdownMenuItem
              className="flex items-center justify-between"
              onSelect={() => handleCategoryChange("All")}
            >
              <span>All Categories</span>
              {selectedCategory === "All" && <Check size={16} />}
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                className="flex items-center justify-between"
                onSelect={() => handleCategoryChange(category.name)}
              >
                <span>{category.name}</span>
                {selectedCategory === category.name && <Check size={16} />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {difficulties.map((difficulty) => (
              <DropdownMenuItem
                key={difficulty}
                className="flex items-center justify-between"
                onSelect={() => handleDifficultyChange(difficulty)}
              >
                <span>{difficulty}</span>
                {selectedDifficulty === difficulty && <Check size={16} />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CourseFilter;
