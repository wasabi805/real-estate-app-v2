import { useEffect, useState } from 'react'
export const useInitAutoComplete = (id) => {
  let [state, setState] = useState(id ? 'loading' : 'idle')
  useEffect(() => {
    if (!id) {
      setState('idle')
      return
    }

    let script = document.getElementById(`script[id="${id}"]`)

    const handleScript = (e) => {
      setState(e.type === 'load' ? 'ready' : 'error')
    }

    if (!script) {
      script = document.createElement('script')
      script.type = 'application/javascript'
      script.id = `${id}`
      script.innerText = "alert('i will be the initfunction')"

      document.body.appendChild(script)
      script.addEventListener('load', handleScript)
      script.addEventListener('error', handleScript)
    }
    script.addEventListener('load', handleScript)
    script.addEventListener('error', handleScript)

    return () => {
      script.removeEventListener('load', handleScript)
      script.removeEventListener('error', handleScript)
    }
  }, [id])
  return state
}
