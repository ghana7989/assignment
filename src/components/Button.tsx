import {FC} from 'react'
import styled from 'styled-components/macro'
import {colors} from '../theme'

interface AppButtonProps {
	text: string
	color?: string
	bgColor?: string
}

const AppButton: FC<AppButtonProps> = ({
	bgColor = colors.blue,
	color,
	text,
	...rest
}) => {
	return (
		<Button
			{...rest}
			bgColor={bgColor}
			style={{color, backgroundColor: bgColor}}
		>
			{text}
		</Button>
	)
}

interface ButtonProps {
	bgColor: string
}

export const Button = styled.button<ButtonProps>`
	width: 100%;
	border-radius: 20px;
	border-color: transparent;
	background-color: ${p => p.bgColor};
	height: 5rem;
	cursor: pointer;
	padding: 10px;
	color: ${colors.white};
	font-size: 2rem;
`

export default AppButton
