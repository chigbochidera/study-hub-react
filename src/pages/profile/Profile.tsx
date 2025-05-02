
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

// Form schemas
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      setIsSubmittingProfile(true);
      await updateProfile({
        name: values.name,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handlePasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      setIsSubmittingPassword(true);
      // Simulate an API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      passwordForm.reset();
    } catch (error) {
      console.error("Failed to update password:", error);
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-lg">{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="mt-2">
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form id="profile-form" onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormDescription>
                              Email address cannot be changed
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    form="profile-form" 
                    disabled={isSubmittingProfile}
                  >
                    {isSubmittingProfile ? (
                      <>
                        <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form id="password-form" onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type={showCurrentPassword ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  {...field} 
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showCurrentPassword ? "Hide password" : "Show password"}
                                </span>
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type={showNewPassword ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  {...field} 
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showNewPassword ? "Hide password" : "Show password"}
                                </span>
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type={showConfirmPassword ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  {...field} 
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showConfirmPassword ? "Hide password" : "Show password"}
                                </span>
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    form="password-form" 
                    disabled={isSubmittingPassword}
                  >
                    {isSubmittingPassword ? (
                      <>
                        <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
