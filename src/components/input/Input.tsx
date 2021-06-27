import {FC} from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {InputContainer, Input, InputLabel} from './InputStyles'

interface AppInputProps {
	trash?: boolean
	onChange: (e: any) => void
	onBlur?: (e: any) => void
	value?: any
	name: string
	id?: string
	placeholder?: string
	label?: string
	defaultValue?: string
}

const AppInput: FC<AppInputProps> = ({
	trash,
	onChange,
	onBlur,
	value,
	name,
	id,
	placeholder,
	label = '',
	defaultValue,
	...rest
}) => {
	return (
		<InputContainer>
			<Input
				{...rest}
				id={id}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				type='text'
				style={{paddingRight: trash ? '80px' : '50px'}}
				onBlur={onBlur}
				defaultValue={defaultValue}
			/>
			{trash && (
				<AiFillDelete
					style={{
						position: 'absolute',
						right: '10px',
						textAlign: 'center',
						cursor: 'pointer',
					}}
					size={20}
				/>
			)}
			<InputLabel
				style={{
					right: trash ? '40px' : '10px',
					userSelect: 'none',
				}}
			>
				{label}
			</InputLabel>
		</InputContainer>
	)
}
export default AppInput
