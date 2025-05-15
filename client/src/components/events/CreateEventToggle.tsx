import StandardButton from '../../shared/StandardButton'

interface CreateEventToggleProps {
  onToggle: () => void
}

export default function CreateEventToggle({ onToggle }: CreateEventToggleProps) {
  return (
    <StandardButton
      props={{
        buttonProps: {
          content: { src: '/icons/add_green.png', alt: 'add event button' },
          variant: 'light',
          className: 'create-event-btn',
        },
        onClick: onToggle,
      }}
    />
  )
}