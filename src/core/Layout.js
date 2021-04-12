import React from 'react'


const Layout = ({ title = 'Title', description = 'Description', className, children }) => (

    <>
        <div className='jumbotron'>
            <div className='container'>
                <h2>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
        </div>
        <div className={className}>{children}</div>
    </>

)

export default Layout;