import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout = ({ children }: any) => {
  return (
    <div className="dash-wrap">
      <Sidebar />
      <div className="dash-main">
        <Topbar />
        <main className="dash-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
