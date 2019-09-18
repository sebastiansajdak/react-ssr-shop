export default interface IRoute {
    path: string;
    component: React.ComponentType<any> & { serverFetch: any[] };
    exact: boolean;
}