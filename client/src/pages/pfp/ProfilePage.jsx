// import React from 'react'

function ProfilePage() {
  return (
    <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover col-span-10">
			<div
				id="profile"
				className="w-full lg:w-3/5 mx-auto rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white"
			>
				<div className="p-8 md:p-12">
					<div className="grid grid-cols-2 gap-x-8 gap-y-6">
						{/* Profile Picture */}
						<div className="col-span-2 flex justify-center items-center">
							<div className="relative group">
								<img
									src="https://source.unsplash.com/MP0IUfwrn0A"
									alt=" Profile"
									className="rounded-full shadow-xl h-32 w-32 object-cover"
								/>
								<label
									htmlFor="profile-picture"
									className="absolute top-0 right-0 bg-white rounded-full p-2 shadow-md transform transition duration-300 group-hover:scale-110 cursor-pointer"
								>
									<svg
										className="h-6 w-6 text-gray-700"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 19.07v1.42c0 .75.59 1.32 1.32 1.32H8.6c.75 0 1.32-.59 1.32-1.32v-1.42m-1.94-1.07l14.1-14.1a2 2 0 00-2.83-2.83l-14.1 14.1a2 2 0 102.83 2.83zM14 13l6.07-6.07"
										/>
									</svg>
									<input
										id="profile-picture"
										type="file"
										className="hidden"
										// onChange={(e) =>
										// 	setProfilePicture(
										// 		URL.createObjectURL(
										// 			e.target.files[0]
										// 		)
										// 	)
										// }
										accept="image/*"
									/>
								</label>
							</div>
						</div>
						{/* Profile Details */}
						<div>
							<label className="block text-sm font-semibold text-rose-500">
								Name
							</label>
							<p className="mt-1">Nishita</p>
						</div>
						<div>
							<label className="block text-sm font-semibold text-rose-500">
								Phone Number
							</label>
							<p className="mt-1">9987806147</p>
						</div>
						{/* <div>
							<label className="block text-sm font-semibold text-rose-500">
								Skills
							</label>
							<ul className="list-disc list-inside">
								{profileData.skills.map((skill, index) => (
									<li key={index}>{skill}</li>
								))}
							</ul>
						</div> */}
						<div>
							<label className="block text-sm font-semibold text-rose-500">
								College
							</label>
							<p className="mt-1">Sardar patel institute of technology</p>
						</div>
						<div>
							<label className="block text-sm font-semibold text-rose-500">
								Year of Passing
							</label>
							<p className="mt-1">2026</p>
						</div>
						<div>
							<label className="block text-sm font-semibold text-rose-500">
								Program of Study
							</label>
							<p className="mt-1">B.Tech</p>
						</div>
						{/* <div className="col-span-2">
							<label className="block text-sm font-semibold text-rose-500">
								Academic Interests
							</label>
							<ul className="list-disc list-inside">
								{profileData.academicInterests.map(
									(interest, index) => (
										<li key={index}>{interest}</li>
									)
								)}
							</ul>
						</div> */}
						<div className="col-span-2">
							<label className="block text-sm font-semibold text-rose-500">
								Placements or Higher Studies
							</label>
							<p className="mt-1">Empty Array</p>
						</div>
						<div className="col-span-2 flex justify-center">
							<button
								// onClick={handleEditProfileData}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
							>
								Edit Details
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default ProfilePage
