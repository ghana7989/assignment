import {Fragment, useContext, useRef, useState} from 'react'
import {Col, Container, Row} from 'react-grid-system'
import {AiOutlinePlus} from 'react-icons/ai'
import Spacer from 'react-spacer'

import {LayoutContext} from '../../context/layoutContext'
import {StoreContext} from '../../context/storeContext'
import {ComponentType, MaterialType, RoomType, VendorType} from '../../data'
import {colors} from '../../theme'
import Box from '../Box'
import Divider from '../Divider'
import AppInput from '../input/Input'
import {AddComponent} from '../Room'

const VendorsAndMaterial = () => {
	const {store, setStore} = useContext(StoreContext)
	let quantityRef = useRef<number>(1)
	let [total, setTotal] = useState(0)

	let ratesRef = useRef<number>(1)
	const {
		visibility,
		setVisibility,
		unit,
		componentData,
		setComponentData,
		setVendor,
		setMaterial,
		vendor: vendors,
		material: materials,
	} = useContext(LayoutContext)
	const [isVendor, setIsVendor] = useState(true)
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
		setComponentData(() => {
			let newComponent = [...componentData]
			newComponent[1].vendorsIndex = index
			return newComponent
		})
		setMaterial([...componentData[0].material])
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
			<Box title={`Component - ${componentData[1]?.componentIndex + 1}`}>
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
				<Divider text='Component' />
				{vendors?.map((vendor: VendorType, index: number) => {
					if (index >= vendors?.length - 1)
						return <Fragment key={vendor.id}></Fragment>
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
											componentData[1]
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
								onBlur={e => {}}
								onChange={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex, componentIndex} =
											componentData[1]
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
										quantityRef.current = +e.target.value
										setTotal(ratesRef.current * quantityRef.current)
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].vendors[index].quantity = e.target.value
											return cloneStore
										})
									}}
									name='quantity'
									label='Quantity'
									onBlur={e => {}}
								/>
								<AppInput
									defaultValue={vendor.raise}
									onChange={e => {
										ratesRef.current = +e.target.value
										setTotal(ratesRef.current * quantityRef.current)
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].vendors[index].raise = e.target.value
											return cloneStore
										})
									}}
									onBlur={e => {}}
									name='rates'
									label='Rates'
								/>
								<AppInput
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[1]
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
									onBlur={e => {}}
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
									onClick={() => handleAddMileStones(vendor, index)}
								>
									Add Milestones
								</AddComponent>
							</div>
						</Fragment>
					)
				})}
				<AiOutlinePlus size={20} />
				<Spacer height={10} />
			</Box>
		)
	else {
		return (
			<Box title={`Component - ${componentData[1].componentIndex + 1}`}>
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
				<Divider text='Component' />
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
												componentData[1]
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
									value={material.item}
									defaultValue={material.item}
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[1]
											const cloneStore = [...p]
											cloneStore[roomIndex].units[unitIndex].components[
												componentIndex
											].material[index].item = e.target.value
											return cloneStore
										})
									}}
									onBlur={e => {}}
								/>
								<AppInput
									name='specification'
									label='Spec'
									defaultValue={material.specification}
									value={material.specification}
									onChange={e => {
										setStore((p: RoomType[]) => {
											const {roomIndex, unitIndex, componentIndex} =
												componentData[1]
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
