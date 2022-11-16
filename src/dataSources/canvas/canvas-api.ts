import { RESTDataSource } from "apollo-datasource-rest";

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
        return this.get(`courses/${courseId}/assignments?per_page=100`);
    }

    async getSubmissionData(courseId: number, assignmentId: number) {
        // TODO: Implement support for outcomes + outcome_alignments: https://canvas.instructure.com/doc/api/outcomes.html#Outcome
        return this.get(
            `courses/${courseId}/assignments/${assignmentId}/submissions`
        );
    }
}

export default CanvasAPI;
