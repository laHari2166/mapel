
import type { User, Course, CareerPath, UpcomingExam, Creator, Quiz, LiveClass } from '@/lib/types';

export const USERS: User[] = [
  { id: '1', username: 'student', password: 'password', role: 'Student', avatar: 'https://picsum.photos/seed/avatar1/100/100' },
  { id: '2', username: 'guru', password: 'password', role: 'Guru', avatar: 'https://picsum.photos/seed/avatar2/100/100' },
  { id: '3', username: 'creator', password: 'password', role: 'Creator', avatar: 'https://picsum.photos/seed/avatar3/100/100' },
];

export const COURSES: Course[] = [
  {
    id: 'math10-cbse',
    title: 'CBSE Class 10 Math',
    description: 'Full syllabus coverage for CBSE Class 10 Mathematics. Includes Trigonometry, Algebra, and Geometry.',
    thumbnail: 'https://picsum.photos/seed/math/400/225',
    category: 'Board Exam',
    lessons: [
      { id: 'cbse10-l1', title: 'Real Numbers', youtubeId: 'FFtd7xUZZJY', notes: `
        ## Chapter 1: Real Numbers

        ### 1. Euclid's Division Lemma
        **Statement:** For any two positive integers 'a' and 'b', there exist unique integers 'q' and 'r' satisfying the condition  a = bq + r, where 0 ≤ r < b.
        - 'a' is the dividend.
        - 'b' is the divisor.
        - 'q' is the quotient.
        - 'r' is the remainder.

        **Application:** This lemma is mainly used to find the Highest Common Factor (HCF) of two positive integers. The algorithm based on this is called Euclid's Division Algorithm.

        ### 2. The Fundamental Theorem of Arithmetic
        **Statement:** Every composite number can be expressed (factorized) as a product of primes, and this factorization is unique, apart from the order in which the prime factors occur.
        - **Example:**  140 = 2 × 70 = 2 × 2 × 35 = 2 × 2 × 5 × 7 = 2² × 5 × 7.

        **Application:**
        - To find HCF and LCM of two numbers.
          - **HCF:** Product of the smallest power of each common prime factor.
          - **LCM:** Product of the greatest power of each prime factor involved.
        - To prove the irrationality of numbers (e.g., √2, √3).

        ### 3. Revisiting Irrational Numbers
        - A number is **irrational** if it cannot be written in the form p/q, where p and q are integers and q ≠ 0.
        - **Theorem:** Let 'p' be a prime number. If 'p' divides a², then 'p' divides 'a', where 'a' is a positive integer. This is used in proofs by contradiction to show numbers like √2, √3 are irrational.

        ### 4. Decimal Expansions of Rational Numbers
        - **Terminating Decimal Expansion:** A rational number p/q has a terminating decimal expansion if the prime factorization of 'q' is of the form 2ⁿ5ᵐ, where n and m are non-negative integers.
        - **Non-Terminating Repeating (Recurring) Decimal Expansion:** A rational number p/q has a non-terminating repeating decimal expansion if the prime factorization of 'q' is not of the form 2ⁿ5ᵐ.
      `, quizId: 'cbse10-q1', pyqs: ['pyq-1', 'pyq-2', 'pyq-3', 'pyq-4'], importantQuestions: `## Important Questions: Real Numbers
      
      - 1. Prove that √3 is irrational.
      - 2. Find the HCF of 135 and 225 using Euclid's division algorithm.
      - 3. Show that any positive odd integer is of the form 6q + 1, or 6q + 3, or 6q + 5, where q is some integer.
      - 4. Without actually performing the long division, state whether the rational number 17/8 will have a terminating decimal expansion or a non-terminating repeating decimal expansion.
      ` },
      { id: 'cbse10-l2', title: 'Polynomials', youtubeId: 'l_B4vEX_r_s', notes: `
        ## Chapter 2: Polynomials

        ### 1. Definition
        A polynomial is an expression consisting of variables and coefficients, involving only the operations of addition, subtraction, multiplication, and non-negative integer exponentiation of variables.
        - **Degree:** The highest power of the variable in a polynomial.
        - **Types:** Linear (degree 1), Quadratic (degree 2), Cubic (degree 3).

        ### 2. Zeroes of a Polynomial
        A real number 'k' is a zero of a polynomial p(x) if p(k) = 0.
        - Geometrically, the zeroes of a polynomial are the x-coordinates of the points where its graph intersects the x-axis.
        - A linear polynomial has one zero.
        - A quadratic polynomial can have at most two zeroes.
        - A cubic polynomial can have at most three zeroes.

        ### 3. Relationship between Zeroes and Coefficients
        **For a Quadratic Polynomial (ax² + bx + c):**
        Let the zeroes be α and β.
        - **Sum of zeroes (α + β) = -b/a** = -(Coefficient of x) / (Coefficient of x²)
        - **Product of zeroes (αβ) = c/a** = (Constant term) / (Coefficient of x²)

        **For a Cubic Polynomial (ax³ + bx² + cx + d):**
        Let the zeroes be α, β, and γ.
        - **Sum of zeroes (α + β + γ) = -b/a**
        - **Sum of the products of zeroes taken two at a time (αβ + βγ + γα) = c/a**
        - **Product of zeroes (αβγ) = -d/a**

        ### 4. Division Algorithm for Polynomials
        If p(x) and g(x) are any two polynomials with g(x) ≠ 0, then we can find polynomials q(x) and r(x) such that:
        **p(x) = g(x) × q(x) + r(x)**
        where r(x) = 0 or degree(r(x)) < degree(g(x)).
        - This is used to find other zeroes of a polynomial when some zeroes are already known.
      `, quizId: 'cbse10-q2', pyqs: ['pyq-1', 'pyq-2', 'pyq-3'], importantQuestions: `## Important Questions: Polynomials

      - 1. If one zero of the polynomial (a² + 9)x² + 13x + 6a is reciprocal of the other, find the value of a.
      - 2. Find a quadratic polynomial whose zeroes are 3 and -4.
      - 3. If the zeroes of the polynomial x³ - 3x² + x + 1 are a-b, a, a+b, find a and b.
      - 4. Apply the division algorithm to find the quotient and remainder on dividing p(x) by g(x) where p(x) = x⁴ - 3x² + 4x + 5 and g(x) = x² + 1 - x.
      ` },
    ]
  },
  {
    id: 'sci12-icse',
    title: 'ICSE Class 12 Physics',
    description: 'Master ICSE Class 12 Physics concepts, from Electrostatics to Modern Physics.',
    thumbnail: 'https://picsum.photos/seed/science/400/225',
    category: 'Board Exam',
    lessons: [
        { id: 'icse12-l1', title: 'Electrostatics', youtubeId: '042-Q8CgJUk', notes: 'Coulomb\'s law, electric field, and electric potential explained.', quizId: 'icse12-q1' },
    ]
  },
  {
    id: 'eng10-st',
    title: 'State Board English',
    description: 'Comprehensive English course covering grammar, literature, and writing skills for state boards.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Seal_of_Karnataka.svg',
    category: 'Board Exam',
    lessons: [
        { id: 'eng10-l1', title: 'Tenses and Voices', youtubeId: 'AYQeY94A2dk', notes: 'Master active-passive voice and all 12 tenses.', quizId: 'eng10-q1' },
    ]
  },
   {
    id: 'jee-math',
    title: 'JEE Advanced Calculus',
    description: 'Advanced calculus concepts for competitive exams like JEE. Covers limits, continuity, and differentiability.',
    thumbnail: 'https://picsum.photos/seed/calculus/400/225',
    category: 'Competitive Exam',
    lessons: [
      { id: 'cal-l1', title: 'Limits and Continuity', youtubeId: 'pTF9lLLUYSU', notes: `
        ## Chapter: Limits & Continuity

        ### 1. Limits
        **Concept:** The value that a function f(x) approaches as the input x approaches some value 'a'.
        - We write it as: lim (x→a) f(x) = L.
        - **LHL (Left-Hand Limit):** lim (x→a⁻) f(x)
        - **RHL (Right-Hand Limit):** lim (x→a⁺) f(x)
        - For a limit to exist, **LHL = RHL = L**.

        **Indeterminate Forms:** 0/0, ∞/∞, ∞ - ∞, 0 × ∞, 1^∞, 0⁰, ∞⁰. We need to manipulate the function to resolve these.

        **Methods for Evaluation:**
        - Direct Substitution
        - Factorization
        - Rationalization
        - **L'Hôpital's Rule:** If lim (x→a) f(x)/g(x) is 0/0 or ∞/∞, then lim (x→a) f(x)/g(x) = lim (x→a) f'(x)/g'(x), provided the limit on the right exists.

        **Standard Limits:**
        - lim (x→0) sin(x)/x = 1
        - lim (x→0) (1 - cos(x))/x = 0
        - lim (x→0) (e^x - 1)/x = 1
        - lim (x→∞) (1 + 1/x)^x = e

        ### 2. Continuity
        **Concept:** A function is continuous at a point if its graph can be drawn without lifting the pen.

        **Condition for continuity at a point x = a:**
        A function f(x) is continuous at x = a if:
        1. f(a) is defined.
        2. lim (x→a) f(x) exists (i.e., LHL = RHL).
        3. **lim (x→a) f(x) = f(a)**.

        **Types of Discontinuity:**
        - **Removable:** Limit exists, but is not equal to f(a), or f(a) is not defined.
        - **Jump (First Kind):** LHL and RHL both exist but are not equal.
        - **Essential (Second Kind):** At least one of LHL or RHL does not exist.
      `, quizId: 'cal-q1', pyqs: ['pyq-jee-1'] },
    ]
  },
  {
    id: 'neet-bio',
    title: 'NEET Biology',
    description: 'Complete biology syllabus for NEET. Covers Human Physiology, Genetics, and Plant Diversity.',
    thumbnail: 'https://picsum.photos/seed/biology/400/225',
    category: 'Competitive Exam',
    lessons: [
      { id: 'bio-l1', title: 'Human Physiology', youtubeId: '7oAk_Is3b1Q', notes: 'In-depth lessons on all human organ systems.', quizId: 'bio-q1' },
    ]
  },
  {
    id: 'cuet-apt',
    title: 'CUET General Test Prep',
    description: 'Prepare for the CUET General Test with sections on GK, Current Affairs, and Logical Reasoning.',
    thumbnail: 'https://picsum.photos/seed/aptitude/400/225',
    category: 'Competitive Exam',
    lessons: [
      { id: 'cuet-l1', title: 'Logical Reasoning', youtubeId: '7oAk_Is3b1Q', notes: 'Practice puzzles, syllogisms, and critical reasoning.', quizId: 'cuet-q1' },
    ]
  },
];

