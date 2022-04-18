export interface IButton {
  id: string
  text: string
  onClick: { (): void } | null
}

export interface IButtonWithIcon extends IButton {
  icon: JSX.Element | null
}
