namespace jzor.docs.pages.concepts {
    export function fullstack() {
        return <ExamplePage>
{markdocs`
## Fullstack Environment

Jzor is specifically designed for fullstack development, blending .NET for backend development with TypeScript and a React-like framework for the frontend. It stands out with its server-side rendering approach, utilizing server-side components (Parts) that directly interact with the backend, thus eliminating the need for a REST API.

Frontend TypeScript code can effortlessly call backend methods and instantiate classes as if they were native objects. This approach significantly reduces the need to transmit data to the browser, bypassing the complexities of REST APIs and their security and versioning concerns. Moreover, the absence of REST APIs simplifies maintenance, particularly when the APIs are used exclusively by your applications.

### Jzor’s Approach to Applications

In Jzor, the strategy for managing load distribution simplifies traditional methodologies. 
Instead of relying on assorted REST backends, Jzor utilizes a unified system that spreads the load among several instances. 
This centralization simplifies operations such as setup, deployment, version management, and update reversals, while still accommodating the concurrent running of various application versions. 
Moreover, this model eliminates the complexity and necessity for versioned REST APIs and other decentralized components, leading to a more streamlined development and maintenance process.

That said, adopting Jzor doesn't necessitate a monolithic architecture. For larger applications, it's entirely feasible to segment the application into distinct functional areas, each operated on separate Jzor instances. 
This segmentation doesn't obligate the backend to be divided into individual APIs that align precisely with these functional areas. 
The optimal division of an application largely depends on the extent to which different parts of the application can operate autonomously.

<img src="/images/overview1.png"/>

### The Role of the Host in Jzor

A key distinction of Jzor applications from standard SPA applications is their server-side UI updates. 
The UI is sent to the browser without the initial need to fetch data or code, as both are already cached server-side. 
This results in instant application startups and seamless upgrades, even during active sessions.

> **NOTE:** By keeping code and data behind a server-rendered UI, Jzor enhances security by safeguarding against inspection or tampering.


In Jzor, the Host plays a pivotal role as the server-side application process, responsible for running frontends and seamlessly integrating with backend binary APIs. 
It is adept at managing multiple users concurrently, achieving efficient CPU usage by leveraging asynchronous rendering and backend calls. 
Within this framework, applications can share code, data, and binaries, yet maintain isolation within their JavaScript environments. 
By employing data caches shared across applications, Jzor effectively reduces the load on databases and internal REST APIs, making it a faster and more efficient solution than traditional REST-based methods.

The primary rationale behind using REST APIs is their facilitation of integration with browser-based SPAs. 
However, in server-side frameworks like Jzor, this necessity is eliminated. 
REST APIs, while useful, bring along significant overhead in terms of security, processing HTTP requests/responses, serialization, and occasionally, latency issues, especially when accessing referenced data.

While Jzor applications can still utilize REST APIs, it is recommended to opt for binary APIs. 
These binary APIs allow for direct method calls to the .NET backend, which can be made accessible to the Jzor frontend. 
This approach effectively eliminates the complexities and maintenance requirements associated with REST APIs, enabling the frontend to access multiple APIs and shape the exact data as needed.

That said, direct SQL queries or similar operations are not advised within frontend code. 
Instead, a backend API layer can be created using TypeScript, from which various frontend components can make calls. 
This method is suitable for some applications, though developing backend code in C# is often preferred due to the extensive frameworks and tools available.

Ultimately, Jzor's Host model simplifies both system and application architectures, while also reducing the performance demands on other systems.

### The Role of the Client in Jzor

In Jzor, the term "Client" is designated for the web browser and the scripts running within it. The Host is responsible for rendering UI elements and scripts for the Client, ensuring a fluid and cohesive user experience. To facilitate a smoother development process, the Host and Client share their code within the same TypeScript project, allowing for more efficient code sharing.

Jzor makes use of a specialized TypeScript compiler, designed to optimize the distribution of code. This compiler is particularly adept at identifying and addressing errors related to illogical code sharing, such as the inappropriate use of Browser or DOM APIs in server-rendered components. Moreover, the server in Jzor is capable of utilizing all the interfaces and types defined by the Client, effectively blurring the lines between the host and client, and simplifying their interaction.

A key feature of Jzor is the implementation of Proxy classes. These classes are instrumental in extending server-side components (Parts) with client-side instances. This extension enables seamless interaction between the code running on the Host and the Client-side code. Proxies are particularly useful in component development scenarios where a server-side rendered component requires access to specific DOM properties. By using Proxies, the server can interact with the client as if it were engaging with a local instance, enhancing the efficiency and effectiveness of the application.
`}
        </ExamplePage>
    }
}