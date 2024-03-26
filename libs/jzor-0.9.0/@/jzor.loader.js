// ----------------------------------------------------------------------------------------------------------------------------------------
// This script initializes the Jzor application environment before the application starts.
// ----------------------------------------------------------------------------------------------------------------------------------------
var jzor = jzor || {};

jzor.loader = new class {
    logColors = { trace: "#888", debug: '#8BB', info: '#66F', warn: '#FA0', error: '#E66' }
    logLevels = ['trace', 'debug', 'info', 'warn', 'error' ]

    /**
     * Initializes loader properties.
     */
    async initialize() {
        this.splashElm = document.getElementById('jzor-splash')
        this.htmlElm = document.documentElement;
    }

    /**
     * Hides the loading splash screen.
     */
    hideLoaderSplash() {
        this.splashElm.classList.add('hide')
    }

    /**
     * Terminates the application, optionally showing a message and closing the window.
     */
    terminate(message, showMessage = true, closeWindow = true) {
        console.error('Application Terminated', message, showMessage, closeWindow)
        if (closeWindow && showMessage) document.body.innerHTML = message
        Blazor.disconnect()
        // Note: Window will not close if not opened by script.
        if (closeWindow) window.close()
        if (showMessage) alert(message)
    }

    /**
     * Configures the application with a unique appId before launch.
     */
    configure(appId) {
        var oldAppId = window.name
        window.name = appId
        return oldAppId
    }

    /**
     * Finalizes the application startup process, executing necessary scripts.
     */
    startup() {
        this.hideLoaderSplash()
        jzor.loader.scripts.execute();
        //jzor.app.scripts.execute();
    }
    
    /**
     * Updates the UI to reflect debugger status.
     */
    showDebuggerStatus(show) {
        this.htmlElm.classList.toggle('jzor-debugging', show)
        this.setDebuggerStatus(false, 'waiting')
    }

    /**
     * Adjusts UI based on debugger running status.
     */
    setDebuggerStatus(running, status) {
        this.htmlElm.style.setProperty('--jzor-debugging-status', `'${status}'`)
        this.htmlElm.style.setProperty('--jzor-debugging-color', running ? '#0F03' : '#F003')
        this.htmlElm.style.setProperty('--jzor-debugging-running-display-block', running ? 'block' : 'initial')
        this.htmlElm.style.setProperty('--jzor-debugging-paused-display-none', !running ? 'none' : 'initial')
    }

    /**
     * Triggers a reload of the application.
     */
    reload() {
        console.warn('Reload requested')
        window.location = window.location
    }

    /**
     * Handles application log events, displaying them in the browser console if enabled.
     */
    log(logEvent) {
        var level = this.logLevels[logEvent.level]
        var color = this.logColors[level]
        console[level](`%c${logEvent.items}`, `border-left:4px solid ${color};padding-left:4px;color:${color}`)
    }

    /** 
     * Reloads the Jzor application stylesheet to apply updated styles.
     */
    reloadStylesheet() {
        var stylesheet = document.getElementById('jzorAppStylesheet');
        var newHref = stylesheet.getAttribute('href').split('?')[0]; // Removes any existing query string
        newHref += '?v=' + new Date().getTime(); // Appends a new query string for cache busting
        stylesheet.setAttribute('href', newHref);
    }    
}

// Initializes the loader after the window loads.
window.addEventListener('load', jzor.loader.initialize())
