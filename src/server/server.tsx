import * as express from 'express';
import * as firebase from 'firebase/app';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import App from '../components/App';
import compression from 'compression';
import cookiesMiddleware from 'universal-cookie-express';
import firebaseConfig from '../firebaseConfig';
import getDataToFetch from '../helpers/getDataToFetch';
import Html from './Html';
import initialState from './initialState';
import promise from 'redux-promise-middleware';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import 'firebase/firestore';

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
