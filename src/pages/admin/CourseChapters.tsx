
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Course, Chapter } from "@/types";
import { getCourseById, getChaptersByCourseId } from "@/data/mockData";
import { Edit, Trash, MoveUp, MoveDown } from "lucide-react";

const CourseChapters = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [newChapter, setNewChapter] = useState<Partial<Chapter>>({
    title: "",
    description: "",
    videoUrl: "",
    duration: 0,
  });

  useEffect(() => {
    if (!courseId) return;
    
    // Fetch course data
    const fetchedCourse = getCourseById(courseId);
    if (fetchedCourse) {
      setCourse(fetchedCourse);
      
      // Fetch chapters
      const fetchedChapters = getChaptersByCourseId(courseId);
      setChapters(fetchedChapters);
    } else {
      toast({
        title: "Course not found",
        description: "The course you're trying to manage doesn't exist.",
        variant: "destructive",
      });
      navigate("/admin/courses");
    }
  }, [courseId, navigate, toast]);

  const handleChapterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewChapter((prev) => ({
      ...prev,
      [name]: name === "duration" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleAddChapter = () => {
    if (!newChapter.title || !newChapter.videoUrl) {
      toast({
        title: "Validation error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API
    const newChapterObj: Chapter = {
      id: `temp-${Date.now()}`,
      courseId: courseId!,
      title: newChapter.title,
      description: newChapter.description || "",
      videoUrl: newChapter.videoUrl,
      duration: newChapter.duration || 0,
      order: chapters.length + 1,
    };
    
    setChapters([...chapters, newChapterObj]);
    setNewChapter({
      title: "",
      description: "",
      videoUrl: "",
      duration: 0,
    });
    setIsAddingChapter(false);
    
    toast({
      title: "Chapter added",
      description: "The chapter has been successfully added.",
    });
  };

  const handleUpdateChapter = () => {
    if (!editingChapter) return;
    
    if (!newChapter.title || !newChapter.videoUrl) {
      toast({
        title: "Validation error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Update the chapter in the list
    setChapters(chapters.map(chapter => 
      chapter.id === editingChapter 
        ? { ...chapter, ...newChapter }
        : chapter
    ));
    
    setNewChapter({
      title: "",
      description: "",
      videoUrl: "",
      duration: 0,
    });
    setEditingChapter(null);
    
    toast({
      title: "Chapter updated",
      description: "The chapter has been successfully updated.",
    });
  };
  
  const handleEditChapter = (chapter: Chapter) => {
    setNewChapter({
      title: chapter.title,
      description: chapter.description,
      videoUrl: chapter.videoUrl,
      duration: chapter.duration,
    });
    setEditingChapter(chapter.id);
    setIsAddingChapter(false);
  };
  
  const handleDeleteChapter = (chapterId: string) => {
    // In a real app, this would call an API
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
    
    toast({
      title: "Chapter deleted",
      description: "The chapter has been successfully deleted.",
    });
  };
  
  const handleMoveChapter = (chapterId: string, direction: 'up' | 'down') => {
    const chapterIndex = chapters.findIndex(chapter => chapter.id === chapterId);
    if (
      (direction === 'up' && chapterIndex === 0) || 
      (direction === 'down' && chapterIndex === chapters.length - 1)
    ) {
      return;
    }
    
    const newChapters = [...chapters];
    const targetIndex = direction === 'up' ? chapterIndex - 1 : chapterIndex + 1;
    
    // Swap chapters
    [newChapters[chapterIndex], newChapters[targetIndex]] = 
    [newChapters[targetIndex], newChapters[chapterIndex]];
    
    // Update order property
    newChapters.forEach((chapter, index) => {
      chapter.order = index + 1;
    });
    
    setChapters(newChapters);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Manage Chapters</h1>
            {course && (
              <p className="text-muted-foreground">
                Course: {course.title}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Button onClick={() => {
              setIsAddingChapter(true);
              setEditingChapter(null);
              setNewChapter({
                title: "",
                description: "",
                videoUrl: "",
                duration: 0,
              });
            }}>
              Add New Chapter
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin/courses")}>
              Back to Courses
            </Button>
          </div>
        </div>

        {/* Chapter list */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Course Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              {chapters.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No chapters yet. Add your first chapter to get started.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chapters.map((chapter) => (
                      <TableRow key={chapter.id}>
                        <TableCell>{chapter.order}</TableCell>
                        <TableCell className="font-medium">{chapter.title}</TableCell>
                        <TableCell>{chapter.duration} min</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoveChapter(chapter.id, 'up')}
                              disabled={chapter.order === 1}
                            >
                              <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoveChapter(chapter.id, 'down')}
                              disabled={chapter.order === chapters.length}
                            >
                              <MoveDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditChapter(chapter)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteChapter(chapter.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Chapter Form */}
        {(isAddingChapter || editingChapter) && (
          <Card>
            <CardHeader>
              <CardTitle>
                {editingChapter ? "Edit Chapter" : "Add New Chapter"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Chapter Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newChapter.title}
                    onChange={handleChapterChange}
                    placeholder="e.g., Introduction to HTML"
                    required
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newChapter.description}
                    onChange={handleChapterChange}
                    placeholder="Brief description of this chapter"
                    rows={3}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="videoUrl">Video URL *</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={newChapter.videoUrl}
                    onChange={handleChapterChange}
                    placeholder="https://example.com/video.mp4"
                    required
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="1"
                    value={newChapter.duration}
                    onChange={handleChapterChange}
                    placeholder="45"
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingChapter(false);
                      setEditingChapter(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={editingChapter ? handleUpdateChapter : handleAddChapter}
                  >
                    {editingChapter ? "Update Chapter" : "Add Chapter"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default CourseChapters;
