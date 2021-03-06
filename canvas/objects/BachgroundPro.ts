import { fabric } from 'fabric';

const BackgroundPro = fabric.util.createClass(fabric.Rect, {
  type: 'backgroundPro',
  text: null,
  textbox: false,
  textOffsetLeft: 0,
  textOffsetTop: 0,
  _prevObjectStacking: null,
  _prevAngle: 0,
  textHeight: 0,
  textWidth: 0,
  image: null,
  imageSelected: false,
  rangeLeft: 0,
  rangeTop: 0,
  rangeAngle: 0,
  addImageToRectInit: null,
  previousAngle: null,
  elementId: 1,

  initialize(rectOptions: any) {
    // console.log(rectOptions.width, rectOptions.width, 'ahihi');

    this.on('added', () => {
      const center = this.canvas?.getCenter();
      this.top = center.top;
      this.left = center.left;
      const zoomWidth = rectOptions.typeRender ? 0 : 0.25;
      const zoomTop = rectOptions.typeRender ? 0 : -25;
      const zoomBottom = rectOptions.typeRender ? 0 : 50;
      const leftZoom = rectOptions.typeRender ? 0 : 211;

      if (rectOptions.src) {
        fabric.Image.fromURL(rectOptions.src, (myImg: any) => {
          myImg.set({
            originX: 'center',
            originY: 'center',
            width: myImg.width,
            height: myImg.height,
            crossOrigin: 'anonymous',
            backgroundColor: rectOptions.fill || '#fff',
          });

          this.canvas?.setBackgroundImage(myImg, this.canvas?.renderAll.bind(this.canvas));
          if (myImg.width >= myImg.height) {
            this.canvas?.setViewportTransform([
              this.canvas?.width / myImg.width - 0.1,
              0,
              0,
              this.canvas?.width / myImg.width - 0.1,
              this.canvas?.getCenter().left,
              this.canvas?.getCenter().top,
            ]);
          } else {
            this.canvas?.setViewportTransform([
              this.canvas?.height / myImg.height - zoomWidth,
              0,
              0,
              this.canvas?.height / myImg.height - zoomWidth,
              this.canvas?.getCenter().left,
              this.canvas?.getCenter().top,
            ]);
          }
        });
      } else {
        const bgUrl =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

        fabric.Image.fromURL(
          bgUrl,
          (myImg: any) => {
            const widthBg = 1200;
            const heightBg = 600;

            myImg.set({
              originX: 'center',
              originY: 'center',
              width: rectOptions.width || widthBg,
              height: rectOptions.height || heightBg,
              crossOrigin: 'anonymous',
              backgroundColor: rectOptions.fill || '#fff',
            });
            // anonymous", "allow-credentials"
            var filter = new fabric.Image.filters.BlendColor({
              color: rectOptions.fill || '#fff',
              mode: 'tint',
            });
            myImg.filters.push(filter);
            myImg.applyFilters();
            this.canvas?.setBackgroundImage(myImg, this.canvas?.renderAll.bind(this.canvas));

            if (!!rectOptions.full)  {
              // const center = this.canvas?.getCenter();
              // this.canvas?.zoomToPoint(
              //   new fabric.Point(center.left + leftZoom, center.top),
              //   0.07,
              // );
              // this.canvas?.requestRenderAll();
              // this.canvas?.renderAll();
              return
            }
            if (this.canvas?.width <= this.canvas?.height) {
              this.canvas?.setViewportTransform([
                this.canvas?.width / widthBg - zoomWidth,
                0,
                0,
                this.canvas?.width / widthBg - zoomWidth,
                this.canvas?.getCenter().left + leftZoom,
                this.canvas?.getCenter().top + zoomTop,
              ]);
              this.canvas?.requestRenderAll();
              this.canvas?.renderAll();
            } else {
              this.canvas?.setViewportTransform([
                this.canvas?.height / heightBg - zoomWidth,
                0,
                0,
                this.canvas?.height / heightBg - zoomWidth,
                this.canvas?.getCenter().left + leftZoom,
                this.canvas?.getCenter().top + zoomTop,
              ]);
              this.canvas?.requestRenderAll();
              this.canvas?.renderAll();
            }

            let scaleX = (this.canvas?.getWidth() - leftZoom) / widthBg;
            const scaleY = this.canvas?.getHeight() / heightBg;
            if (heightBg >= widthBg) {
              scaleX = scaleY;
              if (this.canvas?.getWidth() < widthBg * scaleX) {
                scaleX = scaleX * (this.canvas?.getWidth() / (widthBg * scaleX));
              }
            } else {
              if (this.canvas?.getHeight() < heightBg * scaleX) {
                scaleX = scaleX * (this.canvas?.getHeight() / (heightBg * scaleX));
              }
            }
            const center = this.canvas?.getCenter();

            this.canvas?.zoomToPoint(
              new fabric.Point(center.left + leftZoom, center.top),
              scaleX - (rectOptions.typeRender ? 0 : 0.25),
            );
            this.canvas?.requestRenderAll();
            this.canvas?.renderAll();
          },
          { crossOrigin: 'anonymous' },
        );
        // })
      }

      this.canvas?.renderAll();
    });

    this.on('removed', () => {
      this.canvas?.remove(this.text);
    });

    this.on('scaling', () => {
      this.strokeWidth = 1;
      this.stroke = '#333';

      this.image && this.recalcImage();
      if (this.images) this.image.top = this.top;
    });

    this.on('scaled', (e: any) => {
      this.width = Math.round(e.target.width * e.target.scaleX);
      this.height = Math.round(e.target.height * e.target.scaleY);
      this.scaleX = 1;
      this.scaleY = 1;

      // set range left vs top before move
      this.rangeLeft = e.target.image?.left - this.left;
      this.rangeTop = e.target.image?.top - this.top;

      this.canvas?.renderAll();
    });

    this.on('mousedown:before', (event: any) => {
      this.selectable = true;
      this.evented = true;
      this.stroke = 'red';
      this.canvas?.setActiveObject(this);

      if (this.image) {
        // set range left vs top before move
        this.rangeLeft = event.target.image?.left - this.left;
        this.rangeTop = event.target.image?.top - this.top;
        // this.rangeAngle = event.target.image?.angle - this.angle;

        this.image.selectable = false;
        this.image.evented = false;

        this.canvas?.setActiveObject(this);
        this.selectable = true;
      }
      this._prevObjectStacking = this.canvas?.preserveObjectStacking;
      this.canvas.preserveObjectStacking = true;
      this.strokeWidth = 0;
      this.canvas?.renderAll();
    });

    this.on('mousedblclick', () => {
      this.canvas?.centerObject(this);

      return this.canvas?.renderAll();
    });

    this.on('selected', () => {
      this.selectable = true;
      this._prevObjectStacking = this.canvas?.preserveObjectStacking;
      this.canvas.preserveObjectStacking = true;
      this.canvas?.renderAll();
    });

    this.on('deselected', () => {
      this.canvas.preserveObjectStacking = this._prevObjectStacking;
      this.strokeWidth = 1;
      this.canvas?.renderAll();
    });
  },

  setBackground: function (zoom: any) {
    const center = this.canvas?.getCenter();

    this.canvas?.zoomToPoint({ x: center.left, y: center.top }, zoom);

    return this.canvas?.renderAll();
  },

  updatePan: function () {},

  // render
  _render(ctx: any) {
    this.callSuper('_render', ctx);
    ctx.save();
  },
});

BackgroundPro.fromObject = async (options: any, callback: any) => {
  return await callback(new BackgroundPro(options));
};

export default BackgroundPro;
