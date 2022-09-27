"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const heart_rate_data_1 = __importDefault(require("./heart-rate-data"));
const stress_data_1 = __importDefault(require("./stress-data"));
class WatchDataApi {
    getWatchData() {
        return {
            stressData: stress_data_1.default,
            heartRateData: heart_rate_data_1.default,
        };
    }
}
exports.default = WatchDataApi;
