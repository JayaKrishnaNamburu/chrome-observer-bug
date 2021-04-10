import IFrameBug from './pages/iframe'
import IFramePortal from './pages/frame-portal'
import * as React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    return (
        <div>
            <IFrameBug />
            <IFramePortal />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))

