namespace mycompany.myapp {
    export var routes:Route[] = [
        {path: '/', title: 'Hello World', page: _ => <pages.HelloWorld/>},
        {path: '/counter', title: 'Counter', page: _ => <pages.Counter/>},
        {path: '/joke', title: 'Random Joke', page: _ => <pages.Joke/>},
    ]
}