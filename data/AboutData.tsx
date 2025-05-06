import { GraduationCap, Award, Briefcase, Code } from "lucide-react";

export default {
    bio: [
        "I'm an AI/ML Engineer with a passion for developing cutting-edge solutions using artificial intelligence and machine learning. My expertise spans across various domains including computer vision, natural language processing, and generative AI.",
        "With a strong foundation in both theoretical concepts and practical implementation, I strive to bridge the gap between research and real-world applications. My goal is to create AI systems that are not only technically robust but also ethically sound and user-friendly.",
        "When I'm not training models or optimizing algorithms, you can find me exploring the latest research papers, contributing to open-source projects, or mentoring aspiring data scientists and ML engineers.",
    ],
    quote: {
        author: "Stephen Hawking",
        text: '"The development of full artificial intelligence could spell the end of the human race... or it could be the best thing that ever happened to us."',
    },
    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "University of California, Berkeley",
            year: "2013-2017",
            icon: <GraduationCap size={20} />,
        },
        {
            degree: "Master of Science in Artificial Intelligence",
            institution: "Stanford University",
            year: "2017-2018",
            icon: <GraduationCap size={20} />,
        },
    ],
    certification: [
        {
            name: "Deep Learning Specialization",
            from: "Coursera (Andrew Ng)",
            year: 2018,
            icon: <Award size={20} />,
        },
        {
            name: "TensorFlow Developer Certificate",
            from: "Google",
            year: 2018,
            icon: <Code size={20} />,
        },
        {
            name: "AWS Machine Learning Specialty",
            from: "Amazon Web Services",
            year: 2022,
            icon: <Briefcase size={20} />,
        },
    ],
    trend: "GPT-4 has approximately 1.76 trillion parameters, making it one of the largest language models ever created!",
};
