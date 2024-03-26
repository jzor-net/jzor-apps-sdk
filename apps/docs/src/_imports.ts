// The export import statements allows all classes, declarations, and code within the namespace and its sub-namespaces to use the identifiers.

namespace jzor.docs {
    export import Router = jzor.app.Router
    export import Route = jzor.app.Route

    export import Ticker = debug.Ticker
    export import RenderCounter = jzor.parts.RenderCounter

    export import Box = ui.layout.Box
    export import HBox = ui.layout.HBox
    export import VBox = ui.layout.VBox
}