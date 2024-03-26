// This sample shows the different ways you can declare a part
// All Jzor parts have to extend the abstract Part class

namespace jzor.docs.pages.integration {

    // Render the example
    export function plugins() {
        return <ExamplePage>
{markdocs`
## Plugin System

Jzor's plugin system allows for the integration of custom .NET assemblies with the TypeScript frontend. It features a TypeScript type generator that converts C# code to TypeScript definitions, bridging the gap between the .NET backend and TypeScript frontend.

The system scans for plugins at startup, outputting TypeScript definitions to the <code>/.jzor/CLR.d.ts</code> file. This enables TypeScript to directly access C# classes.

It supports .NET Types and Singleton classes, allowing for instantiation of .NET types in TypeScript and providing a straightforward way to expose application-wide functionality through Singleton classes.

#### CLR namespace
By default, .NET types in TypeScript are positioned under the <code>CLR</code> root namespace to prevent conflicts with existing TypeScript types.
Thus, <code>System.IO</code> would be accessible as <code>CLR.System.IO</code>, and <code>MyCompany.MyPlugin</code> as <code>CLR.MyCompany.MyPlugin</code>.

#### Example Markdown Plugin

${<debug.SourceView lang="CSharp" title="Example of the built-in Markdown plugin exposed as a singleton class">
    {`
    // The plugin initializer has 3 methods
    public class Initializer : PluginInitializer
    {
        // The Build method is called once at startup if the plugin needs to integrate with the WebApplication builder
        public override void Build(WebApplicationBuilder builder)
        {
            // The ConfigHelper class has a Jzor specific config logger, which can be used to log progress and errors
            ConfigHelper.ConfigLogger.LogInformation("Hello World");
        }
    
        // The Configure method is called once at startup if the plugin needs to integrate with the IApplicationBuilder
        public override void Configure(IApplicationBuilder app)
        {
        }
    
        // The Register method is called when all plugins have build and configured themselves
        public override void Register(IPluginRegistry registry)
        {
            // Registering a singleton, will create an instance of the class, and expose the instance to TypeScript
            // The singleton is using the namespace and name of the class as the identifier in typescript, unless customized
            registry.RegisterSingleton<Markdown>();
        }
    }


    // This is the actual class exposing the Markdown instance as a singleton to the Jzor TypeScript application.
    // A new instance is created for every application
    
    [TsDoc("Markdown plugin instance for converting markdown into HTML")]
    public class Markdown
    {
        private MarkdownPipeline _pipeline;

        public Markdown(IPluginManager pluginManager)
        {
            //NOTE: the IPluginManager interface is also implementing the IServiceProvider interface
            _pipeline = new MarkdownPipelineBuilder().UseAdvancedExtensions().Build();
        }

        [TsDoc("Renders the markdown to HTML")]
        public string ToHtml(string markdown)
        {
            return Markdig.Markdown.ToHtml(markdown, _pipeline);
        }
    }    `}
</debug.SourceView>}

### Creating a Plugin

To develop a Jzor plugin, you must first include the <code>Jzor.Runtime</code> package (or DLL) in your .NET library project. 
Next, create an initializer class that inherits from <code>Jzor.Runtime.PluginInitializer</code>. 
Lastly, define the types or instances you wish to make available to the Jzor application and register them with the <code>PluginInitializer</code>.

### TsAttributes

C# declarations can be annotated with TsAttributes to customize the exposure of the customized .NET classes. 

> See the Jzor Plugin source code for more information on how to use these attributes.

| TsAttribute | Description |
|-------------|-------------|
<code>TsCodeAfter(string code)</code> | Appends the specified TS code after the declaration |
<code>TCodeBefore(string code)</code> | Prepends the specified TS code before the declaration
<code>TsDoc(string description)</code> | Describes the TS type
<code>TsIdentifier(string name)</code> | Use the explicitly specified identifier name
<code>TsIgnore()</code> | Ignores the member
<code>TsInclude(Type type)</code> | Include the specified type in the output
<code>TsInclude\<T\>()</code> | Include the specified generic type parameter in the output
<code>TsNamespace(string @namespace)</code> | Set the TS namespace explicitly
<code>TsNamingConvention(bool useTypeScriptNaming)</code> | Set the naming convention to TS, where the first character is lowercase
<code>TsOptional()</code> | Declares the member as a TS optional type
<code>TsReturnType(string typename)</code> | Declares an explicit TS return type
<code>TsType(string typename)</code> | Declares an explicit TS type

`}
</ExamplePage>
    }
}
