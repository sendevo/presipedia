export default class VerticalTimeline {
    constructor(container, items) {
        this._container = container;
        this._canvas = document.createElement("canvas");
        this._items = items;
        this.init();
        this._container.appendChild(this._canvas);
    }

    init() {
        const ctx = this._canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 150, 75);
    }

    destroy() {
        console.log("Destroying canvas");
        this._container.innerHTML = "";
    }
};
