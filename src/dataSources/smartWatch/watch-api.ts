import { RESTDataSource } from "apollo-datasource-rest";
import heartRateData from "./heart-rate-data";
import stressData from "./stress-data";

class WatchDataApi extends RESTDataSource {
  getWatchData() {
    return {
      stressData,
      heartRateData,
    };
  }
}

export default WatchDataApi;
