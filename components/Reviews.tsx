import React from "react";

const CustomerReviews = () => {
	return (
		<div className='bg-white py-6 sm:py-8 lg:py-12'>
			<div className='mx-auto max-w-screen-md px-4 md:px-8'>
				<h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12'>
					Customer Reviews
				</h2>

				<div className='mb-4 flex items-center justify-between border-t border-b py-4'>
					<div className='flex flex-col gap-0.5'>
						<span className='block font-bold'>
							Total
						</span>

						{/* stars - start */}
						<div className='-ml-1 flex gap-0.5'>
							{Array.from({ length: 4 }).map(
								(_, index) => (
									<svg
										key={index}
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6 text-yellow-400'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
								)
							)}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 text-gray-300'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
							</svg>
						</div>
						{/* stars - end */}

						<span className='block text-sm text-gray-500'>
							Based on 27 reviews
						</span>
					</div>

					<a
						href='#'
						className='inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base'
					>
						Write a review
					</a>
				</div>

				<div className='divide-y'>
					{/* Review component */}
					{[
						{
							name: "Abubakar Musa",
							date: "August 28, 2025",
							stars: 5,
							text: "The rice I received was of exceptional quality. It was very clean and cooked perfectly. The delivery was swift, and the seller provided excellent customer service. I highly recommend this product.",
						},
						{
							name: "Amina Bello",
							date: "July 21, 2024",
							stars: 4,
							text: "I ordered a 25kg bag of rice, and it arrived in good condition. The rice was clean and free from impurities. There was a slight delay in the delivery, but the quality of the product was worth the wait. I will definitely purchase again.",
						},
						{
							name: "Usman Abdullahi",
							date: "March 16, 2024",
							stars: 5,
							text: "This rice is of top quality. It cooks evenly and has a great taste. The seller was very responsive and answered all my inquiries promptly. I am very satisfied with my purchase and will recommend this seller to others.",
						},
					].map((review, index) => (
						<div
							key={index}
							className='flex flex-col gap-3 py-4 md:py-8'
						>
							<div>
								<span className='block text-sm font-bold'>
									{review.name}
								</span>
								<span className='block text-sm text-gray-500'>
									{review.date}
								</span>
							</div>

							{/* stars - start */}
							<div className='-ml-1 flex gap-0.5'>
								{Array.from({
									length: review.stars,
								}).map((_, starIndex) => (
									<svg
										key={starIndex}
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-yellow-400'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
								))}
							</div>
							{/* stars - end */}

							<p className='text-gray-600'>
								{review.text}
							</p>
						</div>
					))}
					{/* Review component end */}
				</div>
			</div>
		</div>
	);
};

export default CustomerReviews;
