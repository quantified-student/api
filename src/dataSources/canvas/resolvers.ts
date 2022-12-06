const resolvers = {
    Query: {
        CanvasCourses: (parent: any, args: any, { dataSources }: any) => {
            return dataSources.canvasData.getAllCourses()
        },
        CanvasCourse: (parent: any, {courseId}: any, { dataSources }: any) => {
            return dataSources.canvasData.getSingleCourse(courseId)
        }
    },
    CanvasCourse: {
        assignments: (parent: any, args: any, { dataSources }: any) => {
            return dataSources.canvasData.getAssignmentData(parent.id);
        },
        enrollments: (parent: any, args: any, { dataSources }: any) => {
            return dataSources.canvasData.getEnrollmentData(parent.id, parent.userId);
        }
    },
    Assignment: {
        submissions: (parent: any, args: any, { dataSources }: any) => {
            return dataSources.canvasData.getSubmissionData(parent.course_id, parent.id);
        },
        outcomes: (parent: any, args: any, { dataSources }: any) => {
            return dataSources.canvasData.getOutcomesData(parent.course_id, parent.id);
        }
    }
};

export default resolvers;