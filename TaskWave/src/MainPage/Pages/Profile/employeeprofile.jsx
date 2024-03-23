/* eslint-disable no-undef */
import React, { useEffect   , useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link,useParams } from "react-router-dom";
import {
 Avatar_16,
  Avatar_02,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_01,
  Diagram,
  PlaceHolder,
  eye,
} from "../../../Entryfile/imagepath";
import { keyboard, mouse, laptop } from "../../../Entryfile/imagepath";
import Offcanvas from "../../../Entryfile/offcanvance";
import ProjectCard from "../../Employees/Projects/ProjectCard";

const EmployeeProfile = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [formClosed, setFormClosed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    mobile: '',
    birthDate: '',
    adress: '',
  });
  
  const { profileId } = useParams();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setIsTyping(true);
  };

  const allprojects  = [
 {
  id: 1,
  title: 'Office Management',
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elvel elit neque. Class aptent taciti sociosqu ad litoratorquent per conubia nostra, per inceptos himenae Vestibulum sollicitudin libero vitae est consectetur, amolestie tortor consectetur. Aenean tincidunt interdum ipsum,id pellentesque diam suscipit ut. Vivamus massa mi, fermentum  eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integerscelerisque libero non metus commodo, et hendrerit diamaliquet. Proin tincidunt porttitor ligula, a tincidunt orcipellentesque nec. Ut ultricies maximus nulla id consequat",                
  startDate :'28 Jan 2023',
  workingHours : 100,
  deadline: '17 Apr 2023',
  creator: 'Barry Cuda',
  leaderName: { name: 'Jeffery Lalor', role: 'Ios  Developer',image: Avatar_01 },
  imageFiles: [
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file4.png', src: Diagram },
      { name: 'file5.png', src: Diagram},
      { name: 'file6.png', src: Diagram },
      { name: 'file7.png', src: Diagram },
      { name: 'file8.png', src: Diagram},
      { name: 'file9.png', src: Diagram },
      { name: 'file10.png', src: Diagram }
    ],
  uploadedFiles: [
      { name: 'file1.pdf',creator:'zarai fedi', size:'Size: 50Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file2.png',creator:'John Doe', size:'Size: 14.8Mb',date:'July 31st at 6:53 PM', src: Diagram },
      { name: 'file3.file',creator:'zarai fedi', size:'Size: 30Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file4.py',creator:'John Doe', size:'Size: 102.3Mb',date:'July 31st at 6:53 PM', src: Diagram }
    ],
  team: [
    { name: 'John Doe', role: 'Web Developer',image: Avatar_01 },
    { name: 'Jane Smith', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Alice Johnson', role: 'Ios Developer',image: Avatar_01}
  ],
  priority:'High',
  activeStatus:'Pending',
  tasks: [
      { id: 1, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ',deadline: '17 Mar 2023', },
      { id: 2, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '20 Jan 2023', },
      { id: 3, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ' },
      { id: 4, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '11 Febr 2023', },
     
      { id: 5, status:1 ,assignee: 'John Doe', description: 'Doctor available module',deadline: '17 Mar 2023', },
      { id: 6, status:1 ,assignee: 'Jane Smith', description: 'Patient and Doctor video conferencing',deadline: '17 Mar 2023', },
      { id: 7, status:1 ,assignee: 'zarai fedi', description: 'Doctor available module',deadline: '17 May 2023', },
      { id: 8, status:1 ,assignee: 'John Doe', description: 'Patient and Doctor video conferencing' ,deadline: '25 Sep 2023',},
    
      { id: 9, status:2 ,assignee: 'Jane Smith', description: 'Private chat module' ,deadline: '23 May 2023',},
      { id: 10, status:2 ,assignee: 'zarai fedi', description: 'Patient Profile add' ,deadline: '30 Jul 2023',},
      { id: 11, status:2 ,assignee: 'John Doe', description: 'Private chat module',deadline: '17 April 2023', },
      { id: 12, status:2 ,assignee: 'Jane Smith', description: 'Patient Profile add',deadline: '05 Jun 2023', }    ]  
},


 {
  id: 2,
  title: 'Project Management',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque.',
  startDate :'28 Jan 2023',
  workingHours : 150,
  deadline: '17 Mar 2023',
  creator: 'Barry Cuda',
  leaderName:{ name: 'Jeffery Lalor', role: 'Web Developer',image: Avatar_01 },
  imageFiles: [
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file4.png', src: Diagram }
    ],
  uploadedFiles: [
      { name: 'file1.png',creator:'zarai fedi', size:'Size: 50Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file2.png',creator:'John Doe', size:'Size: 14.8Mb',date:'July 31st at 6:53 PM', src: Diagram },
      { name: 'file3.png',creator:'zarai fedi', size:'Size: 30Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file4.png',creator:'John Doe', size:'Size: 102.3Mb',date:'July 31st at 6:53 PM', src: Diagram }
    ],
  team: [
    { name: 'John Doe', role: 'Web Developer',image: Avatar_01 },
    { name: 'Jane Smith', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Lesley Grauer', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Alice Johnson', role: 'Ios Developer',image: Avatar_01}
  ],
  priority:'Medium',
  activeStatus:'In Progress',
  tasks: [
      { id: 1, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ',deadline: '17 Mar 2023', },
      { id: 2, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '20 Jan 2023', },
      { id: 3, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ' },
      { id: 4, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '11 Febr 2023', },
     
      { id: 5, status:1 ,assignee: 'John Doe', description: 'Doctor available module',deadline: '17 Mar 2023', },
      { id: 6, status:1 ,assignee: 'Jane Smith', description: 'Patient and Doctor video conferencing',deadline: '17 Mar 2023', },
      { id: 7, status:1 ,assignee: 'zarai fedi', description: 'Doctor available module',deadline: '17 May 2023', },
      { id: 8, status:1 ,assignee: 'John Doe', description: 'Patient and Doctor video conferencing' ,deadline: '25 Sep 2023',},
    
      { id: 9, status:2 ,assignee: 'Jane Smith', description: 'Private chat module' ,deadline: '23 May 2023',},
      { id: 10, status:2 ,assignee: 'zarai fedi', description: 'Patient Profile add' ,deadline: '30 Jul 2023',},
      { id: 11, status:2 ,assignee: 'John Doe', description: 'Private chat module',deadline: '17 April 2023', },
      { id: 12, status:2 ,assignee: 'Jane Smith', description: 'Patient Profile add',deadline: '05 Jun 2023', }    ]  
}, 
 {
  id: 3,
  title: 'Video Calling App',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque.',
  startDate :'28 Jan 2023',
  workingHours : 120,
  deadline: '17 Apr 2023',
  creator: 'Zarai Fedi',
  leaderName:{ name: 'Jeffery Lalor', role: 'Web Developer',image: Avatar_01 },
  imageFiles: [
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file4.png', src: Diagram }
    ],
  uploadedFiles: [
      { name: 'file1.png',creator:'zarai fedi', size:'Size: 50Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file2.png',creator:'John Doe', size:'Size: 14.8Mb',date:'July 31st at 6:53 PM', src: Diagram },
      { name: 'file3.png',creator:'zarai fedi', size:'Size: 30Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file4.png',creator:'John Doe', size:'Size: 102.3Mb',date:'July 31st at 6:53 PM', src: Diagram }
    ],
  team: [
    { name: 'John Doe', role: 'Web Developer' ,image: Avatar_01},
    { name: 'Jane Smith', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Alice Johnson', role: 'Ios Developer',image: Avatar_01}
  ],
  priority:'High',
  activeStatus:'Pending',
  tasks: [
      { id: 1, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ',deadline: '17 Mar 2023', },
      { id: 2, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '20 Jan 2023', },
      { id: 3, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ' },
      { id: 4, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '11 Febr 2023', },
     
      { id: 5, status:1 ,assignee: 'John Doe', description: 'Doctor available module',deadline: '17 Mar 2023', },
      { id: 6, status:1 ,assignee: 'Jane Smith', description: 'Patient and Doctor video conferencing',deadline: '17 Mar 2023', },
      { id: 7, status:1 ,assignee: 'zarai fedi', description: 'Doctor available module',deadline: '17 May 2023', },
      { id: 8, status:1 ,assignee: 'John Doe', description: 'Patient and Doctor video conferencing' ,deadline: '25 Sep 2023',},
    
      { id: 9, status:2 ,assignee: 'Jane Smith', description: 'Private chat module' ,deadline: '23 May 2023',},
      { id: 10, status:2 ,assignee: 'zarai fedi', description: 'Patient Profile add' ,deadline: '30 Jul 2023',},
      { id: 11, status:2 ,assignee: 'John Doe', description: 'Private chat module',deadline: '17 April 2023', },
      { id: 12, status:2 ,assignee: 'Jane Smith', description: 'Patient Profile add',deadline: '05 Jun 2023', }    ]  

},
 {
  id: 4,
  title: 'Hospital Administration',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque.',
  startDate :'28 Jan 2023',
  workingHours : 180,
  deadline: '25 Apr 2023',
  creator: 'Zarai Fedi',
  leaderName: { name: 'Jeffery Lalor', role: 'Project Manager',image: Avatar_01 },
  imageFiles: [
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file4.png', src: Diagram }
    ],
  uploadedFiles: [
      { name: 'file1.png',creator:'zarai fedi', size:'Size: 50Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file2.png',creator:'John Doe', size:'Size: 14.8Mb',date:'July 31st at 6:53 PM', src: Diagram },
      { name: 'file3.png',creator:'zarai fedi', size:'Size: 30Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file4.png',creator:'John Doe', size:'Size: 102.3Mb',date:'July 31st at 6:53 PM', src: Diagram }
    ],
  team: [
    { name: 'John Doe', role: 'Web Developer' ,image: Avatar_01},
    { name: 'Jane Smith', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Bernardo Galaviz', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Alice Johnson', role: 'Ios Developer',image: Avatar_01}
  ],
  priority:'High',
  activeStatus:'Completed',
  tasks: [
      { id: 1, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ',deadline: '17 Mar 2023', },
      { id: 2, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '20 Jan 2023', },
      { id: 3, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ' },
      { id: 4, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '11 Febr 2023', },
     
      { id: 5, status:1 ,assignee: 'John Doe', description: 'Doctor available module',deadline: '17 Mar 2023', },
      { id: 6, status:1 ,assignee: 'Jane Smith', description: 'Patient and Doctor video conferencing',deadline: '17 Mar 2023', },
      { id: 7, status:1 ,assignee: 'zarai fedi', description: 'Doctor available module',deadline: '17 May 2023', },
      { id: 8, status:1 ,assignee: 'John Doe', description: 'Patient and Doctor video conferencing' ,deadline: '25 Sep 2023',},
    
      { id: 9, status:2 ,assignee: 'Jane Smith', description: 'Private chat module' ,deadline: '23 May 2023',},
      { id: 10, status:2 ,assignee: 'zarai fedi', description: 'Patient Profile add' ,deadline: '30 Jul 2023',},
      { id: 11, status:2 ,assignee: 'John Doe', description: 'Private chat module',deadline: '17 April 2023', },
      { id: 12, status:2 ,assignee: 'Jane Smith', description: 'Patient Profile add',deadline: '05 Jun 2023', }    ]  
},
 {
  id: 5,
  title: 'Office Management',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque.',
  startDate :'28 Jan 2023',
  workingHours : 300,
  deadline: '17 Apr 2023',
  creator: 'Zarai Fedi',
  leaderName:{ name: 'Jeffery Lalor', role: 'Web Developer' ,image: Avatar_01},
  imageFiles: [
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file4.png', src: Diagram }
    ],
  uploadedFiles: [
      { name: 'file1.png',creator:'zarai fedi', size:'Size: 50Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file2.png',creator:'John Doe', size:'Size: 14.8Mb',date:'July 31st at 6:53 PM', src: Diagram },
      { name: 'file3.png',creator:'zarai fedi', size:'Size: 30Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file4.png',creator:'John Doe', size:'Size: 102.3Mb',date:'July 31st at 6:53 PM', src: Diagram }
    ],
  team: [
    { name: 'John Doe', role: 'Web Developer',image: Avatar_01 },
    { name: 'Jane Smith', role: 'Web Designer',image: Avatar_01 },
    { name: 'Bernardo Galaviz', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Alice Johnson', role: 'Ios Developer',image: Avatar_01}
  ],
  priority:'Low',
  activeStatus:'Completed',
  tasks: [
      { id: 1, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ',deadline: '17 Mar 2023', },
      { id: 2, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '20 Jan 2023', },
      { id: 3, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ' },
      { id: 4, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '11 Febr 2023', },
     
      { id: 5, status:1 ,assignee: 'John Doe', description: 'Doctor available module',deadline: '17 Mar 2023', },
      { id: 6, status:1 ,assignee: 'Jane Smith', description: 'Patient and Doctor video conferencing',deadline: '17 Mar 2023', },
      { id: 7, status:1 ,assignee: 'zarai fedi', description: 'Doctor available module',deadline: '17 May 2023', },
      { id: 8, status:1 ,assignee: 'John Doe', description: 'Patient and Doctor video conferencing' ,deadline: '25 Sep 2023',},
    
      { id: 9, status:2 ,assignee: 'Jane Smith', description: 'Private chat module' ,deadline: '23 May 2023',},
      { id: 10, status:2 ,assignee: 'zarai fedi', description: 'Patient Profile add' ,deadline: '30 Jul 2023',},
      { id: 11, status:2 ,assignee: 'John Doe', description: 'Private chat module',deadline: '17 April 2023', },
      { id: 12, status:2 ,assignee: 'Jane Smith', description: 'Patient Profile add',deadline: '05 Jun 2023', }    ] 
},
 {
  id: 6,
  title: 'Project Management',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque.',
  startDate :'28 Jan 2023',
  workingHours : 90,
  deadline: '17 Mar 2023',
  creator: 'Barry Cuda',
  leaderName:{ name: 'Jeffery Lalor', role: 'Web Developer',image: Avatar_01 },
  imageFiles: [
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file4.png', src: Diagram }
    ],
  uploadedFiles: [
      { name: 'file1.png',creator:'zarai fedi', size:'Size: 50Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file2.png',creator:'John Doe', size:'Size: 14.8Mb',date:'July 31st at 6:53 PM', src: Diagram },
      { name: 'file3.png',creator:'zarai fedi', size:'Size: 30Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file4.png',creator:'John Doe', size:'Size: 102.3Mb',date:'July 31st at 6:53 PM', src: Diagram }
    ],
  team: [
    { name: 'John Doe', role: 'Web Developer' ,image: Avatar_01},
    { name: 'Jane Smith', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Alice Johnson', role: 'Ios Developer',image: Avatar_01}
  ],
  priority:'High',
  activeStatus:'In Progress',
  tasks: [
      { id: 1, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ',deadline: '17 Mar 2023', },
      { id: 2, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '20 Jan 2023', },
      { id: 3, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ' },
      { id: 4, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '11 Febr 2023', },
     
      { id: 5, status:1 ,assignee: 'John Doe', description: 'Doctor available module',deadline: '17 Mar 2023', },
      { id: 6, status:1 ,assignee: 'Jane Smith', description: 'Patient and Doctor video conferencing',deadline: '17 Mar 2023', },
      { id: 7, status:1 ,assignee: 'zarai fedi', description: 'Doctor available module',deadline: '17 May 2023', },
      { id: 8, status:1 ,assignee: 'John Doe', description: 'Patient and Doctor video conferencing' ,deadline: '25 Sep 2023',},
    
      { id: 9, status:2 ,assignee: 'Jane Smith', description: 'Private chat module' ,deadline: '23 May 2023',},
      { id: 10, status:2 ,assignee: 'zarai fedi', description: 'Patient Profile add' ,deadline: '30 Jul 2023',},
      { id: 11, status:2 ,assignee: 'John Doe', description: 'Private chat module',deadline: '17 April 2023', },
      { id: 12, status:2 ,assignee: 'Jane Smith', description: 'Patient Profile add',deadline: '05 Jun 2023', }    ]  
},
 {
  id: 7,
  title: 'Video Calling App',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque.',
  startDate :'28 Jan 2023',
  workingHours : 280,
  deadline: '17 Apr 2023',
  creator: 'Barry Cuda',
  leaderName:{ name: 'Jeffery Lalor', role: 'Web Developer',image: Avatar_01 },
  imageFiles: [
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file4.png', src: Diagram }
    ],
 uploadedFiles: [
      { name: 'file1.png',creator:'zarai fedi', size:'Size: 50Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file2.png',creator:'John Doe', size:'Size: 14.8Mb',date:'July 31st at 6:53 PM', src: Diagram },
      { name: 'file3.png',creator:'zarai fedi', size:'Size: 30Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file4.png',creator:'John Doe', size:'Size: 102.3Mb',date:'July 31st at 6:53 PM', src: Diagram }
    ],
  team: [
    { name: 'John Doe', role: 'Web Developer' ,image: Avatar_01},
    { name: 'Jane Smith', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Alice Johnson', role: 'Ios Developer',image: Avatar_01}
  ],
  priority:'High',
  activeStatus:'In Progress',
  tasks: [
      { id: 1, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ',deadline: '17 Mar 2023', },
      { id: 2, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '20 Jan 2023', },
      { id: 3, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ' },
      { id: 4, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '11 Febr 2023', },
     
      { id: 5, status:1 ,assignee: 'John Doe', description: 'Doctor available module',deadline: '17 Mar 2023', },
      { id: 6, status:1 ,assignee: 'Jane Smith', description: 'Patient and Doctor video conferencing',deadline: '17 Mar 2023', },
      { id: 7, status:1 ,assignee: 'zarai fedi', description: 'Doctor available module',deadline: '17 May 2023', },
      { id: 8, status:1 ,assignee: 'John Doe', description: 'Patient and Doctor video conferencing' ,deadline: '25 Sep 2023',},
    
      { id: 9, status:2 ,assignee: 'Jane Smith', description: 'Private chat module' ,deadline: '23 May 2023',},
      { id: 10, status:2 ,assignee: 'zarai fedi', description: 'Patient Profile add' ,deadline: '30 Jul 2023',},
      { id: 11, status:2 ,assignee: 'John Doe', description: 'Private chat module',deadline: '17 April 2023', },
      { id: 12, status:2 ,assignee: 'Jane Smith', description: 'Patient Profile add',deadline: '05 Jun 2023', }    ] 
},
 {
  id: 8,
  title: 'Hospital Administration',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque.',
  startDate :'28 Jan 2023',
  workingHours : 350,
  deadline: '25 Apr 2023',
  creator: 'Zarai Fedi',
  leaderName:{ name: 'Jeffery Lalor', role: 'Web Developer',image: Avatar_01 },
  imageFiles: [
      { name: 'file1.png', src: Diagram },
      { name: 'file2.png', src: Diagram},
      { name: 'file3.png', src: Diagram },
      { name: 'file4.png', src: Diagram }
    ],
  uploadedFiles: [
      { name: 'file1.png',creator:'zarai fedi', size:'Size: 50Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file2.png',creator:'John Doe', size:'Size: 14.8Mb',date:'July 31st at 6:53 PM', src: Diagram },
      { name: 'file3.png',creator:'zarai fedi', size:'Size: 30Mb',date:'May 31st at 10 PM', src: Diagram },
      { name: 'file4.png',creator:'John Doe', size:'Size: 102.3Mb',date:'July 31st at 6:53 PM', src: Diagram }
    ],
  team: [
    { name: 'John Doe', role: 'Web Developer',image: Avatar_01 },
    { name: 'Jane Smith', role: 'Web Designer' ,image: Avatar_01},
    { name: 'Alice Johnson', role: 'Ios Developer',image: Avatar_01}
  ],
  priority:'Low',
  activeStatus:'Pending',
  tasks: [
      { id: 1, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ',deadline: '17 Mar 2023', },
      { id: 2, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '20 Jan 2023', },
      { id: 3, status:0 ,assignee: 'zarai fedi', description: 'Patient appointment booking ' },
      { id: 4, status:0 ,assignee: 'John Doe', description: 'Appointment booking with payment gateway',deadline: '11 Febr 2023', },
     
      { id: 5, status:1 ,assignee: 'John Doe', description: 'Doctor available module',deadline: '17 Mar 2023', },
      { id: 6, status:1 ,assignee: 'Jane Smith', description: 'Patient and Doctor video conferencing',deadline: '17 Mar 2023', },
      { id: 7, status:1 ,assignee: 'zarai fedi', description: 'Doctor available module',deadline: '17 May 2023', },
      { id: 8, status:1 ,assignee: 'John Doe', description: 'Patient and Doctor video conferencing' ,deadline: '25 Sep 2023',},
    
      { id: 9, status:2 ,assignee: 'Jane Smith', description: 'Private chat module' ,deadline: '23 May 2023',},
      { id: 10, status:2 ,assignee: 'zarai fedi', description: 'Patient Profile add' ,deadline: '30 Jul 2023',},
      { id: 11, status:2 ,assignee: 'John Doe', description: 'Private chat module',deadline: '17 April 2023', },
      { id: 12, status:2 ,assignee: 'Jane Smith', description: 'Patient Profile add',deadline: '05 Jun 2023', }    ]  
}]


 const users = [
    {
      id: 1,
      image: Avatar_01,
      name: "John Doe",
      username: "John 2023",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Designer",
      employee_id: "FT-0001",
      email: "johndoe@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Team Leader",


    },
    {
      id: 2,
      image: Avatar_01,
      name: "Richard Miles",
      username: "Richard 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0002",
      email: "richardmiles@example.com",
      mobile: "9876543210",
      joindate: "18 Mar 2014",
      project: "Video Calling App",
      position: "Team Leader",

    },
    {
      id: 3,
      image: Avatar_01,
      name: "John Smith",
      username:"John 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Android Developer",
      employee_id: "FT-0003",
      email: "johnsmith@example.com ",
      mobile: "9876543210",
      joindate: "1 Apr 2014",
      project: "Hospital Administration",
      position: "Manager",
    },
    {
      id: 4,
      image: Avatar_01,
      name: "Mike Litorus",
      username: +"Mike 2019",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer",
      employee_id: "FT-0004",
      email: "mikelitorus@example.com",
      mobile: "9876543210",
      joindate: "1 Apr 2014",
      project: "Office Management",
      position: "Manager",
    },
    {
      id: 5,
      image: Avatar_01,
      name: "Wilmer Deluna",
      username:"Wilmer 1920",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Team Leader",
      employee_id: "FT-0005",
      email: "wilmerdeluna@example.com",
      mobile: "9876543210",
      joindate: "22 May 2014",
      project: "Hospital Administration",
      position: "Employee",
    },
    {
      id: 6,
      image: Avatar_01,
      name: "Jeffrey Warden",
      username:"Jeffrey 2018",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0006",
      email: "jeffreywarden@example.com",
      mobile: "9876543210",
      joindate: "16 Jun 2013",
      project: "Video Calling App",
      position: "Employee",
    },
    {
      id: 7,
      image: Avatar_01,
      name: "Bernardo Galaviz",
      username: "Bernardo 1998",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0007",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Team Leader",
    },
    {
      id: 8,
      image: Avatar_01,
      name: "Lesley Grauer",
      username: "Lesley 2015",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Team Leader",
      employee_id: "FT-0008",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Video Calling App",
      position: "Team Leader",
    },
    {
      id: 9,
      image: Avatar_01,
      name: "Jeffery Lalor",
      username: "Jeffery 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0009",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Employee",
    },
    {
      id: 10,
      image: Avatar_01,
      name: "John Doe",
      username: "John 2016",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0010",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Office Management",
      position: "Employee",

    },
     {
      id: 11,
      image: Avatar_01,
      name: "zarai fedi",
      username: "fedy 1920",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0011",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Video Calling App",
      position: "Employee",
    },
     {
      id: 12,
      image: Avatar_01,
      name: "Jeffery Lalor",
      username: name+" 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0012",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Office Management",
      position: "Employee",
    },
  ];


  const profileDetails = users.find((user) => user.id === parseInt(profileId, 10));


  const projects = allprojects.filter(project => {
      if (Array.isArray(project.team)) {
        for (const member of project.team) {

            if (member.name === findUserNameById(profileId)) {
              return true; // Found the project with the team member
      }
    }
  }
   return false; // Team member not found in this project
  });


  function findUserNameById(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(id, 10)) {
            return users[i].name;
        }
    }
    return null; // Return null if no user found with the given id
}

  const { loginvalue } = useSelector((state) => state.user);
  const UserName = loginvalue?.email?.split("@")[0];
  const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);


  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });


  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Employee Profile</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">


          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}


          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <Link to="#">
                          <img alt="img" src={Avatar_01} />
                        </Link>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {profileDetails.name}
                            </h3>
                            <h4 className="text-muted">{profileDetails.role}</h4>
                            <h5 className="text-muted">{profileDetails.position}</h5>
                            <div className="staff-id">
                              Employee ID : {profileDetails.employee_id}
                            </div>
                            <div className="small doj text-muted">
                              Date of Join : {profileDetails.joindate}
                            </div>
                            <div className="staff-msg">
                              <Link
                                onClick={() =>
                                  localStorage.setItem("minheight", "true")
                                }
                                className="btn btn-custom"
                                to="/conversation/chat">
                                Send Message
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <Link to="#">{profileDetails.mobile}</Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Email:</div>
                              <div className="text">
                                <Link to="#">
                                  {profileDetails.email}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Username:</div>
                              <div className="text">
                                <Link to="#">{profileDetails.username}</Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Birthday:</div>
                              <div className="text">{profileDetails.birthdate}</div>
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">
                                {profileDetails.adress}
                              </div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">{profileDetails.Gender}</div>
                            </li>
                            <li>
                              <div className="title">Reports to:</div>
                              <div className="text">
                                <div className="avatar-box">
                                  <div className="avatar avatar-xs">
                                    <img src={profileDetails.image} alt="img" />
                                  </div>
                                </div>
                                <Link to="/app/profile/employee-profile">
                                  {profileDetails.reportTo}
                                </Link>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit">
                      <Link
                        data-bs-target="#profile_info"
                        data-bs-toggle="modal"
                        className="edit-icon"
                        to="#">
                        <i className="fa fa-pencil" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <Link
                      to="#emp_profile"
                      data-bs-toggle="tab"
                      className="nav-link active">
                        Experience
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#emp_projects"
                      data-bs-toggle="tab"
                      className="nav-link">
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-content">





            {/* Experience Info Tab */}
            <div
              id="emp_profile"
              className="pro-overview tab-pane fade show active">
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Experience{" "}
                        <Link
                          to="#"
                          className="edit-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#experience_info">
                          <i className="fa fa-pencil" />
                        </Link>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          <li>
                            <div className="experience-user">
                              <div className="before-circle" />
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <Link to="/" className="name">
                                  Web Designer at Zen Corporation
                                </Link>
                                <span className="time">
                                  Jan 2013 - Present (5 years 2 months)
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle" />
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <Link to="/" className="name">
                                  Web Designer at Ron-tech
                                </Link>
                                <span className="time">
                                  Jan 2013 - Present (5 years 2 months)
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle" />
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <Link to="/" className="name">
                                  Web Designer at Dalt Technology
                                </Link>
                                <span className="time">
                                  Jan 2013 - Present (5 years 3 months)
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Experience Info Tab */}





            {/* Projects Tab */}
            <div className="tab-pane fade" id="emp_projects">
              <div className="row">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                     ))}
              </div>
            </div>
            {/* /Projects Tab */}



          </div>
        </div>
        {/* /Page Content */}








        {/* Profile Modal */}
        <div
          id="profile_info"
          className="modal custom-modal fade"
          role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Profile Information</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="profile-img-wrap edit-img">
                        <img
                          className="inline-block"
                          src={Avatar_02}
                          alt="user"
                        />
                        <div className="fileupload btn">
                          <span className="btn-text">edit</span>
                          <input className="upload" type="file" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Full Name</label>
                            <input
                              className={`form-control ${isTyping && formData.fullName.trim() !== '' ? 'is-valid' : 'is-invalid'}`}
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                             
                              
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Username</label>
                            <input
                              type="text"
                              className="form-control"
                              
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Birth Date</label>
                            <div>
                              <input
                                className="form-control datetimepicker"
                                type="date"
                                
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Gender</label>
                            <select className="select form-control">
                              <option value="male selected">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Email</label>
                            <input
                              type="text"
                              className="form-control"
                              
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-6">
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="4487 Snowbird Lane"
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Profile Modal */}
    


        
        {/* Experience Modal */}
        <div
          id="experience_info"
          className="modal custom-modal fade"
          role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Experience Informations</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-scroll">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">
                          Experience Informations{" "}
                          <Link to="#" className="delete-icon">
                            <i className="fa fa-trash" />
                          </Link>
                        </h3>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder="Company Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder="Location"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder=" Job Position"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <div>
                                <input
                                  type="date"
                                  className="form-control floating datetimepicker"
                                  placeholder="Period From"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <div>
                                <input
                                  type="date"
                                  className="form-control floating datetimepicker"
                                  placeholder="Period To"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">
                          Experience Informations{" "}
                          <Link to="#" className="delete-icon">
                            <i className="fa fa-trash" />
                          </Link>
                        </h3>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder=" Company Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder="Location"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder="Job Position"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <div>
                                <input
                                  type="date"
                                  className="form-control floating datetimepicker"
                                  placeholder="Period From"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <div>
                                <input
                                  type="date"
                                  className="form-control floating datetimepicker"
                                  placeholder="Period To"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="add-more">
                          <Link to="#">
                            <i className="fa fa-plus-circle" /> Add More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Experience Modal */}



      </div>
      <Offcanvas />
    </>
  );
};
export default EmployeeProfile;
