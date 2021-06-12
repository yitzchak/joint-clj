(in-package #:joint)


(defclass graph (jupyter-widgets:dom-widget)
  ((cells
     :accessor cells
     :initarg :cells
     :initform nil
     :trait :widget-list
     :documentation ""))
  (:metaclass jupyter-widgets:trait-metaclass)
  (:documentation "")
  (:default-initargs
    :%model-name "GraphModel"
    :%model-module +module-name+
    :%model-module-version +module-version+
    :%view-name "GraphView"
    :%view-module +module-name+
    :%view-module-version +module-version+))


(defun layout (instance &key (node-sep 50) (edge-sep 20) (rank-sep 50) (rank-dir :top-to-bottom)
               margin-x margin-y ranker resize-cluster cluster-padding)
  (check-type instance graph)
  (jupyter-widgets:send-custom instance
                               (list :object-plist
                                     "do" "layout"
                                     "node_sep" node-sep
                                     "edge_sep" edge-sep
                                     "rank_sep" rank-sep
                                     "rank_dir" (ccase rank-dir
                                                  (:top-to-bottom "TB")
                                                  (:bottom-to-top "BT")
                                                  (:left-to-right "LR")
                                                  (:right-to-left "RL"))))
  (values))

