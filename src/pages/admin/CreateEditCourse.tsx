
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getCourseById } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BookOpen } from "lucide-react";

const CreateEditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = Boolean(id);

  // Initialize course state
  const [course, setCourse] = useState<Partial<Course>>({
    title: "",
    description: "",
    thumbnail: "",
    category: "",
    difficulty: "beginner",
    price: 0,
  });

  // Initialize course from API if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const existingCourse = getCourseById(id);
      if (existingCourse) {
        setCourse(existingCourse);
      } else {
        toast({
          title: "Error",
          description: "Course not found",
          variant: "destructive",
        });
        navigate("/admin/courses");
      }
    }
  }, [id, isEditMode, navigate, toast]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle description changes from rich text editor
  const handleDescriptionChange = (content: string) => {
    setCourse((prev) => ({
      ...prev,
      description: content,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!course.title || !course.description || !course.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call
    toast({
      title: isEditMode ? "Course Updated" : "Course Created",
      description: `"${course.title}" has been ${isEditMode ? "updated" : "created"} successfully.`,
    });
    
    // Redirect to courses list
    navigate("/admin/courses");
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            {isEditMode ? "Edit Course" : "Create Course"}
          </h1>
          <div className="flex gap-2">
            {isEditMode && (
              <Button 
                variant="default" 
                onClick={() => navigate(`/admin/courses/${id}/chapters`)}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Manage Chapters
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate("/admin/courses")}>
              Cancel
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={course.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Introduction to JavaScript"
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="description">Description *</Label>
                  <div className="quill-container">
                    <ReactQuill
                      value={course.description}
                      onChange={handleDescriptionChange}
                      theme="snow"
                      placeholder="Provide a detailed description of your course..."
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['link'],
                          ['clean']
                        ],
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Use the rich text editor to format your description
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={course.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="it-software">IT & Software</SelectItem>
                        <SelectItem value="personal-development">Personal Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select
                      value={course.difficulty}
                      onValueChange={(value) => handleSelectChange("difficulty", value as "beginner" | "intermediate" | "advanced")}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={course.price}
                      onChange={handleInputChange}
                      placeholder="29.99"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="thumbnail">Thumbnail URL *</Label>
                    <Input
                      id="thumbnail"
                      name="thumbnail"
                      value={course.thumbnail}
                      onChange={handleInputChange}
                      placeholder="https://example.com/thumbnail.jpg"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="px-6">
              {isEditMode ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateEditCourse;
