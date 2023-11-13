import React from 'react'
import { Card } from '../ui/card'
import { CheckCircle, SeparatorHorizontal, XCircle } from 'lucide-react'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuSeparator } from '../ui/dropdown-menu'

type McqCounterType = {
    correct: number,
    wrong: number
}

const McqCounter = ({ correct, wrong }: McqCounterType) => {
    return (
        <Card className='flex items-center justify-center p-2 border-b-4 border-r-4 border-gray-700 dark:border-gray-300'>
            <CheckCircle className='text-green-500' />
            <span className='mx-2 text-xl text-green-500'>{correct}</span>
            -
            <span className='mx-2 text-xl text-red-500'>{wrong}</span>
            <XCircle className='text-red-500' />
        </Card>
    )
}

export default McqCounter