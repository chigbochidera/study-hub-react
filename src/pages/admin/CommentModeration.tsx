
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/types";
import { mockComments } from "@/data/mockData";

// Flatten comments for easier display
const flattenComments = (comments: Record<string, Comment[]>) => {
  let result: (Comment & { chapterTitle?: string })[] = [];
  
  Object.entries(comments).forEach(([chapterId, commentList]) => {
    // Add main comments
    const mainComments = commentList.map(comment => ({
      ...comment,
      chapterTitle: `Chapter ${chapterId.split('-')[1]}`, // Fake chapter title for display
    }));
    
    result = [...result, ...mainComments];
    
    // Add replies
    commentList.forEach(comment => {
      if (comment.replies && comment.replies.length > 0) {
        const replies = comment.replies.map(reply => ({
          ...reply,
          chapterTitle: `Chapter ${chapterId.split('-')[1]}`, // Fake chapter title
          isReply: true,
          parentComment: comment.content.substring(0, 50) + '...',
        }));
        
        result = [...result, ...replies];
      }
    });
  });
  
  return result;
};

const CommentModeration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comments, setComments] = useState<(Comment & { 
    chapterTitle?: string; 
    isReply?: boolean;
    parentComment?: string;
  })[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Fetch comments (using mock data for now)
    const flattenedComments = flattenComments(mockComments);
    setComments(flattenedComments);
  }, []);
  
  const filteredComments = comments.filter(comment =>
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteComment = (commentId: string) => {
    // In a real app, this would call an API
    setComments(comments.filter(comment => comment.id !== commentId));
    
    toast({
      title: "Comment deleted",
      description: "The comment has been successfully deleted.",
    });
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Comment Moderation</h1>
            <p className="text-muted-foreground">
              Review and manage user comments
            </p>
          </div>
          <div>
            <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <Input
            placeholder="Search comments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="space-y-6">
          {filteredComments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium">No comments found</p>
              <p className="text-muted-foreground">
                {searchTerm ? "Try a different search term" : "There are no comments to moderate"}
              </p>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <Card key={comment.id} className={comment.isReply ? "ml-8 border-l-4 border-l-primary/20" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                        <img 
                          src={comment.user.avatar || "/placeholder.svg"} 
                          alt={comment.user.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <CardTitle className="text-base">{comment.user.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()} • {comment.chapterTitle}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {comment.isReply && comment.parentComment && (
                    <div className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Reply to:</span> {comment.parentComment}
                    </div>
                  )}
                  <p className="text-sm">{comment.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CommentModeration;
