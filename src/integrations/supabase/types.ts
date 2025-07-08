export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      apikey: {
        Row: {
          apiKey: string
          apiSecret: string
          id: string
          keyName: string
          updatedDate: string
          workspaceId: string | null
        }
        Insert: {
          apiKey: string
          apiSecret: string
          id?: string
          keyName: string
          updatedDate?: string
          workspaceId?: string | null
        }
        Update: {
          apiKey?: string
          apiSecret?: string
          id?: string
          keyName?: string
          updatedDate?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_apikey_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant: {
        Row: {
          createdDate: string
          credential: string
          details: string
          iconSrc: string | null
          id: string
          type: string | null
          updatedDate: string
          workspaceId: string | null
        }
        Insert: {
          createdDate?: string
          credential: string
          details: string
          iconSrc?: string | null
          id?: string
          type?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Update: {
          createdDate?: string
          credential?: string
          details?: string
          iconSrc?: string | null
          id?: string
          type?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_assistant_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_flow: {
        Row: {
          analytic: string | null
          apiConfig: string | null
          apikeyid: string | null
          category: string | null
          chatbotConfig: string | null
          createdDate: string
          deployed: boolean | null
          flowData: string
          followUpPrompts: string | null
          id: string
          isPublic: boolean | null
          name: string
          speechToText: string | null
          type: string | null
          updatedDate: string
          workspaceId: string | null
        }
        Insert: {
          analytic?: string | null
          apiConfig?: string | null
          apikeyid?: string | null
          category?: string | null
          chatbotConfig?: string | null
          createdDate?: string
          deployed?: boolean | null
          flowData: string
          followUpPrompts?: string | null
          id?: string
          isPublic?: boolean | null
          name: string
          speechToText?: string | null
          type?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Update: {
          analytic?: string | null
          apiConfig?: string | null
          apikeyid?: string | null
          category?: string | null
          chatbotConfig?: string | null
          createdDate?: string
          deployed?: boolean | null
          flowData?: string
          followUpPrompts?: string | null
          id?: string
          isPublic?: boolean | null
          name?: string
          speechToText?: string | null
          type?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_chat_flow_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_message: {
        Row: {
          action: string | null
          agentReasoning: string | null
          artifacts: string | null
          chatflowid: string
          chatId: string
          chatType: string
          content: string
          createdDate: string
          executionId: string | null
          fileAnnotations: string | null
          fileUploads: string | null
          followUpPrompts: string | null
          id: string
          leadEmail: string | null
          memoryType: string | null
          role: string
          sessionId: string | null
          sourceDocuments: string | null
          usedTools: string | null
        }
        Insert: {
          action?: string | null
          agentReasoning?: string | null
          artifacts?: string | null
          chatflowid: string
          chatId: string
          chatType?: string
          content: string
          createdDate?: string
          executionId?: string | null
          fileAnnotations?: string | null
          fileUploads?: string | null
          followUpPrompts?: string | null
          id?: string
          leadEmail?: string | null
          memoryType?: string | null
          role: string
          sessionId?: string | null
          sourceDocuments?: string | null
          usedTools?: string | null
        }
        Update: {
          action?: string | null
          agentReasoning?: string | null
          artifacts?: string | null
          chatflowid?: string
          chatId?: string
          chatType?: string
          content?: string
          createdDate?: string
          executionId?: string | null
          fileAnnotations?: string | null
          fileUploads?: string | null
          followUpPrompts?: string | null
          id?: string
          leadEmail?: string | null
          memoryType?: string | null
          role?: string
          sessionId?: string | null
          sourceDocuments?: string | null
          usedTools?: string | null
        }
        Relationships: []
      }
      chat_message_feedback: {
        Row: {
          chatflowid: string
          chatId: string
          content: string | null
          createdDate: string
          id: string
          messageId: string
          rating: string
        }
        Insert: {
          chatflowid: string
          chatId: string
          content?: string | null
          createdDate?: string
          id?: string
          messageId: string
          rating: string
        }
        Update: {
          chatflowid?: string
          chatId?: string
          content?: string | null
          createdDate?: string
          id?: string
          messageId?: string
          rating?: string
        }
        Relationships: []
      }
      contract_compliance_assessments: {
        Row: {
          applicable_regulatory_reference: string | null
          category: string | null
          compliance_assessment: string | null
          contract_name: string | null
          contract_review_id: string | null
          contractual_reference: string | null
          created_at: string | null
          id: number
          item_no: string | null
          legal_justification: string | null
          original_clause: string | null
          recommended_legal_amendment: string | null
          revised_clause: string | null
          session_token: string | null
          status: string | null
          user_email: string | null
          user_role: string | null
        }
        Insert: {
          applicable_regulatory_reference?: string | null
          category?: string | null
          compliance_assessment?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          created_at?: string | null
          id?: number
          item_no?: string | null
          legal_justification?: string | null
          original_clause?: string | null
          recommended_legal_amendment?: string | null
          revised_clause?: string | null
          session_token?: string | null
          status?: string | null
          user_email?: string | null
          user_role?: string | null
        }
        Update: {
          applicable_regulatory_reference?: string | null
          category?: string | null
          compliance_assessment?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          created_at?: string | null
          id?: number
          item_no?: string | null
          legal_justification?: string | null
          original_clause?: string | null
          recommended_legal_amendment?: string | null
          revised_clause?: string | null
          session_token?: string | null
          status?: string | null
          user_email?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      contract_redundancy_check: {
        Row: {
          clause_summary: string | null
          contract_name: string | null
          contract_review_id: string | null
          contractual_reference: string | null
          created_at: string | null
          id: number
          item_no: number | null
          rationale: string | null
          recommendation: string | null
          session_token: string | null
          similar_overlapping_clauses: string | null
          status: string | null
          user_email: string | null
          user_role: string | null
        }
        Insert: {
          clause_summary?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          created_at?: string | null
          id?: number
          item_no?: number | null
          rationale?: string | null
          recommendation?: string | null
          session_token?: string | null
          similar_overlapping_clauses?: string | null
          status?: string | null
          user_email?: string | null
          user_role?: string | null
        }
        Update: {
          clause_summary?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          created_at?: string | null
          id?: number
          item_no?: number | null
          rationale?: string | null
          recommendation?: string | null
          session_token?: string | null
          similar_overlapping_clauses?: string | null
          status?: string | null
          user_email?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      contract_updates: {
        Row: {
          applicable_regulatory_reference: string | null
          compliance_assessment: string | null
          contract_name: string | null
          contract_review_id: string | null
          contractual_reference: string | null
          created_at: string | null
          id: number
          input_verification_of_amendments: string | null
          legal_justification: string | null
          original_clause: string | null
          original_pdf_text: string | null
          recommended_legal_amendment: string | null
          review_date: string | null
          session_token: string | null
          status: string | null
          updated_at: string | null
          user_email: string
          user_role: string | null
        }
        Insert: {
          applicable_regulatory_reference?: string | null
          compliance_assessment?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          created_at?: string | null
          id?: number
          input_verification_of_amendments?: string | null
          legal_justification?: string | null
          original_clause?: string | null
          original_pdf_text?: string | null
          recommended_legal_amendment?: string | null
          review_date?: string | null
          session_token?: string | null
          status?: string | null
          updated_at?: string | null
          user_email: string
          user_role?: string | null
        }
        Update: {
          applicable_regulatory_reference?: string | null
          compliance_assessment?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          created_at?: string | null
          id?: number
          input_verification_of_amendments?: string | null
          legal_justification?: string | null
          original_clause?: string | null
          original_pdf_text?: string | null
          recommended_legal_amendment?: string | null
          review_date?: string | null
          session_token?: string | null
          status?: string | null
          updated_at?: string | null
          user_email?: string
          user_role?: string | null
        }
        Relationships: []
      }
      contract_updates_2: {
        Row: {
          applicable_regulatory_reference: string | null
          compliance_assessment: string | null
          contract_name: string | null
          contract_review_id: string | null
          contractual_reference: string | null
          created_at: string | null
          id: number
          input_verification_of_amendments: string | null
          legal_justification: string | null
          original_clause: string | null
          original_pdf_text: string | null
          recommended_legal_amendment: string | null
          session_token: string | null
          status: string | null
          user_email: string | null
          user_role: string | null
        }
        Insert: {
          applicable_regulatory_reference?: string | null
          compliance_assessment?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          created_at?: string | null
          id?: number
          input_verification_of_amendments?: string | null
          legal_justification?: string | null
          original_clause?: string | null
          original_pdf_text?: string | null
          recommended_legal_amendment?: string | null
          session_token?: string | null
          status?: string | null
          user_email?: string | null
          user_role?: string | null
        }
        Update: {
          applicable_regulatory_reference?: string | null
          compliance_assessment?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          created_at?: string | null
          id?: number
          input_verification_of_amendments?: string | null
          legal_justification?: string | null
          original_clause?: string | null
          original_pdf_text?: string | null
          recommended_legal_amendment?: string | null
          session_token?: string | null
          status?: string | null
          user_email?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      credential: {
        Row: {
          createdDate: string
          credentialName: string
          encryptedData: string
          id: string
          name: string
          updatedDate: string
          workspaceId: string | null
        }
        Insert: {
          createdDate?: string
          credentialName: string
          encryptedData: string
          id?: string
          name: string
          updatedDate?: string
          workspaceId?: string | null
        }
        Update: {
          createdDate?: string
          credentialName?: string
          encryptedData?: string
          id?: string
          name?: string
          updatedDate?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_credential_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_template: {
        Row: {
          badge: string | null
          createdDate: string
          description: string | null
          flowData: string
          framework: string | null
          id: string
          name: string
          type: string | null
          updatedDate: string
          usecases: string | null
          workspaceId: string | null
        }
        Insert: {
          badge?: string | null
          createdDate?: string
          description?: string | null
          flowData: string
          framework?: string | null
          id?: string
          name: string
          type?: string | null
          updatedDate?: string
          usecases?: string | null
          workspaceId?: string | null
        }
        Update: {
          badge?: string | null
          createdDate?: string
          description?: string | null
          flowData?: string
          framework?: string | null
          id?: string
          name?: string
          type?: string | null
          updatedDate?: string
          usecases?: string | null
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_custom_template_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      dataset: {
        Row: {
          createdDate: string
          description: string | null
          id: string
          name: string
          updatedDate: string
          workspaceId: string | null
        }
        Insert: {
          createdDate?: string
          description?: string | null
          id?: string
          name: string
          updatedDate?: string
          workspaceId?: string | null
        }
        Update: {
          createdDate?: string
          description?: string | null
          id?: string
          name?: string
          updatedDate?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_dataset_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      dataset_row: {
        Row: {
          datasetId: string
          id: string
          input: string
          output: string | null
          sequence_no: number | null
          updatedDate: string
        }
        Insert: {
          datasetId: string
          id?: string
          input: string
          output?: string | null
          sequence_no?: number | null
          updatedDate?: string
        }
        Update: {
          datasetId?: string
          id?: string
          input?: string
          output?: string | null
          sequence_no?: number | null
          updatedDate?: string
        }
        Relationships: []
      }
      document_store: {
        Row: {
          createdDate: string
          description: string | null
          embeddingConfig: string | null
          id: string
          loaders: string | null
          name: string
          recordManagerConfig: string | null
          status: string
          updatedDate: string
          vectorStoreConfig: string | null
          whereUsed: string | null
          workspaceId: string | null
        }
        Insert: {
          createdDate?: string
          description?: string | null
          embeddingConfig?: string | null
          id?: string
          loaders?: string | null
          name: string
          recordManagerConfig?: string | null
          status: string
          updatedDate?: string
          vectorStoreConfig?: string | null
          whereUsed?: string | null
          workspaceId?: string | null
        }
        Update: {
          createdDate?: string
          description?: string | null
          embeddingConfig?: string | null
          id?: string
          loaders?: string | null
          name?: string
          recordManagerConfig?: string | null
          status?: string
          updatedDate?: string
          vectorStoreConfig?: string | null
          whereUsed?: string | null
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_document_store_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      document_store_file_chunk: {
        Row: {
          chunkNo: number
          docId: string
          id: string
          metadata: string | null
          pageContent: string | null
          storeId: string
        }
        Insert: {
          chunkNo: number
          docId: string
          id?: string
          metadata?: string | null
          pageContent?: string | null
          storeId: string
        }
        Update: {
          chunkNo?: number
          docId?: string
          id?: string
          metadata?: string | null
          pageContent?: string | null
          storeId?: string
        }
        Relationships: []
      }
      evaluation: {
        Row: {
          additionalConfig: string | null
          average_metrics: string | null
          chatflowId: string
          chatflowName: string
          datasetId: string
          datasetName: string
          evaluationType: string
          id: string
          name: string
          runDate: string
          status: string
          workspaceId: string | null
        }
        Insert: {
          additionalConfig?: string | null
          average_metrics?: string | null
          chatflowId: string
          chatflowName: string
          datasetId: string
          datasetName: string
          evaluationType: string
          id?: string
          name: string
          runDate?: string
          status: string
          workspaceId?: string | null
        }
        Update: {
          additionalConfig?: string | null
          average_metrics?: string | null
          chatflowId?: string
          chatflowName?: string
          datasetId?: string
          datasetName?: string
          evaluationType?: string
          id?: string
          name?: string
          runDate?: string
          status?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_evaluation_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_run: {
        Row: {
          actualOutput: string | null
          errors: string | null
          evaluationId: string
          evaluators: string | null
          expectedOutput: string | null
          id: string
          input: string
          llmEvaluators: string | null
          metrics: string | null
          runDate: string
        }
        Insert: {
          actualOutput?: string | null
          errors?: string | null
          evaluationId: string
          evaluators?: string | null
          expectedOutput?: string | null
          id?: string
          input: string
          llmEvaluators?: string | null
          metrics?: string | null
          runDate?: string
        }
        Update: {
          actualOutput?: string | null
          errors?: string | null
          evaluationId?: string
          evaluators?: string | null
          expectedOutput?: string | null
          id?: string
          input?: string
          llmEvaluators?: string | null
          metrics?: string | null
          runDate?: string
        }
        Relationships: []
      }
      evaluator: {
        Row: {
          config: string | null
          createdDate: string
          id: string
          name: string
          type: string | null
          updatedDate: string
          workspaceId: string | null
        }
        Insert: {
          config?: string | null
          createdDate?: string
          id?: string
          name: string
          type?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Update: {
          config?: string | null
          createdDate?: string
          id?: string
          name?: string
          type?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_evaluator_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      execution: {
        Row: {
          action: string | null
          agentflowId: string
          createdDate: string
          executionData: string
          id: string
          isPublic: boolean | null
          sessionId: string
          state: string
          stoppedDate: string | null
          updatedDate: string
          workspaceId: string | null
        }
        Insert: {
          action?: string | null
          agentflowId: string
          createdDate?: string
          executionData: string
          id?: string
          isPublic?: boolean | null
          sessionId: string
          state: string
          stoppedDate?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Update: {
          action?: string | null
          agentflowId?: string
          createdDate?: string
          executionData?: string
          id?: string
          isPublic?: boolean | null
          sessionId?: string
          state?: string
          stoppedDate?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_execution_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      lead: {
        Row: {
          chatflowid: string
          chatId: string
          createdDate: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          chatflowid: string
          chatId: string
          createdDate?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          chatflowid?: string
          chatId?: string
          createdDate?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      login_activity: {
        Row: {
          activity_code: number
          attemptedDateTime: string
          id: string
          login_mode: string | null
          message: string
          username: string
        }
        Insert: {
          activity_code: number
          attemptedDateTime?: string
          id?: string
          login_mode?: string | null
          message: string
          username: string
        }
        Update: {
          activity_code?: number
          attemptedDateTime?: string
          id?: string
          login_mode?: string | null
          message?: string
          username?: string
        }
        Relationships: []
      }
      login_method: {
        Row: {
          config: string
          createdBy: string | null
          createdDate: string
          id: string
          name: string
          organizationId: string | null
          status: string
          updatedBy: string | null
          updatedDate: string
        }
        Insert: {
          config: string
          createdBy?: string | null
          createdDate?: string
          id?: string
          name: string
          organizationId?: string | null
          status?: string
          updatedBy?: string | null
          updatedDate?: string
        }
        Update: {
          config?: string
          createdBy?: string | null
          createdDate?: string
          id?: string
          name?: string
          organizationId?: string | null
          status?: string
          updatedBy?: string | null
          updatedDate?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_createdBy"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_organizationId"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_updatedBy"
            columns: ["updatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      login_sessions: {
        Row: {
          expire: string
          sess: Json
          sid: string
        }
        Insert: {
          expire: string
          sess: Json
          sid: string
        }
        Update: {
          expire?: string
          sess?: Json
          sid?: string
        }
        Relationships: []
      }
      master_contract: {
        Row: {
          api_review_response: string | null
          contract_name: string | null
          contract_review_id: string | null
          created_at: string | null
          id: number
          language_1: string | null
          original_pdf_text: string | null
          party_positioning: string | null
          review_date: string | null
          revised_contract_name: string | null
          revised_contract_plain_text: string | null
          revised_contract_text: string | null
          revised_contract_text_bilingual: string | null
          revised_contract_text_english: string | null
          revised_contract_text_indonesian: string | null
          risk_positioning: string | null
          session_token: string | null
          status: string | null
          updated_at: string | null
          updates_text: string | null
          user_email: string
          user_role: string | null
        }
        Insert: {
          api_review_response?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          created_at?: string | null
          id?: number
          language_1?: string | null
          original_pdf_text?: string | null
          party_positioning?: string | null
          review_date?: string | null
          revised_contract_name?: string | null
          revised_contract_plain_text?: string | null
          revised_contract_text?: string | null
          revised_contract_text_bilingual?: string | null
          revised_contract_text_english?: string | null
          revised_contract_text_indonesian?: string | null
          risk_positioning?: string | null
          session_token?: string | null
          status?: string | null
          updated_at?: string | null
          updates_text?: string | null
          user_email: string
          user_role?: string | null
        }
        Update: {
          api_review_response?: string | null
          contract_name?: string | null
          contract_review_id?: string | null
          created_at?: string | null
          id?: number
          language_1?: string | null
          original_pdf_text?: string | null
          party_positioning?: string | null
          review_date?: string | null
          revised_contract_name?: string | null
          revised_contract_plain_text?: string | null
          revised_contract_text?: string | null
          revised_contract_text_bilingual?: string | null
          revised_contract_text_english?: string | null
          revised_contract_text_indonesian?: string | null
          risk_positioning?: string | null
          session_token?: string | null
          status?: string | null
          updated_at?: string | null
          updates_text?: string | null
          user_email?: string
          user_role?: string | null
        }
        Relationships: []
      }
      master_contract_redundancy_items: {
        Row: {
          clause_summary: string | null
          contract_review_id: string | null
          contractual_reference: string | null
          id: number
          raionale: string | null
          recommendation: string | null
          similar_overlapping_clause: string | null
          sort_number: number | null
          status: string | null
        }
        Insert: {
          clause_summary?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          id?: number
          raionale?: string | null
          recommendation?: string | null
          similar_overlapping_clause?: string | null
          sort_number?: number | null
          status?: string | null
        }
        Update: {
          clause_summary?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          id?: number
          raionale?: string | null
          recommendation?: string | null
          similar_overlapping_clause?: string | null
          sort_number?: number | null
          status?: string | null
        }
        Relationships: []
      }
      master_contract_review_recomendation_items: {
        Row: {
          applicable_regulatory_reference: string | null
          category: string | null
          compliance_assessment: string | null
          contract_review_id: string | null
          contractual_reference: string | null
          id: number
          legal_justification: string | null
          original_clause: string | null
          recommended_legal_amendment: string | null
          revised_clause: string | null
          sort_number: number | null
          status: string | null
        }
        Insert: {
          applicable_regulatory_reference?: string | null
          category?: string | null
          compliance_assessment?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          id?: number
          legal_justification?: string | null
          original_clause?: string | null
          recommended_legal_amendment?: string | null
          revised_clause?: string | null
          sort_number?: number | null
          status?: string | null
        }
        Update: {
          applicable_regulatory_reference?: string | null
          category?: string | null
          compliance_assessment?: string | null
          contract_review_id?: string | null
          contractual_reference?: string | null
          id?: number
          legal_justification?: string | null
          original_clause?: string | null
          recommended_legal_amendment?: string | null
          revised_clause?: string | null
          sort_number?: number | null
          status?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          id: number
          name: string
          timestamp: number
        }
        Insert: {
          id?: number
          name: string
          timestamp: number
        }
        Update: {
          id?: number
          name?: string
          timestamp?: number
        }
        Relationships: []
      }
      organization: {
        Row: {
          createdBy: string
          createdDate: string
          customerId: string | null
          id: string
          name: string
          subscriptionId: string | null
          updatedBy: string
          updatedDate: string
        }
        Insert: {
          createdBy: string
          createdDate?: string
          customerId?: string | null
          id?: string
          name?: string
          subscriptionId?: string | null
          updatedBy: string
          updatedDate?: string
        }
        Update: {
          createdBy?: string
          createdDate?: string
          customerId?: string | null
          id?: string
          name?: string
          subscriptionId?: string | null
          updatedBy?: string
          updatedDate?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_createdBy"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_updatedBy"
            columns: ["updatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_user: {
        Row: {
          createdBy: string
          createdDate: string
          organizationId: string
          roleId: string
          status: string
          updatedBy: string
          updatedDate: string
          userId: string
        }
        Insert: {
          createdBy: string
          createdDate?: string
          organizationId: string
          roleId: string
          status?: string
          updatedBy: string
          updatedDate?: string
          userId: string
        }
        Update: {
          createdBy?: string
          createdDate?: string
          organizationId?: string
          roleId?: string
          status?: string
          updatedBy?: string
          updatedDate?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_createdBy"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_organizationId"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_roleId"
            columns: ["roleId"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_updatedBy"
            columns: ["updatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_userId"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      role: {
        Row: {
          createdBy: string | null
          createdDate: string
          description: string | null
          id: string
          name: string
          organizationId: string | null
          permissions: string
          updatedBy: string | null
          updatedDate: string
        }
        Insert: {
          createdBy?: string | null
          createdDate?: string
          description?: string | null
          id?: string
          name: string
          organizationId?: string | null
          permissions: string
          updatedBy?: string | null
          updatedDate?: string
        }
        Update: {
          createdBy?: string | null
          createdDate?: string
          description?: string | null
          id?: string
          name?: string
          organizationId?: string | null
          permissions?: string
          updatedBy?: string | null
          updatedDate?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_createdBy"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_organizationId"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_updatedBy"
            columns: ["updatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      tool: {
        Row: {
          color: string
          createdDate: string
          description: string
          func: string | null
          iconSrc: string | null
          id: string
          name: string
          schema: string | null
          updatedDate: string
          workspaceId: string | null
        }
        Insert: {
          color: string
          createdDate?: string
          description: string
          func?: string | null
          iconSrc?: string | null
          id?: string
          name: string
          schema?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Update: {
          color?: string
          createdDate?: string
          description?: string
          func?: string | null
          iconSrc?: string | null
          id?: string
          name?: string
          schema?: string | null
          updatedDate?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_tool_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      upsert_history: {
        Row: {
          chatflowid: string
          date: string
          flowData: string
          id: string
          result: string
        }
        Insert: {
          chatflowid: string
          date?: string
          flowData: string
          id?: string
          result: string
        }
        Update: {
          chatflowid?: string
          date?: string
          flowData?: string
          id?: string
          result?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          createdBy: string
          createdDate: string
          credential: string | null
          email: string
          id: string
          name: string
          status: string
          tempToken: string | null
          tokenExpiry: string | null
          updatedBy: string
          updatedDate: string
        }
        Insert: {
          createdBy: string
          createdDate?: string
          credential?: string | null
          email: string
          id?: string
          name: string
          status?: string
          tempToken?: string | null
          tokenExpiry?: string | null
          updatedBy: string
          updatedDate?: string
        }
        Update: {
          createdBy?: string
          createdDate?: string
          credential?: string | null
          email?: string
          id?: string
          name?: string
          status?: string
          tempToken?: string | null
          tokenExpiry?: string | null
          updatedBy?: string
          updatedDate?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_createdBy"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_updatedBy"
            columns: ["updatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile: {
        Row: {
          created_at: string
          email: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      variable: {
        Row: {
          createdDate: string
          id: string
          name: string
          type: string | null
          updatedDate: string
          value: string
          workspaceId: string | null
        }
        Insert: {
          createdDate?: string
          id?: string
          name: string
          type?: string | null
          updatedDate?: string
          value: string
          workspaceId?: string | null
        }
        Update: {
          createdDate?: string
          id?: string
          name?: string
          type?: string | null
          updatedDate?: string
          value?: string
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_variable_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace: {
        Row: {
          createdBy: string
          createdDate: string
          description: string | null
          id: string
          name: string
          organizationId: string
          updatedBy: string
          updatedDate: string
        }
        Insert: {
          createdBy: string
          createdDate?: string
          description?: string | null
          id?: string
          name: string
          organizationId: string
          updatedBy: string
          updatedDate?: string
        }
        Update: {
          createdBy?: string
          createdDate?: string
          description?: string | null
          id?: string
          name?: string
          organizationId?: string
          updatedBy?: string
          updatedDate?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_createdBy"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_organizationId"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_updatedBy"
            columns: ["updatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_shared: {
        Row: {
          createdDate: string
          id: string
          itemType: string
          sharedItemId: string
          updatedDate: string
          workspaceId: string
        }
        Insert: {
          createdDate?: string
          id?: string
          itemType: string
          sharedItemId: string
          updatedDate?: string
          workspaceId: string
        }
        Update: {
          createdDate?: string
          id?: string
          itemType?: string
          sharedItemId?: string
          updatedDate?: string
          workspaceId?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_workspace_shared_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_user: {
        Row: {
          createdBy: string
          createdDate: string
          lastLogin: string | null
          roleId: string
          status: string
          updatedBy: string
          updatedDate: string
          userId: string
          workspaceId: string
        }
        Insert: {
          createdBy: string
          createdDate?: string
          lastLogin?: string | null
          roleId: string
          status?: string
          updatedBy: string
          updatedDate?: string
          userId: string
          workspaceId: string
        }
        Update: {
          createdBy?: string
          createdDate?: string
          lastLogin?: string | null
          roleId?: string
          status?: string
          updatedBy?: string
          updatedDate?: string
          userId?: string
          workspaceId?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_createdBy"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_roleId"
            columns: ["roleId"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_updatedBy"
            columns: ["updatedBy"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_userId"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_workspaceId"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
