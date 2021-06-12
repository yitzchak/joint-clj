import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
  //WidgetModel,
  //WidgetView,
} from '@jupyter-widgets/base';

// eslint-disable-next-line @typescript-eslint/no-var-requires
//const widgets = require('@jupyter-widgets/base');

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

import * as joint from 'jointjs';


export class GraphModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),

      _model_name: 'GraphModel',
      _model_module: MODULE_NAME,
      _model_module_version: MODULE_VERSION,
      _view_name: 'GraphView',
      _view_module: MODULE_NAME,
      _view_module_version: MODULE_VERSION,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
  };
}

export class GraphView extends DOMWidgetView {
  graph_container: any;
  paper_obj: any;
  graph_obj: any;
//  componentViews: any;
//  in_components_changing = false;

  initialize(parameters: any): void {
    super.initialize(parameters);
/*    this.componentViews = new ViewSet(
      this.create_graph_child_view,
      this.remove_graph_child_view,
      this
    );*/
    this.model.on('msg:custom', this.handle_custom_message.bind(this));
//    this.model.on('change:components', this.components_changed, this);

  }

/*  async components_changed() {
    this.in_components_changing = true;

    let views = await this.componentViews.update(this.model.get('components'));

    for (let view of views) {
      await view.render();
    }

    this.in_components_changing = false;
  }*/

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

      var rect = new joint.shapes.standard.Rectangle();
      rect.position(100, 30);
      rect.resize(100, 40);
      rect.attr({
        body: {
          fill: 'blue'
        },
        label: {
          text: 'Hello',
          fill: 'white'
        }
      });
      rect.addTo(this.graph_obj);

      var rect2 = new joint.shapes.standard.Rectangle();
      rect2.position(400, 30);
      rect2.resize(100, 40);
      rect2.attr({
        body: {
          fill: 'blue'
        },
        label: {
          text: 'World!',
          fill: 'white'
        }
      });
      rect2.addTo(this.graph_obj);

      var link = new joint.shapes.standard.Link();
      link.source(rect);
      link.target(rect2);
      link.addTo(this.graph_obj);
    });
  }

  processPhosphorMessage(msg: any): void {
    super.processPhosphorMessage(msg);
    /*if ((msg.type === 'resize' || msg.type === 'after-show') && this.paper_obj) {
      const box = this.el.getBoundingClientRect();
      this.stage_obj.setSize(Math.floor(box.width) + 'px', Math.floor(box.height) + 'px');
    }*/
  }

/*  create_graph_child_view(model: any) {
    return this.create_child_view(model, {
      stage_obj: this.stage_obj
    });
  }

  remove_graph_child_view(view: any) {
    view.remove();
  }*/
}

