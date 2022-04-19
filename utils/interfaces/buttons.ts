export interface IButton {
  id?: string
  text?: string
  onClick?: { (): void } | null
  size?: string
}

export interface IButtonWithIcon extends IButton {
  icon: JSX.Element | null
}
