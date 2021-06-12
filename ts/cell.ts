import {
  WidgetModel,
  WidgetView,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

import * as joint from 'jointjs';


export class CellModel extends WidgetModel {
  defaults() {
    return {
      ...super.defaults(),

      id: null,
      attrs: {},

      _model_module: MODULE_NAME,
      _model_module_version: MODULE_VERSION,
      _view_module: MODULE_NAME,
      _view_module_version: MODULE_VERSION,
    };
  }
}


export class ElementModel extends CellModel {
  defaults() {
    return {
      ...super.defaults(),

      position: { x: 0, y: 0 },
      angle: 0,
      size: { width: 1, y: 1 },
      ports: {}
    };
  }
}


export class RectangleModel extends ElementModel {
  defaults() {
    return {
      ...super.defaults(),

      _model_name: 'RectangleModel',
      _view_name: 'RectangleView'
    };
  }
}


export class RectangleView extends WidgetView {
  paper_obj: joint.dia.Paper | undefined;
  graph_obj: joint.dia.Graph | undefined;
  cell_obj: joint.shapes.standard.Rectangle | undefined;

  initialize(parameters: any): void {
    super.initialize(parameters);
    this.paper_obj = this.options.paper_obj;
    this.graph_obj = this.options.graph_obj;
  }

  handle_custom_message(content: any): void {
    /*if (this.paper_obj) {
      switch (content.do) {
        case 'make_image':
          this.make_image(content);
          break;
        case 'auto_view':
          this.stage_obj.autoView(content.duration || 0);
          break;
        case 'move':
          this.stage_obj.animationControls.move(content.to, content.duration || 0);
          break;
      }
    }*/
  }

  render() {
    super.render();
    if (!this.graph_obj || !this.paper_obj) {
      this.el.textContent = "Add to graph widget to visualize."
    } else if (!this.cell_obj) {
      this.cell_obj = new joint.shapes.standard.Rectangle({
        position: this.model.get('position'),
        angle: this.model.get('angle'),
        size: this.model.get('size'),
        attrs: this.model.get('attrs'),
        id: this.model.get('id'),
        ports: this.model.get('ports')
      });
      this.cell_obj.addTo(this.graph_obj);
    }
  }

  remove() {
    super.remove();
    if (this.graph_obj && this.cell_obj) {
      this.graph_obj.removeCells([this.cell_obj]);
      delete this.cell_obj;
    }
  }
}


export class LinkModel extends CellModel {
  defaults() {
    return {
      ...super.defaults(),

      source: {},
      target: {},

      _model_name: 'LinkModel',
      _view_name: 'LinkView'
    };
  }
}


export class LinkView extends WidgetView {
  paper_obj: joint.dia.Paper | undefined;
  graph_obj: joint.dia.Graph | undefined;
  cell_obj: joint.shapes.standard.Link | undefined;

  initialize(parameters: any): void {
    super.initialize(parameters);
    this.paper_obj = this.options.paper_obj;
    this.graph_obj = this.options.graph_obj;
  }

  handle_custom_message(content: any): void {
    /*if (this.paper_obj) {
      switch (content.do) {
        case 'make_image':
          this.make_image(content);
          break;
        case 'auto_view':
          this.stage_obj.autoView(content.duration || 0);
          break;
        case 'move':
          this.stage_obj.animationControls.move(content.to, content.duration || 0);
          break;
      }
    }*/
  }

  render() {
    super.render();
    if (!this.graph_obj || !this.paper_obj) {
      this.el.textContent = "Add to graph widget to visualize."
    } else if (!this.cell_obj) {
      this.cell_obj = new joint.shapes.standard.Link({
        source: this.model.get('source'),
        target: this.model.get('target'),
        attrs: this.model.get('attrs'),
        id: this.model.get('id')
      });
      this.cell_obj.addTo(this.graph_obj);
    }
  }

  remove() {
    super.remove();
    if (this.graph_obj && this.cell_obj) {
      this.graph_obj.removeCells([this.cell_obj]);
      delete this.cell_obj;
    }
  }
}


