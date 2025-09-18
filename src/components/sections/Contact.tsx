'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Prepare submission data with timestamp and formatted phone number
      const now = new Date()
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode.replace('+', '')}${formData.phone}`,
        countryCode: formData.countryCode,
        phoneNumber: formData.phone,
        service: formData.service,
        message: formData.message,
        submissionDateTime: now.toISOString(),
        submissionDateTimeLocal: now.toLocaleString(),
        submissionTimestamp: now.getTime(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }

      // Send data to webhook
      const response = await fetch('https://omar0101.app.n8n.cloud/webhook/66a47fb0-d834-4fb3-a890-97cdb50886af', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setIsSubmitted(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setSubmitStatus('idle')
          setFormData({ name: '', email: '', countryCode: '+1', phone: '', service: '', message: '' })
        }, 3000)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-secondary-silver">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-blue mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with AI? Let's start the conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary-blue mb-6">
                Send us a message
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : submitStatus === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-red-600 mb-2">Submission Failed</h4>
                  <p className="text-gray-600">There was an error sending your message. Please try again.</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-4 px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 outline-none text-gray-900"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 outline-none text-gray-900"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 outline-none bg-white text-gray-900 w-full sm:w-auto sm:min-w-32"
                      >
                        <option value="+93">🇦🇫 +93 (Afghanistan)</option>
                        <option value="+355">🇦🇱 +355 (Albania)</option>
                        <option value="+213">🇩🇿 +213 (Algeria)</option>
                        <option value="+1684">🇦🇸 +1684 (American Samoa)</option>
                        <option value="+376">🇦🇩 +376 (Andorra)</option>
                        <option value="+244">🇦🇴 +244 (Angola)</option>
                        <option value="+1264">🇦🇮 +1264 (Anguilla)</option>
                        <option value="+1268">🇦🇬 +1268 (Antigua and Barbuda)</option>
                        <option value="+54">🇦🇷 +54 (Argentina)</option>
                        <option value="+374">🇦🇲 +374 (Armenia)</option>
                        <option value="+297">🇦🇼 +297 (Aruba)</option>
                        <option value="+247">🇦🇨 +247 (Ascension Island)</option>
                        <option value="+61">🇦🇺 +61 (Australia)</option>
                        <option value="+43">🇦🇹 +43 (Austria)</option>
                        <option value="+994">🇦🇿 +994 (Azerbaijan)</option>
                        <option value="+1242">🇧🇸 +1242 (Bahamas)</option>
                        <option value="+973">🇧🇭 +973 (Bahrain)</option>
                        <option value="+880">🇧🇩 +880 (Bangladesh)</option>
                        <option value="+1246">🇧🇧 +1246 (Barbados)</option>
                        <option value="+375">🇧🇾 +375 (Belarus)</option>
                        <option value="+32">🇧🇪 +32 (Belgium)</option>
                        <option value="+501">🇧🇿 +501 (Belize)</option>
                        <option value="+229">🇧🇯 +229 (Benin)</option>
                        <option value="+1441">🇧🇲 +1441 (Bermuda)</option>
                        <option value="+975">🇧🇹 +975 (Bhutan)</option>
                        <option value="+591">🇧🇴 +591 (Bolivia)</option>
                        <option value="+387">🇧🇦 +387 (Bosnia and Herzegovina)</option>
                        <option value="+267">🇧🇼 +267 (Botswana)</option>
                        <option value="+55">🇧🇷 +55 (Brazil)</option>
                        <option value="+1284">🇻🇬 +1284 (British Virgin Islands)</option>
                        <option value="+673">🇧🇳 +673 (Brunei)</option>
                        <option value="+359">🇧🇬 +359 (Bulgaria)</option>
                        <option value="+226">🇧🇫 +226 (Burkina Faso)</option>
                        <option value="+257">🇧🇮 +257 (Burundi)</option>
                        <option value="+855">🇰🇭 +855 (Cambodia)</option>
                        <option value="+237">🇨🇲 +237 (Cameroon)</option>
                        <option value="+1">🇨🇦 +1 (Canada)</option>
                        <option value="+238">🇨🇻 +238 (Cape Verde)</option>
                        <option value="+1345">🇰🇾 +1345 (Cayman Islands)</option>
                        <option value="+236">🇨🇫 +236 (Central African Republic)</option>
                        <option value="+235">🇹🇩 +235 (Chad)</option>
                        <option value="+56">🇨🇱 +56 (Chile)</option>
                        <option value="+86">🇨🇳 +86 (China)</option>
                        <option value="+57">🇨🇴 +57 (Colombia)</option>
                        <option value="+269">🇰🇲 +269 (Comoros)</option>
                        <option value="+242">🇨🇬 +242 (Congo)</option>
                        <option value="+243">🇨🇩 +243 (Congo, Democratic Republic)</option>
                        <option value="+682">🇨🇰 +682 (Cook Islands)</option>
                        <option value="+506">🇨🇷 +506 (Costa Rica)</option>
                        <option value="+225">🇨🇮 +225 (Côte d'Ivoire)</option>
                        <option value="+385">🇭🇷 +385 (Croatia)</option>
                        <option value="+53">🇨🇺 +53 (Cuba)</option>
                        <option value="+357">🇨🇾 +357 (Cyprus)</option>
                        <option value="+420">🇨🇿 +420 (Czech Republic)</option>
                        <option value="+45">🇩🇰 +45 (Denmark)</option>
                        <option value="+253">🇩🇯 +253 (Djibouti)</option>
                        <option value="+1767">🇩🇲 +1767 (Dominica)</option>
                        <option value="+1809">🇩🇴 +1809 (Dominican Republic)</option>
                        <option value="+670">🇹🇱 +670 (East Timor)</option>
                        <option value="+593">🇪🇨 +593 (Ecuador)</option>
                        <option value="+20">🇪🇬 +20 (Egypt)</option>
                        <option value="+503">🇸🇻 +503 (El Salvador)</option>
                        <option value="+240">🇬🇶 +240 (Equatorial Guinea)</option>
                        <option value="+291">🇪🇷 +291 (Eritrea)</option>
                        <option value="+372">🇪🇪 +372 (Estonia)</option>
                        <option value="+268">🇸🇿 +268 (Eswatini)</option>
                        <option value="+251">🇪🇹 +251 (Ethiopia)</option>
                        <option value="+500">🇫🇰 +500 (Falkland Islands)</option>
                        <option value="+298">🇫🇴 +298 (Faroe Islands)</option>
                        <option value="+679">🇫🇯 +679 (Fiji)</option>
                        <option value="+358">🇫🇮 +358 (Finland)</option>
                        <option value="+33">🇫🇷 +33 (France)</option>
                        <option value="+594">🇬🇫 +594 (French Guiana)</option>
                        <option value="+689">🇵🇫 +689 (French Polynesia)</option>
                        <option value="+241">🇬🇦 +241 (Gabon)</option>
                        <option value="+220">🇬🇲 +220 (Gambia)</option>
                        <option value="+995">🇬🇪 +995 (Georgia)</option>
                        <option value="+49">🇩🇪 +49 (Germany)</option>
                        <option value="+233">🇬🇭 +233 (Ghana)</option>
                        <option value="+350">🇬🇮 +350 (Gibraltar)</option>
                        <option value="+30">🇬🇷 +30 (Greece)</option>
                        <option value="+299">🇬🇱 +299 (Greenland)</option>
                        <option value="+1473">🇬🇩 +1473 (Grenada)</option>
                        <option value="+590">🇬🇵 +590 (Guadeloupe)</option>
                        <option value="+1671">🇬🇺 +1671 (Guam)</option>
                        <option value="+502">🇬🇹 +502 (Guatemala)</option>
                        <option value="+224">🇬🇳 +224 (Guinea)</option>
                        <option value="+245">🇬🇼 +245 (Guinea-Bissau)</option>
                        <option value="+592">🇬🇾 +592 (Guyana)</option>
                        <option value="+509">🇭🇹 +509 (Haiti)</option>
                        <option value="+504">🇭🇳 +504 (Honduras)</option>
                        <option value="+852">🇭🇰 +852 (Hong Kong)</option>
                        <option value="+36">🇭🇺 +36 (Hungary)</option>
                        <option value="+354">🇮🇸 +354 (Iceland)</option>
                        <option value="+91">🇮🇳 +91 (India)</option>
                        <option value="+62">🇮🇩 +62 (Indonesia)</option>
                        <option value="+98">🇮🇷 +98 (Iran)</option>
                        <option value="+964">🇮🇶 +964 (Iraq)</option>
                        <option value="+353">🇮🇪 +353 (Ireland)</option>
                        <option value="+972">🇮🇱 +972 (Israel)</option>
                        <option value="+39">🇮🇹 +39 (Italy)</option>
                        <option value="+1876">🇯🇲 +1876 (Jamaica)</option>
                        <option value="+81">🇯🇵 +81 (Japan)</option>
                        <option value="+962">🇯🇴 +962 (Jordan)</option>
                        <option value="+7">🇰🇿 +7 (Kazakhstan)</option>
                        <option value="+254">🇰🇪 +254 (Kenya)</option>
                        <option value="+686">🇰🇮 +686 (Kiribati)</option>
                        <option value="+383">🇽🇰 +383 (Kosovo)</option>
                        <option value="+965">🇰🇼 +965 (Kuwait)</option>
                        <option value="+996">🇰🇬 +996 (Kyrgyzstan)</option>
                        <option value="+856">🇱🇦 +856 (Laos)</option>
                        <option value="+371">🇱🇻 +371 (Latvia)</option>
                        <option value="+961">🇱🇧 +961 (Lebanon)</option>
                        <option value="+266">🇱🇸 +266 (Lesotho)</option>
                        <option value="+231">🇱🇷 +231 (Liberia)</option>
                        <option value="+218">🇱🇾 +218 (Libya)</option>
                        <option value="+423">🇱🇮 +423 (Liechtenstein)</option>
                        <option value="+370">🇱🇹 +370 (Lithuania)</option>
                        <option value="+352">🇱🇺 +352 (Luxembourg)</option>
                        <option value="+853">🇲🇴 +853 (Macau)</option>
                        <option value="+389">🇲🇰 +389 (Macedonia)</option>
                        <option value="+261">🇲🇬 +261 (Madagascar)</option>
                        <option value="+265">🇲🇼 +265 (Malawi)</option>
                        <option value="+60">🇲🇾 +60 (Malaysia)</option>
                        <option value="+960">🇲🇻 +960 (Maldives)</option>
                        <option value="+223">🇲🇱 +223 (Mali)</option>
                        <option value="+356">🇲🇹 +356 (Malta)</option>
                        <option value="+692">🇲🇭 +692 (Marshall Islands)</option>
                        <option value="+596">🇲🇶 +596 (Martinique)</option>
                        <option value="+222">🇲🇷 +222 (Mauritania)</option>
                        <option value="+230">🇲🇺 +230 (Mauritius)</option>
                        <option value="+52">🇲🇽 +52 (Mexico)</option>
                        <option value="+691">🇫🇲 +691 (Micronesia)</option>
                        <option value="+373">🇲🇩 +373 (Moldova)</option>
                        <option value="+377">🇲🇨 +377 (Monaco)</option>
                        <option value="+976">🇲🇳 +976 (Mongolia)</option>
                        <option value="+382">🇲🇪 +382 (Montenegro)</option>
                        <option value="+1664">🇲🇸 +1664 (Montserrat)</option>
                        <option value="+212">🇲🇦 +212 (Morocco)</option>
                        <option value="+258">🇲🇿 +258 (Mozambique)</option>
                        <option value="+95">🇲🇲 +95 (Myanmar)</option>
                        <option value="+264">🇳🇦 +264 (Namibia)</option>
                        <option value="+674">🇳🇷 +674 (Nauru)</option>
                        <option value="+977">🇳🇵 +977 (Nepal)</option>
                        <option value="+31">🇳🇱 +31 (Netherlands)</option>
                        <option value="+687">🇳🇨 +687 (New Caledonia)</option>
                        <option value="+64">🇳🇿 +64 (New Zealand)</option>
                        <option value="+505">🇳🇮 +505 (Nicaragua)</option>
                        <option value="+227">🇳🇪 +227 (Niger)</option>
                        <option value="+234">🇳🇬 +234 (Nigeria)</option>
                        <option value="+683">🇳🇺 +683 (Niue)</option>
                        <option value="+672">🇳🇫 +672 (Norfolk Island)</option>
                        <option value="+850">🇰🇵 +850 (North Korea)</option>
                        <option value="+1670">🇲🇵 +1670 (Northern Mariana Islands)</option>
                        <option value="+47">🇳🇴 +47 (Norway)</option>
                        <option value="+968">🇴🇲 +968 (Oman)</option>
                        <option value="+92">🇵🇰 +92 (Pakistan)</option>
                        <option value="+680">🇵🇼 +680 (Palau)</option>
                        <option value="+970">🇵🇸 +970 (Palestine)</option>
                        <option value="+507">🇵🇦 +507 (Panama)</option>
                        <option value="+675">🇵🇬 +675 (Papua New Guinea)</option>
                        <option value="+595">🇵🇾 +595 (Paraguay)</option>
                        <option value="+51">🇵🇪 +51 (Peru)</option>
                        <option value="+63">🇵🇭 +63 (Philippines)</option>
                        <option value="+48">🇵🇱 +48 (Poland)</option>
                        <option value="+351">🇵🇹 +351 (Portugal)</option>
                        <option value="+1787">🇵🇷 +1787 (Puerto Rico)</option>
                        <option value="+974">🇶🇦 +974 (Qatar)</option>
                        <option value="+262">🇷🇪 +262 (Réunion)</option>
                        <option value="+40">🇷🇴 +40 (Romania)</option>
                        <option value="+7">🇷🇺 +7 (Russia)</option>
                        <option value="+250">🇷🇼 +250 (Rwanda)</option>
                        <option value="+1758">🇱🇨 +1758 (Saint Lucia)</option>
                        <option value="+508">🇵🇲 +508 (Saint Pierre and Miquelon)</option>
                        <option value="+1784">🇻🇨 +1784 (Saint Vincent and the Grenadines)</option>
                        <option value="+685">🇼🇸 +685 (Samoa)</option>
                        <option value="+378">🇸🇲 +378 (San Marino)</option>
                        <option value="+239">🇸🇹 +239 (São Tomé and Príncipe)</option>
                        <option value="+966">🇸🇦 +966 (Saudi Arabia)</option>
                        <option value="+221">🇸🇳 +221 (Senegal)</option>
                        <option value="+381">🇷🇸 +381 (Serbia)</option>
                        <option value="+248">🇸🇨 +248 (Seychelles)</option>
                        <option value="+232">🇸🇱 +232 (Sierra Leone)</option>
                        <option value="+65">🇸🇬 +65 (Singapore)</option>
                        <option value="+421">🇸🇰 +421 (Slovakia)</option>
                        <option value="+386">🇸🇮 +386 (Slovenia)</option>
                        <option value="+677">🇸🇧 +677 (Solomon Islands)</option>
                        <option value="+252">🇸🇴 +252 (Somalia)</option>
                        <option value="+27">🇿🇦 +27 (South Africa)</option>
                        <option value="+82">🇰🇷 +82 (South Korea)</option>
                        <option value="+211">🇸🇸 +211 (South Sudan)</option>
                        <option value="+34">🇪🇸 +34 (Spain)</option>
                        <option value="+94">🇱🇰 +94 (Sri Lanka)</option>
                        <option value="+249">🇸🇩 +249 (Sudan)</option>
                        <option value="+597">🇸🇷 +597 (Suriname)</option>
                        <option value="+46">🇸🇪 +46 (Sweden)</option>
                        <option value="+41">🇨🇭 +41 (Switzerland)</option>
                        <option value="+963">🇸🇾 +963 (Syria)</option>
                        <option value="+886">🇹🇼 +886 (Taiwan)</option>
                        <option value="+992">🇹🇯 +992 (Tajikistan)</option>
                        <option value="+255">🇹🇿 +255 (Tanzania)</option>
                        <option value="+66">🇹🇭 +66 (Thailand)</option>
                        <option value="+690">🇹🇰 +690 (Tokelau)</option>
                        <option value="+676">🇹🇴 +676 (Tonga)</option>
                        <option value="+1868">🇹🇹 +1868 (Trinidad and Tobago)</option>
                        <option value="+216">🇹🇳 +216 (Tunisia)</option>
                        <option value="+90">🇹🇷 +90 (Turkey)</option>
                        <option value="+993">🇹🇲 +993 (Turkmenistan)</option>
                        <option value="+1649">🇹🇨 +1649 (Turks and Caicos Islands)</option>
                        <option value="+688">🇹🇻 +688 (Tuvalu)</option>
                        <option value="+256">🇺🇬 +256 (Uganda)</option>
                        <option value="+380">🇺🇦 +380 (Ukraine)</option>
                        <option value="+971">🇦🇪 +971 (United Arab Emirates)</option>
                        <option value="+44">🇬🇧 +44 (United Kingdom)</option>
                        <option value="+1">🇺🇸 +1 (United States)</option>
                        <option value="+598">🇺🇾 +598 (Uruguay)</option>
                        <option value="+998">🇺🇿 +998 (Uzbekistan)</option>
                        <option value="+678">🇻🇺 +678 (Vanuatu)</option>
                        <option value="+379">🇻🇦 +379 (Vatican City)</option>
                        <option value="+58">🇻🇪 +58 (Venezuela)</option>
                        <option value="+84">🇻🇳 +84 (Vietnam)</option>
                        <option value="+681">🇼🇫 +681 (Wallis and Futuna)</option>
                        <option value="+967">🇾🇪 +967 (Yemen)</option>
                        <option value="+260">🇿🇲 +260 (Zambia)</option>
                        <option value="+263">🇿🇼 +263 (Zimbabwe)</option>
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 outline-none text-gray-900"
                        placeholder="123 456 7890"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Service of Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 outline-none bg-white text-gray-900"
                    >
                      <option value="">Select a service...</option>
                      <option value="AI Automation Solutions">AI Automation Solutions</option>
                      <option value="Workflow Optimization">Workflow Optimization</option>
                      <option value="Custom Chatbots">Custom Chatbots</option>
                      <option value="AI Consulting">AI Consulting</option>
                      <option value="Custom Service">Custom Service (Please specify in message)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 outline-none resize-none text-gray-900"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary-blue to-accent-gold hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary-blue mb-6">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you're looking to automate existing processes, develop custom AI solutions, 
                or explore the potential of artificial intelligence for your business, we're here to help. 
                Our team of experts will work with you to understand your needs and create tailored solutions.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="bg-white rounded-lg p-6 shadow-md border-l-4 border-accent-gold"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent-gold rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-blue">Email Us</h4>
                    <p className="text-gray-600">hello@minyawi.ai</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="bg-white rounded-lg p-6 shadow-md border-l-4 border-primary-blue"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-blue">Visit Us</h4>
                    <p className="text-gray-600">Remote-First Team<br />Available Worldwide</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="bg-white rounded-lg p-6 shadow-md border-l-4 border-accent-gold"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent-gold rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-blue">Response Time</h4>
                    <p className="text-gray-600">Within 24 hours<br />Business days</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact