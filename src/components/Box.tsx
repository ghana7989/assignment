import styled from 'styled-components/macro'
import {colors} from '../theme'
import {FC} from 'react'

interface BoxProps {
	title: string
}

const Box: FC<BoxProps> = ({title, children}) => {
	return (
		<BoxContainer>
			<Heading>{title}</Heading>
			{children}
		</BoxContainer>
	)
}
export const Heading = styled.h1`
	margin-top: 20px auto 30px;
	font-size: 2.5rem;
	font-weight: 500;
	text-align: center;
`

export const BoxContainer = styled.div`
	min-width: 100%;
	padding: 20px;
	border: 1px solid ${colors.bgGrey};
	box-shadow: ${colors.boxShadow};
`
export default Box
