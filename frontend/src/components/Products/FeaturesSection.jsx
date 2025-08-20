import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const features = [
  {
    icon: <HiShoppingBag className="text-3xl text-white" />,
    title: "FREE INTERNATIONAL SHIPPING",
    desc: "On all orders over $100.00",
    gradient: "from-emerald-500 to-green-700"
  },
  {
    icon: <HiArrowPathRoundedSquare className="text-3xl text-white" />,
    title: "45 DAYS RETURN",
    desc: "Money back guarantee",
    gradient: "from-indigo-500 to-purple-700"
  },
  {
    icon: <HiOutlineCreditCard className="text-3xl text-white" />,
    title: "SECURE CHECKOUT",
    desc: "100% secured checkout process",
    gradient: "from-rose-500 to-red-700"
  }
]

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((f, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-b from-gray-50 to-white"
          >
            <div className={`p-5 rounded-full mb-6 bg-gradient-to-r ${f.gradient} shadow-lg`}>
              {f.icon}
            </div>
            <h4 className="text-lg font-semibold tracking-tight text-gray-900 mb-2">
              {f.title}
            </h4>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
