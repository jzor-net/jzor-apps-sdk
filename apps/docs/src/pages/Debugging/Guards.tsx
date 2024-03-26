namespace jzor.docs.pages.debugging {
    export function guards() {
        return <ExamplePage>
{markdocs`
## Guards
Jzor is equipped with a suite of safety mechanisms designed to maintain application stability and prevent server overloads. These tools either terminate the application encountering issues or halt execution by throwing exceptions, thereby safeguarding against common error scenarios.

#### 1. Part Recursion Limit
Throws an exception if a part is nested beyond 100 levels, indicating excessive recursion that could lead to stack overflow.
${<debug.SourceView source="/src/pages/Debugging/Guards.tsx" example="1" x-style="rounded" lang="tsx" run={<RecursivePart />} />}

#### 2. Regex Timeouts
An exception is thrown if a regular expression execution exceeds 4 seconds, preventing potential freeze-ups caused by complex patterns.
${<debug.SourceView source="/src/pages/Debugging/Guards.tsx" example="2" x-style="rounded" lang="tsx" run={<RegexTimeout />} />}

#### 3. Script Recursion Limit
Throws an exception if script recursion exceeds 100 calls, safeguarding against infinite loops and excessive memory consumption.
${<debug.SourceView source="/src/pages/Debugging/Guards.tsx" example="3" x-style="rounded" lang="tsx" run={<ScriptRecursion />} />}

#### 4. Maximum Statements Limit
An exception is thrown if a single call executes more than 50,000,000 statements, protecting against runaway scripts.
${<debug.SourceView source="/src/pages/Debugging/Guards.tsx" example="4" x-style="rounded" lang="tsx" run={<MaxStatements />} />}

#### 5. Script Timeout
Throws an exception if the execution time of a single script call exceeds 4 seconds, ensuring timely execution.
${<debug.SourceView source="/src/pages/Debugging/Guards.tsx" example="5" x-style="rounded" lang="tsx" run={<ScriptTimeout />} />}

#### 6. Maximum Render Rate
Throws an exception if an individual part's rendering rate exceeds 100 renders per second, maintaining efficient UI updates.
${<debug.SourceView source="/src/pages/Debugging/Guards.tsx" example="6" x-style="rounded" lang="tsx" run={<RenderRate/>} />}

#### 7. Max Exception Rate
Terminates the application if the rate of exceptions exceeds 100 per second, preventing error floods.
${<debug.SourceView source="/src/pages/Debugging/Guards.tsx" example="7" x-style="rounded" lang="tsx" run={<MaxExceptions/>} />}

#### 8. Watchdog Timer
Monitors application responsiveness, terminating the app if it becomes unresponsive, with the AppView Part responsible for periodically resetting the watchdog timer.
            
`}
        </ExamplePage>
    }

    //1. Max nesting is 100 levels
    export class RecursivePart extends Part {
        render() {
            // This one renders forever
            return <div style="border:1px solid #48F; padding:1px;">
                Level: {this.NestedLevel}
                <RecursivePart />
            </div>
        }
    }
    //1.

    //2. Regex has timeouts
    export class RegexTimeout extends Part {
        regexTimingout() {
            return /A(B|C+)+D/.test("ACCCCCCCCCCCCCCCCCCCCCCCCCCCCCX")
        }

        render() {
            return <>
                {this.regexTimingout()}
                Done
            </>
        }
    }
    //2.

    //3. Script recursion
    export class ScriptRecursion extends Part {
        recursive(count:number) {
            return this.recursive(count+1)
        }

        render() {
            return <>
                {this.recursive(1)}
                Done
            </>
        }
    }
    //3.

    //4. Maximum number of statements
    export class MaxStatements extends Part {
        endlessloop() {
            while(true);
        }

        render() {
            return <>
                {this.endlessloop()}
                Done
            </>
        }
    }
    //4.

    //5. Script Timeout
    export class ScriptTimeout extends Part {
        slowloop() {
            for (var i = 0; i<10000; i++) {
                /A(B|C+)+D/.test("ACCCCCCCCCCCCCCCCCCCCCCX")
            }
        }

        render() {
            return <>
                {this.slowloop()}
                Done
            </>
        }
    }
    //5.

    //6. Render Rate
    export class RenderRate extends Part {
        count = 0

        onafterrender(firstRender: boolean): void {
            if (this.count++ < 1000) this.Refresh();
        }

        render() {
            return <>
                Rendering: {this.count}
            </>
        }
    }
    //6.

    //7. Max Exceptions
    export class ThrowPart extends Part {
        render() {
            throw new Error("Not Implemented")
        }
    }

    export class MaxExceptions extends Part {
        throwError() {
            throw 'some error'
        }

        throwLoop() {
            var slots = [...Array(500).keys()]
            return slots.map(s => <ThrowPart/>)
        }
        
        render() {
            return <>
                {this.throwLoop()}
            </>
        }
    }
    //7.
}
