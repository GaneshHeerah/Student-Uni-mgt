(function ($) {

  "use strict";

  var initPreloader = function () {
    $(document).ready(function ($) {
      var Body = $('body');
      Body.addClass('preloader-site');
    });
    $(window).load(function () {
      $('.preloader-wrapper').fadeOut();
      $('body').removeClass('preloader-site');
    });
  }

  // background color when scroll 
  var initScrollNav = function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('.navbar.fixed-top').addClass("bg-white");
    } else {
      $('.navbar.fixed-top').removeClass("bg-white");
    }
  }

  $(window).scroll(function () {
    initScrollNav();
  });


  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }


  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 0) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  // document ready
  $(document).ready(function () {

    var testimonial_swiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 3,
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        550: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      loop: true,
      slidesPerView: 3,
      autoplay: true,
      direction: "vertical",
      spaceBetween: 10,
    });

    var large_slider = new Swiper(".product-large-slider", {
      loop: true,
      slidesPerView: 1,
      autoplay: true,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });


    var swiper = new Swiper(".swiper-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-carousel .swiper-right',
        prevEl: '.swiper-carousel .swiper-left',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

    var swiper = new Swiper(".swiper-slideshow", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 700,
      loop: true,
      navigation: {
        nextEl: '.swiper-slideshow .swiper-right',
        prevEl: '.swiper-slideshow .swiper-left',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    $(".youtube").colorbox({
      iframe: true,
      innerWidth: 960,
      innerHeight: 585
    });

    initPreloader();
    initChocolat();
    initProductQty();

  }); // End of a document

})(jQuery);
//API CALL
const searchInput = document.getElementById('searchInput');
const resultsElement = document.getElementById('results');

