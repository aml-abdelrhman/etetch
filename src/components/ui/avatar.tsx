'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'

import { cn } from '@/lib/utils'

export const getInitials = (name?: string) => {
  if (!name) return ''
  const [firstName, lastName] = name.split(' ')
  return `${firstName.charAt(0).toUpperCase()}${lastName?.charAt(0).toUpperCase() || ''}`
}

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        'aspect-square size-full transition-all duration-300 opacity-50 blur-sm bg-primary',
        className,
      )}
      onLoad={(e) => {
        const target = e.currentTarget
        target.classList.remove('opacity-50', 'blur-sm', 'bg-primary')
        target.classList.add('opacity-100')
      }}
      onError={(e) => {
        const target = e.currentTarget
        // Prevent infinite error loops
        if (!target.dataset.errorHandled) {
          target.dataset.errorHandled = 'true'
          const fallbackSrc = '/image-break.png'
          target.src = fallbackSrc
        }
      }}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-secondary flex size-full items-center justify-center rounded-[inherit] text-xs',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarImage }
