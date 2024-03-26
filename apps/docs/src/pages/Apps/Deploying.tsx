namespace jzor.docs.pages.apps {
        export function deploying() {
            return <ExamplePage>
{markdocs`
## Deploying

${<img src="/images/deploying.png" style="margin-left: 2rem; float: right"/>}
To deploy a Jzor application, the simplest approach is to replicate the entire working folder on the target system. Nonetheless, you can optimize the file set based on the target system's requirements.

It's advisable to create a bespoke configuration file for the target system, modifying settings specific to that environment, such as LAN addresses.

Here are various methods to streamline deployment:

### 1. Direct Copy of the Working Folder

As mentioned, the most straightforward method is to duplicate the entire working folder. This way, the target system mirrors the source, with source files remaining inaccessible externally. This approach is ideal for scenarios like testing or debugging, where development might continue on the target system.

### 2. Zip the Working Folder

Jzor supports packaging the working folder into a Zip file, which can then serve as the application's virtual filesystem. This configuration enables all files and assets to be accessed from the Zip archive. 

Reading from a Zip archive is generally quicker than direct filesystem access, but it has its downsides. 
Compressing files in the archive can consume more CPU resources due to the need for decompression on each request. 
It's usually better to store files uncompressed. 
Large asset files can cause locks in the virtual filesystem as the Zip reader isn't multithreaded, leading to contention over resources during simultaneous requests. 
Smaller files (<512KB) are managed more efficiently as they're copied to memory. Note that the Zip filesystem is readonly.

This method is recommended for smaller applications like monitoring systems, dashboards, or tests, where Jzor is launched with the Zip file as the source.

> **NOTE**: This feature is in development and not fully tested yet.

### 3. Exclude Source Files

If there's no need to recompile on the target, you can remove all source files. This requires disabling the built-in compiler in the configuration, so Jzor doesn't attempt to compile at startup. Instead, it will use the <code>.jzor/assembly.json</code> file, a snapshot of the last compiled version, to run the application.

> **NOTE**: The assembly file includes source code information, enabling debugging even without the source files.

You can safely delete all files except for configuration files, asset files and folders, and <code>.dll</code> files for binary Jzor .NET plugins. Essentially, this means removing every TypeScript file within the working folder and its subdirectories.

> **NOTE**: The upcoming standalone Jzor compiler will offer advanced features like application packaging, code pruning, and handling Zip archives.
`}
        </ExamplePage>
    }
}
