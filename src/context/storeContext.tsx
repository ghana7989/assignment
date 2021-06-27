import {createContext, FC, useState} from 'react'
import {data, RoomType} from '../data'

export const StoreContext = createContext<any>(undefined)

export const StoreContextProvider: FC = ({children}) => {
	let [store, setStore] = useState<RoomType[]>(data)
	return (
		<StoreContext.Provider value={{store, setStore}}>
			{children}
		</StoreContext.Provider>
	)
}
