export function isClassComponent(component: any): boolean {
  return (
    typeof component === 'function' && !!component.prototype.isReactComponent
  )
}

export function isFunctionComponent(component: any): boolean {
  return (
    typeof component === 'function' && String(component).includes('createElement')
  )
}

export function isReactComponent(component: any): boolean {
  return (
    isClassComponent(component) || isFunctionComponent(component)
  )
}