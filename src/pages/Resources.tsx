
import React, { useEffect, useState } from 'react';
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
import { X } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  image_url: string;
  bullet_points: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Resources = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      console.log('Fetching resources...');
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        throw error;
      }
      console.log('Fetched resources:', data);
      return data as Resource[];
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

  if (!resources || resources.length === 0) {
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
    <div className="h-[calc(100vh-4rem)] w-[calc(100vw-280px)] overflow-y-auto p-8">
      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources?.map((resource) => (
          <Card key={resource.id} className="flex flex-col bg-card border-border overflow-hidden hover:border-primary/50 transition-colors">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={resource.image_url}
                alt={resource.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader className="space-y-1">
              <h3 className="text-xl font-semibold tracking-tight">{resource.title}</h3>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {formatBulletPoints(resource.bullet_points).map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto pt-6">
              <Button 
                className="w-full"
                onClick={() => setSelectedResource(resource)}
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Resource Details Modal */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-[70vw] max-h-[90vh] flex flex-col">
          <DialogHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setSelectedResource(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            {selectedResource && (
              <>
                <div className="aspect-[21/9] overflow-hidden rounded-t-lg -mx-6 -mt-6">
                  <img
                    src={selectedResource.image_url}
                    alt={selectedResource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <DialogTitle className="text-2xl font-semibold mt-4">
                  {selectedResource.title}
                </DialogTitle>
              </>
            )}
          </DialogHeader>
          <ScrollArea className="flex-1 -mx-6 px-6">
            {selectedResource && (
              <div className="py-4 text-muted-foreground">
                <div className="prose prose-invert max-w-none">
                  {selectedResource.content}
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
