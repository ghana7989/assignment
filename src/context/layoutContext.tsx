import {createContext, FC, useState} from 'react'
import {ComponentType, MaterialType, UnitType, VendorType} from '../data'

export const LayoutContext = createContext<any>(undefined)

export const LayoutProvider: FC = ({children}) => {
	const [unit, setUnit] = useState<UnitType | null>(null)
	const [componentData, setComponentData] = useState<ComponentType | null>(null)
	const [vendor, setVendor] = useState<VendorType | null>(null)
	const [material, setMaterial] = useState<MaterialType | null>(null)

	const [visibility, setVisibility] = useState({
		isComponentVisible: false,
		isUnitVisible: false,
		isVendorVisible: false,
		isMaterialVisible: false,
	})
	return (
		<LayoutContext.Provider
			value={{
				unit,
				setUnit,
				componentData,
				setComponentData,
				vendor,
				setVendor,
				visibility,
				setVisibility,
				material,
				setMaterial,
			}}
		>
			{children}
		</LayoutContext.Provider>
	)
}
