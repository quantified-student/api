import { DocumentNode } from "graphql";
import { gql } from "apollo-server-express";

const typeDef: DocumentNode = gql`
    extend type Query {
        CanvasCourses: [CanvasCourses]
    }

    type CanvasCourses {
        id: Int
        name: String
        account_id: Int
        uuid: String
        start_at: String
        grading_standard_id: String
        is_public: Boolean
        created_at: String
        course_code: String
        default_view: String
        root_account_id: Int
        enrollment_term_id: Int
        license: String
        grade_passback_setting: String
        end_at: String
        public_syllabus: Boolean
        public_syllabus_to_auth: Boolean
        storage_quota_mb: Int
        is_public_to_auth_users: Boolean
        homeroom_course: Boolean
        course_color: String
        friendly_name: String
        apply_assignment_group_weights: Boolean
        time_zone: String
        blueprint: Boolean
        template: Boolean
        hide_final_grades: Boolean
        workflow_state: String
        course_format: String
        restrict_enrollments_to_course_dates: Boolean
        enrollments: [Enrollments]
        calendar: Calendar
    }

    type Enrollments {
        type: String
        role: String
        role_id: Int
        user_id: Int
        enrollment_state: String
        limit_privileges_to_course_section: Boolean
    }

    type Calendar {
        ics: String
    }
`;

export default typeDef;
