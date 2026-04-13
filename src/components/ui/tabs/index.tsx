"use client"

import { createContext, useContext, useState, ReactNode, FC } from "react"

// Context for Tabs
interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
}

// Tabs Root
interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: ReactNode
}

export const Tabs: FC<TabsProps> = ({
  defaultValue = "",
  value,
  onValueChange,
  className = "",
  children,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

// TabsList
interface TabsListProps {
  className?: string
  children: ReactNode
}

export const TabsList: FC<TabsListProps> = ({ className = "", children }) => {
  return (
    <div role="tablist" className={className}>
      {children}
    </div>
  )
}

// TabsTrigger
interface TabsTriggerProps {
  value: string
  className?: string
  children: ReactNode
}

export const TabsTrigger: FC<TabsTriggerProps> = ({
  value,
  className = "",
  children,
}) => {
  const { value: currentValue, onValueChange } = useTabsContext()
  const isActive = currentValue === value

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      className={className}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  )
}

// TabsContent
interface TabsContentProps {
  value: string
  className?: string
  children: ReactNode
}

export const TabsContent: FC<TabsContentProps> = ({
  value,
  className = "",
  children,
}) => {
  const { value: currentValue } = useTabsContext()

  if (currentValue !== value) return null

  return (
    <div role="tabpanel" data-state={currentValue === value ? "active" : "inactive"} className={className}>
      {children}
    </div>
  )
}
