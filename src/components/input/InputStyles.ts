import styled from 'styled-components/macro'
import {colors} from '../../theme'

export const InputContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`
export const Input = styled.input`
	background-color: ${colors.bgGrey};
	width: 100%;
	height: 5rem;
	padding: 8px;
	border: 0px;
	border-radius: 10px;
	outline: none;
`

export const InputLabel = styled.p`
	position: absolute;
	font-size: 1.2rem;
	font-weight: bold;
	text-align: center;
`
