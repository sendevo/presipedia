import moment from "moment";
import { YEAR_MS } from "./constants";

const xmlns = "http://www.w3.org/2000/svg";
const YEAR_PX = 40;

export default class VerticalTimeline {
    constructor(container, items) {
        this._container = container;
        this._items = items;
        this._init();
    }

    _init() {
        const tic = Date.now();

        const startDate = Math.min(...this._items.map(it => it.start));
        const endDate = Math.max(...this._items.map(it => it.end));        
        const timespanMs = endDate - startDate;
        const ms2px = YEAR_MS/YEAR_PX;

        const boxWidth = 300;
        const boxHeight = 40;
        const tickLabelWidth = 25;
        const timelineWidth = 10;
        const timelineHeight = (timespanMs+YEAR_MS)/ms2px;
        const boxPosX = timelineWidth + tickLabelWidth + 10;

        this._container.style.height = "70vh";
        this._container.style.overflowY = "auto";
        //this._container.style.overflow = "auto";

        const svg = document.createElementNS(xmlns, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", timelineHeight);

        const timeline = document.createElementNS(xmlns, "line");
        timeline.setAttribute("x1", timelineWidth / 2 + tickLabelWidth);
        timeline.setAttribute("y1", 0);
        timeline.setAttribute("x2", timelineWidth / 2 + tickLabelWidth);
        timeline.setAttribute("y2", timelineHeight);
        timeline.setAttribute("stroke", "#000");
        svg.appendChild(timeline);
        for (let t = 0; t <= timespanMs+YEAR_MS; t += YEAR_MS) {
            const tick = document.createElementNS(xmlns, "line");
            tick.setAttribute("x1", tickLabelWidth);
            tick.setAttribute("y1", t / ms2px);
            tick.setAttribute("x2", timelineWidth+tickLabelWidth);
            tick.setAttribute("y2", t / ms2px);
            tick.setAttribute("stroke", "#000");
            svg.appendChild(tick);

            const tickLabel = document.createElementNS(xmlns, "text");
            tickLabel.setAttribute("x", 0);
            tickLabel.setAttribute("y", t / ms2px);
            tickLabel.setAttribute("alignment-baseline", "middle");
            tickLabel.setAttribute("font-size", "10px");
            tickLabel.textContent = moment(startDate+t).year();
            svg.appendChild(tickLabel);
        }

        this._items.forEach(data => {
            const time = (data.start - startDate) / ms2px;

            const box = document.createElementNS(xmlns, "rect");
            box.setAttribute("x", boxPosX);
            box.setAttribute("y", time);
            box.setAttribute("width", boxWidth);
            box.setAttribute("height", boxHeight);
            box.setAttribute("fill", "#A9E2F3AA");
            svg.appendChild(box);

            const nameLabel = document.createElementNS(xmlns, "text");
            nameLabel.setAttribute("x", boxPosX + boxHeight + 10);
            nameLabel.setAttribute("y", time + boxHeight/4);            
            nameLabel.setAttribute("alignment-baseline", "middle");
            nameLabel.setAttribute("font-size", "smaller");
            nameLabel.textContent = data.content.name;
            svg.appendChild(nameLabel);

            const periodLabel = document.createElementNS(xmlns, "text");
            periodLabel.setAttribute("x", boxPosX + boxHeight + 10);
            periodLabel.setAttribute("y", time + boxHeight/4 + 15);
            periodLabel.setAttribute("alignment-baseline", "middle");
            periodLabel.setAttribute("font-size", "10px");
            periodLabel.textContent = "Del " + moment(data.start).format("D/M/YYYY") + " hasta el " + moment(data.end).format("D/M/YYYY");
            svg.appendChild(periodLabel);

            const image = document.createElementNS(xmlns, "image");
            image.setAttribute("x", boxPosX);
            image.setAttribute("y", time);
            image.setAttribute("height", boxHeight);
            image.setAttribute("href", data.content.image);
            svg.appendChild(image);

            const topLineX1 = timelineWidth / 2 + tickLabelWidth;
            const topLineY1 = time;
            const topLineX2 = timelineWidth + tickLabelWidth + 10;
            const topLineY2 = time;
            const bottomLineX1 = timelineWidth / 2 + tickLabelWidth;
            const bottomLineY1 = (data.end - startDate) / ms2px;
            const bottomLineX2 = timelineWidth + tickLabelWidth + 10;
            const bottomLineY2 = time + boxHeight;
            const polygon = document.createElementNS(xmlns, 'polygon');
            polygon.setAttribute("points", `${topLineX1},${topLineY1} ${topLineX2},${topLineY2} ${bottomLineX2},${bottomLineY2} ${bottomLineX1},${bottomLineY1}`);
            polygon.setAttribute("stroke", "#FF0000");
            polygon.setAttribute("fill", "#FF000033");
            svg.appendChild(polygon);
        });

        this._container.appendChild(svg);

        console.log("Render finished in", Date.now() - tic, "ms");
    }

    destroy() {
        this._container.innerHTML = "";
        console.log("Timeline destroyed");
    }
};