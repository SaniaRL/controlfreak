import { useState } from 'react'
import { Col, Collapse, Container, Row } from 'react-bootstrap'

import StandardButton from '../../../shared/StandardButton'

import './PresetPanel.css'

export default function PresetPanel(){
	const [open, setOpen] = useState(false)
	const [date, setDate] = useState<Date | null>(null)

	function onClick() {
		console.log('ouch')
	}

	return(
		<div> {/* Yttre wrapper om du behöver styla hela panelen */}
		<Container className='preset-panel-container'>
			<Row>
				<Col md={2}>
					<StandardButton
						props={{
							key: 1,
							id: 1,
							buttonProps: { content: { src: '/icons/laundry.png', alt: 'laundry button' }, variant: 'light'},
							onClick: onClick,
							onMouseEnter: () => setOpen(true),
						}}
					/>
				</Col>
				<Col md={2}>
					<StandardButton
						props={{
							key: 2,
							id: 2,
							buttonProps: { content: { src: '/icons/work.png', alt: 'work button' }, variant: 'light', className: 'btn' },
							onClick: onClick,
							onMouseEnter: () => setOpen(true),
						}}
					/>
				</Col>
			</Row>
			<Collapse in={open}>
				<Row>
					<Col md={2}>
						<StandardButton
							props={{
								key: 3,
								id: 3,
								buttonProps: { content: { src: '/icons/laundry.png', alt: 'laundry button' }, variant: 'light', className: 'btn' },
								onClick: onClick,
							}}/>
					</Col>
					<Col md={2}>
						<StandardButton
							props={{
								key: 4,
								id: 4,
								buttonProps: { content: { src: '/icons/work.png', alt: 'work button' }, variant: 'light', className: 'btn' },
								onClick: onClick,
							}}/>
					</Col>
				</Row>
		</Collapse>
		</Container>
	</div>
	// <>
	// 	<div className='preset-panel-head'>
	// 	<div className='button-row row'>
	// 				<StandardButton
	// 					props= {{
	// 						key: 1,
	// 						id: 1,
	// 						buttonProps: { content: {src: '/icons/laundry.png', alt: 'laundry button'}, variant: 'light', className: 'btn'},
	// 						onClick: onClick,
	// 						onMouseEnter: () => setOpen(true),
	// 						// onMouseLeave: () => setOpen(false)
	// 					}}/>
					
	// 					<StandardButton
	// 						props= {{
	// 							key: 2,
	// 							id: 2,
	// 							buttonProps: { content: {src: '/icons/work.png', alt: 'work button'}, variant: 'light', className: 'btn'},
	// 							onClick: onClick,
	// 						}}/>
	// 				</div>
	// 	</div>
	// 	<Collapse in={open}>
	// 		<div id='preset-panel-container' className='preset-panel-container'>
	// 			<div className='button-row row'>
	// 				<StandardButton
	// 					props= {{
	// 						key: 3,
	// 						id: 3,
	// 						buttonProps: { content: {src: '/icons/laundry.png', alt: 'laundry button'}, variant: 'light', className: 'btn'},
	// 						onClick: onClick,
	// 					}}/>
					
	// 					<StandardButton
	// 						props= {{
	// 							key: 4,
	// 							id: 4,
	// 							buttonProps: { content: {src: '/icons/work.png', alt: 'work button'}, variant: 'light', className: 'btn'},
	// 							onClick: onClick,
	// 						}}/>
	// 				</div>
	// 		</div>
	// 	</Collapse>
	// </>
	)
}


		{/* <Form.Label>Bob heter Bob</Form.Label>
		<Form.Control
			type='date'
			value={date ? date.toISOString().split('T')[0] : ''}
			onChange={(e) => {
				setDate(new Date(e.target.value))
				setOpen(true)
			}}/> */}
