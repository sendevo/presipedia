import moment from "moment";
import { YEAR_MS, MONTH_MS } from "./constants";
import { cropString, debug } from "./utils";

const xmlns = "http://www.w3.org/2000/svg";
const displayMonthsWithScale = 150;
const maxDeoverlapIterations = 500;
const paddingTop = 25;
const tickLabelWidth = 25;
const timelineWidth = 10;
const boxSpace = 20;
const boxWidth = 300;        
const boxHeight = 50;
const maxTitleChars = 30;
const maxDescriptionChars = 45;

let watchDog;
const handleScroll = ev => {
    clearTimeout(watchDog);
    watchDog = setTimeout(() => {
        localStorage.setItem("timeline-scroll-position", ev.target.scrollTop.toString());
    }, 500);
};

export default class VerticalTimeline {
    constructor(container, items, navigate, scale = 40) {
        this._container = container;
        this._items = items;
        this._navigate = navigate;
        this._scale = scale;        

        const tic = Date.now();
        this._init();
        debug(`Render finished in ${Date.now() - tic} ms`);
    }

    _init() {
        this._items.sort((a,b) => a.begin-b.begin);
        const beginDate = this._items[0].begin;
        const endDate = this._items.at(-1).end;
        const timespanMs = endDate - beginDate;
        const ms2px = YEAR_MS/this._scale;

        // Compute vertical positions of every event box
        const yBoxes = [];
        for(let index = 0; index < this._items.length; index++)
            yBoxes[index] = ((this._items[index].begin + (this._items[index].end ? this._items[index].end : this._items[index].begin))/ms2px - boxHeight)/2 + paddingTop - beginDate/ms2px;

        // Detect overlapping between boxes and sepparate them
        let stepSize = 5;
        for(let iteration = 0; iteration < maxDeoverlapIterations; iteration++){
            let overlapping = 0;
            for(let index = 0; index < this._items.length; index++){
                if(yBoxes[index+1] - yBoxes[index] - 2 < boxHeight){                    
                    if(yBoxes[index] > stepSize)
                        yBoxes[index] -= stepSize;
                    yBoxes[index+1] += stepSize;
                    overlapping++;
                }
            }
            if(overlapping === 0) break;
        }

        this._container.style.height = "60vh";
        this._container.style.overflowY = "auto";        

        const timelineHeight = Math.max(timespanMs/ms2px, yBoxes.at(-1)+boxHeight/2)+paddingTop;

        const svg = document.createElementNS(xmlns, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", timelineHeight);

        // Draw vertical timeline with ticks and labels (years and months)
        const timeline = document.createElementNS(xmlns, "line");
        timeline.setAttribute("x1", timelineWidth / 2 + tickLabelWidth);
        timeline.setAttribute("y1", 0);
        timeline.setAttribute("x2", timelineWidth / 2 + tickLabelWidth);
        timeline.setAttribute("y2", timelineHeight);
        timeline.setAttribute("stroke", "#000");
        svg.appendChild(timeline);

        for (let t = 0; t <= timespanMs+YEAR_MS; t += YEAR_MS) {
            const yearTick = document.createElementNS(xmlns, "line");
            yearTick.setAttribute("x1", tickLabelWidth);
            yearTick.setAttribute("y1", (t-MONTH_MS) / ms2px + paddingTop);
            yearTick.setAttribute("x2", timelineWidth+tickLabelWidth);
            yearTick.setAttribute("y2", (t-MONTH_MS) / ms2px + paddingTop);
            yearTick.setAttribute("stroke", "#000");
            svg.appendChild(yearTick);

            const yearTickLabel = document.createElementNS(xmlns, "text");
            yearTickLabel.setAttribute("x", 0);
            yearTickLabel.setAttribute("y", (t-MONTH_MS) / ms2px + paddingTop);
            yearTickLabel.setAttribute("alignment-baseline", "middle");
            yearTickLabel.setAttribute("font-size", "10px");
            yearTickLabel.textContent = moment(beginDate+t).year();
            svg.appendChild(yearTickLabel);

            if(this._scale >= displayMonthsWithScale){ // Months only if scale is large
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

        // Draw everything
        const xBox = tickLabelWidth+timelineWidth+boxSpace;
        for(let index = 0; index < this._items.length; index++) {            
            const item = this._items[index];

            const boxGroup = document.createElementNS(xmlns, "g");
            if(item.link) boxGroup.onclick = () => this._navigate(item.link);

            const box = document.createElementNS(xmlns, "rect");
            box.setAttribute("x", xBox);
            box.setAttribute("y", yBoxes[index]);
            box.setAttribute("width", boxWidth);
            box.setAttribute("height", boxHeight);
            box.setAttribute("stroke", item.borderColor || "#A9E2F3")
            box.setAttribute("fill", item.backgroundColor || "#A9E2F3AA");
            boxGroup.appendChild(box);

            const polygon = document.createElementNS(xmlns, 'polygon');
            const vertices = [
                [timelineWidth / 2 + tickLabelWidth, (item.begin - beginDate) / ms2px + paddingTop],
                [xBox, yBoxes[index]],
                [xBox, yBoxes[index]+boxHeight],
                [timelineWidth / 2 + tickLabelWidth, ((item.end === null ? item.begin : item.end) - beginDate) / ms2px + paddingTop]
            ];
            polygon.setAttribute("points", vertices.reduce((acc, current) => acc + ` ${current[0]},${current[1]}`, ""));
            polygon.setAttribute("stroke", item.borderColor || "#A9E2F3");
            polygon.setAttribute("fill", item.backgroundColor || "#A9E2F3AA");
            boxGroup.appendChild(polygon);

            if(item.image){
                const image = document.createElementNS(xmlns, "image");
                image.setAttribute("x", xBox);
                image.setAttribute("y", yBoxes[index]);
                image.setAttribute("height", boxHeight);
                image.setAttribute("href", item.image);
                boxGroup.appendChild(image);
            }

            const contentMargin = xBox + 10 + (item.image ? boxHeight : 10);

            const titleLabel = document.createElementNS(xmlns, "text");
            titleLabel.setAttribute("x", contentMargin);
            titleLabel.setAttribute("y", yBoxes[index] + boxHeight/4);            
            titleLabel.setAttribute("alignment-baseline", "middle");
            titleLabel.setAttribute("font-size", "14px");
            titleLabel.textContent = cropString(item.title, maxTitleChars);
            boxGroup.appendChild(titleLabel);
            

            const periodLabel = document.createElementNS(xmlns, "text");
            periodLabel.setAttribute("x", contentMargin);
            periodLabel.setAttribute("y", yBoxes[index] + boxHeight/4 + 15);
            periodLabel.setAttribute("alignment-baseline", "middle");
            periodLabel.setAttribute("font-size", "9px");
            periodLabel.textContent = (item.end ? "Del " : "")+moment(item.begin).format("D/M/YYYY")+(item.end ? (" hasta el "+moment(item.end).format("D/M/YYYY")):"");
            boxGroup.appendChild(periodLabel);

            const descriptionLabel = document.createElementNS(xmlns, "text");
            descriptionLabel.setAttribute("x", contentMargin);
            descriptionLabel.setAttribute("y", yBoxes[index] + boxHeight/4 + 28);
            descriptionLabel.setAttribute("alignment-baseline", "middle");
            descriptionLabel.setAttribute("font-size", "11px");
            descriptionLabel.textContent = cropString(item.description, maxDescriptionChars);
            boxGroup.appendChild(descriptionLabel);

            svg.appendChild(boxGroup);
        };

        this._container.appendChild(svg);
        this._container.addEventListener("scroll", handleScroll);
        const scrollValue = localStorage.getItem("timeline-scroll-position");
        if(scrollValue) this._container.scrollTop = Number(scrollValue);
    }

    destroy() {
        this._container.innerHTML = "";
        this._container.removeEventListener("scroll", handleScroll);
        debug("Timeline destroyed");
    }
};