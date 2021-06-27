import {Fragment, useContext, useRef, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Spacer from 'react-spacer'
import {LayoutContext} from '../../context/layoutContext'
import {StoreContext} from '../../context/storeContext'
import {ComponentType, RoomType} from '../../data'
import {colors} from '../../theme'
import Box from '../Box'
import Divider from '../Divider'
import AppInput from '../input/Input'
import {AddComponent} from '../Room'

const AppComponents = () => {
	const {store} = useContext(StoreContext)
	const {
		visibility,
		setVisibility,
		unit,
		componentData,
		setComponentData,
		setVendor,
		setMaterial,
	} = useContext(LayoutContext)
	let [total, setTotal] = useState(0)
	let quantityRef = useRef<number>()
	let ratesRef = useRef<number>()

	console.log('componentData: ', componentData)
	function handleAddVendorsOrMaterials(
		component: ComponentType,
		index: number,
	) {
		setVisibility({
			...visibility,
			isMaterialVisible: !visibility.isMaterialVisible,
			isVendorVisible: !visibility.isVendorVisible,
		})
		setComponentData(() => {
			let newComponent = [...componentData]
			newComponent[1].componentIndex = index
			return newComponent
		})
		setVendor([...component.vendors, {...componentData[1]}])
		setMaterial([...component.material, {...componentData[1]}])
	}

	if (!visibility.isComponentVisible || !componentData) return <></>
	return (
		<Box title={`${unit.name}-Add Components`}>
			<Divider text='Component' />
			{componentData?.map((component: ComponentType, index: number) => {
				if (index >= componentData?.length - 1)
					return <Fragment key={Math.random()}></Fragment>
				return (
					<Fragment key={Math.random()}>
						<textarea
							rows={7}
							style={{
								width: '100%',
								resize: 'none',
								backgroundColor: `${colors.bgGrey}`,
								outline: 'none',
								border: '0px solid transparent',
								borderRadius: '10px',
								padding: '20px',
							}}
							placeholder='Description'
							name='description'
							defaultValue={component.description}
							onBlur={e => {
								const {roomIndex, unitIndex} = componentData[1]
								store[roomIndex].units[unitIndex].components[
									index
								].description = e.target.value
							}}
						/>
						<Spacer height='20px' />
						<div style={{display: 'flex', gap: '10px'}}>
							<AppInput
								defaultValue={component.quantity}
								onChange={e => {
									quantityRef.current = +e.target.value
								}}
								name='quantity'
								label='Quantity'
								onBlur={e => {
									const {roomIndex, unitIndex} = componentData[1]
									store[roomIndex].units[unitIndex].components[index].quantity =
										e.target.value
								}}
							/>
							<AppInput
								defaultValue={component.raise}
								onChange={e => {
									ratesRef.current = +e.target.value
								}}
								onBlur={e => {
									if (ratesRef.current && quantityRef.current)
										setTotal(ratesRef.current * quantityRef.current)
									const {roomIndex, unitIndex} = componentData[1]
									store[roomIndex].units[unitIndex].components[index].raise =
										e.target.value
								}}
								name='rates'
								label='Rates'
							/>
							<AppInput
								onChange={() => {}}
								name='units'
								label='Units'
								defaultValue={component.units}
								onBlur={e => {
									const {roomIndex, unitIndex} = componentData[1]
									store[roomIndex].units[unitIndex].components[index].units =
										e.target.value
								}}
							/>
						</div>
						<div
							style={{
								display: 'flex',
								gap: '10px',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<h1>₹{total}</h1>
							<AddComponent
								onClick={() => handleAddVendorsOrMaterials(component, index)}
							>
								Add Vendors/Material
							</AddComponent>
						</div>
					</Fragment>
				)
			})}
			<AiOutlinePlus size={20} />
			<Spacer height={10} />
		</Box>
	)
}

export default AppComponents
