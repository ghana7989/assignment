import {Fragment, useContext, useRef, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Spacer from 'react-spacer'

import {LayoutContext} from '../../context/layoutContext'
import {StoreContext} from '../../context/storeContext'
import {ComponentType, MilestoneType, RoomType} from '../../data'
import {colors} from '../../theme'
import Box from '../Box'
import Divider from '../Divider'
import AppInput from '../input/Input'
import {AddComponent} from '../Room'

const Milestones = () => {
	const {store} = useContext(StoreContext)

	let [milestones, setMilestones] = useState([])
	const {visibility, componentData} = useContext(LayoutContext)
	if (!componentData) return <></>
	milestones = componentData[0].milestones
	function deleteMilestone(id: number, index: number) {
		setMilestones(milestones.splice(index, 1))
		const {roomIndex, unitIndex, componentIndex} = componentData[1]
		store[roomIndex].units[unitIndex].components[
			componentIndex
		].milestones.splice(index, 1)
	}

	if (
		!visibility.isComponentVisible ||
		!visibility.isMilestoneVisible ||
		!visibility.isVendorVisible ||
		!visibility.isMaterialVisible
	)
		return <></>
	return (
		<Box title={`Vendor ${componentData[1].vendorsIndex + 1 }-Milestones`}>
			{milestones.map((milestone: MilestoneType, index: number) => {
				return (
					<div style={{display: 'flex', gap: '10px'}}>
						<AppInput
							defaultValue={milestone.name}
							onChange={() => {}}
							name='name'
							label='Name'
							onBlur={e => {
								const {roomIndex, unitIndex, componentIndex} = componentData[1]
								store[roomIndex].units[unitIndex].components[
									componentIndex
								].milestones[index].name = e.target.value
							}}
						/>
						<AppInput
							defaultValue={milestone.percentage}
							onChange={() => {}}
							onBlur={e => {
								const {roomIndex, unitIndex, componentIndex} = componentData[1]
								store[roomIndex].units[unitIndex].components[
									componentIndex
								].milestones[index].percentage = e.target.value
							}}
							name='percentage'
							label='Percentage'
						/>
						<h1
							style={{alignSelf: 'center', fontSize: '2rem', cursor: 'pointer'}}
							onClick={() => deleteMilestone(milestone.id, index)}
						>
							X
						</h1>
					</div>
				)
			})}
		</Box>
	)
}

export default Milestones
