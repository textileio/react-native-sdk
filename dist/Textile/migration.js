"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_fs_1 = __importDefault(require("react-native-fs"));
class Migration {
    constructor() {
        this.requiresFileMigration = (repoPath) => __awaiter(this, void 0, void 0, function* () {
            const repoPathExists = yield react_native_fs_1.default.exists(repoPath);
            if (!repoPathExists) {
                return true;
            }
            return false;
        });
        this.runFileMigration = (repoPath) => __awaiter(this, void 0, void 0, function* () {
            const repoPathExists = yield react_native_fs_1.default.exists(repoPath);
            if (!repoPathExists) {
                yield react_native_fs_1.default.mkdir(repoPath);
                yield this.moveTextileFiles(repoPath);
            }
        });
        this.moveTextileFiles = (repoPath) => __awaiter(this, void 0, void 0, function* () {
            const files = yield react_native_fs_1.default.readDir(react_native_fs_1.default.DocumentDirectoryPath);
            for (const file of files) {
                if (file.path !== repoPath && file.name !== 'RCTAsyncLocalStorage_V1') {
                    yield react_native_fs_1.default.moveFile(file.path, `${repoPath}/${file.name}`);
                }
            }
        });
    }
}
exports.default = Migration;
