export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      csv_processing_jobs: {
        Row: {
          created_at: string | null
          error_log: string | null
          id: string
          retry_count: number | null
          row_id: string
          status: Database["public"]["Enums"]["job_status"] | null
          updated_at: string | null
          upload_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_log?: string | null
          id?: string
          retry_count?: number | null
          row_id: string
          status?: Database["public"]["Enums"]["job_status"] | null
          updated_at?: string | null
          upload_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_log?: string | null
          id?: string
          retry_count?: number | null
          row_id?: string
          status?: Database["public"]["Enums"]["job_status"] | null
          updated_at?: string | null
          upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "csv_processing_jobs_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "csv_uploads"
            referencedColumns: ["upload_id"]
          },
        ]
      }
      csv_uploads: {
        Row: {
          filename: string
          status: string | null
          table_name: string
          upload_id: string
          upload_timestamp: string | null
          user_id: string | null
        }
        Insert: {
          filename: string
          status?: string | null
          table_name: string
          upload_id?: string
          upload_timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          filename?: string
          status?: string | null
          table_name?: string
          upload_id?: string
          upload_timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      default_notifications: {
        Row: {
          avatar_picture_link: string | null
          created_at: string | null
          name: string
          notification_id: string
          notification_message: string
          time: string
          user_position: string
        }
        Insert: {
          avatar_picture_link?: string | null
          created_at?: string | null
          name: string
          notification_id?: string
          notification_message: string
          time: string
          user_position: string
        }
        Update: {
          avatar_picture_link?: string | null
          created_at?: string | null
          name?: string
          notification_id?: string
          notification_message?: string
          time?: string
          user_position?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          avatar_picture_link: string | null
          created_at: string | null
          name: string
          notification_id: string
          notification_message: string
          user_position: string | null
        }
        Insert: {
          avatar_picture_link?: string | null
          created_at?: string | null
          name: string
          notification_id?: string
          notification_message: string
          user_position?: string | null
        }
        Update: {
          avatar_picture_link?: string | null
          created_at?: string | null
          name?: string
          notification_id?: string
          notification_message?: string
          user_position?: string | null
        }
        Relationships: []
      }
      notifications_read: {
        Row: {
          id: string
          notification_id: string
          read_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          notification_id: string
          read_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          notification_id?: string
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_read_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "default_notifications"
            referencedColumns: ["notification_id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string | null
          full_name: string | null
          id: string
          position: string | null
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          position?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          created_at: string | null
          id: string
          notification_id: string
          notification_message: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_id: string
          notification_message: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_id?: string
          notification_message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notifications_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "default_notifications"
            referencedColumns: ["notification_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_csv_data_table: {
        Args: {
          p_table_name: string
          p_columns: string[]
        }
        Returns: undefined
      }
      create_notification_for_user: {
        Args: {
          p_user_id: string
          p_message: string
          p_name: string
          p_position: string
          p_avatar_url?: string
        }
        Returns: string
      }
      create_user_notification: {
        Args: {
          p_notification_id: string
          p_user_id: string
          p_notification_message: string
        }
        Returns: string
      }
      delete_csv_data_table: {
        Args: {
          p_table_name: string
        }
        Returns: undefined
      }
      get_all_notifications: {
        Args: {
          p_user_id: string
        }
        Returns: {
          notification_id: string
          notification_message: string
          name: string
          user_position: string
          avatar_picture_link: string
          created_at: string
          is_read: boolean
        }[]
      }
      get_unread_notifications: {
        Args: {
          p_user_id: string
        }
        Returns: {
          notification_id: string
          notification_message: string
          name: string
          user_position: string
          avatar_picture_link: string
          created_at: string
        }[]
      }
      get_unread_notifications_count: {
        Args: {
          p_user_id: string
        }
        Returns: number
      }
      mark_notifications_as_read: {
        Args: {
          p_user_id: string
          p_notification_ids: string[]
        }
        Returns: undefined
      }
      transition_job_status: {
        Args: {
          job_id: string
          new_status: Database["public"]["Enums"]["job_status"]
          error_message?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      job_status: "pending" | "processing" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