export const CAREER_PATHS: CareerPath[] = [
    {
        id: 'cp-1',
        title: 'Software Engineer',
        description: 'Build and maintain software applications for various platforms.',
        trending: true,
        exams: ['JEE Mains (for IITs/NITs)', 'State Entrance Exams'],
        courses: ['B.Tech in Computer Science', 'BCA', 'Online Bootcamps'],
        skills: ['Programming (Python, JavaScript)', 'Data Structures', 'Algorithms', 'System Design']
    },
    {
        id: 'cp-2',
        title: 'Data Scientist',
        description: 'Analyze complex data to help organizations make better decisions.',
        trending: true,
        exams: ['GATE', 'University Specific Exams'],
        courses: ['M.Tech in Data Science', 'Masters in Statistics', 'Certified Analytics Professional (CAP)'],
        skills: ['Statistics', 'Machine Learning', 'Python/R', 'SQL', 'Data Visualization']
    },
     {
        id: 'cp-3',
        title: 'Doctor (MBBS)',
        description: 'Diagnose and treat illnesses and injuries, and provide preventive care.',
        trending: false,
        exams: ['NEET'],
        courses: ['MBBS', 'BDS', 'BAMS'],
        skills: ['Medical Knowledge', 'Patient Care', 'Problem-Solving', 'Communication']
    }
]

