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
const loggingPlugin = {
    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('Request started! Query:\n'
            // + requestContext.request.query
            // );
            return {
                // Fires whenever Apollo Server will parse a GraphQL
                // request to create its associated document AST.
                parsingDidStart(requestContext) {
                    return __awaiter(this, void 0, void 0, function* () {
                        // console.log('Parsing started!');
                    });
                },
                // Fires whenever Apollo Server will validate a
                // request's document AST against your GraphQL schema.
                validationDidStart(requestContext) {
                    return __awaiter(this, void 0, void 0, function* () {
                        // console.log('Validation started!');
                    });
                },
            };
        });
    },
};
exports.default = loggingPlugin;
