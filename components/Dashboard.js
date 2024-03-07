'use client'
import { useAuth } from '@/context/AuthContext';
import { Poppins, Open_Sans } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import GraphicDisplay from './GraphicDisplay';
import Bio from './Layouts/Bio';
import Education from './Layouts/Education';
import WorkExperience from './Layouts/WorkExperience';
import Skills from './Layouts/Skills';
import Projects from './Layouts/Projects';
import SectionWrapper from './Layouts/SectionWrapper';
import Login from './Login';
import { deleteField, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Link from 'next/link';
import ActionCard from './ActionCard';
import LogoFiller from './LogoFiller';
import sortResumeSections from '@/utils';
import Modal from './Modal';
import Button from './Button';
import { useRouter } from 'next/navigation';
const poppins = Poppins({ subsets: ["latin"], weight: ['400', '100', '200', '300', '500', '600', '700'] });
const opensans = Open_Sans({
    subsets: ["latin"], weight: ['400', '300', '500', '600', '700'], style: ['normal', 'italic'],
});

const completionSteps = [
    ['Complete your resume', 'fa-solid fa-pen-to-square', 'Fill out your resume in the display below by adding all the sections you feel relevant to your experience; remember to keep your resume to approximately 1 page in length. You can view your resume by selecting the PDF Viewer button beneath, and can print the web page to a PDF that you can save to your local device. Be sure to adjust the print scale to get the perfect PDF fit.'],
    ['Create a cover letter', 'fa-solid fa-scroll', 'Once you have completed your resume, create a new cover letter, completing all the details relevant to the job application. Once you have added in the details in addition to pasting in the job application, you can generate your perfect job specific cover letter and make any final adjustments you feel necessary.'],
    // ['Share your link', 'fa-solid fa-share', 'With your resume complete and saved, you can choose to publish your resume and have a live version at your special link. You can share this link with anyone!']
]

const sectionTemplates = {
    bio: '',
    education: [
        {
            institution: '',
            qualification: '',
            startDate: '',
            endDate: '',
            location: '',
            notes: ['']
        }
    ],
    work_experience: [
        {
            company: '',
            role: '',
            startDate: '',
            endDate: '',
            location: '',
            notes: [''],
            tools: ['']
        }
    ],
    skills: [{ genre: '', list: '' }],
    projects: [
        {
            name: '',
            link: '',
            startDate: '',
            endDate: '',
            location: '',
            notes: [''],
            tools: ['']
        }
    ]
}

export default function Dashboard() {

    const [completedSteps, setCompletedSteps] = useState([])
    let defaultUserData = { name: '', email: '', website: '', location: '' }
    const [userData, setUserData] = useState(defaultUserData)
    const [changedData, setChangedData] = useState(false)
    const [resumeSections, setResumeSections] = useState({})
    const [addSection, setAddSection] = useState(false)
    const [showModal, setShowModal] = useState(null)
    const [coverletterToDelete, setCoverletterToDelete] = useState('')
    const [instruction, setInstruction] = useState(null)
    const [savingUserDetails, setSavingUserDetails] = useState(false)
    const [savingResume, setSavingResume] = useState(false)
    const [publishingResume, setPublishingResume] = useState(false) // show in modal
    const [nextFocusElement, setNextFocusElement] = useState(null)

    const router = useRouter()

    const { currentUser, loading, userDataObj, setUserDataObj, isPaid } = useAuth()
    let numberOfLetters = Object.keys(userDataObj?.coverLetters || {}).length

    const placeHolders = {
        name: 'Jobby McJobface', email: 'jobby@mcface.com', website: 'www.jobbymcjobface.com', location: 'City, Country'
    }

    function updateUserData(type, val) {
        setUserData({ ...userData, [type]: val })
        setChangedData(true)
    }

    async function handleSaveDetails() {
        if (savingUserDetails) { return }

        try {
            setSavingUserDetails(true)
            let newData = { ...userDataObj, userData }
            localStorage.setItem('hyr', JSON.stringify(newData))
            setChangedData(false)
            setUserDataObj(newData)
            const userRef = doc(db, 'users', currentUser.uid);
            const res = await setDoc(userRef, { userData }, { merge: true });
            console.log(res)
        } catch (err) {
            console.log('Failed to save data\n', err.message)
        } finally {
            setSavingUserDetails(false)
        }
    }

    function handleCancelDetails() {
        let currUserData = userDataObj.userData || defaultUserData
        setUserData(currUserData)
        setChangedData(false)
    }

    function moveSection(section, increment) {
        let listOfSections = Object.keys(resumeSections)
        let currIndex = listOfSections.indexOf(section)
        if ((currIndex + increment) < 0 || (currIndex + increment) > listOfSections.length - 1) {
            return
        }
        //swap list items

        let temp = listOfSections[currIndex + increment]
        listOfSections[currIndex + increment] = listOfSections[currIndex]
        listOfSections[currIndex] = temp

        //rebuild resume data from new ordered list
        let newObj = {}
        listOfSections.forEach(subSection => {
            newObj[subSection] = resumeSections[subSection]
        })
        setResumeSections(newObj)
    }

    function handleDeleteSection(s) {
        // deletes the entire section
        let newObj = { ...resumeSections }
        delete newObj[s]
        setResumeSections(newObj)
    }


    // BIO CRUD FUNCTIONS

    function handleUpdateBio(newVal) {
        setResumeSections({ ...resumeSections, bio: newVal })
    }


    // WORK EXPERIENCE CRUD FUNCTIONS

    function handleUpdateWork(index, key, newVal, newValIndex, newLine) {
        let newInfo
        if (['notes', 'tools'].includes(key)) {
            newInfo = [...resumeSections.work_experience[index][key]]
            newInfo[newValIndex] = newVal
            if (newLine) {
                newInfo = [...newInfo.slice(0, newValIndex + 1), '', ...newInfo.slice(newValIndex + 1)]
            }
        } else {
            newInfo = newVal
        }
        let newObj = { ...resumeSections.work_experience[index], [key]: newInfo }
        let newArray = [...resumeSections.work_experience]
        newArray[index] = newObj
        setResumeSections(curr => {
            return { ...resumeSections, work_experience: newArray }
        })

        if (newLine) {
            setNextFocusElement(newLine)
        }
    }

    function handleAddWork() {
        let newWork = [...resumeSections.work_experience, {
            company: '',
            role: '',
            startDate: '',
            endDate: '',
            location: '',
            notes: [''],
            tools: ['']
        }]
        setResumeSections({ ...resumeSections, work_experience: newWork })
    }
    function handlAddWorkListItem(index, key, newVal) {
        let newInfo
        if (!['notes', 'tools'].includes(key)) {
            return
        }
        newInfo = [...resumeSections.work_experience[index][key], '']
        let newObj = { ...resumeSections.work_experience[index], [key]: newInfo }
        let newArray = [...resumeSections.work_experience]
        newArray[index] = newObj
        setResumeSections({ ...resumeSections, work_experience: newArray })
    }

    function handleDeleteWorkSection(index) {
        // deletes a work experience item
        let newWorkExperienceList = resumeSections.work_experience.filter((val, valIndex) => {
            return valIndex !== index
        })
        setResumeSections(curr => ({ ...curr, work_experience: newWorkExperienceList }))
    }


    function deleteWorkListItem(workIndex, itemIndex) {
        // deletes a description item
        let newWorkExperienceList = resumeSections.work_experience
        let newNotesList = newWorkExperienceList[workIndex].notes.filter((val, valIndex) => {
            return itemIndex !== valIndex
        })
        newWorkExperienceList[workIndex].notes = newNotesList
        setResumeSections({ ...resumeSections, work_experience: newWorkExperienceList })
    }


    // PROJECT CRUD FUNCTIONS

    function handleUpdateProject(index, key, newVal, newValIndex, newLine) {
        let newInfo
        if (['notes', 'tools'].includes(key)) {
            newInfo = [...resumeSections.projects[index][key]]
            newInfo[newValIndex] = newVal
            if (newLine) {
                newInfo = [...newInfo.slice(0, newValIndex + 1), '', ...newInfo.slice(newValIndex + 1)]
            }
        } else {
            newInfo = newVal
        }
        let newObj = { ...resumeSections.projects[index], [key]: newInfo }
        let newArray = [...resumeSections.projects]
        newArray[index] = newObj
        setResumeSections({ ...resumeSections, projects: newArray })
        if (newLine) {
            setNextFocusElement(newLine)
        }
    }

    function handleAddProject() {
        let newWork = [...resumeSections.projects, {
            name: '',
            link: '',
            startDate: '',
            endDate: '',
            location: '',
            notes: [''],
            tools: ['']
        }]
        setResumeSections({ ...resumeSections, projects: newWork })
    }

    function handlAddProjectListItem(index, key, newVal) {
        let newInfo
        if (!['notes', 'tools'].includes(key)) {
            return
        }
        newInfo = [...resumeSections.projects[index][key], '']
        let newObj = { ...resumeSections.projects[index], [key]: newInfo }
        let newArray = [...resumeSections.projects]
        newArray[index] = newObj
        setResumeSections({ ...resumeSections, projects: newArray })
    }

    function handleDeleteProjectSection(index) {
        // deletes a work experience item
        let newWorkExperienceList = resumeSections.projects.filter((val, valIndex) => {
            return valIndex !== index
        })
        setResumeSections(curr => ({ ...curr, projects: newWorkExperienceList }))
    }


    function deleteProjectListItem(workIndex, itemIndex) {
        // deletes a description item
        let newWorkExperienceList = resumeSections.projects
        let newNotesList = newWorkExperienceList[workIndex].notes.filter((val, valIndex) => {
            return itemIndex !== valIndex
        })
        newWorkExperienceList[workIndex].notes = newNotesList
        setResumeSections({ ...resumeSections, projects: newWorkExperienceList })
    }

    // EDUCATION CRUD FUNCTIONS


    function handleUpdateEducation(index, key, newVal, newValIndex, newLine) {
        let newInfo
        if (['notes', 'tools'].includes(key)) {
            newInfo = [...resumeSections.education[index][key]]
            newInfo[newValIndex] = newVal
            if (newLine) {
                newInfo = [...newInfo.slice(0, newValIndex + 1), '', ...newInfo.slice(newValIndex + 1)]
            }
        } else {
            newInfo = newVal
        }
        let newObj = { ...resumeSections.education[index], [key]: newInfo }
        let newArray = [...resumeSections.education]
        newArray[index] = newObj
        setResumeSections(curr => {
            return { ...resumeSections, education: newArray }
        })

        if (newLine) {
            setNextFocusElement(newLine)
        }

    }

    function handleAddEducation() {
        let newWork = [...resumeSections.education, sectionTemplates.education[0]]
        setResumeSections({ ...resumeSections, education: newWork })
    }

    function handleDeleteEducationSection(index) {
        // deletes a work experience item
        let newWorkExperienceList = resumeSections.education.filter((val, valIndex) => {
            return valIndex !== index
        })
        setResumeSections(curr => ({ ...curr, education: newWorkExperienceList }))
    }

    function handlAddEducationListItem(index, key, newVal) {
        let newInfo
        if (!['notes', 'tools'].includes(key)) {
            return
        }
        newInfo = [...resumeSections.education[index][key], '']
        let newObj = { ...resumeSections.education[index], [key]: newInfo }
        let newArray = [...resumeSections.education]
        newArray[index] = newObj
        setResumeSections({ ...resumeSections, education: newArray })
    }

    function deleteEducationListItem(workIndex, itemIndex) {
        // deletes a description item
        let newWorkExperienceList = resumeSections.education
        let newNotesList = newWorkExperienceList[workIndex].notes.filter((val, valIndex) => {
            return itemIndex !== valIndex
        })
        newWorkExperienceList[workIndex].notes = newNotesList
        setResumeSections({ ...resumeSections, education: newWorkExperienceList })
    }

    // SKILLS CRUD FUNCTIONS


    function handleUpdateSkills(index, value) {
        let newObj = { ...resumeSections.skills[index], list: value }
        let newBigArr = [...resumeSections.skills]
        newBigArr[index] = newObj
        setResumeSections({ ...resumeSections, skills: newBigArr })
    }

    function handleUpdateGenre(index, genre) {
        let newObj = { ...resumeSections.skills[index], genre }
        let newBigArr = [...resumeSections.skills]
        newBigArr[index] = newObj
        setResumeSections({ ...resumeSections, skills: newBigArr })
    }

    function handleAddSkillset() {
        let newBigArr = [...resumeSections.skills, { genre: '', list: '' }]
        setResumeSections({ ...resumeSections, skills: newBigArr })
    }

    function deleteSkillsRow(index) {
        let newBigArr = resumeSections.skills.filter((val, valIndex) => { return valIndex !== index })
        setResumeSections({ ...resumeSections, skills: newBigArr })
    }


    async function handleSaveResume() {
        if (savingResume) { return }
        try {
            setSavingResume(true)
            let newData = { ...userDataObj, resumeSections }
            setUserDataObj(curr => ({ ...curr, resumeSections }))
            localStorage.setItem('hyr', JSON.stringify(newData))
            const userRef = doc(db, 'users', currentUser.uid);
            const res = await setDoc(userRef, { resumeSections }, { merge: true });
            console.log(res)
        } catch (err) {
            console.log('Failed to save data\n', err.message)
        } finally {
            setSavingResume(false)
        }
    }

    function handleCreateCoverLetter() {
        if (numberOfLetters >= 20) {
            // shouldn't be displaying button
            return
        }
        if (isPaid) {
            router.push('/admin/application')
            return
        }

        if (numberOfLetters >= 3) {
            // prompt to upgrade account
            setShowModal('coverletters')
            return
        }
        router.push('/admin/application')
    }

    async function handleDeleteCoverLetter() {
        if (!coverletterToDelete || !(coverletterToDelete in userDataObj.coverLetters)) { return }
        let newCoverlettersObj = { ...userDataObj.coverLetters }
        delete newCoverlettersObj[coverletterToDelete]
        try {
            // write to fire base
            const userRef = doc(db, 'users', currentUser.uid);
            const res = await setDoc(userRef, {
                coverLetters: {
                    [coverletterToDelete]: deleteField()
                }
            }, { merge: true });
            let newDataObj = { ...userData, coverLetters: newCoverlettersObj }

            // update local userdata and set to local storage
            setUserDataObj(newDataObj)
            localStorage.setItem('hyr', JSON.stringify(newDataObj))
        } catch (err) {
            console.log('Failed to delete cover letter', err.message)
        } finally {
            setShowModal(null)
            setCoverletterToDelete('')
        }
    }

    useEffect(() => {
        if (!nextFocusElement) {
            return
        }
        document.getElementById(nextFocusElement) && document.getElementById(nextFocusElement).focus()
        setNextFocusElement(null)
    }, [nextFocusElement])

    useEffect(() => {
        if (!userDataObj) { return }
        const { userData: localUserData, resumeSections: localResumeSections } = userDataObj
        localUserData && setUserData(localUserData)

        if (localResumeSections?.education && !Array.isArray(localResumeSections?.education)) {
            console.log('Education needs to be updated - obj to arr of objs')
            async function makeEducationArray() {
                let newData = { ...userDataObj, resumeSections: { ...localResumeSections, education: [localResumeSections?.education || sectionTemplates.education] } }
                try {
                    setUserDataObj(curr => ({ ...curr, resumeSections: newData.resumeSections }))
                    localStorage.setItem('hyr', JSON.stringify(newData))
                    const userRef = doc(db, 'users', currentUser.uid);
                    const res = await setDoc(userRef, { resumeSections: newData.resumeSections }, { merge: true });
                    console.log(res)
                } catch (err) {
                    console.log('Failed to save data\n', err.message)
                } finally {
                }
                setResumeSections(curr => {
                    return (newData.resumeSections)
                })
            }
            makeEducationArray()
        } else {
            localResumeSections && setResumeSections(localResumeSections)
        }
    }, [currentUser.uid, setUserDataObj, userDataObj])

    const modalContent = {
        coverletters: (
            <div className='flex flex-1 flex-col gap-4'>
                <p className='font-medium text-lg sm:text-xl md:text-2xl'>Cover letter limit reached! 🔥</p>
                <p>Free accounts can manage up to 3 active cover letters.</p>
                <p className=''><i>Please either delete some cover letters, or upgrade your account to continue.</i></p>
                <p className='flex-1'>Upgrading your account allows you to manage up to <b>20</b>  concurrent cover letters and job applications, and gives you access to auto <b> cover letter generation.</b></p>
                <div className='flex items-center gap-4'>
                    <button onClick={() => { setShowModal(null) }} className=' w-fit p-4 rounded-full mx-auto bg-white border border-solid border-blue-100 px-8 duration-200 hover:opacity-60'>Go back</button>
                    <Button text={'Upgrade Account ⭐️'} clickHandler={() => { router.push('/admin/billing') }} />
                </div>
            </div>
        ),
        publishing: (
            <div></div>
        ),
        deleteCoverletter: (
            <div>
                <div className='flex flex-1 flex-col gap-4'>
                    <p className='font-medium text-lg sm:text-xl md:text-2xl'>Are you sure you want to delete this cover letter and application?</p>
                    <p className=''><i>Deleting a cover letter is permanent!</i></p>
                    <p className='flex-1 capitalize'><b>Name</b> {coverletterToDelete.replaceAll('_', ' ')}</p>
                    <div className='flex items-center gap-4'>
                        <button onClick={() => { setShowModal(null) }} className=' p-4 rounded-full mx-auto bg-white border border-solid border-blue-100 text-blue-400  px-8 duration-200 hover:opacity-60'>Go back</button>
                        <button onClick={handleDeleteCoverLetter} className=' flex-1 p-4 text-pink-400 rounded-full mx-auto bg-white border border-solid border-pink-400 px-8 duration-200 hover:opacity-60'>Confirm Delete</button>
                        {/* <Button text={'Upgrade Account ⭐️'} clickHandler={() => { router.push('/admin/billing') }} /> */}
                    </div>
                </div>
            </div>
        )
    }

    const sections = {
        bio: <Bio val={resumeSections.bio} setVal={handleUpdateBio} handleDeleteSection={handleDeleteSection} />,
        education: <Education handleDeleteEducationSection={handleDeleteEducationSection} handleAddWork={handleAddEducation} deleteEducationListItem={deleteEducationListItem} resumeSections={resumeSections} handleUpdateWork={handleUpdateEducation} handlAddWorkListItem={handlAddEducationListItem} />,
        work_experience: <WorkExperience deleteWorkListItem={deleteWorkListItem} handleDeleteWorkSection={handleDeleteWorkSection} resumeSections={resumeSections} handleUpdateWork={handleUpdateWork} handleAddWork={handleAddWork} handlAddWorkListItem={handlAddWorkListItem} />,
        skills: <Skills deleteSkillsRow={deleteSkillsRow} handleAddWork={handleAddSkillset} resumeSections={resumeSections} handleUpdateSkills={handleUpdateSkills} handleUpdateGenre={handleUpdateGenre} />,
        projects: <Projects handleDeleteProjectSection={handleDeleteProjectSection}
            deleteProjectListItem={deleteProjectListItem} resumeSections={resumeSections} handleUpdateWork={handleUpdateProject} handleAddWork={handleAddProject} handlAddWorkListItem={handlAddProjectListItem} />
    }



    return (
        <>
            {showModal && (
                <Modal handleCloseModal={() => { setShowModal(null) }}>
                    {modalContent[showModal]}
                </Modal>
            )}
            <div className='flex flex-col gap-8 flex-1'>
                <ActionCard title={'Setup your Hyr.sh page'}>
                    <div className='flex items-stretch overflow-x-scroll gap-4 '>
                        {completionSteps.map((step, stepIndex) => {
                            return (
                                <button onClick={() => {
                                    if (instruction === `${stepIndex}`) {
                                        setInstruction(null)
                                        return
                                    }
                                    setInstruction(`${stepIndex}`)
                                }} className={'flex items-center  duration-200 group gap-4 p-2 pr-4 rounded-full border border-solid  ' + (stepIndex == instruction ? ' border-blue-400' : ' border-blue-100 hover:border-blue-400')} key={stepIndex}>
                                    <div className={'px-2 aspect-square rounded-full grid duration-200 place-items-center  text-white ' + (stepIndex == instruction ? ' bg-blue-400' : ' bg-blue-200 group-hover:bg-blue-400')}>
                                        <i className={step[1]} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-xs text-left'>Step {stepIndex + 1}</p>
                                        <p className='whitespace-nowrap'>{step[0]}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    {instruction && (<ul className='flex list-disc rounded-2xl list-inside flex-col  '>
                        {completionSteps[instruction][2].split('. ').map((element, elementIndex) => {
                            return (
                                <li key={elementIndex} className='text-slate-600'>{element.replaceAll('.', '')}.</li>

                            )
                        })}
                    </ul>)}
                </ActionCard>
                <ActionCard title={'User Details'} actions={changedData && (
                    <div className='grid grid-cols-2 gap-2 sm:gap-4'>
                        <button onClick={handleCancelDetails} className='flex items-center justify-center gap-4 border border-solid border-blue-100  px-4 py-2 rounded-full text-xs sm:text-sm text-blue-400 duration-200 hover:opacity-50'>
                            <p className=''>Cancel</p>
                        </button>
                        <button onClick={handleSaveDetails} className='flex items-center justify-center gap-4 bg-blue-50 px-3 py-2 rounded-full text-xs sm:text-sm text-blue-400 duration-200 hover:opacity-50'>
                            <p className=''>{savingUserDetails ? "Saving" : 'Save'}</p>
                        </button>
                    </div>
                )}>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 '>
                        {Object.keys(userData).map((entry, entryIndex) => {
                            return (
                                <div className='flex items-center gap-4' key={entryIndex}>
                                    <p className=' capitalize font-medium w-24 sm:w-32'>{entry}</p>
                                    <input
                                        className='bg-transparent w-full outline-none border-none'
                                        placeholder={placeHolders[entry]}
                                        value={userData[entry]}
                                        onChange={(e) => updateUserData(entry, e.target.value)} />
                                </div>
                            )
                        })}
                    </div>
                </ActionCard>
                <ActionCard title={'Cover Letters'} actions={numberOfLetters >= 20 ? null : (
                    <div className='flex items-center gap-4'>
                        {numberOfLetters < 20 && (
                            <Button text={'Create new'} clickHandler={handleCreateCoverLetter} sm icon={<i className="fa-regular fa-pen-to-square"></i>} />

                            // <button onClick={handleCreateCoverLetter} className='flex items-center justify-center gap-4 border border-solid border-blue-100  px-4 py-2 rounded-full text-xs sm:text-sm text-blue-400 duration-200 hover:opacity-50'>
                            //     <p className=''>Create new</p>
                            // </button>
                        )}
                    </div>
                )}>
                    {(Object.keys(userDataObj?.coverLetters || {}) || []).length > 0 ? (
                        <div className='flex flex-col gap-2 overflow-x-scroll'>
                            <div className='grid grid-cols-4 shrink-0'>
                                {['name', 'company', 'status', 'application'].map((label, labelIndex) => {
                                    return (
                                        <div key={labelIndex} className='p-1 capitalize px-2 text-xs sm:text-sm font-medium'>
                                            <p className='truncate'>{label}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            {(Object.keys(userDataObj?.coverLetters || {}) || []).map((coverLetterName, coverLetterIndex) => {
                                const coverLetter = userDataObj?.coverLetters?.[coverLetterName] || {}
                                const { applicationMeta, jobPosting, application } = coverLetter
                                return (
                                    <div className='flex flex-col relative group ' key={coverLetterIndex}>
                                        <button onClick={() => {
                                            setCoverletterToDelete(coverLetterName)
                                            setShowModal('deleteCoverletter')
                                        }} className='flex items-center justify-center gap-4 rounded-full text-xs sm:text-sm text-pink-400 duration-200  absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 hover:text-pink-200'>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                        <Link href={'/admin/application?id=' + (applicationMeta?.id || coverLetterName)} className='grid shrink-0 capitalize grid-cols-4 border border-solid border-blue-50 duration-200 hover:bg-blue-50 rounded-lg overflow-hidden '>
                                            <div className='p-2'>
                                                <p className='truncate'>{applicationMeta?.id}</p>
                                            </div>
                                            <div className='p-2'>
                                                <p className='truncate'>{applicationMeta?.company}</p>
                                            </div>
                                            <div className='p-2'>
                                                <p className='truncate'>{applicationMeta?.status}</p>
                                            </div>
                                            <div className='p-2'>
                                                <p className={'truncate ' + (application ? 'text-green-400' : 'text-pink-300')}>{application ? 'True' : 'False'}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}

                        </div>
                    ) : (
                        <div className='flex items-center gap-4'>
                            <p className='p-1 px-2 text-xs sm:text-sm font-medium'>You have 0 active cover letters</p>
                        </div>
                    )}

                    <div className=' p-2 border border-solid border-slate-100 text-slate-600 rounded-2xl text-xs sm:text-sm flex items-center gap-2'>
                        <i className="fa-solid fa-circle-info"></i>
                        <p>Ensure that you save your resume before creating a new cover letter!</p>
                    </div>
                </ActionCard>
                <GraphicDisplay username={currentUser?.displayName} real handleSaveResume={handleSaveResume}>
                    <div className={'flex flex-col gap-4 sm:gap-6 p-4 flex-1 sm:p-8 relative  ' + opensans.className}>
                        <div className='flex items-center gap-2 sm:gap-4 absolute top-4 right-4 sm:top-8 sm:right-8'>
                            <Link href={'/samuel_oak'} target='_blank' className='sm:flex hidden items-center justify-center gap-4 border border-solid border-blue-100  px-4 py-2 rounded-full text-xs sm:text-sm text-blue-400 duration-200 hover:opacity-50'>
                                <p className=''>Example</p>
                            </Link>
                            <button onClick={handleSaveResume} className='flex  items-center justify-center gap-4 border border-solid border-blue-100  px-4 py-2 rounded-full text-xs sm:text-sm text-blue-400 duration-200 hover:opacity-50'>
                                <p className=''>{savingResume ? 'Saving' : 'Save'}</p>
                            </button>
                        </div>
                        <p className='text-3xl sm:text-4xl capitalize md:text-5xl w-full o'>{userData.name || placeHolders.name}</p>
                        {Object.keys(userData).reduce((acc, curr) => acc ? acc : !!userData[curr], false) && (<div className={'flex items-center justify-between gap-4 overflow-scroll'} >
                            {Object.keys(userData).filter(key => (userData[key] && key !== 'name')).map((userKey, userKeyIndex) => {
                                return (
                                    <div className='flex items-center gap-4' key={userKeyIndex}>
                                        <p className={'whitespace-nowrap font-light '}>{userData[userKey]}</p>
                                    </div>
                                )
                            })}
                        </div>)}
                        {'bio' in resumeSections && (
                            <>
                                {sections['bio']}
                            </>
                        )}
                        <hr />
                        {sortResumeSections(Object.keys(resumeSections)).filter(val => val !== 'bio').map((resumeSection, resumeSectionIndex) => {
                            return (
                                <SectionWrapper moveSection={moveSection} handleDeleteSection={handleDeleteSection} title={resumeSection} key={resumeSectionIndex}>
                                    {sections[resumeSection]}
                                </SectionWrapper>
                            )
                        })}
                        {Object.keys(resumeSections).length !== 5 && (
                            <div className='flex-1 grid place-items-center'>
                                <div className='flex items-stretch flex-wrap w-full duration-200 gap-4 text-base sm:text-lg sm:text-xl mx-auto'>
                                    {addSection ? (
                                        <>
                                            {Object.keys(sections).filter(val => !(val in resumeSections)).map((subSection, subSectionIndex) => {
                                                return (
                                                    <button onClick={() => {
                                                        setAddSection(false)
                                                        setResumeSections({ ...resumeSections, [subSection]: sectionTemplates[subSection] })
                                                    }} key={subSectionIndex} className='flex bg-blue-50 rounded-full items-center justify-center gap-4 duration-200 text-blue-400 px-4 py-3 sm:px-6 sm:py-4 flex-1 hover:opacity-60 '>
                                                        <p className='capitalize whitespace-nowrap'>{subSection.replaceAll('_', ' ')}</p>
                                                    </button>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <button onClick={() => setAddSection(true)} className='flex mx-auto bg-blue-50 rounded-full hover:opacity-60  gap-4 duration-200 text-blue-400 px-8 py-3 sm:py-4 '>
                                            <p className=''>Add section</p>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </GraphicDisplay>

                <div className='grid grid-cols-2 sm:w-fit gap-4'>
                    <button onClick={handleSaveResume} className='flex items-center justify-center gap-2 border border-solid border-white bg-white p-4 rounded-full  text-blue-400 duration-200 hover:opacity-50'>
                        <p className=''>{savingResume ? 'Saving ...' : 'Save Resume'}</p>
                        <i className="fa-solid fa-floppy-disk"></i>
                    </button>
                    <Link href={'/resume?user=' + currentUser.displayName} target='_blank' className={'flex items-center justify-center gap-2 border border-solid border-blue-100 bg-white p-4 rounded-full text-blue-400 duration-200 hover:opacity-50 '}>
                        <p className=''>PDF Viewer</p>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                </div>

            </div>
            <LogoFiller />
        </>
    )
}