export const UPCOMING_EXAMS: UpcomingExam[] = [
    {
        id: 'exam-1',
        name: 'JEE Main 2025',
        registrationDate: '2024-11-01',
        eligibility: 'Class 12 Pass/Appearing (PCM)',
        applyLink: '#',
        resourcesLink: '/courses/jee-math'
    },
    {
        id: 'exam-2',
        name: 'NEET UG 2025',
        registrationDate: '2025-02-01',
        eligibility: 'Class 12 Pass/Appearing (PCB)',
        applyLink: '#',
        resourcesLink: '/courses/neet-bio'
    },
    {
        id: 'exam-3',
        name: 'NTSE Stage 1',
        registrationDate: '2024-09-15',
        eligibility: 'Class 10 Students',
        applyLink: '#',
        resourcesLink: '#'
    }
];

export const CREATORS: Creator[] = [
  {
    id: 'creator-1',
    name: 'PhysicsPhantom',
    avatar: 'https://picsum.photos/seed/creator1/100/100',
    bio: 'Breaking down complex physics for JEE & NEET. Making the impossible, possible.',
    content: [
      { type: 'video', title: 'Quantum Mechanics in 10 Mins', url: 'https://www.youtube.com/watch?v=h_4l_y103bA' },
      { type: 'note', title: 'Thermodynamics Cheat Sheet', url: '#' },
      { type: 'video', title: 'Electromagnetism Explained', url: 'https://www.youtube.com/watch?v=h_4l_y103bA' },
      { type: 'note', title: 'Optics Formula Sheet', url: '#' },
    ],
  },
  {
    id: 'creator-2',
    name: 'BioQueen',
    avatar: 'https://picsum.photos/seed/creator2/100/100',
    bio: 'Your guide to mastering biology. From cells to ecosystems, I\'ve got you covered.',
    content: [
      { type: 'video', title: 'Genetics & Heredity Explained', url: 'https://www.youtube.com/watch?v=l_B4vEX_r_s' },
      { type: 'note', title: 'Human Anatomy Diagrams', url: '#' },
      { type: 'note', title: 'Plant Kingdom Notes', url: '#' },
      { type: 'video', title: 'Cell Biology Basics', url: 'https://www.youtube.com/watch?v=l_B4vEX_r_s' },
      { type: 'note', title: 'Ecology Mind Map', url: '#' },
    ],
  },
  {
    id: 'creator-3',
    name: 'magnetic brains',
    avatar: 'data:image/jpeg;base64,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',
    bio: 'Teaching programming and web development to millions. #CodeWithHarry',
    content: [
        { "type": "video", "title": "Complete C++ Tutorial", "url": "https://www.youtube.com/watch?v=j8nAHeVKL08" },
        { "type": "note", "title": "JavaScript Cheatsheet", "url": "#" }
    ]
  },
];

