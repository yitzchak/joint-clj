(in-package #:joint)


(defclass cell (jupyter-widgets:widget)
  ((id
     :accessor id
     :initarg :id
     :initform (jupyter:make-uuid)
     :trait :string
     :documentation "")
   (attrs
     :accessor attrs
     :initarg :attrs
     :initform (j:make-object)
     :trait :json
     :documentation ""))
  (:metaclass jupyter-widgets:trait-metaclass)
  (:documentation "")
  (:default-initargs
    :%model-module +module-name+
    :%model-module-version +module-version+
    :%view-module +module-name+
    :%view-module-version +module-version+))


(defclass element (cell)
  ((position
     :accessor position
     :initarg :position
     :initform '(:object-plist "x" 0 "y" 0)
     :trait :json
     :documentation "")
   (angle
     :accessor angle
     :initarg :angle
     :initform 0.0
     :trait :float
     :documentation "")
   (size
     :accessor size
     :initarg :size
     :initform '(:object-plist "x" 1 "y" 1)
     :trait :json
     :documentation ""))
  (:metaclass jupyter-widgets:trait-metaclass)
  (:documentation ""))


(defclass rectangle (element)
  ()
  (:metaclass jupyter-widgets:trait-metaclass)
  (:documentation "")
  (:default-initargs
    :%model-name "RectangleModel"
    :%view-name "RectangleView"))
