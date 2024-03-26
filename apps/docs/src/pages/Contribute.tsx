namespace jzor.docs.pages {

    export function contribute() {
        return <ExamplePage>
{markdocs`
## Contribute

Certain segments of the Jzor runtime that align with open-source principles will be made available, allowing for community engagement and contribution. 
However, specific proprietary elements will be kept restricted to allow our team to concentrate on targeted enhancements in areas of security and stability. 
This balanced approach is part of our broader strategy to gradually release more of the runtime to the public domain, 
meticulously planning the transition to ensure the core system's integrity and reliability are upheld as we progressively involve the community in Jzor's development.

The TypeScript library for Jzor is entirely open-source, making enhancements to it and developing new plugins a quick path to expansion.
Enhancing documentation and crafting tools, such as a standalone compiler and package manager, are immediate priorities.

Opportunities for contribution include:
- Improve documentation and samples
- Developing native Jzor UI Parts for mobile and desktop - creating a comprehensive library suite.
- Creating plugins for data access, caching and cross-process data sharing.
- Implementing .NET backed integrated query languages similar to LINQ.
- Designing persistent state managers for seamless session resumptions.
- Any other enhancements that could serve the developer community.

Those interested in Jzor's potential and looking to contribute may find these areas suitable for innovation and collaboration.
`}
        </ExamplePage>
    }
}