function searchAPI() {
  const searchTerm = searchInput.value;
  if (!searchTerm) {
    alert('Please enter a search term.');
    return;
  }

  // Replace with your chosen free API details
  const apiUrl = `https://api.example.com/search?q=${searchTerm}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process and display search results here
      resultsElement.textContent = JSON.stringify(data, null, 2); // Display data in a readable format (temporary)
      // You can modify this to display specific information from the API response
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultsElement.textContent = 'An error occurred while searching.';
    });

}

const studentTable = document.getElementById('student-table');
const errorMessageElement = document.getElementById('error-message');

function displayStudents(students) {
  students.forEach(student => {
    const tableRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const idCell = document.createElement('td');
    const coursesCell = document.createElement('td');
    const ageCell = document.createElement('td');

    nameCell.textContent = student.name;
    idCell.textContent = student.id;
    coursesCell.textContent = student.courses.join(', ');
    ageCell.textContent = student.age;

    tableRow.appendChild(nameCell);
    tableRow.appendChild(idCell);
    tableRow.appendChild(coursesCell);
    tableRow.appendChild(ageCell); // Add age cell to the table row

    studentTable.appendChild(tableRow);
  });
}
function readFile(event) {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    errorMessageElement.textContent = 'Please select a file to read.';
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const data = e.target.result;
    try {
      const students = parseStudentData(data);
      displayStudents(students);
      errorMessageElement.textContent = ''; // Clear any previous error messages
    } catch (error) {
      console.error('Error parsing student data:', error);
      errorMessageElement.textContent = 'An error occurred while processing the student data file.';
    }
  };

  reader.onerror = function(e) {
    console.error('Error reading file:', e.error);
    errorMessageElement.textContent = 'An error occurred while reading the student data file.';
  };

  reader.readAsText(file);
}

// Replace this with your logic to parse student data from the file content (adapt based on your file format)
function parseStudentData(data) {
  const students = [];
  const lines = data.split('\n');
  for (const line of lines) {
    const parts = line.split(',');
    students.push({
      name: parts[0].trim(),  
      id: parseInt(parts[1]),
    
      courses: parts.slice(2).map(course => course.trim()), // Trim course names and create an array
    });
  }
  return students;
}
function parseStudentData(data) {
    const students = [];
    const lines = data.split('\n');
    for (const line of lines) {
      const parts = line.split(',');
      const name = parts[0].trim();
      const id = parseInt(parts[1]);
      const type = parts[2].trim(); // Identify student type (e.g., undergraduate, graduate)
      const age = parseInt(parts[6]);
      const courses = parts.slice(3).map(course => course.trim());

  
      let student;

        student = new GraduateStudent(name, id, courses[0],age); // Assuming program is in the first course element
   
  
      students.push(student);
    }
    return students;
  }

class Person {
    constructor(name) {
      this.name = name;
    }
  }
  
  class Course {
    constructor(name, credits) {
      this.name = name;
      this.credits = credits;
    }
  
    getInfo() {
      return `Course: ${this.name} (Credits: ${this.credits})`;
    }
  }

  class Student extends Person {
    constructor(name, id,age) {
      super(name); // Call the parent constructor (Person)
      this.id = id;
      this.age = age; // Add age property
      this.courses = []; // Array to hold enrolled courses
    }
  
    enroll(course) {
      this.courses.push(course);
    }
  
    getEnrolledCourses() {
      return this.courses.map(course => course.getInfo()); // Return course info
    }
  }

  class Grade {
    constructor(course, letterGrade) {
      this.course = course;
      this.letterGrade = letterGrade;
    }
  }

  class UndergraduateStudent extends Student {
    constructor(name, id, major) {
      super(name, id);
      this.major = major;
    }
  
    // You can define additional methods specific to undergraduate students
  }
  
  class GraduateStudent extends Student {
    constructor(name, id, program,age) {
      super(name, id);
      this.program = program;
    }
  
    // You can define additional methods specific to graduate students
  }

  class CoreCourse extends Course {
    constructor(name, credits) {
      super(name, credits);
    }
  }
  
  class ElectiveCourse extends Course {
    constructor(name, credits, department) {
      super(name, credits);
      this.department = department;
    }
  
    getInfo() {
      return super.getInfo() + ` (Department: ${this.department})`; // Override getInfo to include department
    }
  }
//delete all students
  function clearTable() {
    const studentTable = document.getElementById('student-table');
    while (studentTable.firstChild) {
      studentTable.removeChild(studentTable.firstChild);
    }
  }
  ////////////////////
  const courseListElement = document.getElementById('course-list');
const readFileButton = document.getElementById('fileInput');
const clearTableButton = document.getElementById('clearTable');

function readFile2(event) {
  const fileInput = document.getElementById('fileInput');
  if (!file) {
    errorMessageElement.textContent = 'Please select a file to upload.';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const data = event.target.result;
    try {
      const courses = parseCourseData(data);
      displayCourses(courses);
      clearTableButton.disabled = false; // Enable clear button
    } catch (error) {
      errorMessageElement.textContent = 'Error parsing course data: ' + error.message;
    }
  };
  reader.readAsText(file);
}

function displayCourses(courses) {
  courseListElement.innerHTML = ''; // Clear existing content

  courses.forEach(course => {
    const tableRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const codeCell = document.createElement('td');
    // Add more cells for other course properties (if needed)
    nameCell.textContent = course.name;
    codeCell.textContent = course.code;
    // ... Set text content for other cells
    tableRow.appendChild(nameCell);
    tableRow.appendChild(codeCell);
    // ... Append other cells
    courseListElement.appendChild(tableRow);
  });
}

function parseCourseData(data) {
  // Implement logic to parse your course data format (e.g., CSV with columns for name, code)
  // This function should return an array of course objects with properties like name and code
  // You can define a Course class (optional) to represent course data structure
  throw new Error('Course data parsing not implemented!');
}

function clearTable() {
  courseListElement.innerHTML = '';
  clearTableButton.disabled = true; // Disable clear button if table is empty
}
///// add student

const studentForm = document.getElementById('student-form');
const messageElement = document.getElementById('message');

function addStudent() {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const course = document.getElementById('course').value;
  const age = document.getElementById('age').value;
  const address = document.getElementById('address').value;

  const newStudentData = formatStudentData(name, email, course,age,address); // Format data for storage
  const formattedData = formatStudentData(name, email, course,age,address);
  try {
    // Consider using a library for simulated file writing (browser restrictions apply)
    // Replace with your implementation (e.g., using localStorage or IndexedDB)
    //simulateFileWrite(newStudentData);
    const existingStudents = JSON.parse(localStorage.getItem('students')) || []; // Get existing data (or initialize an empty array)
    existingStudents.push(newStudentData); // Add new student data

    localStorage.setItem('students', JSON.stringify(existingStudents)); // Store data in localStorage
    // Simulate download after successful storage
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(formattedData);
    downloadLink.download = 'student_data.csv';
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
    messageElement.textContent = 'Student data added successfully!';
    studentForm.reset();
  } catch (error) {
    console.error('Error exporting  student data:', error.message);
    messageElement.textContent = 'Error: ' + error.message;
  }
}

function formatStudentData(name, email, course,age) {
  // Implement logic to format student data for storage
  return `${name},${email},${course},${age},${address}\n`;
}

function simulateFileWrite(data) {
  // This function simulates writing to a file (replace with your actual implementation)
  // Consider using localStorage or IndexedDB for persistent data storage
  console.log('Simulating file write:', data);
  // ... (store data in localStorage or IndexedDB)
}

// Handle form submission
studentForm.addEventListener('submit', addStudent);


//exception hanlding
const fileUploadInput = document.getElementById('file-upload');
const messageElementerrro = document.getElementById('message');

function validateFileUpload() {
  const file = fileUploadInput.files[0];

  if (!file) {
    messageElement.textContent = 'Error: Please select a file to upload.';
    return; // Early exit if no file selected
  }

 // Check file size (optional)
  if (file.size > 1024 * 1024) { // 1MB limit
    messageElement.textContent = 'Error: File size exceeds limit (1MB).';
    return;
  }

  // Check file extension
  const validExtensions = ['.txt', '.csv'];
  const fileExtension = file.name.toLowerCase().split('.').pop();

  if (!validExtensions.includes(fileExtension)) {
    messageElement.textContent = 'Error: Invalid file type. Please upload an Excel file (.xls or .xlsx).';
    return;
  }

  // File is valid, proceed with upload logic (replace with your upload function)
  messageElement.textContent = 'File is valid. Uploading...';
  // uploadFile(file) // Replace with your upload function
}

