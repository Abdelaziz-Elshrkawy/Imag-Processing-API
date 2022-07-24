"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Imageresizing_1 = __importDefault(require("../../routes/Imageresizing"));
const fs_1 = __importDefault(require("fs"));
const srcImgPath = path_1.default.join(__dirname, '../../../images/encenadaport.jpg');
const thumb = path_1.default.join(__dirname, '../../../thumb');
if (!fs_1.default.existsSync(thumb)) {
    fs_1.default.mkdirSync(thumb);
}
else
    thumb;
const thumbImgPath = path_1.default.join(__dirname, '../../../thumb/encenadaport.jpg');
describe('testing image resizing', () => {
    it('Sucess Resizeing', async () => {
        await (0, Imageresizing_1.default)(srcImgPath, thumbImgPath, 500, 500);
        expect(fs_1.default.existsSync(thumbImgPath)).toBeTrue;
    });
});
