import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  image_url: string;
  bullet_points: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Resources = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      console.log('Fetching blogs...');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }
      console.log('Fetched blogs:', data);
      return data as Blog[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-lg text-muted-foreground">Loading resources...</div>
      </div>
    );
  }

  if (error) {
    console.error('Error in component:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-lg text-destructive">Error loading resources. Please try again later.</div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-lg text-muted-foreground">No resources available.</div>
      </div>
    );
  }

  const formatBulletPoints = (bulletPoints: string) => {
    return bulletPoints.split('\n').filter(point => point.trim());
  };

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogs?.map((blog) => (
          <Card key={blog.id} className="flex flex-col overflow-hidden hover:border-primary/50 transition-colors backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader className="space-y-1 p-4">
              <h3 className="text-base font-semibold tracking-tight line-clamp-2">{blog.title}</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                {formatBulletPoints(blog.bullet_points).map((point, index) => (
                  <li key={index} className="line-clamp-1">{point}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto p-4 pt-0">
              <Button 
                size="sm"
                className="w-full"
                onClick={() => setSelectedBlog(blog)}
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="max-w-[70vw] h-[85vh] p-0 flex flex-col backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
          {selectedBlog && (
            <ScrollArea className="h-full w-full">
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={selectedBlog.image_url}
                  alt={selectedBlog.title}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="p-6">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl font-semibold">
                    {selectedBlog.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="text-white/90">
                  <div className="prose prose-invert max-w-none">
                    {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-8 text-white/80 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
