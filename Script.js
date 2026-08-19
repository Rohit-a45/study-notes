let currentClass = 9;
let currentSubject = "Physics";


const notes = {

    9: {

        Physics: [
            {
                title: "Motion",
                file: "notes/class9/physics/motion.pdf"
            },
            {
                title: "Force and Laws of Motion",
                file: "notes/class9/physics/force.pdf"
            }
        ],

        Chemistry: [
            {
                title: "Matter in Our Surroundings",
                file: "notes/class9/chemistry/matter.pdf"
            }
        ],

        Maths: [
            {
                title: "Number Systems",
                file: "notes/class9/maths/number-systems.pdf"
            }
        ]

    },


    10: {

        Physics: [
            {
                title: "Light - Reflection and Refraction",
                file: "notes/class10/physics/light.pdf"
            },
            {
                title: "Human Eye and Colourful World",
                file: "notes/class10/physics/human-eye.pdf"
            }
        ],

        Chemistry: [
            {
                title: "Chemical Reactions and Equations",
                file: "notes/class10/chemistry/chemical-reactions.pdf"
            }
        ],

        Maths: [
            {
                title: "Real Numbers",
                file: "notes/class10/maths/real-numbers.pdf"
            }
        ]

    },


    11: {

        Physics: [
            {
                title: "Units and Measurements",
                file: "units and measurement.pdf"
            },
            {
                title: "kinematics",
                file: "kinematics.pdf"
            }
        ],

        Chemistry: [
            {
                title: "Some Basic Concepts of Chemistry",
                file: "notes/class11/chemistry/basic-concepts.pdf"
            }
        ],

        Maths: [
            {
                title: "Sets",
                file: "notes/class11/maths/sets.pdf"
            }
        ]

    },


    12: {

        Physics: [
            {
                title: "Electric Charges and Fields",
                file: "notes/class12/physics/electric-charges.pdf"
            },
            {
                title: "Electrostatic Potential and Capacitance",
                file: "notes/class12/physics/capacitance.pdf"
            }
        ],

        Chemistry: [
            {
                title: "Solutions",
                file: "notes/class12/chemistry/solutions.pdf"
            }
        ],

        Maths: [
            {
                title: "Relations and Functions",
                file: "notes/class12/maths/relations.pdf"
            }
        ]

    }

};


function selectClass(classNumber) {

    currentClass = classNumber;

    document.querySelector("#notesTitle").innerText =
        `Class ${classNumber} Notes`;

    document.querySelector("#notes").scrollIntoView({
        behavior: "smooth"
    });

    showSubject("Physics");
}


function showSubject(subject) {

    currentSubject = subject;

    displayNotes();
}


function displayNotes() {

    let container =
        document.querySelector("#notesContainer");

    container.innerHTML = "";

    let data =
        notes[currentClass][currentSubject];


    if (data.length === 0) {

        container.innerHTML = `
            <p>No notes available yet.</p>
        `;

        return;
    }


    data.forEach(note => {

        container.innerHTML += `

            <div class="note-card">

                <div class="pdf-icon">
                    📄
                </div>

                <div class="note-info">

                    <h3>
                        ${note.title}
                    </h3>

                    <p>
                        Class ${currentClass}
                        • ${currentSubject}
                        • PDF Notes
                    </p>

                </div>

                <a
                    href="${note.file}"
                    target="_blank"
                    class="view-btn"
                >
                    View PDF
                </a>

            </div>

        `;

    });
}


function searchNotes() {

    let value =
        document
            .querySelector("#search")
            .value
            .toLowerCase();


    let cards =
        document.querySelectorAll(".note-card");


    cards.forEach(card => {

        let text =
            card.innerText.toLowerCase();

        card.style.display =
            text.includes(value)
                ? "flex"
                : "none";

    });
}


displayNotes();