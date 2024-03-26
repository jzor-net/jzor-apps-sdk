// The export import statements allows all classes, declarations, and code within the namespace and its sub-namespaces to use them
namespace mycompany.myapp {
    export import Part = jzor.Part
    export import Fragment = jzor.Fragment

    export import Browser = jzor.app.Browser
    export import Router = jzor.app.Router
    export import Route = jzor.app.Route

    export import RenderCounter = jzor.parts.RenderCounter
    export import Ticker = jzor.debug.Ticker

    export import Box = jzor.ui.layout.Box
    export import Center = jzor.ui.layout.Center
    export import Dialog = jzor.ui.Dialog
    export import HBox = jzor.ui.layout.HBox
    export import VBox = jzor.ui.layout.VBox

    export import HSplit = jzor.ui.HSplit
    export import VSplit = jzor.ui.VSplit
}