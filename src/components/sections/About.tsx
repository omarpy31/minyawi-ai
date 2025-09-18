'use client'

import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary-silver">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-blue mb-6">
            About Minyawi AI
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Where Heritage Meets Innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-accent-gold">
              <h3 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                <span className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  M
                </span>
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with intelligent automation solutions that respect traditional values 
                while embracing cutting-edge AI technology. We bridge the gap between heritage and innovation, 
                creating seamless workflows that honor your legacy while propelling you into the future.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-primary-blue">
              <h3 className="text-2xl font-bold text-primary-blue mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  V
                </span>
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading AI automation agency that demonstrates how technology can enhance 
                rather than replace human wisdom and cultural heritage. We envision a future where 
                every business can harness AI's power while maintaining their unique identity and values.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-primary-blue text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Heritage */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-primary-blue mb-3">Cultural Heritage</h4>
              <p className="text-gray-600">
                Honoring traditions and values while embracing technological advancement.
              </p>
            </div>

            {/* Innovation */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 6.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-primary-blue mb-3">Innovation</h4>
              <p className="text-gray-600">
                Pioneering AI solutions that push boundaries while remaining accessible and practical.
              </p>
            </div>

            {/* Excellence */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-primary-blue mb-3">Excellence</h4>
              <p className="text-gray-600">
                Delivering superior quality in every project with attention to detail and client satisfaction.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About