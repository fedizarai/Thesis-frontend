/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Projects from './projects';
import ProjectView from './projectview';
import ProjectList from './projectlist';
import Taskboard from './taskboard';
import {
  Avatar_16,
  Avatar_02,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_01,
  Diagram,
  PlaceHolder,
} from "../../../Entryfile/imagepath";


const projects = [
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

const ProjectRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/project_dashboard`} />
      <Route
        path={`${match.url}/project_dashboard`}
        render={(props) => (
          <Projects {...props} projects={projects} />
      )}
      />
      <Route
        path={`${match.url}/projects-list`}
        render={(props) => (
          <ProjectList {...props} projects={projects} />
      )}
      />
      <Route
        path={`${match.url}/projects-view/:taskId`}
        render={(props) => (
          <ProjectView {...props} projects={projects} />
      )}
      />
      <Route
        path={`${match.url}/task-board`}
        render={(props) => (
        <Taskboard {...props} projects={projects} />
      )}
      />
   </Switch>
);

export default ProjectRoute;
