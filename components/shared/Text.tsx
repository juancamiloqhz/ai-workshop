// import { jsx as _jsx } from 'react/jsx-runtime'
import React from 'react'
import cn from 'clsx'
const variants = {
  h1: 'text-5xl font-bold tracking-tight',
  h2: 'text-4xl font-semibold tracking-tight',
  description: 'text-lg font-medium tracking-tight text-accents-5',
  body: 'text-base font-normal',
  smallText:
    'text-sm font-semibold text-blue uppercase tracking-tight pl-1 block',
}
const Text = ({
  style,
  className = '',
  variant = 'body',
  children,
}: {
  style?: React.CSSProperties
  className?: string
  variant?: keyof typeof variants
  children: React.ReactNode | any
}) => {
  const componentsMap = {
    h1: 'h1',
    h2: 'h2',
    body: 'p',
    description: 'p',
    smallText: 'small',
  }
  const Component = componentsMap[variant]
  return React.createElement(
    Component,
    {
      className: cn('', variants[variant], className),
      style: style,
    },
    children
  )
}
export default Text
