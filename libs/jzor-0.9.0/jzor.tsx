/**
 * Note: This file is subject to modifications with future Jzor releases. 
 * Ensure compatibility with newer versions.
 * TODO: Include version number
 */

/////////////////////////////////////////////////////////////////////////////////
// Jzor Global Types
/////////////////////////////////////////////////////////////////////////////////
type HtmlAttr = string | boolean
import IProps = CLR.Jzor.IProps

function messageName(msg:any) {
    var x = CLR.Jzor.Types.NameOf(msg) as string
    var y = x.replace(/\./g, "_");
    var z = CLR.Jzor.Messaging.GetMessageName(msg)
    return z;
}

// TODO: This is utilizing the constructor name, which could collide as it doesn't consider the namespace
function onMsg<T extends object>(msg: new() => T) { 
    return CLR.Jzor.Messaging.GetMessageName(msg)
}

/////////////////////////////////////////////////////////////////////////////////
// Jzor Part and Fragment declarations
/////////////////////////////////////////////////////////////////////////////////
namespace jzor {
    export abstract class Part<Props = object & IProps> extends CLR.Jzor.Part {
        public constructor(protected props: IProps & Props) {
            super(props);
        }
        abstract render(): any

        /**
         * Sends a message to the current application, using the internal application message bus
         * @param MsgType - the type of the message
         * @param msg - the message must be JSON serializeable
         */
        dispatchMessage<T extends object>(msg: T) {
            var msgName = CLR.Jzor.Messaging.GetMessageName(msg.constructor);
            CLR.Jzor.Messaging.DispatchMessage(msgName, [msg]);
        }

        /**
         * Sends a message to all applications, using the distributed zero mq message bus
         * @param MsgType - the type of the message
         * @param msg - the message must be JSON serializeable
         */
        distributeMessage<T extends object>(msg: T) {
            var msgName = CLR.Jzor.Messaging.GetMessageName(msg.constructor);
            CLR.Jzor.Messaging.DistributeMessage(msgName, msg);
        }

        //distributeMessage<T extends Message>(MsgType: new () => T, msg: T) {
    }

    //NB: Placeholder class
    export abstract class Fragment extends jzor.Part {
    }
}

/////////////////////////////////////////////////////////////////////////////////
// Global helpers and extensions
/////////////////////////////////////////////////////////////////////////////////

/* Type functions */
function typeOf(obj: any): string { return CLR.Jzor.Types.TypeOf(obj) }
//function typeOfExt(obj:any) : string { return CLR.Jzor.Types.TypeOfExt(obj) }

/** Get a part by a global ID as set by the parts ID property
 * @type {T} - the type of the part to get
 * @param {string} id - the global ID of the part to lookup. 
 * @return {Part} - the part which can be casted to a specific part type using the generic argument
*/
function getPartById<T extends jzor.Part>(id: string): T { return CLR.Jzor.GlobalId.GetPartByID(id) as T; }
function setPartById(id: string, part: jzor.Part): void { CLR.Jzor.GlobalId.SetPartByID(id, part) }

/** Returns a binding instance (value reference) of the specified type
 * @type {T} - the type of the binding expresion value
 * @param {T} expression - a member expression that includes both the instance and property
 * @returns {IBinding<T>} - a binding interface that acts like a reference to the expression, with a value property that modifies the value of the expression
*/
declare function bind<T>(expression: T): CLR.Jzor.IBinding<T>

// Write raw html, without escape characters
declare function raw(value: string): string

// Renders markdown as HTML via plugin
// TODO: Move to markdown plugin
function markdown(markup: string) { return raw(CLR.Jzor.Markdown.ToHtml(markup)) }

/**
 * Renders Markdown suitable for docs (TODO: this should not live here)
 * @param strings 
 * @param values 
 * @returns 
 */
function markdocs(strings: TemplateStringsArray, ...values: any[]) {
    function zipArrays<T>(array1: any[], array2: any[]): any[] {
        const result: T[] = [];
        const maxLength = Math.max(array1.length, array2.length);
    
        for (let i = 0; i < maxLength; i++) {
            if (i < array1.length) result.push(array1[i]);
            if (i < array2.length) result.push(array2[i]);
        }
    
        return result;
    }
    
    var mdStrings = strings.raw.map(s => markdown(s))
    var zipped = zipArrays(mdStrings, values)
    return zipped;
}

namespace jzor {
    export declare function createElement(ctor: any, props: object, content: any): Fragment
    export declare function renderContent(values: any[]): void
}

/////////////////////////////////////////////////////////////////////////////////
//// Global Helpers
/////////////////////////////////////////////////////////////////////////////////

//TODO: Implement in .net
function getAllProperties(target: object): string[] {
    const allProperties: string[] = [];
    let current = target;
    while (current !== null) {
        const properties = Object.getOwnPropertyNames(current);
        properties.forEach(property => allProperties.push(property));
        current = Object.getPrototypeOf(current);
    }
    return allProperties;
}



/////////////////////////////////////////////////////////////////////////////////
//// JSX configuration
/////////////////////////////////////////////////////////////////////////////////

