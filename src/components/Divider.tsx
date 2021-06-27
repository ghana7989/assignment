import {FC} from 'react'
import styled from 'styled-components'

interface DividerProps {
	text?: string
}

const Divider: FC<DividerProps> = ({text}) => {
	return (
		<DividerContainer>
			<h1>{text}</h1>
		</DividerContainer>
	)
}

export const DividerContainer = styled.h1`
	h1 {
		display: flex;
		flex-direction: row;
		font-weight: 400;
		opacity: 0.5;
	}
	h1:before,
	h1:after {
		content: '';
		flex: 1 1;
		border-bottom: 1px solid;
		margin: auto;
	}
	h1:before {
		margin-right: 10px;
	}
	h1:after {
		margin-left: 10px;
	}
`

export default Divider
