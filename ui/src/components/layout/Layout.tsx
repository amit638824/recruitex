
const Layout = ({ children }: any) => {
    return (
        <div className="row">
            <div className="col-sm-3" style={{border:"2px solid red"}}>
                <h3 className="text-center mt-5" >Sidebar</h3> </div>
            <div className="col-sm-9 " style={{border:"2px solid red"}}>
                <h3 className="text-center">Top ka design</h3>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout