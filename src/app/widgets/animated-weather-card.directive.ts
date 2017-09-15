/**
 * Created by qhyang on 2017/3/14.
 */

import { merge } from "rxjs/operator/merge";
import { bufferCount } from "rxjs/operator/bufferCount";

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";
import { WeatherService } from "../weather.service";
import { TimeService } from "../time.service";

@Directive({ selector: "[animatedWeatherCard]" })
export class AnimatedWeatherCardDirective implements AfterViewInit {
    type: string;
    summary: string;
    temperature: string;
    time: Date;
    location: string;
    private gridItemContainer: HTMLElement;

    constructor(private weatherService: WeatherService, private timeService: TimeService, private el: ElementRef, private gridStackService: GridStackService) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);

        require("../../styles/animated-weather-cards.scss");

        const moment = require("moment");
        const AnimatedWeatherCards = require("../../scripts/animated-weather-cards");

        let animatedWeatherCards: any;

        const weatherObservable = this.weatherService.getCurrentWeather();
        const timeObservable = this.timeService.getCurrentServerTime();
        bufferCount.call(merge.call(weatherObservable, timeObservable), 2).subscribe((x:Array<any>) => {
            x.forEach(el => {
                if (el.type || el.summary || el.temperature) {
                    this.type = el.type || "";
                    this.summary = el.summary || "";
                    this.temperature = el.temperature || "";
                    this.location = el.location || "";
                } else {
                    this.time = el;
                }
            });
            animatedWeatherCards = AnimatedWeatherCards(this.el.nativeElement, {
                type: this.type,
                summary: this.summary,
                temperature: parseInt(this.temperature, 10),
                day: (() => {
                    switch (moment(this.time).day()) {
                        case 0:
                            return "Sunday";
                        case 1:
                            return "Monday";
                        case 2:
                            return "Tuesday";
                        case 3:
                            return "Wednesday";
                        case 4:
                            return "Thursday";
                        case 5:
                            return "Friday";
                        case 6:
                            return "Saturday";
                    }
                })(),
                date: moment(this.time).date(),
                month: (() => {
                    switch (moment(this.time).month()) {
                        case 0:
                            return "January";
                        case 1:
                            return "February";
                        case 2:
                            return "March";
                        case 3:
                            return "April";
                        case 4:
                            return "May";
                        case 5:
                            return "June";
                        case 6:
                            return "July";
                        case 7:
                            return "August";
                        case 8:
                            return "September";
                        case 9:
                            return "October";
                        case 10:
                            return "November";
                        case 11:
                            return "December";
                    }
                })(),
                location: this.location
            }, jQuery(".meny-left .contents .grid-stack").get(0));
        });

        this.gridStackService.on("init").subscribe(() => {
            this.gridStackService.on("resizestop").subscribe((event) => {
                if (event.target === this.gridItemContainer) {
                    animatedWeatherCards.resize();
                }
            });
        });
    }
}