export class ViewSet<T> {
  constructor(
    create_view: (model: any) => T | Promise<T>,
    remove_view: ((view: T) => void) | null,
    context: any
  ) {
    this._handler_context = context || this;
    this._create_view = create_view;
    this._remove_view =
      remove_view ||
      function(view): void {
        (view as any).remove();
      };
  }

  async update(new_models: any[]): Promise<T[]> {
    for (let [model, view] of this._model_views) {
      if (!new_models.includes(model)) {
        this._remove_view.call(this._handler_context, view);
        this._model_views.delete(model);
      }
    }

    let views = [];

    for (let model of new_models) {
      if (!this._model_views.has(model)) {
        let view = await this._create_view.call(this._handler_context, model);
        views.push(view);
        this._model_views.set(model, view);
      }
    }

    return views;
  }

  remove(): void {
    for (let view of this._model_views.values()) {
      this._remove_view.call(this._handler_context, view);
    }
    this._model_views.clear();
  }

  dispose(): void {
    this._model_views.clear();
  }

  _handler_context: any;
  _model_views: Map<any, any> = new Map();
  _create_view: (model: any) => T | Promise<T>;
  _remove_view: (view: T) => void;
}

