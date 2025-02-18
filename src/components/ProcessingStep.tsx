
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { RealtimeChannel } from '@supabase/supabase-js';

interface ProcessingStats {
  totalRows: number;
  linkedin_completed: number;
  website_completed: number;
  personalization_completed: number;
}

interface ProcessingData {
  id: string;
  linkedin_scrape_data: string | null;
  website_scrape_data: string | null;
  personalized_line_v1: string | null;
  personalized_line_v2: string | null;
  personalized_line_v3: string | null;
}

export const ProcessingStep = ({ tableName }: { tableName: string }) => {
  const [stats, setStats] = useState<ProcessingStats>({
    totalRows: 0,
    linkedin_completed: 0,
    website_completed: 0,
    personalization_completed: 0,
  });

  useEffect(() => {
    const fetchInitialStats = async () => {
      try {
        // Get total rows using rpc function
        const { data: rowData, error: countError } = await supabase
          .rpc('fetch_csv_data', { p_table_name: tableName });

        if (countError) throw countError;
        const totalRows = rowData ? rowData.length : 0;

        // Get completed counts
        const { data: completedCounts, error: dataError } = await supabase
          .rpc('fetch_csv_data', { p_table_name: tableName }) as { data: ProcessingData[] | null, error: any };

        if (dataError) throw dataError;

        if (completedCounts) {
          const linkedin_completed = completedCounts.filter(row => row.linkedin_scrape_data !== null).length;
          const website_completed = completedCounts.filter(row => row.website_scrape_data !== null).length;
          const personalization_completed = completedCounts.filter(
            row => row.personalized_line_v1 !== null && 
                   row.personalized_line_v2 !== null && 
                   row.personalized_line_v3 !== null
          ).length;

          setStats({
            totalRows,
            linkedin_completed,
            website_completed,
            personalization_completed,
          });
        }
      } catch (error) {
        console.error('Error fetching initial stats:', error);
      }
    };

    fetchInitialStats();

    // Subscribe to real-time updates
    const channel = supabase.channel('table_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: tableName 
      }, (payload: { old: ProcessingData, new: ProcessingData }) => {
        console.log('Received update:', payload);
        setStats(currentStats => {
          const newStats = { ...currentStats };
          const row = payload.new;

          // Update LinkedIn stats
          if (!payload.old.linkedin_scrape_data && row.linkedin_scrape_data) {
            newStats.linkedin_completed++;
          }

          // Update Website stats
          if (!payload.old.website_scrape_data && row.website_scrape_data) {
            newStats.website_completed++;
          }

          // Update Personalization stats
          const oldPersonalizationComplete = 
            payload.old.personalized_line_v1 && 
            payload.old.personalized_line_v2 && 
            payload.old.personalized_line_v3;
          
          const newPersonalizationComplete = 
            row.personalized_line_v1 && 
            row.personalized_line_v2 && 
            row.personalized_line_v3;

          if (!oldPersonalizationComplete && newPersonalizationComplete) {
            newStats.personalization_completed++;
          }

          return newStats;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName]);

  const calculateProgress = (completed: number) => {
    return stats.totalRows > 0 ? (completed / stats.totalRows) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Processing Progress</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>LinkedIn Scraping</span>
              <span>{stats.linkedin_completed} / {stats.totalRows}</span>
            </div>
            <Progress value={calculateProgress(stats.linkedin_completed)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Website Scraping</span>
              <span>{stats.website_completed} / {stats.totalRows}</span>
            </div>
            <Progress value={calculateProgress(stats.website_completed)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Personalization</span>
              <span>{stats.personalization_completed} / {stats.totalRows}</span>
            </div>
            <Progress value={calculateProgress(stats.personalization_completed)} />
          </div>
        </div>
      </Card>
    </div>
  );
};
