"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productInput = exports.voteInput = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
});
exports.signInInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.voteInput = zod_1.default.object({
    productId: zod_1.default.number(),
    description: zod_1.default.string(),
    roasted: zod_1.default.boolean(),
    ideaRating: zod_1.default.number().min(1).max(5),
    productRating: zod_1.default.number().min(1).max(5)
});
exports.productInput = zod_1.default.object({
    linkWebsite: zod_1.default.string(),
    codeName: zod_1.default.string(),
    punchline: zod_1.default.string(),
    description: zod_1.default.string(),
    moreInfo: zod_1.default.string(),
    logoFileUrl: zod_1.default.string(),
    typeOfProduct: zod_1.default.string(),
    typeCommercialOffer: zod_1.default.string(),
    tags: zod_1.default.array(zod_1.default.string()),
    launchDate: zod_1.default.string(),
    productDevelopmentStage: zod_1.default.string(),
    finalNotes: zod_1.default.string()
});
