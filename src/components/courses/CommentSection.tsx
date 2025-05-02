
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Comment } from "@/types";
import { useAuth } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface CommentSectionProps {
  chapterId: string;
  comments: Comment[];
  className?: string;
}

const commentSchema = z.object({
  content: z.string().min(1, { message: "Comment cannot be empty" }).max(500, {
    message: "Comment is too long (maximum 500 characters)",
  }),
});

const mockDate = new Date();

const CommentSection = ({ chapterId, comments: initialComments, className }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Form for new comments
  const commentForm = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  // Form for replies
  const replyForm = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "You need to log in to post a comment.",
        variant: "destructive",
      });
      return;
    }

    // Create new comment object
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: user.id,
      chapterId,
      content: values.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    };

    // Add comment to list
    setComments([newComment, ...comments]);
    
    // Reset form
    commentForm.reset();
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };

  const onReplySubmit = async (values: z.infer<typeof commentSchema>) => {
    if (!isAuthenticated || !user || !replyingTo) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Create new reply object
    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      userId: user.id,
      chapterId,
      content: values.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    };

    // Add reply to comment
    const updatedComments = comments.map(comment => {
      if (comment.id === replyingTo) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingTo(null);
    replyForm.reset();
    
    toast({
      title: "Reply added",
      description: "Your reply has been posted successfully.",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold mb-6">Discussion</h3>

      {/* Comment Form */}
      {isAuthenticated ? (
        <Form {...commentForm}>
          <form onSubmit={commentForm.handleSubmit(onSubmit)} className="mb-8">
            <FormField
              control={commentForm.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts or ask a question..."
                      className="min-h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={commentForm.formState.isSubmitting}>
                {commentForm.formState.isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="bg-muted/50 p-4 rounded-lg mb-8 text-center">
          <p>Please <Button variant="link" className="p-0" asChild><a href="/login">log in</a></Button> to join the discussion.</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-l-4 border-muted pl-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">{comment.user.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 whitespace-pre-line">{comment.content}</p>
                  <div className="mt-2">
                    {isAuthenticated && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      >
                        {replyingTo === comment.id ? "Cancel" : "Reply"}
                      </Button>
                    )}
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4">
                      <Form {...replyForm}>
                        <form onSubmit={replyForm.handleSubmit(onReplySubmit)}>
                          <FormField
                            control={replyForm.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder={`Replying to ${comment.user.name}...`}
                                    className="min-h-20 resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end mt-2">
                            <Button
                              type="submit"
                              size="sm"
                              disabled={replyForm.formState.isSubmitting}
                            >
                              {replyForm.formState.isSubmitting ? "Posting..." : "Reply"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-4 space-y-4">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="border-l-2 border-muted pl-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                              <AvatarFallback>{getInitials(reply.user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h5 className="font-medium text-sm">{reply.user.name}</h5>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(reply.createdAt)}
                                </span>
                              </div>
                              <p className="mt-1 text-sm whitespace-pre-line">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
