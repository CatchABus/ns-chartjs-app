import { Application, EventData, Page, Screen } from "@nativescript/core";
import { HelloWorldModel } from "./main-view-model";
import "chart.js/auto";
import {
  BasePlatform,
  BubbleDataPoint,
  Chart,
  ChartEvent,
  ChartTypeRegistry,
  ScatterDataPoint,
} from "chart.js";
import { Canvas } from "@nativescript/canvas";

class NativeScriptPlatform extends BasePlatform {
  acquireContext(item) {
    // To prevent canvas fingerprinting, some add-ons undefine the getContext
    // method, for example: https://github.com/kkapsner/CanvasBlocker
    // https://github.com/chartjs/Chart.js/issues/2807
    return (item && item.getContext && item.getContext("2d")) || null;
  }

  getMaximumSize(
    canvas: HTMLCanvasElement,
    width?: number,
    height?: number,
    aspectRatio?: number
  ): { width: number; height: number } {
    const parent = (canvas as any).parent;
    width = parent?.clientWidth ?? canvas.clientWidth;
    height = parent?.clientHeight ?? canvas.clientHeight;
    return { width, height };
  }

  getDevicePixelRatio(): number {
    return Screen.mainScreen.scale;
  }

  addEventListener(
    chart: Chart<
      keyof ChartTypeRegistry,
      (number | ScatterDataPoint | BubbleDataPoint)[],
      unknown
    >,
    type: string,
    listener: (e: ChartEvent) => void
  ): void {
    (chart.canvas as any).addEventListener(type, (args) => {
      const event: any = {
        type,
        chart,
        native: args,
      };

      if (args.touches) {
        const touch = args.touches.item(0);
        event.x = touch.clientX;
        event.y = touch.clientY;
      }
      listener(event);
    });
  }
}

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();
}

let c: Chart;
let canvas: Canvas;

export function onChartReady(args) {
  canvas = args.object as Canvas;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const ctx = canvas.getContext("2d");
  c = new Chart(ctx, {
    type: "bar",
    // @ts-ignore
    platform: NativeScriptPlatform,
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [1200, 1900, 300, 500, 200, 300],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      animations: {
        y: {
          duration: 700,
          easing: "linear",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
