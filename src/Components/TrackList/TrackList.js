import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {



    render() {
        return (
            <div className="TrackList">
                <ul>
                    {
                        this.props.tracks.map(track => {
                            return <li key={track.id}><Track onAdd={this.props.onAdd} track={track} /></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}   