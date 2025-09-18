'use client'

import { motion } from 'framer-motion'

const WhyChooseUs = () => {
  const features = [
    {
      title: "Innovation",
      description: "Cutting-edge AI technologies combined with creative problem-solving to deliver solutions that push the boundaries of what's possible.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-blue-500 to-purple-600",
      stats: "99%",
      statsLabel: "Client Satisfaction"
    },
    {
      title: "Reliability",
      description: "Proven track record of delivering robust, scalable solutions on time and within budget, with ongoing support and maintenance.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-green-500 to-teal-600",
      stats: "24/7",
      statsLabel: "Support Available"
    },
    {
      title: "Cultural Pride",
      description: "Honoring traditional values while embracing modern technology, creating solutions that respect your heritage and vision.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-yellow-500 to-orange-600",
      stats: "100+",
      statsLabel: "Projects Delivered"
    }
  ]

  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-br from-primary-blue via-primary-blue/95 to-primary-blue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose Minyawi AI?
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of innovation, reliability, and cultural understanding
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-gold transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-200 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="pt-6 border-t border-white/20">
                  <div className="text-3xl font-bold text-accent-gold mb-1">
                    {feature.stats}
                  </div>
                  <div className="text-sm text-gray-300">
                    {feature.statsLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Our Commitment to Excellence
            </h3>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
              We don't just build AI solutions; we craft intelligent systems that understand your business, 
              respect your values, and drive meaningful results. Every project is a partnership in innovation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold mb-2">⚡</div>
                <div className="font-semibold">Fast Implementation</div>
                <div className="text-sm text-gray-300">Quick turnaround times</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold mb-2">🔒</div>
                <div className="font-semibold">Secure & Compliant</div>
                <div className="text-sm text-gray-300">Enterprise-grade security</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold mb-2">🎯</div>
                <div className="font-semibold">Results-Driven</div>
                <div className="text-sm text-gray-300">Measurable outcomes</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs