import {useContext} from 'react'
import Spacer from 'react-spacer'
import {StoreContext} from '../../context/storeContext'
import {RoomType} from '../../data'
import {colors} from '../../theme'
import Box from '../Box'
import AppButton from '../Button'
import Room from '../Room'

const Units = () => {
	const {store} = useContext(StoreContext)
	return (
		<Box title='Add Units'>
			{store?.map((room: RoomType, index: number) => {
				return <Room key={room.id} number={index + 1} room={room} />
			})}
			<AppButton text='Save' />
			<Spacer height='10px' />
			<AppButton text='Start Work' color={colors.blue} bgColor={colors.white} />
		</Box>
	)
}

export default Units
