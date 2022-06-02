import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { StateProvider } from '../redux/StateProvider'
import reducer, { initialState } from '../redux/reducer'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </StateProvider>
    </>
  )
}

export default MyApp
