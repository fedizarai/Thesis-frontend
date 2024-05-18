import React, { useState, useEffect , useRef, useLayoutEffect  } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Offcanvas from "../../../Entryfile/offcanvance";
import {
  PlaceHolder,
  Attachment,
  Avatar_05,
  Avatar_02,
  Avatar_13,
  Avatar_16,
} from "../../../Entryfile/imagepath";
import moment from 'moment';
import Cookies from 'js-cookie';
import "./chat.css";


import { io } from "socket.io-client";


const Chat = () => {
   
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const { projectId } = useParams();
  const [projects, setProjects] = useState([]);
  const chatBoxRef = useRef(null);


  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });
  const userId = useRef(Cookies.get('userid')); 
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const usersArray = await response.json();
        if (response.ok) {
          const usersById = {};
          usersArray.forEach(user => {
            usersById[user.id] = user;  // Ensure user.id is the correct key from your data
          });
          setUsers(usersById);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  
  useEffect(() => {
    if (userId.current) {
      const newSocket = io("http://localhost:3001", {
        query: { userId: userId.current },
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 5000,
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id); // Ensures connection
      });

      newSocket.on("newMessage", (data) => {
        setMessages(prevMessages => {
          const messageAlreadyExists = prevMessages.some(msg => msg.timestamp === data.timestamp && msg.userId === data.userId);
          if (!messageAlreadyExists) {
            return [...prevMessages, { ...data, user_id: parseInt(data.userId, 10) }]; // Convert userId to integer
          }
          return prevMessages;
        });

       setTimeout(() => {
                scrollToBottom();
            }, 100);

      });

      setSocket(newSocket); // Sets the socket in state

      return () => {
        console.log('Disconnecting socket:', newSocket.id); // Confirms disconnection
        newSocket.off("newMessage");
        newSocket.close();
      };
    }
  }, [userId.current]);


  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && socket) {
      const timestamp = new Date().toISOString(); // Create a timestamp for unique identification
      const messageToSend = {
        projectId,
        message: text,
        userId: userId.current,
        timestamp: timestamp,
      };
      socket.emit('chatMessage', messageToSend);
      setText(""); 
      setTimeout(() => {
          scrollToBottom();
      }, 100); 

    } else {
      console.log("Cannot send message, socket not connected.");
    }
  };





  const scrollToBottom = () => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};

    




  useEffect(() => {
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chat/${projectId}`);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    fetchMessages();
  }, [projectId]); // Rerun when projectId changes

  useEffect(() => {
  console.log('Current messages:', messages);
  }, [messages]);
    
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const projectsData = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  const project = projects.find(project => project.id === parseInt(projectId));
  const projectName = project ? project.title : '';


  return (
    <>
      
      <div
        className="page-wrapper"
        style={{ minHeight: windowDimension.winHeight }}>
        <Helmet>
          <title>Chat</title>
          <meta name="description" content="Chat" />
        </Helmet>


        {/* Chat Main Row */}
        <div className="chat-main-row">
            <div className="chat-main-wrapper">
                <div className="col-lg-9 message-view task-view">
                    <div className="chat-window">
                        <div className="fixed-header">
                            <div className="navbar">
                                {/* User Info and Controls */}
                                <div className="user-details me-auto">
                                    <div className="float-start user-img">
                                        <Link className="avatar" to="/app/profile/employee-profile" >
                                            <img src={Avatar_05} alt="" className="rounded-circle" />
                                            <span className="status online"></span>
                                        </Link>
                                    </div>
                                    <div className="user-info float-start">
                                    
                                            <span>{projectName}</span>
                                       
                                    </div>
                                </div>
                                {/* Search and Settings */}
                                <div className="search-box">
                                    <div className="input-group input-group-sm">
                                        <input type="text" placeholder="Search" className="form-control" />
                                        <button type="button" className="btn">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat-contents">
                          <div className="chat-content-wrap">
                            <div className="chat-wrap-inner">
                              <div className="chat-box" ref={chatBoxRef} >
                                <div className="chats">
                                  {messages.map((msg, index) => (
                                    <div key={index} className={`chat ${parseInt(msg.user_id, 10) === parseInt(userId.current, 10) ? 'chat-right' : 'chat-left'}`}>
                                      {parseInt(msg.user_id, 10) !== parseInt(userId.current, 10) && (
                                        <div className="chat-avatar">
                                          <Link to={`/app/profile/employee-profile/${parseInt(msg.user_id, 10)}`} className="avatar">
                                            <img 
                                                alt={users[msg.user_id]?.name || 'User'} // Fallback if name isn't available
                                                src={users[msg.user_id]?.image || Avatar_05} // Fallback image if user image isn't available
                                                title={users[msg.user_id]?.name || 'Unknown User'}// Tooltip that shows user's name on hover
                                              />
                                          </Link>
                                        </div>
                                      )}
                                      <div className="chat-body">
                                        <div className="chat-bubble">
                                          <div className="chat-content">
                                            <p>{msg.message}</p>
                                            <span className="chat-time"> {new Date(msg.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chat-footer">
                            <div className="message-bar">
                                <div className="message-inner">
                                    <Link className="link attach-icon" to="#" data-bs-toggle="modal" data-bs-target="#drag_files">
                                        <img src={Attachment} alt="" />
                                    </Link>
                                    <div className="message-area">
                                        <div className="input-group">
                                            <textarea
                                                className="form-control"
                                                placeholder="Type message..."
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        onSubmit(e);
                                                    }
                                                }}
                                            />
                                            <span className="input-group-append">
                                                <button className="btn btn-custom" type="submit" onClick={onSubmit}>
                                                    <i className="fa fa-paper-plane"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* /Chat Main Row */}






        {/* Drogfiles Modal */}
        <div id="drag_files" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-md"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Drag and drop files upload</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="js-upload-form">
                  <div className="upload-drop-zone" id="drop-zone">
                    <i className="fa fa-cloud-upload fa-2x" />{" "}
                    <span className="upload-text">
                      Just drag and drop files here
                    </span>
                  </div>
                  <h4>Uploading</h4>
                  <ul className="upload-list">
                    <li className="file-list">
                      <div className="upload-wrap">
                        <div className="file-name">
                          <i className="fa fa-photo" />
                          photo.png
                        </div>
                        <div className="file-size">1.07 gb</div>
                        <button type="button" className="file-close">
                          <i className="fa fa-close" />
                        </button>
                      </div>
                      <div className="progress progress-xs progress-striped">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "65%" }}
                        />
                      </div>
                      <div className="upload-process">37% done</div>
                    </li>
                    <li className="file-list">
                      <div className="upload-wrap">
                        <div className="file-name">
                          <i className="fa fa-file" />
                          task.doc
                        </div>
                        <div className="file-size">5.8 kb</div>
                        <button type="button" className="file-close">
                          <i className="fa fa-close" />
                        </button>
                      </div>
                      <div className="progress progress-xs progress-striped">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "65%" }}
                        />
                      </div>
                      <div className="upload-process">37% done</div>
                    </li>
                    <li className="file-list">
                      <div className="upload-wrap">
                        <div className="file-name">
                          <i className="fa fa-photo" />
                          dashboard.png
                        </div>
                        <div className="file-size">2.1 mb</div>
                        <button type="button" className="file-close">
                          <i className="fa fa-close" />
                        </button>
                      </div>
                      <div className="progress progress-xs progress-striped">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "65%" }}
                        />
                      </div>
                      <div className="upload-process">Completed</div>
                    </li>
                  </ul>
                </form>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Drogfiles Modal */}



        {/* Add Group Modal */}
        <div id="add_group" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-md"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create a group</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Groups are where your team communicates. They’re best when
                  organized around a topic — #leads, for example.
                </p>
                <form>
                  <div className="input-block">
                    <label>
                      Group Name <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="input-block">
                    <label>
                      Send invites to:{" "}
                      <span className="text-muted-light">(optional)</span>
                    </label>
                    <input className="form-control" type="text" />
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
        {/* /Add Group Modal */}






        {/* Add Chat User Modal */}
        <div
          id="add_chat_user"
          className="modal custom-modal fade"
          role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-md"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Direct Chat</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group m-b-30">
                  <input
                    placeholder="Search to start a chat"
                    className="form-control search-input"
                    type="text"
                  />
                  <span className="input-group-append">
                    <button className="btn btn-primary">Search</button>
                  </span>
                </div>
                <div>
                  <h5>Recent Conversations</h5>
                  <ul className="chat-user-list">
                    <li>
                      <Link to="#">
                        <div className="media">
                          <span className="avatar align-self-center">
                            <img src={Avatar_16} alt="" />
                          </span>
                          <div className="media-body align-self-center text-nowrap">
                            <div className="user-name">Jeffery Lalor</div>
                            <span className="designation">Team Leader</span>
                          </div>
                          <div className="text-nowrap align-self-center">
                            <div className="online-date">1 day ago</div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="media ">
                          <span className="avatar align-self-center">
                            <img src={Avatar_13} alt="" />
                          </span>
                          <div className="media-body align-self-center text-nowrap">
                            <div className="user-name">Bernardo Galaviz</div>
                            <span className="designation">Web Developer</span>
                          </div>
                          <div className="align-self-center text-nowrap">
                            <div className="online-date">3 days ago</div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="media">
                          <span className="avatar align-self-center">
                            <img src={Avatar_02} alt="" />
                          </span>
                          <div className="media-body text-nowrap align-self-center">
                            <div className="user-name">John Doe</div>
                            <span className="designation">Web Designer</span>
                          </div>
                          <div className="align-self-center text-nowrap">
                            <div className="online-date">7 months ago</div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Chat User Modal */}





        {/* Share Files Modal */}
        <div id="share_files" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-md"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Share File</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="files-share-list">
                  <div className="files-cont">
                    <div className="file-type">
                      <span className="files-icon">
                        <i className="fa fa-file-pdf-o" />
                      </span>
                    </div>
                    <div className="files-info">
                      <span className="file-name text-ellipsis">
                        AHA Selfcare Mobile Application Test-Cases.xls
                      </span>
                      <span className="file-author">
                        <Link to="#">Bernardo Galaviz</Link>
                      </span>{" "}
                      <span className="file-date">May 31st at 6:53 PM</span>
                    </div>
                  </div>
                </div>
                <div className="input-block">
                  <label>Share With</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Share</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Share Files Modal */}





      </div>
      
    </>
  );
};

export default Chat;
