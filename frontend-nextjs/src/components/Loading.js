import React from 'react'
import ReactLoading from 'react-loading'

const Loading = ({ size, color = 'white' }) => {
    const styles =
        size === 'full'
            ? {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '80vh',
              }
            : {
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
              }
    return (
        <div style={styles} className="c-loading">
            <ReactLoading type={'spin'} color={color}
            // height={15}
            // width={15}
            />
        </div>
    )
}

export default Loading
