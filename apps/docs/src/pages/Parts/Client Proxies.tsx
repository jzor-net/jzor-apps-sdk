namespace jzor.docs.pages.parts {
    // Render the example
    export function clientproxies() {
        return <ExamplePage>
            {markdocs`
## Client Proxies

While it's relatively straightforward to make calls from the host to the client and vice versa in Jzor, the framework offers a more integrated solution through the use of client proxies that correspond with host classes. These client proxies are created and disposed of on the client in sync with the lifecycle of the associated host class. Both the host class and its client proxy implement a shared interface that defines methods to be implemented on both sides.

Methods within these classes are prefixed with either "host_" or "client_", indicating where the method is actually implemented. Jzor restricts calls to the host to only those methods prefixed with "host_". This approach ensures that not all methods are exposed for remote calling while also eliminating the need to explicitly mark each method for remote invocation.

On the host side, "client_" methods are implemented as empty placeholders. The <code>ProxyHost</code> class then sets up these methods to trigger corresponding implementations on the client side.

Similarly, on the client side, "host_" methods are implemented as placeholders, and the actual implementations are provided for "client_" methods. The <code>ClientProxy</code> takes care of connecting these calls to the appropriate implementations on the host side.

In addition to the standard implementation, the host can define a method with the "host_throttled_" prefix. 
This prefix signals the <code>ClientProxy</code> to sample all callbacks at an interval of 100ms. 
This feature is particularly useful for events that fire at a high rate, as continuously processing these events can be resource-intensive. 
By using "host_throttled_", Jzor offers an efficient alternative to handle such scenarios, reducing the load on the system by throttling the callback frequency.

> It's important to note that these method calls should be implemented as asynchronous operations, especially when returning values. Jzor does not wait for synchronous calls to complete, as this would block the Jzor engine until a return value is received.

In Jzor, server and client code are integrated within the same project, an approach that, while unconventional, facilitates code sharing between the host and client. 
This method does have its drawbacks, leading to exploration of alternative strategies for future iterations. 
Nonetheless, the decision to work with these current limitations has been made.

The belief is that the advantages of code sharing surpass these drawbacks, despite not being the most optimal method in every scenario.

Code sharing is confined to interfaces and types, with direct references to implementations across host and client boundaries being disallowed. 
This is because the host and client operate in different execution environments. 
The Jzor compiler is designed to actively monitor for any cross-boundary implementations, raising errors when such instances are detected.

Regarding the use of Proxy classes, a naming convention is followed where the client class name is an extension of the host class name, typically appended with 'Client'.

> TODO: These classes needs cleanup

#### MyProxy Example - host declaration
${<debug.SourceView title="MyProxy example using the ProxyHost base class" source="/src/pages/Parts/MyProxy.tsx" example="1" x-style="rounded" lang="tsx" run={<MyProxy/>} />}

#### MyProxy Example - client declaration
${<debug.SourceView title="MyProxyClient example using the ProxyClient base class" source="/src/pages/Parts/MyProxy.client.tsx" example="2" x-style="rounded" lang="tsx" />}

`}
        </ExamplePage>
    }
}
