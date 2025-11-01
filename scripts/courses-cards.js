const coursesCards = [
    
    {
        courseName: "CSE110",
        type: "CSE",
        completed : true,
        credits: 2,
    },

    {
        courseName: "CSE111",
        type: "CSE",
        completed : true,
        credits: 2,

    },

    {
        courseName: "CSE210",
        type: "CSE",
        completed : true,
        credits: 2,

    },

    {
        courseName: "WDD130",
        type: "WDD",
        completed : true,
        credits: 2,

    },

    {
        courseName: "WDD131",
        type: "WDD",
        completed: true,
        credits: 2,
    },

    {
        courseName: "WDD231",
        type: "WDD",
        completed : false,
        credits: 2,

    },



]

createCoursesCards(coursesCards)



const allCourseBtn = document.querySelector('#all');
allCourseBtn.addEventListener('click', () =>{
    createCoursesCards(coursesCards); 
})

const CSEcoursesBtn = document.querySelector('#cse');
CSEcoursesBtn.addEventListener('click', () => {
    const CSEcourse = coursesCards.filter(h => h.type == "CSE")
    createCoursesCards(CSEcourse);
})


const WDDcoursesBtn = document.querySelector('#wdd');
WDDcoursesBtn.addEventListener('click', () =>{
    const WDDcourse = coursesCards.filter(h => h.type == "WDD")
    createCoursesCards(WDDcourse);
})












function createCoursesCards(coursesCards) {
    const container = document.querySelector('#coursesBar');
    container.innerHTML = "";
    const counterContainer = document.querySelector('#counterText');
    counterContainer.innerHTML = "";

    const totalCredits = coursesCards.reduce((acumulador, course) => {
    // Si tiene la propiedad credits, la suma; si no, suma 0
    return acumulador + (course.credits || 0);
    }, 0);




    
    coursesCards.forEach(course => {
        let card = document.createElement("section")
        let name = document.createElement("p")
        
        if (course.completed == true){
            card.style.backgroundColor = "#D6D6D6";
            name.textContent = "✅ " + course.courseName ;

        }

        else{
            card.style.backgroundColor = "#fffefeff";
            name.textContent = course.courseName; 
        }

        card.append(name);
        document.querySelector('#coursesBar').appendChild(card);
        
        

    });
    let counterText = document.createElement("p");
    counterText.textContent = "The total credits for course listed above is " + totalCredits;

    counterContainer.appendChild(counterText);


}