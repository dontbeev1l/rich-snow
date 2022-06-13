if (!window.MLib) {
    window.MLib = {};
}

window.MLib.Scale = class {
    constructor(element, canvas, originalSize) {
        this.originalSize = originalSize;
        this.resizeListeners = [];
        this._destroyed = false;
        this._init(element, canvas);
    }

    _init(element, canvas) {
        const scaleSize = () => {
            this._scaleSize(element, canvas);
            if (!this._destroyed) {
                requestAnimationFrame(scaleSize)
            }
        }
        scaleSize();
    }

    _scaleSize(element, canvas) {
        const rect = element.getBoundingClientRect();

        this._updateCurrentSize(rect.width, rect.height)

        this.resizeListeners.forEach(fn => fn({
            width: rect.width,
            height: rect.height
        }))

        // canvas.setAttribute('width', rect.width);
        // canvas.setAttribute('height', rect.height);
    }

    _updateCurrentSize(width, height) {
        this.currentContainerSize = { width, height };

        let scaleCoef = this.currentContainerSize.width / this.originalSize.width;
        let currentViewHeight = this.originalSize.height * scaleCoef;

        if (currentViewHeight < this.currentContainerSize.height) {
            const gapY = (this.currentContainerSize.height - currentViewHeight) / 2;
            this.gap = { x: 0, y: gapY };
            this.scaleCoef = scaleCoef;
        } else {
            scaleCoef = this.currentContainerSize.height / this.originalSize.height;
            let currentViewWidth = this.originalSize.width * scaleCoef;
            const gapX = (this.currentContainerSize.width - currentViewWidth) / 2;
            this.gap = { x: gapX, y: 0 };
            this.scaleCoef = scaleCoef;
        }

    }

    destroy() {
        this._destroyed = true;
    }

    addResizeListener(fn) {
        this.resizeListeners.push(fn);
    }

    transformCoords(c) {
        return {
            x: c.x * this.scaleCoef + this.gap.x,
            y: c.y * this.scaleCoef + this.gap.y
        }
    }

    transformSize(s) {
        return {
            width: s.width * this.scaleCoef,
            height: s.height * this.scaleCoef
        }
    }
}