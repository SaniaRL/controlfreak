import { useState, useEffect } from 'react'
import { Col, Collapse, Container, Row } from 'react-bootstrap'
import { EventTemplate } from '../../types/dto/EventTemplate'
import { mapEventTemplateToNullableEvent } from '../../utils/mapper'
import { EventDataNullable } from '../../types/data/EventDataNullable'
import StandardButton from '../../shared/StandardButton'

import './PresetPanel.css'

export default function PresetPanel({ eventTemplates, calendarDate, createEventFromTemplate }: { 
	eventTemplates: EventTemplate[],
	calendarDate: Date | null,
	createEventFromTemplate: (event: EventDataNullable) => void
}) {
  const [openId, setOpenId] = useState<number | null>(null)
  const [roots, setRoots] = useState<EventTemplate[]>([])

  useEffect(() => {
    const allChildren = new Set<number>()
    eventTemplates.forEach(et => et.children?.forEach(c => allChildren.add(c.id!)))

    const rootTemplates = eventTemplates.filter(et => !allChildren.has(et.id!))

    setRoots(rootTemplates)
  }, [eventTemplates])

  return (
		<Container className='preset-panel-container'>
			<Row>
				{roots.map(parent => (
					<Col key={parent.id} md={2}>
						<StandardButton
							props={{
								key: parent.id,
								buttonProps: {
									content: { src: parent.buttonProps?.iconSrc ?? '', alt: parent.buttonProps?.altText ?? '' },
									variant: 'light',
									className: 'preset-panel-btn preset-panel-parent'
								},
								onMouseEnter: () => setOpenId(parent.id!)
							}}
						/>
					</Col>
				))}
			</Row>
			<Collapse in={openId !== null}>
				<div>
					<Row onMouseLeave={() => setOpenId(null)}>
						{roots.find(r => r.id === openId)?.children?.map(child => (
							<Col key={child.id} md={2}>
								<StandardButton
									props={{
										key: child.id,
										buttonProps: {
											content: { src: child.buttonProps?.iconSrc ?? '', alt: child.buttonProps?.altText ?? '' },
											variant: 'light',
											className: 'preset-panel-btn preset-panel-parent'
										},
										onClick: () => createEventFromTemplate(mapEventTemplateToNullableEvent(child, calendarDate)),
									}}
								/>
							</Col>
						))}
					</Row>
				</div>
			</Collapse>
		</Container>
  )
}
