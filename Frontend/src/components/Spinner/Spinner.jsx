import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const Spinner = () => {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Spinner