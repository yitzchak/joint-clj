import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
  //WidgetModel,
  //WidgetView,
} from '@jupyter-widgets/base';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const widgets = require('@jupyter-widgets/base');

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

import * as joint from 'jointjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dagre = require('dagre');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const graphlib = require('graphlib');

import { ViewSet } from './utils';


export class GraphModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),

      cells: [],

      _model_name: 'GraphModel',
      _model_module: MODULE_NAME,
      _model_module_version: MODULE_VERSION,
      _view_name: 'GraphView',
      _view_module: MODULE_NAME,
      _view_module_version: MODULE_VERSION,
    };
  }

  static serializers: ISerializers = {
    cells: { deserialize: widgets.unpack_models },
    ...DOMWidgetModel.serializers,
  };
}

export class GraphView extends DOMWidgetView {
  paper_obj: joint.dia.Paper | null | undefined;
  graph_obj: joint.dia.Graph | null | undefined;
  child_views: any;
  in_cells_changing: Boolean = false;

  initialize(parameters: any): void {
    super.initialize(parameters);
    this.child_views = new ViewSet(
      this.create_graph_child_view,
      this.remove_graph_child_view,
      this
    );
    this.model.on('msg:custom', this.handle_custom_message.bind(this));
    this.model.on('change:cells', this.cells_changed, this);

  }

  async cells_changed() {
    this.in_cells_changing = true;

    let views = await this.child_views.update(this.model.get('cells'));

    for (let view of views) {
      await view.render();
    }

    this.in_cells_changing = false;
  }

  handle_custom_message(content: any): void {
    if (this.paper_obj && this.graph_obj) {
      switch (content.do) {
        case 'layout':
          joint.layout.DirectedGraph.layout(this.graph_obj, {
            rankDir: content.rank_dir,
            nodeSep: content.node_sep,
            edgeSep: content.edge_sep,
            rankSep: content.rank_sep,
            dagre,
            graphlib
          });
          break;
      }
    }
  }

  render() {
    super.render();
    this.displayed.then(() => {
      this.el.classList.add('joint-paper');
      this.el.classList.add('jupyter-widgets');
      this.el.setAttribute('data-jp-suppress-context-menu', '');

      this.graph_obj = new joint.dia.Graph();

      const box = this.el.getBoundingClientRect();

      this.paper_obj = new joint.dia.Paper({
        el: this.el,
        model: this.graph_obj,
        width: box.width,
        height: box.height,
        gridSize: 1
      });

      this.paper_obj.options.defaultRouter = {
        name: 'manhattan',
        args: { padding: 10 }
      };

      this.paper_obj.options.defaultConnector = {
        name: 'jumpover',
        args: { }
      };

      this.cells_changed();
    });
  }

  processPhosphorMessage(msg: any): void {
    super.processPhosphorMessage(msg);
    /*if ((msg.type === 'resize' || msg.type === 'after-show') && this.paper_obj) {
      const box = this.el.getBoundingClientRect();
      this.stage_obj.setSize(Math.floor(box.width) + 'px', Math.floor(box.height) + 'px');
    }*/
  }

  create_graph_child_view(model: any) {
    return this.create_child_view(model, {
      graph_obj: this.graph_obj,
      paper_obj: this.paper_obj
    });
  }

  remove_graph_child_view(view: any) {
    view.remove();
  }
}

