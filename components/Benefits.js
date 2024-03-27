import React from 'react'
import Background from './Background'
import RegisterBtn from './RegisterBtn'

function Card(props) {
    const { title, description, icon } = props
    return (
        <div className='flex flex-col group gap-4 relative overflow-hidden p-1 flex-1 rounded-2xl border border-blue-200 hover:border-blue-300 duration-200 p-4 sm:p-8 border-solid text-center bg-white'>
            <div className='p-2 text-6xl mx-auto w-fit rounded-full px-2 aspect-square   flex items-center justify-center'>
                <i className={'blueGradient ' + icon} />
            </div>
            <h4 className=' text-base sm:text-lg md:text-xl font-medium'>
                {title}
            </h4>
            <p>{description}</p>
        </div>
    )
}

export default function Benefits() {
    return (
        <section className='relative '>
            {/* <Background type={'dark'} /> */}
            <div className='flex flex-col z-[1] relative gap-10 sm:gap-14 md:gap-20 px-4 '>
                <div className="flex flex-col gap-4">
                    <div
                        className="mx-auto w-[1.5px] h-12 sm:h-16 md:h-20 bg-gradient-to-b from-transparent to-blue-400"
                    />
                    <div
                        className="w-10 sm:w-12 aspect-square rounded-full bg-gradient-to-tr from-blue-400 to-cyan-300 mx-auto grid place-items-center"
                    >
                        <p className="jetbrains text-white">2</p>
                    </div>
                    <div className="mx-auto">
                        <h4
                            className="jetbrains text-center font-bold text-4xl sm:text-5xl md:text-6xl   py-4 sm:py-6 md:py-8"
                        >
                            <span className=" blueGradient">Craft</span> Your Application
                        </h4>
                    </div>
                    <p
                        className="text-center text-base sm:text-lg md:text-xl max-w-[700px] mx-auto px-8 md:px-0"
                    >
                        Create job applications that recruiters love to see!
                    </p>
                </div>
                <RegisterBtn />
                <div className='flex flex-col gap-4 sm:gap-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8'>
                        <Card icon={'fa-solid fa-gears'} title={'AI Content Writer'} description={'Automatically create job specific cover letters in seconds.'} />
                        <Card icon={'fa-solid fa-upload'} title={'Resume Reader'} description={'Upload your resume and have it professionally revised.'} />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8'>
                        <Card icon={'fa-solid fa-chart-simple'} title={'ATS-Optimized'} description={'Easily create a fully ATS-Optimized resume in a few clicks.'} />
                        <Card icon={'fa-solid fa-list-check'} title={'Application Tracker'} description={'Manage all your active job applications in one place.'} />
                        <Card icon={'fa-solid fa-id-card'} title={'Modern Templates'} description={'Our newest resume template developed with clean lines and high content density.'} />
                    </div>
                </div>
                <div className='flex flex-col gap-8 pt-6 w-full'>
                    <h4 className='text-center font-semibold text-2xl sm:text-3xl md:text-4xl'>The <span className='blueGradient'>Complete</span> Package</h4>
                    <div className='flex flex-col overflow-x-scroll'>
                        <table className='bg-white text-slate-700 rounded-2xl overflow-hidden text-center'>
                            <thead className={'border-b border-solid border-slate-200  '}>
                                <tr className=''>
                                    <th></th>
                                    <th className='min-w-[32] px-4 whitespace-nowrap'>Solo</th>
                                    <th className='min-w-[32] px-4 whitespace-nowrap'>Competitor A</th>
                                    <th className='min-w-[32] px-4 whitespace-nowrap'>Competitor B</th>
                                    <th className='blueBackground text-white py-4  min-w-[32] px-4 whitespace-nowrap'>Hyr.sh</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b border-solid border-slate-200'>
                                    <td className='border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm'>Effortless</td>
                                    <td><i className="fa-solid fa-xmark text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-xmark text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-green-500"></i></td>
                                </tr>
                                <tr className='border-b border-solid border-slate-200'>
                                    <td className='border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm'>Personalized</td>
                                    <td><i className="fa-solid fa-xmark text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-green-500"></i></td>
                                </tr>
                                <tr>
                                    <td className='border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm'>Job Specific</td>
                                    <td><i className="fa-solid fa-check text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-xmark text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-green-500"></i></td>
                                </tr>
                                <tr className='border-t border-solid border-slate-200'>
                                    <td className='border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm'>Affordable</td>
                                    <td><i className="fa-solid fa-check text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-xmark text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-slate-500"></i></td>
                                    <td><i className="fa-solid fa-check text-green-500"></i></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </section>
    )
}
