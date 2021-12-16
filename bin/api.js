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
exports.search = exports.testISBN = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const BOOKS_API_KEY = process.env.GKEY;
const testISBN = (isbn) => {
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/gm.test(isbn);
};
exports.testISBN = testISBN;
const search = (isbn) => {
    const uri = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${BOOKS_API_KEY}`;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, node_fetch_1.default)(uri)
            .then((res) => res.json())
            .then((json) => {
            if (json.items.length > 0) {
                if (json.items[0].volumeInfo !== undefined) {
                    resolve(json.items[0].volumeInfo);
                }
                else
                    reject;
            }
            else
                reject;
        })
            .catch(reject);
    }));
};
exports.search = search;
