import { DashTemplate } from '@/components/dashboard/components/dashTemplate'
import React from 'react'

export default function Page({children}) {
  return (
    <DashTemplate>{children}</DashTemplate>
  )
}
