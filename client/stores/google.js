import { action, observable } from 'mobx'
import { OAUTH2_CLIENT_ID, OAUTH2_SCOPES } from '../config'

const GoogleApiClient = require('google-client-api');

class GoogleStore {
    gapi = {}
    googleAuth = {}
    googleUser = {}

    @observable
    ready = false

    @observable
    status = 'Application loaded. Ready to initialize'

    @observable
    results = []

    @action
    searchYoutube(query) {
        this.status = `Search for ${query}`;
        const request = this.gapi.client.youtube.search.list({
            q: query,
            part: 'snippet'
        });

        request.execute(this.handleSearchResults);
    }

    @action.bound
    handleSearchResults(response) {
        console.log('Response: ', response);
        this.status = `Found ${response.result.items.length} results`;
        this.results = response.result.items;
    }

    @action
    initializeStore() {
        GoogleApiClient().then(this.initializeAuth);
    }

    @action.bound
    initializeAuth(gapi) {
        this.status = 'initialize auth';
        this.gapi = gapi;
        this.gapi.auth2.init({client_id: OAUTH2_CLIENT_ID}).then(this.signIn);
    }

    @action.bound
    signIn(googleAuth) {
        this.status = 'signing in';
        this.googleAuth = googleAuth;

        if( !this.googleAuth.isSignedIn.get() ) {
            this.googleAuth.signIn({scope: OAUTH2_SCOPES}).then(this.loadApis);
        }
        else {
            this.loadApis(this.googleAuth.currentUser.get());
        }
    }

    @action.bound
    loadApis(googleUser) {
        this.googleUser = googleUser;
        this.status = 'loading apis';
        this.gapi.client.load('youtube', 'v3').then(this.completeInitialization);
    }

    @action.bound
    completeInitialization() {
        this.status = '';
        this.ready = true;
    }
}

export default GoogleStore