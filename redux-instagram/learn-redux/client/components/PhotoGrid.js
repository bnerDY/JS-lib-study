/**
 * Created by dy on 9/20/16.
 */
import React from 'react';


const PhotoGrid = React.createClass({
    render(){
        return (
            <div className = "photo-grid">
                photo grid
                <pre>
                    {JSON.stringify(this.props.posts, null, 4)}
                </pre>
            </div>
        )
    }
});

export default PhotoGrid;