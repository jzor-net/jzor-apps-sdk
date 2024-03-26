namespace jzor.app {
    import navigation = CLR.Jzor.Navigation
    import NavigationMessage = CLR.Jzor.NavigationMessage

    export type Route = { 
        path: string
        title: string
        routes?: Route[]
        page?: (parms:any) => any
    }

    export class Router extends Part<{
        routes:Route[]
        notFound?: Fragment
    }> {
        processedRoutes = this.processRoutes(this.props.routes)

        get currentRoute() {
            var match = this.findRouteMatch(navigation.Location)
            return this.processedRoutes.find(r => r.path == match?.Route)
        }

        // Builds a flat list of the routes with their full path
        processRoutes(routes: Route[], parentPath: string = ''): Route[] {
            return routes.reduce((acc: Route[], route: Route) => {
                const fullPath = parentPath + route.path;
        
                if (route.routes) {
                    // Process and flatten child routes for group routes
                    const childRoutes = this.processRoutes(route.routes, fullPath);
                    acc.push(...childRoutes);
                } else {
                    // Add non-group routes as is, with updated path
                    acc.push({ ...route, path: fullPath, routes: [] });
                }
        
                return acc;
            }, []);
        }

        findRouteMatch(location: string): CLR.Jzor.IRouteMatch {
            var urls = this.processedRoutes.map(mi => mi.path)
            var match = navigation.ParseRoutes(urls, location)
            return match
        }

        async onafterrender() {
            var b = getPartById<Browser>("Browser")
            await b.client_setDocumentTitle(this.currentRoute?.title ?? '')
        }

        async [onMsg(NavigationMessage)](msg:NavigationMessage) {
            logger.info('Navigating to', this.currentRoute?.title, msg.Location)
            this.Refresh()
        }

        render() {
            var match = this.findRouteMatch(navigation.Location)
            var route = this.currentRoute
            return route?.page?.(match.Params) ?? this.props.notFound ?? <h1>404 - not found</h1>;
        }
    }
}