import React from 'react'
import { Provider } from 'mobx-react'
import MainPage from './pages/main-page'
import GoogleStore from './stores/google'

const googleStore = new GoogleStore();

const stores = {
    googleStore
};

googleStore.initializeStore();

class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <MainPage />
            </Provider>
        )
    }
}

export default App