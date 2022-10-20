const resolvers = {
    Query: {
        CanvasCourses: async (_: any, __: any, { dataSources }: any) => {
            return dataSources.canvasData.getCourseData();
        },
        Assignments: async (
            _: any,
            { courseId }: any,
            { dataSources }: any
        ) => {
            return dataSources.canvasData.getAssignmentData(courseId);
        },
        Submissions: async (
            { courseId }: any,
            { assignmentId }: any,
            { dataSources }: any
        ) => {
            return dataSources.canvasData.getSubmissionData(
                courseId,
                assignmentId
            );
        },
    },
};

export default resolvers;
