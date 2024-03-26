namespace jzor.docs.pages.debugging {
    export function logging() {
        return <ExamplePage>
{markdocs`
## Logging

Jzor logging is vital for debugging applications and monitoring the health and status of your application in operation. Jzor log methods takes any number of arguments and usually displays the arguemtns separated by commas.
Internally Jzor logging is finally emitting it's log output to the Microsoft ILogger, which can be customized on the host system with log providers and formatters.

#### Client Logging

On the client side, the standard browser <code>console</code> class is utilized for logging, adhering to conventional web development practices.

#### Host Logging

Within the Jzor host TypeScript environment, logging is facilitated through the <code>log</code> function. Five predefined logging levels—trace, debug, information, warning, and error—address a range of debugging and informational needs. The <code>log(...args)</code> function allows for quick dispatch of messages to the debug log. More targeted logging functions, such as <code>log.debug</code> and <code>log.warning</code>, are also available.

By default, logs are output to the host's console. Additionally, host logging can be configured to relay output to the browser console, focusing on logs pertinent to the current application session.

You can also use Jzor logging from plugins, or use the normal ILogger to bypass the Jzor logging system.

#### Simple demo of the logging methods  
Open the browser console and the Jzor terminal window to observe the logging output. In the browser console, host logging statements are displayed in color for easy identification.
${demo()}
`}
        </ExamplePage>
    }

    function demo() {
        return <>
            <button on:click={_ => log.debug('Hello Debug')}>Log Debug</button>
            <button on:click={_ => log.error('Hello Error')}>Log Error</button>
            <button on:click={_ => log.info('Hello Info')}>Log Info</button>
            <button on:click={_ => log.trace('Hello Trace')}>Log Trace</button>
            <button on:click={_ => log.warn('Hello Warn')}>Log Warn</button>
            <TempLogger/>
        </>
    }    
}