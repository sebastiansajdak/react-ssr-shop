export default interface IRoute {
    path: string;
    component: React.ComponentType<any>;
    exact: boolean;
    serverFetch?: any;
}