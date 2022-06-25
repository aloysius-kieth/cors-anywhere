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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var SETTINGS = {
    url: process.env.API_URL,
    port: process.env.PORT,
};
var app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((0, cors_1.default)());
var authToken = "";
var API_URL = SETTINGS.url;
var LOGIN_ENDPOINT = "login";
var GET_LEADERBOARD_ENDPOINT = "weeklyleaderboard";
var GAME_RESULT_ENDPOINT = "gamescore";
var login = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/").concat(LOGIN_ENDPOINT), {
                        email: email,
                        password: password,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })];
            case 1:
                data = (_c.sent()).data;
                //console.log(data);
                authToken = data.data.authorizationToken;
                // console.log(authToken);
                return [2 /*return*/, data];
            case 2:
                error_1 = _c.sent();
                if (axios_1.default.isAxiosError(error_1)) {
                    console.log(error_1);
                    return [2 /*return*/, (((_a = error_1.code) === null || _a === void 0 ? void 0 : _a.toString()) + " | " + ((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.statusText.toString()))];
                }
                else {
                    console.log(error_1);
                    return [2 /*return*/, typeof error_1 === "string" ? error_1 : undefined];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getLeaderboard = function (authToken) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(API_URL, "/").concat(GET_LEADERBOARD_ENDPOINT), {
                        headers: {
                            Authorization: "Bearer ".concat(authToken),
                        },
                    })];
            case 1:
                data = (_c.sent()).data;
                //console.log(data);
                return [2 /*return*/, data];
            case 2:
                error_2 = _c.sent();
                if (axios_1.default.isAxiosError(error_2)) {
                    console.log(error_2);
                    return [2 /*return*/, (((_a = error_2.code) === null || _a === void 0 ? void 0 : _a.toString()) + " | " + ((_b = error_2.response) === null || _b === void 0 ? void 0 : _b.statusText.toString()))];
                }
                else {
                    console.log(error_2);
                    return [2 /*return*/, typeof error_2 === "string" ? error_2 : undefined];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var sendGameResult = function (_score, _name) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/").concat(GAME_RESULT_ENDPOINT), {
                        score: _score,
                        name: _name,
                    }, {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer ".concat(authToken),
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    })];
            case 1:
                data = (_c.sent()).data;
                console.log(data);
                return [2 /*return*/, data];
            case 2:
                error_3 = _c.sent();
                if (axios_1.default.isAxiosError(error_3)) {
                    console.log(error_3);
                    return [2 /*return*/, (((_a = error_3.code) === null || _a === void 0 ? void 0 : _a.toString()) + " | " + ((_b = error_3.response) === null || _b === void 0 ? void 0 : _b.statusText.toString()))];
                }
                else {
                    console.log(error_3);
                    return [2 /*return*/, typeof error_3 === "string" ? error_3 : undefined];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
app.get("/", function (req, res) {
    res.send("Proxy Express Server to bypass CORS Origin...");
});
app.get("/login", function (req, res) {
    var r = login("trinax@yopmail.com", "Password$1").then(function (response) {
        //console.log(response);
        var data = JSON.stringify(response);
        res.send(data);
    });
});
app.get("/getLeaderboard", function (req, res) {
    var r = getLeaderboard(authToken).then(function (response) {
        console.log(response);
        var data = JSON.stringify(response);
        res.send(data);
    });
});
app.post("/sendGameResult", function (req, res) {
    var r = sendGameResult(req.body.score, req.body.name).then(function (response) {
        console.log(response);
        var data = JSON.stringify(response);
        res.send(data);
    });
});
var PORT = SETTINGS.port || 3000;
app.listen(PORT, function () {
    console.log("\u26A1\uFE0F[Proxy Server]: Server is running at http://localhost:".concat(PORT));
});