export const QUIZZES: Quiz[] = [
    {
        id: 'cbse10-q1',
        lessonId: 'cbse10-l1',
        title: 'Real Numbers Quiz',
        questions: [
            {
                question: "What is Euclid's Division Lemma used for?",
                options: [
                    "Finding the area of a circle",
                    "Finding the HCF of two numbers",
                    "Solving quadratic equations",
                    "Calculating the volume of a cone"
                ],
                correctAnswer: "Finding the HCF of two numbers"
            },
            {
                question: "Every composite number can be expressed as a product of primes. This is the...",
                options: [
                    "Pythagorean Theorem",
                    "Fundamental Theorem of Arithmetic",
                    "Euclid's Division Algorithm",
                    "Remainder Theorem"
                ],
                correctAnswer: "Fundamental Theorem of Arithmetic"
            },
            {
                question: "The decimal expansion of a rational number p/q is terminating if the prime factorization of q is of the form...",
                options: [
                    "2ⁿ3ᵐ",
                    "3ⁿ5ᵐ",
                    "2ⁿ5ᵐ",
                    "5ⁿ7ᵐ"
                ],
                correctAnswer: "2ⁿ5ᵐ"
            }
        ]
    },
    {
        id: 'cal-q1',
        lessonId: 'cal-l1',
        title: 'Limits & Continuity Quiz',
        questions: [
            {
                question: "For a limit to exist, which of the following must be true?",
                options: [
                    "LHL > RHL",
                    "LHL < RHL",
                    "LHL = RHL",
                    "The function must be defined at the point"
                ],
                correctAnswer: "LHL = RHL"
            },
            {
                question: "Which of the following is NOT an indeterminate form?",
                options: [
                    "0/0",
                    "∞/∞",
                    "1/∞",
                    "1^∞"
                ],
                correctAnswer: "1/∞"
            },
            {
                question: "If a function's limit exists at a point but is not equal to the function's value at that point, what kind of discontinuity is it?",
                options: [
                    "Jump Discontinuity",
                    "Essential Discontinuity",
                    "Removable Discontinuity",
                    "Continuous"
                ],
                correctAnswer: "Removable Discontinuity"
            }
        ]
    }
];

export const LIVE_CLASSES: LiveClass[] = [
    {
        id: 'live-1',
        title: 'Live Q&A: Clearing Doubts for JEE Advanced',
        description: 'Join me live as I answer your most pressing questions about the upcoming JEE Advanced exam. We will cover key strategies, last-minute tips, and solve some tough problems together.',
        youtubeId: 'jfKfPfyJRdk',
        startTime: new Date().toISOString(),
        isLive: true,
        host: 'PhysicsPhantom'
    },
    {
        id: 'live-2',
        title: 'Workshop: How to Crack NEET in Your First Attempt',
        description: 'A comprehensive workshop on building a winning strategy for NEET. I will share my personal journey, study techniques, and time management skills.',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        isLive: false,
        host: 'BioQueen'
    },
    {
        id: 'live-3',
        title: 'AMA Session: Career in Software Engineering',
        description: 'Ask me anything about pursuing a career in software engineering. We will discuss skills, interview preparation, and future trends.',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        isLive: false,
        host: 'magnetic brains'
    }
];
    
