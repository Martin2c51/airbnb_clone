'use client'

import { on } from "events"
import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

interface CounterProps {
    title: string,
    subtitle: string,
    value: number,
    onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {

    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange,value])

    const onRemove = useCallback(() => {
        if (value === 1) {
            return
        }
        onChange(value - 1)

    }, [onChange,value])

  return (
    <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
            <div className="font-medium">
                {title}
            </div>
            <div className="font-light text-gray-500">
                {subtitle}
            </div>
        </div>
        <div className="flex flex-row items-center gap-4">
            <div
                onClick={onRemove}
                className="
                    flex 
                    items-center 
                    justify-center 
                    w-10 
                    h-10 
                    rounded-full 
                    border-[1px]
                    border-neutral-400 
                    text-neutral-600 
                    cursor-pointer 
                    transition 
                    hover:opacity-80"
            >
                <AiOutlineMinus />
            </div>
            <div className="font-light text-xl text-neutral-600">
                {value}
            </div>
            <div
                onClick={onAdd}
                className="
                    flex 
                    items-center 
                    justify-center 
                    w-10 
                    h-10 
                    rounded-full 
                    border-[1px]
                    border-neutral-400 
                    text-neutral-600 
                    cursor-pointer 
                    transition 
                    hover:opacity-80"
            >
                <AiOutlinePlus />
            </div>
        </div>        
    </div>
  )
}

export default Counter