import React from 'react'
import InputWrapper from '../InputWrapper'
import DeleteBtn from '../DeleteBtn'

// name: '',
// link: '',
// startDate: '',
// endDate: '',
// location: '',
// notes: [''],
// tools: ['']

export default function Projects(props) {
    const { resumeSections, handleUpdateWork, handleAddWork, handlAddWorkListItem, viewer, handleDeleteProjectSection, deleteProjectListItem } = props
    const work_experience = resumeSections.projects

    if (viewer) {
        return (
            <>
                {work_experience.map((experience, experienceIndex) => {
                    return (
                        <div key={experienceIndex} className='flex flex-col gap-1 group/workItem relative'>
                            <div className='flex items-center justify-between  gap-4'>
                                <p className='unstyled grow text-base  sm:text-lg'  >{experience.name}</p>
                                <p className='unstyled min-w-[80px] text-right'  >{experience.endDate}</p>
                            </div>
                            <div className='flex items-center  gap-4'>
                                <p className='unstyled w-full italic ' >{experience.link}</p>
                            </div>
                            {experience.notes.filter(val => val !== '').map((note, noteIndex) => {
                                return (
                                    <div key={noteIndex} className='flex gap-2 font-light relative group/workItemList'>
                                        <p>•</p>
                                        <p>{note}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </>
        )
    }


    return (
        <>
            {work_experience.map((experience, experienceIndex) => {
                return (
                    <div key={experienceIndex} className='flex flex-col gap-1 group/workItem relative'>
                        <button onClick={() => handleDeleteProjectSection(experienceIndex)} className={'absolute opacity-0  duration-200  px-2 rounded-full aspect-square text-white hover:bg-blue-200 bg-blue-100 right-0 top-0 z-[14] ' + ` group-hover/workItem:opacity-100`}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                        <div className='flex items-center  gap-4'>
                            <input value={experience.name} className='unstyled grow text-base  sm:text-lg' placeholder='Project Name' onChange={(e) => { handleUpdateWork(experienceIndex, 'name', e.target.value) }} />
                            <input value={experience.endDate} onChange={(e) => { handleUpdateWork(experienceIndex, 'endDate', e.target.value) }} className='unstyled min-w-[80px] text-right' placeholder='Sept 2023 - Present' />
                        </div>
                        <div className='flex items-center  gap-4'>
                            <input value={experience.link} onChange={(e) => { handleUpdateWork(experienceIndex, 'link', e.target.value) }} className='unstyled w-full italic ' placeholder='Link / Project URL' />
                        </div>
                        {experience.notes.map((note, noteIndex) => {
                            return (
                                <div key={noteIndex} className='flex gap-2 font-light relative group/workItemList'>
                                    <button onClick={() => deleteProjectListItem(experienceIndex, noteIndex)} className={'absolute opacity-0  duration-200  px-2 rounded-full aspect-square text-white hover:bg-blue-200 bg-blue-100 right-0 top-0 z-[14] ' + ` group-hover/workItemList:opacity-100`}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                    {/* <button className='absolute opacity-0 group-hover/workItemList:opacity-100 duration-200  px-2 rounded-full aspect-square text-white hover:bg-blue-200 bg-blue-100 right-0 top-0 z-[14]'>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button> */}
                                    <p>•</p>
                                    <InputWrapper value={note} multiLine>
                                        <textarea id={`projects_${experienceIndex}_${noteIndex}`} value={note} onChange={(e) => {
                                            let newVal = e.target.value
                                            let newLined = newVal.endsWith('\n')
                                            let newLineIndex = newLined && `projects_${experienceIndex}_${noteIndex + 1}`
                                            console.log('NEW VALUE: ', e.target.value.replaceAll('\n', ''), newLineIndex)
                                            handleUpdateWork(experienceIndex, 'notes', e.target.value.replaceAll('\n', ''), noteIndex, newLineIndex)
                                        }} placeholder='Enter description about project' className='w-full resize-none absolute inset-0 unstyled'></textarea>
                                    </InputWrapper>
                                </div>
                            )
                        })}
                    </div>
                )
            })}


            <button onClick={handleAddWork} className='flex items-center mr-auto justify-center gap-4 border border-solid border-blue-100  px-4 py-2 rounded-full text-xs sm:text-sm text-blue-400 duration-200 hover:opacity-50'>
                <p className=''>Add project</p>
            </button>
        </>

    )
}
