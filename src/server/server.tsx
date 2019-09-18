import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import App from '../components/App';
import cookiesMiddleware from 'universal-cookie-express';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
import Html from './Html';
import promise from 'redux-promise-middleware';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import initialState from './initialState';
import getDataToFetch from '../helpers/getDataToFetch';
import compression from 'compression';

const app = express()
    .use(compression())
    .use(express.static(path.join(__dirname)))
    .use(cookiesMiddleware())

const PORT = process.env.PORT || 3000;

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

app.get('*', async (req: express.Request, res: express.Response) => {
    const scripts: string[] = ['vendor.js', 'client.js'];
    const styles: string[] = ['client.css'];
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunkMiddleware, promise)
    );
    const dataToFetch = getDataToFetch(req, store.dispatch);
 
    return Promise.all(dataToFetch).then(() => {
        const markup = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={{}}>
                <Provider store={store}>
                    <App />
                </Provider>
            </StaticRouter>
        );

        const html = ReactDOMServer.renderToStaticMarkup(
            <Html
                children={markup}
                scripts={scripts}
                styles={styles}
                initialState={store.getState()}
            />
        );

        res.send(`<!doctype html>${html}`);
    });
});

app.listen(PORT, () => console.log(`Listening on localhost: ${PORT}`));
