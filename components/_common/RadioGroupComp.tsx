import { Radio } from 'antd'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'

interface Iradio {
  name: string
  value: string
}

interface IradioGroupComp {
  radioButtons: Iradio[]
  className?: string
  onChange?: () => {}
}

const RadioGroupComp = styled(
  ({ className, radioButtons, onChange }: IradioGroupComp) => {
    return (
      <span className={className}>
        <Radio.Group onChange={onChange}>
          {radioButtons.map((btn) => (
            <div key={btn.value}>
              <Radio value={btn.value}>{btn.name}</Radio>
            </div>
          ))}
        </Radio.Group>
      </span>
    )
  }
)``

export default RadioGroupComp
