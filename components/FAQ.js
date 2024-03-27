import React from 'react'
import RegisterBtn from './RegisterBtn'

function Question(props) {
    const { question, answer } = props
    console.log(answer.includes('~~'))
    return (
        <div className='flex flex-col gap-2'>
            <h4 className=' font-medium text-lg sm:text-xl md:text-2xl'>{question}</h4>
            {answer.split('~~').map((val, valIndex) => {
                return (
                    <p key={valIndex}>{val}</p>
                )
            })}
        </div>
    )
}

export default function FAQ() {
    return (
        <section className='flex flex-col gap-10 sm:gap-14 md:gap-20 p-4 pt-10 sm:pt-14 md:pt-20 pb-[200px] -mb-32 relative' id='faq'>
            <div className='absolute z-[0] top-0 h-full left-1/2 -translate-x-1/2 w-[100vw] bg-white dropShadow'>
            </div>
            {/* <Background type={'white'} /> */}
            <div className="flex flex-col gap-4 relative z-1">
                <div
                    className="mx-auto w-[1.5px] h-12 sm:h-16 md:h-20 bg-gradient-to-b from-transparent to-blue-400"
                />
                <div
                    className="w-10 sm:w-12 aspect-square rounded-full bg-gradient-to-tr from-blue-400 to-cyan-300 mx-auto grid place-items-center"
                >
                    <p className="jetbrains text-white">3</p>
                </div>
                <div className="mx-auto">
                    <h4
                        className="jetbrains text-center font-bold text-4xl sm:text-5xl md:text-6xl text-slate-800  py-4 sm:py-6 md:py-8"
                    >
                        <span className="jetbrains blueGradient">Land</span> Your Job
                    </h4>
                </div>
                <p
                    className="text-center text-base sm:text-lg md:text-xl max-w-[700px] mx-auto px-8 md:px-0"
                >
                    Frequently Asked Questions
                </p>
            </div>
            {/* <RegisterBtn /> */}

            <div className='flex flex-col z-1 gap-10 sm:gap-14 md:gap-20 relative'>
                <grid className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 sm:gap-y-4 md:gap-14 md:gap-y-8 relative z-1 ">
                    <Question question="Can I make a resume for free?" answer="You absolutely can!~~ Simply sign up and fill out the details of your resume, then hit save and view your masterpiece in our PDF viewer." />
                    <Question question="Can I make AI generated cover letters for free?" answer="Yes to this too! You can trial the in-house generator for free and if you wish to continue for free, you can use the prompt generation system available within the platform." />
                    <Question question="What do I get if I upgrade to a Pro account?" answer="Unlimited cover letter generation, additional resume templates, AI resume reviews and edits, manage additional job applications, access the resume uploader and more!" />
                    <Question question="How much is the Pro subscription?" answer="$5 USD per month!" />
                    <Question question="Can I cancel my subscription any time?" answer="You betcha!" />
                </grid>
            </div>
        </section>
    )
}
