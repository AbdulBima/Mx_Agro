import React from 'react'

const TermsAndConditions = () => {
  return (
    <section>
      <div className="comforta py-20  flex flex-col items-center justify-center px-5 md:px-10">
        {/* Title Container */}
        <div className="flex h-auto min-w-[100vw] flex-col items-center justify-end bg-transparent py-6 md:h-64">
          <div className="flex flex-col items-center gap-y-4 py-5">
            <h1 className="text-3xl font-bold md:text-5xl">TERMS OF SERVICE</h1>
            <p className="text-sm text-[#808080] sm:text-base">Last Updated as of October 17, 2024</p>
          </div>
        </div>
        {/* Content Container */}
        <div className="mx-auto w-full max-w-5xl py-12 md:py-20">
          {/* Component */}
          <div className="flex flex-col items-center gap-y-14">
            <p className="max-w-3xl text-center text-sm sm:text-base">
              Welcome to MxAgro, your trusted multivendor agricultural product ecommerce store. These terms and conditions govern your use of our platform and services. By accessing and using MxAgro, you agree to comply with and be bound by these terms.
            </p>
            <div className="flex min-w-full flex-col gap-y-10">
              <div className="flex min-w-full py-4 border-b border-gray-200">
                <h6 className="text-base font-bold">GENERAL TERMS & CONDITIONS</h6>
              </div>
              <div className="flex flex-col gap-y-10">
                <div className="flex min-w-full flex-col items-start gap-y-6">
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-lg text-black font-extrabold">SERVICES</p>
                    <p className="text-sm">
                      MxAgro offers a comprehensive range of agricultural products from various vendors, including cereals, tubers, vegetables, and processed goods. Our platform ensures a seamless and secure shopping experience tailored to the agricultural community.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-lg text-black font-extrabold">CLIENT RESPONSIBILITIES</p>
                    <p className="text-sm">
                      As a user, you agree to provide accurate and timely information necessary for the completion of your transactions. You are responsible for ensuring that your use of the platform does not violate any laws or regulations.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-lg text-black font-extrabold">INTELLECTUAL PROPERTY</p>
                    <p className="text-sm">
                      All content, including product listings, images, and descriptions, on MxAgro is protected by intellectual property laws. You may not use any content without proper authorization.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-lg text-black font-extrabold">PAYMENT</p>
                    <p className="text-sm">
                      Payments for products purchased on MxAgro must be made through the available payment methods on our platform. We ensure secure and reliable payment processing.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-lg text-black font-extrabold">CONFIDENTIALITY</p>
                    <p className="text-sm">
                      We value your privacy and are committed to protecting your personal information. All data collected during your use of our platform will be handled in accordance with our Privacy Policy.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-lg text-black font-extrabold">LIMITATION OF LIABILITY</p>
                    <p className="text-sm">
                      MxAgro is not liable for any indirect, incidental, or consequential damages arising from your use of our platform. Our liability is limited to the amount paid for the products purchased.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-lg text-black font-extrabold">TERMINATION</p>
                    <p className="text-sm">
                      We reserve the right to terminate your access to MxAgro if you violate these terms. Upon termination, you will remain responsible for any pending transactions.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-lg text-black font-extrabold">GOVERNING LAW</p>
                    <p className="text-sm">
                      These terms are governed by the laws of Nigeria. Any disputes arising from your use of MxAgro will be subject to the exclusive jurisdiction of the courts of Nigeria.
                    </p>
                  </div>
                </div>
                <div className="min-h-[1px] min-w-full bg-[#e2e2e2]"></div>
                <p className="text-sm">
                  By using MxAgro, you acknowledge that you have read, understood, and agree to these Terms of Service. We may update these terms from time to time, and your continued use of our platform constitutes acceptance of any changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsAndConditions
