import Spacer from 'react-spacer'
import {FC, Fragment, useContext} from 'react'
import styled from 'styled-components'
import {StoreContext} from '../context/storeContext'
import {RoomType} from '../data'
import AppInput from './input/Input'
import {colors} from '../theme'
import {AiOutlinePlus} from 'react-icons/ai'
import {LayoutContext} from '../context/layoutContext'

interface RoomProps {
	number?: number
	room: RoomType
}

const Room: FC<RoomProps> = ({number = 1, room}) => {
	let {setStore, store} = useContext(StoreContext)
	const {setUnit, setVisibility, visibility} = useContext(LayoutContext)
	// const inputRef = useRef<HTMLInputElement>()

	return (
		<RoomContainer>
			<h3>Room {number}</h3>
			{room.units.map((unit, index) => {
				return (
					<Fragment key={unit.name}>
						<AppInput
							key={Math.random() + unit.name}
							trash
							label='Unit Name'
							name={`unit ${number}`}
							value={unit.name}
							defaultValue={unit.name}
							onChange={e => {
								store[number - 1].units[index].name = e.target.value
							}}
							onBlur={() => {
								setStore(store)
							}}
						/>
						<AddComponent
							onClick={() => {
								setUnit(unit)
								setVisibility({
									...visibility,
									isUnitVisible: true,
									isComponentVisible: true,
								})
							}}
						>
							Add Component(s)
						</AddComponent>
					</Fragment>
				)
			})}
			<AiOutlinePlus size={20} />
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