type EventArgs = CLR.System.EventArgs
type ChangeEventArgs = CLR.Microsoft.AspNetCore.Components.ChangeEventArgs
type ClipboardEventArgs = CLR.Microsoft.AspNetCore.Components.Web.ClipboardEventArgs
type DragEventArgs = CLR.Microsoft.AspNetCore.Components.Web.DragEventArgs
type ErrorEventArgs = CLR.Microsoft.AspNetCore.Components.Web.ErrorEventArgs
type FocusEventArgs = CLR.Microsoft.AspNetCore.Components.Web.FocusEventArgs
type KeyboardEventArgs = CLR.Microsoft.AspNetCore.Components.Web.KeyboardEventArgs
type MouseEventArgs = CLR.Microsoft.AspNetCore.Components.Web.MouseEventArgs
type PointerEventArgs = CLR.Microsoft.AspNetCore.Components.Web.PointerEventArgs
type ProgressEventArgs = CLR.Microsoft.AspNetCore.Components.Web.ProgressEventArgs
type TouchEventArgs = CLR.Microsoft.AspNetCore.Components.Web.TouchEventArgs
type WheelEventArgs = CLR.Microsoft.AspNetCore.Components.Web.WheelEventArgs

interface JzorEvents {
    "focus": FocusEventArgs,
    "blur": FocusEventArgs,
    "focusin": FocusEventArgs,
    "focusout": FocusEventArgs,

    // Mouse events
    "mouseover": MouseEventArgs
    "mouseout": MouseEventArgs
    "mouseleave": MouseEventArgs
    "mouseenter": MouseEventArgs
    "mousemove": MouseEventArgs
    "mousedown": MouseEventArgs
    "mouseup": MouseEventArgs
    "click": MouseEventArgs
    "dblclick": MouseEventArgs
    "wheel": WheelEventArgs
    "mousewheel": WheelEventArgs
    "contextmenu": MouseEventArgs

    // Drag events
    "drag": DragEventArgs
    "dragend": DragEventArgs
    "dragenter": DragEventArgs
    "dragleave": DragEventArgs
    "dragover": DragEventArgs
    "dragstart": DragEventArgs
    "drop": DragEventArgs

    // Keyboard events
    "keydown": KeyboardEventArgs
    "keyup": KeyboardEventArgs
    "keypress": KeyboardEventArgs

    // Input events
    "change": ChangeEventArgs
    "input": ChangeEventArgs
    "invalid": EventArgs
    "reset": EventArgs
    "select": EventArgs
    "selectstart": EventArgs
    "selectionchange": EventArgs
    "submit": EventArgs

    // Clipboard events
    "beforecopy": EventArgs
    "beforecut": EventArgs
    "beforepaste": EventArgs
    "copy": ClipboardEventArgs
    "cut": ClipboardEventArgs
    "paste": ClipboardEventArgs

    // Touch events
    "touchcancel": TouchEventArgs
    "touchend": TouchEventArgs
    "touchmove": TouchEventArgs
    "touchstart": TouchEventArgs
    "touchenter": TouchEventArgs
    "touchleave": TouchEventArgs

    // Pointer events
    "gotpointercapture": PointerEventArgs
    "lostpointercapture": PointerEventArgs
    "pointercancel": PointerEventArgs
    "pointerdown": PointerEventArgs
    "pointerenter": PointerEventArgs
    "pointerleave": PointerEventArgs
    "pointermove": PointerEventArgs
    "pointerout": PointerEventArgs
    "pointerover": PointerEventArgs
    "pointerup": PointerEventArgs

    // Media events
    "canplay": EventArgs
    "canplaythrough": EventArgs
    "cuechange": EventArgs
    "durationchange": EventArgs
    "emptied": EventArgs
    "pause": EventArgs
    "play": EventArgs
    "playing": EventArgs
    "ratechange": EventArgs
    "seeked": EventArgs
    "seeking": EventArgs
    "stalled": EventArgs
    "stop": EventArgs
    "suspend": EventArgs
    "timeupdate": EventArgs
    "volumechange": EventArgs
    "waiting": EventArgs

    // Progress events
    "loadstart": ProgressEventArgs
    "timeout": ProgressEventArgs
    "abort": ProgressEventArgs
    "load": ProgressEventArgs
    "loadend": ProgressEventArgs
    "progress": ProgressEventArgs
    "error": ErrorEventArgs

    // General events
    "activate": EventArgs
    "beforeactivate": EventArgs
    "beforedeactivate": EventArgs
    "deactivate": EventArgs
    "ended": EventArgs
    "fullscreenchange": EventArgs
    "fullscreenerror": EventArgs
    "loadeddata": EventArgs
    "loadedmetadata": EventArgs
    "pointerlockchange": EventArgs
    "pointerlockerror": EventArgs
    "readystatechange": EventArgs
    "scroll": EventArgs

    "toggle": EventArgs
}

declare namespace JSX {
    interface IntrinsicElements {
        [name: string]:
        { [key in `on:${keyof JzorEvents}`]?: (e: JzorEvents[key extends `on:${infer key}` ? key & keyof JzorEvents : never]) => any }
        & { [key in `stoppropagation:${keyof JzorEvents}`]?: boolean }
        & { [key in `preventdefault:${keyof JzorEvents}`]?: boolean }
        & { [name: string]: any }
    }

    // interface ElementAttributesProperty {
    //   props: any;
    // }
}