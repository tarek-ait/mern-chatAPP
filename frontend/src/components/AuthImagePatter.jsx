const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justifycenter bg-base-200 p-12">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className={`aspect-square rounded-2xl bg-primary/10 ${index % 2 === 0 ? 'animate-pulse' : ''}`}>

                        </div>
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4">
                    {title}
                </h2>
                <p className="text-base-content/60">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}

export default AuthImagePattern