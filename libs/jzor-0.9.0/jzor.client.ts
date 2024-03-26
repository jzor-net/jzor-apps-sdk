namespace jzor.loader {
    type NamedStart = {
        name: string;
        func: Function;
    }
    
    export var scripts = new class {
        private _namedStarts: NamedStart[] = []

        start(name: string, func: Function) {
            var nf: NamedStart = { name, func };
            this._namedStarts.push(nf)
        }

        execute() {
            console.log(`Starting Client Scripts (${this._namedStarts.length})`)
            this._namedStarts.forEach(ns => {
                try {
                    console.log(`  Starting - ${ns.name}`)
                    ns.func()
                } catch (error) {
                    console.error(`Error starting client script ${ns.name} - ${error})`)
                }
            });
        }
    }

    var _namedStarts: NamedStart[] = []

    export function start(name: string, func: Function) {
        var nf: NamedStart = { name, func };
        _namedStarts.push(nf)
    }

    export function execute() {
        console.log(`Starting Client Scripts (${_namedStarts.length})`)
        _namedStarts.forEach(ns => {
            try {
                console.log(`  Starting - ${ns.name}`)
                ns.func()
            } catch (error) {
                console.error(`Error starting client script ${ns.name} - ${error})`)
            }
        });
    }    
}
