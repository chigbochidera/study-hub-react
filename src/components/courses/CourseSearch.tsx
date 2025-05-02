
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CourseSearchProps {
  onSearch: (query: string) => void;
}

const CourseSearch = ({ onSearch }: CourseSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
        aria-hidden="true"
      />
    </form>
  );
};

export default CourseSearch;
