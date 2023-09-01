const xmlns = "http://www.w3.org/2000/svg";

const defaultConfig = {
    boxWidth: 400,
    boxHeight: 50
};

export default class VerticalTimeline {
    constructor(container, items, config = defaultConfig) {
        this._container = container;        
        this._items = items;
        this._config = config;
        this.init();        
    }

    init() {
        this._container.style.height = "70vh";
        this._container.style.overflowY = "auto";
        const svg = document.createElementNS(xmlns, "svg");

        svg.style.width = "100%";
        svg.style.height = (this._config.boxHeight+2)*this._items.length;
        this._items.forEach((data, index) => {
            const x = 0;
            const y = index*(this._config.boxHeight+2);

            const box = document.createElementNS(xmlns, "rect");
            box.setAttribute("x", x);
            box.setAttribute("y", y);
            box.setAttribute("width", this._config.boxWidth);
            box.setAttribute("height", this._config.boxHeight);
            box.setAttribute("fill", "#A9E2F3");
            svg.appendChild(box);

            const text = document.createElementNS(xmlns, "text");            
            text.setAttribute("x", x + 60);
            text.setAttribute("y", y + this._config.boxHeight/2);
            text.setAttribute("alignment-baseline", "middle");
            //text.setAttribute("fill", "#000");
            text.textContent = data.content.name;
            svg.appendChild(text);

            const image = document.createElementNS(xmlns, "image");
            image.setAttribute("x", x);
            image.setAttribute("y", y);
            //image.setAttribute("width", 40);
            image.setAttribute("height", this._config.boxHeight);
            image.setAttribute("href", data.content.image);
            svg.appendChild(image);
        });

        this._container.appendChild(svg);
    }

    destroy() {
        console.log("Destroying canvas");
        this._container.innerHTML = "";
    }
};
