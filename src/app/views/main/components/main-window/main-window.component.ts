import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit {
  private svg: any;

  constructor(){}

  ngOnInit(): void {
    this.svg = d3.select("svg");
    this.svg.call(this.zoom);
  }

  /**
   * Zoom functionality for svg
   */
  zoom = d3.zoom()
  .scaleExtent([1, 2])
  .on('zoom', function(event) {
      d3.select('svg')
       .attr('transform', event.transform);
  });
}

