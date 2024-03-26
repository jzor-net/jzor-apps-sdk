namespace mycompany.myapp {
    import navigation = CLR.Jzor.Navigation;
    import NavigationMessage = CLR.Jzor.NavigationMessage;

    export type MenuItem = {
        title: string;
        path: string;
        subItems?: MenuItem[];
    };

    function renderMenuItem(menuItem: MenuItem) {
        return menuItem.subItems
            ? <AppMenuGroup menuItem={menuItem} />
            : <AppMenuItem menuItem={menuItem} />
    }

    class AppMenuItem extends Part<{ menuItem: MenuItem }> {
        render(menuItem: MenuItem = this.props.menuItem) {
            var selected = navigation.ParseRoute(menuItem.path ?? '', navigation.Location) != null
            return <a href={menuItem.path} stoppropagation:click class="AppMenu-link" x-selected={selected}>{menuItem.title}</a>
        }
    }

    class AppMenuGroup extends Part<{ menuItem: MenuItem }> {
        private _open: boolean = navigation.IsPartialMatch(this.props.menuItem.path!, navigation.Location) || true
        get open(): boolean { return navigation.IsPartialMatch(this.props.menuItem.path!, navigation.Location) || this._open; }
        set open(value: boolean) { this._open = value }

        render(menuItem: MenuItem = this.props.menuItem) {
            var items = menuItem.subItems?.map(mi => renderMenuItem(mi))
            return <>
                <div class="AppMenu-group" x-open={this.open} on:click={this.toggle}>{menuItem.title}</div>
                <div class="AppMenu-group-container" style>{this.open ? items : ''}</div>
            </>
        }

        toggle(): any {
            this._open = !this._open;
        }
    }

    export class AppMenu extends Part<{
        routes: Route[],
        menuItemRenderer?: (item: MenuItem) => Fragment
    }> {
        menuItems = this._createMenuItemsFromRoutes(this.props.routes, '')

        _createMenuItemsFromRoutes(routes: Route[], parentPath: string): MenuItem[] {
            return routes.map(route => {
                const menuItem: MenuItem = {
                    title: route.title,
                    path: parentPath + route.path
                };

                if (!route.page) {
                    menuItem.subItems = this._createMenuItemsFromRoutes(route.routes!, parentPath + route.path);
                }

                return menuItem;
            });
        }

        onprops(props: any): void {
            // Always set the ID to AppMenu
            props.ID ??= 'AppMenu'
        }

        render() {
            return <Box scroll="vertical" height="100%">
                {this.menuItems.map(menuItem => this.props.menuItemRenderer?.(menuItem) ?? renderMenuItem(menuItem))}
            </Box>
        }

        [onMsg(NavigationMessage)](msg: NavigationMessage) {
            this.Refresh()
        }
    }
}
