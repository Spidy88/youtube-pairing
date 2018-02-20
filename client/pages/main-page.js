import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import SearchBar from '../components/search-bar'
import VideoResults from '../components/video-results'

@inject('googleStore')
@observer
class MainPage extends React.Component {
    handleSearch(query) {
        const { googleStore } = this.props;

        googleStore.searchYoutube(query);
    }

    render() {
        const { googleStore, userStore } = this.props;
        const { ready, status, results } = googleStore;

        let renderStatus = null;
        if( status  ) {
            renderStatus = <p>{ status }</p>
        }

        return (
            <PageWrapper className="container">
                <StatusWrapper>
                    { renderStatus}
                </StatusWrapper>

                <SearchBar disabled={!ready} onSearch={this.handleSearch.bind(this)} />

                <VideoResults videos={results} />
            </PageWrapper>
        )
    }
}

const PageWrapper = styled.section`
    margin-top: 2em;
`

const StatusWrapper = styled.div`
    text-align: center;
`

const SearchWrapper = styled.div`
    margin: 1em 0;
`

export default MainPage