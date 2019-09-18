import { Routes } from '../components/App';
import { matchPath } from 'react-router-dom';
import requiredMethodParams from './requiredMethodParams';
import * as express from 'express';
import { Dispatch } from 'redux';
import { IRoute } from '../types';

export default (serverReq: express.Request, dispatch: Dispatch): any => {
    const dataToFetch: Promise<any>[] = [];
    const requiredData: any = requiredMethodParams(serverReq);

    const componentsWithServerFetch = Routes
        .filter((route: IRoute) => matchPath(serverReq.url, route))
        .map((route: IRoute) => route.component)
        .filter((comp: IRoute['component']) => comp.serverFetch )

    componentsWithServerFetch.forEach((comp: IRoute['component']) => {
        comp.serverFetch.forEach((method: any) => {
            dataToFetch.push(dispatch(method(requiredData[method.name])))
        });
    });

    return dataToFetch;
}
