import { fabric } from 'fabric';
import { findIndex } from 'lodash';
import { groupBoundedOption } from '../constants/defaults';
import { FabricElement, FabricImage } from '../utils';

export interface DynamicImageObject extends FabricElement {
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

const DynamicImagePro = fabric.util.createClass(fabric.Group, {
  type: 'dynamicImagePro',
  async: true,
  lockUniScalingWithSkew: false,
  debug: true,
  version: '4.3.1',
  _okImage: false,
  initialize: function (options: any) {
    const image = new Image();
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
    const createdObj = new fabric.Image(image, {
      originX: 'center',
      originY: 'center',
      width: options.width || 300,
      height: options.height || 300,
    }) as FabricImage;
    createdObj.globalCompositeOperation = 'source-atop';
    var rect = new fabric.Rect({
      strokeDashArray: options.strokeDashArray,
      originX: 'center',
      originY: 'center',
      stroke: options.typeRender ? 'transparent' : '#808080',
      strokeWidth: options.typeRender ? 0 : 1,
      borderColor: options.typeRender ? 'transparent' : '#18a0fb',
      width: options.width || 300,
      height: options.height || 300,
      fill: 'rgba(0, 0, 0, 0)',
    });

    this.callSuper('initialize', [createdObj, rect], Object.assign(options, groupBoundedOption));

    this.on({
      scaled: function () {
        this.updateFromGroupScaling();
      },
      added: function () {
        this.updateFromGroupScaling();
      },
    });
  },
  _set: function (key: string, value: any) {
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
  setWidth: function (width: number) {
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
  setHeight: function (height: number) {
    if (!height) {
      height = 0;
    }
    this.item(1).set('height', height);
    this.set('height', height);
    this.fixImage();
  },
  setWidthHeight: function (width: number, height: number) {
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
  setLeftTop: function (left: number, top: number) {
    this.set({
      top: top,
      left: left,
    });
    this.canvas?.renderAll();
  },
  setRotation: function (angle: number) {
    this.set('angle', angle);
    this.canvas?.renderAll();
  },
  fixImage: function () {
    if (this.width >= this.height) {
      this.item(0).scaleToHeight(this.height);
    } else {
      this.item(0).scaleToWidth(this.width);
    }
    this.canvas?.renderAll();

    var width = this.item(0).width * this.item(0).scaleX;
    var height = this.item(0).height * this.item(0).scaleY;
    if (width > this.width) {
      this.item(0).scaleToWidth(this.width);
    } else if (height > this.height) {
      this.item(0).scaleToHeight(this.height);
    }
  },
  dynamicImage: function (src: string) {
    this.set('src', src);
  },
  setInitSrc: function (src: string) {
    this.initSrc = src;
  },
  _setImage: function (obj: FabricImage, source?: File | string) {
    this._okImage = false;
    if (!source) {
      this.loadImage(obj, undefined);
      obj.set('file', undefined);
      obj.set('src', undefined);
      return;
    }
    if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        this.loadImage(obj, reader.result as string);
        obj.set('file', source);
        obj.set('src', undefined);
      };
      reader.readAsDataURL(source);
    } else {
      this.loadImage(obj, source);
      obj.set('file', undefined);
      obj.set('src', source);
    }
  },
  loadImage: function (obj: FabricImage, src: string) {
    let url = src;
    fabric.util.loadImage(url, (source: any) => {
      if (obj.type !== 'image') {
        obj.setPatternFill(
          {
            source,
            repeat: 'repeat',
          },
          undefined,
        );
        obj.setCoords();
        this._okImage = true;
        this.canvas?.renderAll();
        return;
      }
      if (!source) {
        source = new Image();
        source.width = obj.width;
        source.height = obj.height;
      }
      obj.setElement(source);
      obj.setCoords();
      this.fixImage();
      this._okImage = true;
      this.canvas?.renderAll();
    });
  },
  updateCalcPostion: function (name: string, value: number) {
    if (name === 'left') {
      this.set({
        left: value,
      });
    }

    if (name === 'top') {
      this.set({
        top: value,
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

    if (name === 'elementId') this.elementId = value;

    if (name === 'optionId') this.optionId = value;

    if (name === 'imageLibraryId') this.imageLibraryId = value;
    if (name === 'imagesUpload') this.imagesUpload = value;

    if (name === 'typeResize') this.typeResize = value;

    this.canvas?.renderAll();
  },
  __updateView: function () {
    this.visible = !this.visible;
    // this.__addImageToRect();
    this.canvas?.renderAll.bind(this.canvas);
    this.canvas?.renderAll();
  },

  __updateLock: function () {
    this.selectable = !this.selectable;
    this.evented = this.selectable;
    // this.__addImageToRect();
    this.canvas?.renderAll.bind(this.canvas);
    this.canvas?.renderAll();
  },
  _updateName: function (name: string) {
    this.name = name;
  },
  countStepForward: function () {
    let step = 0;
    const objects = this.canvas?.getObjects();
    const indexThis = findIndex(objects, { id: this.id });
    let i = indexThis + 1;
    const length = objects.length;
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
    let step = 0;
    const objects = this.canvas?.getObjects();
    const indexThis = findIndex(objects, { id: this.id });
    let i = indexThis - 1;
    let count = 0;
    while (i >= 1) {
      if (objects[i].id) {
        count++;
      }

      if (count === 1) {
        step++;
      } else {
        if (count === 2) {
          return step;
        }
      }
      i--;
    }

    return step;
  },
  setZIndex: function (name: string) {
    switch (name) {
      case 'forward':
        const stepForward = this.countStepForward();
        for (let i = 0; i < stepForward; i++) {
          this.canvas?.bringForward(this);
        }
        break;

      case 'backward':
        const stepBackward = this.countStepBackward();
        for (let i = 0; i < stepBackward; i++) {
          this.canvas?.sendBackwards(this);
        }
        break;

      case 'tofront':
        this.canvas?.bringToFront(this);
        break;

      case 'toback':
        this.canvas?.sendToBack(this);

      default:
        break;
    }

    this.canvas?.renderAll();
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
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
      typeResize: this.typeResize || 'default',
    });
  },
});

DynamicImagePro.fromObject = async (
  options: DynamicImageObject,
  callback: (obj: DynamicImageObject) => any,
) => {
  return await callback(new DynamicImagePro(options));
};

var windowFabric: any = window.fabric;
windowFabric.DynamicImagePro = DynamicImagePro;

export default DynamicImagePro;
