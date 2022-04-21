export interface IButton {
  id?: string | undefined
  text?: string | Number
  onClick?: { (): void } | null
  size?: string
  icon?: JSX.Element | null
}

export interface IButtonWithIcon extends IButton {
  icon: JSX.Element | null
}
