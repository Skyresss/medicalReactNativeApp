import React from 'react';
import Navigate from './src/screens/Navigate';
import {store} from './src/state';
import {Provider} from 'react-redux';
;


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigate />
    </Provider>
  );
};

export default App;
