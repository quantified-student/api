import {RESTDataSource} from "apollo-datasource-rest";

class CanvasAPI extends RESTDataSource {
    willSendRequest(request: any) {
        request.headers.set(
            "Authorization",
            `Bearer ${this.context.Authorization}`
        );
    }

    willSendResponse(response: any) {
        // console.log(response.headers)
    }

    constructor() {
        super();
        this.baseURL = "https://fhict.instructure.com/api/v1";
    }

    async getAllCourses() {
        return this.get(`courses?per_page=30`);
    }

    async getSingleCourse(courseId: number) {
        return this.get(`courses/${courseId}`);
    }

    async getAssignmentData(courseId: number) {
        return this.get(`courses/${courseId}/assignments?per_page=50`);
    }

    async getSubmissionData(courseId: number, assignmentId: number) {
        return this.get(
            `courses/${courseId}/assignments/${assignmentId}/submissions`
        );
    }

    async getOutcomesData(courseId: number, assignmentId: number) {
        const result = await this.get(`https://fhict.instructure.com/api/v1/courses/${courseId}/outcome_results?include=outcomes&include=alignments&per_page=100`);
        return result.outcome_results.filter((outcome: any) => {
            return outcome.links.assignment === `assignment_${assignmentId}`;
        });
    }

    async getEnrollmentData(courseId: number, userId: number) {
        return this.get(`courses/${courseId}/enrollments`);
    }
}

export default CanvasAPI;