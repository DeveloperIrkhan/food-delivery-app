import React from 'react'

const PriceTag = () => {
    return (
        <div>
            <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                </dl>
            </div>
        </div>
    )
}

export default PriceTag