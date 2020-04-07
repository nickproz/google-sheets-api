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
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var google_spreadsheet_1 = require("google-spreadsheet");
var GoogleSheetsApi = /** @class */ (function () {
    function GoogleSheetsApi(credentials) {
        this.credentials = credentials;
        // Fix special characters
        this.credentials.private_key = this.credentials.private_key.replace(/\\n/g, '\n');
    }
    /**
     * Reads all row data.
     *
     * @param sheetId - id of our spreadsheet
     * @param sheetIndex - optional sheet index
     */
    GoogleSheetsApi.prototype.getRows = function (sheetId, sheetIndex) {
        if (sheetIndex === void 0) { sheetIndex = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var sheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSheet(sheetId, sheetIndex)];
                    case 1:
                        sheet = _a.sent();
                        return [2 /*return*/, sheet.getRows()
                                .then(function (rows) { return _this.transformRows(rows); })];
                }
            });
        });
    };
    /**
     * Writes a single row to our spreadsheet.
     *
     * @param sheetId - id of our spreadsheet
     * @param rowData - row data to write to our spreadsheet
     * @param sheetIndex - optional sheet index
     */
    GoogleSheetsApi.prototype.createRow = function (sheetId, rowData, sheetIndex) {
        if (sheetIndex === void 0) { sheetIndex = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var sheet, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSheet(sheetId, sheetIndex)];
                    case 1:
                        sheet = _a.sent();
                        return [4 /*yield*/, sheet.addRow(rowData)];
                    case 2:
                        row = _a.sent();
                        return [2 /*return*/, row.save()];
                }
            });
        });
    };
    GoogleSheetsApi.prototype.loadSheet = function (sheetId, sheetIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadDocument(sheetId)];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc.sheetsByIndex[sheetIndex]];
                }
            });
        });
    };
    GoogleSheetsApi.prototype.loadDocument = function (sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = new google_spreadsheet_1.GoogleSpreadsheet(sheetId);
                        return [4 /*yield*/, doc.useServiceAccountAuth(this.credentials)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, doc.loadInfo()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, doc];
                }
            });
        });
    };
    GoogleSheetsApi.prototype.transformRows = function (rows) {
        var _this = this;
        return rows.map(function (row) { return _this.transformRow(row); });
    };
    GoogleSheetsApi.prototype.transformRow = function (row) {
        var headers = row._sheet.headerValues;
        var values = row._rawData;
        return headers.reduce(function (rowMap, header, index) {
            rowMap[header] = values[index];
            return rowMap;
        }, {});
    };
    return GoogleSheetsApi;
}());
exports.default = GoogleSheetsApi;
