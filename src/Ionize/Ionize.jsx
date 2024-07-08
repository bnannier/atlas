import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';

import * as serviceWorkerRegistration from './utilities/serviceWorkerRegistration';
import reportWebVitals from './utilities/reportWebVitals';
import configureStore from './configureStore';
import RouteState from './RouteState';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/override.scss';
import '../theme/variables.css';
import Menu from '../components/Menu/Menu';

setupIonicReact();

const Ionize = ({ routes, reducers }) => {
  const store = configureStore(reducers);

  return (
    <React.StrictMode>
      <IonApp>
        <Provider store={store}>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <RouteState>
                  {routes.map((route) => {
                    return (
                      <Route
                        path={route.path}
                        exact={route.exact}
                        key={route.key}
                      >
                        {route.component}
                      </Route>
                    );
                  })}
                </RouteState>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </Provider>
      </IonApp>
    </React.StrictMode>
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

Ionize.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.any,
  reducers: PropTypes.any,
};

Ionize.defaultProps = {
  children: undefined,
  routes: undefined,
  reducers: {},
};

export default Ionize;
