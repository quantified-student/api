import { DocumentNode } from "graphql";
import { gql } from "apollo-server-express";

const typeDef: DocumentNode = gql`
    extend type Query {
        CanvasCourses: [CanvasCourses]
        CanvasCourse(courseId: Int): CanvasCourses
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
        
        assignments: [Assignment]
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

    type Assignment {
        id: Int
        description: String
        due_at: String
        unlock_at: String
        lock_at: String
        points_possible: Int
        grading_type: String
        assignment_group_id: Int
        grading_standard_id: Int
        created_at: String
        updated_at: String
        peer_reviews: Boolean
        automatic_peer_reviews: Boolean
        position: Int
        grade_group_students_individually: Boolean
        anonymous_peer_reviews: Boolean
        group_category_id: String
        post_to_sis: Boolean
        moderated_grading: Boolean
        omit_from_final_grade: Boolean
        intra_group_peer_reviews: Boolean
        anonymous_instructor_annotations: Boolean
        anonymous_grading: Boolean
        graders_anonymous_to_graders: Boolean
        grader_count: Int
        grader_comments_visible_to_graders: Boolean
        final_grader_id: String
        grader_names_visible_to_final_grader: Boolean
        allowed_attempts: Int
        annotatable_attachment_id: String
        secure_params: String
        lti_context_id: String
        course_id: Int
        name: String
        has_submitted_submissions: Boolean
        due_date_required: Boolean
        max_name_length: Int
        in_closed_grading_period: Boolean
        graded_submissions_exist: Boolean
        is_quiz_assignment: Boolean
        can_duplicate: Boolean
        original_course_id: String
        original_assignment_id: String
        original_lti_resource_link_id: String
        original_assignment_name: String
        original_quiz_id: String
        workflow_state: String
        important_dates: Boolean
        muted: Boolean
        html_url: String
        has_overrides: Boolean
        needs_grading_count: Int
        sis_assignment_id: String
        integration_id: String
        published: Boolean
        unpublishable: Boolean
        only_visible_to_overrides: Boolean
        locked_for_user: Boolean
        submissions_download_url: String
        post_manually: Boolean
        anonymize_students: Boolean
        require_lockdown_browser: Boolean
        submission_types: [String]
        
        submissions: [Submission]
    }

    type Submission {
        id: Int
        body: String
        url: String
        grade: String
        score: String
        submitted_at: String
        assignment_id: Int
        user_id: Int
        submission_type: String
        workflow_state: String
        grade_matches_current_submission: Boolean
        graded_at: String
        grader_id: String
        attempt: String
        cached_due_date: String
        excused: String
        late_policy_status: String
        points_deducted: String
        grading_period_id: String
        extra_attempts: String
        posted_at: String
        redo_request: Boolean
        late: Boolean
        missing: Boolean
        seconds_late: Int
        entered_grade: String
        entered_score: String
        preview_url: String
    }
`;

export default typeDef;
