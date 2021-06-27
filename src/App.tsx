import styled from 'styled-components/macro'
import AppComponents from './components/layout/Components'
import Units from './components/layout/Units'
import {LayoutProvider} from './context/layoutContext'
import {StoreContextProvider} from './context/storeContext'

function App() {
	return (
		<StoreContextProvider>
			<LayoutProvider>
				<Container>
					<Units />
					<AppComponents />
				</Container>
			</LayoutProvider>
		</StoreContextProvider>
	)
}

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #eee;
	padding: 40px 50px;
	display: flex;
	gap: 3rem;
`
export default App
