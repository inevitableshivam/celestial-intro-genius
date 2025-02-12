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
      "csv_data_080bcf17-83c9-43a7-a09e-983c79db5309": {
        Row: {
          id: string
          linkedin_scrape_data: string | null
          linkedin_url: string | null
          name: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          user_id: string
          website_scrape_data: string | null
          website_url: string | null
        }
        Insert: {
          id?: string
          linkedin_scrape_data?: string | null
          linkedin_url?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          user_id: string
          website_scrape_data?: string | null
          website_url?: string | null
        }
        Update: {
          id?: string
          linkedin_scrape_data?: string | null
          linkedin_url?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          user_id?: string
          website_scrape_data?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      "csv_data_45f5109b-2ccb-4050-8a3a-749c228fc545": {
        Row: {
          id: string
          link: string | null
          name: string | null
          url: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      "csv_data_465ef34f-bf42-47d5-954c-1f30a88de115": {
        Row: {
          id: string
          link: string | null
          name: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      "csv_data_545b2587-9fb3-4d89-8f4d-1b8f22e9d21e": {
        Row: {
          id: string
          link: string | null
          linkedin_scrape_data: string | null
          name: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          url: string | null
          user_id: string
          website_scrape_data: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id: string
          website_scrape_data?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id?: string
          website_scrape_data?: string | null
        }
        Relationships: []
      }
      "csv_data_5e4c2c61-a32f-4d9e-b731-809dbf0955fd": {
        Row: {
          id: string
          link: string | null
          name: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      "csv_data_69253cd0-981a-47fa-9f8c-0d7b6062d076": {
        Row: {
          id: string
          link: string | null
          linkedin_scrape_data: string | null
          name: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          url: string | null
          user_id: string
          website_scrape_data: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id: string
          website_scrape_data?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id?: string
          website_scrape_data?: string | null
        }
        Relationships: []
      }
      "csv_data_7193ffbc-2f9e-4bc3-a944-72d09f092ec5": {
        Row: {
          City: string | null
          "Company City": string | null
          "Company Country": string | null
          "Company Facebook Url": string | null
          "Company Linkedin Url": string | null
          "Company Name": string | null
          "Company Phone Numbers": string | null
          "Company State": string | null
          "Company Twitter Url": string | null
          "Company Website": string | null
          Country: string | null
          Email: string | null
          "Email Status": string | null
          Employees: string | null
          "Facebook Url": string | null
          "First Name": string | null
          "Full Name": string | null
          id: string
          Industry: string | null
          "Job Title": string | null
          Keywords: string | null
          "Last Name": string | null
          "Linkedin Url": string | null
          linkedin_scrape_data: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          State: string | null
          "Twitter Url": string | null
          user_id: string
          website_scrape_data: string | null
        }
        Insert: {
          City?: string | null
          "Company City"?: string | null
          "Company Country"?: string | null
          "Company Facebook Url"?: string | null
          "Company Linkedin Url"?: string | null
          "Company Name"?: string | null
          "Company Phone Numbers"?: string | null
          "Company State"?: string | null
          "Company Twitter Url"?: string | null
          "Company Website"?: string | null
          Country?: string | null
          Email?: string | null
          "Email Status"?: string | null
          Employees?: string | null
          "Facebook Url"?: string | null
          "First Name"?: string | null
          "Full Name"?: string | null
          id?: string
          Industry?: string | null
          "Job Title"?: string | null
          Keywords?: string | null
          "Last Name"?: string | null
          "Linkedin Url"?: string | null
          linkedin_scrape_data?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          State?: string | null
          "Twitter Url"?: string | null
          user_id: string
          website_scrape_data?: string | null
        }
        Update: {
          City?: string | null
          "Company City"?: string | null
          "Company Country"?: string | null
          "Company Facebook Url"?: string | null
          "Company Linkedin Url"?: string | null
          "Company Name"?: string | null
          "Company Phone Numbers"?: string | null
          "Company State"?: string | null
          "Company Twitter Url"?: string | null
          "Company Website"?: string | null
          Country?: string | null
          Email?: string | null
          "Email Status"?: string | null
          Employees?: string | null
          "Facebook Url"?: string | null
          "First Name"?: string | null
          "Full Name"?: string | null
          id?: string
          Industry?: string | null
          "Job Title"?: string | null
          Keywords?: string | null
          "Last Name"?: string | null
          "Linkedin Url"?: string | null
          linkedin_scrape_data?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          State?: string | null
          "Twitter Url"?: string | null
          user_id?: string
          website_scrape_data?: string | null
        }
        Relationships: []
      }
      "csv_data_a24e577b-c034-41ce-babb-56ab2a95ab85": {
        Row: {
          id: string
          link: string | null
          linkedin_scrape_data: string | null
          name: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          url: string | null
          user_id: string
          website_scrape_data: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id: string
          website_scrape_data?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id?: string
          website_scrape_data?: string | null
        }
        Relationships: []
      }
      "csv_data_a8511216-545a-4262-afac-1ac50befe2d9": {
        Row: {
          id: string
          link: string | null
          name: string | null
          url: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      "csv_data_bed851f2-bcf9-42bb-b9bd-d274d4447679": {
        Row: {
          id: string
          link: string | null
          name: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      "csv_data_c9f46395-8a68-420d-af43-89dd520d36b5": {
        Row: {
          id: string
          link: string | null
          linkedin_scrape_data: string | null
          name: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          url: string | null
          user_id: string
          website_scrape_data: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id: string
          website_scrape_data?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id?: string
          website_scrape_data?: string | null
        }
        Relationships: []
      }
      "csv_data_db6ea9d3-6966-4b24-8f25-4c38c73eb3f8": {
        Row: {
          id: string
          link: string | null
          linkedin_scrape_data: string | null
          name: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          url: string | null
          user_id: string
          website_scrape_data: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id: string
          website_scrape_data?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id?: string
          website_scrape_data?: string | null
        }
        Relationships: []
      }
      "csv_data_deea1cd0-e730-498c-9391-c05cb2091336": {
        Row: {
          id: string
          link: string | null
          linkedin_scrape_data: string | null
          name: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          url: string | null
          user_id: string
          website_scrape_data: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id: string
          website_scrape_data?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id?: string
          website_scrape_data?: string | null
        }
        Relationships: []
      }
      "csv_data_e7071f03-cfbc-4283-8a4a-f953851e4028": {
        Row: {
          id: string
          link: string | null
          linkedin_scrape_data: string | null
          name: string | null
          personalized_line_v1: string | null
          personalized_line_v2: string | null
          personalized_line_v3: string | null
          url: string | null
          user_id: string
          website_scrape_data: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id: string
          website_scrape_data?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          linkedin_scrape_data?: string | null
          name?: string | null
          personalized_line_v1?: string | null
          personalized_line_v2?: string | null
          personalized_line_v3?: string | null
          url?: string | null
          user_id?: string
          website_scrape_data?: string | null
        }
        Relationships: []
      }
      "csv_data_ee7e9c23-78ab-4fe3-88cf-58942d925242": {
        Row: {
          id: string
          link: string | null
          name: string | null
          url: string | null
        }
        Insert: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          link?: string | null
          name?: string | null
          url?: string | null
        }
        Relationships: []
      }
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
          user_id: string
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
          user_id: string
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
          user_id?: string
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
      resources: {
        Row: {
          bullet_points: string
          content: string
          created_at: string | null
          id: string
          image_url: string
          title: string
          updated_at: string | null
        }
        Insert: {
          bullet_points: string
          content: string
          created_at?: string | null
          id?: string
          image_url: string
          title: string
          updated_at?: string | null
        }
        Update: {
          bullet_points?: string
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string
          title?: string
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
      debug_resources_query: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          title: string
          image_url: string
          bullet_points: string
          content: string
          created_at: string
          updated_at: string
        }[]
      }
      delete_csv_data_table: {
        Args: {
          p_table_name: string
        }
        Returns: undefined
      }
      fetch_csv_data: {
        Args: {
          p_table_name: string
        }
        Returns: Json[]
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
      insert_csv_data: {
        Args: {
          p_table_name: string
          p_data: Json
        }
        Returns: undefined
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
