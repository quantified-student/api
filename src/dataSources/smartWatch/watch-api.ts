import heartRateData from "./heart-rate-data";
import stressData from "./stress-data";

class WatchDataApi {
  getWatchData() {
    return {
      stressData,
      heartRateData,
    };
  }
}

export default WatchDataApi;
