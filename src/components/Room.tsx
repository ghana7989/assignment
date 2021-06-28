import Spacer from 'react-spacer'
import {FC, Fragment, useContext} from 'react'
import styled from 'styled-components'
import {StoreContext} from '../context/storeContext'
import {RoomType, unitData, UnitType} from '../data'
import AppInput from './input/Input'
import {colors} from '../theme'
import {AiOutlinePlus} from 'react-icons/ai'
import {LayoutContext} from '../context/layoutContext'
import {nanoid} from 'nanoid'

interface RoomProps {
	number?: number
	room: RoomType
}

const Room: FC<RoomProps> = ({number = 1, room}) => {
	let {setStore, store} = useContext(StoreContext)
	const {setUnit, setVisibility, visibility, setComponentData} =
		useContext(LayoutContext)

	const handleAddComponent = (unit: UnitType, index: number) => {
		setUnit(unit)
		setVisibility({
			...visibility,
			isUnitVisible: !visibility.isUnitVisible,
			isComponentVisible: !visibility.isComponentVisible,
		})
		setComponentData([
			...unit.components,
			{roomIndex: number - 1, unitIndex: index},
		])
	}
	function handleAddRoom() {
		const roomIndex = number - 1
		const cloneStore = [...store]
		let newUnitData = {...unitData}
		newUnitData.id = nanoid()
		newUnitData.components.forEach(component => {
			component.id = nanoid()
			component.vendors.forEach(vendor => {
				vendor.id = nanoid()
			})
			component.material.forEach(m => {
				m.id = nanoid()
			})
			component.milestones.forEach(milestone => {
				milestone.id = nanoid()
			})
			return component
		})

		cloneStore[roomIndex].units.push(newUnitData)
		setStore([...cloneStore])
		return
	}
	return (
		<RoomContainer>
			<h3>Room {number}</h3>
			{room.units.map((unit: UnitType, index) => {
				return (
					<Fragment key={unit.id}>
						<AppInput
							trash
							label='Unit Name'
							name={`unit ${number}`}
							value={unit.name}
							defaultValue={unit.name}
							onChange={e => {
								setStore((p: RoomType[]) => {
									const cloneStore = [...p]
									cloneStore[number - 1].units[index].name = e.target.value
									return cloneStore
								})
							}}
						/>
						<AddComponent onClick={() => handleAddComponent(unit, index)}>
							Add Component(s)
						</AddComponent>
					</Fragment>
				)
			})}
			<AiOutlinePlus
				style={{cursor: 'pointer'}}
				onClick={handleAddRoom}
				size={20}
			/>
			<Spacer height={10} />
		</RoomContainer>
	)
}

export const RoomContainer = styled.div`
	h3 {
		font-size: 1.5rem;
		opacity: 0.8;
		font-weight: 400;
	}
`
export const AddComponent = styled.h4`
	text-align: right;
	font-size: 1.2rem;
	color: ${colors.blue};
	cursor: pointer;
`

export default Room
