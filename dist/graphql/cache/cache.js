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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlCache = void 0;
const redis_1 = __importDefault(require("../../config/redis"));
const graphqlCache = (resolver, cacheKey) => {
    return (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        const cacheKeyWithArgs = `${cacheKey}:${JSON.stringify(args)}`;
        const cachedData = yield redis_1.default.get(cacheKeyWithArgs);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        const result = yield resolver(parent, args, context, info);
        yield redis_1.default.set(cacheKeyWithArgs, JSON.stringify(result), { EX: 60 });
        return result;
    });
};
exports.graphqlCache = graphqlCache;
