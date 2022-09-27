const { RESTDataSource } = require("apollo-datasource-rest");

class CanvasAPI extends RESTDataSource {
  willSendRequest(request: any) {
    console.log(this.context.Authorization);
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

  async getCourseData() {
    return this.get("courses");
  }
}

export default CanvasAPI;
