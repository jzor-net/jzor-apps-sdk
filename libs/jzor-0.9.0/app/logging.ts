import logger = CLR.Jzor.Logger

// Shorthand for development
function log(...args:any[]) { 
    logger.debug(args); 
}

log.debug = function(...args) { logger.debug(args) }
log.error = function(...args) { logger.error(args) }
log.info = function(...args) { logger.info(args) }
log.trace = function(...args) { logger.trace(args) }
log.warn = function(...args) { logger.warn(args) }

function dump(value:any, maxLevel:number = 4) {
    return dumpValue(value, maxLevel);

    // TODO: Replace this with a CLR method
    function dumpValue(arg:any, maxLevel:number = 4) {
        //maxLevel = Math.min(maxLevel || 1, 4);
        return getDump(arg,0, maxLevel);
    
        function getDump(arg:any, level:number, maxLevel:number) {
            var result = '';
    
            var padding = new Array(level * 4).join(' ');
            if (level > maxLevel) return padding + '...\n';
    
            if (typeof (arg) == 'object') {
                for (var item in arg) {
                    var value = arg[item];
                    if (typeof (value) == 'object') value = `{\n${getDump(value, level + 1, maxLevel)}${padding}}`;
                    else if (typeof (value) == 'string') value = `'${value}'`;
                    result += `${padding}'${item}': ${value}\n`;
                }
            } else {
                //result = `(${typeOf(arg)}) ${arg}`;
                result = `(${typeof arg}) ${arg}`;
            }
            return result;
        }
    }  
}

