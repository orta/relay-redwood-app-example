import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodRelayProvider } from './relay/RedwoodRelayProvider'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodRelayProvider>
        <Routes />
      </RedwoodRelayProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
