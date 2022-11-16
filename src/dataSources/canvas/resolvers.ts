const resolvers = {
    Query: {
        CanvasCourses: (parent: any, args: any, { dataSources }: any) => {
            return dataSources.canvasData.getAllCourses()
        },
        CanvasCourse: (parent: any, {courseId}: any, { dataSources }: any) => {
            return dataSources.canvasData.getSingleCourse(courseId)
        }
    },
    CanvasCourses: {
        assignments: (parent: any, args: any, { dataSources }: any) => {
            return dataSources.canvasData.getAssignmentData(parent.id);
        },
    },
    Assignment: {
        submissions: (parent: any, args: any, { dataSources }: any) => {
            return dataSources.canvasData.getSubmissionData(parent.course_id, parent.id);

        }
    }
};

export default resolvers;
