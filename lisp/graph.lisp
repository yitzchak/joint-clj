(in-package #:joint)


(defclass graph (jupyter-widgets:dom-widget)
  ()
  (:metaclass jupyter-widgets:trait-metaclass)
  (:documentation "")
  (:default-initargs
    :%model-name "GraphModel"
    :%model-module +module-name+
    :%model-module-version +module-version+
    :%view-name "GraphView"
    :%view-module +module-name+
    :%view-module-version +module-version+))

