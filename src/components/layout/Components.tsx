import {nanoid} from 'nanoid'
import {Fragment, useContext} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Spacer from 'react-spacer'
import {LayoutContext} from '../../context/layoutContext'
import {StoreContext} from '../../context/storeContext'
import {
	ComponentType,
	RoomType,
	componentData as dummyComponentData,
} from '../../data'
import {colors} from '../../theme'
import Box from '../Box'
import Divider from '../Divider'
import AppInput from '../input/Input'
import {AddComponent} from '../Room'

const AppComponents = () => {
	const {store, setStore} = useContext(StoreContext)
	const {
		visibility,
		setVisibility,
		unit,
		componentData,
		setComponentData,
		setVendor,
		setMaterial,
	} = useContext(LayoutContext)

	console.log('componentData: ', componentData)
	function handleComponentData(component: ComponentType, index: number) {
		let newComponent = [...componentData]
		newComponent[componentData.length - 1].componentIndex = index
		setComponentData([...newComponent])
		return
	}
	function handleAddVendorsOrMaterials(
		component: ComponentType,
		index: number,
	) {
		setVisibility({
			...visibility,
			isMaterialVisible: !visibility.isMaterialVisible,
			isVendorVisible: !visibility.isVendorVisible,
		})
		handleComponentData(component, index)
		setVendor([
			...component.vendors,
			{...componentData[componentData.length - 1]},
		])
		setMaterial([
			...component.material,
			{...componentData[componentData.length - 1]},
		])
	}
	const handleAddComponent = () => {
		const cloneStore = [...store]

		const {roomIndex, unitIndex} = componentData[componentData.length - 1]
		let newComponent = {...dummyComponentData}
		newComponent.id = nanoid()
		newComponent.vendors.forEach(vendor => {
			vendor.id = nanoid()
		})
		newComponent.material.forEach(m => {
			m.id = nanoid()
		})
		newComponent.milestones.forEach(milestone => {
			milestone.id = nanoid()
		})
		cloneStore[roomIndex].units[unitIndex].components.push(newComponent)
		//
		const newComponentData = [...componentData]
		const temp = componentData[componentData.length - 1]
		newComponentData.length = componentData.length - 1
		newComponentData.push(newComponent)
		newComponentData.push(temp)
		//
		setComponentData([...newComponentData])
		setStore([...cloneStore])
	}
	if (!visibility.isComponentVisible || !componentData) return <></>
	return (
		<Box title={`${unit.name}-Add Components`}>
			<Divider text='Component' />
			{componentData?.map((component: ComponentType, index: number) => {
				if (index >= componentData?.length - 1)
					return <Fragment key={component.id}></Fragment>
				return (
					<Fragment key={component.id}>
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
								const {roomIndex, unitIndex} =
									componentData[componentData.length - 1]
								store[roomIndex].units[unitIndex].components[
									index
								].description = e.target.value
							}}
						/>
						<Spacer height='20px' />
						<div style={{display: 'flex', gap: '10px'}}>
							<AppInput
								defaultValue={component.quantity}
								value={component.quantity}
								onChange={e => {
									console.log('component: ', component)
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex} =
											componentData[componentData.length - 1]
										const cloneStore = [...p]
										cloneStore[roomIndex].units[unitIndex].components[
											index
										].quantity = +e.target.value
										cloneStore[roomIndex].units[unitIndex].components[
											index
										].total =
											+e.target.value *
											cloneStore[roomIndex].units[unitIndex].components[index]
												.raise
										return cloneStore
									})
									handleComponentData(component, index)
								}}
								name='quantity'
								label='Qty'
								onBlur={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex} =
											componentData[componentData.length - 1]
										const cloneStore = [...p]
										cloneStore[roomIndex].units[unitIndex].components[
											index
										].quantity = +e.target.value
										cloneStore[roomIndex].units[unitIndex].components[
											index
										].total =
											+e.target.value *
											cloneStore[roomIndex].units[unitIndex].components[index]
												.raise
										return cloneStore
									})
									handleComponentData(component, index)
								}}
							/>
							<AppInput
								defaultValue={component.raise}
								value={component.raise}
								onChange={e => {
									console.log('component: ', component)
									console.log('index: ', index)
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex} =
											componentData[componentData.length - 1]
										const cloneStore = [...p]
										cloneStore[roomIndex].units[unitIndex].components[
											index
										].raise = +e.target.value
										cloneStore[roomIndex].units[unitIndex].components[
											index
										].total =
											+e.target.value *
											cloneStore[roomIndex].units[unitIndex].components[index]
												.quantity
										return cloneStore
									})
									handleComponentData(component, index)
								}}
								onBlur={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex} =
											componentData[componentData.length - 1]
										const cloneStore = [...p]
										cloneStore[roomIndex].units[unitIndex].components[
											index
										].raise = +e.target.value
										cloneStore[roomIndex].units[unitIndex].components[
											index
										].total =
											+e.target.value *
											cloneStore[roomIndex].units[unitIndex].components[index]
												.quantity
										return cloneStore
									})
									handleComponentData(component, index)
								}}
								name='rates'
								label='Rates'
							/>
							<AppInput
								onChange={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex} =
											componentData[componentData.length - 1]
										const cloneStore = [...p]
										store[roomIndex].units[unitIndex].components[index].units =
											e.target.value
										return cloneStore
									})
								}}
								name='units'
								label='Units'
								value={component.units}
								defaultValue={component.units}
								onBlur={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex} =
											componentData[componentData.length - 1]
										const cloneStore = [...p]
										store[roomIndex].units[unitIndex].components[index].units =
											e.target.value
										return cloneStore
									})
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
							<h1>
								₹
								{
									store[componentData[componentData.length - 1].roomIndex]
										.units[componentData[componentData.length - 1].unitIndex]
										.components[index].total
								}
							</h1>
							<AddComponent
								onClick={() => handleAddVendorsOrMaterials(component, index)}
							>
								Add Vendors/Material
							</AddComponent>
						</div>
					</Fragment>
				)
			})}
			<AiOutlinePlus
				style={{cursor: 'pointer'}}
				onClick={handleAddComponent}
				size={20}
			/>
			<Spacer height={10} />
		</Box>
	)
}

export default AppComponents
