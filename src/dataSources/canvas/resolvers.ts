const resolvers = {
    Query: {
        CanvasCourses: (_parent: any, _args: any, { dataSources }: any) => {
            return dataSources.canvasData.getAllCourses()
        },
        CanvasCourse: (_parent: any, {courseId}: any, { dataSources }: any) => {
            return dataSources.canvasData.getSingleCourse(courseId)
        }
    },
    CanvasCourse: {
        assignments: (parent: any, _args: any, { dataSources }: any) => {
            return dataSources.canvasData.getAssignmentData(parent.id);
        },
        enrollments: (parent: any, _args: any, { dataSources }: any) => {
            return dataSources.canvasData.getEnrollmentData(parent.id, parent.userId);
        }
    },
    Assignment: {
        submissions: (parent: any, _args: any, { dataSources }: any) => {
            return dataSources.canvasData.getSubmissionData(parent.course_id, parent.id);
        },
        outcomes: (parent: any, _args: any, { dataSources }: any) => {
            return dataSources.canvasData.getOutcomesData(parent.course_id, parent.id);
        }
    }
};

export default resolvers;