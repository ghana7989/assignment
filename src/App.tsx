import {Col, Container, Row} from 'react-grid-system'
import AppComponents from './components/layout/Components'
import Milestones from './components/layout/Milestones'
import Units from './components/layout/Units'
import VendorsAndMaterial from './components/layout/VendorsAndMaterial'
import {LayoutProvider} from './context/layoutContext'
import {StoreContextProvider} from './context/storeContext'

function App() {
	return (
		<StoreContextProvider>
			<LayoutProvider>
				<Container fluid style={{padding: '50px 30px'}}>
					<Row>
						<Col sm={12} md={6} lg={3}>
							<Units />
						</Col>
						<Col sm={12} md={6} lg={3}>
							<AppComponents />
						</Col>
						<Col sm={12} md={6} lg={3}>
							<VendorsAndMaterial />
						</Col>
						<Col sm={12} md={6} lg={3}>
							<Milestones />
						</Col>
					</Row>
				</Container>
			</LayoutProvider>
		</StoreContextProvider>
	)
}

export default App
