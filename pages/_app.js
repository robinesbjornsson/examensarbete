import "../styles/globals.css"
//import NavBar from "../components/NavBar"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { StateProvider } from "../components/StateProvider";
import  reducer, { initialState } from '../Components/reducer';
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <StateProvider initialState={initialState} reducer={reducer}> 
      <Component {...pageProps} />
      </StateProvider>
    </>
  )
}

export default MyApp