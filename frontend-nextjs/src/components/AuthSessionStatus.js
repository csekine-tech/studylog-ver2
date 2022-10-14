const AuthSessionStatus = ({ status, className, ...props }) => (
    <>
        {status && (
            <div className={`${className} c-text u-text--white`} {...props}>
                {status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
