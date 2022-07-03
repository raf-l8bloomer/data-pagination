/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const header = document.querySelector('.header');

/* NEED createElement function TO CLEAN CODE*/

const label = document.createElement('label');
label.for = 'search';
label.className = 'student-search';
header.appendChild(label);

const span = document.createElement('span');
span.textContent = 'Search by name';
label.appendChild(span);

const search = document.createElement('input');
search.id = 'search';
search.placeholder = 'Search by name...';
label.appendChild(search);

const button = document.createElement('button');
button.type = 'button';
label.appendChild(button);

const buttonImg = document.createElement('img');
buttonImg.src = 'img/icn-search.svg';
buttonImg.alt = 'Search icon';
button.appendChild(buttonImg);



/*NEED TO FIGURE OUT THIS SEARCH MATCHING THANG*/

function searchName (search, names) {
   const foundNames = [];
   const searchValue = search.value.toLowerCase();
   for (let i = 0; i < names.length; i++) {
      const firstName = names[i].name.first.toLowerCase();
      const lastName = names[i].name.last.toLowerCase();
      // console.log(firstName + ' ' + lastName);
      if (searchValue.length != 0 && firstName.includes(searchValue) || lastName.includes(searchValue)) {
          console.log(names[i]);
         foundNames.push(names[i]);
         showPage(foundNames,1);
      } 
   } 
}


button.addEventListener ('click', () => {
   searchName (search, data);
   console.log('Submit works!');
});

search.addEventListener ('keyup', () => {
   searchName (search, data);
   console.log('Typing works!');
});


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/


/* showPage pulls all elements in list parameter and sets how many elements to present per 1 page */

function showPage(list, page) {
   const startIndex = (page * 9 ) - 9;
   const endIndex = page*9;

   const studentList = document.querySelector('ul'); 
   studentList.innerHTML = ''; // removes existing students displayed previously

   /*loops over list parameter displaying 9 students( index:0-9 ) within if statement */
   for (let i = 0; i < list.length; i++ ) {
     if (i >= startIndex && i < endIndex) {
        const studentItem = `
         <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
            <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <span class="email">${data[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">${data[i].registered.date}</span>
         </div>
         </li>
        `;

         /* insert listed studentItems inside studentList ul */
         studentList.insertAdjacentHTML('beforeend', studentItem);

     }
   }
 }


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/


/* addPagination creates # of pages needed to present  9 students( index:0-9 ) per page */
function addPagination(list) {
   const numOfPages = Math.ceil(list.length/9); // 
   const linkList = document.querySelector('.link-list')
   linkList.innerHTML = "" // removes existing pages displayed previously
   /*loops over number of pages needed and creates and numbers buttons needed */
   for (let i = 1; i <= numOfPages; i++) {
     const button = `
      <li>
      <button type="button">${[i]}</button>
      </li>
      `
     /* insert the buttons to the link-list within pagination div*/
     linkList.insertAdjacentHTML("beforeend", button)
   }
   /*first button is always active*/
   const firstButton = document.querySelector('button');
   firstButton.className ='active';
 
   /* when buttons are clicked, removes current active class and adds to clicked button */
   linkList.addEventListener ('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const removePrevBtn = document.querySelector('.active');
        removePrevBtn.className = '';
        const activeBtn = e.target;
        activeBtn.className = 'active';
        /*shows page according to active page # button clicked */
        showPage(list, activeBtn.textContent)
      }
   })
 }

// Call functions

showPage(data,1);
addPagination(data);