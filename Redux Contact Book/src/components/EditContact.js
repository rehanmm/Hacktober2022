import React, { useEffect } from 'react';
import {useState} from 'react'
import {Link , useParams } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';

const EditContact = () => {
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [number , setNumber] = useState("");
    const dispatch = useDispatch();
    const history = useNavigate();

    const {id} = useParams();
    const contacts = useSelector(state=> state);
    const currentContact = contacts.find(contact=> contact.id === parseInt(id)) ;

    useEffect(() => {
       if(currentContact){
           setName(currentContact.name);
           setEmail(currentContact.email);
           setNumber(currentContact.number);
       }

    }, [currentContact]);

    const handleSubmit = (e) =>{
        e.preventDefault();

    const checkEmail = contacts.find((contact)=> contact.id !==parseInt(id) && contact.email === email);
    const checkNumber = contacts.find((contact) => contact.id !==parseInt(id) && contact.number === parseInt(number) );
    
    
        if(!email || !number || !name){
            return toast.warning("Please fill in all the fields!");

        }

        if(checkEmail){
            return toast.error("This email alrady Exists");
        }
        if(checkNumber){
            return toast.error("This number alrady Exists");
        }

        const data = {
            id: parseInt(id),
            name, 
            email,
            number,
        };

        console.log(data);

        dispatch({type: "UPDATE_CONTACT", payload:data});
        toast.success("Student Updated successfully!!");
        history("/");
    };
    

  return (
    <div className='container'>
        {currentContact? (
            <>
            <h1 className='display-3 text-center'>
            Edit Student {id}
           </h1>
        <div className='row'>
           
            <div className='col-md-6  shadow mx-auto p-5 ' >

           <form onSubmit={handleSubmit}>
               <div className='form-group'>
                   <input type = "text" placeholder='Name' className='form-control' 
                   value={name} 
                   onChange={(e) => setName(e.target.value)}
                   />

               </div>
               <div className='form-group'>
                   <input type = "email" placeholder='email' className='form-control' 
                   value={email} 
                   onChange={(e) => setEmail(e.target.value)}
                   />

               </div>
               <div className='form-group'>
                   <input type = "number" placeholder='Phone no' className='form-control' 
                   value={number} 
                   onChange={(e) => setNumber(e.target.value)}
                   />

               </div>
               <div className='form-group'>
                   <input type = "submit" value='Update Student' className='btn  btn-dark' />
                   <Link to = "/" className='btn  btn-danger ml-6' >
                       Cancel
                   </Link>

               </div>
           </form>
            </div>
        </div>
        </>
        ): (
            <h1 className='display-3 text-center'> Studentcontact with id {id} not exist
           </h1>
        )
        }
              
         
      </div>
      

        
       
  );
};

export default EditContact;