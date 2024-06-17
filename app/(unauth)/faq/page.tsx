import React from 'react'

const FAQ = () => {
  return (
<div className=" comforta bg-[#f7f6f2]">
  {/* Container */}
  <div className="mx-auto w-full max-w-7xl px-5 py-20 md:px-10 md:py-24 ">
    {/* Heading */}
    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16">
      <h2 className="mb-4 mt-16 md:mt-4 text-2xl font-extrabold md:text-5xl">Frequently Asked Questions</h2>
      <div className="mx-auto mt-4 max-w-[528px]">
        <p className="text-[#636262]">Find answers to some of the most common questions about our agricultural marketplace.</p>
      </div>
    </div>

    {/* FAQ Items */}
    <div className=" md:px-16 mb-8 grid grid-cols-1 justify-center gap-4 md:mb-12 lg:mb-16 lg:grid-cols-2">
      {/* FAQ Left Col */}
      <div className="w-full">
        <div className="mb-6 w-full rounded-xl bg-white p-8">
          <div className="flex cursor-pointer items-start justify-between">
            <div className="text-xl font-bold">How does the marketplace work?</div>
            <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
              <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
              <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
            </div>
          </div>
          <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
            <p className="tracking-[0.2px]">Our marketplace connects local farmers and vendors with buyers looking for fresh agricultural products. Farmers can list their products, set prices, and manage orders directly through our platform.</p>
          </div>
        </div>
        <div className="mb-6 w-full rounded-xl bg-white p-8">
          <div className="flex cursor-pointer items-start justify-between">
            <div className="text-xl font-bold">What is your policy on distribution?</div>
            <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
              <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
              <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
            </div>
          </div>
          <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
            <p className="tracking-[0.2px]">We ensure that all products are distributed efficiently and safely. Once an order is placed, our logistics team coordinates with the vendors to ensure timely delivery to the buyer&apos;s specified location.</p>
          </div>
        </div>
        <div className="mb-6 w-full rounded-xl bg-white p-8">
          <div className="flex cursor-pointer items-start justify-between">
            <div className="text-xl font-bold">How can I become a vendor on the platform?</div>
            <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
              <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
              <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
            </div>
          </div>
          <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
            <p className="tracking-[0.2px]">To become a vendor, simply sign up on our platform and complete the vendor registration form. Once your application is reviewed and approved, you can start listing your products and reach a wider customer base.</p>
          </div>
        </div>
      </div>
      {/* FAQ Right Col */}
      <div className="w-full">
        <div className="mb-6 w-full rounded-xl bg-white p-8">
          <div className="flex cursor-pointer items-start justify-between">
            <div className="text-xl font-bold">What payment methods do you accept?</div>
            <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
              <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
              <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
            </div>
          </div>
          <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
            <p className="tracking-[0.2px]">We accept various payment methods including credit/debit cards, bank transfers, and mobile money. All transactions are secure and processed through trusted payment gateways.</p>
          </div>
        </div>
        <div className="mb-6 w-full rounded-xl bg-white p-8">
          <div className="flex cursor-pointer items-start justify-between">
            <div className="text-xl font-bold">Can I track my order?</div>
            <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
              <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
              <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
            </div>
          </div>
          <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
            <p className="tracking-[0.2px]">Yes, once your order is confirmed, you can track its status through your account dashboard. We provide regular updates on the processing and delivery status of your order.</p>
          </div>
        </div>
        <div className="mb-6 w-full rounded-xl bg-white p-8">
          <div className="flex cursor-pointer items-start justify-between">
            <div className="text-xl font-bold">What should I do if I receive a damaged product?</div>
            <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
              <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
              <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
            </div>
          </div>
          <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
            <p className="tracking-[0.2px]">If you receive a damaged product, please contact our customer support team within 24 hours of delivery. Provide photos and a description of the issue, and we will assist you with a replacement or refund.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-8 md:mb-12 lg:mb-16"></div>
    <p className="text-center">Can&apos;t find the answer you&apos;re looking for? Reach out to our <a href="mailto:mxagro@gmail.com" className="text-orange-400">customer support team</a>.</p>
  </div>
</div>

  )
}

export default FAQ