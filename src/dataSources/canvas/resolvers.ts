const resolvers = {
    Query: {
        CanvasCourses: ({ dataSources }: any) => {
            return dataSources.canvasData.getAllCourses()
        },
        CanvasCourse: ({courseId}: any, { dataSources }: any) => {
            return dataSources.canvasData.getSingleCourse(courseId)
        }
    },
    CanvasCourse: {
        assignments: (parent: any, { dataSources }: any) => {
            return dataSources.canvasData.getAssignmentData(parent.id);
        },
        enrollments: (parent: any, { dataSources }: any) => {
            return dataSources.canvasData.getEnrollmentData(parent.id, parent.userId);
        }
    },
    Assignment: {
        submissions: (parent: any, { dataSources }: any) => {
            return dataSources.canvasData.getSubmissionData(parent.course_id, parent.id);
        },
        outcomes: (parent: any, { dataSources }: any) => {
            return dataSources.canvasData.getOutcomesData(parent.course_id, parent.id);
        }
    }
};

export default resolvers;