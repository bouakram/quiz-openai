import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { LucideTrophy, TrophyIcon } from 'lucide-react'

type TrophyType = {
    accuracy: number
}

const Trophy = ({ accuracy }: TrophyType) => {
    return (
        <Card className='border-b-4 border-r-4 border-gray-700 dark:border-gray-300'>
            <CardHeader className='flex flex-row items-center justify-between pb-7'>
                <CardTitle className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Results</CardTitle>
                <TrophyIcon />
            </CardHeader>
            <CardContent className='flex flex-col items-center justify-center'>
                {
                    accuracy > 75 ? (
                        <>
                            <LucideTrophy stroke='gold' size={50} />
                            <p className='text-yellow-300 text-center'>Impressive your accuracy is {">"} 75%</p>
                        </>
                    ) : accuracy > 25 ? (
                        <>
                            <LucideTrophy stroke='silver' size={50} />
                            <p className='text-slate-200 text-center'>Impressive your accuracy is {"<"} 75%</p>
                        </>
                    ) : (
                        <>
                            <LucideTrophy className='text-amber-900' size={50} />
                            <p className='text-amber-700 text-center'>Impressive your accuracy is {"<"} 25%</p>
                        </>
                    )
                }
            </CardContent>
        </Card>
    )
}

export default Trophy