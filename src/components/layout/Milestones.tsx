import {nanoid} from 'nanoid'
import {Fragment, useContext, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Spacer from 'react-spacer'

import {LayoutContext} from '../../context/layoutContext'
import {StoreContext} from '../../context/storeContext'
import {milestoneData, MilestoneType, RoomType} from '../../data'
import Box from '../Box'
import AppInput from '../input/Input'

const Milestones = () => {
	const {store, setStore} = useContext(StoreContext)

	let [milestones, setMilestones] = useState([])
	const {visibility, componentData, setComponentData} =
		useContext(LayoutContext)
	if (!componentData) return <></>
	milestones = componentData[0]?.milestones
	function deleteMilestone(id: number | string, index: number) {
		setMilestones(milestones.splice(index, 1))
		const {roomIndex, unitIndex, componentIndex} = componentData[1]
		store[roomIndex].units[unitIndex].components[
			componentIndex
		].milestones.splice(index, 1)
	}
	function handleAddMileStone() {
		const cloneStore = [...store]

		const {roomIndex, unitIndex, componentIndex} =
			componentData[componentData.length - 1]

		let newMilestone = {...milestoneData}
		newMilestone.id = nanoid()

		cloneStore[roomIndex].units[unitIndex].components[
			componentIndex
		].milestones.push(newMilestone)
		setComponentData([...componentData])

		setStore([...cloneStore])
	}
	if (
		!visibility.isComponentVisible ||
		!visibility.isMilestoneVisible ||
		!visibility.isVendorVisible ||
		!visibility.isMaterialVisible
	)
		return <></>
	return (
		<Box title={`Vendor ${componentData[1].vendorsIndex + 1}-Milestones`}>
			{milestones.map((milestone: MilestoneType, index: number) => {
				return (
					<Fragment key={milestone.id}>
						<div style={{display: 'flex', gap: '10px'}}>
							<AppInput
								defaultValue={milestone.name}
								name='name'
								label='Name'
								onChange={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex, componentIndex} =
											componentData[1]
										const cloneStore = [...p]
										cloneStore[roomIndex].units[unitIndex].components[
											componentIndex
										].milestones[index].name = e.target.value
										return cloneStore
									})
								}}
								onBlur={e => {}}
							/>
							<AppInput
								defaultValue={milestone.percentage}
								onChange={e => {
									setStore((p: RoomType[]) => {
										const {roomIndex, unitIndex, componentIndex} =
											componentData[1]
										const cloneStore = [...p]
										cloneStore[roomIndex].units[unitIndex].components[
											componentIndex
										].milestones[index].percentage = e.target.value
										return cloneStore
									})
								}}
								name='percentage'
								label='Percentage'
							/>
							<h1
								style={{
									alignSelf: 'center',
									fontSize: '2rem',
									cursor: 'pointer',
								}}
								onClick={() => deleteMilestone(milestone.id, index)}
							>
								X
							</h1>
						</div>
						<Spacer height='10px' />
						<AiOutlinePlus
							style={{cursor: 'pointer'}}
							size={20}
							onClick={handleAddMileStone}
						/>
					</Fragment>
				)
			})}
		</Box>
	)
}

export default Milestones
