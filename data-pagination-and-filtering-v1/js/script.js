/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



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


/* addPagination creates # of pages needed to present  9 students( index:0-9 ) per page
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length/9); // 
   const linkList = document.querySelector('.link-list')
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = "" // removes existing pages displayed previously
   // loop over the number of pages needed
   for (let i = 1; i <= numOfPages; i++) {
     // create the elements needed to display the pagination button
     const button = `
      <li>
      <button type="button">${[i]}</button>
      </li>
      `
     // insert the above elements
     linkList.insertAdjacentHTML("beforeend", button)
   }
   // give the first pagination button a class of "active"
   const firstButton = document.querySelector('button');
   firstButton.className ='active';
 
   // create an event listener on the `link-list` element

   linkList.addEventListener ('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const removePrevBtn = document.querySelector('.active');
        removePrevBtn.className = '';
        const activeBtn = e.target;
        activeBtn.className = 'active';
        showPage(list, activeBtn.textContent)
      }
   })
     // if the click target is a button:
       // remove the "active" class from the previous button
       // add the active class to the clicked button
       // call the showPage function passing the `list` parameter and page to display as arguments
 }

// Call functions

showPage(data,1);
addPagination(data);