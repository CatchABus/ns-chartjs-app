import { EventData, Page } from '@nativescript/core'
import { HelloWorldModel } from './main-view-model'
import { Chart } from 'chart.js';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object
  page.bindingContext = new HelloWorldModel()
}

export function onChartReady(args) {
  const ctx = args.object.getContext('2d');
  var c = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [1200, 1900, 300, 500, 200, 300],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}