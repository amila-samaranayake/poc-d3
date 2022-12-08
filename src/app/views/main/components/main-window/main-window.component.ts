import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Door } from 'src/app/shared/models/door.model';

@Component({
  selector: 'app-main-window',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss'],
})
export class MainWindowComponent implements OnInit {
  /**
   * Load the Doors in Engineering
   */
  doors: Door[] = [
    {
      id: 'D001',
      name: 'D001',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D002',
      name: 'D002',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D003',
      name: 'D003',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D004',
      name: 'D004',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D005',
      name: 'D005',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D006',
      name: 'D006',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D007',
      name: 'D007',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D008',
      name: 'D008',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D009',
      name: 'D009',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
    {
      id: 'D010',
      name: 'D010',
      floor: '1',
      building: '',
      x: '',
      y: '',
      selected: false,
    },
  ];

  selectedDoor:Door  = {
    id: '',
    name: '',
    floor: '',
    x: '',
    y: '',
    selected: false
  };

  private svg: any;
  private doorList: any;
  private toolTip: any;
  private selectedPointer: any;
  constructor() {}

  ngOnInit(): void {
    this.svg = d3.select('svg');
    this.svg.call(this.zoom);

    let doorUl = d3
      .select('#ul-list')
      .selectAll('li')
      .data(this.doors)
      .enter()
      .append('li');

    doorUl
      .append('div')
      .classed('door-dot', true)
      .attr('draggable', true)
      .attr('id', 'item');

    doorUl.append('P').text(function (d) {
      return d.name;
    });

    let dots = d3.select('#ul-list').selectAll('#item');

    dots.on('dragstart', this.onDragStarting);
    dots.on('dragend', this.onDragEnding);
    dots.on('click', this.onClickDot);

    //doorPoints.on('dragstart', this.onDragStarting);
    //doorPoints.on('dragend', this.onDragEnding);

    this.toolTip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  }

  /**
   * Zoom functionality for svg
   */
  zoom = d3
    .zoom()
    .scaleExtent([1, 2])
    .on('zoom', function (event) {
      d3.select('svg').attr('transform', event.transform);
    });

  /**
   * Drag handle D3
   */
  dragHandler = d3.drag().on('drag', function (e: any, d: any) {
    d3.select(this)
      .attr('x', (d.x = e.x))
      .attr('y', (d.y = e.y));
  });

  offset: any;
  onDragStarting = (e: any, d: any) => {
    // Get the block coordinates
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    // Find the offset of the mouse from those coordinates.
    this.offset = [
      e.clientX - currentTargetRect.left,
      e.clientY - currentTargetRect.top,
    ];
  };

  onDragEnding = (e: any, d: any) => {
    let mouse = d3.pointer(e);
    let currentTargetRect = e.currentTarget.getBoundingClientRect();

    const { x, y } = this.convertCoordinatesDOMtoSVG(
      this.svg,
      e.clientX - this.offset[0],
      e.clientY - this.offset[1]
    );

    mouse[0] = x;
    mouse[1] = y;
    d.x = x;
    d.y = y;
    let pointer = this.svg
      .append('use')
      .datum(d)
      .attr('id', d.id)
      .attr('href', '#pointer')
      .attr('transform', 'translate(' + mouse[0] + ',' + mouse[1] + ')scale(0)')
      .attr('fill', '#228b22')
      .attr('stroke', '#228b22')
      .attr('stroke-width', '1px');

    pointer
      //.transition()
      //.duration(500)
      .attr(
        'transform',
        'translate(' + mouse[0] + ',' + mouse[1] + ') scale(1)'
      )
      .attr('x', mouse[0])
      .attr('y', mouse[1])
      .attr('transform', 'scale(1)');

    this.dragHandler(pointer);

    pointer.on('click', this.onClickDot);

    pointer
      .on('mouseover', (d: any) => {
        var datum = pointer.datum();
        this.toolTip.transition().duration(200).style('opacity', 0.9);
        'X : ' + datum.x + '<br/>';
        this.toolTip
          .html(
            `X: ${datum.x} <br/>
                     Y: ${datum.x} <br/>`
          )
          .style('left', d.pageX + 'px')
          .style('top', d.pageY - 28 + 'px');
      })
      .on('mouseout', (d: any) => {
        this.toolTip.transition().duration(500).style('opacity', 0);
      });
  };

  onClickDot(e: any, d: any) {
    debugger;
    console.log(d3.select('#door-name'));
    
    d3.select('#door-name').text(d.name);
    d3.select('#door-id').text(d.id);
    d3.select('#door-floor').text(d.floor);

    this.selectedDoor.id = d.id;
    this.selectedDoor.name = d.name;
    this.selectedDoor.floor = d.floor;
    this.selectedDoor.x = d.x;
    this.selectedDoor.y = d.y;
    this.selectedDoor.selected = d.selected;
    e.stopPropagation();
  }

  onChangeColor() {
    debugger;
    if (this.selectedDoor) {
      let door = this.svg.select(`#${this.selectedDoor.id}`);
      console.log(door);
    }
  }

  /**
   * Convert DOM coordinates to SVG coordinates based on SVG offset and zoom level
   */
  convertCoordinatesDOMtoSVG = (svg: any, x: any, y: any) => {
    const pt = svg.node().createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(svg.node().getScreenCTM().inverse());
  };
}
