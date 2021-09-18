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
exports.__esModule = true;
var fabric_1 = require("fabric");
var lodash_1 = require("lodash");
var defaults_1 = require("../constants/defaults");
var DynamicImagePro = fabric_1.fabric.util.createClass(fabric_1.fabric.Group, {
    type: 'dynamicImagePro',
    async: true,
    lockUniScalingWithSkew: false,
    debug: true,
    version: '4.3.1',
    _okImage: false,
    initialize: function (options) {
        var image = new Image();
        if (options.src) {
            image.src = options.src;
        }
        this.optionId = options.optionId;
        this.imageLibraryId = options.imageLibraryId;
        this.imagesUpload = options.imagesUpload;
        this.initSrc = options.src;
        this.selectable = options.selectable === false ? false : true;
        options.evented = this.selectable;
        this.visible = options.visible === false ? false : true;
        this.evented = this.selectable;
        var createdObj = new fabric_1.fabric.Image(image, {
            originX: 'center',
            originY: 'center',
            width: options.width || 300,
            height: options.height || 300
        });
        createdObj.globalCompositeOperation = 'source-atop';
        var rect = new fabric_1.fabric.Rect({
            strokeDashArray: options.strokeDashArray,
            originX: 'center',
            originY: 'center',
            stroke: options.typeRender ? 'transparent' : '#808080',
            strokeWidth: options.typeRender ? 0 : 1,
            borderColor: options.typeRender ? 'transparent' : '#18a0fb',
            width: options.width || 300,
            height: options.height || 300,
            fill: 'rgba(0, 0, 0, 0)'
        });
        this.callSuper('initialize', [createdObj, rect], Object.assign(options, defaults_1.groupBoundedOption));
        this.on({
            scaled: function () {
                this.updateFromGroupScaling();
            },
            added: function () {
                this.updateFromGroupScaling();
            }
        });
    },
    _set: function (key, value) {
        this.callSuper('_set', key, value);
        switch (key) {
            case 'src':
                this._setImage(this.item(0), value);
                break;
            default:
                break;
        }
    },
    updateFromGroupScaling: function () {
        var width = this.width * this.scaleX;
        var height = this.height * this.scaleY;
        this.scaleX = 1;
        this.scaleY = 1;
        this.setWidth(width);
        this.setHeight(height);
    },
    getWidth: function () {
        return this.width * this.scaleX;
    },
    setWidth: function (width) {
        if (!width) {
            width = 0;
        }
        this.item(1).set('width', width);
        this.set('width', width);
        this.fixImage();
    },
    getHeight: function () {
        return this.height * this.scaleY;
    },
    setHeight: function (height) {
        if (!height) {
            height = 0;
        }
        this.item(1).set('height', height);
        this.set('height', height);
        this.fixImage();
    },
    setWidthHeight: function (width, height) {
        if (!width) {
            width = 0;
        }
        if (!height) {
            height = 0;
        }
        this.item(1).set('width', width);
        this.set('width', width);
        this.item(1).set('height', height);
        this.set('height', height);
        this.fixImage();
    },
    setLeftTop: function (left, top) {
        var _a;
        this.set({
            top: top,
            left: left
        });
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.renderAll();
    },
    setRotation: function (angle) {
        var _a;
        this.set('angle', angle);
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.renderAll();
    },
    fixImage: function () {
        var _a;
        if (this.width >= this.height) {
            this.item(0).scaleToHeight(this.height);
        }
        else {
            this.item(0).scaleToWidth(this.width);
        }
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.renderAll();
        var width = this.item(0).width * this.item(0).scaleX;
        var height = this.item(0).height * this.item(0).scaleY;
        if (width > this.width) {
            this.item(0).scaleToWidth(this.width);
        }
        else if (height > this.height) {
            this.item(0).scaleToHeight(this.height);
        }
    },
    dynamicImage: function (src) {
        this.set('src', src);
    },
    setInitSrc: function (src) {
        this.initSrc = src;
    },
    _setImage: function (obj, source) {
        var _this = this;
        this._okImage = false;
        if (!source) {
            this.loadImage(obj, undefined);
            obj.set('file', undefined);
            obj.set('src', undefined);
            return;
        }
        if (source instanceof File) {
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                _this.loadImage(obj, reader_1.result);
                obj.set('file', source);
                obj.set('src', undefined);
            };
            reader_1.readAsDataURL(source);
        }
        else {
            this.loadImage(obj, source);
            obj.set('file', undefined);
            obj.set('src', source);
        }
    },
    loadImage: function (obj, src) {
        var _this = this;
        var url = src;
        fabric_1.fabric.util.loadImage(url, function (source) {
            var _a, _b;
            if (obj.type !== 'image') {
                obj.setPatternFill({
                    source: source,
                    repeat: 'repeat'
                }, undefined);
                obj.setCoords();
                _this._okImage = true;
                (_a = _this.canvas) === null || _a === void 0 ? void 0 : _a.renderAll();
                return;
            }
            if (!source) {
                source = new Image();
                source.width = obj.width;
                source.height = obj.height;
            }
            obj.setElement(source);
            obj.setCoords();
            _this.fixImage();
            _this._okImage = true;
            (_b = _this.canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
    },
    updateCalcPostion: function (name, value) {
        var _a;
        if (name === 'left') {
            this.set({
                left: value
            });
        }
        if (name === 'top') {
            this.set({
                top: value
            });
        }
        if (name === 'width') {
            this.setWidth(value);
        }
        if (name === 'height') {
            this.setHeight(value);
        }
        if (name === 'angle') {
            this.setRotation(value);
        }
        if (name === 'elementId')
            this.elementId = value;
        if (name === 'optionId')
            this.optionId = value;
        if (name === 'imageLibraryId')
            this.imageLibraryId = value;
        if (name === 'imagesUpload')
            this.imagesUpload = value;
        if (name === 'typeResize')
            this.typeResize = value;
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.renderAll();
    },
    __updateView: function () {
        var _a, _b;
        this.visible = !this.visible;
        // this.__addImageToRect();
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.renderAll.bind(this.canvas);
        (_b = this.canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
    },
    __updateLock: function () {
        var _a, _b;
        this.selectable = !this.selectable;
        this.evented = this.selectable;
        // this.__addImageToRect();
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.renderAll.bind(this.canvas);
        (_b = this.canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
    },
    _updateName: function (name) {
        this.name = name;
    },
    countStepForward: function () {
        var _a;
        var step = 0;
        var objects = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getObjects();
        var indexThis = lodash_1.findIndex(objects, { id: this.id });
        var i = indexThis + 1;
        var length = objects.length;
        // let count = 0
        while (i < length) {
            step++;
            if (objects[i].id) {
                return step;
            }
            i++;
        }
        return step;
    },
    countStepBackward: function () {
        var _a;
        var step = 0;
        var objects = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getObjects();
        var indexThis = lodash_1.findIndex(objects, { id: this.id });
        var i = indexThis - 1;
        var count = 0;
        while (i >= 1) {
            if (objects[i].id) {
                count++;
            }
            if (count === 1) {
                step++;
            }
            else {
                if (count === 2) {
                    return step;
                }
            }
            i--;
        }
        return step;
    },
    setZIndex: function (name) {
        var _a, _b, _c, _d, _e;
        switch (name) {
            case 'forward':
                var stepForward = this.countStepForward();
                for (var i = 0; i < stepForward; i++) {
                    (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.bringForward(this);
                }
                break;
            case 'backward':
                var stepBackward = this.countStepBackward();
                for (var i = 0; i < stepBackward; i++) {
                    (_b = this.canvas) === null || _b === void 0 ? void 0 : _b.sendBackwards(this);
                }
                break;
            case 'tofront':
                (_c = this.canvas) === null || _c === void 0 ? void 0 : _c.bringToFront(this);
                break;
            case 'toback':
                (_d = this.canvas) === null || _d === void 0 ? void 0 : _d.sendToBack(this);
            default:
                break;
        }
        (_e = this.canvas) === null || _e === void 0 ? void 0 : _e.renderAll();
    },
    toObject: function () {
        return fabric_1.fabric.util.object.extend(this.callSuper('toObject'), {
            id: this.id,
            elementId: this.elementId,
            optionId: 1,
            imageLibraryId: this.imageLibraryId,
            name: this.name,
            src: this.initSrc,
            step: this.step,
            indexImage: this.indexImage,
            indexText: this.indexText,
            time: this.time,
            imagesUpload: this.imagesUpload,
            selectable: this.selectable,
            visible: this.visible,
            evented: this.evented,
            typeResize: this.typeResize || 'default'
        });
    }
});
DynamicImagePro.fromObject = function (options, callback) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, callback(new DynamicImagePro(options))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = DynamicImagePro;
