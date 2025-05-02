
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CourseList from "@/components/courses/CourseList";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-[600px] lg:leading-[1.2]">
                  Transform Your Future with Expert-Led Online Courses
                </h1>
                <p className="text-muted-foreground md:text-xl max-w-[600px]">
                  Unlock your potential with our comprehensive online learning platform. Learn from industry experts and gain valuable skills for today's digital world.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <Button asChild size="lg" className="font-semibold">
                  <Link to="/courses">Explore Courses</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register" className="flex items-center gap-2">
                    Join Now <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:flex relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="Students learning"
                className="rounded-lg object-cover mx-auto shadow-lg"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Courses
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Discover our most popular courses and start your learning journey today.
            </p>
          </div>
          <CourseList />
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/courses" className="flex items-center gap-2">
                View All Courses <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose LearnHub
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              We provide the best learning experience with expert instructors and comprehensive courses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn at Your Own Pace</h3>
              <p className="text-muted-foreground">
                Access course materials anytime, anywhere. Learn at your own pace with lifetime access to all purchased courses.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from industry experts who have real-world experience and are passionate about teaching their skills.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certification</h3>
              <p className="text-muted-foreground">
                Earn certificates upon course completion to showcase your skills to employers and boost your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Thousands of students have transformed their lives with our courses. Here's what they have to say.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">RS</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Smith</h4>
                  <p className="text-sm text-muted-foreground">Web Developer</p>
                </div>
              </div>
              <div className="mb-2 text-yellow-500 flex">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="text-muted-foreground">
                "The web development bootcamp was exactly what I needed to transition into tech. Within 3 months of completing the course, I landed my first developer job."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">AM</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Amanda Martinez</h4>
                  <p className="text-sm text-muted-foreground">Data Scientist</p>
                </div>
              </div>
              <div className="mb-2 text-yellow-500 flex">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="text-muted-foreground">
                "I had tried multiple platforms before, but LearnHub's machine learning course was by far the most comprehensive. The practical projects really helped solidify my understanding."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">JW</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">James Wilson</h4>
                  <p className="text-sm text-muted-foreground">UX Designer</p>
                </div>
              </div>
              <div className="mb-2 text-yellow-500 flex">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>☆</span>
              </div>
              <p className="text-muted-foreground">
                "The UI/UX Design Masterclass helped me understand the principles of good design. I've applied these techniques to my work and received great feedback from clients."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="rounded-lg bg-primary/10 p-8 md:p-12 shadow-lg">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
                  Ready to Start Your Learning Journey?
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Join thousands of students and transform your career with our expert-led courses.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
                <Button asChild size="lg" className="font-semibold">
                  <Link to="/courses">Browse Courses</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register">Sign Up Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
