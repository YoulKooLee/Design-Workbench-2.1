import React from "react"
import List01 from "./list-01"
import List02 from "./list-02"

export default function FinancialWidgets() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Account Balance Widget */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white px-1">账户余额</h3>
        <List01 />
      </div>

      {/* Transaction History Widget */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white px-1">近期交易</h3>
        <List02 />
      </div>
    </div>
  )
}
