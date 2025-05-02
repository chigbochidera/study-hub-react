
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@/types";
import { getCourseById } from "@/data/mockData";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Design",
  "DevOps",
  "Business",
];

const difficultyLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// Quill editor modules config
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

const CreateEditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  const [course, setCourse] = useState<Partial<Course>>({
    title: "",
    description: "",
    thumbnail: "",
    category: "",
    difficulty: "beginner",
    price: 0,
  });

  useEffect(() => {
    if (isEditing) {
      // Fetch course data if editing
      const existingCourse = getCourseById(id);
      if (existingCourse) {
        setCourse(existingCourse);
      } else {
        toast({
          title: "Course not found",
          description: "The course you're trying to edit doesn't exist.",
          variant: "destructive",
        });
        navigate("/admin/courses");
      }
    }
  }, [id, isEditing, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleDescriptionChange = (content: string) => {
    setCourse(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!course.title || !course.description || !course.category || !course.difficulty) {
      toast({
        title: "Validation error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Here we'd send data to an API, but for now just show a success message
    toast({
      title: isEditing ? "Course updated" : "Course created",
      description: isEditing
        ? "The course has been successfully updated."
        : "The course has been successfully created.",
    });
    
    // Redirect back to courses list
    navigate("/admin/courses");
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isEditing ? "Edit Course" : "Create New Course"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update the details of your existing course"
              : "Fill out the form below to create a new course"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={course.title}
                    onChange={handleChange}
                    placeholder="e.g., Complete Web Development Bootcamp"
                    required
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="description">Course Description *</Label>
                  <div className="min-h-[200px]">
                    <ReactQuill
                      theme="snow"
                      value={course.description}
                      onChange={handleDescriptionChange}
                      modules={quillModules}
                      placeholder="Provide a detailed description of your course"
                      className="h-[180px] mb-12"
                    />
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="thumbnail">Thumbnail URL *</Label>
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    value={course.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  {course.thumbnail && (
                    <div className="mt-2">
                      <img
                        src={course.thumbnail}
                        alt="Course thumbnail preview"
                        className="w-full max-w-xs rounded-lg border"
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={course.category || ""}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select
                      value={course.difficulty || ""}
                      onValueChange={(value) => handleSelectChange("difficulty", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={course.price}
                    onChange={handleChange}
                    placeholder="99.99"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/courses")}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateEditCourse;
