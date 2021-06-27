import {useContext} from 'react'
import {LayoutContext} from '../../context/layoutContext'
import {StoreContext} from '../../context/storeContext'
import {colors} from '../../theme'
import Box from '../Box'
import Divider from '../Divider'
import AppInput from '../input/Input'

const AppComponents = () => {
	const {store} = useContext(StoreContext)
	const {visibility, unit} = useContext(LayoutContext)
	if (!visibility.isComponentVisible) return <></>
	return (
		<Box title={`${unit.name}-Add Components`}>
			<Divider text='Component' />
			<textarea
				rows={7}
				style={{
					width: '100%',
					resize: 'none',
					backgroundColor: `${colors.bgGrey}`,
				}}
			></textarea>
			<div style={{display: 'flex'}}>
				<AppInput
					onChange={() => {}}
					name='quantity'
					defaultValue={store[0].units[0].components[0].quantity}
				/>
				<AppInput
					onChange={() => {}}
					name='quantity'
					defaultValue={store[0].units[0].components[0].quantity}
				/>
				<AppInput
					onChange={() => {}}
					name='quantity'
					defaultValue={store[0].units[0].components[0].quantity}
				/>
			</div>
		</Box>
	)
}

export default AppComponents
