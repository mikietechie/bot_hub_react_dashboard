import { Layout } from 'antd'
import './App.scss'
import { HeaderComponent } from './components/Header'
import { MainComponent } from './components/Main'

function App() {

  return (
    <Layout className="app-layout">
        <HeaderComponent />
        <MainComponent />
    </Layout>
  )
}

export default App
