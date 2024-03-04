import BoringLayout from '@/components/BoringLayout'
import ResumeViewer from '@/components/ResumeViewer'
import React from 'react'

const userData = {
    "location": "Pallet Town, Kanto Region",
    "website": "www.smoljames.com",
    "name": "Samuel Oak",
    "email": "samuel_oak@poke.com"
}

const resumeSections = {
    "education": [{
        "institution": "Kanto University",
        "location": "Cerulean City, Kanto Region",
        "notes": [
            "Specialized in Pokémon ecology, genetics, and ethology, culminating in a dissertation on the social and communicative behaviors of  Pokémon.",
            "Conducted extensive fieldwork and research, leading to several publications on Pokémon adaptation, evolution, and diversity, and laying the groundwork for his future contributions to Pokémon research and training."
        ],
        "endDate": "May 2015 - Mar 2019",
        "qualification": "Ph.D. in Pokémon Studies",
        "startDate": ""
    }],
    "bio": "Hello there! I'm Professor Oak, a renowned Pokémon researcher known for my work in the field of Pokémon behavior and habitats. I'm dedicated to understanding the mysteries of Pokémon and guiding young trainers on their journey to become Pokémon Masters.",
    "work_experience": [
        {
            "company": "Oak Pokémon Laboratory",
            "notes": [
                "Established a cutting-edge laboratory dedicated to advancing Pokémon research, attracting top scientists and trainers from around the world.",
                "Conducted pioneering studies in Pokémon genetics, uncovering the genetic markers responsible for Pokémon abilities and Mega Evolution.",
                "Provided comprehensive support and resources to aspiring Pokémon trainers, including personalized advice, starter Pokémon, and ongoing guidance throughout their journey to becoming Pokémon Masters."
            ],
            "location": "Pallet Town, Kanto Region",
            "startDate": "",
            "role": "Founder and Director",
            "tools": [
                ""
            ],
            "endDate": "Nov 2021 - Dec 2023"
        },
        {
            "endDate": "Oct 2018 - Apr 2021",
            "notes": [
                "Designed and taught courses on Pokémon ecology and behavior, emphasizing the importance of conservation and ethical treatment.",
                "Led extensive field studies across various terrains in the Kanto region, uncovering and documenting new species for the Pokédex.",
                "Published influential research papers on Pokémon communication, shedding light on the complex social structures and interactions within Pokémon communities."
            ],
            "tools": [
                ""
            ],
            "company": "Kanto University",
            "startDate": "",
            "role": "Professor of Pokémon Studies",
            "location": "Cerulean City, Kanto Region"
        },
        {
            "notes": [
                "Spearheaded research initiatives on Pokémon evolution, leading to breakthroughs in understanding the mechanisms behind the phenomenon.",
                "Developed the Pokédex, an innovative device that revolutionized the way trainers collect and analyze Pokémon data, significantly contributing to the field of Pokémon taxonomy.",
                "Mentored numerous young trainers, providing them with the knowledge and tools to embark on their journeys, including notable figures like Ash Ketchum and Gary Oak."
            ],
            "company": "Pokémon Research Institute",
            "location": "Pallet Town, Kanto Region",
            "role": "Chief Scientist",
            "startDate": "",
            "endDate": "July 2013 - Present",
            "tools": [
                ""
            ]
        }
    ],
    "projects": [
        {
            "notes": [
                "Conceptualized and developed the Pokédex, a portable device that allows trainers to record and analyze data on Pokémon they encounter. This device revolutionized the way trainers interact with Pokémon, enabling them to access detailed information about Pokémon species."
            ],
            "link": "www.pokemon.com/us/pokedex",
            "startDate": "",
            "endDate": "Feb 2013 to Present",
            "name": "Development of the Pokédex",
            "tools": [
                ""
            ],
            "location": ""
        }
    ],
    "skills": [
        {
            "list": "Biology, Genetics, Ecology, Data Analysis, Innovation",
            "genre": "Research"
        },
        {
            "genre": "Education",
            "list": "Teaching, Mentorship, Curriculum Guidance"
        },
        {
            "list": "Management, Collaboration, Strategy, Organization",
            "genre": "Leadership"
        }
    ]
}

export const metadata = {
    title: "Hyr.sh ⋅ Demo",
};

export default function DemoPage() {

    return (
        <BoringLayout>
            <main className='max-w-[1200px] mx-auto flex flex-col w-full p-4 sm:p-8'>
                <ResumeViewer userData={userData} resumeSections={resumeSections} demo />
            </main>
        </BoringLayout>
    )
}
