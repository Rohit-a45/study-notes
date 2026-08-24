let currentClass = 9;
let currentSubject = "Physics";

const notes = {
    9: {
        Physics: [
            {
                title: "Motion",
                file: "motions.pdf"
            },
            {
                title: "Force and Laws of Motion",
                file: "force-and-laws-of-motion.pdf"
            },
            {
                title: "Gravitation",
                file: "Class_9_Physics_Gravitation_Notes.pdf"
            },
                  {
                title: "Work and Energy",
                file: "Class_9_Physics_Work_and_Energy_Notes.pdf"
            },
            {
                title: "Sound",
                file: "Class_9_Physics_Sound_Notes.pdf"
            }
        ],
        Chemistry: [],
        Maths: []
    },

    10: {
        Physics: [
            {
                title: "Light - Reflection and Refraction",
                file: "class-10th-light.pdf"
            }
    
        ],
        Chemistry: [],
        Maths: []
    },

    11: {
        Physics: [
            {
                title: "Units and Measurements",
                file: "units-and-measurement.pdf"
            },
            {
                title: "Kinematics",
                file: "kinematics.pdf"
            },
            {
                title: "Laws of Motion",
                file: "laws-of-motion.pdf"
            }
        ],
        Chemistry: [],
        Maths: []
    },

    12: {
        Physics: [],
        Chemistry: [],
        Maths: []
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
    let container = document.querySelector("#notesContainer");
    container.innerHTML = "";

    let data = notes[currentClass] ? notes[currentClass][currentSubject] : [];

    if (!data || data.length === 0) {
        container.innerHTML = `
            <p style="padding: 20px; color: #64748b; width: 100%;">No notes available yet for this subject.</p>
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
                    <h3>${note.title}</h3>
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
    let value = document.querySelector("#search").value.toLowerCase();
    let cards = document.querySelectorAll(".note-card");

    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "flex" : "none";
    });
}

// Page load hone par notes display karne ke liye
displayNotes();