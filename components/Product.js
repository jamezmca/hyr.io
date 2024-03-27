import { Poppins } from 'next/font/google';
import React from 'react'
import ActionCard from './ActionCard';
import Background from './Background';
import RegisterBtn from './RegisterBtn';

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '100', '200', '300', '500', '600', '700'] });

const completionSteps = [
    ['Complete your resume', 'fa-solid fa-pen-to-square', 'Fill out your resume in the display below by adding all the sections you feel relevant to your experience; remember to keep your resume to approximately 1 page in length. You can view your resume by selecting the PDF Viewer button beneath, and can print the web page to a PDF that you can save to your local device. Be sure to adjust the print scale to get the perfect PDF fit.'],
    ['Create a cover letter', 'fa-solid fa-scroll', 'Once you have completed your resume, create a new cover letter, completing all the details relevant to the job application. Once you have added in the details in addition to pasting in the job application, you can generate your perfect job specific cover letter and make any final adjustments you feel necessary.'],
    ['Share your link', 'fa-solid fa-share', 'With your resume complete and saved, you can choose to publish your resume and have a live version at your special link. You can share this link with anyone!']
]

const extras = [
    {
        name: "Build your professional resume!",
        duration: '3mins',
        description:
            "Easily create one (or more) professional resumes using our template and save them to your profile.",
    },
    {
        name: "Create cover letters that recruiters love.",
        duration: '1min',
        description:
            "Our AI content writer can generate job specific and personalized cover letters in seconds.",
    },
    // {
    //     name: "Share your link to land your job.",
    //     description:
    //         "Share your personal link to allow anyone to view or download your resume and cover letters.",
    // },
];

export default function Product() {

    return (
        <section className='flex flex-col gap-10 p-4 relative' id='about'>
            {/* <Background type={'white'} /> */}
            <div className="flex flex-col gap-4 relative z-1">
                <div
                    className="mx-auto w-[1.5px] h-12 sm:h-16 md:h-20 bg-gradient-to-b from-transparent to-blue-400"
                />
                <div
                    className="w-10 sm:w-12 aspect-square rounded-full bg-gradient-to-tr from-blue-400 to-cyan-300 mx-auto grid place-items-center"
                >
                    <p className="jetbrains text-white">1</p>
                </div>
                <div className="mx-auto">
                    <h4
                        className="jetbrains text-center font-bold text-4xl sm:text-5xl md:text-6xl text-slate-800  py-4 sm:py-6 md:py-8"
                    >
                        <span className="jetbrains blueGradient">Create</span> Your Resume
                    </h4>
                </div>
                <p
                    className="text-center text-base sm:text-lg md:text-xl max-w-[700px] mx-auto px-8 md:px-0"
                >
                    Effortlessly create and manage your resumes and cover letters in one place.
                </p>
            </div>
            {/* <h4 className='text-center font-semibold text-2xl sm:text-3xl md:text-4xl'>Watch the <span className='blueGradient'>video!</span></h4> */}
            <div className='flex flex-col max-w-[800px] bg-white aspect-video mx-auto w-full relative z-1'>
                <iframe className='w-full h-full' src="https://www.youtube.com/embed/cJ-sByInnHE?si=5fcBy_HbjwJ4diWw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                {/* <iframe className='w-full h-full' src="https://youtu.be/cJ-sByInnHE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
            </div>
            {/* <RegisterBtn /> */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 py-10 mt-10 relative z-1   mx-auto w-full '>
                <div className='absolute z-[0] top-0 h-full left-1/2 -translate-x-1/2 w-[100vw] bg-white dropShadow'>
                </div>
                {extras.map((extra, extraIndex) => {
                    return (
                        <div className='flex flex-col  gap-4 md:gap-x-8 relative z-1 ' key={extraIndex}>
                            <p
                                className="text-3xl pb-2 font-bold sm:text-4xl md:text-5xl text-slate-300"
                            >
                                0{extraIndex + 1}
                            </p>
                            <div className='flex flex-col gap-2 flex-1'>

                                <h3 className=" text-2xl font-light sm:text-3xl md:text-4xl">
                                    {extra.name}
                                </h3>

                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <p>{extra.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-[2px] bg-slate-800  w-8" />
                                    <p className="text-xs sm:text-sm  ">
                                        {extra.duration}
                                    </p>
                                </div>
                            </div>
                        </div>
                        // <div className="flex p-4 flex-col gap-4 border border-solid border-blue-200 rounded-2xl bg-white dropShadow " key={extraIndex}>
                        //     <p className='text-xs text-slate-400 sm:text-sm'>Step 0{extraIndex + 1}</p>
                        //     <h4 className={'text-base sm:text-lg font-medium '}>{extra.name}</h4>
                        //     <p className='text-slate-600'>{extra.description}</p>
                        // </div>
                    )
                })}
            </div>

            {/* <div className='flex flex-col gap-10 max-w-[600px] mx-auto w-full'>
                {extras.map((extra, extraIndex) => {
                    return (
                        <div className="flex items-stretch gap-8" key={extraIndex}>
                            <h6 className={'text-5xl sm:text-6xl md:text-7xl text-slate-400  font-semibold ' + poppins.className}>0{extraIndex + 1}</h6>
                            <div className='flex flex-col gap-4'>
                                <h4 className={'text-xl sm:text-2xl md:text-3xl font-medium '}>{extra.name}</h4>
                                <p className='text-slate-600'>{extra.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div> */}
            {/* <div
                className="flex flex-col gap-8 border-l-[1.5px] border-solid border-white   my-12 sm:my-16 md:my-20"
            >
                {extras.map((extra, extraIndex) => {
                    return (
                        <div className="flex items-center gap-2" key={extraIndex}>
                            <div
                                className="h-[1.5px] bg-white  w-6 sm:w-10 relative"
                            >
                                <div
                                    className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 border-[1.5px] border-solid border-white border-white blueBackground bg-white w-3 aspect-square rounded-full"
                                />
                            </div>
                            <div
                                className="flex flex-col p-4  flex-1 mr-6 sm:mr-10 rounded-lg border-[1.5px] border-solid border-white  gap-4"
                            >
                                <h6 className={'text-xl font-bold opacity-30 ' + poppins.className}>Step 0{extraIndex + 1}</h6>
                                <h6
                                    className="jetbrains font-medium text-2xl sm:text-3xl md:text-4xl"
                                >
                                    {extra.name}
                                </h6>
                                <p className="">{extra.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div> */}
        </section>
    )
}



