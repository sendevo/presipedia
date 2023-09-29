import moment from "moment";
import { YEAR_MS, MONTH_MS } from "./constants";
import { cropString, debug } from "./utils";

const xmlns = "http://www.w3.org/2000/svg";
const displayMonthsWithScale = 150;

let watchDog;
const handleScroll = ev => {
    clearTimeout(watchDog);
    watchDog = setTimeout(() => {
        localStorage.setItem("timeline-scroll-position", ev.target.scrollTop.toString());
    }, 500);
};

export default class VerticalTimeline {
    constructor(container, items, scale = 40) {
        this._container = container;
        this._items = items;
        this._scale = scale;        
        this._init();
        debug(this._items, "table");
    }

    _init() {
        const tic = Date.now(); // Measure rendering time

        const beginDate = Math.min(...this._items.map(it => it.begin));
        const endDate = Math.max(...this._items.map(it => (it.end===null ? it.begin : it.end)));        
        const timespanMs = endDate-beginDate;
        const ms2px = YEAR_MS/this._scale;

        const paddingTop = 10;
        const paddingBottom = 10;
        const tickLabelWidth = 25;
        const timelineWidth = 10;
        const timelineHeight = (timespanMs+YEAR_MS)/ms2px;
        const boxSpace = 20;
        const boxWidth = 300;        
        const boxHeight = 50;
        const maxTitleChars = 30;
        const maxDescriptionChars = 45;

        this._container.style.height = "60vh";
        this._container.style.overflowY = "auto";        

        const svg = document.createElementNS(xmlns, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", timelineHeight + paddingTop + paddingBottom);

        const timeline = document.createElementNS(xmlns, "line");
        timeline.setAttribute("x1", timelineWidth / 2 + tickLabelWidth);
        timeline.setAttribute("y1", 0);
        timeline.setAttribute("x2", timelineWidth / 2 + tickLabelWidth);
        timeline.setAttribute("y2", timelineHeight + paddingBottom);
        timeline.setAttribute("stroke", "#000");
        svg.appendChild(timeline);

        for (let t = 0; t <= timespanMs+YEAR_MS; t += YEAR_MS) {
            const yearTick = document.createElementNS(xmlns, "line");
            yearTick.setAttribute("x1", tickLabelWidth);
            yearTick.setAttribute("y1", (t-YEAR_MS) / ms2px + paddingTop);
            yearTick.setAttribute("x2", timelineWidth+tickLabelWidth);
            yearTick.setAttribute("y2", (t-YEAR_MS) / ms2px + paddingTop);
            yearTick.setAttribute("stroke", "#000");
            svg.appendChild(yearTick);

            const yearTickLabel = document.createElementNS(xmlns, "text");
            yearTickLabel.setAttribute("x", 0);
            yearTickLabel.setAttribute("y", (t-MONTH_MS) / ms2px + paddingTop);
            yearTickLabel.setAttribute("alignment-baseline", "middle");
            yearTickLabel.setAttribute("font-size", "10px");
            yearTickLabel.textContent = moment(beginDate+t).year();
            svg.appendChild(yearTickLabel);

            if(this._scale >= displayMonthsWithScale){
                for(let m = t; m < t+YEAR_MS; m += MONTH_MS){
                    const monthTick = document.createElementNS(xmlns, "line");
                    monthTick.setAttribute("x1", tickLabelWidth);
                    monthTick.setAttribute("y1", m / ms2px + paddingTop);
                    monthTick.setAttribute("x2", timelineWidth+tickLabelWidth);
                    monthTick.setAttribute("y2", m / ms2px + paddingTop);
                    monthTick.setAttribute("stroke", "#000");
                    svg.appendChild(monthTick);

                    const monthTickLabel = document.createElementNS(xmlns, "text");
                    monthTickLabel.setAttribute("x", tickLabelWidth+timelineWidth);
                    monthTickLabel.setAttribute("y", m / ms2px + paddingTop);
                    monthTickLabel.setAttribute("alignment-baseline", "middle");
                    monthTickLabel.setAttribute("font-size", "10px");
                    monthTickLabel.textContent = moment(beginDate+m).format("MMM");
                    svg.appendChild(monthTickLabel);
                }
            }
        }

        const xBox = tickLabelWidth+timelineWidth+boxSpace;
        this._items.forEach(item => {            
            const contentMargin = xBox + (item.image ? boxHeight : 10) + 10;
            const yStart = (item.begin - beginDate) / ms2px + paddingTop;
            const yEnd = ((item.end === null ? item.begin : item.end) - beginDate) / ms2px + paddingTop;
            const yBox = (yStart+yEnd)/2 - boxHeight/2;

            const box = document.createElementNS(xmlns, "rect");
            box.setAttribute("x", xBox);
            box.setAttribute("y", yBox);
            box.setAttribute("width", boxWidth);
            box.setAttribute("height", boxHeight);
            box.setAttribute("stroke", item.borderColor || "#A9E2F3")
            box.setAttribute("fill", item.backgroundColor || "#A9E2F3AA");
            svg.appendChild(box);

            const titleLabel = document.createElementNS(xmlns, "text");
            titleLabel.setAttribute("x", contentMargin);
            titleLabel.setAttribute("y", yBox + boxHeight/4);            
            titleLabel.setAttribute("alignment-baseline", "middle");
            titleLabel.setAttribute("font-size", "14px");
            titleLabel.textContent = cropString(item.title, maxTitleChars);

            if(item.link){
                const link = document.createElementNS(xmlns, "a");
                link.setAttribute("href", item.link);            
                link.appendChild(titleLabel);
                svg.appendChild(link);
            }else{
                svg.appendChild(titleLabel);
            }

            const periodLabel = document.createElementNS(xmlns, "text");
            periodLabel.setAttribute("x", contentMargin);
            periodLabel.setAttribute("y", yBox + boxHeight/4 + 15);
            periodLabel.setAttribute("alignment-baseline", "middle");
            periodLabel.setAttribute("font-size", "9px");
            periodLabel.textContent = (item.end ? "Del " : "")+moment(item.begin).format("D/M/YYYY")+(item.end ? (" hasta el "+moment(item.end).format("D/M/YYYY")):"");
            svg.appendChild(periodLabel);

            const descriptionLabel = document.createElementNS(xmlns, "text");
            descriptionLabel.setAttribute("x", contentMargin);
            descriptionLabel.setAttribute("y", yBox + boxHeight/4 + 28);
            descriptionLabel.setAttribute("alignment-baseline", "middle");
            descriptionLabel.setAttribute("font-size", "11px");
            descriptionLabel.textContent = cropString(item.description, maxDescriptionChars);
            svg.appendChild(descriptionLabel);

            if(item.image){
                const image = document.createElementNS(xmlns, "image");
                image.setAttribute("x", xBox);
                image.setAttribute("y", yBox);
                image.setAttribute("height", boxHeight);
                image.setAttribute("href", item.image);
                svg.appendChild(image);
            }

            const polygon = document.createElementNS(xmlns, 'polygon');
            const vertices = [
                [timelineWidth / 2 + tickLabelWidth, yStart],
                [xBox, yBox],
                [xBox, yBox+boxHeight],
                [timelineWidth / 2 + tickLabelWidth, yEnd]
            ];
            polygon.setAttribute("points", vertices.reduce((acc, current) => acc + ` ${current[0]},${current[1]}`, ""));
            polygon.setAttribute("stroke", item.borderColor || "#A9E2F3");
            polygon.setAttribute("fill", item.backgroundColor || "#A9E2F3AA");
            svg.appendChild(polygon);
        });

        this._container.appendChild(svg);
        this._container.addEventListener("scroll", handleScroll);
        const scrollValue = localStorage.getItem("timeline-scroll-position");
        if(scrollValue) this._container.scrollTop = Number(scrollValue);

        debug(`Render finished in ${Date.now() - tic} ms`);
    }

    destroy() {
        this._container.innerHTML = "";
        this._container.removeEventListener("scroll", handleScroll);
        debug("Timeline destroyed");
    }
};