"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { RESTDataSource } = require("apollo-datasource-rest");
class CanvasAPI extends RESTDataSource {
    willSendRequest(request) {
        console.log(this.context.Authorization);
        request.headers.set("Authorization", `Bearer ${this.context.Authorization}`);
    }
    willSendResponse(response) {
        // console.log(response.headers)
    }
    constructor() {
        super();
        this.baseURL = "https://fhict.instructure.com/api/v1";
    }
    getCourseData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get("courses");
        });
    }
}
exports.default = CanvasAPI;
