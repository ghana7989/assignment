import {nanoid} from 'nanoid'
import {Fragment, useContext, useState} from 'react'
import {Col, Row} from 'react-grid-system'
import {AiOutlinePlus} from 'react-icons/ai'
import Spacer from 'react-spacer'

import {LayoutContext} from '../../context/layoutContext'
import {StoreContext} from '../../context/storeContext'
import {MaterialType, RoomType, vendorData, VendorType} from '../../data'
import {colors} from '../../theme'
import Box from '../Box'
import Divider from '../Divider'
import AppInput from '../input/Input'
import {AddComponent} from '../Room'

const VendorsAndMaterial = () => {
	const {store, setStore} = useContext(StoreContext)

	const {
		visibility,
		setVisibility,
		componentData,
		setComponentData,
		setVendor,
		setMaterial,
		vendor: vendors,
		material: materials,
	} = useContext(LayoutContext)
	const [isVendor, setIsVendor] = useState(true)

	function handleComponentData(index: number) {
		let newComponent = [...componentData]
		newComponent[componentData.length - 1].vendorsIndex = index
		setComponentData([...newComponent])
	}

	function handleAddMileStones(vendor: VendorType, index: number) {
		setVisibility({
			...visibility,
			isMilestoneVisible: true,
		})
		setVendor(() => {
			let newVendors = [...vendors]
			newVendors[1].vendorsIndex = index
			return newVendors
		})
		handleComponentData(index)
		setMaterial([...componentData[0].material])
	}
	function handleAddVendor() {
		const cloneStore = [...store]

		const {roomIndex, unitIndex, componentIndex} =
			componentData[componentData.length - 1]

		let newVendor = {...vendorData}
		newVendor.id = nanoid()

		cloneStore[roomIndex].units[unitIndex].components[
			componentIndex
		].vendors.push(newVendor)
		setComponentData([...componentData])
		setVendor([
			...componentData[componentData[componentData.length - 1].componentIndex]
				?.vendors,
		])
		setStore([...cloneStore])
	}
	if (
		!visibility.isComponentVisible ||
		!visibility.isVendorVisible ||
		!visibility.isMaterialVisible
	) {
		return <Fragment key='Empty'></Fragment>
	}
	if (isVendor)
		return (
			<Box
				title={`Component - ${
					componentData[componentData.length - 1]?.componentIndex + 1
				}`}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<h1
						style={{
							cursor: 'pointer',
							fontWeight: 400,
							fontSize: '3rem',
							opacity: isVendor ? 1 : 0.5,
						}}
						onClick={() => setIsVendor(true)}
					>
						Work
					</h1>
					<h1
						style={{
							opacity: !isVendor ? 1 : 0.5,
							cursor: 'pointer',
							fontWeight: 400,
							fontSize: '3rem',
						}}
						onClick={() => setIsVendor(false)}
					>
						Material
					</h1>
				</div>
				<Divider
					text={`Vendor ${
						componentData[componentData.length - 1].componentIndex + 1
					}`}
				/>
				{console.log('vendors: ', vendors)}
				{vendors?.map((vendor: VendorType, index: number) => {
					if (!vendor.id) return <Fragment key={'Never mind'}></Fragment>
					return (
						<Fragment key={vendor.id}>
							<Row
								style={{alignItems: 'center', justifyContent: 'space-around'}}
							>
								<Col>
									<h1 style={{fontWeight: 'bolder', fontSize: '1.5rem'}}>
										Work Type
									</h1>
								</Col>
								<Col>
									<select
										name='workType'
										id='workType'
										style={{
											width: '100%',
										}}
										value={vendor.workType}
										onChange={e => {
											setStore((p: RoomType[]) => {
												const {roomIndex, unitIndex, componentIndex} =
													componentData[componentData.length - 1]
												const cloneStore = [...p]
												cloneStore[roomIndex].units[unitIndex].components[
													componentIndex
												].vendors[index].workType = e.target.value
												return cloneStore
											})
										}}
									>
										<option value='Only Work'>Only Work</option>
									</select>
								</Col>
							</Row>
							<Row
								style={{alignItems: 'center', justifyContent: 'space-around'}}
							>
								<Col>
									<h1 style={{fontWeight: 'bolder', fontSize: '1.5rem'}}>
										Vendor Category
									</h1>
								</Col>
								<Col>
									<select
										name='vendorCategory'
										id='vendorCategory'
										style={{
											width: '100%',
										}}
										value={vendor.vendorCategory}
										onChange={e => {
											setStore((p: RoomType[]) => {
												const {roomIndex, unitIndex, componentIndex} =
													componentData[componentData.length - 1]
												const cloneStore = [...p]
												cloneStore[roomIndex].units[unitIndex].components[
													componentIndex
												].vendors[index].vendorCategory = e.target.value
												return cloneStore
											})
										}}
									>
										<option value='Carpenter'>Carpenter</option>
									</select>
								</Col>
							</Row>
							<AppInput
								defaultValue={vendor?.heading}
								onChange={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex, componentIndex} =
											componentData[componentData.length - 1]
										const cloneStore = [...p]
										cloneStore[roomIndex].units[unitIndex].components[
											componentIndex
										].vendors[index].heading = e.target.value
										return cloneStore
									})
								}}
								name='heading'
								label='Heading'
							/>
							<Spacer height='20px' />
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
								defaultValue={vendor.description}
								onBlur={() => {}}
								onChange={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex, componentIndex} =
											componentData[componentData.length - 1]
										const cloneStore = [...p]
										cloneStore[roomIndex].units[unitIndex].components[
											componentIndex
										].vendors[index].description = e.target.value
										return cloneStore
									})
								}}
							/>
							<Spacer height='20px' />
							<div style={{display: 'flex', gap: '10px'}}>
								<AppInput
									defaultValue={vendor.quantity}
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[componentData.length - 1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].vendors[index].quantity = +e.target.value
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].vendors[index].total =
												+e.target.value *
												cloneStore[roomIndex].units[unitIndex].components[
													componentIndex
												].vendors[index].raise
											return cloneStore
										})
									}}
									name='quantity'
									label='Qty'
									onBlur={() => {}}
								/>
								<AppInput
									defaultValue={vendor.raise}
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[componentData.length - 1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].vendors[index].raise = +e.target.value
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].vendors[index].total =
												+e.target.value *
												cloneStore[roomIndex].units[unitIndex].components[
													componentIndex
												].vendors[index].quantity
											return cloneStore
										})
									}}
									onBlur={() => {}}
									name='rates'
									label='Rates'
								/>
								<AppInput
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[componentData.length - 1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].vendors[index].units = e.target.value
											return cloneStore
										})
									}}
									name='units'
									label='Units'
									defaultValue={vendor.units}
									onBlur={() => {}}
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
											.components[
											componentData[componentData.length - 1].componentIndex
										].vendors[index].total
									}
								</h1>
								<AddComponent
									onClick={() => handleAddMileStones(vendor, index)}
								>
									Add Milestones
								</AddComponent>
							</div>
						</Fragment>
					)
				})}
				<AiOutlinePlus
					style={{cursor: 'pointer'}}
					onClick={handleAddVendor}
					size={20}
				/>
				<Spacer height={10} />
			</Box>
		)
	else {
		return (
			<Box
				title={`Component - ${
					componentData[componentData.length - 1].componentIndex + 1
				}`}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<h1
						style={{
							cursor: 'pointer',
							fontWeight: 400,
							opacity: isVendor ? 1 : 0.5,
							fontSize: '3rem',
						}}
						onClick={() => setIsVendor(true)}
					>
						Work
					</h1>
					<h1
						style={{
							opacity: !isVendor ? 1 : 0.5,
							cursor: 'pointer',
							fontWeight: 400,
							fontSize: '3rem',
						}}
						onClick={() => setIsVendor(false)}
					>
						Material
					</h1>
				</div>
				<Divider text='Vendor' />
				{materials?.map((material: MaterialType, index: number) => {
					if (index >= materials?.length - 1)
						return <Fragment key={material.id}></Fragment>
					return (
						<Fragment key={material.id}>
							<div style={{display: 'flex', gap: '10px'}}>
								<select
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[componentData.length - 1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].material[index].name = e.target.value
											return cloneStore
										})
									}}
									name='name'
									style={{
										width: '100%',
										backgroundColor: colors.bgGrey,
										border: 'none',
										outline: 'none',
										borderRadius: '10px',
									}}
									value={material.name}
									defaultValue={material.name}
								>
									<option value='Only Work'>Only Work</option>
								</select>
								<AppInput
									name='item'
									label='item'
									value={material.item}
									defaultValue={material.item}
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[componentData.length - 1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].material[index].item = e.target.value
											return cloneStore
										})
									}}
									onBlur={() => {}}
								/>
								<AppInput
									name='specification'
									label='Spec'
									defaultValue={material.specification}
									value={material.specification}
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[componentData.length - 1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].material[index].specification = e.target.value
											return cloneStore
										})
									}}
								/>
							</div>
							<Spacer height='20px' />
						</Fragment>
					)
				})}
				<AiOutlinePlus size={20} />
				<Spacer height={10} />
			</Box>
		)
	}
}

export default VendorsAndMaterial
