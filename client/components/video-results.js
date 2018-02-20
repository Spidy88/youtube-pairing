import React from 'react'
import styled from 'styled-components'

class VideoResults extends React.Component {
    renderVideo(videoId) {
        return (
            <VideoWrapper key={videoId} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                        className="embed-responsive-item"
                        width="100%"
                        height="100%"
                        src={ `https://youtube.com/embed/${videoId}` } />
                </div>
            </VideoWrapper>
        )
    }

    render() {
        const { videos } = this.props;
        const videoIFrames = videos
            .map(video => video.id.videoId)
            .map(videoId => this.renderVideo(videoId))

        return (
            <div className="row">
                { videoIFrames }
            </div>
        )
    }
}

const VideoWrapper = styled.div`
    margin: 1em 0;
`

export default VideoResults